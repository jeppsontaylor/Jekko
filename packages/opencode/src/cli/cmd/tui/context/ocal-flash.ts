import { createSignal } from "solid-js"

/**
 * OCAL Flash — gold theme overlay when OCAL is detected anywhere.
 *
 * Multiple sources can signal activation independently (prompt input,
 * assistant message stream, daemon dialog). Each source owns a string key;
 * the overlay is active when any source is set. This avoids races where
 * one source clearing accidentally clears another's signal.
 */

const OCAL_OVERLAY_THEME = "opencode-gold"

const [active, setActive] = createSignal<ReadonlySet<string>>(new Set())

export function useOcalFlash() {
  return active
}

export function isOcalFlashActive() {
  return active().size > 0
}

export function ocalFlashOverlayTheme() {
  return OCAL_OVERLAY_THEME
}

/**
 * Mark a source as actively viewing/editing an OCAL block.
 * Pass true to add, false to clear. Idempotent — safe in effects.
 */
export function setOcalFlashSource(sourceId: string, isActive: boolean) {
  const current = active()
  const has = current.has(sourceId)
  if (isActive === has) return
  const next = new Set(current)
  if (isActive) next.add(sourceId)
  else next.delete(sourceId)
  setActive(next)
}

const OCAL_SENTINEL_RE = /<<<OCAL v\d+:daemon id=[A-Za-z0-9._-]+>>>/

export function textHasOcalSentinel(text: string | undefined | null): boolean {
  if (!text) return false
  return OCAL_SENTINEL_RE.test(text)
}
