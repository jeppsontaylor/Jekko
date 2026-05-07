use crate::capacity::{CapacityModel, CapacityUsage, capacity_summary};
use crate::config::{AppConfig, ModelEntry};
use crate::failure_log::{build_failure_log_entry, write_failure_log};
use crate::limits::{ErrorKind, cooldown_for, parse_limit_signal};
use crate::mcp::McpState;
use crate::metrics::{
    ContextDashboard, DashboardModel, DashboardSnapshot, dashboard_totals, metric_average, ratio,
};
use crate::openai::{ChatCompletionRequest, ChatCompletionResponse, clamp_output_tokens};
use crate::providers::ProviderClient;
use crate::providers::client as provider_client;
use crate::providers::openai_compatible::{UpstreamCompletion, build_body};
use crate::routing::{
    RequestProfile, RouteMode, RoutePlan, RoutingConfig, RoutingModelInput, RoutingUsage,
    plan_route,
};
use crate::state::{
    AgentSource, MetricEvent, ModelLimitEstimate, ModelMetric, ModelState, RequestRoute,
    RouteEventMeta, StateDb,
};
use anyhow::{Context, Result};
use rand::Rng;
use serde_json::{Value, json};
use std::cmp::Ordering;
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Instant;
use tokio::sync::broadcast;
use tracing::{info, warn};

#[derive(Debug, thiserror::Error)]
pub enum GatewayError {
    #[error("model not found: {0}")]
    ModelNotFound(String),
    #[error("no upstream keys available")]
    NoAvailableModels,
    #[error(
        "no context-safe model available: estimated {required_total_tokens} tokens, largest safe window {largest_safe_context_window} tokens"
    )]
    NoContextSafeModel {
        required_total_tokens: u64,
        largest_safe_context_window: u64,
    },
    #[error("upstream request failed: {0}")]
    Upstream(String),
    #[error("invalid upstream response: {0}")]
    InvalidResponse(String),
}

impl GatewayError {
    pub fn status_code(&self) -> axum::http::StatusCode {
        match self {
            GatewayError::ModelNotFound(_) => axum::http::StatusCode::NOT_FOUND,
            GatewayError::NoAvailableModels => axum::http::StatusCode::SERVICE_UNAVAILABLE,
            GatewayError::NoContextSafeModel { .. } => axum::http::StatusCode::PAYLOAD_TOO_LARGE,
            GatewayError::Upstream(_) => axum::http::StatusCode::BAD_GATEWAY,
            GatewayError::InvalidResponse(_) => axum::http::StatusCode::BAD_GATEWAY,
        }
    }

    pub fn kind(&self) -> &'static str {
        match self {
            GatewayError::ModelNotFound(_) => "model_not_found",
            GatewayError::NoAvailableModels => "no_available_models",
            GatewayError::NoContextSafeModel { .. } => "no_context_safe_model",
            GatewayError::Upstream(_) => "upstream_error",
            GatewayError::InvalidResponse(_) => "invalid_response",
        }
    }
}

#[derive(Clone)]
pub struct Gateway {
    pub config: AppConfig,
    pub state: Arc<StateDb>,
    pub mcp: Arc<McpState>,
    events: broadcast::Sender<DashboardMessage>,
    http: reqwest::Client,
}

#[derive(Clone, Debug)]
struct RuntimeModel {
    entry: ModelEntry,
    visible_id: String,
    api_key: Option<String>,
    base_url: String,
    base_url_missing_keys: Vec<String>,
    state: Option<ModelState>,
}

#[derive(Clone, Debug)]
pub struct GatewayResult {
    pub response: ChatCompletionResponse,
    pub receipts: Vec<String>,
    pub winner_model_id: String,
    pub confidence: f64,
}

#[derive(Clone, Debug, serde::Serialize)]
pub struct HealthInfo {
    pub ok: bool,
    pub visible_model: String,
    pub provider: String,
    pub available_models: usize,
    pub keyed_models: usize,
    pub missing_keys: Vec<String>,
    pub incomplete_env: Vec<String>,
}

#[derive(Clone, Debug, serde::Serialize)]
pub struct ModelStatusView {
    pub id: String,
    pub provider: String,
    pub display_name: String,
    pub upstream_model: String,
    pub visible_id: String,
    pub api_style: String,
    pub base_url: String,
    pub signup_url: String,
    pub key_present: bool,
    pub enabled: bool,
    pub status: String,
    pub disabled_reason: Option<String>,
    pub cooldown_until: Option<i64>,
    pub roles: Vec<String>,
    pub context_window: u64,
    pub max_output_tokens: u64,
    pub limits: serde_json::Value,
    pub score: serde_json::Value,
    pub state: Option<ModelState>,
}

#[derive(Clone, Debug, serde::Serialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum DashboardMessage {
    Snapshot { snapshot: DashboardSnapshot },
    ModelUpdated { model: DashboardModel },
    RequestEvent { event: MetricEvent },
    Heartbeat { timestamp: i64 },
}

impl Gateway {
    pub fn new(config: AppConfig) -> Result<Self> {
        let state = Arc::new(StateDb::open_with_retention(
            &config.database,
            config.routing.event_retention_rows,
        )?);
        let (events, _) = broadcast::channel(512);
        let mcp = Arc::new(McpState::new(config.instance_role, config.scaling.clone()));
        let gateway = Self {
            config,
            state,
            mcp,
            events,
            http: reqwest::Client::builder()
                .timeout(std::time::Duration::from_secs(900))
                .build()
                .context("build http client")?,
        };
        gateway.seed_model_state()?;
        gateway
            .state
            .prune_minute_buckets(gateway.config.routing.minute_bucket_retention_days)?;
        Ok(gateway)
    }

    fn seed_model_state(&self) -> Result<()> {
        for model in self.runtime_models()? {
            let status = model.readiness_status();
            self.state
                .upsert_model(&model.visible_id, &model.entry.provider, status)?;
            self.state
                .upsert_metric_model(&model.visible_id, &model.entry.provider)?;
            self.state.upsert_limit_model(
                &model.visible_id,
                &model.entry.provider,
                model.entry.context_window,
            )?;
        }
        Ok(())
    }

    fn runtime_models(&self) -> Result<Vec<RuntimeModel>> {
        let states = self
            .state
            .snapshot()?
            .into_iter()
            .map(|state| (state.model_id.clone(), state))
            .collect::<HashMap<_, _>>();
        Ok(crate::config::resolve_models(&self.config)?
            .into_iter()
            .map(|model| RuntimeModel {
                visible_id: model.visible_id.clone(),
                api_key: model.api_key,
                base_url: model.base_url,
                base_url_missing_keys: model.base_url_missing_keys,
                entry: model.entry,
                state: states.get(&model.visible_id).cloned(),
            })
            .collect())
    }

