use crate::limits::{ErrorKind, ParsedLimitSignal};
use crate::openai::ChatUsage;
use anyhow::{Context, Result};
use rusqlite::{Connection, OptionalExtension, params};
use serde::Serialize;
use std::path::Path;
use std::sync::Mutex;

const AGENT_ACTIVITY_TTL_SECONDS: i64 = 90;

#[derive(Clone, Debug, Serialize)]
pub struct ModelState {
    pub model_id: String,
    pub provider: String,
    pub status: String,
    pub failure_count: u64,
    pub success_count: u64,
    pub win_count: u64,
    pub last_latency_ms: Option<u64>,
    pub disabled_until: Option<i64>,
    pub last_error_kind: Option<String>,
    pub last_error_message: Option<String>,
    pub updated_at: i64,
}

#[derive(Clone, Debug, Serialize)]
pub struct RequestTrace {
    pub request_id: String,
    pub phase: String,
    pub model_id: String,
    pub provider: String,
    pub status: String,
    pub error_kind: Option<String>,
    pub latency_ms: Option<u64>,
    pub cooldown_until: Option<i64>,
    pub winner_model_id: Option<String>,
    pub created_at: i64,
}

#[derive(Clone, Debug, Default, Serialize)]
pub struct UsageTotals {
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
}

#[derive(Clone, Debug, Default, Serialize)]
pub struct TokenRateEstimate {
    pub median_m_tokens_per_24h: f64,
    pub max_m_tokens_per_24h: f64,
    pub sample_minutes: u64,
    pub window_minutes: u64,
    pub smoothing_minutes: u64,
}

#[derive(Clone, Debug, Default, Serialize)]
pub struct AgentSource {
    pub id: String,
    pub client: Option<String>,
    pub session_id: Option<String>,
    pub process_role: Option<String>,
    pub pid: Option<i64>,
    pub user_agent: Option<String>,
    pub version: Option<String>,
}

#[derive(Clone, Debug, Serialize)]
pub struct AgentActivity {
    pub agent_id: String,
    pub agent_client: Option<String>,
    pub agent_session_id: Option<String>,
    pub process_role: Option<String>,
    pub pid: Option<i64>,
    pub version: Option<String>,
    pub user_agent: Option<String>,
    pub first_seen: i64,
    pub last_seen: i64,
    pub request_count: u64,
}

impl UsageTotals {
    pub fn from_usage(usage: Option<&ChatUsage>) -> Self {
        Self {
            prompt_tokens: usage.and_then(|item| item.prompt_tokens).unwrap_or(0),
            completion_tokens: usage.and_then(|item| item.completion_tokens).unwrap_or(0),
            total_tokens: usage.and_then(|item| item.total_tokens).unwrap_or(0),
        }
    }
}

#[derive(Clone, Debug, Serialize)]
pub struct ModelMetric {
    pub model_id: String,
    pub provider: String,
    pub call_count: u64,
    pub success_count: u64,
    pub failure_count: u64,
    pub win_count: u64,
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
    pub latency_count: u64,
    pub latency_total_ms: u64,
    pub latency_min_ms: Option<u64>,
    pub latency_max_ms: Option<u64>,
    pub last_latency_ms: Option<u64>,
    pub last_error_kind: Option<String>,
    pub last_error_message: Option<String>,
    pub updated_at: i64,
}

#[derive(Clone, Debug, Serialize)]
pub struct MetricEvent {
    pub id: i64,
    pub request_id: String,
    pub phase: String,
    pub model_id: String,
    pub provider: String,
    pub status: String,
    pub error_kind: Option<String>,
    pub latency_ms: Option<u64>,
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
    pub route_mode: Option<String>,
    pub backup_rank: Option<u64>,
    pub complexity_tier: Option<String>,
    pub sampled: Option<bool>,
    pub winner_model_id: Option<String>,
    pub capacity_known: Option<bool>,
    pub agent_id: Option<String>,
    pub agent_client: Option<String>,
    pub agent_session_id: Option<String>,
    pub created_at: i64,
}

#[derive(Clone, Debug, Default, Serialize)]
pub struct ModelLimitEstimate {
    pub model_id: String,
    pub provider: String,
    pub configured_context_window: u64,
    pub learned_context_window: Option<u64>,
    pub learned_request_token_limit: Option<u64>,
    pub learned_tpm_limit: Option<u64>,
    pub safe_context_window: u64,
    pub largest_success_prompt_tokens: u64,
    pub largest_success_total_tokens: u64,
    pub smallest_overrun_requested_tokens: Option<u64>,
    pub context_overrun_count: u64,
    pub rate_limit_count: u64,
    pub last_limit_error_kind: Option<String>,
    pub last_limit_error_message: Option<String>,
    pub last_limit_error_at: Option<i64>,
    pub updated_at: i64,
}

#[derive(Clone, Debug, Serialize)]
pub struct ModelContextEvent {
    pub request_id: String,
    pub phase: String,
    pub model_id: String,
    pub provider: String,
    pub status: String,
    pub approx_prompt_tokens: u64,
    pub requested_output_tokens: u64,
    pub estimated_total_tokens: u64,
    pub observed_prompt_tokens: Option<u64>,
    pub observed_total_tokens: Option<u64>,
    pub learned_limit: Option<u64>,
    pub overrun_requested_tokens: Option<u64>,
    pub error_kind: Option<String>,
    pub created_at: i64,
}

#[derive(Clone, Debug, Serialize)]
pub struct ContextHistogramBucket {
    pub bucket_start: u64,
    pub bucket_end: u64,
    pub success_count: u64,
    pub failure_count: u64,
    pub overrun_count: u64,
}

#[derive(Clone, Debug, Default)]
pub struct RouteEventMeta {
    pub route_mode: Option<String>,
    pub backup_rank: Option<u64>,
    pub complexity_tier: Option<String>,
    pub sampled: Option<bool>,
    pub capacity_known: Option<bool>,
}

#[derive(Clone, Debug)]
pub struct RequestRoute {
    pub request_id: String,
    pub route_mode: String,
    pub sampled: bool,
    pub complexity_tier: String,
    pub complexity_score: u64,
    pub primary_model_id: Option<String>,
    pub backup_model_ids: Vec<String>,
    pub fusion_model_id: Option<String>,
    pub created_at: i64,
}

#[derive(Clone, Debug, Default)]
pub struct ModelUsageWindow {
    pub model_id: String,
    pub provider: String,
    pub attempts: u64,
    pub successes: u64,
    pub failures: u64,
    pub wins: u64,
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
    pub latency_count: u64,
    pub latency_total_ms: u64,
}

pub struct StateDb {
    conn: Mutex<Connection>,
    event_retention_rows: usize,
}

impl StateDb {
    pub fn open(path: impl AsRef<Path>) -> Result<Self> {
        Self::open_with_retention(path, 50_000)
    }

    pub fn open_with_retention(
        path: impl AsRef<Path>,
        event_retention_rows: usize,
    ) -> Result<Self> {
        if let Some(parent) = path.as_ref().parent() {
            std::fs::create_dir_all(parent)
                .with_context(|| format!("create {}", parent.display()))?;
        }
        let conn = Connection::open(path.as_ref())
            .with_context(|| format!("open {}", path.as_ref().display()))?;
        let db = Self {
            conn: Mutex::new(conn),
            event_retention_rows: event_retention_rows.max(1),
        };
        db.init()?;
        Ok(db)
    }

