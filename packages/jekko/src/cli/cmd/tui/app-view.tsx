import { useRoute } from "@tui/context/route"
import { useTerminalDimensions, useRenderer, TimeToFirstDraw } from "@opentui/solid"
import {
  Switch,
  Match,
  createEffect,
  createMemo,
  createSignal,
  onMount,
  batch,
  Show,
  on,
} from "solid-js"
import { Flag } from "@jekko-ai/core/flag/flag"
import { useDialog } from "@tui/ui/dialog"
import { DialogProvider as DialogProviderList } from "@tui/component/dialog-provider"
import { PluginRouteMissing } from "@tui/component/plugin-route-missing"
import { useEvent } from "@tui/context/event"
import { useSDK } from "@tui/context/sdk"
import { StartupLoading } from "@tui/component/startup-loading"
import { useSync } from "@tui/context/sync"
import { useLocal } from "@tui/context/local"
import { useCommandDialog } from "@tui/component/dialog-command"
import { KeybindProvider, useKeybind } from "@tui/context/keybind"
import { ThemeProvider, useTheme } from "@tui/context/theme"
import { Home } from "@tui/routes/home"
import { Session } from "@tui/routes/session"
import { useToast } from "./ui/toast"
import { ExitProvider, useExit } from "./context/exit"
import { KVProvider, useKV } from "./context/kv"
import { Provider } from "@/provider/provider"
import { ArgsProvider, useArgs, type Args } from "./context/args"
import { useTuiConfig } from "./context/tui-config"
import { createTuiApi } from "@/cli/cmd/tui/plugin/api"
import { TuiPluginRuntime } from "@/cli/cmd/tui/plugin/runtime"
import type { RouteMap } from "@/cli/cmd/tui/plugin/api"
import { setupAppBindings } from "./app-bindings"
import { bootJnoccioFusion } from "./context/jnoccio-boot"

export function App(props: { onSnapshot?: () => Promise<string[]> }) {
  const tuiConfig = useTuiConfig()
  const route = useRoute()
  const dimensions = useTerminalDimensions()
  const renderer = useRenderer()
  const dialog = useDialog()
  const local = useLocal()
  const kv = useKV()
  const command = useCommandDialog()
  const keybind = useKeybind()
  const event = useEvent()
  const sdk = useSDK()
  const toast = useToast()
  const themeState = useTheme()
  const { theme, mode, setMode, locked, lock, unlock } = themeState
  const sync = useSync()
  const exit = useExit()
  const routes: RouteMap = new Map()
  const [routeRev, setRouteRev] = createSignal(0)
  const routeView = (name: string) => {
    routeRev()
    return routes.get(name)?.at(-1)?.render
  }

  const api = createTuiApi({
    command,
    tuiConfig,
    dialog,
    keybind,
    kv,
    route,
    routes,
    bump: () => setRouteRev((x) => x + 1),
    event,
    sdk,
    sync,
    theme: themeState,
    toast,
  })
  const [ready, setReady] = createSignal(process.env.JEKKO_FAST_BOOT === "1")
  TuiPluginRuntime.init({
    api,
    config: tuiConfig,
  })
    .catch((error) => {
      console.error("Failed to load TUI plugins", error)
    })
    .finally(() => {
      setReady(true)
    })

  bootJnoccioFusion()

  const [terminalTitleEnabled, setTerminalTitleEnabled] = createSignal(kv.get("terminal_title_enabled", true))
  const [pasteSummaryEnabled, setPasteSummaryEnabled] = createSignal(
    kv.get("paste_summary_enabled", !sync.data.config.experimental?.disable_paste_summary),
  )

  setupAppBindings({
    tuiConfig,
    route,
    dialog,
    local,
    kv,
    command,
    event,
    sdk,
    toast,
    renderer,
    sync,
    exit,
    mode,
    setMode,
    locked,
    lock,
    unlock,
    terminalTitleEnabled,
    setTerminalTitleEnabled,
    pasteSummaryEnabled,
    setPasteSummaryEnabled,
    onSnapshot: props.onSnapshot,
  })

  const args = useArgs()
  onMount(() => {
    batch(() => {
      if (args.agent) local.agent.set(args.agent)
      if (args.model) {
        const { providerID, modelID } = Provider.parseModel(args.model)
        if (!providerID || !modelID)
          return toast.show({
            variant: "warning",
            message: `Invalid model format: ${args.model}`,
            duration: 3000,
          })
        local.model.set({ providerID, modelID }, { recent: true })
      }
      if (args.sessionID && !args.fork) {
        route.navigate({
          type: "session",
          sessionID: args.sessionID,
        })
      }
    })
  })

  let continued = false
  createEffect(() => {
    if (continued || sync.status === "loading" || !args.continue) return
    const match = sync.data.session
      .toSorted((a, b) => b.time.updated - a.time.updated)
      .find((x) => x.parentID === undefined)?.id
    if (match) {
      continued = true
      if (args.fork) {
        void sdk.client.session.fork({ sessionID: match }).then((result) => {
          if (result.data?.id) {
            route.navigate({ type: "session", sessionID: result.data.id })
          } else {
            toast.show({ message: "Failed to fork session", variant: "error" })
          }
        })
      } else {
        route.navigate({ type: "session", sessionID: match })
      }
    }
  })

  let forked = false
  createEffect(() => {
    if (forked || sync.status !== "complete" || !args.sessionID || !args.fork) return
    forked = true
    void sdk.client.session.fork({ sessionID: args.sessionID }).then((result) => {
      if (result.data?.id) {
        route.navigate({ type: "session", sessionID: result.data.id })
      } else {
        toast.show({ message: "Failed to fork session", variant: "error" })
      }
    })
  })

  createEffect(
    on(
      () => sync.status === "complete" && sync.data.provider.length === 0,
      (isEmpty, wasEmpty) => {
        if (!isEmpty || wasEmpty) return
        dialog.replace(() => <DialogProviderList />)
      },
    ),
  )

  const plugin = createMemo(() => {
    if (!ready()) return
    if (route.data.type !== "plugin") return
    const render = routeView(route.data.id)
    if (!render) return <PluginRouteMissing id={route.data.id} onHome={() => route.navigate({ type: "home" })} />
    return render({ params: route.data.data })
  })

  return (
    <box width={dimensions().width} height={dimensions().height} backgroundColor={theme.background}>
      <Show when={Flag.JEKKO_SHOW_TTFD}>
        <TimeToFirstDraw />
      </Show>
      <Show when={ready()}>
        <Switch>
          <Match when={route.data.type === "home"}>
            <Home />
          </Match>
          <Match when={route.data.type === "session"}>
            <Session />
          </Match>
        </Switch>
      </Show>
      {plugin()}
      <StartupLoading ready={ready} />
    </box>
  )
}