    pub fn subscribe(&self) -> broadcast::Receiver<DashboardMessage> {
        self.events.subscribe()
    }

    pub fn heartbeat_message() -> DashboardMessage {
        DashboardMessage::Heartbeat {
            timestamp: chrono::Utc::now().timestamp(),
        }
    }

    pub fn dashboard_snapshot(&self) -> Result<DashboardSnapshot> {
        let now = chrono::Utc::now().timestamp();
        let metric_rows = self
            .state
            .metric_snapshot()?
            .into_iter()
            .map(|metric| (metric.model_id.clone(), metric))
            .collect::<HashMap<_, _>>();
        let usage_rows = self.usage_last_hour()?;
        let limit_rows = self
            .state
            .limit_estimates()?
            .into_iter()
            .map(|estimate| (estimate.model_id.clone(), estimate))
            .collect::<HashMap<_, _>>();
        let models = self
            .runtime_models()?
            .iter()
            .map(|model| {
                self.dashboard_model(
                    model,
                    metric_rows.get(&model.visible_id),
                    limit_rows.get(&model.visible_id),
                    usage_rows
                        .get(&model.visible_id)
                        .map(|usage| usage.attempts)
                        .unwrap_or(0),
                )
            })
            .collect::<Vec<_>>();
        let capacity = capacity_summary(
            &self
                .runtime_models()?
                .iter()
                .map(|model| self.capacity_model(model))
                .collect::<Vec<_>>(),
            &usage_rows,
        );
        let totals = dashboard_totals(&models);
        let token_rate = self.state.token_rate_estimate(now, 24 * 60, 10)?;
        let active_agents = self.state.active_agents_live(now).unwrap_or_default();
        Ok(DashboardSnapshot {
            totals,
            token_rate,
            capacity,
            context: ContextDashboard {
                estimates: limit_rows.into_values().collect(),
                histogram: self
                    .state
                    .context_histogram(None, 8_000, now - 86_400 * 30)?,
                recent_events: self.state.context_events(200)?,
            },
            models,
            recent_events: self.state.recent_metric_events(100)?,
            agent_count: active_agents.len(),
            max_agents: self.mcp.max_instances(),
            active_agents,
            instance_count: self.mcp.instance_count(),
            max_instances: self.mcp.max_instances(),
            available_instance_slots: self.mcp.available_instance_slots(),
            instance_role: self.config.instance_role.as_str().to_string(),
            worker_threads: self.config.worker_threads,
        })
    }

    fn emit_model_metric(&self, model_id: &str) {
        let metric = self.state.metric_for(model_id).ok().flatten();
        let limit_rows = self
            .state
            .limit_estimates()
            .unwrap_or_default()
            .into_iter()
            .map(|estimate| (estimate.model_id.clone(), estimate))
            .collect::<HashMap<_, _>>();
        if let Some(model) = self
            .runtime_models()
            .unwrap_or_default()
            .iter()
            .find(|model| model.visible_id == model_id)
            .map(|model| {
                self.dashboard_model(
                    model,
                    metric.as_ref(),
                    limit_rows.get(&model.visible_id),
                    self.usage_last_hour()
                        .ok()
                        .and_then(|items| items.get(&model.visible_id).map(|usage| usage.attempts))
                        .unwrap_or(0),
                )
            })
        {
            let _ = self.events.send(DashboardMessage::ModelUpdated { model });
        }
    }

    fn emit_metric_event(&self, event: MetricEvent) {
        let _ = self.events.send(DashboardMessage::RequestEvent { event });
    }

    fn record_winner(
        &self,
        request_id: &str,
        model_id: &str,
        meta: &RouteEventMeta,
        agent: Option<&AgentSource>,
    ) {
        if let Ok(event) = self
            .state
            .record_winner_for_request(request_id, model_id, meta, agent)
        {
            self.emit_metric_event(event);
            self.emit_model_metric(model_id);
        }
    }

    pub fn health(&self) -> HealthInfo {
        let models = self.runtime_models().unwrap_or_default();
        let keyed_models = models.iter().filter(|model| model.is_ready()).count();
        let missing_keys = models
            .iter()
            .filter(|model| !model.has_key())
            .map(|model| model.visible_id.clone())
            .collect::<Vec<_>>();
        let incomplete_env = models
            .iter()
            .filter(|model| model.has_key() && !model.base_url_missing_keys.is_empty())
            .map(|model| model.visible_id.clone())
            .collect::<Vec<_>>();
        HealthInfo {
            ok: keyed_models > 0,
            visible_model: self.config.visible_model_id.clone(),
            provider: self.config.provider_id.clone(),
            available_models: models.len(),
            keyed_models,
            missing_keys,
            incomplete_env,
        }
    }

    pub fn status(&self) -> serde_json::Value {
        let models = self.runtime_models().unwrap_or_default();
        let states = self.state.snapshot().unwrap_or_default();
        let health = self.health();
        json!({
          "ok": health.ok,
          "health": health,
          "visible_model": self.config.visible_model_id,
          "provider": self.config.provider_id,
          "bind": self.config.bind,
          "database": self.config.database,
          "receipts_dir": self.config.receipts_dir,
          "instance_count": self.mcp.instance_count(),
          "max_instances": self.mcp.max_instances(),
          "available_instance_slots": self.mcp.available_instance_slots(),
          "instance_role": self.config.instance_role.as_str(),
          "worker_threads": self.config.worker_threads,
          "models": models.iter().map(|model| self.model_status_view(model)).collect::<Vec<_>>(),
          "state_rows": states,
        })
    }

    pub fn model_list(&self) -> serde_json::Value {
        json!({
          "object": "list",
          "data": [{
            "id": self.config.visible_model_id,
            "object": "model",
            "created": 0,
            "owned_by": "jnoccio",
            "permission": [],
            "root": self.config.visible_model_id,
            "parent": null
          }]
        })
    }

