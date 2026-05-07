import { Flag } from "@opencode-ai/core/flag/flag"
import { InstallationVersion } from "@opencode-ai/core/installation/version"
import { ensureProcessMetadata } from "@opencode-ai/core/util/opencode-process"

const HEARTBEAT_INTERVAL_MS = 30_000
const JNOCCIO_HEARTBEAT_ENDPOINT = (process.env.JNOCCIO_FUSION_URL ?? "http://127.0.0.1:4317").replace(/\/$/, "")
const JNOCCIO_HEARTBEAT_PATH = "/v1/jnoccio/agents/heartbeat"

let heartbeatTimer: ReturnType<typeof setInterval> | null = null
let heartbeatStarted = false

export type JnoccioProcessMetadata = ReturnType<typeof ensureProcessMetadata>

export function jnoccioIdentityHeaders(metadata: JnoccioProcessMetadata) {
  return {
    "User-Agent": `opencode/${InstallationVersion}`,
    "x-opencode-client": Flag.OPENCODE_CLIENT,
    "x-opencode-run-id": metadata.runID,
    "x-opencode-process-role": metadata.processRole,
    "x-opencode-pid": String(process.pid),
    "x-opencode-version": String(InstallationVersion),
  }
}

async function sendHeartbeat(metadata: JnoccioProcessMetadata) {
  try {
    await fetch(`${JNOCCIO_HEARTBEAT_ENDPOINT}${JNOCCIO_HEARTBEAT_PATH}`, {
      method: "POST",
      headers: jnoccioIdentityHeaders(metadata),
    })
  } catch {
    // Best-effort heartbeat. Ignore transient failures.
  }
}

export function startJnoccioHeartbeat(metadata: JnoccioProcessMetadata) {
  if (heartbeatStarted) return
  heartbeatStarted = true
  void sendHeartbeat(metadata)
  heartbeatTimer = setInterval(() => {
    void sendHeartbeat(metadata)
  }, HEARTBEAT_INTERVAL_MS)
  heartbeatTimer.unref?.()
}
