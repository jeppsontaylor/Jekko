export const DAEMON_TERMINAL_STATUSES = new Set(["satisfied", "aborted", "failed", "paused"])

export function daemonRunIsLive(run: unknown): boolean {
  if (!run || typeof run !== "object") return false
  return !DAEMON_TERMINAL_STATUSES.has(String((run as { status?: unknown }).status))
}

export function daemonRunMatchesSession(run: unknown, sessionID: string): boolean {
  if (!run || typeof run !== "object") return false
  const record = run as { active_session_id?: unknown; root_session_id?: unknown }
  return record.active_session_id === sessionID || record.root_session_id === sessionID
}

export function selectDaemonRunForSession(runs: readonly unknown[], sessionID: string): unknown | undefined {
  const matchesSession = (run: unknown) => daemonRunMatchesSession(run, sessionID)
  return runs.find((run) => matchesSession(run) && daemonRunIsLive(run)) ?? runs.find(matchesSession)
}

export function daemonPollResultForSession(runs: readonly unknown[], sessionID: string) {
  const run = selectDaemonRunForSession(runs, sessionID)
  return {
    run,
    found: !!run,
    live: daemonRunIsLive(run),
    terminal: !!run && !daemonRunIsLive(run),
  }
}

export function shouldPreserveZyalStateOnDaemonPollError(input: {
  promptSubmitted: boolean
  currentRun: unknown | undefined
}): boolean {
  return input.promptSubmitted || daemonRunIsLive(input.currentRun)
}