    pub async fn complete(
        &self,
        request: ChatCompletionRequest,
        agent: Option<&AgentSource>,
    ) -> Result<GatewayResult, GatewayError> {
        if !model_matches_visible(&self.config.visible_model_id, &request.model) {
            return Err(GatewayError::ModelNotFound(request.model));
        }

        let request_id = uuid::Uuid::new_v4().to_string();
        let models = self
            .runtime_models()
            .map_err(|err| GatewayError::Upstream(err.to_string()))?;
        let now = chrono::Utc::now().timestamp();
        let profile = RequestProfile::from_request(&request);
        let routing_inputs = self.routing_inputs(&models, now);
        let route = plan_route(
            &routing_inputs,
            &self.routing_usage().unwrap_or_default(),
            &profile,
            &RoutingConfig {
                fusion_sample_rate: self.config.routing.fusion_sample_rate,
                fast_backup_count: self.config.routing.fast_backup_count,
            },
            now,
            rand::rng().random_range(0.0..1.0),
        );
        if route.primary_model_id.is_none()
            && route.draft_model_ids.is_empty()
            && route.fusion_model_id.is_none()
        {
            return Err(GatewayError::NoContextSafeModel {
                required_total_tokens: profile
                    .approx_prompt_tokens
                    .saturating_add(profile.requested_output_tokens.unwrap_or(8_192)),
                largest_safe_context_window: routing_inputs
                    .iter()
                    .map(|model| model.safe_context_window)
                    .max()
                    .unwrap_or(0),
            });
        }
        self.state
            .record_route(&RequestRoute {
                request_id: request_id.clone(),
                route_mode: route.mode.as_str().to_string(),
                sampled: route.sampled,
                complexity_tier: route.complexity_tier.as_str().to_string(),
                complexity_score: route.complexity_score,
                primary_model_id: route.primary_model_id.clone(),
                backup_model_ids: route.backup_model_ids.clone(),
                fusion_model_id: route.fusion_model_id.clone(),
                created_at: now,
            })
            .map_err(|err| GatewayError::Upstream(err.to_string()))?;

        if let Some(agent) = agent {
            let _ = self.state.record_agent_activity(agent);
        }

        if route.sampled {
            return self
                .complete_fusion_sample(&request_id, &request, &models, &route, agent)
                .await;
        }

        let Some(primary) = route
            .primary_model_id
            .as_deref()
            .and_then(|id| model_by_id(&models, id))
        else {
            return Err(GatewayError::NoAvailableModels);
        };
        let mut receipts = self.build_route_receipts(&request_id, &route);
        match self
            .run_phase(
                &request_id,
                "fast",
                &primary,
                &request,
                true,
                None,
                &self.route_meta(&route, &primary, None),
                agent,
            )
            .await
        {
            Ok(outcome) => {
                let winner_model_id = primary.visible_id.clone();
                let response = self.finalize_response(
                    &request_id,
                    outcome.response,
                    receipts.clone(),
                    Some(&winner_model_id),
                    0.65,
                    None,
                    &route,
                );
                return Ok(GatewayResult {
                    response,
                    receipts,
                    winner_model_id,
                    confidence: 0.65,
                });
            }
            Err(err) => receipts.push(format!("{} -> error: {err}", primary.visible_id)),
        }

        for (index, backup_id) in route.backup_model_ids.iter().enumerate() {
            let Some(backup) = model_by_id(&models, backup_id) else {
                continue;
            };
            match self
                .run_phase(
                    &request_id,
                    "backup",
                    &backup,
                    &request,
                    true,
                    None,
                    &self.route_meta(&route, &backup, Some(index as u64 + 1)),
                    agent,
                )
                .await
            {
                Ok(outcome) => {
                    let winner_model_id = backup.visible_id.clone();
                    receipts.push(format!("backup_rank={} succeeded", index + 1));
                    let response = self.finalize_response(
                        &request_id,
                        outcome.response,
                        receipts.clone(),
                        Some(&winner_model_id),
                        0.55,
                        None,
                        &route,
                    );
                    return Ok(GatewayResult {
                        response,
                        receipts,
                        winner_model_id,
                        confidence: 0.55,
                    });
                }
                Err(err) => receipts.push(format!("{} -> error: {err}", backup.visible_id)),
            }
        }

        Err(GatewayError::Upstream(receipts.join("; ")))
    }

    async fn complete_fusion_sample(
        &self,
        request_id: &str,
        request: &ChatCompletionRequest,
        models: &[RuntimeModel],
        route: &RoutePlan,
        agent: Option<&AgentSource>,
    ) -> Result<GatewayResult, GatewayError> {
        let draft_candidates = route
            .draft_model_ids
            .iter()
            .filter_map(|id| model_by_id(models, id))
            .collect::<Vec<_>>();
        let fusion_candidates = route
            .fusion_model_id
            .as_deref()
            .and_then(|id| model_by_id(models, id))
            .into_iter()
            .collect::<Vec<_>>();

        if draft_candidates.is_empty() && fusion_candidates.is_empty() {
            return Err(GatewayError::NoAvailableModels);
        }

        let draft_results = self
            .run_drafts(request_id, request, &draft_candidates, route, agent)
            .await;
        let receipts = self.build_receipts(
            request_id,
            &draft_candidates,
            &draft_results,
            &fusion_candidates,
        );
        let successful_drafts = draft_results.iter().any(|item| item.output.is_some());

        if !successful_drafts {
            let alternative_path = fusion_candidates
                .first()
                .cloned()
                .or_else(|| draft_candidates.first().cloned())
                .ok_or(GatewayError::NoAvailableModels)?;
            let outcome = self
                .run_phase(
                    request_id,
                    "fusion_sample",
                    &alternative_path,
                    request,
                    true,
                    None,
                    &self.route_meta(route, &alternative_path, None),
                    agent,
                )
                .await?;
            let winner_model_id = alternative_path.visible_id.clone();
            let response = self.finalize_response(
                request_id,
                outcome.response,
                receipts.clone(),
                Some(&winner_model_id),
                0.45,
                None,
                route,
            );
            self.record_winner(request_id, &winner_model_id, &self.route_meta(route, &alternative_path, None), agent);
            return Ok(GatewayResult {
                response,
                receipts,
                winner_model_id,
                confidence: 0.45,
            });
        }

        let fusion_model = fusion_candidates.into_iter().next().or_else(|| {
            self.pick_best_draft(&draft_results)
                .map(|draft| draft.model.clone())
        });
        let Some(fusion_model) = fusion_model else {
            return Err(GatewayError::NoAvailableModels);
        };
        let fusion_messages = self.build_fusion_messages(request, &draft_results, &receipts);
        let fusion_request = ChatCompletionRequest {
            messages: fusion_messages.clone(),
            tools: request.tools.clone(),
            tool_choice: request.tool_choice.clone(),
            stream: Some(false),
            ..request.clone()
        };
        let fusion_result = self
            .run_phase(
                request_id,
                "fusion",
                &fusion_model,
                &fusion_request,
                true,
                Some(fusion_messages.clone()),
                &self.route_meta(route, &fusion_model, None),
                agent,
            )
            .await;

        match fusion_result {
            Ok(outcome) => {
                let winner_model_id = fusion_model.visible_id.clone();
                let confidence = self.confidence(&draft_results, true);
                let response = self.finalize_response(
                    request_id,
                    outcome.response,
                    receipts.clone(),
                    Some(&winner_model_id),
                    confidence,
                    Some(&draft_results),
                    route,
                );
                self.record_winner(
                    request_id,
                    &winner_model_id,
                    &self.route_meta(route, &fusion_model, None),
                    agent,
                );
                Ok(GatewayResult {
                    response,
                    receipts,
                    winner_model_id,
                    confidence,
                })
            }
            Err(_) if request.tools.is_some() => {
                let alternative_path = self
                    .pick_fallback(models, &draft_candidates, &[])
                    .ok_or(GatewayError::NoAvailableModels)?;
                let outcome = self
                    .run_phase(
                        request_id,
                        "backup",
                        &alternative_path,
                        request,
                        true,
                        None,
                        &self.route_meta(route, &alternative_path, Some(1)),
                        agent,
                    )
                    .await?;
                let winner_model_id = alternative_path.visible_id.clone();
                let response = self.finalize_response(
                    request_id,
                    outcome.response,
                    receipts.clone(),
                    Some(&winner_model_id),
                    0.5,
                    None,
                    route,
                );
                self.record_winner(
                    request_id,
                    &winner_model_id,
                    &self.route_meta(route, &alternative_path, Some(1)),
                    agent,
                );
                Ok(GatewayResult {
                    response,
                    receipts,
                    winner_model_id,
                    confidence: 0.5,
                })
            }
            Err(err) => {
                if let Some(best) = self.pick_best_draft(&draft_results) {
                    let winner_model_id = best.model.visible_id.clone();
                    let confidence = self.confidence(&draft_results, false);
                    let response = self.finalize_response(
                        request_id,
                        best.output
                            .clone()
                            .unwrap()
                            .into_response(&best.model.entry.model),
                        receipts.clone(),
                        Some(&winner_model_id),
                        confidence,
                        Some(&draft_results),
                        route,
                    );
                    self.record_winner(
                        request_id,
                        &winner_model_id,
                        &self.route_meta(route, &best.model, None),
                        agent,
                    );
                    return Ok(GatewayResult {
                        response,
                        receipts,
                        winner_model_id,
                        confidence,
                    });
                }
                Err(err)
            }
        }
    }

