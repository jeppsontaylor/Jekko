/** @jsxImportSource @opentui/solid */
import { describe, expect, test } from "bun:test"
import { testRender } from "@opentui/solid"
import { onMount } from "solid-js"
import { Global } from "@opencode-ai/core/global"
import { ArgsProvider } from "../../../../src/cli/cmd/tui/context/args"
import { ExitProvider } from "../../../../src/cli/cmd/tui/context/exit"
import { KVProvider, useKV } from "../../../../src/cli/cmd/tui/context/kv"
import { ProjectProvider } from "../../../../src/cli/cmd/tui/context/project"
import { SDKProvider, type EventSource } from "../../../../src/cli/cmd/tui/context/sdk"
import { SyncProvider, useSync } from "../../../../src/cli/cmd/tui/context/sync"
import { TuiConfigProvider } from "../../../../src/cli/cmd/tui/context/tui-config"
import { ThemeProvider } from "../../../../src/cli/cmd/tui/context/theme"
import { LocalProvider, useLocal } from "../../../../src/cli/cmd/tui/context/local"
import { ToastProvider } from "../../../../src/cli/cmd/tui/ui/toast"
import { tmpdir } from "../../../fixture/fixture"
import type { Provider } from "@opencode-ai/sdk/v2"

const worktree = "/tmp/opencode"
const directory = `${worktree}/packages/opencode`

async function wait(fn: () => boolean, timeout = 2000) {
  const start = Date.now()
  while (!fn()) {
    if (Date.now() - start > timeout) throw new Error("timed out waiting for condition")
    await Bun.sleep(10)
  }
}

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  })
}

function eventSource(): EventSource {
  return {
    subscribe: async () => () => {},
  }
}

function model(providerID: string, id: string, name: string) {
  return {
    id,
    providerID,
    api: {
      id: providerID,
      url: "https://example.test/v1",
      npm: "@ai-sdk/openai-compatible",
    },
    name,
    capabilities: {
      temperature: true,
      reasoning: true,
      attachment: false,
      toolcall: true,
      input: {
        text: true,
        audio: false,
        image: false,
        video: false,
        pdf: false,
      },
      output: {
        text: true,
        audio: false,
        image: false,
        video: false,
        pdf: false,
      },
      interleaved: false,
    },
    cost: {
      input: 0,
      output: 0,
      cache: {
        read: 0,
        write: 0,
      },
    },
    limit: {
      context: 128000,
      output: 32000,
    },
    status: "active",
    options: {},
    headers: {},
    release_date: "2026-05-07",
  } satisfies Provider["models"][string]
}

const jnoccioProvider = {
  id: "jnoccio",
  name: "Jnoccio",
  source: "config",
  env: [],
  options: {},
  models: {
    "jnoccio-fusion": model("jnoccio", "jnoccio-fusion", "Jnoccio Fusion"),
  },
} satisfies Provider

const opencodeProvider = {
  id: "opencode",
  name: "opencode",
  source: "api",
  env: [],
  options: {},
  models: {
    "opencode-free": model("opencode", "opencode-free", "opencode Free"),
  },
} satisfies Provider

const anthropicProvider = {
  id: "anthropic",
  name: "Anthropic",
  source: "env",
  env: ["ANTHROPIC_API_KEY"],
  options: {},
  models: {
    "claude-test": model("anthropic", "claude-test", "Claude Test"),
  },
} satisfies Provider

function createFetch() {
  const session = [] as URL[]
  const fetch = (async (input: RequestInfo | URL) => {
    const url = new URL(input instanceof Request ? input.url : String(input))
    if (url.pathname === "/session") session.push(url)

    switch (url.pathname) {
      case "/command":
      case "/experimental/workspace":
      case "/experimental/workspace/status":
      case "/formatter":
      case "/lsp":
        return json([])
      case "/agent":
        return json([])
      case "/config":
        return json({ model: "jnoccio/jnoccio-fusion" })
      case "/experimental/resource":
      case "/mcp":
      case "/provider/auth":
      case "/session/status":
        return json({})
      case "/config/providers":
        return json({ providers: [jnoccioProvider], default: { jnoccio: "jnoccio-fusion" } })
      case "/experimental/console":
        return json({ consoleManagedProviders: [], switchableOrgCount: 0 })
      case "/path":
        return json({ home: "", state: "", config: "", worktree, directory })
      case "/project/current":
        return json({ id: "proj_test" })
      case "/provider":
        return json({
          all: [jnoccioProvider, opencodeProvider, anthropicProvider],
          default: {
            jnoccio: "jnoccio-fusion",
            opencode: "opencode-free",
            anthropic: "claude-test",
          },
          connected: ["jnoccio"],
        })
      case "/session":
        return json([])
      case "/vcs":
        return json({ branch: "main" })
    }

    throw new Error(`unexpected request: ${url.pathname}`)
  }) as typeof globalThis.fetch

  return { fetch, session }
}

