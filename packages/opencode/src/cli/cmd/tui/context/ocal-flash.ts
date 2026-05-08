import { createSignal } from "solid-js"

/**
 * OCAL Flash — gold theme overlay + live fleet metrics for OCAL runs.
 *
 * Multiple sources can signal activation independently (prompt input,
 * assistant message stream, daemon dialog). Each source owns a string key;
 * the overlay is active when any source is set.
 *
 * Fleet metrics are aggregated across all in-process workers in the same
 * OpenCode session — total token usage, active worker count, completed loops,
 * elapsed wall-clock time. Updated by the session route polling the daemon
 * runtime, optionally augmented by a jnoccio-fusion WebSocket subscription.
 */

const OCAL_OVERLAY_THEME = "opencode-gold"
const OCAL_FLEET_HARD_CAP = 20

const [active, setActive] = createSignal<ReadonlySet<string>>(new Set())

export function useOcalFlash() {
  return active
}

export function isOcalFlashActive() {
  return active().size > 0
}

export function ocalFlashOverlayTheme() {
  return OCAL_OVERLAY_THEME
}

export function ocalFleetHardCap() {
  return OCAL_FLEET_HARD_CAP
}

/**
 * Mark a source as actively viewing/editing an OCAL block.
 * Pass true to add, false to clear. Idempotent — safe in effects.
 */
export function setOcalFlashSource(sourceId: string, isActive: boolean) {
  const current = active()
  const has = current.has(sourceId)
  if (isActive === has) return
  const next = new Set(current)
  if (isActive) next.add(sourceId)
  else next.delete(sourceId)
  setActive(next)
  if (!isActive && next.size === 0) {
    // Reset metrics when no OCAL source is active.
    resetOcalMetrics()
  }
}

const OCAL_SENTINEL_RE = /<<<OCAL v\d+:daemon id=[A-Za-z0-9._-]+>>>/

export function textHasOcalSentinel(text: string | undefined | null): boolean {
  if (!text) return false
  return OCAL_SENTINEL_RE.test(text)
}

// ─── Fleet metrics ────────────────────────────────────────────────────────

export type OcalFleetMetrics = {
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
  readonly jnoccioInstances: number | null
}

const DEFAULT_METRICS: OcalFleetMetrics = {
  workersActive: 0,
  workersMax: OCAL_FLEET_HARD_CAP,
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
  jnoccioInstances: null,
}

const [metrics, setMetrics] = createSignal<OcalFleetMetrics>(DEFAULT_METRICS)

export function useOcalMetrics() {
  return metrics
}

export function updateOcalMetrics(patch: Partial<OcalFleetMetrics>) {
  const current = metrics()
  let changed = false
  const next: OcalFleetMetrics = { ...current }
  for (const [key, value] of Object.entries(patch) as [keyof OcalFleetMetrics, OcalFleetMetrics[keyof OcalFleetMetrics]][]) {
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

export function resetOcalMetrics() {
  setMetrics({ ...DEFAULT_METRICS })
}

/**
 * Compute the elapsed wall-clock running time as a "Hh Mm Ss" string.
 * Returns null when no run is active.
 */
export function formatOcalRuntime(now: number = Date.now()): string | null {
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
