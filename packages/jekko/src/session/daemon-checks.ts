import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process"
import { Effect, Layer, Context, Schema } from "effect"
import * as Stream from "effect/Stream"
import { CrossSpawnSpawner } from "@jekko-ai/core/cross-spawn-spawner"
import { Config } from "@/config/config"
import { Shell } from "@/shell/shell"
import { Git } from "@/git"

export const ShellCheckResult = Schema.Struct({
  exitCode: Schema.Number,
  stdout: Schema.String,
  stderr: Schema.String,
  truncated: Schema.Boolean,
  matched: Schema.Boolean,
  error: Schema.optional(Schema.String),
})

export type ShellCheckResult = Schema.Schema.Type<typeof ShellCheckResult>

export interface Interface {
  readonly runShellCheck: (input: {
    cwd: string
    command: string
    timeout?: string
    assert?: {
      exit_code?: number
      stdout_contains?: string[]
      stdout_regex?: string[]
      json?: Record<string, unknown>
    }
  }) => Effect.Effect<ShellCheckResult, any, any>
  readonly gitClean: (input: { cwd: string; allowUntracked?: boolean }) => Effect.Effect<{ clean: boolean; dirty: string[] }, any, any>
  readonly evaluateJsonPath: (input: { value: unknown; path: string }) => Effect.Effect<unknown, any, any>
}

export class Service extends Context.Service<Service, Interface>()("@jekko/DaemonChecks") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const config = yield* Config.Service
    const spawner = yield* ChildProcessSpawner.ChildProcessSpawner
    const git = yield* Git.Service

    const runShellCheck = Effect.fn("DaemonChecks.runShellCheck")(function* (input: {
      cwd: string
      command: string
      timeout?: string
      assert?: {
        exit_code?: number
        stdout_contains?: string[]
        stdout_regex?: string[]
        json?: Record<string, unknown>
      }
    }) {
      const shell = Shell.preferred((yield* config.get()).shell)
      const args = Shell.args(shell, input.command, input.cwd)
      const proc = ChildProcess.make(shell, args, {
        cwd: input.cwd,
        extendEnv: true,
        env: { TERM: "dumb" },
        stdin: "ignore",
        stdout: "pipe",
        stderr: "pipe",
      })
      const handle = yield* spawner.spawn(proc)
      const collect = (stream: typeof handle.stdout) =>
        Stream.runFold(
          stream,
          () => ({ chunks: [] as Uint8Array[], bytes: 0, truncated: false }),
          (acc, chunk) => {
            if (acc.bytes < 64_000) {
              const remaining = 64_000 - acc.bytes
              acc.chunks.push(remaining >= chunk.length ? chunk : chunk.slice(0, remaining))
            }
            acc.bytes += chunk.length
            acc.truncated = acc.truncated || acc.bytes > 64_000
            return acc
          },
        ).pipe(Effect.map((x) => ({ text: Buffer.concat(x.chunks).toString("utf8"), truncated: x.truncated })))
      const [stdout, stderr] = yield* Effect.all([collect(handle.stdout), collect(handle.stderr)], { concurrency: 2 })
      const exit = yield* Effect.raceAll([
        handle.exitCode.pipe(Effect.map((code) => ({ kind: "exit" as const, code }))),
        Effect.sleep((input.timeout ?? "30 seconds") as Parameters<typeof Effect.sleep>[0]).pipe(
          Effect.map(() => ({ kind: "timeout" as const, code: 124 })),
        ),
      ])
      const jsonPath = input.assert?.json ? checkJsonAssertions(stdout.text, input.assert.json) : true
      const matched =
        (input.assert?.exit_code === undefined || input.assert.exit_code === exit.code) &&
        (input.assert?.stdout_contains?.every((needle) => stdout.text.includes(needle)) ?? true) &&
        (input.assert?.stdout_regex?.every((pattern) => new RegExp(pattern, "m").test(stdout.text)) ?? true) &&
        jsonPath
      return {
        exitCode: exit.code,
        stdout: stdout.text,
        stderr: stderr.text,
        truncated: stdout.truncated || stderr.truncated,
        matched,
        error: matched ? undefined : "shell assertion failed",
      }
    })

    const gitClean = Effect.fn("DaemonChecks.gitClean")(function* (input: { cwd: string; allowUntracked?: boolean }) {
      const status = yield* git.status(input.cwd)
      const dirty = status.filter((item) => {
        if (input.allowUntracked && item.code === "??") return false
        return true
      })
      return { clean: dirty.length === 0, dirty: dirty.map((item) => item.file) }
    })

    const evaluateJsonPath = Effect.fn("DaemonChecks.evaluateJsonPath")(function* (input: { value: unknown; path: string }) {
      return walkJsonPath(input.value, input.path)
    })

    return Service.of({ runShellCheck, gitClean, evaluateJsonPath })
  }),
)

export const defaultLayer = layer.pipe(
  Layer.provide(Config.defaultLayer),
  Layer.provide(Git.defaultLayer),
  Layer.provide(CrossSpawnSpawner.defaultLayer),
)

export function walkJsonPath(value: unknown, pointer: string): unknown {
  if (!pointer.startsWith("$")) throw new Error(`JSON path must start with $: ${pointer}`)
  const tokens: (string | number)[] = []
  for (const segment of pointer.slice(1).split(".")) {
    if (!segment) continue
    const re = /([^[\]]+)|\[(\d+)\]/g
    let match: RegExpExecArray | null
    while ((match = re.exec(segment))) {
      if (match[1]) tokens.push(match[1])
      if (match[2]) tokens.push(Number(match[2]))
    }
  }
  let current: unknown = value
  for (const token of tokens) {
    if (current == null) return undefined
    if (typeof token === "number") {
      if (!Array.isArray(current)) return undefined
      current = current[token]
    } else {
      if (typeof current !== "object" || Array.isArray(current)) return undefined
      current = (current as Record<string, unknown>)[token]
    }
  }
  return current
}

function checkJsonAssertions(stdout: string, expected: Record<string, unknown>) {
  try {
    const parsed = JSON.parse(stdout) as unknown
    for (const [path, value] of Object.entries(expected)) {
      const found = walkJsonPath(parsed, path)
      if (!Object.is(found, value)) return false
    }
    return true
  } catch {
    return false
  }
}

export * as DaemonChecks from "./daemon-checks"