    #[allow(clippy::too_many_arguments)]
    fn finalize_response(
        &self,
        request_id: &str,
        mut response: ChatCompletionResponse,
        receipts: Vec<String>,
        winner_model_id: Option<&str>,
        confidence: f64,
        draft_results: Option<&[DraftResult]>,
        route: &RoutePlan,
    ) -> ChatCompletionResponse {
        let metadata = json!({
          "request_id": request_id,
          "route_mode": route.mode.as_str(),
          "sampled": route.sampled,
          "complexity_tier": route.complexity_tier.as_str(),
          "primary_model_id": &route.primary_model_id,
          "backup_model_ids": &route.backup_model_ids,
          "fusion_model_id": &route.fusion_model_id,
          "winner_model_id": winner_model_id,
          "confidence": confidence,
          "receipts": receipts,
          "drafts": draft_results.map(|items| items.iter().map(|item| item.summary()).collect::<Vec<_>>()).unwrap_or_default(),
        });
        response.extra.insert("jnoccio".to_string(), metadata);
        response
    }

    fn confidence(&self, draft_results: &[DraftResult], fusion_success: bool) -> f64 {
        let successes = draft_results
            .iter()
            .filter(|item| item.output.is_some())
            .count() as f64;
        let base = if fusion_success { 0.7 } else { 0.5 };
        (base + successes * 0.1).min(0.99)
    }

    fn build_receipts(
        &self,
        request_id: &str,
        draft_candidates: &[RuntimeModel],
        draft_results: &[DraftResult],
        fusion_candidates: &[RuntimeModel],
    ) -> Vec<String> {
        let mut receipts = vec![format!("request_id={request_id}")];
        receipts.push(format!(
            "draft_models={}",
            draft_candidates
                .iter()
                .map(|model| model.visible_id.clone())
                .collect::<Vec<_>>()
                .join(", ")
        ));
        for result in draft_results {
            receipts.push(result.summary());
        }
        receipts.push(format!(
            "fusion_model={}",
            fusion_candidates
                .first()
                .map(|model| model.visible_id.clone())
                .unwrap_or_else(|| "none".to_string())
        ));
        receipts
    }

    fn build_route_receipts(&self, request_id: &str, route: &RoutePlan) -> Vec<String> {
        vec![
            format!("request_id={request_id}"),
            format!("route_mode={}", route.mode.as_str()),
            format!("sampled={}", route.sampled),
            format!("complexity_tier={}", route.complexity_tier.as_str()),
            format!(
                "primary_model={}",
                route.primary_model_id.as_deref().unwrap_or("none")
            ),
            format!("backup_models={}", route.backup_model_ids.join(", ")),
        ]
    }

    fn build_fusion_messages(
        &self,
        request: &ChatCompletionRequest,
        draft_results: &[DraftResult],
        receipts: &[String],
    ) -> Vec<Value> {
        let mut messages = request.messages.clone();
        let draft_text = draft_results
            .iter()
            .map(|item| item.summary())
            .collect::<Vec<_>>()
            .join("\n");
        messages.push(json!({
      "role": "system",
      "content": format!(
        "Gateway receipts:\n{}\n\nDraft summaries:\n{}\n\nProduce the best final answer. Keep tool calls valid if needed.",
        receipts.join("\n"),
        draft_text
      )
    }));
        messages
    }

    fn weight_for_model(&self, model: &RuntimeModel) -> f64 {
        if !model.is_routable_now(chrono::Utc::now().timestamp()) {
            return 0.0;
        }
        let base = (model.entry.score.power
            + model.entry.score.reliability
            + model.entry.score.integration
            + model.entry.score.latency
            + model.entry.score.free_quota) as f64
            / 5.0;
        let health = match model.state.as_ref() {
            Some(state) if state.status == "healthy" || state.status == "ready" => 1.0,
            Some(state) if state.status == "missing_key" => 0.0,
            Some(state) if state.status == "incomplete_env" => 0.0,
            Some(state) if state.status == "auth_failed" => 0.0,
            Some(state) if state.status == "customer_verification_required" => 0.0,
            Some(state) if state.status == "no_access" => 0.0,
            Some(state) if state.status == "unsupported_api" => 0.05,
            Some(state) if state.status == "model_unavailable" => 0.0,
            Some(state) if state.status == "quota_exhausted" => 0.1,
            Some(state) if state.status == "rate_limited" => 0.3,
            Some(state) if state.status == "timeout" => 0.7,
            Some(state) if state.status == "server_error" => 0.5,
            Some(state) if state.status == "invalid_response" => 0.7,
            Some(_) => 0.8,
            None => 1.0,
        };
        let latency = model
            .state
            .as_ref()
            .and_then(|state| state.last_latency_ms)
            .map(|ms| (1_500.0 / ms.max(100) as f64).clamp(0.25, 1.5))
            .unwrap_or(1.0);
        let learned = 1.0 + self.state.learned_boost(&model.visible_id).unwrap_or(1.0) - 1.0;
        (base / 100.0) * health * latency * learned
    }

