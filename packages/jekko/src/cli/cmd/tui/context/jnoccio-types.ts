/**
 * Jnoccio Fusion dashboard data types.
 *
 * These mirror the gateway metrics payloads emitted by jnoccio-fusion.
 * Every field uses serde-default semantics: absent keys resolve to
 * zero/empty/null so the TUI never crashes on partial payloads.
 */

export type DashboardSnapshot = {
  totals: DashboardTotals
  token_rate: TokenRateEstimate
  capacity: CapacitySummary
  context: ContextDashboard
  models: DashboardModel[]
  recent_events: MetricEvent[]
  agent_count: number
  max_agents: number
  active_agents: AgentActivity[]
  instance_count: number
  max_instances: number
  available_instance_slots: number
  instance_role: string
  worker_threads: number
}

export type DashboardTotals = {
  total_models: number
  enabled_models: number
  calls: number
  successes: number
  failures: number
  wins: number
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
  average_latency_ms: number | null
}

export type TokenRateEstimate = {
  median_m_tokens_per_24h: number
  max_m_tokens_per_24h: number
  sample_minutes: number
  window_minutes: number
  smoothing_minutes: number
}

export type ContextDashboard = {
  estimates: ModelLimitEstimate[]
  histogram: ContextHistogramBucket[]
  recent_events: ModelContextEvent[]
}

export type ModelLimitEstimate = {
  model_id: string
  provider: string
  configured_context_window: number
  learned_context_window: number | null
  learned_request_token_limit: number | null
  learned_tpm_limit: number | null
  safe_context_window: number
  largest_success_prompt_tokens: number
  largest_success_total_tokens: number
  smallest_overrun_requested_tokens: number | null
  context_overrun_count: number
  rate_limit_count: number
  last_limit_error_kind: string | null
  last_limit_error_message: string | null
  last_limit_error_at: number | null
  updated_at: number
}

export type ContextHistogramBucket = {
  bucket_start: number
  bucket_end: number
  success_count: number
  failure_count: number
  overrun_count: number
}

export type ModelContextEvent = {
  request_id: string
  phase: string
  model_id: string
  provider: string
  status: string
  approx_prompt_tokens: number
  requested_output_tokens: number
  estimated_total_tokens: number
  observed_prompt_tokens: number | null
  observed_total_tokens: number | null
  learned_limit: number | null
  overrun_requested_tokens: number | null
  error_kind: string | null
  created_at: number
}

export type AgentActivity = {
  agent_id: string
  agent_client: string | null
  agent_session_id: string | null
  process_role: string | null
  pid: number | null
  version: string | null
  user_agent: string | null
  first_seen: number
  last_seen: number
  request_count: number
}

export type DashboardModel = {
  id: string
  provider: string
  display_name: string
  upstream_model: string
  roles: string[]
  enabled: boolean
  status: string
  cooldown_until: number | null
  capacity_known: boolean
  hourly_capacity: number | null
  hourly_used: number
  configured_context_window: number
  safe_context_window: number
  learned_context_window: number | null
  learned_request_token_limit: number | null
  context_overrun_count: number
  smallest_overrun_requested_tokens: number | null
  call_count: number
  success_count: number
  failure_count: number
  win_count: number
  win_rate: number
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
  avg_latency_ms: number | null
  last_latency_ms: number | null
  min_latency_ms: number | null
  max_latency_ms: number | null
  last_error_kind: string | null
  last_error_message: string | null
  updated_at: number
}

export type MetricEvent = {
  id: number
  request_id: string
  phase: string
  model_id: string
  provider: string
  status: string
  error_kind: string | null
  latency_ms: number | null
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
  route_mode: string | null
  backup_rank: number | null
  complexity_tier: string | null
  sampled: boolean | null
  winner_model_id: string | null
  capacity_known: boolean | null
  agent_id: string | null
  agent_client: string | null
  agent_session_id: string | null
  created_at: number
}

export type CapacitySummary = {
  known_limit_per_hour: number
  known_used: number
  known_remaining: number
  percent_used: number
  models: ModelCapacity[]
  unknown_models: UnknownCapacity[]
}

