import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createMemo, createSignal, onCleanup, onMount, Show } from "solid-js"
import { useOcalFlash, useOcalMetrics, formatOcalRuntime, ocalFleetHardCap } from "../../context/ocal-flash"

const id = "internal:sidebar-ocal"

const numberFmt = new Intl.NumberFormat("en-US")
const moneyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})
const latencyFmt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
})

function View(props: { api: TuiPluginApi }) {
  const theme = () => props.api.theme.current
  const flash = useOcalFlash()
  const metrics = useOcalMetrics()

  // Tick once a second for live runtime / heartbeat-age strings.
  const [tick, setTick] = createSignal(Date.now())
  onMount(() => {
    const handle = setInterval(() => setTick(Date.now()), 1000)
    onCleanup(() => clearInterval(handle))
  })

  const runtime = createMemo(() => formatOcalRuntime(tick()))

  // Workers line — prefer jnoccio's view of active agents when connected,
  // because that captures every worker hitting the gateway.
  const workersLine = createMemo(() => {
    const m = metrics()
    const active = m.jnoccioConnected && m.jnoccioActiveAgents != null ? m.jnoccioActiveAgents : m.workersActive
    const max = m.workersMax || ocalFleetHardCap()
    return `${active} / ${max}`
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

  const tokenBreakdown = createMemo(() => {
    const m = metrics()
    const parts: string[] = []
    if (m.jnoccioConnected && m.jnoccioPromptTokens != null) {
      if (m.jnoccioPromptTokens) parts.push(`in ${numberFmt.format(m.jnoccioPromptTokens)}`)
      if (m.jnoccioCompletionTokens != null && m.jnoccioCompletionTokens > 0) {
        parts.push(`out ${numberFmt.format(m.jnoccioCompletionTokens)}`)
      }
    } else {
      if (m.inputTokens) parts.push(`in ${numberFmt.format(m.inputTokens)}`)
      if (m.outputTokens) parts.push(`out ${numberFmt.format(m.outputTokens)}`)
      if (m.cacheTokens) parts.push(`cache ${numberFmt.format(m.cacheTokens)}`)
    }
    return parts.join(" · ")
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
    const inst = m.jnoccioInstances ?? 0
    const max = m.jnoccioMaxInstances ?? ocalFleetHardCap()
    return `${inst} / ${max}`
  })

  const jnoccioTraffic = createMemo(() => {
    const m = metrics()
    if (!m.jnoccioConnected) return null
    const calls = m.jnoccioCalls ?? 0
    const wins = m.jnoccioWins ?? 0
    const failures = m.jnoccioFailures ?? 0
    if (!calls && !wins && !failures) return null
    return `${numberFmt.format(calls)} calls · ${numberFmt.format(wins)} wins · ${numberFmt.format(failures)} fail`
  })

  const jnoccioLatency = createMemo(() => {
    const m = metrics()
    if (!m.jnoccioConnected || m.jnoccioAvgLatencyMs == null) return null
    return `avg ${latencyFmt.format(m.jnoccioAvgLatencyMs)}ms`
  })

  const heartbeatAge = createMemo(() => {
    const m = metrics()
    if (!m.jnoccioConnected || !m.jnoccioLastHeartbeat) return null
    const ageMs = Math.max(0, tick() - m.jnoccioLastHeartbeat)
    if (ageMs < 2_000) return "live"
    const sec = Math.floor(ageMs / 1000)
    return `last beat ${sec}s ago`
  })

  return (
    <Show when={flash().size > 0}>
      <box>
        <text fg={theme().warning}>
          <b>OCAL</b>
        </text>
        <text fg={theme().textMuted}>{statusLine()}</text>
        <text fg={theme().text}>workers {workersLine()}</text>
        <text fg={theme().text}>tokens {tokensLine()}</text>
        <Show when={tokenBreakdown()}>
          <text fg={theme().textMuted}>{tokenBreakdown()}</text>
        </Show>
        <text fg={theme().text}>loops {loopsLine()}</text>
        <Show when={runtime()}>
          <text fg={theme().text}>uptime {runtime()}</text>
        </Show>
        <Show when={showCost()}>
          <text fg={theme().textMuted}>{moneyFmt.format(metrics().costUsd)} spent</text>
        </Show>
        <Show when={showJankurai()}>
          <text fg={theme().textMuted}>jankurai: {metrics().jankuraiFindings} open</text>
        </Show>
        <Show when={jnoccioLine()}>
          <text fg={metrics().jnoccioConnected ? theme().success : theme().textMuted}>
            jnoccio inst {jnoccioLine()}
          </text>
        </Show>
        <Show when={jnoccioTraffic()}>
          <text fg={theme().textMuted}>{jnoccioTraffic()}</text>
        </Show>
        <Show when={jnoccioLatency()}>
          <text fg={theme().textMuted}>{jnoccioLatency()}</text>
        </Show>
        <Show when={heartbeatAge()}>
          <text fg={theme().textMuted}>jnoccio {heartbeatAge()}</text>
        </Show>
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
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