    fn init(&self) -> Result<()> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute_batch(
            r#"
      PRAGMA journal_mode = WAL;
      PRAGMA busy_timeout = 5000;
      PRAGMA synchronous = NORMAL;
      CREATE TABLE IF NOT EXISTS model_state (
        model_id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        status TEXT NOT NULL,
        failure_count INTEGER NOT NULL DEFAULT 0,
        success_count INTEGER NOT NULL DEFAULT 0,
        win_count INTEGER NOT NULL DEFAULT 0,
        last_latency_ms INTEGER,
        disabled_until INTEGER,
        last_error_kind TEXT,
        last_error_message TEXT,
        updated_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS request_trace (
        request_id TEXT NOT NULL,
        phase TEXT NOT NULL,
        model_id TEXT NOT NULL,
        provider TEXT NOT NULL,
        status TEXT NOT NULL,
        error_kind TEXT,
        latency_ms INTEGER,
        cooldown_until INTEGER,
        winner_model_id TEXT,
        route_mode TEXT,
        backup_rank INTEGER,
        complexity_tier TEXT,
        capacity_known INTEGER,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS request_route (
        request_id TEXT PRIMARY KEY,
        route_mode TEXT NOT NULL,
        sampled INTEGER NOT NULL,
        complexity_tier TEXT NOT NULL,
        complexity_score INTEGER NOT NULL,
        primary_model_id TEXT,
        backup_model_ids TEXT NOT NULL,
        fusion_model_id TEXT,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS fusion_score (
        model_id TEXT PRIMARY KEY,
        attempts INTEGER NOT NULL DEFAULT 0,
        wins INTEGER NOT NULL DEFAULT 0,
        last_won_at INTEGER
      );
      CREATE TABLE IF NOT EXISTS provider_quota (
        model_id TEXT PRIMARY KEY,
        requests_today INTEGER NOT NULL DEFAULT 0,
        window_started_at INTEGER NOT NULL DEFAULT 0,
        disabled_until INTEGER
      );
      CREATE TABLE IF NOT EXISTS model_metrics (
        model_id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        call_count INTEGER NOT NULL DEFAULT 0,
        success_count INTEGER NOT NULL DEFAULT 0,
        failure_count INTEGER NOT NULL DEFAULT 0,
        win_count INTEGER NOT NULL DEFAULT 0,
        prompt_tokens INTEGER NOT NULL DEFAULT 0,
        completion_tokens INTEGER NOT NULL DEFAULT 0,
        total_tokens INTEGER NOT NULL DEFAULT 0,
        latency_count INTEGER NOT NULL DEFAULT 0,
        latency_total_ms INTEGER NOT NULL DEFAULT 0,
        latency_min_ms INTEGER,
        latency_max_ms INTEGER,
        last_latency_ms INTEGER,
        last_error_kind TEXT,
        last_error_message TEXT,
        updated_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS model_metric_event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id TEXT NOT NULL,
        phase TEXT NOT NULL,
        model_id TEXT NOT NULL,
        provider TEXT NOT NULL,
        status TEXT NOT NULL,
        error_kind TEXT,
        latency_ms INTEGER,
        prompt_tokens INTEGER NOT NULL DEFAULT 0,
        completion_tokens INTEGER NOT NULL DEFAULT 0,
        total_tokens INTEGER NOT NULL DEFAULT 0,
        route_mode TEXT,
        backup_rank INTEGER,
        complexity_tier TEXT,
        sampled INTEGER,
        winner_model_id TEXT,
        capacity_known INTEGER,
        agent_id TEXT,
        agent_client TEXT,
        agent_session_id TEXT,
        created_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS agent_activity (
        agent_id TEXT PRIMARY KEY,
        agent_client TEXT,
        agent_session_id TEXT,
        process_role TEXT,
        pid INTEGER,
        version TEXT,
        user_agent TEXT,
        first_seen INTEGER NOT NULL,
        last_seen INTEGER NOT NULL,
        request_count INTEGER NOT NULL DEFAULT 1
      );
      CREATE INDEX IF NOT EXISTS idx_agent_activity_last_seen
        ON agent_activity (last_seen DESC);
      CREATE TABLE IF NOT EXISTS model_usage_minute (
        model_id TEXT NOT NULL,
        provider TEXT NOT NULL,
        minute_ts INTEGER NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        successes INTEGER NOT NULL DEFAULT 0,
        failures INTEGER NOT NULL DEFAULT 0,
        wins INTEGER NOT NULL DEFAULT 0,
        prompt_tokens INTEGER NOT NULL DEFAULT 0,
        completion_tokens INTEGER NOT NULL DEFAULT 0,
        total_tokens INTEGER NOT NULL DEFAULT 0,
        latency_count INTEGER NOT NULL DEFAULT 0,
        latency_total_ms INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (model_id, minute_ts)
      );
      CREATE TABLE IF NOT EXISTS model_limit_estimate (
        model_id TEXT PRIMARY KEY,
        provider TEXT NOT NULL,
        configured_context_window INTEGER NOT NULL DEFAULT 0,
        learned_context_window INTEGER,
        learned_request_token_limit INTEGER,
        learned_tpm_limit INTEGER,
        safe_context_window INTEGER NOT NULL DEFAULT 0,
        largest_success_prompt_tokens INTEGER NOT NULL DEFAULT 0,
        largest_success_total_tokens INTEGER NOT NULL DEFAULT 0,
        smallest_overrun_requested_tokens INTEGER,
        context_overrun_count INTEGER NOT NULL DEFAULT 0,
        rate_limit_count INTEGER NOT NULL DEFAULT 0,
        last_limit_error_kind TEXT,
        last_limit_error_message TEXT,
        last_limit_error_at INTEGER,
        updated_at INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS model_context_event (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        request_id TEXT NOT NULL,
        phase TEXT NOT NULL,
        model_id TEXT NOT NULL,
        provider TEXT NOT NULL,
        status TEXT NOT NULL,
        approx_prompt_tokens INTEGER NOT NULL,
        requested_output_tokens INTEGER NOT NULL DEFAULT 0,
        estimated_total_tokens INTEGER NOT NULL,
        observed_prompt_tokens INTEGER,
        observed_total_tokens INTEGER,
        learned_limit INTEGER,
        overrun_requested_tokens INTEGER,
        error_kind TEXT,
        created_at INTEGER NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_model_metric_event_created_at
        ON model_metric_event (created_at DESC, id DESC);
      CREATE INDEX IF NOT EXISTS idx_model_metric_event_model_id
        ON model_metric_event (model_id, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_model_usage_minute_minute_ts
        ON model_usage_minute (minute_ts DESC);
      CREATE INDEX IF NOT EXISTS idx_request_route_created_at
        ON request_route (created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_model_context_event_model_id
        ON model_context_event (model_id, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_model_context_event_created_at
        ON model_context_event (created_at DESC);
      "#,
        )?;
        ensure_column(&conn, "request_trace", "route_mode", "TEXT")?;
        ensure_column(&conn, "request_trace", "backup_rank", "INTEGER")?;
        ensure_column(&conn, "request_trace", "complexity_tier", "TEXT")?;
        ensure_column(&conn, "request_trace", "capacity_known", "INTEGER")?;
        ensure_column(&conn, "model_metric_event", "route_mode", "TEXT")?;
        ensure_column(&conn, "model_metric_event", "backup_rank", "INTEGER")?;
        ensure_column(&conn, "model_metric_event", "complexity_tier", "TEXT")?;
        ensure_column(&conn, "model_metric_event", "sampled", "INTEGER")?;
        ensure_column(&conn, "model_metric_event", "winner_model_id", "TEXT")?;
        ensure_column(&conn, "model_metric_event", "capacity_known", "INTEGER")?;
        ensure_column(&conn, "model_metric_event", "agent_id", "TEXT")?;
        ensure_column(&conn, "model_metric_event", "agent_client", "TEXT")?;
        ensure_column(&conn, "model_metric_event", "agent_session_id", "TEXT")?;
        ensure_column(&conn, "agent_activity", "agent_session_id", "TEXT")?;
        ensure_column(&conn, "agent_activity", "process_role", "TEXT")?;
        ensure_column(&conn, "agent_activity", "pid", "INTEGER")?;
        ensure_column(&conn, "agent_activity", "version", "TEXT")?;
        ensure_column(&conn, "agent_activity", "user_agent", "TEXT")?;
        Ok(())
    }

    pub fn snapshot(&self) -> Result<Vec<ModelState>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
      r#"
      SELECT model_id, provider, status, failure_count, success_count, win_count, last_latency_ms, disabled_until, last_error_kind, last_error_message, updated_at
      FROM model_state
      ORDER BY model_id
      "#,
    )?;
        let rows = stmt.query_map([], |row| {
            Ok(ModelState {
                model_id: row.get(0)?,
                provider: row.get(1)?,
                status: row.get(2)?,
                failure_count: row.get::<_, i64>(3)? as u64,
                success_count: row.get::<_, i64>(4)? as u64,
                win_count: row.get::<_, i64>(5)? as u64,
                last_latency_ms: row.get::<_, Option<i64>>(6)?.map(|value| value as u64),
                disabled_until: row.get(7)?,
                last_error_kind: row.get(8)?,
                last_error_message: row.get(9)?,
                updated_at: row.get(10)?,
            })
        })?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(Into::into)
    }

    pub fn state_for(&self, model_id: &str) -> Result<Option<ModelState>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
      r#"
      SELECT model_id, provider, status, failure_count, success_count, win_count, last_latency_ms, disabled_until, last_error_kind, last_error_message, updated_at
      FROM model_state
      WHERE model_id = ?1
      "#,
    )?;
        stmt.query_row([model_id], |row| {
            Ok(ModelState {
                model_id: row.get(0)?,
                provider: row.get(1)?,
                status: row.get(2)?,
                failure_count: row.get::<_, i64>(3)? as u64,
                success_count: row.get::<_, i64>(4)? as u64,
                win_count: row.get::<_, i64>(5)? as u64,
                last_latency_ms: row.get::<_, Option<i64>>(6)?.map(|value| value as u64),
                disabled_until: row.get(7)?,
                last_error_kind: row.get(8)?,
                last_error_message: row.get(9)?,
                updated_at: row.get(10)?,
            })
        })
        .optional()
        .map_err(Into::into)
    }

    pub fn upsert_model(&self, model_id: &str, provider: &str, status: &str) -> Result<()> {
        let now = now_unix();
        let existing = self.state_for(model_id)?;
        if let Some(existing) = existing {
            let readiness_changed = matches!(status, "missing_key" | "incomplete_env");
            if readiness_changed {
                let conn = self.conn.lock().expect("sqlite mutex poisoned");
                conn.execute(
                    r#"
          UPDATE model_state
          SET provider = ?1,
              status = ?2,
              disabled_until = NULL,
              last_error_kind = NULL,
              last_error_message = NULL,
              updated_at = ?3
          WHERE model_id = ?4
          "#,
                    params![provider, status, now, model_id],
                )?;
                drop(conn);
                self.upsert_metric_model(model_id, provider)?;
                return Ok(());
            }
            if preserves_startup_status(&existing) {
                let conn = self.conn.lock().expect("sqlite mutex poisoned");
                conn.execute(
                    r#"
          UPDATE model_state
          SET provider = ?1,
              updated_at = ?2
          WHERE model_id = ?3
          "#,
                    params![provider, now, model_id],
                )?;
                drop(conn);
                self.upsert_metric_model(model_id, provider)?;
                return Ok(());
            }
            let conn = self.conn.lock().expect("sqlite mutex poisoned");
            conn.execute(
                r#"
        UPDATE model_state
        SET provider = ?1,
            status = ?2,
            updated_at = ?3
        WHERE model_id = ?4
        "#,
                params![provider, status, now, model_id],
            )?;
            drop(conn);
            self.upsert_metric_model(model_id, provider)?;
            return Ok(());
        }
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
      r#"
      INSERT INTO model_state (model_id, provider, status, failure_count, success_count, win_count, updated_at)
      VALUES (?1, ?2, ?3, 0, 0, 0, ?4)
      "#,
      params![model_id, provider, status, now],
    )?;
        drop(conn);
        self.upsert_metric_model(model_id, provider)?;
        Ok(())
    }

    pub fn record_agent_activity(&self, agent: &AgentSource) -> Result<()> {
        let now = now_unix();
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
            r#"
      INSERT INTO agent_activity (
        agent_id, agent_client, agent_session_id, process_role, pid, version, user_agent,
        first_seen, last_seen, request_count
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?8, 1)
      ON CONFLICT(agent_id) DO UPDATE SET
        agent_client = excluded.agent_client,
        agent_session_id = excluded.agent_session_id,
        process_role = excluded.process_role,
        pid = excluded.pid,
        version = excluded.version,
        user_agent = excluded.user_agent,
        last_seen = excluded.last_seen,
        request_count = request_count + 1
      "#,
            params![
                &agent.id,
                agent.client,
                agent.session_id,
                agent.process_role,
                agent.pid,
                agent.version,
                agent.user_agent,
                now
            ],
        )?;
        Ok(())
    }

    pub fn active_agents(&self, now: i64, ttl_seconds: i64) -> Result<Vec<AgentActivity>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT agent_id, agent_client, agent_session_id, process_role, pid, version, user_agent,
             first_seen, last_seen, request_count
      FROM agent_activity
      WHERE last_seen >= ?1
      ORDER BY last_seen DESC
      "#,
        )?;
        let rows = stmt.query_map([now - ttl_seconds], |row| {
            Ok(AgentActivity {
                agent_id: row.get(0)?,
                agent_client: row.get(1)?,
                agent_session_id: row.get(2)?,
                process_role: row.get(3)?,
                pid: row.get(4)?,
                version: row.get(5)?,
                user_agent: row.get(6)?,
                first_seen: row.get(7)?,
                last_seen: row.get(8)?,
                request_count: row.get::<_, i64>(9)? as u64,
            })
        })?;
        rows.collect::<rusqlite::Result<Vec<_>>>().map_err(Into::into)
    }

