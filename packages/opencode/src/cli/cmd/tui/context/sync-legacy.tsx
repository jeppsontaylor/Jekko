import type {
  Message,
  Agent,
  Provider,
  Session,
  Part,
  Config,
  Todo,
  Command,
  PermissionRequest,
  QuestionRequest,
  LspStatus,
  McpStatus,
  McpResource,
  FormatterStatus,
  SessionStatus,
  ProviderListResponse,
  ProviderAuthMethod,
  VcsInfo,
} from "@opencode-ai/sdk/v2"
import { createStore, produce, reconcile } from "solid-js/store"
import { onMount } from "solid-js"
import { useProject } from "@tui/context/project"
import { useEvent } from "@tui/context/event"
import { useSDK } from "@tui/context/sdk"
import { Binary } from "@opencode-ai/core/util/binary"
import { createSimpleContext } from "./helper"
import type { Snapshot } from "@/snapshot"
import { emptyConsoleState, type ConsoleState } from "@/config/console-state"
import path from "path"
import { useKV } from "./kv"

export const { use: useSync, provider: SyncProvider } = createSimpleContext({
  name: "Sync",
  init: () => {
    const [store, setStore] = createStore<{
      status: "loading" | "partial" | "complete"
      provider: Provider[]
      provider_default: Record<string, string>
      provider_next: ProviderListResponse
      console_state: ConsoleState
      provider_auth: Record<string, ProviderAuthMethod[]>
      agent: Agent[]
      command: Command[]
      permission: {
        [sessionID: string]: PermissionRequest[]
      }
      question: {
        [sessionID: string]: QuestionRequest[]
      }
      config: Config
      session: Session[]
      session_status: {
        [sessionID: string]: SessionStatus
      }
      session_diff: {
        [sessionID: string]: Snapshot.FileDiff[]
      }
      todo: {
        [sessionID: string]: Todo[]
      }
      pending: {
        [sessionID: string]: Todo[]
      }
      message: {
        [sessionID: string]: Message[]
      }
      part: {
        [messageID: string]: Part[]
      }
      lsp: LspStatus[]
      mcp: {
        [key: string]: McpStatus
      }
      mcp_resource: {
        [key: string]: McpResource
      }
      formatter: FormatterStatus[]
      vcs: VcsInfo | undefined
    }>({
      provider_next: {
        all: [],
        default: {},
        connected: [],
      },
      console_state: emptyConsoleState,
      provider_auth: {},
      config: {},
      status: "loading",
      agent: [],
      permission: {},
      question: {},
      command: [],
      provider: [],
      provider_default: {},
      session: [],
      session_status: {},
      session_diff: {},
      todo: {},
      pending: {},
      message: {},
      part: {},
      lsp: [],
      mcp: {},
      mcp_resource: {},
      formatter: [],
      vcs: undefined,
    })

    const event = useEvent()
    const project = useProject()
    const sdk = useSDK()
    const kv = useKV()

    const fullSyncedSessions = new Set<string>()
    let syncedWorkspace = project.workspace.current()

    function sessionListQuery(): { scope?: "project"; path?: string } {
      if (!kv.get("session_directory_filter_enabled", true)) return { scope: "project" }
      if (!project.data.instance.path.worktree || !project.data.instance.path.directory) return { scope: "project" }
      return {
        path: path
          .relative(path.resolve(project.data.instance.path.worktree), project.data.instance.path.directory)
          .replaceAll("\\", "/"),
      }
    }

    function listSessions() {
      return sdk.client.session
        .list({ start: Date.now() - 30 * 24 * 60 * 60 * 1000, ...sessionListQuery() })
        .then((x) => (x.data ?? []).toSorted((a, b) => a.id.localeCompare(b.id)))
    }

    async function refresh() {
      const session = await listSessions()
      setStore("session", session)
      return session
    }

    async function syncSessionMessages(sessionID: string) {
      const response = await sdk.client.session.messages({ sessionID })
      const items = response.data ?? []
      setStore(
        "message",
        sessionID,
        items.map((item) => item.info),
      )
      for (const item of items) {
        setStore("part", item.info.id, reconcile(item.parts))
      }
    }

    async function syncSession(sessionID: string) {
      if (fullSyncedSessions.has(sessionID)) return store.session.find((item) => item.id === sessionID)

      const [session, todo, diff] = await Promise.all([
        sdk.client.session.get({ sessionID }),
        sdk.client.session.todo({ sessionID }),
        sdk.client.session.diff({ sessionID }),
      ])

      if (session.data) {
        const current = store.session
        const index = current.findIndex((item) => item.id === sessionID)
        if (index >= 0) setStore("session", index, reconcile(session.data))
        else setStore("session", current.length, session.data)
      }

      setStore("todo", sessionID, todo.data ?? [])
      setStore("pending", sessionID, todo.data ?? [])
      setStore("session_diff", sessionID, diff.data ?? [])

      await syncSessionMessages(sessionID)
      fullSyncedSessions.add(sessionID)
      return session.data
    }

    async function bootstrap(_options?: { fatal?: boolean }) {
      await project.sync()
      await project.workspace.sync()
      await refresh()
      setStore("status", "complete")
    }

    event.subscribe((event) => {
      const evt = event as any
      switch (evt.type) {
        case "server.instance.disposed":
          void bootstrap()
          break
        case "permission.replied": {
          const requests = store.permission[evt.properties.sessionID]
          if (!requests) break
          const match = Binary.search(requests, evt.properties.requestID, (r) => r.id)
          if (!match.found) break
          setStore(
            "permission",
            evt.properties.sessionID,
            produce((draft) => {
              draft.splice(match.index, 1)
            }),
          )
          break
        }

        case "permission.asked": {
          const request = evt.properties
          const requests = store.permission[request.sessionID]
          if (!requests) {
            setStore("permission", request.sessionID, [request])
            break
          }
          const match = Binary.search(requests, request.id, (r) => r.id)
          if (match.found) {
            setStore("permission", request.sessionID, match.index, reconcile(request))
            break
          }
          setStore(
            "permission",
            request.sessionID,
            produce((draft) => {
              draft.splice(match.index, 0, request)
            }),
          )
          break
        }

        case "question.replied":
        case "question.rejected": {
          const requests = store.question[evt.properties.sessionID]
          if (!requests) break
          const match = Binary.search(requests, evt.properties.requestID, (r) => r.id)
          if (!match.found) break
          setStore(
            "question",
            evt.properties.sessionID,
            produce((draft) => {
              draft.splice(match.index, 1)
            }),
          )
          break
        }

        case "question.asked": {
          const request = evt.properties
          const requests = store.question[request.sessionID]
          if (!requests) {
            setStore("question", request.sessionID, [request])
            break
          }
          const match = Binary.search(requests, request.id, (r) => r.id)
          if (match.found) {
            setStore("question", request.sessionID, match.index, reconcile(request))
            break
          }
          setStore(
            "question",
            request.sessionID,
            produce((draft) => {
              draft.splice(match.index, 0, request)
            }),
          )
          break
        }

        case "todo.updated":
          setStore("todo", evt.properties.sessionID, evt.properties.todos)
          setStore("pending", evt.properties.sessionID, evt.properties.todos)
          break

        case "session.diff":
          setStore("session_diff", evt.properties.sessionID, evt.properties.diff)
          break

        case "session.deleted": {
          const result = Binary.search(store.session, evt.properties.info.id, (s) => s.id)
          if (result.found) {
            setStore(
              "session",
              produce((draft) => {
                draft.splice(result.index, 1)
              }),
            )
          }
          break
        }
        case "session.updated": {
          const result = Binary.search(store.session, evt.properties.info.id, (s) => s.id)
          if (result.found) {
            setStore("session", result.index, reconcile(evt.properties.info))
            break
          }
          setStore(
            "session",
            produce((draft) => {
              draft.splice(result.index, 0, evt.properties.info)
            }),
          )
          break
        }

        case "session.status": {
          setStore("session_status", evt.properties.sessionID, evt.properties.status)
          break
        }

        case "message.updated": {
          const messages = store.message[evt.properties.info.sessionID]
          if (!messages) {
            setStore("message", evt.properties.info.sessionID, [evt.properties.info])
            break
          }
          const result = Binary.search(messages, evt.properties.info.id, (m) => m.id)
          if (result.found) {
            setStore("message", evt.properties.info.sessionID, result.index, reconcile(evt.properties.info))
            break
          }
          setStore(
            "message",
            evt.properties.info.sessionID,
            produce((draft) => {
              draft.splice(result.index, 0, evt.properties.info)
            }),
          )
          break
        }
        case "part.updated": {
          const parts = store.part[evt.properties.info.messageID]
          if (!parts) {
            setStore("part", evt.properties.info.messageID, [evt.properties.info])
            break
          }
          const result = Binary.search(parts, evt.properties.info.id, (m) => m.id)
          if (result.found) {
            setStore("part", evt.properties.info.messageID, result.index, reconcile(evt.properties.info))
            break
          }
          setStore(
            "part",
            evt.properties.info.messageID,
            produce((draft) => {
              draft.splice(result.index, 0, evt.properties.info)
            }),
          )
          break
        }

        case "lsp.updated":
          setStore("lsp", evt.properties.status)
          break

        case "mcp.updated":
          setStore("mcp", evt.properties.name, evt.properties.status)
          break
        case "mcp.resource.updated":
          setStore("mcp_resource", evt.properties.resource.key, evt.properties.resource)
          break

        case "formatter.updated":
          setStore("formatter", evt.properties.status)
          break

        case "session.updated":
          setStore("session", evt.properties.info)
          break
        case "project.updated":
          break
      }
    })

    onMount(() => {
      void bootstrap()
    })

    return {
      data: store,
      get path() {
        return project.instance.path()
      },
      get ready() {
        if (process.env.OPENCODE_FAST_BOOT) return true
        return store.status !== "loading"
      },
      get status() {
        return store.status
      },
      set: setStore,
      bootstrap,
      session: {
        get(sessionID: string) {
          const match = Binary.search(store.session, sessionID, (s) => s.id)
          if (match.found) return store.session[match.index]
          return undefined
        },
        query() {
          return sessionListQuery()
        },
        status(sessionID: string) {
          const session = store.session.find((item) => item.id === sessionID)
          if (!session) return "idle"
          if (session.time.compacting) return "compacting"
          const messages = store.message[sessionID] ?? []
          const last = messages.at(-1)
          if (!last) return "idle"
          if (last.role === "user") return "working"
          return last.time.completed ? "idle" : "working"
        },
        refresh,
        sync: syncSession,
        message: {
          sync: syncSessionMessages,
          fromSession(sessionID: string) {
            return store.message[sessionID] ?? []
          },
        },
      },
    }
  },
})
