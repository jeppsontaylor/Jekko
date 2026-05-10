// jankurai:allow HLT-001-DEAD-MARKER reason=functional-optional-returns-by-design expires=2027-01-01
import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@jekko-ai/plugin/tui"
import { createMemo, createSignal, For, onCleanup, onMount, Show } from "solid-js"
import {
  formatZyalRuntime,
  useZyalExit,
  useZyalFlash,
  useZyalMetrics,
  zyalFleetHardCap,
} from "../../context/zyal-flash"

const id = "internal:sidebar-zyal"

const numberFmt = new Intl.NumberFormat("en-US")
const compactFmt = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 })
const moneyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const latencyFmt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

// High-contrast neon palette for the sidebar's number values. Tuned to pop
// against the `jekko-gold` flash background (deep amber). All values are
// truecolor hex; opentui upgrades them via the COLORTERM=truecolor terminal
// hint that the TUI sets at boot. Each metric reads a different color so the
// eye can scan the panel by category instead of parsing labels.
const NEON = {
  loops: "#FF40FF",      // magenta — loop counter
  tokensTotal: "#00FFFF", // cyan — headline aggregate
  tokensIn: "#FFD000",    // amber — input side
  tokensOut: "#00FF87",   // green — output side
  cache: "#7DF9FF",       // electric blue — cache reads/writes
  workersActive: "#BBFF00", // lime — fleet seats in use
  workersMax: "#A0A0A0",    // dim grey — capacity
  uptime: "#FFD000",        // amber — wall clock
  cost: "#FF1493",          // hot pink — money draws attention
  calls: "#00FFFF",         // cyan — request count
  wins: "#00FF87",          // green — success
  fails: "#FF4060",         // red — failure
  latency: "#FF9933",       // orange — milliseconds
  heartbeatLive: "#00FF87", // green — fresh
  heartbeatStale: "#FF4060", // red — late
  separator: "#A06030",      // muted gold
}

// Exit-tone palette. Same neon language as the live-metrics panel so the
// banner reads as a continuation, not a different feature. All bold.
const EXIT_TONE: Record<string, { fg: string; label: string }> = {
  success: { fg: "#00FF87", label: "ZYAL SATISFIED" },
  warning: { fg: "#FFD000", label: "ZYAL PAUSED" },
  error: { fg: "#FF4060", label: "ZYAL EXITED" },
}