    pub fn active_agents_live(&self, now: i64) -> Result<Vec<AgentActivity>> {
        self.active_agents(now, AGENT_ACTIVITY_TTL_SECONDS)
    }

    pub fn prune_expired_agent_activity(&self, ttl_seconds: i64, now: i64) -> Result<usize> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let rows_deleted = conn.execute(
            "DELETE FROM agent_activity WHERE last_seen < ?1",
            [now - ttl_seconds],
        )?;
        Ok(rows_deleted)
    }

    pub fn record_attempt(
        &self,
        request_id: &str,
        phase: &str,
        model_id: &str,
        provider: &str,
        meta: &RouteEventMeta,
        agent: Option<&AgentSource>,
    ) -> Result<MetricEvent> {
        let now = now_unix();
        self.upsert_metric_model(model_id, provider)?;
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
            r#"
      INSERT INTO request_trace (
        request_id, phase, model_id, provider, status, route_mode, backup_rank,
        complexity_tier, capacity_known, created_at
      )
      VALUES (?1, ?2, ?3, ?4, 'attempt', ?5, ?6, ?7, ?8, ?9)
            "#,
            params![
                request_id,
                phase,
                model_id,
                provider,
                &meta.route_mode,
                meta.backup_rank.map(|value| value as i64),
                &meta.complexity_tier,
                option_bool_to_i64(meta.capacity_known),
                now
            ],
        )?;
        conn.execute(
            r#"
      UPDATE model_metrics
      SET call_count = call_count + 1,
          updated_at = ?1
      WHERE model_id = ?2
      "#,
            params![now, model_id],
        )?;
        let event = MetricEvent {
            id: 0,
            request_id: request_id.to_string(),
            phase: phase.to_string(),
            model_id: model_id.to_string(),
            provider: provider.to_string(),
            status: "attempt".to_string(),
            error_kind: None,
            latency_ms: None,
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
            route_mode: meta.route_mode.clone(),
            backup_rank: meta.backup_rank,
            complexity_tier: meta.complexity_tier.clone(),
            sampled: meta.sampled,
            winner_model_id: None,
            capacity_known: meta.capacity_known,
            agent_id: agent.map(|value| value.id.clone()),
            agent_client: agent.and_then(|value| value.client.clone()),
            agent_session_id: agent.and_then(|value| value.session_id.clone()),
            created_at: now,
        };
        let id = insert_metric_event(&conn, &event)?;
        upsert_usage_minute(
            &conn,
            now,
            model_id,
            provider,
            1,
            0,
            0,
            0,
            &UsageTotals::default(),
            None,
        )?;
        prune_metric_events(&conn, self.event_retention_rows)?;
        Ok(MetricEvent { id, ..event })
    }

    pub fn upsert_metric_model(&self, model_id: &str, provider: &str) -> Result<()> {
        let now = now_unix();
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let existing = conn
            .query_row(
                "SELECT model_id FROM model_metrics WHERE model_id = ?1",
                [model_id],
                |row| row.get::<_, String>(0),
            )
            .optional()?;
        if existing.is_some() {
            conn.execute(
                r#"
        UPDATE model_metrics
        SET provider = ?1,
            updated_at = ?2
        WHERE model_id = ?3
        "#,
                params![provider, now, model_id],
            )?;
            return Ok(());
        }
        let historical = conn
            .query_row(
                r#"
        SELECT success_count, failure_count, win_count, last_latency_ms, last_error_kind, last_error_message
        FROM model_state
        WHERE model_id = ?1
        "#,
                [model_id],
                |row| {
                    Ok((
                        row.get::<_, i64>(0)?,
                        row.get::<_, i64>(1)?,
                        row.get::<_, i64>(2)?,
                        row.get::<_, Option<i64>>(3)?,
                        row.get::<_, Option<String>>(4)?,
                        row.get::<_, Option<String>>(5)?,
                    ))
                },
            )
            .optional()?;
        let (
            success_count,
            failure_count,
            win_count,
            last_latency_ms,
            last_error_kind,
            last_error_message,
        ) = historical.unwrap_or((0, 0, 0, None, None, None));
        conn.execute(
            r#"
      INSERT INTO model_metrics (
        model_id, provider, call_count, success_count, failure_count, win_count,
        latency_count, latency_total_ms, latency_min_ms, latency_max_ms, last_latency_ms,
        last_error_kind, last_error_message, updated_at
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14)
      "#,
            params![
                model_id,
                provider,
                success_count + failure_count,
                success_count,
                failure_count,
                win_count,
                last_latency_ms.map(|_| 1).unwrap_or(0),
                last_latency_ms.unwrap_or(0),
                last_latency_ms,
                last_latency_ms,
                last_latency_ms,
                last_error_kind,
                last_error_message,
                now
            ],
        )?;
        Ok(())
    }

    pub fn upsert_limit_model(
        &self,
        model_id: &str,
        provider: &str,
        configured_context_window: u64,
    ) -> Result<()> {
        let now = now_unix();
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
            r#"
      INSERT INTO model_limit_estimate (
        model_id, provider, configured_context_window, safe_context_window, updated_at
      )
      VALUES (?1, ?2, ?3, ?3, ?4)
      ON CONFLICT(model_id) DO UPDATE SET
        provider = excluded.provider,
        configured_context_window = excluded.configured_context_window,
        updated_at = excluded.updated_at
      "#,
            params![model_id, provider, configured_context_window as i64, now],
        )?;
        recompute_limit_safe(&conn, model_id)?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub fn record_context_success(
        &self,
        request_id: &str,
        phase: &str,
        model_id: &str,
        provider: &str,
        approx_prompt_tokens: u64,
        requested_output_tokens: u64,
        usage: Option<&ChatUsage>,
    ) -> Result<()> {
        let now = now_unix();
        let observed_prompt_tokens = usage.and_then(|item| item.prompt_tokens);
        let observed_total_tokens = usage.and_then(|item| item.total_tokens).or_else(|| {
            usage.and_then(|item| {
                item.prompt_tokens
                    .zip(item.completion_tokens)
                    .map(|tokens| tokens.0 + tokens.1)
            })
        });
        let estimated_total_tokens = approx_prompt_tokens.saturating_add(requested_output_tokens);
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        ensure_limit_row(&conn, model_id, provider, now)?;
        conn.execute(
            r#"
      INSERT INTO model_context_event (
        request_id, phase, model_id, provider, status, approx_prompt_tokens,
        requested_output_tokens, estimated_total_tokens, observed_prompt_tokens,
        observed_total_tokens, created_at
      )
      VALUES (?1, ?2, ?3, ?4, 'success', ?5, ?6, ?7, ?8, ?9, ?10)
      "#,
            params![
                request_id,
                phase,
                model_id,
                provider,
                approx_prompt_tokens as i64,
                requested_output_tokens as i64,
                estimated_total_tokens as i64,
                observed_prompt_tokens.map(|value| value as i64),
                observed_total_tokens.map(|value| value as i64),
                now
            ],
        )?;
        conn.execute(
            r#"
      UPDATE model_limit_estimate
      SET largest_success_prompt_tokens = MAX(largest_success_prompt_tokens, ?1),
          largest_success_total_tokens = MAX(largest_success_total_tokens, ?2),
          updated_at = ?3
      WHERE model_id = ?4
      "#,
            params![
                observed_prompt_tokens.unwrap_or(approx_prompt_tokens) as i64,
                observed_total_tokens.unwrap_or(estimated_total_tokens) as i64,
                now,
                model_id
            ],
        )?;
        recompute_limit_safe(&conn, model_id)?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub fn record_context_failure(
        &self,
        request_id: &str,
        phase: &str,
        model_id: &str,
        provider: &str,
        approx_prompt_tokens: u64,
        requested_output_tokens: u64,
        signal: Option<&ParsedLimitSignal>,
        kind: &ErrorKind,
        message: &str,
    ) -> Result<()> {
        let now = now_unix();
        let estimated_total_tokens = approx_prompt_tokens.saturating_add(requested_output_tokens);
        let learned_context_window = signal.and_then(|signal| signal.learned_context_window);
        let learned_request_token_limit =
            signal.and_then(|signal| signal.learned_request_token_limit);
        let learned_tpm_limit = signal.and_then(|signal| signal.learned_tpm_limit);
        let learned_limit = learned_context_window
            .or(learned_request_token_limit)
            .or(learned_tpm_limit);
        let overrun_requested_tokens = signal
            .and_then(|signal| signal.requested_tokens.or(signal.message_tokens))
            .or(Some(estimated_total_tokens));
        let kind_text = format!("{kind:?}");
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        ensure_limit_row(&conn, model_id, provider, now)?;
        conn.execute(
            r#"
      INSERT INTO model_context_event (
        request_id, phase, model_id, provider, status, approx_prompt_tokens,
        requested_output_tokens, estimated_total_tokens, learned_limit,
        overrun_requested_tokens, error_kind, created_at
      )
      VALUES (?1, ?2, ?3, ?4, 'failure', ?5, ?6, ?7, ?8, ?9, ?10, ?11)
      "#,
            params![
                request_id,
                phase,
                model_id,
                provider,
                approx_prompt_tokens as i64,
                requested_output_tokens as i64,
                estimated_total_tokens as i64,
                learned_limit.map(|value| value as i64),
                overrun_requested_tokens.map(|value| value as i64),
                &kind_text,
                now
            ],
        )?;
        conn.execute(
            r#"
      UPDATE model_limit_estimate
      SET learned_context_window = CASE
            WHEN ?1 IS NULL THEN learned_context_window
            WHEN learned_context_window IS NULL THEN ?1
            ELSE MIN(learned_context_window, ?1)
          END,
          learned_request_token_limit = CASE
            WHEN ?2 IS NULL THEN learned_request_token_limit
            WHEN learned_request_token_limit IS NULL THEN ?2
            ELSE MIN(learned_request_token_limit, ?2)
          END,
          learned_tpm_limit = CASE
            WHEN ?3 IS NULL THEN learned_tpm_limit
            WHEN learned_tpm_limit IS NULL THEN ?3
            ELSE MIN(learned_tpm_limit, ?3)
          END,
          smallest_overrun_requested_tokens = CASE
            WHEN ?4 IS NULL THEN smallest_overrun_requested_tokens
            WHEN smallest_overrun_requested_tokens IS NULL THEN ?4
            ELSE MIN(smallest_overrun_requested_tokens, ?4)
          END,
          context_overrun_count = context_overrun_count + ?5,
          rate_limit_count = rate_limit_count + ?6,
          last_limit_error_kind = ?7,
          last_limit_error_message = ?8,
          last_limit_error_at = ?9,
          updated_at = ?9
      WHERE model_id = ?10
      "#,
            params![
                learned_context_window.map(|value| value as i64),
                learned_request_token_limit.map(|value| value as i64),
                learned_tpm_limit.map(|value| value as i64),
                overrun_requested_tokens.map(|value| value as i64),
                if matches!(kind, ErrorKind::ContextOverflow) || signal.is_some() {
                    1
                } else {
                    0
                },
                if matches!(kind, ErrorKind::RateLimited | ErrorKind::QuotaExhausted) {
                    1
                } else {
                    0
                },
                kind_text,
                message,
                now,
                model_id
            ],
        )?;
        recompute_limit_safe(&conn, model_id)?;
        Ok(())
    }

    #[allow(clippy::too_many_arguments)]
    pub fn record_success(
        &self,
        request_id: &str,
        phase: &str,
        model_id: &str,
        provider: &str,
        latency_ms: u64,
        winner_model_id: Option<&str>,
        usage: Option<&ChatUsage>,
        meta: &RouteEventMeta,
        agent: Option<&AgentSource>,
    ) -> Result<MetricEvent> {
        let now = now_unix();
        let usage = UsageTotals::from_usage(usage);
        self.upsert_metric_model(model_id, provider)?;
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
            r#"
      UPDATE model_state
      SET status = 'healthy',
          failure_count = CASE WHEN failure_count > 0 THEN failure_count - 1 ELSE 0 END,
          success_count = success_count + 1,
          last_latency_ms = ?1,
          last_error_kind = NULL,
          last_error_message = NULL,
          disabled_until = NULL,
          updated_at = ?2
      WHERE model_id = ?3
      "#,
            params![latency_ms as i64, now, model_id],
        )?;
        conn.execute(
            r#"
      UPDATE model_metrics
      SET call_count = MAX(call_count, success_count + failure_count + 1),
          success_count = success_count + 1,
          prompt_tokens = prompt_tokens + ?1,
          completion_tokens = completion_tokens + ?2,
          total_tokens = total_tokens + ?3,
          latency_count = latency_count + 1,
          latency_total_ms = latency_total_ms + ?4,
          latency_min_ms = CASE WHEN latency_min_ms IS NULL THEN ?4 ELSE MIN(latency_min_ms, ?4) END,
          latency_max_ms = CASE WHEN latency_max_ms IS NULL THEN ?4 ELSE MAX(latency_max_ms, ?4) END,
          last_latency_ms = ?4,
          last_error_kind = NULL,
          last_error_message = NULL,
          updated_at = ?5
      WHERE model_id = ?6
      "#,
            params![
                usage.prompt_tokens as i64,
                usage.completion_tokens as i64,
                usage.total_tokens as i64,
                latency_ms as i64,
                now,
                model_id
            ],
        )?;
        conn.execute(
            r#"
      INSERT INTO request_trace (
        request_id, phase, model_id, provider, status, latency_ms, winner_model_id,
        route_mode, backup_rank, complexity_tier, capacity_known, created_at
      )
      VALUES (?1, ?2, ?3, ?4, 'success', ?5, ?6, ?7, ?8, ?9, ?10, ?11)
      "#,
            params![
                request_id,
                phase,
                model_id,
                provider,
                latency_ms as i64,
                winner_model_id,
                &meta.route_mode,
                meta.backup_rank.map(|value| value as i64),
                &meta.complexity_tier,
                option_bool_to_i64(meta.capacity_known),
                now
            ],
        )?;
        let event = MetricEvent {
            id: 0,
            request_id: request_id.to_string(),
            phase: phase.to_string(),
            model_id: model_id.to_string(),
            provider: provider.to_string(),
            status: "success".to_string(),
            error_kind: None,
            latency_ms: Some(latency_ms),
            prompt_tokens: usage.prompt_tokens,
            completion_tokens: usage.completion_tokens,
            total_tokens: usage.total_tokens,
            route_mode: meta.route_mode.clone(),
            backup_rank: meta.backup_rank,
            complexity_tier: meta.complexity_tier.clone(),
            sampled: meta.sampled,
            winner_model_id: winner_model_id.map(str::to_string),
            capacity_known: meta.capacity_known,
            agent_id: agent.map(|value| value.id.clone()),
            agent_client: agent.and_then(|value| value.client.clone()),
            agent_session_id: agent.and_then(|value| value.session_id.clone()),
            created_at: now,
        };
        let id = insert_metric_event(&conn, &event)?;
        upsert_usage_minute(
            &conn,
            now,
            model_id,
            provider,
            0,
            1,
            0,
            0,
            &usage,
            Some(latency_ms),
        )?;
        prune_metric_events(&conn, self.event_retention_rows)?;
        Ok(MetricEvent { id, ..event })
    }

    #[allow(clippy::too_many_arguments)]
    pub fn record_failure(
        &self,
        request_id: &str,
        phase: &str,
        model_id: &str,
        provider: &str,
        kind: &ErrorKind,
        latency_ms: u64,
        cooldown_until: Option<i64>,
        message: Option<&str>,
        meta: &RouteEventMeta,
        agent: Option<&AgentSource>,
    ) -> Result<MetricEvent> {
        let now = now_unix();
        let kind_text = format!("{kind:?}");
        self.upsert_metric_model(model_id, provider)?;
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
            r#"
      UPDATE model_state
      SET status = ?1,
          failure_count = failure_count + 1,
          last_latency_ms = ?2,
          disabled_until = COALESCE(?3, disabled_until),
          last_error_kind = ?4,
          last_error_message = ?5,
          updated_at = ?6
      WHERE model_id = ?7
      "#,
            params![
                kind_to_status(kind),
                latency_ms as i64,
                cooldown_until,
                kind_text,
                message,
                now,
                model_id
            ],
        )?;
        conn.execute(
            r#"
      UPDATE model_metrics
      SET call_count = MAX(call_count, success_count + failure_count + 1),
          failure_count = failure_count + 1,
          latency_count = latency_count + 1,
          latency_total_ms = latency_total_ms + ?1,
          latency_min_ms = CASE WHEN latency_min_ms IS NULL THEN ?1 ELSE MIN(latency_min_ms, ?1) END,
          latency_max_ms = CASE WHEN latency_max_ms IS NULL THEN ?1 ELSE MAX(latency_max_ms, ?1) END,
          last_latency_ms = ?1,
          last_error_kind = ?2,
          last_error_message = ?3,
          updated_at = ?4
      WHERE model_id = ?5
      "#,
            params![latency_ms as i64, &kind_text, message, now, model_id],
        )?;
        conn.execute(
            r#"
      INSERT INTO request_trace (
        request_id, phase, model_id, provider, status, error_kind, latency_ms, cooldown_until,
        route_mode, backup_rank, complexity_tier, capacity_known, created_at
      )
      VALUES (?1, ?2, ?3, ?4, 'failure', ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
      "#,
            params![
                request_id,
                phase,
                model_id,
                provider,
                &kind_text,
                latency_ms as i64,
                cooldown_until,
                &meta.route_mode,
                meta.backup_rank.map(|value| value as i64),
                &meta.complexity_tier,
                option_bool_to_i64(meta.capacity_known),
                now
            ],
        )?;
        let event = MetricEvent {
            id: 0,
            request_id: request_id.to_string(),
            phase: phase.to_string(),
            model_id: model_id.to_string(),
            provider: provider.to_string(),
            status: "failure".to_string(),
            error_kind: Some(format!("{kind:?}")),
            latency_ms: Some(latency_ms),
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
            route_mode: meta.route_mode.clone(),
            backup_rank: meta.backup_rank,
            complexity_tier: meta.complexity_tier.clone(),
            sampled: meta.sampled,
            winner_model_id: None,
            capacity_known: meta.capacity_known,
            agent_id: agent.map(|value| value.id.clone()),
            agent_client: agent.and_then(|value| value.client.clone()),
            agent_session_id: agent.and_then(|value| value.session_id.clone()),
            created_at: now,
        };
        let id = insert_metric_event(&conn, &event)?;
        upsert_usage_minute(
            &conn,
            now,
            model_id,
            provider,
            0,
            0,
            1,
            0,
            &UsageTotals::default(),
            Some(latency_ms),
        )?;
        prune_metric_events(&conn, self.event_retention_rows)?;
        Ok(MetricEvent { id, ..event })
    }

    pub fn record_winner(&self, model_id: &str) -> Result<MetricEvent> {
        self.record_winner_for_request(
            &uuid::Uuid::new_v4().to_string(),
            model_id,
            &RouteEventMeta::default(),
            None,
        )
    }

    pub fn record_winner_for_request(
        &self,
        request_id: &str,
        model_id: &str,
        meta: &RouteEventMeta,
        agent: Option<&AgentSource>,
    ) -> Result<MetricEvent> {
        let now = now_unix();
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let provider = conn
            .query_row(
                "SELECT provider FROM model_metrics WHERE model_id = ?1",
                [model_id],
                |row| row.get::<_, String>(0),
            )
            .optional()?
            .unwrap_or_else(|| model_id.split('/').next().unwrap_or("unknown").to_string());
        conn.execute(
            r#"
      INSERT INTO fusion_score (model_id, attempts, wins, last_won_at)
      VALUES (?1, 1, 1, ?2)
      ON CONFLICT(model_id) DO UPDATE SET
        attempts = attempts + 1,
        wins = wins + 1,
        last_won_at = excluded.last_won_at
      "#,
            params![model_id, now],
        )?;
        conn.execute(
            r#"
      UPDATE model_state
      SET win_count = win_count + 1,
          updated_at = ?1
      WHERE model_id = ?2
            "#,
            params![now, model_id],
        )?;
        conn.execute(
            r#"
      UPDATE model_metrics
      SET win_count = win_count + 1,
          updated_at = ?1
      WHERE model_id = ?2
      "#,
            params![now, model_id],
        )?;
        let event = MetricEvent {
            id: 0,
            request_id: request_id.to_string(),
            phase: "winner".to_string(),
            model_id: model_id.to_string(),
            provider,
            status: "winner".to_string(),
            error_kind: None,
            latency_ms: None,
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
            route_mode: meta.route_mode.clone(),
            backup_rank: meta.backup_rank,
            complexity_tier: meta.complexity_tier.clone(),
            sampled: meta.sampled,
            winner_model_id: Some(model_id.to_string()),
            capacity_known: meta.capacity_known,
            agent_id: agent.map(|value| value.id.clone()),
            agent_client: agent.and_then(|value| value.client.clone()),
            agent_session_id: agent.and_then(|value| value.session_id.clone()),
            created_at: now,
        };
        upsert_usage_minute(
            &conn,
            now,
            model_id,
            &event.provider,
            0,
            0,
            0,
            1,
            &UsageTotals::default(),
            None,
        )?;
        let id = insert_metric_event(&conn, &event)?;
        prune_metric_events(&conn, self.event_retention_rows)?;
        Ok(MetricEvent { id, ..event })
    }

    pub fn metric_snapshot(&self) -> Result<Vec<ModelMetric>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT model_id, provider, call_count, success_count, failure_count, win_count,
             prompt_tokens, completion_tokens, total_tokens,
             latency_count, latency_total_ms, latency_min_ms, latency_max_ms, last_latency_ms,
             last_error_kind, last_error_message, updated_at
      FROM model_metrics
      ORDER BY model_id
      "#,
        )?;
        let rows = stmt.query_map([], model_metric_from_row)?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(Into::into)
    }

    pub fn metric_for(&self, model_id: &str) -> Result<Option<ModelMetric>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT model_id, provider, call_count, success_count, failure_count, win_count,
             prompt_tokens, completion_tokens, total_tokens,
             latency_count, latency_total_ms, latency_min_ms, latency_max_ms, last_latency_ms,
             last_error_kind, last_error_message, updated_at
      FROM model_metrics
      WHERE model_id = ?1
      "#,
        )?;
        stmt.query_row([model_id], model_metric_from_row)
            .optional()
            .map_err(Into::into)
    }

    pub fn recent_metric_events(&self, limit: usize) -> Result<Vec<MetricEvent>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT id, request_id, phase, model_id, provider, status, error_kind, latency_ms,
             prompt_tokens, completion_tokens, total_tokens,
             route_mode, backup_rank, complexity_tier, sampled, winner_model_id,
             capacity_known, agent_id, agent_client, agent_session_id, created_at
      FROM model_metric_event
      ORDER BY created_at DESC, id DESC
      LIMIT ?1
      "#,
        )?;
        let rows = stmt.query_map([limit as i64], metric_event_from_row)?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(Into::into)
    }

    pub fn recent_metric_events_after(&self, after_id: i64, limit: usize) -> Result<Vec<MetricEvent>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT id, request_id, phase, model_id, provider, status, error_kind, latency_ms,
             prompt_tokens, completion_tokens, total_tokens,
             route_mode, backup_rank, complexity_tier, sampled, winner_model_id,
             capacity_known, agent_id, agent_client, agent_session_id, created_at
      FROM model_metric_event
      WHERE id > ?1
      ORDER BY id ASC
      LIMIT ?2
      "#,
        )?;
        let rows = stmt.query_map([after_id, limit as i64], metric_event_from_row)?;
        rows.collect::<rusqlite::Result<Vec<_>>>().map_err(Into::into)
    }

    pub fn limit_estimates(&self) -> Result<Vec<ModelLimitEstimate>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT model_id, provider, configured_context_window, learned_context_window,
             learned_request_token_limit, learned_tpm_limit, safe_context_window,
             largest_success_prompt_tokens, largest_success_total_tokens,
             smallest_overrun_requested_tokens, context_overrun_count, rate_limit_count,
             last_limit_error_kind, last_limit_error_message, last_limit_error_at, updated_at
      FROM model_limit_estimate
      ORDER BY model_id
      "#,
        )?;
        let rows = stmt.query_map([], model_limit_estimate_from_row)?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(Into::into)
    }

    pub fn context_events(&self, limit: usize) -> Result<Vec<ModelContextEvent>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT request_id, phase, model_id, provider, status, approx_prompt_tokens,
             requested_output_tokens, estimated_total_tokens, observed_prompt_tokens,
             observed_total_tokens, learned_limit, overrun_requested_tokens,
             error_kind, created_at
      FROM model_context_event
      ORDER BY created_at DESC, id DESC
      LIMIT ?1
      "#,
        )?;
        let rows = stmt.query_map([limit as i64], model_context_event_from_row)?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(Into::into)
    }

    pub fn context_histogram(
        &self,
        model_id: Option<&str>,
        bucket_size: u64,
        since_ts: i64,
    ) -> Result<Vec<ContextHistogramBucket>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let bucket_size = bucket_size.max(1) as i64;
        let sql = format!(
            r#"
      SELECT (estimated_total_tokens / ?1) * ?2 AS bucket_start,
             SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END),
             SUM(CASE WHEN status = 'failure' THEN 1 ELSE 0 END),
             SUM(CASE WHEN error_kind = 'ContextOverflow' THEN 1 ELSE 0 END)
      FROM model_context_event
      WHERE created_at >= ?3 {}
      GROUP BY bucket_start
      ORDER BY bucket_start
      "#,
            if model_id.is_some() {
                "AND model_id = ?4"
            } else {
                ""
            }
        );
        let mut stmt = conn.prepare(&sql)?;
        let map_row = |row: &rusqlite::Row<'_>| {
            let bucket_start = row.get::<_, i64>(0)?.max(0) as u64;
            Ok(ContextHistogramBucket {
                bucket_start,
                bucket_end: bucket_start.saturating_add(bucket_size as u64),
                success_count: row.get::<_, Option<i64>>(1)?.unwrap_or(0) as u64,
                failure_count: row.get::<_, Option<i64>>(2)?.unwrap_or(0) as u64,
                overrun_count: row.get::<_, Option<i64>>(3)?.unwrap_or(0) as u64,
            })
        };
        let rows = if let Some(model_id) = model_id {
            stmt.query_map(
                params![bucket_size, bucket_size, since_ts, model_id],
                map_row,
            )?
        } else {
            stmt.query_map(params![bucket_size, bucket_size, since_ts], map_row)?
        };
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(Into::into)
    }

    pub fn record_route(&self, route: &RequestRoute) -> Result<()> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
            r#"
      INSERT INTO request_route (
        request_id, route_mode, sampled, complexity_tier, complexity_score,
        primary_model_id, backup_model_ids, fusion_model_id, created_at
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
      ON CONFLICT(request_id) DO UPDATE SET
        route_mode = excluded.route_mode,
        sampled = excluded.sampled,
        complexity_tier = excluded.complexity_tier,
        complexity_score = excluded.complexity_score,
        primary_model_id = excluded.primary_model_id,
        backup_model_ids = excluded.backup_model_ids,
        fusion_model_id = excluded.fusion_model_id
      "#,
            params![
                &route.request_id,
                &route.route_mode,
                bool_to_i64(route.sampled),
                &route.complexity_tier,
                route.complexity_score as i64,
                &route.primary_model_id,
                serde_json::to_string(&route.backup_model_ids)?,
                &route.fusion_model_id,
                route.created_at
            ],
        )?;
        Ok(())
    }

    pub fn usage_since(&self, since_ts: i64) -> Result<Vec<ModelUsageWindow>> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT model_id, provider,
             SUM(attempts), SUM(successes), SUM(failures), SUM(wins),
             SUM(prompt_tokens), SUM(completion_tokens), SUM(total_tokens),
             SUM(latency_count), SUM(latency_total_ms)
      FROM model_usage_minute
      WHERE minute_ts >= ?1
      GROUP BY model_id, provider
      ORDER BY model_id
      "#,
        )?;
        let rows = stmt.query_map([minute_floor(since_ts)], |row| {
            Ok(ModelUsageWindow {
                model_id: row.get(0)?,
                provider: row.get(1)?,
                attempts: row.get::<_, Option<i64>>(2)?.unwrap_or(0) as u64,
                successes: row.get::<_, Option<i64>>(3)?.unwrap_or(0) as u64,
                failures: row.get::<_, Option<i64>>(4)?.unwrap_or(0) as u64,
                wins: row.get::<_, Option<i64>>(5)?.unwrap_or(0) as u64,
                prompt_tokens: row.get::<_, Option<i64>>(6)?.unwrap_or(0) as u64,
                completion_tokens: row.get::<_, Option<i64>>(7)?.unwrap_or(0) as u64,
                total_tokens: row.get::<_, Option<i64>>(8)?.unwrap_or(0) as u64,
                latency_count: row.get::<_, Option<i64>>(9)?.unwrap_or(0) as u64,
                latency_total_ms: row.get::<_, Option<i64>>(10)?.unwrap_or(0) as u64,
            })
        })?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(Into::into)
    }

    pub fn token_rate_estimate(
        &self,
        now_ts: i64,
        window_minutes: u64,
        smoothing_minutes: u64,
    ) -> Result<TokenRateEstimate> {
        let window_minutes = window_minutes.clamp(1, 10_080);
        let smoothing_minutes = smoothing_minutes.clamp(1, window_minutes);
        let current_minute = minute_floor(now_ts);
        let since_minute = current_minute - ((window_minutes as i64 - 1) * 60);
        let mut minute_tokens = vec![0u64; window_minutes as usize];

        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let mut stmt = conn.prepare(
            r#"
      SELECT minute_ts, SUM(total_tokens)
      FROM model_usage_minute
      WHERE minute_ts >= ?1 AND minute_ts <= ?2
      GROUP BY minute_ts
      ORDER BY minute_ts
      "#,
        )?;
        let rows = stmt.query_map(params![since_minute, current_minute], |row| {
            Ok((
                row.get::<_, i64>(0)?,
                row.get::<_, Option<i64>>(1)?.unwrap_or(0).max(0) as u64,
            ))
        })?;
        for row in rows {
            let (minute_ts, tokens) = row?;
            let offset = (minute_ts - since_minute) / 60;
            if offset >= 0 {
                if let Some(slot) = minute_tokens.get_mut(offset as usize) {
                    *slot = tokens;
                }
            }
        }

        let smoothing = smoothing_minutes as usize;
        let mut rolling_tokens = 0u64;
        let mut smoothed_rates = Vec::new();
        for (index, tokens) in minute_tokens.iter().enumerate() {
            rolling_tokens = rolling_tokens.saturating_add(*tokens);
            if index >= smoothing {
                rolling_tokens = rolling_tokens.saturating_sub(minute_tokens[index - smoothing]);
            }
            if rolling_tokens > 0 {
                smoothed_rates.push(rolling_tokens as f64 / smoothing_minutes as f64);
            }
        }

        let sample_minutes = smoothed_rates.len() as u64;
        let max_tokens_per_minute = smoothed_rates.iter().copied().fold(0.0, f64::max);
        let median_tokens_per_minute = median_f64(&mut smoothed_rates);
        Ok(TokenRateEstimate {
            median_m_tokens_per_24h: project_tokens_per_minute_to_day_millions(
                median_tokens_per_minute,
            ),
            max_m_tokens_per_24h: project_tokens_per_minute_to_day_millions(max_tokens_per_minute),
            sample_minutes,
            window_minutes,
            smoothing_minutes,
        })
    }

    pub fn prune_minute_buckets(&self, retention_days: u64) -> Result<()> {
        let cutoff = now_unix() - i64::try_from(retention_days.saturating_mul(86_400)).unwrap_or(0);
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
            "DELETE FROM model_usage_minute WHERE minute_ts < ?1",
            [minute_floor(cutoff)],
        )?;
        Ok(())
    }

    pub fn learned_boost(&self, model_id: &str) -> Result<f64> {
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let boost = conn
            .query_row(
                "SELECT attempts, wins FROM fusion_score WHERE model_id = ?1",
                [model_id],
                |row| Ok((row.get::<_, i64>(0)?, row.get::<_, i64>(1)?)),
            )
            .optional()?
            .map(|(attempts, wins)| 1.0 + (wins as f64 / (attempts.max(1) as f64)) * 0.5)
            .unwrap_or(1.0);
        Ok(boost)
    }

    pub fn provider_quota(
        &self,
        model_id: &str,
        window_seconds: i64,
    ) -> Result<(i64, i64, Option<i64>)> {
        let now = now_unix();
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        let row = conn
      .query_row(
        "SELECT requests_today, window_started_at, disabled_until FROM provider_quota WHERE model_id = ?1",
        [model_id],
        |row| Ok((row.get::<_, i64>(0)?, row.get::<_, i64>(1)?, row.get::<_, Option<i64>>(2)?)),
      )
      .optional()?;
        if let Some((requests, started, disabled_until)) = row {
            if now - started >= window_seconds {
                conn.execute(
                    r#"
          INSERT INTO provider_quota (model_id, requests_today, window_started_at, disabled_until)
          VALUES (?1, 0, ?2, NULL)
          ON CONFLICT(model_id) DO UPDATE SET
            requests_today = 0,
            window_started_at = excluded.window_started_at,
            disabled_until = NULL
          "#,
                    params![model_id, now],
                )?;
                return Ok((0, now, None));
            }
            return Ok((requests, started, disabled_until));
        }
        conn.execute(
            r#"
      INSERT INTO provider_quota (model_id, requests_today, window_started_at, disabled_until)
      VALUES (?1, 0, ?2, NULL)
      "#,
            params![model_id, now],
        )?;
        Ok((0, now, None))
    }

    pub fn increment_quota(&self, model_id: &str) -> Result<()> {
        let now = now_unix();
        let conn = self.conn.lock().expect("sqlite mutex poisoned");
        conn.execute(
      r#"
      INSERT INTO provider_quota (model_id, requests_today, window_started_at, disabled_until)
      VALUES (?1, 1, ?2, NULL)
      ON CONFLICT(model_id) DO UPDATE SET
        requests_today = requests_today + 1,
        window_started_at = CASE WHEN window_started_at = 0 THEN excluded.window_started_at ELSE window_started_at END
      "#,
      params![model_id, now],
    )?;
        Ok(())
    }
}

