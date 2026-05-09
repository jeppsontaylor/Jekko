import { createSignal } from "solid-js"

/**
 * ZYAL Flash — gold theme overlay + live fleet metrics for ZYAL runs.
 *
 * Multiple sources can signal activation independently (prompt input,
 * assistant message stream, daemon dialog). Each source owns a string key;
 * the overlay is active when any source is set.
 *
 * Fleet metrics are aggregated across all in-process workers in the same
 * Jekko session — total token usage, active worker count, completed loops,
 * elapsed wall-clock time. Updated by the session route polling the daemon
 * runtime, optionally augmented by a jnoccio-fusion WebSocket subscription.
 */

const ZYAL_OVERLAY_THEME = "jekko-gold"
const ZYAL_FLEET_HARD_CAP = 20

const [active, setActive] = createSignal<ReadonlySet<string>>(new Set())

export function useZyalFlash() {
  return active
}

export function isZyalFlashActive() {
  return active().size > 0
}

export function isZyalFlashSourceActive(sourceId: string) {
  return active().has(sourceId)
}

export function zyalFlashOverlayTheme() {
  return ZYAL_OVERLAY_THEME
}

export function zyalFleetHardCap() {
  return ZYAL_FLEET_HARD_CAP
}

/**
 * Mark a source as actively viewing/editing an ZYAL block.
 * Pass true to add, false to clear. Idempotent — safe in effects.
 */
export function setZyalFlashSource(sourceId: string, isActive: boolean) {
  const current = active()
  const has = current.has(sourceId)
  if (isActive === has) return
  const next = new Set(current)
  if (isActive) next.add(sourceId)
  else next.delete(sourceId)
  setActive(next)
  if (!isActive && next.size === 0) {
    // Reset metrics when no ZYAL source is active.
    resetZyalMetrics()
  }
}

const ZYAL_SENTINEL_RE = /<<<ZYAL v\d+:daemon id=[A-Za-z0-9._-]+>>>/

export function textHasZyalSentinel(text: string | undefined | null): boolean {
  if (!text) return false
  return ZYAL_SENTINEL_RE.test(text)
}

// ─── Exit reason ──────────────────────────────────────────────────────────
//
// When a daemon run reaches a terminal status the gold flash deactivates and
// the live-metrics panel disappears. The user is left with no signal as to
// WHY the run ended. This signal carries the most recent exit so the sidebar
// can render a brightly-coloured banner and the prompt route can fire a
// one-shot toast.
//
// The record self-clears after ZYAL_EXIT_TTL_MS so a long-idle session
// doesn't keep showing an outdated banner forever.

export type ZyalExitTone = "success" | "warning" | "error"

export type ZyalExitRecord = {
  readonly runId: string | null
  readonly status: string
  readonly tone: ZyalExitTone
  readonly reason: string
  readonly at: number
}

const ZYAL_EXIT_TTL_MS = 30_000

const [exitRecord, setExitRecord] = createSignal<ZyalExitRecord | null>(null)
let exitClearTimer: ReturnType<typeof setTimeout> | null = null

const TERMINAL_TONE: Record<string, ZyalExitTone> = {
  satisfied: "success",
  paused: "warning",
  aborted: "error",
  failed: "error",
}

export function isZyalTerminalStatus(status: string | undefined | null): boolean {
  return !!status && status in TERMINAL_TONE
}

export function useZyalExit() {
  return exitRecord
}

export function recordZyalExit(input: {
  runId: string | null
  status: string
  reason: string
}) {
  const tone = TERMINAL_TONE[input.status] ?? "warning"
  const record: ZyalExitRecord = {
    runId: input.runId,
    status: input.status,
    tone,
    reason: input.reason,
    at: Date.now(),
  }
  setExitRecord(record)
  if (exitClearTimer) clearTimeout(exitClearTimer)
  exitClearTimer = setTimeout(() => {
    setExitRecord((prev) => (prev?.at === record.at ? null : prev))
    exitClearTimer = null
  }, ZYAL_EXIT_TTL_MS)
}

export function clearZyalExit() {
  if (exitClearTimer) {
    clearTimeout(exitClearTimer)
    exitClearTimer = null
  }
  setExitRecord(null)
}

// ─── Fleet metrics ────────────────────────────────────────────────────────