    fn pick_fallback(
        &self,
        models: &[RuntimeModel],
        drafts: &[RuntimeModel],
        fusion: &[RuntimeModel],
    ) -> Option<RuntimeModel> {
        let now = chrono::Utc::now().timestamp();
        let exclude = drafts
            .iter()
            .map(|model| model.visible_id.clone())
            .chain(fusion.iter().map(|model| model.visible_id.clone()))
            .collect::<Vec<_>>();
        let mut candidates = models
            .iter()
            .filter(|model| model.entry.routing.enabled)
            .filter(|model| model.is_selectable(now))
            .filter(|model| !exclude.contains(&model.visible_id))
            .cloned()
            .collect::<Vec<_>>();
        if candidates.is_empty() {
            candidates = models
                .iter()
                .filter(|model| model.entry.routing.enabled)
                .filter(|model| model.is_selectable(now))
                .cloned()
                .collect::<Vec<_>>();
        }
        candidates.into_iter().max_by(|a, b| {
            self.weight_for_model(a)
                .partial_cmp(&self.weight_for_model(b))
                .unwrap_or(Ordering::Equal)
        })
    }

    fn pick_best_draft<'a>(&self, drafts: &'a [DraftResult]) -> Option<&'a DraftResult> {
        drafts
            .iter()
            .filter_map(|draft| draft.output.as_ref().map(|output| (draft, output)))
            .max_by(|(left_result, left_output), (right_result, right_output)| {
                let left_score = left_result.model.entry.score.power as usize
                    + left_output.message.content.as_deref().unwrap_or("").len();
                let right_score = right_result.model.entry.score.power as usize
                    + right_output.message.content.as_deref().unwrap_or("").len();
                left_score.cmp(&right_score)
            })
            .map(|(draft, _)| draft)
    }

    async fn run_drafts(
        &self,
        request_id: &str,
        request: &ChatCompletionRequest,
        drafts: &[RuntimeModel],
        route: &RoutePlan,
        agent: Option<&AgentSource>,
    ) -> Vec<DraftResult> {
        let futures = drafts.iter().cloned().map(|model| async move {
            let meta = self.route_meta(route, &model, None);
            match self
                .run_phase(request_id, "draft", &model, request, false, None, &meta, agent)
                .await
            {
                Ok(outcome) => DraftResult {
                    model: model.clone(),
                    output: Some(outcome.output),
                    error: None,
                },
                Err(err) => DraftResult::from_error(model.clone(), err),
            }
        });
        futures::future::join_all(futures).await
    }

    #[allow(clippy::too_many_arguments)]
    async fn run_phase(
        &self,
        request_id: &str,
        phase: &str,
        model: &RuntimeModel,
        request: &ChatCompletionRequest,
        include_tools: bool,
        messages_override: Option<Vec<Value>>,
        meta: &RouteEventMeta,
        agent: Option<&AgentSource>,
    ) -> Result<PhaseOutcome, GatewayError> {
        let attempt_event = self
            .state
            .record_attempt(
                request_id,
                phase,
                &model.visible_id,
                &model.entry.provider,
                meta,
                agent,
            )
            .map_err(|err| GatewayError::Upstream(err.to_string()))?;
        self.emit_metric_event(attempt_event);
        self.emit_model_metric(&model.visible_id);

        let started = Instant::now();
        let request = clamp_output_tokens(request, model.entry.max_output_tokens);
        let mut messages = messages_override.unwrap_or_else(|| request.messages.clone());
        if phase == "draft" {
            messages.push(json!({
        "role": "system",
        "content": "You are a draft model. Give a concise strategic answer, avoid tool calls, and focus on approach, edge cases, and likely edits."
      }));
        }
        let tools = if include_tools {
            request.tools.clone()
        } else {
            None
        };
        let phase_request = ChatCompletionRequest {
            messages: messages.clone(),
            tools: tools.clone(),
            ..request.clone()
        };
        let phase_profile = RequestProfile::from_request(&phase_request);
        let requested_output_tokens = phase_profile
            .requested_output_tokens
            .unwrap_or_else(|| model.entry.max_output_tokens.min(8_192));
        let message_count = messages.len();
        let tool_count = tools
            .as_ref()
            .and_then(|value| value.as_array())
            .map(|items| items.len())
            .unwrap_or(0);
        let upstream_stream = false;
        let body = build_body(
            &phase_request,
            &model.entry.model,
            upstream_stream,
            tools,
            messages,
            model.entry.api.completion_tokens_param.as_deref(),
            &model.entry.api.style,
        );
        let client = self.client_for(model);
        match client.complete(&phase_request, body).await {
            Ok(output) => {
                let latency_ms = started.elapsed().as_millis() as u64;
                let success_event = self
                    .state
                    .record_success(
                    request_id,
                    phase,
                    &model.visible_id,
                    &model.entry.provider,
                    latency_ms,
                    None,
                    output.usage.as_ref(),
                    meta,
                    agent,
                )
                .map_err(|err| GatewayError::Upstream(err.to_string()))?;
                self.state
                    .record_context_success(
                        request_id,
                        phase,
                        &model.visible_id,
                        &model.entry.provider,
                        phase_profile.approx_prompt_tokens,
                        requested_output_tokens,
                        output.usage.as_ref(),
                    )
                    .map_err(|err| GatewayError::Upstream(err.to_string()))?;
                self.emit_metric_event(success_event);
                self.emit_model_metric(&model.visible_id);
                self.state.increment_quota(&model.visible_id).ok();
                info!(
                    request_id = %request_id,
                    phase = phase,
                    model_id = %model.visible_id,
                    provider = %model.entry.provider,
                    latency_ms = latency_ms,
                    "upstream success"
                );
                Ok(PhaseOutcome {
                    response: output.clone().into_response(&model.entry.model),
                    output,
                })
            }
            Err(err) => {
                let latency_ms = started.elapsed().as_millis() as u64;
                let text = err.summary();
                let kind = err.kind.clone();
                let parsed_signal = parse_limit_signal(&err.body);
                let retry_after = err.retry_after;
                let cooldown = cooldown_for(
                    &kind,
                    retry_after,
                    model
                        .state
                        .as_ref()
                        .map(|state| state.failure_count)
                        .unwrap_or(0),
                );
                let disabled_until = if cooldown.is_zero() {
                    None
                } else {
                    Some(
                        chrono::Utc::now().timestamp()
                            + i64::try_from(cooldown.as_secs()).unwrap_or(i64::MAX),
                    )
                };
                if matches!(kind, ErrorKind::ContextOverflow) || parsed_signal.is_some() {
                    self.state
                        .record_context_failure(
                            request_id,
                            phase,
                            &model.visible_id,
                            &model.entry.provider,
                            phase_profile.approx_prompt_tokens,
                            requested_output_tokens,
                            parsed_signal.as_ref(),
                            &kind,
                            &err.body,
                        )
                        .map_err(|db_err| GatewayError::Upstream(db_err.to_string()))?;
                }
                let failure_event = self
                    .state
                    .record_failure(
                    request_id,
                    phase,
                    &model.visible_id,
                    &model.entry.provider,
                    &kind,
                    latency_ms,
                    disabled_until,
                    Some(&text),
                    meta,
                    agent,
                )
                .map_err(|db_err| GatewayError::Upstream(db_err.to_string()))?;
                self.emit_metric_event(failure_event);
                self.emit_model_metric(&model.visible_id);
                let _ = write_failure_log(
                    &self.config.receipts_dir,
                    &model.visible_id,
                    request_id,
                    phase,
                    &err,
                    build_failure_log_entry(
                        request_id,
                        phase,
                        &model.visible_id,
                        &model.entry.model,
                        &model.entry.api.style,
                        &model.base_url,
                        &err,
                        latency_ms,
                        cooldown,
                        message_count,
                        tool_count,
                        upstream_stream,
                    ),
                );
                warn!(
                  request_id = %request_id,
                  phase = phase,
                  model_id = %model.visible_id,
                  provider = %model.entry.provider,
                  error = %text,
                  "upstream failure"
                );
                Err(GatewayError::Upstream(text))
            }
        }
    }

    fn client_for(&self, model: &RuntimeModel) -> ProviderClient {
        provider_client(
            self.http.clone(),
            &model.entry.api.style,
            model.base_url.clone(),
            model.api_key.clone().unwrap_or_default(),
            model.entry.provider.clone(),
        )
    }

    fn routing_inputs(&self, models: &[RuntimeModel], now: i64) -> Vec<RoutingModelInput> {
        let limit_rows = self
            .state
            .limit_estimates()
            .unwrap_or_default()
            .into_iter()
            .map(|estimate| (estimate.model_id.clone(), estimate))
            .collect::<HashMap<_, _>>();
        models
            .iter()
            .map(|model| {
                let limit = limit_rows.get(&model.visible_id);
                RoutingModelInput {
                    id: model.visible_id.clone(),
                    provider: model.entry.provider.clone(),
                    ready: model.is_ready(),
                    status: model.status_label(now),
                    failure_count: model
                        .state
                        .as_ref()
                        .map(|state| state.failure_count)
                        .unwrap_or(0),
                    disabled_reason: model.disabled_reason(),
                    cooldown_until: model.cooldown_until(),
                    roles: model.entry.routing.roles.clone(),
                    routing: model.entry.routing.clone(),
                    score: model.entry.score.clone(),
                    limits: model.entry.limits.clone(),
                    context_window: model.entry.context_window,
                    configured_context_window: limit
                        .map(|limit| limit.configured_context_window)
                        .unwrap_or(model.entry.context_window),
                    safe_context_window: limit
                        .map(|limit| limit.safe_context_window)
                        .unwrap_or(model.entry.context_window),
                    learned_context_window: limit.and_then(|limit| limit.learned_context_window),
                    learned_request_token_limit: limit
                        .and_then(|limit| limit.learned_request_token_limit),
                    learned_tpm_limit: limit.and_then(|limit| limit.learned_tpm_limit),
                    recent_context_overrun_count: limit
                        .map(|limit| limit.context_overrun_count)
                        .unwrap_or(0),
                    max_output_tokens: model.entry.max_output_tokens,
                    last_latency_ms: model.state.as_ref().and_then(|state| state.last_latency_ms),
                }
            })
            .collect()
    }

    fn routing_usage(&self) -> Result<HashMap<String, RoutingUsage>> {
        let rows = self
            .state
            .usage_since(chrono::Utc::now().timestamp() - 3600)?;
        let provider_attempts = rows.iter().fold(HashMap::new(), |mut acc, item| {
            *acc.entry(item.provider.clone()).or_insert(0) += item.attempts;
            acc
        });
        Ok(rows
            .into_iter()
            .map(|item| {
                (
                    item.model_id,
                    RoutingUsage {
                        one_hour_attempts: item.attempts,
                        provider_one_hour_attempts: provider_attempts
                            .get(&item.provider)
                            .copied()
                            .unwrap_or(0),
                    },
                )
            })
            .collect())
    }

    fn usage_last_hour(&self) -> Result<HashMap<String, CapacityUsage>> {
        Ok(self
            .state
            .usage_since(chrono::Utc::now().timestamp() - 3600)?
            .into_iter()
            .map(|item| {
                (
                    item.model_id,
                    CapacityUsage {
                        attempts: item.attempts,
                        successes: item.successes,
                        failures: item.failures,
                        wins: item.wins,
                        prompt_tokens: item.prompt_tokens,
                        completion_tokens: item.completion_tokens,
                        total_tokens: item.total_tokens,
                        latency_count: item.latency_count,
                        latency_total_ms: item.latency_total_ms,
                    },
                )
            })
            .collect())
    }

    fn capacity_model(&self, model: &RuntimeModel) -> CapacityModel {
        CapacityModel {
            id: model.visible_id.clone(),
            provider: model.entry.provider.clone(),
            display_name: model.entry.display_name.clone(),
            status: model.status_label(chrono::Utc::now().timestamp()),
            limits: model.entry.limits.clone(),
        }
    }

    fn route_meta(
        &self,
        route: &RoutePlan,
        model: &RuntimeModel,
        backup_rank: Option<u64>,
    ) -> RouteEventMeta {
        RouteEventMeta {
            route_mode: Some(match backup_rank {
                Some(_) if !route.sampled => RouteMode::Backup.as_str().to_string(),
                _ => route.mode.as_str().to_string(),
            }),
            backup_rank,
            complexity_tier: Some(route.complexity_tier.as_str().to_string()),
            sampled: Some(route.sampled),
            capacity_known: Some(crate::capacity::hourly_capacity(&model.entry.limits).is_some()),
        }
    }

    fn model_status_view(&self, model: &RuntimeModel) -> ModelStatusView {
        let now = chrono::Utc::now().timestamp();
        let enabled = model.is_selectable(now);
        ModelStatusView {
            id: model.entry.id.clone(),
            provider: model.entry.provider.clone(),
            display_name: model.entry.display_name.clone(),
            upstream_model: model.entry.model.clone(),
            visible_id: model.visible_id.clone(),
            api_style: model.entry.api.style.clone(),
            base_url: model.entry.api.base_url.clone(),
            signup_url: model.entry.signup_url.clone(),
            key_present: model.has_key(),
            enabled,
            status: model.status_label(now),
            disabled_reason: model.disabled_reason(),
            cooldown_until: model.cooldown_until(),
            roles: model.entry.routing.roles.clone(),
            context_window: model.entry.context_window,
            max_output_tokens: model.entry.max_output_tokens,
            limits: json!(model.entry.limits),
            score: json!(model.entry.score),
            state: model.state.clone(),
        }
    }

    fn dashboard_model(
        &self,
        model: &RuntimeModel,
        metric: Option<&ModelMetric>,
        limit: Option<&ModelLimitEstimate>,
        hourly_used: u64,
    ) -> DashboardModel {
        let now = chrono::Utc::now().timestamp();
        let empty = ModelMetric {
            model_id: model.visible_id.clone(),
            provider: model.entry.provider.clone(),
            call_count: model
                .state
                .as_ref()
                .map(|state| state.success_count + state.failure_count)
                .unwrap_or(0),
            success_count: model
                .state
                .as_ref()
                .map(|state| state.success_count)
                .unwrap_or(0),
            failure_count: model
                .state
                .as_ref()
                .map(|state| state.failure_count)
                .unwrap_or(0),
            win_count: model
                .state
                .as_ref()
                .map(|state| state.win_count)
                .unwrap_or(0),
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
            latency_count: model
                .state
                .as_ref()
                .and_then(|state| state.last_latency_ms)
                .map(|_| 1)
                .unwrap_or(0),
            latency_total_ms: model
                .state
                .as_ref()
                .and_then(|state| state.last_latency_ms)
                .unwrap_or(0),
            latency_min_ms: model.state.as_ref().and_then(|state| state.last_latency_ms),
            latency_max_ms: model.state.as_ref().and_then(|state| state.last_latency_ms),
            last_latency_ms: model.state.as_ref().and_then(|state| state.last_latency_ms),
            last_error_kind: model
                .state
                .as_ref()
                .and_then(|state| state.last_error_kind.clone()),
            last_error_message: model
                .state
                .as_ref()
                .and_then(|state| state.last_error_message.clone()),
            updated_at: model
                .state
                .as_ref()
                .map(|state| state.updated_at)
                .unwrap_or(now),
        };
        let metric = metric.unwrap_or(&empty);
        DashboardModel {
            id: model.visible_id.clone(),
            provider: model.entry.provider.clone(),
            display_name: model.entry.display_name.clone(),
            upstream_model: model.entry.model.clone(),
            roles: model.entry.routing.roles.clone(),
            enabled: model.is_selectable(now),
            status: model.status_label(now),
            cooldown_until: model.cooldown_until(),
            capacity_known: crate::capacity::hourly_capacity(&model.entry.limits).is_some(),
            hourly_capacity: crate::capacity::hourly_capacity(&model.entry.limits)
                .map(|capacity| capacity.capacity),
            hourly_used,
            configured_context_window: limit
                .map(|limit| limit.configured_context_window)
                .unwrap_or(model.entry.context_window),
            safe_context_window: limit
                .map(|limit| limit.safe_context_window)
                .unwrap_or(model.entry.context_window),
            learned_context_window: limit.and_then(|limit| limit.learned_context_window),
            learned_request_token_limit: limit.and_then(|limit| limit.learned_request_token_limit),
            context_overrun_count: limit.map(|limit| limit.context_overrun_count).unwrap_or(0),
            smallest_overrun_requested_tokens: limit
                .and_then(|limit| limit.smallest_overrun_requested_tokens),
            call_count: metric.call_count,
            success_count: metric.success_count,
            failure_count: metric.failure_count,
            win_count: metric.win_count,
            win_rate: ratio(metric.win_count, metric.call_count),
            prompt_tokens: metric.prompt_tokens,
            completion_tokens: metric.completion_tokens,
            total_tokens: metric.total_tokens,
            avg_latency_ms: metric_average(metric),
            last_latency_ms: metric.last_latency_ms,
            min_latency_ms: metric.latency_min_ms,
            max_latency_ms: metric.latency_max_ms,
            last_error_kind: metric.last_error_kind.clone(),
            last_error_message: metric.last_error_message.clone(),
            updated_at: metric.updated_at,
        }
    }
}

