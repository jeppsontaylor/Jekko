import { Cause, Effect } from "effect"
import { parseOcal } from "./parser"
import type { OcalParsed, OcalPreview } from "./schema"

export type OcalDetection =
  | { readonly kind: "none" }
  | { readonly kind: "invalid"; readonly error: string }
  | { readonly kind: "preview"; readonly parsed: OcalParsed; readonly preview: OcalPreview }

export function detectOcal(text: string): OcalDetection {
  if (!text.trimStart().startsWith("<<<OCAL v1:daemon id=")) return { kind: "none" }
  const exit = Effect.runSyncExit(parseOcal(text, { requireArm: false }))
  if (exit._tag === "Failure") {
    return { kind: "invalid", error: String(Cause.squash(exit.cause)) }
  }
  return { kind: "preview", parsed: exit.value, preview: exit.value.preview }
}
