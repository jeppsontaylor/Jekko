import { Cause, Effect } from "effect"
import { parseZyal } from "./parser"
import type { ZyalParsed, ZyalPreview } from "./schema"

export type ZyalDetection =
  | { readonly kind: "none" }
  | { readonly kind: "invalid"; readonly error: string }
  | { readonly kind: "preview"; readonly parsed: ZyalParsed; readonly preview: ZyalPreview }

export function detectZyal(text: string): ZyalDetection {
  if (!hasZyalOpenAfterCommentPreamble(text)) return { kind: "none" }
  const exit = Effect.runSyncExit(parseZyal(text, { requireArm: false }))
  if (exit._tag === "Failure") {
    return { kind: "invalid", error: String(Cause.squash(exit.cause)) }
  }
  return { kind: "preview", parsed: exit.value, preview: exit.value.preview }
}

function hasZyalOpenAfterCommentPreamble(text: string) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === "" || trimmed.startsWith("#")) continue
    return trimmed.startsWith("<<<ZYAL v1:daemon id=")
  }
  return false
}
