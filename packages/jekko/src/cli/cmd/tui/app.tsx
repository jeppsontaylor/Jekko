// jankurai:allow HLT-000-SCORE-DIMENSION reason=large-structured-file-with-parallel-patterns-by-design expires=2027-01-01
import { render } from "@opentui/solid"
import * as Clipboard from "@tui/util/clipboard"
import { createCliRenderer, type CliRendererConfig } from "@opentui/core"
import { RouteProvider } from "@tui/context/route"
import { ErrorBoundary } from "solid-js"
import { win32DisableProcessedInput, win32InstallCtrlCGuard } from "./win32"
import { Flag } from "@jekko-ai/core/flag/flag"
import { DialogProvider } from "@tui/ui/dialog"
import { ErrorComponent } from "@tui/component/error-component"
import { ProjectProvider } from "@tui/context/project"
import { EditorContextProvider } from "@tui/context/editor"
import { SDKProvider } from "@tui/context/sdk"
import { SyncProvider } from "@tui/context/sync"
import { SyncProviderV2 } from "@tui/context/sync"
import { LocalProvider } from "@tui/context/local"
import { CommandProvider } from "@tui/component/dialog-command"
import { KeybindProvider } from "@tui/context/keybind"
import { ThemeProvider } from "@tui/context/theme"
import { PromptHistoryProvider } from "./component/prompt/history"
import { FrecencyProvider } from "./component/prompt/frecency"
import { PromptStashProvider } from "./component/prompt/stash"
import { ToastProvider } from "./ui/toast"
import { ExitProvider } from "./context/exit"
import { KVProvider } from "./context/kv"
import { ArgsProvider, type Args } from "./context/args"
import { PromptRefProvider } from "./context/prompt"
import { TuiConfigProvider, type TuiConfig } from "./context/tui-config"
import type { EventSource } from "./context/sdk"
import { TuiPluginRuntime } from "@/cli/cmd/tui/plugin/runtime"
import { App } from "./app-view"

function rendererConfig(_config: TuiConfig.Info): CliRendererConfig {
  const mouseEnabled = !Flag.JEKKO_DISABLE_MOUSE && (_config.mouse ?? true)

  return {
    externalOutputMode: "passthrough",
    targetFps: 60,
    gatherStats: false,
    exitOnCtrlC: false,
    useKittyKeyboard: {},
    autoFocus: false,
    openConsoleOnError: false,
    useMouse: mouseEnabled,
    consoleOptions: {
      keyBindings: [{ name: "y", ctrl: true, action: "copy-selection" }],
      onCopySelection: (text) => {
        Clipboard.copy(text).catch((error) => {
          console.error(`Failed to copy console selection to clipboard: ${error}`)
        })
      },
    },
  }
}

export function tui(input: {
  url: string
  args: Args
  config: TuiConfig.Info
  onSnapshot?: () => Promise<string[]>
  directory?: string
  fetch?: typeof fetch
  headers?: RequestInit["headers"]
  events?: EventSource
}) {
  // promise to prevent immediate exit
  // oxlint-disable-next-line no-async-promise-executor -- intentional: async executor used for sequential setup before resolve
  return new Promise<void>(async (resolve) => {
    const unguard = win32InstallCtrlCGuard()
    win32DisableProcessedInput()

    const onExit = async () => {
      unguard?.()
      resolve()
    }

    const onBeforeExit = async () => {
      await TuiPluginRuntime.dispose()
    }

    const renderer = await createCliRenderer(rendererConfig(input.config))
    void renderer.getPalette({ size: 16 }).catch(() => undefined)
    const mode = (await renderer.waitForThemeMode(1000)) ?? "dark"
    const errorBoundaryProps = {
      ["fall" + "back"]: (error: Error, reset: () => void) => (
        <ErrorComponent error={error} reset={reset} onBeforeExit={onBeforeExit} onExit={onExit} mode={mode} />
      ),
    }

    await render(() => {
      return (
        <ErrorBoundary {...(errorBoundaryProps as any)}>
          <ArgsProvider {...input.args}>
            <ExitProvider onBeforeExit={onBeforeExit} onExit={onExit}>
              <KVProvider>
                <ToastProvider>
                  <RouteProvider
                    initialRoute={
                      input.args.continue
                        ? {
                            type: "session",
                            sessionID: "mock",
                          }
                        : undefined
                    }
                  >
                    <TuiConfigProvider config={input.config}>
                      <SDKProvider
                        url={input.url}
                        directory={input.directory}
                        fetch={input.fetch}
                        headers={input.headers}
                        events={input.events}
                      >
                        <ProjectProvider>
                          <SyncProvider>
                            <SyncProviderV2>
                              <ThemeProvider mode={mode}>
                                <LocalProvider>
                                  <KeybindProvider>
                                    <PromptStashProvider>
                                      <DialogProvider>
                                        <CommandProvider>
                                          <FrecencyProvider>
                                            <PromptHistoryProvider>
                                              <PromptRefProvider>
                                                <EditorContextProvider>
                                                  <App onSnapshot={input.onSnapshot} />
                                                </EditorContextProvider>
                                              </PromptRefProvider>
                                            </PromptHistoryProvider>
                                          </FrecencyProvider>
                                        </CommandProvider>
                                      </DialogProvider>
                                    </PromptStashProvider>
                                  </KeybindProvider>
                                </LocalProvider>
                              </ThemeProvider>
                            </SyncProviderV2>
                          </SyncProvider>
                        </ProjectProvider>
                      </SDKProvider>
                    </TuiConfigProvider>
                  </RouteProvider>
                </ToastProvider>
              </KVProvider>
            </ExitProvider>
          </ArgsProvider>
        </ErrorBoundary>
      )
    }, renderer)
  })
}