fn kind_to_status(kind: &ErrorKind) -> &'static str {
    match kind {
        ErrorKind::AuthFailed => "auth_failed",
        ErrorKind::RateLimited => "rate_limited",
        ErrorKind::Timeout => "timeout",
        ErrorKind::ServerError => "server_error",
        ErrorKind::InvalidResponse => "invalid_response",
        ErrorKind::ContextOverflow => "context_overflow",
        ErrorKind::CustomerVerificationRequired => "customer_verification_required",
        ErrorKind::NoAccess => "no_access",
        ErrorKind::UnsupportedApi => "unsupported_api",
        ErrorKind::ModelUnavailable => "model_unavailable",
        ErrorKind::QuotaExhausted => "quota_exhausted",
        ErrorKind::Unknown => "unhealthy",
    }
}

fn ensure_column(conn: &Connection, table: &str, column: &str, definition: &str) -> Result<()> {
    let mut stmt = conn.prepare(&format!("PRAGMA table_info({table})"))?;
    let rows = stmt.query_map([], |row| row.get::<_, String>(1))?;
    let exists = rows
        .collect::<rusqlite::Result<Vec<_>>>()?
        .iter()
        .any(|name| name == column);
    if exists {
        return Ok(());
    }
    conn.execute(
        &format!("ALTER TABLE {table} ADD COLUMN {column} {definition}"),
        [],
    )?;
    Ok(())
}

