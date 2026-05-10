import { cmd } from "../cmd"
import { UI } from "@/cli/ui"
import { tui } from "./app"
import { win32DisableProcessedInput, win32InstallCtrlCGuard } from "./win32"
import { TuiConfig } from "@/cli/cmd/tui/config/tui"
import { errorMessage } from "@/util/error"
import { validateSession } from "./validate-session"
import { ServerAuth } from "@/server/auth"

type AttachDirectoryResolution =
  | { kind: "local"; directory: string }
  | { kind: "remote"; directory: string }

export function resolveAttachDirectory(args: { dir?: string }) {
  if (!args.dir) return { kind: "local", directory: process.cwd() } as const
  try {
    process.chdir(args.dir)
    return { kind: "local", directory: process.cwd() } as const
  } catch {
    return { kind: "remote", directory: args.dir } as const
  }
}

export const AttachCommand = cmd({
  command: "attach <url>",
  describe: "attach to a running jekko server",
  builder: (yargs) =>
    yargs
      .positional("url", {
        type: "string",
        describe: "http://localhost:4096",
        demandOption: true,
      })
      .option("dir", {
        type: "string",
        description: "directory to run in",
      })
      .option("continue", {
        alias: ["c"],
        describe: "continue the last session",
        type: "boolean",
      })
      .option("session", {
        alias: ["s"],
        type: "string",
        describe: "session id to continue",
      })
      .option("fork", {
        type: "boolean",
        describe: "fork the session when continuing (use with --continue or --session)",
      })
      .option("password", {
        alias: ["p"],
        type: "string",
        describe: "basic auth password (defaults to JEKKO_SERVER_PASSWORD)",
      })
      .option("username", {
        alias: ["u"],
        type: "string",
        describe: "basic auth username (defaults to JEKKO_SERVER_USERNAME or 'jekko')",
      }),
  handler: async (args) => {
    const unguard = win32InstallCtrlCGuard()
    try {
      win32DisableProcessedInput()

      if (args.fork && !args.continue && !args.session) {
        UI.error("--fork requires --continue or --session")
        process.exitCode = 1
        return
      }

      const directory = resolveAttachDirectory(args).directory
      const headers = ServerAuth.headers({ password: args.password, username: args.username })
      const config = await TuiConfig.get()

      try {
        await validateSession({
          url: args.url,
          sessionID: args.session,
          directory,
          headers,
        })
      } catch (error) {
        UI.error(errorMessage(error))
        process.exitCode = 1
        return
      }

      await tui({
        url: args.url,
        config,
        args: {
          continue: args.continue,
          sessionID: args.session,
          fork: args.fork,
        },
        directory,
        headers,
      })
    } finally {
      unguard?.()
    }
  },
})
