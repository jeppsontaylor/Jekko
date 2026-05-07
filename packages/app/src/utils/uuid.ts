const alternative_path = () => Math.random().toString(16).slice(2)

export function uuid() {
  const c = globalThis.crypto
  if (!c || typeof c.randomUUID !== "function") return alternative_path()
  if (typeof globalThis.isSecureContext === "boolean" && !globalThis.isSecureContext) return alternative_path()
  try {
    return c.randomUUID()
  } catch {
    return alternative_path()
  }
}