#[allow(clippy::too_many_arguments)]
fn upsert_usage_minute(
    conn: &Connection,
    created_at: i64,
    model_id: &str,
    provider: &str,
    attempts: u64,
    successes: u64,
    failures: u64,
    wins: u64,
    usage: &UsageTotals,
    latency_ms: Option<u64>,
) -> Result<()> {
    conn.execute(
        r#"
      INSERT INTO model_usage_minute (
        model_id, provider, minute_ts, attempts, successes, failures, wins,
        prompt_tokens, completion_tokens, total_tokens, latency_count, latency_total_ms
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
      ON CONFLICT(model_id, minute_ts) DO UPDATE SET
        provider = excluded.provider,
        attempts = attempts + excluded.attempts,
        successes = successes + excluded.successes,
        failures = failures + excluded.failures,
        wins = wins + excluded.wins,
        prompt_tokens = prompt_tokens + excluded.prompt_tokens,
        completion_tokens = completion_tokens + excluded.completion_tokens,
        total_tokens = total_tokens + excluded.total_tokens,
        latency_count = latency_count + excluded.latency_count,
        latency_total_ms = latency_total_ms + excluded.latency_total_ms
      "#,
        params![
            model_id,
            provider,
            minute_floor(created_at),
            attempts as i64,
            successes as i64,
            failures as i64,
            wins as i64,
            usage.prompt_tokens as i64,
            usage.completion_tokens as i64,
            usage.total_tokens as i64,
            latency_ms.map(|_| 1).unwrap_or(0),
            latency_ms.unwrap_or(0) as i64
        ],
    )?;
    Ok(())
}

fn bool_to_i64(value: bool) -> i64 {
    if value { 1 } else { 0 }
}

fn option_bool_to_i64(value: Option<bool>) -> Option<i64> {
    value.map(bool_to_i64)
}

fn minute_floor(value: i64) -> i64 {
    value - value.rem_euclid(60)
}

fn median_f64(values: &mut [f64]) -> f64 {
    if values.is_empty() {
        return 0.0;
    }
    values.sort_by(|left, right| left.total_cmp(right));
    let mid = values.len() / 2;
    if values.len() % 2 == 0 {
        (values[mid - 1] + values[mid]) / 2.0
    } else {
        values[mid]
    }
}

fn project_tokens_per_minute_to_day_millions(tokens_per_minute: f64) -> f64 {
    tokens_per_minute * 1_440.0 / 1_000_000.0
}

fn insert_metric_event(conn: &Connection, event: &MetricEvent) -> Result<i64> {
    conn.execute(
        r#"
      INSERT INTO model_metric_event (
        request_id, phase, model_id, provider, status, error_kind, latency_ms,
        prompt_tokens, completion_tokens, total_tokens, route_mode, backup_rank,
        complexity_tier, sampled, winner_model_id, capacity_known, agent_id, agent_client, agent_session_id, created_at
      )
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20)
      "#,
        params![
            &event.request_id,
            &event.phase,
            &event.model_id,
            &event.provider,
            &event.status,
            &event.error_kind,
            event.latency_ms.map(|value| value as i64),
            event.prompt_tokens as i64,
            event.completion_tokens as i64,
            event.total_tokens as i64,
            &event.route_mode,
            event.backup_rank.map(|value| value as i64),
            &event.complexity_tier,
            option_bool_to_i64(event.sampled),
            &event.winner_model_id,
            option_bool_to_i64(event.capacity_known),
            &event.agent_id,
            &event.agent_client,
            &event.agent_session_id,
            event.created_at
        ],
    )?;
    Ok(conn.last_insert_rowid())
}