fn model_by_id(models: &[RuntimeModel], id: &str) -> Option<RuntimeModel> {
    models.iter().find(|model| model.visible_id == id).cloned()
}

impl RuntimeModel {
    fn has_key(&self) -> bool {
        self.api_key
            .as_ref()
            .map(|value| !value.trim().is_empty())
            .unwrap_or(false)
    }

    fn is_ready(&self) -> bool {
        self.has_key() && self.base_url_missing_keys.is_empty() && !self.base_url.trim().is_empty()
    }

    fn disabled_reason(&self) -> Option<String> {
        self.entry.routing.disabled_reason.clone()
    }

    fn cooldown_until(&self) -> Option<i64> {
        self.state.as_ref().and_then(|state| state.disabled_until)
    }

    fn is_routable_now(&self, now: i64) -> bool {
        self.entry.routing.enabled
            && self.disabled_reason().is_none()
            && self.is_ready()
            && self
                .cooldown_until()
                .map(|until| until <= now)
                .unwrap_or(true)
            && self
                .state
                .as_ref()
                .map(|state| !is_hard_disabled_status(&state.status))
                .unwrap_or(true)
    }

    fn is_selectable(&self, now: i64) -> bool {
        self.is_routable_now(now)
    }

    fn status_label(&self, now: i64) -> String {
        if !self.has_key() {
            return "missing_key".to_string();
        }
        if !self.base_url_missing_keys.is_empty() || self.base_url.trim().is_empty() {
            return "incomplete_env".to_string();
        }
        if self.disabled_reason().is_some() {
            return "disabled".to_string();
        }
        if self
            .cooldown_until()
            .map(|until| until > now)
            .unwrap_or(false)
        {
            return self
                .state
                .as_ref()
                .map(|state| state.status.clone())
                .unwrap_or_else(|| "cooldown".to_string());
        }
        self.state
            .as_ref()
            .map(|state| state.status.clone())
            .unwrap_or_else(|| "ready".to_string())
    }

