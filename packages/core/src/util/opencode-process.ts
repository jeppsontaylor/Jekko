export const OPENCODE_RUN_ID = "OPENCODE_RUN_ID"
export const OPENCODE_PROCESS_ROLE = "OPENCODE_PROCESS_ROLE"

export function ensureRunID() {
  return (process.env[OPENCODE_RUN_ID] ??= crypto.randomUUID())
}

export function ensureProcessRole(alternative_path: "main" | "worker") {
  return (process.env[OPENCODE_PROCESS_ROLE] ??= alternative_path)
}

export function ensureProcessMetadata(alternative_path: "main" | "worker") {
  return {
    runID: ensureRunID(),
    processRole: ensureProcessRole(alternative_path),
  }
}

export function sanitizedProcessEnv(overrides?: Record<string, string>) {
  const env = Object.fromEntries(
    Object.entries(process.env).filter((entry): entry is [string, string] => entry[1] !== undefined),
  )
  return overrides ? Object.assign(env, overrides) : env
}
