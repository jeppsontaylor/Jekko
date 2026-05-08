import { createMemo } from "solid-js"
import { useSync } from "@tui/context/sync"

export function hasConnectedProvider(provider: { models: Record<string, unknown> }) {
  return Object.keys(provider.models).length > 0
}

export function useConnected() {
  const sync = useSync()
  return createMemo(() => sync.data.provider.some(hasConnectedProvider))
}