    fn readiness_status(&self) -> &'static str {
        if !self.has_key() {
            return "missing_key";
        }
        if !self.base_url_missing_keys.is_empty() || self.base_url.trim().is_empty() {
            return "incomplete_env";
        }
        "ready"
    }
}

#[derive(Clone, Debug)]
struct DraftResult {
    model: RuntimeModel,
    output: Option<UpstreamCompletion>,
    error: Option<String>,
}

impl DraftResult {
    fn from_error(model: RuntimeModel, error: GatewayError) -> Self {
        Self {
            model,
            output: None,
            error: Some(error.to_string()),
        }
    }

    fn summary(&self) -> String {
        if let Some(output) = &self.output {
            let mut parts = Vec::new();
            if let Some(text) = output
                .message
                .content
                .as_deref()
                .filter(|text| !text.trim().is_empty())
            {
                parts.push(text.trim().chars().take(400).collect::<String>());
            }
            if let Some(tools) = &output.message.tool_calls {
                parts.push(format!("tool_calls: {}", tools.len()));
            }
            if parts.is_empty() {
                parts.push("empty".to_string());
            }
            return format!("{} -> {}", self.model.visible_id, parts.join(" | "));
        }
        format!(
            "{} -> error: {}",
            self.model.visible_id,
            self.error.clone().unwrap_or_else(|| "unknown".to_string())
        )
    }
}