export type ZyalFleetMetrics = {
  readonly workersActive: number
  readonly workersMax: number
  readonly totalTokens: number
  readonly inputTokens: number
  readonly outputTokens: number
  readonly cacheTokens: number
  readonly loopsCompleted: number
  readonly tasksCompleted: number
  readonly tasksIncubated: number
  readonly costUsd: number
  readonly startedAt: number | null
  readonly runId: string | null
  readonly status: string | null
  readonly jankuraiFindings: number | null
  // Jnoccio direct-WS shadow — populated by jnoccio-ws.ts when connected.
  // `null` for "no data yet"; `0` is a real value.
  readonly jnoccioConnected: boolean
  readonly jnoccioInstances: number | null
  readonly jnoccioMaxInstances: number | null
  readonly jnoccioActiveAgents: number | null
  readonly jnoccioPromptTokens: number | null
  readonly jnoccioCompletionTokens: number | null
  readonly jnoccioTotalTokens: number | null
  readonly jnoccioCalls: number | null
  readonly jnoccioWins: number | null
  readonly jnoccioFailures: number | null
  readonly jnoccioAvgLatencyMs: number | null
  readonly jnoccioWorkerThreads: number | null
  readonly jnoccioInstanceRole: string | null
  readonly jnoccioLastHeartbeat: number | null
}

const DEFAULT_METRICS: ZyalFleetMetrics = {
  workersActive: 0,
  workersMax: ZYAL_FLEET_HARD_CAP,
  totalTokens: 0,
  inputTokens: 0,
  outputTokens: 0,
  cacheTokens: 0,
  loopsCompleted: 0,
  tasksCompleted: 0,
  tasksIncubated: 0,
  costUsd: 0,
  startedAt: null,
  runId: null,
  status: null,
  jankuraiFindings: null,
  jnoccioConnected: false,
  jnoccioInstances: null,
  jnoccioMaxInstances: null,
  jnoccioActiveAgents: null,
  jnoccioPromptTokens: null,
  jnoccioCompletionTokens: null,
  jnoccioTotalTokens: null,
  jnoccioCalls: null,
  jnoccioWins: null,
  jnoccioFailures: null,
  jnoccioAvgLatencyMs: null,
  jnoccioWorkerThreads: null,
  jnoccioInstanceRole: null,
  jnoccioLastHeartbeat: null,
}

const [metrics, setMetrics] = createSignal<ZyalFleetMetrics>(DEFAULT_METRICS)

export function useZyalMetrics() {
  return metrics
}

export function updateZyalMetrics(patch: Partial<ZyalFleetMetrics>) {
  const current = metrics()
  let changed = false
  const next: ZyalFleetMetrics = { ...current }
  for (const [key, value] of Object.entries(patch) as [keyof ZyalFleetMetrics, ZyalFleetMetrics[keyof ZyalFleetMetrics]][]) {
    if (value === undefined) continue
    if ((current as Record<string, unknown>)[key] !== value) {
      ;(next as Record<string, unknown>)[key] = value
      changed = true
    }
  }
  // Auto-stamp startedAt the first time we get a real run id.
  if (next.runId && next.startedAt === null) {
    ;(next as { startedAt: number | null }).startedAt = Date.now()
    changed = true
  }
  if (changed) setMetrics(next)
}

export function resetZyalMetrics() {
  setMetrics({ ...DEFAULT_METRICS })
}

/**
 * Atomic monotone-counter bump for jnoccio request_event traffic.
 *
 * Why this exists: the prior implementation read `useZyalMetrics()()` then
 * called `updateZyalMetrics({...})` non-atomically. If a `snapshot` message
 * (which authoritatively resets the jnoccio counters) landed between the
 * read and the write, the snapshot's reset was clobbered by previous-baseline-
 * plus-delta. Using Solid's functional setter keeps the read+merge+write
 * inside a single signal transaction, so a snapshot landing concurrently
 * either runs entirely before or entirely after this update — never
 * interleaved. `applyJnoccioSnapshot` continues to authoritatively reset
 * the jnoccio totals; this helper only adds to them.
 */
export type JnoccioCounterDelta = {
  promptTokens?: number
  completionTokens?: number
  totalTokens?: number
  calls?: number
  wins?: number
  failures?: number
  /** Replaced (not summed) — represents the most-recent observation. */
  avgLatencyMs?: number | null
}

export function incrementJnoccioCounters(delta: JnoccioCounterDelta) {
  setMetrics((prev) => {
    const next: ZyalFleetMetrics = { ...prev, jnoccioConnected: true }
    if (delta.promptTokens) {
      ;(next as { jnoccioPromptTokens: number | null }).jnoccioPromptTokens =
        (prev.jnoccioPromptTokens ?? 0) + delta.promptTokens
    }
    if (delta.completionTokens) {
      ;(next as { jnoccioCompletionTokens: number | null }).jnoccioCompletionTokens =
        (prev.jnoccioCompletionTokens ?? 0) + delta.completionTokens
    }
    if (delta.totalTokens) {
      ;(next as { jnoccioTotalTokens: number | null }).jnoccioTotalTokens =
        (prev.jnoccioTotalTokens ?? 0) + delta.totalTokens
    }
    if (delta.calls) {
      ;(next as { jnoccioCalls: number | null }).jnoccioCalls = (prev.jnoccioCalls ?? 0) + delta.calls
    }
    if (delta.wins) {
      ;(next as { jnoccioWins: number | null }).jnoccioWins = (prev.jnoccioWins ?? 0) + delta.wins
    }
    if (delta.failures) {
      ;(next as { jnoccioFailures: number | null }).jnoccioFailures =
        (prev.jnoccioFailures ?? 0) + delta.failures
    }
    if (delta.avgLatencyMs !== undefined) {
      ;(next as { jnoccioAvgLatencyMs: number | null }).jnoccioAvgLatencyMs = delta.avgLatencyMs
    }
    return next
  })
}

