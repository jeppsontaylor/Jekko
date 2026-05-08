import { createMemo, Show } from "solid-js"
import { useTheme } from "../../context/theme"

export type OcalSidebarProps = {
  run: any
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function formatCost(n: number): string {
  if (n === 0) return "$0.00"
  if (n < 0.01) return `$${n.toFixed(4)}`
  return `$${n.toFixed(2)}`
}

function formatUptime(created: number): string {
  const elapsed = Math.max(0, Date.now() - created)
  const seconds = Math.floor(elapsed / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m`
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    created: "starting",
    armed: "armed",
    running: "running",
    paused: "paused",
    satisfied: "done",
    aborted: "aborted",
    failed: "failed",
  }
  return labels[status] ?? status
}

export function OcalSidebar(props: OcalSidebarProps) {
  const { theme } = useTheme()
  const run = () => props.run
  const stats = () => run()?._stats ?? { iteration_count: 0, total_tokens: 0, total_cost: 0 }
  const jobName = () => {
    const spec = run()?.spec_json as Record<string, any> | undefined
    return spec?.job?.name ?? "daemon"
  }
  const status = createMemo(() => statusLabel(String(run()?.status ?? "unknown")))
  const isActive = createMemo(() => !["satisfied", "aborted", "failed"].includes(String(run()?.status)))
  const statusColor = createMemo(() => {
    const s = String(run()?.status)
    if (s === "running") return theme.success
    if (s === "paused") return theme.warning
    if (s === "satisfied") return theme.info
    if (s === "aborted" || s === "failed") return theme.error
    return theme.textMuted
  })

  return (
    <box flexShrink={0} gap={0}>
      {/* Header */}
      <text fg={theme.warning}>
        <b>∞ OCAL MODE</b>
      </text>

      {/* Job name */}
      <text fg={theme.textMuted}>{jobName()}</text>

      {/* Status */}
      <text fg={theme.textMuted}>
        <span style={{ fg: statusColor() }}>●</span>{" "}
        <span style={{ fg: statusColor() }}>{status()}</span>
        <Show when={run()?.phase && run()?.phase !== run()?.status}>
          <span> · {run()?.phase}</span>
        </Show>
      </text>

      {/* Separator */}
      <text fg={theme.borderSubtle}>{"─".repeat(38)}</text>

      {/* Iteration */}
      <text fg={theme.textMuted}>
        Loops    <span style={{ fg: theme.text }}><b>{run()?.iteration ?? 0}</b></span>
      </text>

      {/* Tokens */}
      <text fg={theme.textMuted}>
        Tokens   <span style={{ fg: theme.text }}><b>{formatTokens(stats().total_tokens)}</b></span>
      </text>

      {/* Cost */}
      <text fg={theme.textMuted}>
        Cost     <span style={{ fg: theme.text }}><b>{formatCost(stats().total_cost)}</b></span>
      </text>

      {/* Uptime */}
      <Show when={isActive() && run()?.time_created}>
        <text fg={theme.textMuted}>
          Uptime   <span style={{ fg: theme.text }}><b>{formatUptime(run()!.time_created)}</b></span>
        </text>
      </Show>

      {/* Bottom separator */}
      <text fg={theme.borderSubtle}>{"─".repeat(38)}</text>
    </box>
  )
}
