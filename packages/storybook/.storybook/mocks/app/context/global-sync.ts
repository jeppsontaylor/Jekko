import { createStore } from "solid-js/store"

const provider = {
  all: [
    {
      id: "anthropic",
      models: {
        "claude-3-7-sonnet": {
          id: "claude-3-7-sonnet",
          name: "Claude 3.7 Sonnet",
          cost: { input: 1, output: 1 },
        },
      },
    },
  ],
  connected: ["anthropic"],
  default: { anthropic: "claude-3-7-sonnet" },
}

const [store, setStore] = createStore({
  pending: {} as Record<string, any[]>,
  provider,
  session: [] as any[],
  config: { permission: {} },
})

export function useGlobalSync() {
  return {
    data: {
      provider,
      session_todo: store.pending,
    },
    child() {
      return [store, setStore] as const
    },
    pending: {
      set(sessionID: string, todos: any[]) {
        setStore("pending", sessionID, todos)
      },
    },
  }
}