struct PhaseOutcome {
    response: ChatCompletionResponse,
    output: UpstreamCompletion,
}

fn is_hard_disabled_status(status: &str) -> bool {
    matches!(
        status,
        "auth_failed" | "customer_verification_required" | "no_access" | "model_unavailable"
    )
}

fn model_matches_visible(visible_model_id: &str, request_model: &str) -> bool {
    if request_model == visible_model_id {
        return true;
    }

    if request_model
        == visible_model_id
            .rsplit('/')
            .next()
            .unwrap_or(visible_model_id)
    {
        return true;
    }

    visible_model_id == request_model.rsplit('/').next().unwrap_or(request_model)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::config::{
        AppConfig, InstanceRole, ModelApi, ModelCapabilities, ModelEnv, ModelLimits, ModelRouting,
        ModelScore, Registry, RuntimeSettings, ScalingSettings, ServerConfig,
    };
    use std::collections::HashMap;

    #[test]
    fn status_view_exposes_disabled_reason() {
        let interim = tempfile::tempdir().unwrap();
        let gateway = Gateway {
            config: AppConfig {
                config_path: interim.path().join("config/server.json"),
                env_path: interim.path().join(".env.jnoccio"),
                root: interim.path().to_path_buf(),
                server: ServerConfig {
                    bind: None,
                    database: None,
                    env_file: None,
                    models_file: None,
                    receipts_dir: None,
                    model: None,
                    provider: None,
                    routing: None,
                    runtime: None,
                    scaling: None,
                },
                registry: Registry {
                    schema_version: 1,
                    models: vec![],
                },
                env: HashMap::new(),
                bind: "127.0.0.1:4317".to_string(),
                database: interim.path().join("state.sqlite"),
                receipts_dir: interim.path().join("receipts"),
                visible_model_id: "jnoccio/jnoccio-fusion".to_string(),
                provider_id: "jnoccio".to_string(),
                routing: crate::config::RoutingDefaults::from_config(None),
                runtime: RuntimeSettings::from_config(None).unwrap(),
                scaling: ScalingSettings::from_config(None).unwrap(),
                instance_role: InstanceRole::Main,
                worker_threads: RuntimeSettings::from_config(None).unwrap().worker_threads,
            },
            state: Arc::new(StateDb::open(interim.path().join("state.sqlite")).unwrap()),
            mcp: Arc::new(McpState::new(
                InstanceRole::Main,
                ScalingSettings::from_config(None).unwrap(),
            )),
            events: broadcast::channel(16).0,
            http: reqwest::Client::new(),
        };
        let model = RuntimeModel {
            entry: crate::config::ModelEntry {
                id: "test".to_string(),
                provider: "provider".to_string(),
                model: "provider/model".to_string(),
                display_name: "Test".to_string(),
                api: ModelApi {
                    style: "openai_chat".to_string(),
                    base_url: "https://example.com".to_string(),
                    completion_tokens_param: None,
                },
                env: ModelEnv {
                    api_key: "API_KEY".to_string(),
                },
                signup_url: "https://example.com".to_string(),
                limits: ModelLimits {
                    rpm: None,
                    rpd: None,
                    rpd_after_10_usd_credits: None,
                    source_url: None,
                },
                context_window: 1024,
                max_output_tokens: 128,
                capabilities: ModelCapabilities {
                    streaming: true,
                    tools: true,
                    reasoning: false,
                    openai_compatible: true,
                },
                score: ModelScore {
                    power: 1,
                    free_quota: 1,
                    reliability: 1,
                    integration: 1,
                    latency: 1,
                },
                routing: ModelRouting {
                    enabled: false,
                    roles: vec!["draft".to_string()],
                    exploration_floor: 0.1,
                    cooldown_seconds: 1,
                    disabled_reason: Some("billing required".to_string()),
                },
            },
            visible_id: "provider/test".to_string(),
            api_key: Some("token".to_string()),
            base_url: "https://example.com".to_string(),
            base_url_missing_keys: vec![],
            state: None,
        };

        let status = gateway.model_status_view(&model);
        assert_eq!(status.disabled_reason.as_deref(), Some("billing required"));
        assert!(!status.enabled);
    }

    #[test]
    fn matches_visible_model_accepts_bare_slug() {
        assert!(model_matches_visible(
            "jnoccio/jnoccio-fusion",
            "jnoccio-fusion"
        ));
        assert!(model_matches_visible(
            "jnoccio/jnoccio-fusion",
            "jnoccio/jnoccio-fusion"
        ));
        assert!(model_matches_visible(
            "jnoccio-fusion",
            "jnoccio/jnoccio-fusion"
        ));
        assert!(!model_matches_visible(
            "jnoccio/jnoccio-fusion",
            "other-model"
        ));
    }
}