function View(props: { api: TuiPluginApi }) {
  const theme = () => props.api.theme.current
  const flash = useZyalFlash()
  const metrics = useZyalMetrics()
  const exit = useZyalExit()
  // Render the panel whenever ZYAL flash is active OR a recent terminal
  // record is still within its TTL — so the user always sees the exit
  // banner even after the gold theme deactivates.
  const visible = createMemo(() => flash().size > 0 || exit() !== null)

  // Tick once a second for live runtime / heartbeat-age strings.
  const [tick, setTick] = createSignal(Date.now())
  onMount(() => {
    const handle = setInterval(() => setTick(Date.now()), 1000)
    onCleanup(() => clearInterval(handle))
  })

  const runtime = createMemo(() => formatZyalRuntime(tick()))

  // Workers line — prefer jnoccio's view of active agents when connected,
  // because that captures every worker hitting the gateway.
  const workersActive = createMemo(() => {
    const m = metrics()
    const active = m.jnoccioConnected && m.jnoccioActiveAgents != null ? m.jnoccioActiveAgents : m.workersActive
    return numberFmt.format(active)
  })

  const workersMax = createMemo(() => {
    const m = metrics()
    return numberFmt.format(m.workersMax || zyalFleetHardCap())
  })

  // Tokens line — when jnoccio is connected and we have totals, those
  // capture cross-instance traffic; otherwise fall back to the daemon-run
  // single-session aggregate.
  const totalTokens = createMemo(() => {
    const m = metrics()
    if (m.jnoccioConnected && m.jnoccioTotalTokens != null) return m.jnoccioTotalTokens
    return m.totalTokens
  })
  const tokensLine = createMemo(() => numberFmt.format(totalTokens()))

  // Structured breakdown so each side (in / out / cache) can carry its own
  // neon color in the panel. Each entry is `{ label, value, color }`.
  const tokenBreakdownParts = createMemo<{ label: string; value: string; color: string }[]>(() => {
    const m = metrics()
    const out: { label: string; value: string; color: string }[] = []
    if (m.jnoccioConnected && m.jnoccioPromptTokens != null) {
      if (m.jnoccioPromptTokens) {
        out.push({ label: "in", value: compactFmt.format(m.jnoccioPromptTokens), color: NEON.tokensIn })
      }
      if (m.jnoccioCompletionTokens != null && m.jnoccioCompletionTokens > 0) {
        out.push({ label: "out", value: compactFmt.format(m.jnoccioCompletionTokens), color: NEON.tokensOut })
      }
    } else {
      if (m.inputTokens) out.push({ label: "in", value: compactFmt.format(m.inputTokens), color: NEON.tokensIn })
      if (m.outputTokens) out.push({ label: "out", value: compactFmt.format(m.outputTokens), color: NEON.tokensOut })
      if (m.cacheTokens) out.push({ label: "cache", value: compactFmt.format(m.cacheTokens), color: NEON.cache })
    }
    return out
  })

  const loopsLine = createMemo(() => {
    const m = metrics()
    if (m.tasksCompleted || m.tasksIncubated) {
      return `${m.loopsCompleted} (${m.tasksCompleted}✓ ${m.tasksIncubated}🜨)`
    }
    return numberFmt.format(m.loopsCompleted)
  })

  const statusLine = createMemo(() => metrics().status ?? "active")
  const showJankurai = createMemo(() => metrics().jankuraiFindings !== null)
  const showCost = createMemo(() => metrics().costUsd > 0)

  const jnoccioLine = createMemo(() => {
    const m = metrics()
    if (!m.jnoccioConnected && m.jnoccioInstances === null) return null
    return true
  })

  const jnoccioInstancesActive = createMemo(() => {
    return numberFmt.format(metrics().jnoccioInstances ?? 0)
  })

  const jnoccioInstancesMax = createMemo(() => {
    return numberFmt.format(metrics().jnoccioMaxInstances ?? zyalFleetHardCap())
  })

  const trafficCounts = createMemo<{ calls: number; wins: number; failures: number } | null>(() => {
    const m = metrics()
    if (!m.jnoccioConnected) return null
    const calls = m.jnoccioCalls ?? 0
    const wins = m.jnoccioWins ?? 0
    const failures = m.jnoccioFailures ?? 0
    if (!calls && !wins && !failures) return null
    return { calls, wins, failures }
  })

  const jnoccioLatencyMs = createMemo<number | null>(() => {
    const m = metrics()
    if (!m.jnoccioConnected || m.jnoccioAvgLatencyMs == null) return null
    return m.jnoccioAvgLatencyMs
  })

  // Pre-rendered heartbeat tone so the JSX stays a flat span pair: the
  // label part uses textMuted and the colored value carries the age signal.
  const heartbeatStatus = createMemo<
    | { live: true; color: string; value: string; suffix: string }
    | { live: false; color: string; value: string; suffix: string }
    | null
  >(() => {
    const m = metrics()
    if (!m.jnoccioConnected || !m.jnoccioLastHeartbeat) return null
    const ageMs = Math.max(0, tick() - m.jnoccioLastHeartbeat)
    if (ageMs < 2_000) {
      return { live: true, color: NEON.heartbeatLive, value: "live", suffix: "" }
    }
    const sec = Math.floor(ageMs / 1000)
    const aged = ageMs > 60_000
    return {
      live: false,
      color: aged ? NEON.heartbeatStale : NEON.heartbeatLive,
      value: `${sec}s`,
      suffix: " ago",
    }
  })

  const runIdShort = createMemo(() => {
    const id = metrics().runId
    if (!id) return null
    return id.length > 12 ? id.slice(0, 12) + "…" : id
  })

  const commitsLine = createMemo(() => {
    const m = metrics()
    if (!m.tasksCompleted && !m.tasksIncubated) return null
    return `${m.tasksCompleted}✓ completed · ${m.tasksIncubated}🜨 incubated`
  })

  return (
    <Show when={visible()}>
      <box gap={0}>
        {/* Exit banner — sticks for ZYAL_EXIT_TTL_MS after a terminal status,
            even after the gold flash deactivates. Uses the exit tone palette
            so the user can SEE the run ended and WHY at a glance. */}
        <Show when={exit()}>
          {(record) => {
            const tone = EXIT_TONE[record().tone] ?? EXIT_TONE.warning
            return (
              <>
                <text fg={tone.fg}>
                  <b>{tone.label}</b>
                </text>
                <text fg={theme().textMuted}>
                  <span style={{ fg: tone.fg, bold: true }}>●</span>{" "}
                  <span style={{ fg: tone.fg }}>{record().status}</span>
                </text>
                <text fg={theme().text}>{record().reason}</text>
                <text fg={NEON.separator}>{"─".repeat(38)}</text>
              </>
            )
          }}
        </Show>

        {/* Header */}
        <text fg={theme().warning}>
          <b>∞ ZYAL MODE</b>
        </text>

        {/* Run ID */}
        <Show when={runIdShort()}>
          <text fg={theme().textMuted}>run {runIdShort()}</text>
        </Show>

        {/* Status */}
        <text fg={theme().textMuted}>
          <span style={{ fg: statusLine() === "active" ? theme().success : theme().warning }}>●</span>{" "}
          {statusLine()}
        </text>

        {/* Separator */}
        <text fg={NEON.separator}>{"─".repeat(38)}</text>

        {/* Core metrics — neon numbers on muted labels for instant scanability. */}
        <text fg={theme().textMuted}>
          Loops    <span style={{ fg: NEON.loops, bold: true }}>{loopsLine()}</span>
        </text>
        <text fg={theme().textMuted}>
          Tokens   <span style={{ fg: NEON.tokensTotal, bold: true }}>{tokensLine()}</span>
        </text>
        <Show when={tokenBreakdownParts().length > 0}>
          <text fg={theme().textMuted}>
            {"         "}
            <For each={tokenBreakdownParts()}>
              {(part, i) => (
                <>
                  <Show when={i() > 0}>
                    <span style={{ fg: theme().textMuted }}> · </span>
                  </Show>
                  <span style={{ fg: theme().textMuted }}>{part.label} </span>
                  <span style={{ fg: part.color, bold: true }}>{part.value}</span>
                </>
              )}
            </For>
          </text>
        </Show>
        <text fg={theme().textMuted}>
          Workers{" "}
          <span style={{ fg: NEON.workersActive, bold: true }}>
            {numberFmt.format(
              metrics().jnoccioConnected && metrics().jnoccioActiveAgents != null
                ? metrics().jnoccioActiveAgents!
                : metrics().workersActive,
            )}
          </span>
          <span style={{ fg: theme().textMuted }}> / </span>
          <span style={{ fg: NEON.workersMax }}>{numberFmt.format(metrics().workersMax || zyalFleetHardCap())}</span>
        </text>
        <Show when={runtime()}>
          <text fg={theme().textMuted}>
            Uptime   <span style={{ fg: NEON.uptime, bold: true }}>{runtime()}</span>
          </text>
        </Show>
        <Show when={showCost()}>
          <text fg={theme().textMuted}>
            Cost     <span style={{ fg: NEON.cost, bold: true }}>{moneyFmt.format(metrics().costUsd)}</span>
          </text>
        </Show>
        <Show when={commitsLine()}>
          <text fg={theme().textMuted}>{commitsLine()}</text>
        </Show>
        <Show when={showJankurai()}>
          <text fg={theme().textMuted}>
            jankurai: <span style={{ fg: NEON.fails, bold: true }}>{metrics().jankuraiFindings}</span> open
          </text>
        </Show>

        {/* Jnoccio section */}
        <Show when={jnoccioLine()}>
          <text fg={NEON.separator}>{"─".repeat(38)}</text>
          <text fg={metrics().jnoccioConnected ? theme().success : theme().textMuted}>
            <b>Jnoccio</b>
            <span style={{ fg: theme().textMuted }}> </span>
            <span style={{ fg: NEON.workersActive, bold: true }}>{jnoccioInstancesActive()}</span>
            <span style={{ fg: theme().textMuted }}> / </span>
            <span style={{ fg: NEON.workersMax }}>{jnoccioInstancesMax()}</span>
          </text>
        </Show>
        <Show when={trafficCounts()}>
          {(counts) => (
            <text fg={theme().textMuted}>
              <span style={{ fg: NEON.calls, bold: true }}>{compactFmt.format(counts().calls)}</span>
              <span style={{ fg: theme().textMuted }}> calls · </span>
              <span style={{ fg: NEON.wins, bold: true }}>{compactFmt.format(counts().wins)}</span>
              <span style={{ fg: theme().textMuted }}> wins · </span>
              <span style={{ fg: NEON.fails, bold: true }}>{compactFmt.format(counts().failures)}</span>
              <span style={{ fg: theme().textMuted }}> fail</span>
            </text>
          )}
        </Show>
        <Show when={jnoccioLatencyMs()}>
          {(ms) => (
            <text fg={theme().textMuted}>
              avg <span style={{ fg: NEON.latency, bold: true }}>{latencyFmt.format(ms())}ms</span>
            </text>
          )}
        </Show>
        <Show when={heartbeatStatus()}>
          {(beat) => (
            <text fg={theme().textMuted}>
              {beat().live ? "" : "last beat "}
              <span style={{ fg: beat().color, bold: true }}>{beat().value}</span>
              {beat().suffix}
            </text>
          )}
        </Show>

        {/* Bottom separator */}
        <text fg={NEON.separator}>{"─".repeat(38)}</text>
      </box>
    </Show>
  )
}

const tui: TuiPlugin = async (api) => {
  api.slots.register({
    order: 90,
    slots: {
      sidebar_content() {
        return <View api={api} />
      },
      home_zyal_panel() {
        return <View api={api} />
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
