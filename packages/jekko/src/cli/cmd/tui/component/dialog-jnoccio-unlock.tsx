import { createSignal, Show } from "solid-js"
import { useDialog } from "@tui/ui/dialog"
import { DialogPrompt } from "@tui/ui/dialog-prompt"
import { useSDK } from "@tui/context/sdk"
import { useSync } from "@tui/context/sync"
import { useLocal } from "@tui/context/local"
import { useTheme } from "@tui/context/theme"
import { useToast } from "@tui/ui/toast"

export function DialogJnoccioUnlock() {
  const dialog = useDialog()
  const sdk = useSDK()
  const sync = useSync()
  const local = useLocal()
  const toast = useToast()
  const { theme } = useTheme()
  const [busy, setBusy] = createSignal(false)
  const [error, setError] = createSignal<string>()
  const [value, setValue] = createSignal("")

  return (
    <DialogPrompt
      title="Unlock Jnoccio Fusion"
      default_value="Path to git-crypt key file"
      value={value()}
      busy={busy()}
      busyText="Testing key locally..."
      description={() => (
        <box gap={1}>
          <text fg={theme.textMuted}>Unlock with your Jnoccio key file.</text>
          <Show when={error()}>
            <text fg={theme.error}>{error()}</text>
          </Show>
        </box>
      )}
      onConfirm={async (keyPath) => {
        const next = keyPath.trim()
        if (!next) {
          setError("Choose a local key file.")
          return
        }
        setValue(next)
        setError(undefined)
        setBusy(true)
        try {
          const result = await sdk.client.provider.unlock({ keyPath: next })
          const data = result.data
          if (result.error || !data) {
            setError("Unlock failed. Try the key file again.")
            return
          }
          if (data.status !== "unlocked") {
            setError(data.message)
            return
          }

          await sdk.client.instance.dispose()
          await sync.bootstrap()
          local.model.set({ providerID: "jnoccio", modelID: "jnoccio-fusion" }, { recent: true })
          toast.show({
            variant: "info",
            message: data.envCreated
              ? "Jnoccio Fusion unlocked. .env.jnoccio was created."
              : "Jnoccio Fusion unlocked. Existing .env.jnoccio was left unchanged.",
          })
          dialog.clear()
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unlock failed. Try the key file again.")
        } finally {
          setBusy(false)
        }
      }}
    />
  )
}