fn prune_metric_events(conn: &Connection, retention_rows: usize) -> Result<()> {
    conn.execute(
        r#"
      DELETE FROM model_metric_event
      WHERE id NOT IN (
        SELECT id
        FROM model_metric_event
        ORDER BY created_at DESC, id DESC
        LIMIT ?1
      )
      "#,
        [retention_rows as i64],
    )?;
    Ok(())
}

fn model_metric_from_row(row: &rusqlite::Row<'_>) -> rusqlite::Result<ModelMetric> {
    Ok(ModelMetric {
        model_id: row.get(0)?,
        provider: row.get(1)?,
        call_count: row.get::<_, i64>(2)? as u64,
        success_count: row.get::<_, i64>(3)? as u64,
        failure_count: row.get::<_, i64>(4)? as u64,
        win_count: row.get::<_, i64>(5)? as u64,
        prompt_tokens: row.get::<_, i64>(6)? as u64,
        completion_tokens: row.get::<_, i64>(7)? as u64,
        total_tokens: row.get::<_, i64>(8)? as u64,
        latency_count: row.get::<_, i64>(9)? as u64,
        latency_total_ms: row.get::<_, i64>(10)? as u64,
        latency_min_ms: row.get::<_, Option<i64>>(11)?.map(|value| value as u64),
        latency_max_ms: row.get::<_, Option<i64>>(12)?.map(|value| value as u64),
        last_latency_ms: row.get::<_, Option<i64>>(13)?.map(|value| value as u64),
        last_error_kind: row.get(14)?,
        last_error_message: row.get(15)?,
        updated_at: row.get(16)?,
    })
}

