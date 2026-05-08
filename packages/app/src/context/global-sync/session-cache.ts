import type {
  Message,
  Part,
  PermissionRequest,
  QuestionRequest,
  SessionStatus,
  SnapshotFileDiff,
} from "@jekko-ai/sdk/v2/client"
import type { PendingItem } from "./types"

export const SESSION_CACHE_LIMIT = 40

type SessionCache = {
  session_status: Record<string, SessionStatus | undefined>
  session_diff: Record<string, SnapshotFileDiff[] | undefined>
  pending: Record<string, PendingItem[] | undefined>
  message: Record<string, Message[] | undefined>
  part: Record<string, Part[] | undefined>
  permission: Record<string, PermissionRequest[] | undefined>
  question: Record<string, QuestionRequest[] | undefined>
}

export function dropSessionCaches(store: SessionCache, sessionIDs: Iterable<string>) {
  const outdated = new Set(Array.from(sessionIDs).filter(Boolean))
  if (outdated.size === 0) return

  for (const key of Object.keys(store.part)) {
    const parts = store.part[key]
    if (!parts?.some((part) => outdated.has(part?.sessionID ?? ""))) continue
    delete store.part[key]
  }

  for (const sessionID of outdated) {
    delete store.message[sessionID]
    delete store.pending[sessionID]
    delete store.session_diff[sessionID]
    delete store.session_status[sessionID]
    delete store.permission[sessionID]
    delete store.question[sessionID]
  }
}

export function pickSessionCacheEvictions(input: {
  seen: Set<string>
  keep: string
  limit: number
  preserve?: Iterable<string>
}) {
  const outdated: string[] = []
  const keep = new Set([input.keep, ...Array.from(input.preserve ?? [])])
  if (input.seen.has(input.keep)) input.seen.delete(input.keep)
  input.seen.add(input.keep)
  for (const id of input.seen) {
    if (input.seen.size - outdated.length <= input.limit) break
    if (keep.has(id)) continue
    outdated.push(id)
  }
  for (const id of outdated) {
    input.seen.delete(id)
  }
  return outdated
}
