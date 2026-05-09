import fs from "fs"
import fsp from "fs/promises"
import os from "os"
import path from "path"
import { Schema } from "effect"
import { optionalOmitUndefined, withStatics } from "@/util/schema"
import { zod } from "@/util/effect-zod"

export const JNOCCIO_PROVIDER_ID = "jnoccio"
export const JNOCCIO_MODEL_ID = "jnoccio-fusion"
export const JNOCCIO_DEFAULT_BASE_URL = "http://127.0.0.1:4317/v1"
export const JNOCCIO_DEFAULT_API_KEY = "jnoccio-local"

export const JnoccioUnlockInput = Schema.Struct({
  keyPath: Schema.String,
})
  .annotate({ identifier: "JnoccioUnlockInput" })
  .pipe(withStatics((s) => ({ zod: zod(s) })))
export type JnoccioUnlockInput = Schema.Schema.Type<typeof JnoccioUnlockInput>

export const JnoccioUnlockResult = Schema.Struct({
  status: Schema.Literals(["unlocked", "error"]),
  message: Schema.String,
  envPath: optionalOmitUndefined(Schema.String),
  envCreated: Schema.Boolean,
})
  .annotate({ identifier: "JnoccioUnlockResult" })
  .pipe(withStatics((s) => ({ zod: zod(s) })))
export type JnoccioUnlockResult = Schema.Schema.Type<typeof JnoccioUnlockResult>

export type CommandResult = {
  exitCode: number
  stdout?: string
  stderr?: string
}

export type CommandRunner = (command: string, args: string[], options: { cwd: string }) => Promise<CommandResult>

export type UnlockOptions = {
  repoRoot?: string
  runner?: CommandRunner
}

export function repoRootFromSource() {
  return path.resolve(import.meta.dir, "../../../..")
}

export function expandHome(input: string) {
  const value = input.trim()
  if (value === "~") return os.homedir()
  if (value.startsWith("~/")) return path.join(os.homedir(), value.slice(2))
  return value
}

export function jnoccioFusionRoot(repoRoot = repoRootFromSource()) {
  return path.join(repoRoot, "jnoccio-fusion")
}

export function jnoccioEnvPath(repoRoot = repoRootFromSource()) {
  return path.join(jnoccioFusionRoot(repoRoot), ".env.jnoccio")
}

export function jnoccioEnvExamplePath(repoRoot = repoRootFromSource()) {
  return path.join(jnoccioFusionRoot(repoRoot), ".env.jnoccio.example")
}

function hasPlaintextSignals(repoRoot: string) {
  try {
    const cargo = fs.readFileSync(path.join(jnoccioFusionRoot(repoRoot), "Cargo.toml"), "utf8")
    if (!cargo.includes("[package]") || !cargo.includes('name = "jnoccio-fusion"')) return false

    const config = JSON.parse(fs.readFileSync(path.join(jnoccioFusionRoot(repoRoot), "config/server.json"), "utf8"))
    return config?.provider === JNOCCIO_PROVIDER_ID && config?.model === `${JNOCCIO_PROVIDER_ID}/${JNOCCIO_MODEL_ID}`
  } catch {
    return false
  }
}

export function isJnoccioFusionUnlocked(repoRoot = repoRootFromSource()) {
  return hasPlaintextSignals(repoRoot)
}

export function isJnoccioFusionConfigured(repoRoot = repoRootFromSource()) {
  return isJnoccioFusionUnlocked(repoRoot) && fs.existsSync(jnoccioEnvPath(repoRoot))
}

async function defaultRunner(command: string, args: string[], options: { cwd: string }): Promise<CommandResult> {
  try {
    const proc = Bun.spawn([command, ...args], {
      cwd: options.cwd,
      stdout: "pipe",
      stderr: "pipe",
    })
    const [stdout, stderr, exitCode] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
      proc.exited,
    ])
    return { exitCode, stdout, stderr }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return { exitCode: 127, stderr: "git-crypt not found" }
    }
    throw error
  }
}

async function ensureEnvFile(repoRoot: string) {
  const envPath = jnoccioEnvPath(repoRoot)
  try {
    await fsp.access(envPath, fs.constants.F_OK)
    return { envPath, envCreated: false }
  } catch {}

  await fsp.copyFile(jnoccioEnvExamplePath(repoRoot), envPath, fs.constants.COPYFILE_EXCL)
  return { envPath, envCreated: true }
}

async function unlockedResult(repoRoot: string): Promise<JnoccioUnlockResult> {
  try {
    const env = await ensureEnvFile(repoRoot)
    return {
      status: "unlocked",
      message: env.envCreated
        ? "Jnoccio Fusion is unlocked. Created .env.jnoccio with placeholder provider keys."
        : "Jnoccio Fusion is unlocked. Existing .env.jnoccio was left unchanged.",
      envPath: env.envPath,
      envCreated: env.envCreated,
    }
  } catch {
    return {
      status: "error",
      message: "Jnoccio Fusion unlocked, but .env.jnoccio could not be created from the example file.",
      envCreated: false,
    }
  }
}

export async function unlockJnoccioFusion(
  input: JnoccioUnlockInput,
  options: UnlockOptions = {},
): Promise<JnoccioUnlockResult> {
  const repoRoot = options.repoRoot ?? repoRootFromSource()
  const keyPath = expandHome(input.keyPath)

  if (!keyPath) {
    return {
      status: "error",
      message: "Choose a local git-crypt key file to unlock Jnoccio Fusion.",
      envCreated: false,
    }
  }

  try {
    const stat = await fsp.stat(keyPath)
    if (!stat.isFile()) {
      return {
        status: "error",
        message: "That path is not a readable key file.",
        envCreated: false,
      }
    }
    await fsp.access(keyPath, fs.constants.R_OK)
  } catch {
    return {
      status: "error",
      message: "That key file could not be read. Check the path and permissions.",
      envCreated: false,
    }
  }

  const runner = options.runner ?? defaultRunner
  let result: CommandResult
  try {
    result = await runner("git-crypt", ["unlock", keyPath], { cwd: repoRoot })
  } catch {
    if (isJnoccioFusionUnlocked(repoRoot)) return unlockedResult(repoRoot)
    return {
      status: "error",
      message: "git-crypt is not installed or could not be started.",
      envCreated: false,
    }
  }

  if (result.exitCode !== 0 && isJnoccioFusionUnlocked(repoRoot)) {
    return unlockedResult(repoRoot)
  }

  if (result.exitCode === 127) {
    return {
      status: "error",
      message: "git-crypt is not installed. Install git-crypt, then try the key file again.",
      envCreated: false,
    }
  }

  if (result.exitCode !== 0) {
    return {
      status: "error",
      message: "The key file did not unlock Jnoccio Fusion. Confirm you selected the project git-crypt key.",
      envCreated: false,
    }
  }

  if (!isJnoccioFusionUnlocked(repoRoot)) {
    return {
      status: "error",
      message: "git-crypt reported success, but Jnoccio Fusion files are still locked.",
      envCreated: false,
    }
  }

  return unlockedResult(repoRoot)
}