function numberFrom(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (value === undefined || value === null || value === "") continue
    const next = Number(value)
    if (Number.isFinite(next)) return next
  }
  return undefined
}

function daemonTokens(run: Record<string, any>) {
  const stats = (run._stats ?? {}) as Record<string, any>
  const tokens = (run.token_usage ?? run.tokens ?? {}) as Record<string, any>
  const cache = tokens.cache ?? {}
  const input = numberFrom(stats.input_tokens, stats.inputTokens, tokens.input, tokens.inputTokens) ?? 0
  const output = numberFrom(stats.output_tokens, stats.outputTokens, tokens.output, tokens.outputTokens) ?? 0
  const cacheTokens =
    numberFrom(stats.cache_tokens, stats.cacheTokens) ??
    (numberFrom(cache.read) ?? 0) + (numberFrom(cache.write) ?? 0) + (numberFrom(tokens.reasoning) ?? 0)
  const total = numberFrom(stats.total_tokens, stats.totalTokens, tokens.total, tokens.totalTokens) ?? input + output + cacheTokens
  return { input, output, cache: cacheTokens, total }
}

export function zyalDaemonFleet(run: Record<string, any> | undefined | null): Record<string, any> | undefined {
  if (!run) return undefined
  return run.spec_json?.fleet ?? run.spec?.fleet ?? run.fleet
}

export function daemonRunToZyalMetrics(
  run: Record<string, any>,
  sessionIdIfMissing?: string,
): Partial<ZyalFleetMetrics> {
  const stats = (run._stats ?? {}) as Record<string, any>
  const fleet = zyalDaemonFleet(run) ?? {}
  const fleetMaxRaw = numberFrom(fleet.max_workers)
  const tokens = daemonTokens(run)
  return {
    runId: String(run.id ?? run.run_id ?? sessionIdIfMissing ?? ""),
    status: String(run.status ?? "active"),
    workersActive: numberFrom(stats.active_workers, stats.workers_active, run.workers_active, run.active_workers) ?? 0,
    workersMax: fleetMaxRaw && fleetMaxRaw > 0 ? Math.min(ZYAL_FLEET_HARD_CAP, fleetMaxRaw) : undefined,
    inputTokens: tokens.input,
    outputTokens: tokens.output,
    cacheTokens: tokens.cache,
    totalTokens: tokens.total,
    costUsd: numberFrom(stats.cost_usd, stats.total_cost, run.cost_usd, run.cost) ?? 0,
    loopsCompleted: numberFrom(stats.iteration_count, run.iteration_count, run.iterations, run.iteration) ?? 0,
    tasksCompleted: numberFrom(stats.completed_tasks, stats.tasks_completed, run.tasks_completed) ?? 0,
    tasksIncubated: numberFrom(stats.incubated_tasks, stats.tasks_incubated, run.tasks_incubated) ?? 0,
    jankuraiFindings: numberFrom(stats.jankurai_findings, run.jankurai_findings) ?? undefined,
  }
}

export function daemonRunJnoccioConfig(run: Record<string, any> | undefined | null):
  | { baseUrl: string; metricsWsPath?: string; runId?: string }
  | undefined {
  const fleet = zyalDaemonFleet(run)
  const jnoccio = fleet?.jnoccio
  const baseUrl = typeof jnoccio?.base_url === "string" ? jnoccio.base_url.trim() : ""
  if (!run || !baseUrl || jnoccio?.enabled === false) return undefined
  return {
    baseUrl,
    metricsWsPath: typeof jnoccio?.metrics_ws === "string" ? jnoccio.metrics_ws : undefined,
    runId: String(run.id ?? run.run_id ?? ""),
  }
}

/**
 * Compute the elapsed wall-clock running time as a "Hh Mm Ss" string.
 * Returns null when no run is active.
 */
export function formatZyalRuntime(now: number = Date.now()): string | null {
  const m = metrics()
  if (!m.startedAt) return null
  const elapsedMs = Math.max(0, now - m.startedAt)
  const totalSec = Math.floor(elapsedMs / 1000)
  const h = Math.floor(totalSec / 3600)
  const min = Math.floor((totalSec % 3600) / 60)
  const sec = totalSec % 60
  if (h > 0) return `${h}h ${min}m ${sec}s`
  if (min > 0) return `${min}m ${sec}s`
  return `${sec}s`
}