export type ModelCapacity = {
  model_id: string
  provider: string
  display_name: string
  status: string
  limit_per_hour: number
  used: number
  remaining: number
  percent_used: number
  limit_kind: string
  credit_tier: boolean
}

export type UnknownCapacity = {
  model_id: string
  provider: string
  display_name: string
  status: string
  used: number
  successes: number
  failures: number
  wins: number
  average_latency_ms: number | null
}

export type SocketMessage =
  | { type: "snapshot"; snapshot: DashboardSnapshot }
  | { type: "model_updated"; model: DashboardModel }
  | { type: "request_event"; event: MetricEvent }
  | { type: "heartbeat"; timestamp: number }

/** Default empty snapshot for initial state. */
export function emptySnapshot(): DashboardSnapshot {
  return {
    totals: {
      total_models: 0,
      enabled_models: 0,
      calls: 0,
      successes: 0,
      failures: 0,
      wins: 0,
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
      average_latency_ms: null,
    },
    token_rate: {
      median_m_tokens_per_24h: 0,
      max_m_tokens_per_24h: 0,
      sample_minutes: 0,
      window_minutes: 1440,
      smoothing_minutes: 10,
    },
    capacity: {
      known_limit_per_hour: 0,
      known_used: 0,
      known_remaining: 0,
      percent_used: 0,
      models: [],
      unknown_models: [],
    },
    context: {
      estimates: [],
      histogram: [],
      recent_events: [],
    },
    models: [],
    recent_events: [],
    agent_count: 0,
    max_agents: 20,
    active_agents: [],
    instance_count: 1,
    max_instances: 20,
    available_instance_slots: 19,
    instance_role: "main",
    worker_threads: 0,
  }
}

/** Normalize a snapshot with safe defaults for missing/zero fields. */
export function normalizeSnapshot(snapshot: DashboardSnapshot): DashboardSnapshot {
  if (!snapshot.max_agents) snapshot.max_agents = 20
  if (!snapshot.max_instances) snapshot.max_instances = 20
  if (!snapshot.instance_count) snapshot.instance_count = 1
  if (!snapshot.instance_role) snapshot.instance_role = "main"
  if (!snapshot.agent_count && snapshot.active_agents?.length) {
    snapshot.agent_count = snapshot.active_agents.length
  }
  if (!snapshot.available_instance_slots && snapshot.max_instances > snapshot.instance_count) {
    snapshot.available_instance_slots = snapshot.max_instances - snapshot.instance_count
  }

  // Deduplicate events by id
  const seen = new Set<number>()
  snapshot.recent_events = (snapshot.recent_events ?? []).filter((e) => {
    if (seen.has(e.id)) return false
    seen.add(e.id)
    return true
  })
  snapshot.recent_events.sort((a, b) => b.created_at - a.created_at || b.id - a.id)
  snapshot.recent_events = snapshot.recent_events.slice(0, 300)

  return snapshot
}

/** Recompute totals from models array. */
export function totalsFromModels(models: DashboardModel[]): DashboardTotals {
  let latencyTotal = 0
  let latencyCount = 0

  for (const m of models) {
    if (m.avg_latency_ms != null) {
      const weight = Math.max(m.call_count, 1)
      latencyTotal += m.avg_latency_ms * weight
      latencyCount += weight
    }
  }

  return {
    total_models: models.length,
    enabled_models: models.filter((m) => m.enabled).length,
    calls: models.reduce((s, m) => s + m.call_count, 0),
    successes: models.reduce((s, m) => s + m.success_count, 0),
    failures: models.reduce((s, m) => s + m.failure_count, 0),
    wins: models.reduce((s, m) => s + m.win_count, 0),
    prompt_tokens: models.reduce((s, m) => s + m.prompt_tokens, 0),
    completion_tokens: models.reduce((s, m) => s + m.completion_tokens, 0),
    total_tokens: models.reduce((s, m) => s + m.total_tokens, 0),
    average_latency_ms: latencyCount === 0 ? null : latencyTotal / latencyCount,
  }
}
