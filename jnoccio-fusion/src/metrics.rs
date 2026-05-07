use crate::capacity::CapacitySummary;
use crate::state::{ContextHistogramBucket, MetricEvent, ModelLimitEstimate, ModelMetric};
use serde::Serialize;

#[derive(Clone, Debug, serde::Serialize)]
pub struct DashboardSnapshot {
    pub totals: DashboardTotals,
    pub capacity: CapacitySummary,
    pub context: ContextDashboard,
    pub models: Vec<DashboardModel>,
    pub recent_events: Vec<MetricEvent>,
}

#[derive(Clone, Debug, Default, serde::Serialize)]
pub struct ContextDashboard {
    pub estimates: Vec<ModelLimitEstimate>,
    pub histogram: Vec<ContextHistogramBucket>,
    pub recent_events: Vec<crate::state::ModelContextEvent>,
}

#[derive(Clone, Debug, Default, serde::Serialize)]
pub struct DashboardTotals {
    pub total_models: u64,
    pub enabled_models: u64,
    pub calls: u64,
    pub successes: u64,
    pub failures: u64,
    pub wins: u64,
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
    pub average_latency_ms: Option<f64>,
}

#[derive(Clone, Debug, Serialize)]
pub struct DashboardModel {
    pub id: String,
    pub provider: String,
    pub display_name: String,
    pub upstream_model: String,
    pub roles: Vec<String>,
    pub enabled: bool,
    pub status: String,
    pub cooldown_until: Option<i64>,
    pub capacity_known: bool,
    pub hourly_capacity: Option<u64>,
    pub hourly_used: u64,
    pub configured_context_window: u64,
    pub safe_context_window: u64,
    pub learned_context_window: Option<u64>,
    pub learned_request_token_limit: Option<u64>,
    pub context_overrun_count: u64,
    pub smallest_overrun_requested_tokens: Option<u64>,
    pub call_count: u64,
    pub success_count: u64,
    pub failure_count: u64,
    pub win_count: u64,
    pub win_rate: f64,
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
    pub avg_latency_ms: Option<f64>,
    pub last_latency_ms: Option<u64>,
    pub min_latency_ms: Option<u64>,
    pub max_latency_ms: Option<u64>,
    pub last_error_kind: Option<String>,
    pub last_error_message: Option<String>,
    pub updated_at: i64,
}

pub fn dashboard_totals(models: &[DashboardModel]) -> DashboardTotals {
    let latency = models
        .iter()
        .filter_map(|model| {
            model
                .avg_latency_ms
                .map(|value| (value, model.call_count.max(1)))
        })
        .fold((0.0, 0u64), |acc, item| {
            (acc.0 + item.0 * item.1 as f64, acc.1 + item.1)
        });
    DashboardTotals {
        total_models: models.len() as u64,
        enabled_models: models.iter().filter(|model| model.enabled).count() as u64,
        calls: models.iter().map(|model| model.call_count).sum(),
        successes: models.iter().map(|model| model.success_count).sum(),
        failures: models.iter().map(|model| model.failure_count).sum(),
        wins: models.iter().map(|model| model.win_count).sum(),
        prompt_tokens: models.iter().map(|model| model.prompt_tokens).sum(),
        completion_tokens: models.iter().map(|model| model.completion_tokens).sum(),
        total_tokens: models.iter().map(|model| model.total_tokens).sum(),
        average_latency_ms: if latency.1 == 0 {
            None
        } else {
            Some(latency.0 / latency.1 as f64)
        },
    }
}

pub fn metric_average(metric: &ModelMetric) -> Option<f64> {
    average(metric.latency_total_ms, metric.latency_count)
}

pub fn ratio(numerator: u64, denominator: u64) -> f64 {
    if denominator == 0 {
        return 0.0;
    }
    numerator as f64 / denominator as f64
}

pub fn average(total: u64, count: u64) -> Option<f64> {
    if count == 0 {
        return None;
    }
    Some(total as f64 / count as f64)
}
