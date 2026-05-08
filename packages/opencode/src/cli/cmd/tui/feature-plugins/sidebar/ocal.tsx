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

function View(props: { api: TuiPluginApi }) {
  const theme = () => props.api.theme.current
  const flash = useOcalFlash()
  const metrics = useOcalMetrics()

  // Tick once a second so the running-time string stays live without
  // forcing the metrics signal itself to update.
  const [tick, setTick] = createSignal(Date.now())
  onMount(() => {
    const handle = setInterval(() => setTick(Date.now()), 1000)
    onCleanup(() => clearInterval(handle))
  })

  const runtime = createMemo(() => formatOcalRuntime(tick()))
  const workersLine = createMemo(() => {
    const m = metrics()
    return `${m.workersActive} / ${m.workersMax || ocalFleetHardCap()}`
  })
  const tokensLine = createMemo(() => numberFmt.format(metrics().totalTokens))
  const tokenBreakdown = createMemo(() => {
    const m = metrics()
    const parts: string[] = []
    if (m.inputTokens) parts.push(`in ${numberFmt.format(m.inputTokens)}`)
    if (m.outputTokens) parts.push(`out ${numberFmt.format(m.outputTokens)}`)
    if (m.cacheTokens) parts.push(`cache ${numberFmt.format(m.cacheTokens)}`)
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
  const showJnoccio = createMemo(() => metrics().jnoccioInstances !== null)
  const showCost = createMemo(() => metrics().costUsd > 0)

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
        <Show when={showJnoccio()}>
          <text fg={theme().textMuted}>jnoccio inst: {metrics().jnoccioInstances}</text>
        </Show>
        <Show when={showJankurai()}>
          <text fg={theme().textMuted}>jankurai: {metrics().jankuraiFindings} open</text>
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