async function mount() {
  const calls = createFetch()
  let sync!: ReturnType<typeof useSync>
  let kv!: ReturnType<typeof useKV>
  let local!: ReturnType<typeof useLocal>
  let done!: () => void
  const ready = new Promise<void>((resolve) => {
    done = resolve
  })

  const app = await testRender(() => (
    <ArgsProvider>
      <ExitProvider>
        <KVProvider>
          <ToastProvider>
            <TuiConfigProvider config={{}}>
              <SDKProvider url="http://test" directory={directory} fetch={calls.fetch} events={eventSource()}>
                <ProjectProvider>
                  <SyncProvider>
                    <ThemeProvider mode="dark">
                      <LocalProvider>
                        <Probe
                          onReady={(ctx) => {
                            sync = ctx.sync
                            kv = ctx.kv
                            local = ctx.local
                            done()
                          }}
                        />
                      </LocalProvider>
                    </ThemeProvider>
                  </SyncProvider>
                </ProjectProvider>
              </SDKProvider>
            </TuiConfigProvider>
          </ToastProvider>
        </KVProvider>
      </ExitProvider>
    </ArgsProvider>
  ))

  await ready
  await wait(() => sync.status === "complete")
  await wait(() => local.model.ready)
  return { app, kv, local, sync, session: calls.session }
}

function Probe(props: {
  onReady: (ctx: {
    kv: ReturnType<typeof useKV>
    local: ReturnType<typeof useLocal>
    sync: ReturnType<typeof useSync>
  }) => void
}) {
  const kv = useKV()
  const sync = useSync()
  const local = useLocal()

  onMount(() => {
    props.onReady({ kv, local, sync })
  })

  return <box />
}

describe("tui sync", () => {
  test("refresh scopes sessions by default and lists project sessions when disabled", async () => {
    const previous = Global.Path.state
    await using tmp = await tmpdir()
    Global.Path.state = tmp.path
    await Bun.write(`${tmp.path}/kv.json`, "{}")
    const { app, kv, sync, session } = await mount()

    try {
      expect(kv.get("session_directory_filter_enabled", true)).toBe(true)
      expect(session.at(-1)?.searchParams.get("scope")).toBeNull()
      expect(session.at(-1)?.searchParams.get("path")).toBe("packages/opencode")

      kv.set("session_directory_filter_enabled", false)
      await sync.session.refresh()

      expect(session.at(-1)?.searchParams.get("scope")).toBe("project")
      expect(session.at(-1)?.searchParams.get("path")).toBeNull()
    } finally {
      app.renderer.destroy()
      Global.Path.state = previous
    }
  })

  test("bootstrap loads providers before complete and config model is selected", async () => {
    const previous = Global.Path.state
    await using tmp = await tmpdir()
    Global.Path.state = tmp.path
    await Bun.write(`${tmp.path}/kv.json`, "{}")
    await Bun.write(
      `${tmp.path}/model.json`,
      JSON.stringify({
        recent: [{ providerID: "opencode", modelID: "opencode-free" }],
        favorite: [],
        variant: {},
      }),
    )
    const { app, local, sync } = await mount()

    try {
      expect(sync.status).toBe("complete")
      expect(sync.data.provider.length).toBeGreaterThan(0)
      expect(sync.data.provider_next.all.length).toBeGreaterThan(1)
      expect(sync.data.provider_next.all.some((provider) => provider.id === "anthropic")).toBe(true)
      expect(sync.data.provider_default.jnoccio).toBe("jnoccio-fusion")
      expect(sync.data.config.model).toBe("jnoccio/jnoccio-fusion")
      expect(local.model.current()).toEqual({ providerID: "jnoccio", modelID: "jnoccio-fusion" })
      expect(local.model.parsed()).toMatchObject({
        provider: "Jnoccio",
        model: "Jnoccio Fusion",
      })
    } finally {
      app.renderer.destroy()
      Global.Path.state = previous
    }
  })
})