fn metric_event_from_row(row: &rusqlite::Row<'_>) -> rusqlite::Result<MetricEvent> {
    Ok(MetricEvent {
        id: row.get(0)?,
        request_id: row.get(1)?,
        phase: row.get(2)?,
        model_id: row.get(3)?,
        provider: row.get(4)?,
        status: row.get(5)?,
        error_kind: row.get(6)?,
        latency_ms: row.get::<_, Option<i64>>(7)?.map(|value| value as u64),
        prompt_tokens: row.get::<_, i64>(8)? as u64,
        completion_tokens: row.get::<_, i64>(9)? as u64,
        total_tokens: row.get::<_, i64>(10)? as u64,
        route_mode: row.get(11)?,
        backup_rank: row.get::<_, Option<i64>>(12)?.map(|value| value as u64),
        complexity_tier: row.get(13)?,
        sampled: row.get::<_, Option<i64>>(14)?.map(|value| value != 0),
        winner_model_id: row.get(15)?,
        capacity_known: row.get::<_, Option<i64>>(16)?.map(|value| value != 0),
        agent_id: row.get(17)?,
        agent_client: row.get(18)?,
        agent_session_id: row.get(19)?,
        created_at: row.get(20)?,
    })
}

fn model_limit_estimate_from_row(row: &rusqlite::Row<'_>) -> rusqlite::Result<ModelLimitEstimate> {
    Ok(ModelLimitEstimate {
        model_id: row.get(0)?,
        provider: row.get(1)?,
        configured_context_window: row.get::<_, i64>(2)? as u64,
        learned_context_window: row.get::<_, Option<i64>>(3)?.map(|value| value as u64),
        learned_request_token_limit: row.get::<_, Option<i64>>(4)?.map(|value| value as u64),
        learned_tpm_limit: row.get::<_, Option<i64>>(5)?.map(|value| value as u64),
        safe_context_window: row.get::<_, i64>(6)? as u64,
        largest_success_prompt_tokens: row.get::<_, i64>(7)? as u64,
        largest_success_total_tokens: row.get::<_, i64>(8)? as u64,
        smallest_overrun_requested_tokens: row.get::<_, Option<i64>>(9)?.map(|value| value as u64),
        context_overrun_count: row.get::<_, i64>(10)? as u64,
        rate_limit_count: row.get::<_, i64>(11)? as u64,
        last_limit_error_kind: row.get(12)?,
        last_limit_error_message: row.get(13)?,
        last_limit_error_at: row.get(14)?,
        updated_at: row.get(15)?,
    })
}

fn model_context_event_from_row(row: &rusqlite::Row<'_>) -> rusqlite::Result<ModelContextEvent> {
    Ok(ModelContextEvent {
        request_id: row.get(0)?,
        phase: row.get(1)?,
        model_id: row.get(2)?,
        provider: row.get(3)?,
        status: row.get(4)?,
        approx_prompt_tokens: row.get::<_, i64>(5)? as u64,
        requested_output_tokens: row.get::<_, i64>(6)? as u64,
        estimated_total_tokens: row.get::<_, i64>(7)? as u64,
        observed_prompt_tokens: row.get::<_, Option<i64>>(8)?.map(|value| value as u64),
        observed_total_tokens: row.get::<_, Option<i64>>(9)?.map(|value| value as u64),
        learned_limit: row.get::<_, Option<i64>>(10)?.map(|value| value as u64),
        overrun_requested_tokens: row.get::<_, Option<i64>>(11)?.map(|value| value as u64),
        error_kind: row.get(12)?,
        created_at: row.get(13)?,
    })
}

fn ensure_limit_row(conn: &Connection, model_id: &str, provider: &str, now: i64) -> Result<()> {
    conn.execute(
        r#"
      INSERT INTO model_limit_estimate (model_id, provider, safe_context_window, updated_at)
      VALUES (?1, ?2, 0, ?3)
      ON CONFLICT(model_id) DO NOTHING
      "#,
        params![model_id, provider, now],
    )?;
    Ok(())
}

fn recompute_limit_safe(conn: &Connection, model_id: &str) -> Result<()> {
    let estimate = conn
        .query_row(
            r#"
      SELECT model_id, provider, configured_context_window, learned_context_window,
             learned_request_token_limit, learned_tpm_limit, safe_context_window,
             largest_success_prompt_tokens, largest_success_total_tokens,
             smallest_overrun_requested_tokens, context_overrun_count, rate_limit_count,
             last_limit_error_kind, last_limit_error_message, last_limit_error_at, updated_at
      FROM model_limit_estimate
      WHERE model_id = ?1
      "#,
            [model_id],
            model_limit_estimate_from_row,
        )
        .optional()?;
    if let Some(estimate) = estimate {
        conn.execute(
            "UPDATE model_limit_estimate SET safe_context_window = ?1 WHERE model_id = ?2",
            params![compute_safe_context_window(&estimate) as i64, model_id],
        )?;
    }
    Ok(())
}

