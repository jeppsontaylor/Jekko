import type { ZyalParsed } from "@/agent-script/schema"
import type { RunInfo, IterationInfo } from "./daemon-store"

export function buildDaemonIterationPrompt(input: {
  parsed: ZyalParsed
  run: RunInfo
  lastIteration?: IterationInfo
  locks?: string[]
  checkpointSha?: string
}) {
  const lines = [
    `<system-reminder>`,
    `ZYAL daemon iteration ${input.run.iteration + 1} for ${input.parsed.spec.job.name}.`,
    `Objective: ${input.parsed.spec.job.objective}`,
    `Loop policy: ${input.parsed.spec.loop?.policy ?? "bounded"}`,
    `Stop checks: ${input.parsed.preview.stop_checks.join("; ") || "(none)"}`,
    `Checkpoint: ${input.checkpointSha ?? "(none)"}`,
    `Active locks: ${input.locks?.join(", ") || "(none)"}`,
    `Last iteration: ${input.lastIteration?.terminal_reason ?? "(none)"}`,
    `Continue with one bounded unit of work. The runtime decides whether the daemon is finished.`,
    `</system-reminder>`,
  ]
  return lines.join("\n")
}

export function buildDaemonStateSummary(input: {
  parsed: ZyalParsed
  run: RunInfo
  iterations: IterationInfo[]
  lastError?: string | null
}) {
  return [
    `Run ${input.run.id}`,
    `Objective: ${input.parsed.spec.job.objective}`,
    `Status: ${input.run.status} / ${input.run.phase}`,
    `Iteration: ${input.run.iteration}`,
    `Epoch: ${input.run.epoch}`,
    `Last error: ${input.lastError ?? input.run.last_error ?? "(none)"}`,
    `Iterations recorded: ${input.iterations.length}`,
  ].join("\n")
}

export * as DaemonContext from "./daemon-context"

