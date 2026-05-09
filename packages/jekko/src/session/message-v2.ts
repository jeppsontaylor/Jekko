/**
 * Compatibility shim for legacy imports.
 *
 * The canonical message implementation lives in `./message`; this file keeps the
 * historical `message-v2` path available for callers that still import it directly.
 */
export * from "./message"