fn compute_safe_context_window(estimate: &ModelLimitEstimate) -> u64 {
    let learned_caps = [
        estimate
            .learned_context_window
            .map(|value| value.saturating_mul(95) / 100),
        estimate
            .learned_request_token_limit
            .map(|value| value.saturating_mul(90) / 100),
        estimate
            .learned_tpm_limit
            .map(|value| value.saturating_mul(90) / 100),
    ]
    .into_iter()
    .flatten()
    .collect::<Vec<_>>();
    if learned_caps.is_empty() {
        return estimate
            .configured_context_window
            .max(estimate.largest_success_total_tokens);
    }
    let cap = learned_caps.iter().min().copied().unwrap_or(0);
    if estimate.configured_context_window == 0 {
        return cap;
    }
    cap.min(estimate.configured_context_window)
}

fn preserves_startup_status(state: &ModelState) -> bool {
    if state.disabled_until.is_some() {
        return true;
    }
    !matches!(
        state.status.as_str(),
        "ready" | "healthy" | "missing_key" | "incomplete_env"
    )
}

fn now_unix() -> i64 {
    chrono::Utc::now().timestamp()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn startup_seed_preserves_hard_failure_state() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open(interim.path().join("state.sqlite")).unwrap();
        db.upsert_model("github/llama", "github", "ready").unwrap();
        db.record_failure(
            "request-1",
            "draft",
            "github/llama",
            "github",
            &ErrorKind::ModelUnavailable,
            12,
            Some(now_unix() + 86_400),
            Some("unknown_model"),
            &RouteEventMeta::default(),
            None,
        )
        .unwrap();

        db.upsert_model("github/llama", "github", "ready").unwrap();

        let state = db.state_for("github/llama").unwrap().unwrap();
        assert_eq!(state.status, "model_unavailable");
        assert_eq!(state.last_error_kind.as_deref(), Some("ModelUnavailable"));
        assert_eq!(state.last_error_message.as_deref(), Some("unknown_model"));
        assert!(state.disabled_until.is_some());
    }

    #[test]
    fn startup_seed_allows_missing_key_to_replace_failure_state() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open(interim.path().join("state.sqlite")).unwrap();
        db.upsert_model("github/llama", "github", "ready").unwrap();
        db.record_failure(
            "request-1",
            "draft",
            "github/llama",
            "github",
            &ErrorKind::ModelUnavailable,
            12,
            Some(now_unix() + 86_400),
            Some("unknown_model"),
            &RouteEventMeta::default(),
            None,
        )
        .unwrap();

        db.upsert_model("github/llama", "github", "missing_key")
            .unwrap();

        let state = db.state_for("github/llama").unwrap().unwrap();
        assert_eq!(state.status, "missing_key");
        assert!(state.last_error_kind.is_none());
        assert!(state.last_error_message.is_none());
        assert!(state.disabled_until.is_none());
    }

    #[test]
    fn idempotent_migration_preserves_rows() {
        let interim = tempfile::tempdir().unwrap();
        let path = interim.path().join("state.sqlite");
        StateDb::open(&path)
            .unwrap()
            .upsert_model("provider/model", "provider", "ready")
            .unwrap();
        let reopened = StateDb::open(&path).unwrap();
        let state = reopened.state_for("provider/model").unwrap().unwrap();
        assert_eq!(state.status, "ready");
    }

    #[test]
    fn two_handles_pool_minute_usage_under_wal() {
        let interim = tempfile::tempdir().unwrap();
        let path = interim.path().join("state.sqlite");
        let first = StateDb::open(&path).unwrap();
        let second = StateDb::open(&path).unwrap();
        first
            .record_attempt(
                "request-1",
                "fast",
                "provider/model",
                "provider",
                &RouteEventMeta::default(),
                None,
            )
            .unwrap();
        second
            .record_attempt(
                "request-2",
                "fast",
                "provider/model",
                "provider",
                &RouteEventMeta::default(),
                None,
            )
            .unwrap();
        let usage = first.usage_since(now_unix() - 3600).unwrap();
        assert_eq!(usage[0].attempts, 2);
    }

    #[test]
    fn token_rate_estimate_projects_median_and_ten_minute_max() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open(interim.path().join("state.sqlite")).unwrap();
        let now = minute_floor(1_800_000);
        {
            let conn = db.conn.lock().expect("sqlite mutex poisoned");
            for minutes_ago in 0..60 {
                let tokens = if minutes_ago < 10 { 5_000 } else { 1_000 };
                conn.execute(
                    r#"
          INSERT INTO model_usage_minute (
            model_id, provider, minute_ts, attempts, successes, failures, wins,
            prompt_tokens, completion_tokens, total_tokens, latency_count, latency_total_ms
          )
          VALUES (?1, ?2, ?3, 0, 1, 0, 0, 0, ?4, ?4, 0, 0)
          "#,
                    rusqlite::params![
                        "provider/model",
                        "provider",
                        now - (minutes_ago * 60),
                        tokens
                    ],
                )
                .unwrap();
            }
        }

        let estimate = db.token_rate_estimate(now, 60, 10).unwrap();

        assert_eq!(estimate.window_minutes, 60);
        assert_eq!(estimate.smoothing_minutes, 10);
        assert_eq!(estimate.sample_minutes, 60);
        assert!((estimate.median_m_tokens_per_24h - 1.44).abs() < 0.001);
        assert!((estimate.max_m_tokens_per_24h - 7.2).abs() < 0.001);
    }

    #[test]
    fn event_retention_keeps_configured_recent_rows() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open_with_retention(interim.path().join("state.sqlite"), 2).unwrap();
        for index in 0..4 {
            db.record_attempt(
                &format!("request-{index}"),
                "fast",
                "provider/model",
                "provider",
                &RouteEventMeta::default(),
                None,
            )
            .unwrap();
        }
        assert_eq!(db.recent_metric_events(10).unwrap().len(), 2);
    }

    #[test]
    fn active_agents_count_tracks_multiple_run_ids() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open(interim.path().join("state.sqlite")).unwrap();
        db.record_agent_activity(&AgentSource {
            id: "agent-1".to_string(),
            client: Some("opencode-cli".to_string()),
            session_id: Some("session-1".to_string()),
            process_role: Some("main".to_string()),
            pid: Some(111),
            user_agent: Some("opencode/1.0".to_string()),
            version: Some("v1".to_string()),
        })
        .unwrap();
        db.record_agent_activity(&AgentSource {
            id: "agent-2".to_string(),
            client: Some("opencode-cli".to_string()),
            session_id: Some("session-2".to_string()),
            process_role: Some("worker".to_string()),
            pid: Some(222),
            user_agent: Some("opencode/1.0".to_string()),
            version: Some("v1".to_string()),
        })
        .unwrap();

        assert_eq!(db.active_agents_live(now_unix()).unwrap().len(), 2);
    }

    #[test]
    fn expired_active_agents_are_pruned() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open(interim.path().join("state.sqlite")).unwrap();
        db.record_agent_activity(&AgentSource {
            id: "agent-expired".to_string(),
            client: None,
            session_id: None,
            process_role: Some("main".to_string()),
            pid: Some(111),
            user_agent: None,
            version: None,
        })
        .unwrap();

        assert_eq!(db.active_agents_live(now_unix()).unwrap().len(), 1);
        let rows = db.prune_expired_agent_activity(1, now_unix() + 120).unwrap();
        assert_eq!(rows, 1);
        assert_eq!(db.active_agents_live(now_unix() + 120).unwrap().len(), 0);
    }

    #[test]
    fn metric_events_store_agent_fields() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open(interim.path().join("state.sqlite")).unwrap();
        let agent = AgentSource {
            id: "agent-with-fields".to_string(),
            client: Some("agent-client".to_string()),
            session_id: Some("agent-session".to_string()),
            process_role: Some("main".to_string()),
            pid: Some(100),
            user_agent: Some("opencode/agent".to_string()),
            version: Some("v1".to_string()),
        };
        db.record_attempt(
            "request-1",
            "fast",
            "provider/model",
            "provider",
            &RouteEventMeta::default(),
            Some(&agent),
        )
        .unwrap();
        db.record_success(
            "request-1",
            "fast",
            "provider/model",
            "provider",
            42,
            Some("provider/model"),
            None,
            &RouteEventMeta::default(),
            Some(&agent),
        )
        .unwrap();
        db.record_failure(
            "request-1",
            "fusion",
            "provider/model",
            "provider",
            &ErrorKind::Unknown,
            99,
            None,
            Some("failed"),
            &RouteEventMeta::default(),
            Some(&agent),
        )
        .unwrap();

        let events = db.recent_metric_events(3).unwrap();
        assert_eq!(events.len(), 3);
        assert!(events.iter().all(|event| event.agent_id.as_deref() == Some("agent-with-fields")));
        assert!(events.iter().all(|event| event.agent_client.as_deref() == Some("agent-client")));
        assert!(events.iter().all(|event| event.agent_session_id.as_deref() == Some("agent-session")));
    }

    #[test]
    fn recent_metric_events_after_returns_new_rows() {
        let interim = tempfile::tempdir().unwrap();
        let db = StateDb::open(interim.path().join("state.sqlite")).unwrap();
        let first = db
            .record_attempt(
                "request-1",
                "fast",
                "provider/model",
                "provider",
                &RouteEventMeta::default(),
                None,
            )
            .unwrap();
        let second = db
            .record_attempt(
                "request-2",
                "fast",
                "provider/model",
                "provider",
                &RouteEventMeta::default(),
                None,
            )
            .unwrap();
        let tail = db.recent_metric_events_after(first.id, 10).unwrap();
        assert_eq!(tail.len(), 1);
        assert_eq!(tail[0].id, second.id);
    }
}
