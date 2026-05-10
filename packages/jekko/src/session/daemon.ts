// jankurai:allow HLT-001-DEAD-MARKER reason=functional-optional-returns-by-design expires=2027-01-01
// jankurai:allow HLT-000-SCORE-DIMENSION reason=large-structured-file-with-parallel-patterns-by-design expires=2027-01-01
import { Effect, Layer, Context, Scope, Cause, Fiber } from "effect"
import { parseZyal } from "@/agent-script/parser"
import { buildZyalPreview, type ZyalParsed, type ZyalPreview, type ZyalScript, type ZyalSignal } from "@/agent-script/schema"
import { Bus } from "@/bus"
import { InstanceState } from "@/effect/instance-state"
import { Worktree } from "@/worktree"
import { Session } from "./session"
import { SessionPrompt } from "./prompt"
import { DaemonStore } from "./daemon-store"
import { Database } from "@/storage/db"
import { DaemonIterationTable, DaemonTaskTable, DaemonWorkerTable } from "./daemon.sql"
import { eq, sum, count } from "drizzle-orm"
import { DaemonChecks } from "./daemon-checks"
import { DaemonCheckpoint } from "./daemon-checkpoint"
import { DaemonContext } from "./daemon-context"
import { tick as incubatorTick } from "./daemon-incubator"
import { Event as DaemonEvent, type DaemonPhase, type DaemonRunStatus } from "./daemon-event"
import { SessionID } from "./schema"
import { MessageV2 } from "./message"
import { MCP } from "@/mcp"
import { evaluateOnHandlers, getOnHandlers, incrementSignalCounter, type SignalCounters } from "./daemon-on-handler"
import { evaluateInputGuardrails, evaluateOutputPatternGuardrails } from "./daemon-guardrails"
import { getHookSteps, resolveHookFailureAction } from "./daemon-hooks"
import { evaluateAllConstraints, captureBaselines, type ConstraintBaselines } from "./daemon-constraints"
import { resolveRetryPolicy, computeRetryDelay, canRetry } from "./daemon-retry"
import { applyDaemonPermissions } from "./daemon-permissions"
import { daemonSignalCountsAsError, effectiveDaemonSignal, suppressDaemonSignal } from "./daemon-signals"
import { resolveDaemonPolicy, resolveDaemonAutomaticAction, shouldRestartDaemonFiber } from "./daemon-lifetime"

export type StartPayload = {
  readonly sessionID: SessionID
  readonly prompt: Omit<SessionPrompt.PromptInput, "sessionID">
}

export type PreviewResult = ZyalParsed

export interface Interface {
  readonly preview: (input: { text: string }) => Effect.Effect<PreviewResult, any, any>
  readonly start: (input: StartPayload) => Effect.Effect<DaemonStore.RunInfo, any, any>
  readonly list: () => Effect.Effect<DaemonStore.RunInfo[], any, any>
  readonly get: (runID: string) => Effect.Effect<DaemonStore.RunInfo | undefined, any, any>
  readonly events: (runID: string) => Effect.Effect<DaemonStore.EventInfo[], any, any>
  readonly tasks: (runID: string) => Effect.Effect<DaemonStore.TaskInfo[], any, any>
  readonly task: (input: { runID: string; taskID: string }) => Effect.Effect<DaemonStore.TaskInfo | undefined, any, any>
  readonly taskPasses: (input: { runID: string; taskID: string }) => Effect.Effect<DaemonStore.TaskPassInfo[], any, any>
  readonly taskMemory: (input: { runID: string; taskID: string }) => Effect.Effect<DaemonStore.TaskMemoryInfo[], any, any>
  readonly incubateTask: (input: { runID: string; taskID: string }) => Effect.Effect<DaemonStore.TaskInfo | undefined, any, any>
  readonly promoteTask: (input: { runID: string; taskID: string }) => Effect.Effect<DaemonStore.TaskInfo | undefined, any, any>
  readonly blockTask: (input: { runID: string; taskID: string; reason?: string }) => Effect.Effect<DaemonStore.TaskInfo | undefined, any, any>
  readonly archiveTask: (input: { runID: string; taskID: string; reason?: string }) => Effect.Effect<DaemonStore.TaskInfo | undefined, any, any>
  readonly incubator: (runID: string) => Effect.Effect<Record<string, unknown> | undefined, any, any>
  readonly pause: (runID: string) => Effect.Effect<DaemonStore.RunInfo | undefined, any, any>
  readonly resume: (runID: string) => Effect.Effect<DaemonStore.RunInfo | undefined, any, any>
  readonly abort: (runID: string) => Effect.Effect<DaemonStore.RunInfo | undefined, any, any>
  readonly compact: (runID: string) => Effect.Effect<DaemonStore.RunInfo | undefined, any, any>
  readonly rotateSession: (runID: string) => Effect.Effect<DaemonStore.RunInfo | undefined, any, any>
}

export class Service extends Context.Service<Service, Interface>()("@jekko/Daemon") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const store = yield* DaemonStore.Service
    const bus = yield* Bus.Service
    const scope = yield* Scope.Scope
    const fibers = new Map<string, any>()

    const transitionRun = Effect.fn("Daemon.transitionRun")(function* (
      runID: string,
      patch: Partial<{
        status: DaemonRunStatus
        phase: DaemonPhase
        iteration: number
        epoch: number
        last_error: string | null
        last_exit_result_json: Record<string, unknown> | null
        stopped_at: number | null
        active_session_id: SessionID
      }>,
    ) {
      const run = yield* store.updateRun(runID, patch)
      if (run && (patch.status !== undefined || patch.phase !== undefined)) {
        yield* bus.publish(DaemonEvent.RunStatus, {
          runID: run.id,
          status: run.status as DaemonRunStatus,
          phase: run.phase as DaemonPhase,
        })
      }
      return run
    })

    const preview = Effect.fn("Daemon.preview")(function* (input: { text: string }) {
      return yield* parseZyal(input.text, { requireArm: false })
    })

    function parsedFromRun(run: DaemonStore.RunInfo): ZyalParsed {
      const spec = run.spec_json as ZyalScript
      return {
        spec,
        arm: undefined,
        specHash: run.spec_hash,
        preview: buildZyalPreview({ spec }),
      }
    }

    const launchDaemonFiber = Effect.fn("Daemon.launchFiber")(function* (input: {
      runID: string
      parsed: ZyalParsed
      sessions: Session.Interface
      prompt: SessionPrompt.Interface
      checkpoint: DaemonCheckpoint.Interface
      checks: DaemonChecks.Interface
      mcp: MCP.Interface
      worktree: Worktree.Interface
    }) {
      const existing = fibers.get(input.runID)
      if (existing) {
        yield* store.appendEvent({
          runID: input.runID,
          iteration: 0,
          eventType: "run.supervisor_already_running",
          payload: {},
        })
        return existing
      }

      let fiber: any
      fiber = yield* superviseDaemonRun({
        runID: input.runID,
        parsed: input.parsed,
        sessions: input.sessions,
        store,
        prompt: input.prompt,
        checkpoint: input.checkpoint,
        checks: input.checks,
        bus,
        mcp: input.mcp,
        worktree: input.worktree,
        transitionRun,
      })().pipe(
        Effect.ensuring(
          Effect.sync(() => {
            if (fibers.get(input.runID) === fiber) fibers.delete(input.runID)
          }),
        ),
        Effect.forkIn(scope, { startImmediately: true }),
      )
      fibers.set(input.runID, fiber)
      return fiber
    })

    const start = Effect.fn("Daemon.start")(function* (input: StartPayload) {
      const text = input.prompt.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("\n")
      const parsed = yield* preview({ text })
      if (!parsed.arm) {
        throw new Error("ZYAL daemon start requires the trailing ZYAL_ARM RUN_FOREVER sentinel")
      }
      const sessions = yield* Session.Service
      const prompt = yield* SessionPrompt.Service
      const checks = yield* DaemonChecks.Service
      const checkpoint = yield* DaemonCheckpoint.Service
      const mcp = yield* MCP.Service
      const worktree = yield* Worktree.Service
      const run = yield* store.createRun({
        rootSessionID: input.sessionID,
        activeSessionID: input.sessionID,
        spec: parsed.spec,
        specHash: parsed.specHash,
      })

      yield* applyDaemonPermissions({
        sessions,
        store,
        runID: run.id,
        sessionID: input.sessionID,
        spec: parsed.spec,
        iteration: 0,
      })

      yield* transitionRun(run.id, { status: "armed", phase: "evaluating_stop" })
      yield* store.appendEvent({
        runID: run.id,
        iteration: 0,
        eventType: "run.previewed",
        payload: { preview: parsed.preview },
      })

      yield* prompt.prompt({
        ...input.prompt,
        sessionID: input.sessionID,
        noReply: true,
      })

      yield* launchDaemonFiber({ runID: run.id, parsed, sessions, prompt, checkpoint, checks, mcp, worktree })
      return yield* store.getRun(run.id).pipe(Effect.map((value) => value ?? run))
    })

    function tokenNumber(value: unknown): number {
      const next = Number(value)
      return Number.isFinite(next) ? next : 0
    }

    function summarizeTokenUsage(usage: unknown) {
      if (!usage || typeof usage !== "object" || Array.isArray(usage)) {
        return { input: 0, output: 0, cache: 0, total: 0 }
      }
      const record = usage as Record<string, any>
      const cache = record.cache ?? {}
      const input = tokenNumber(record.input ?? record.inputTokens)
      const output = tokenNumber(record.output ?? record.outputTokens)
      const cacheTotal = tokenNumber(record.cache_tokens ?? record.cacheTokens) +
        tokenNumber(cache.read) +
        tokenNumber(cache.write) +
        tokenNumber(record.reasoning ?? record.reasoningTokens)
      const total = tokenNumber(record.total ?? record.totalTokens) || input + output + cacheTotal
      return { input, output, cache: cacheTotal, total }
    }

    function enrichRun(run: DaemonStore.RunInfo): DaemonStore.RunInfo & {
      _stats: {
        iteration_count: number
        input_tokens: number
        output_tokens: number
        cache_tokens: number
        total_tokens: number
        total_cost: number
        cost_usd: number
        active_workers: number
        worker_count: number
        completed_tasks: number
        incubated_tasks: number
      }
    } {
      const row = Database.use((db) =>
        db
          .select({
            iteration_count: count(),
            total_cost: sum(DaemonIterationTable.cost),
          })
          .from(DaemonIterationTable)
          .where(eq(DaemonIterationTable.run_id, run.id))
          .get(),
      )
      const iterations = Database.use((db) =>
        db
          .select({ token_usage_json: DaemonIterationTable.token_usage_json })
          .from(DaemonIterationTable)
          .where(eq(DaemonIterationTable.run_id, run.id))
          .all(),
      )
      const workers = Database.use((db) => db.select().from(DaemonWorkerTable).where(eq(DaemonWorkerTable.run_id, run.id)).all())
      const tasks = Database.use((db) => db.select().from(DaemonTaskTable).where(eq(DaemonTaskTable.run_id, run.id)).all())
      let inputTokens = 0
      let outputTokens = 0
      let cacheTokens = 0
      let totalTokens = 0
      for (const iter of iterations) {
        const usage = summarizeTokenUsage(iter.token_usage_json)
        inputTokens += usage.input
        outputTokens += usage.output
        cacheTokens += usage.cache
        totalTokens += usage.total
      }
      const totalCost = row?.total_cost ? Number(row.total_cost) : 0
      return Object.assign({}, run, {
        _stats: {
          iteration_count: row?.iteration_count ?? 0,
          input_tokens: inputTokens,
          output_tokens: outputTokens,
          cache_tokens: cacheTokens,
          total_tokens: totalTokens,
          total_cost: totalCost,
          cost_usd: totalCost,
          active_workers: workers.filter((worker) => ["active", "running", "leased"].includes(String(worker.status))).length,
          worker_count: workers.length,
          completed_tasks: tasks.filter((task) =>
            ["done", "archived"].includes(String(task.status)) || task.incubator_status === "promoted"
          ).length,
          incubated_tasks: tasks.filter((task) => task.lane === "incubator" || task.status === "incubating").length,
        },
      })
    }

    const list = Effect.fn("Daemon.list")(function* () {
      const runs = yield* store.listRuns()
      return runs.map(enrichRun)
    })

    const get = Effect.fn("Daemon.get")(function* (runID: string) {
      const run = yield* store.getRun(runID)
      // jankurai:allow HLT-001-DEAD-MARKER reason=effect-fn-early-exit-when-run-not-found expires=2027-01-01
      if (!run) return undefined
      return enrichRun(run)
    })

    const events = Effect.fn("Daemon.events")(function* (runID: string) {
      return yield* store.listEvents(runID)
    })

    const tasks = Effect.fn("Daemon.tasks")(function* (runID: string) {
      return yield* store.listTasks(runID)
    })

    const task = Effect.fn("Daemon.task")(function* (input: { runID: string; taskID: string }) {
      const tasks = yield* store.listTasks(input.runID)
      return tasks.find((item) => item.id === input.taskID)
    })

    const taskPasses = Effect.fn("Daemon.taskPasses")(function* (input: { runID: string; taskID: string }) {
      const current = yield* task(input)
      if (!current) return []
      return yield* store.listTaskPasses(input)
    })

    const taskMemory = Effect.fn("Daemon.taskMemory")(function* (input: { runID: string; taskID: string }) {
      const current = yield* task(input)
      if (!current) return []
      return yield* store.listTaskMemory(input)
    })

    const incubateTask = Effect.fn("Daemon.incubateTask")(function* (input: { runID: string; taskID: string }) {
      const current = yield* task(input)
      if (!current) return
      return yield* store.routeTask({
        taskID: current.id,
        lane: "incubator",
        phase: "routing_tasks",
        incubatorStatus: "active",
      })
    })

    const promoteTask = Effect.fn("Daemon.promoteTask")(function* (input: { runID: string; taskID: string }) {
      const current = yield* task(input)
      if (!current) return
      return yield* store.promoteTask({ taskID: current.id, result: { manual: true } })
    })

    const blockTask = Effect.fn("Daemon.blockTask")(function* (input: { runID: string; taskID: string; reason?: string }) {
      const current = yield* task(input)
      if (!current) return
      return yield* store.exhaustTask({ taskID: current.id, reason: input.reason ?? "blocked by user" })
    })

    const archiveTask = Effect.fn("Daemon.archiveTask")(function* (input: { runID: string; taskID: string; reason?: string }) {
      const current = yield* task(input)
      if (!current) return
      return yield* store.archiveTask({ taskID: current.id, reason: input.reason })
    })

    const incubator = Effect.fn("Daemon.incubator")(function* (runID: string) {
      const run = yield* store.getRun(runID)
      if (!run) return
      const spec = run.spec_json as ZyalScript
      const tasks = yield* store.listTasks(runID)
      return {
        enabled: spec.incubator?.enabled === true,
        strategy: spec.incubator?.strategy,
        route_when: spec.incubator?.route_when,
        exclude_when: spec.incubator?.exclude_when,
        budget: spec.incubator?.budget,
        scratch: spec.incubator?.scratch,
        cleanup: spec.incubator?.cleanup,
        readiness: spec.incubator?.readiness,
        promotion: spec.incubator?.promotion,
        tasks: {
          total: tasks.length,
          incubating: tasks.filter((item) => item.lane === "incubator").length,
          ready: tasks.filter((item) => item.status === "queued" && item.lane === "normal").length,
          blocked: tasks.filter((item) => item.status === "blocked").length,
        },
      }
    })

    const pause = Effect.fn("Daemon.pause")(function* (runID: string) {
      return yield* transitionRun(runID, { status: "paused", phase: "paused" })
    })

    const resume = Effect.fn("Daemon.resume")(function* (runID: string) {
      const run = yield* transitionRun(runID, { status: "armed", phase: "evaluating_stop", stopped_at: null })
      if (run && !fibers.has(runID)) {
        const sessions = yield* Session.Service
        const prompt = yield* SessionPrompt.Service
        const checks = yield* DaemonChecks.Service
        const checkpoint = yield* DaemonCheckpoint.Service
        const mcp = yield* MCP.Service
        const worktree = yield* Worktree.Service
        yield* launchDaemonFiber({
          runID,
          parsed: parsedFromRun(run),
          sessions,
          prompt,
          checkpoint,
          checks,
          mcp,
          worktree,
        })
      }
      return run
    })

    const abort = Effect.fn("Daemon.abort")(function* (runID: string) {
      const run = yield* transitionRun(runID, {
        status: "aborted",
        phase: "terminal",
        stopped_at: Date.now(),
      })
      const fiber = fibers.get(runID)
      if (fiber) {
        yield* Fiber.interrupt(fiber).pipe(Effect.ignore)
      }
      return run
    })

    const compact = Effect.fn("Daemon.compact")(function* (runID: string) {
      return yield* transitionRun(runID, { phase: "compacting" })
    })

    const rotateSession = Effect.fn("Daemon.rotateSession")(function* (runID: string) {
      const run = yield* store.getRun(runID)
      if (!run) return
      const sessions = yield* Session.Service
      const forked = yield* sessions.fork({ sessionID: SessionID.make(run.active_session_id), messageID: undefined })
      yield* applyDaemonPermissions({
        sessions,
        store,
        runID,
        sessionID: forked.id,
        spec: run.spec_json as ZyalScript,
        iteration: run.iteration,
      })
      return yield* transitionRun(runID, {
        active_session_id: forked.id,
        epoch: run.epoch + 1,
        phase: "rotating_session",
      })
    })

    return Service.of({
      preview,
      start,
      list,
      get,
      events,
      tasks,
      task,
      taskPasses,
      taskMemory,
      incubateTask,
      promoteTask,
      blockTask,
      archiveTask,
      incubator,
      pause,
      resume,
      abort,
      compact,
      rotateSession,
    })
  }),
)

export const defaultLayer = layer.pipe(
  Layer.provide(DaemonStore.defaultLayer),
  Layer.provide(Bus.layer),
)

type RunDaemonInput = {
  runID: string
  parsed: ZyalParsed
  sessions: Session.Interface
  store: DaemonStore.Interface
  prompt: SessionPrompt.Interface
  checkpoint: DaemonCheckpoint.Interface
  checks: DaemonChecks.Interface
  bus: Bus.Interface
  mcp: MCP.Interface
  worktree: Worktree.Interface
  transitionRun: (runID: string, patch: Partial<{
    status: DaemonRunStatus
    phase: DaemonPhase
    iteration: number
    epoch: number
    last_error: string | null
    last_exit_result_json: Record<string, unknown> | null
    stopped_at: number | null
    active_session_id: SessionID
  }>) => Effect.Effect<DaemonStore.RunInfo | undefined, any, any>
}

function superviseDaemonRun(input: RunDaemonInput) {
  return Effect.fn("Daemon.supervise")(function* () {
    while (true) {
      const exit = yield* Effect.exit(runDaemon(input)())
      const run = yield* input.store.getRun(input.runID)
      const iteration = run?.iteration ?? 0

      if (exit._tag === "Failure") {
        if (!run || run.status === "paused" || run.status === "aborted") return
        const message = Cause.pretty(exit.cause)
        yield* input.store.appendEvent({
          runID: input.runID,
          iteration,
          eventType: "run.crashed",
          payload: { cause: message.slice(0, 10000) },
        })
        if (!shouldRestartDaemonFiber({ spec: input.parsed.spec, status: run?.status })) {
          yield* input.transitionRun(input.runID, {
            status: "failed",
            phase: "terminal",
            last_error: "daemon fiber crashed: " + message.slice(0, 500),
            stopped_at: Date.now(),
          })
          return
        }
      }

      const latest = yield* input.store.getRun(input.runID)
      if (!shouldRestartDaemonFiber({ spec: input.parsed.spec, status: latest?.status })) return

      yield* input.store.appendEvent({
        runID: input.runID,
        iteration: latest?.iteration ?? iteration,
        eventType: "run.supervisor_restarting",
        payload: {
          status: latest?.status,
          reason: exit._tag === "Failure" ? "crash" : "unexpected_exit",
        },
      })
      yield* input.transitionRun(input.runID, {
        status: "armed",
        phase: "evaluating_stop",
        stopped_at: null,
      })
      yield* Effect.sleep("1 second")
    }
  })
}

function runDaemon(input: RunDaemonInput) {
  return Effect.fn("Daemon.run")(function* () {
    let consecutiveErrors = 0
    let signalCounters: SignalCounters = {}
    const spec = input.parsed.spec
    const onHandlers = getOnHandlers(spec)

    // ─── v1.1: Capture constraint baselines on start ─────────────────────
    let constraintBaselines: ConstraintBaselines = {}
    if (spec.constraints && spec.constraints.length > 0) {
      // Note: baseline capture requires a real shell runner in the full runtime.
      // Here we prepare the baselines structure; the actual shell execution
      // is deferred to evaluateAllConstraints.
      constraintBaselines = {}
    }

    // ─── v1.1: Execute on_start hooks ────────────────────────────────────
    const startHooks = getHookSteps(spec.hooks, "on_start")
    for (const hook of startHooks) {
      yield* input.store.appendEvent({
        runID: input.runID,
        iteration: 0,
        eventType: "hook.on_start",
        payload: { command: hook.run },
      })
    }

    while (true) {
      const run = yield* input.store.getRun(input.runID)
      if (!run) return
      if (run.status === "aborted" || run.status === "failed" || run.status === "satisfied") return
      if (run.status === "paused") {
        yield* Effect.sleep("1 second")
        continue
      }

      // ─── Error-resilient iteration ──────────────────────────────────
      // Wrap the entire iteration body in catchAll so that provider
      // errors, compaction failures, context overflow, etc. increment
      // the circuit breaker and continue instead of killing the fiber.
      const iterationOutcome = yield* Effect.gen(function* () {
        // ─── v1.1: Execute before_iteration hooks ─────────────────────────
        const beforeHooks = getHookSteps(spec.hooks, "before_iteration")
        for (const hook of beforeHooks) {
          yield* input.store.appendEvent({
            runID: input.runID,
            iteration: run.iteration,
            eventType: "hook.before_iteration",
            payload: { command: hook.run },
          })
        }

        const session = yield* input.sessions.get(SessionID.make(run.active_session_id))

        yield* applyDaemonPermissions({
          sessions: input.sessions,
          store: input.store,
          runID: input.runID,
          sessionID: session.id,
          spec,
          iteration: run.iteration,
        })

        yield* input.transitionRun(input.runID, { status: "running", phase: "running_iteration" })

        const loop = yield* input.prompt.loopResult({ sessionID: session.id })
        const assistant = loop.message.info as MessageV2.Assistant
        const iteration = run.iteration + 1

        yield* input.store.appendIteration({
          runID: input.runID,
          iteration,
          sessionID: session.id,
          terminalReason: loop.terminal,
          result: {
            messageID: assistant.id,
            finish: assistant.finish ?? null,
            terminal: loop.terminal,
          },
          tokenUsage: assistant.tokens,
          cost: assistant.cost,
        })
        yield* input.store.appendEvent({
          runID: input.runID,
          iteration,
          eventType: "iteration.finished",
          payload: {
            messageID: assistant.id,
            terminal: loop.terminal,
          },
        })
        yield* input.store.updateRun(input.runID, { iteration })

        // ─── v1.1: Track signal and evaluate on-handlers ──────────────────
        const rawTerminalSignal = loop.terminal as ZyalSignal | undefined
        if (suppressDaemonSignal({ spec, signal: rawTerminalSignal })) {
          yield* input.store.appendEvent({
            runID: input.runID,
            iteration,
            eventType: "permission_denied.unattended_continued",
            payload: {
              terminal: loop.terminal,
              interaction_user: spec.interaction?.user ?? "none",
            },
          })
        }
        const terminalSignal = effectiveDaemonSignal({ spec, signal: rawTerminalSignal })
        if (terminalSignal) {
          signalCounters = incrementSignalCounter(signalCounters, terminalSignal)
          if (onHandlers.length > 0) {
            const actions = evaluateOnHandlers({
              handlers: onHandlers,
              signal: terminalSignal,
              counters: signalCounters,
            })
            for (const action of actions) {
              yield* input.store.appendEvent({
                runID: input.runID,
                iteration,
                eventType: "on_handler.fired",
                payload: action,
              })
              if (action.type === "pause") {
                const resolved = resolveDaemonAutomaticAction({ spec, action: "pause" })
                if (resolved.suppressedByForever) {
                  yield* input.store.appendEvent({
                    runID: input.runID,
                    iteration,
                    eventType: "on_handler.terminal_suppressed_forever",
                    payload: action,
                  })
                  continue
                }
                yield* input.transitionRun(input.runID, { status: "paused", phase: "paused" })
                return "exit" as const
              }
              if (action.type === "abort") {
                const resolved = resolveDaemonAutomaticAction({ spec, action: "abort" })
                if (resolved.suppressedByForever) {
                  yield* input.store.appendEvent({
                    runID: input.runID,
                    iteration,
                    eventType: "on_handler.terminal_suppressed_forever",
                    payload: action,
                  })
                  continue
                }
                yield* input.transitionRun(input.runID, {
                  status: "aborted",
                  phase: "terminal",
                  stopped_at: Date.now(),
                })
                return "exit" as const
              }
            }
          }
        }

        if (daemonSignalCountsAsError({ spec, signal: rawTerminalSignal })) {
          consecutiveErrors += 1
        } else {
          consecutiveErrors = 0
        }

        const breaker = spec.loop?.circuit_breaker
        if (breaker?.max_consecutive_errors !== undefined && consecutiveErrors >= breaker.max_consecutive_errors) {
          const resolved = resolveDaemonAutomaticAction({ spec, action: breaker.on_trip })
          if (resolved.action === "continue") {
            consecutiveErrors = 0
            yield* input.store.appendEvent({
              runID: input.runID,
              iteration,
              eventType: resolved.suppressedByForever
                ? "circuit_breaker.tripped_but_forever"
                : "circuit_breaker.tripped_continued",
              payload: { consecutive_errors: breaker.max_consecutive_errors, on_trip: breaker.on_trip ?? "pause" },
            })
          } else {
            const status = resolved.action === "abort" ? "aborted" : "paused"
            yield* input.transitionRun(input.runID, {
              status,
              phase: status === "aborted" ? "terminal" : "paused",
              last_error: "circuit breaker tripped",
              stopped_at: Date.now(),
            })
            return "exit" as const
          }
        }

        // ─── v1.1: Execute before_checkpoint hooks ────────────────────────
        const beforeCpHooks = getHookSteps(spec.hooks, "before_checkpoint")
        for (const hook of beforeCpHooks) {
          yield* input.store.appendEvent({
            runID: input.runID,
            iteration,
            eventType: "hook.before_checkpoint",
            payload: { command: hook.run },
          })
        }

        const checkpointResult = yield* input.checkpoint.runCheckpoint({
          cwd: session.directory,
          spec: input.parsed.spec,
          checkpoint: input.parsed.spec.checkpoint,
        })

        // ─── v1.1: Execute after_checkpoint hooks ─────────────────────────
        if (checkpointResult.ok) {
          const afterCpHooks = getHookSteps(spec.hooks, "after_checkpoint")
          for (const hook of afterCpHooks) {
            yield* input.store.appendEvent({
              runID: input.runID,
              iteration,
              eventType: "hook.after_checkpoint",
              payload: { command: hook.run },
            })
          }
        }

        if (!checkpointResult.ok) {
          signalCounters = incrementSignalCounter(signalCounters, "checkpoint_failed")
          if (onHandlers.length > 0) {
            const actions = evaluateOnHandlers({
              handlers: onHandlers,
              signal: "checkpoint_failed",
              counters: signalCounters,
            })
            for (const action of actions) {
              yield* input.store.appendEvent({
                runID: input.runID,
                iteration,
                eventType: "on_handler.fired",
                payload: action,
              })
            }
          }
          const continueOn = spec.loop?.continue_on ?? []
          if (continueOn.includes("checkpoint_failed") || resolveDaemonPolicy(spec) === "forever") {
            yield* input.store.appendEvent({
              runID: input.runID,
              iteration,
              eventType: "checkpoint.failed_continued",
              payload: { reason: checkpointResult.reason ?? "checkpoint failed" },
            })
          } else {
            yield* input.transitionRun(input.runID, {
              status: "paused",
              phase: "paused",
              last_error: checkpointResult.reason ?? "checkpoint failed",
            })
            return "exit" as const
          }
        }

        // ─── v1.1: Evaluate stop with retry backoff ───────────────────────
        const retryPolicy = resolveRetryPolicy(spec.retry, "stop_evaluation")
        let stopAttempt = 0
        let stopResult = yield* evaluateStop({
          cwd: session.directory,
          spec: input.parsed.spec,
          checks: input.checks,
        })

        while (!stopResult.satisfied && canRetry(retryPolicy, stopAttempt + 1)) {
          stopAttempt++
          const delay = computeRetryDelay(retryPolicy, stopAttempt - 1)
          if (delay > 0) {
            yield* Effect.sleep(`${delay} millis` as Parameters<typeof Effect.sleep>[0])
          }
          stopResult = yield* evaluateStop({
            cwd: session.directory,
            spec: input.parsed.spec,
            checks: input.checks,
          })
        }

        yield* input.store.appendEvent({
          runID: input.runID,
          iteration,
          eventType: "stop.evaluated",
          payload: { ...stopResult, retry_attempts: stopAttempt },
        })

        if (stopResult.satisfied) {
          const stopHooks = getHookSteps(spec.hooks, "on_stop")
          for (const hook of stopHooks) {
            yield* input.store.appendEvent({
              runID: input.runID,
              iteration,
              eventType: "hook.on_stop",
              payload: { command: hook.run },
            })
          }
          yield* input.transitionRun(input.runID, {
            status: "satisfied",
            phase: "terminal",
            stopped_at: Date.now(),
            iteration,
            last_exit_result_json: stopResult,
          })
          return "exit" as const
        }

        if (input.parsed.spec.incubator?.enabled) {
          yield* input.transitionRun(input.runID, { phase: "routing_tasks" })
          const tickResult = yield* incubatorTick({
            run: { ...run, iteration },
            parsed: input.parsed,
            sessions: input.sessions,
            store: input.store,
            prompt: input.prompt,
            mcp: input.mcp,
            worktree: input.worktree,
          })
          yield* input.store.appendEvent({
            runID: input.runID,
            iteration,
            eventType: "incubator.tick",
            payload: tickResult,
          })
          if (tickResult.action === "pass") {
            yield* input.transitionRun(input.runID, { phase: "incubator_pass" })
          } else if (tickResult.action === "promoted") {
            const promoteHooks = getHookSteps(spec.hooks, "on_promote")
            for (const hook of promoteHooks) {
              yield* input.store.appendEvent({
                runID: input.runID,
                iteration,
                eventType: "hook.on_promote",
                payload: { command: hook.run },
              })
            }
            yield* input.transitionRun(input.runID, { phase: "promotion_gate" })
          }
        }

        // ─── v1.1: Execute after_iteration hooks ──────────────────────────
        const afterHooks = getHookSteps(spec.hooks, "after_iteration")
        for (const hook of afterHooks) {
          yield* input.store.appendEvent({
            runID: input.runID,
            iteration,
            eventType: "hook.after_iteration",
            payload: { command: hook.run },
          })
        }

        const hardClearEvery = input.parsed.spec.context?.hard_clear_every
        let targetSessionID = session.id
        if (input.parsed.spec.context?.strategy !== "soft" && hardClearEvery && iteration % hardClearEvery === 0) {
          const forked = yield* input.sessions.fork({ sessionID: session.id, messageID: undefined })
          yield* applyDaemonPermissions({
            sessions: input.sessions,
            store: input.store,
            runID: input.runID,
            sessionID: forked.id,
            spec,
            iteration,
          })
          yield* input.transitionRun(input.runID, {
            active_session_id: forked.id,
            epoch: run.epoch + 1,
            phase: "rotating_session",
          })
          targetSessionID = forked.id
        }

        const allIterations = yield* input.store.listIterations(input.runID)
        const continuation = DaemonContext.buildDaemonIterationPrompt({
          parsed: input.parsed,
          run,
          lastIteration: allIterations.at(-1),
          recentIterations: allIterations.slice(-3),
        })
        yield* input.prompt.prompt({
          sessionID: targetSessionID,
          agent: session.agent,
          model: session.model
            ? {
                providerID: session.model.providerID,
                modelID: session.model.id,
              }
            : undefined,
          noReply: true,
          parts: [{ type: "text", text: continuation }],
        })

        const sleep = input.parsed.spec.loop?.sleep ?? "5 seconds"
        yield* input.transitionRun(input.runID, { phase: "sleeping" })
        yield* Effect.sleep(sleep as Parameters<typeof Effect.sleep>[0])
        return "ok" as const
      }).pipe(
        // catchCause instead of catch — catches BOTH typed errors AND
        // defects (uncaught runtime exceptions like tool SchemaErrors,
        // provider crashes, etc.) so the daemon never dies from a single
        // bad iteration.
        Effect.catchCause((cause) =>
          Effect.gen(function* () {
            consecutiveErrors += 1
            const errorMessage = Cause.squash(cause) instanceof Error
              ? (Cause.squash(cause) as Error).message
              : Cause.pretty(cause)
            yield* input.store.appendEvent({
              runID: input.runID,
              iteration: run.iteration,
              eventType: "iteration.error",
              payload: { error: errorMessage.slice(0, 2000), consecutiveErrors },
            })
            yield* input.transitionRun(input.runID, {
              last_error: errorMessage.slice(0, 500),
            })
            return "error" as const
          }),
        ),
      )

      // If the iteration body returned "exit", the run was transitioned
      // to a terminal/paused state inside — stop the loop.
      if (iterationOutcome === "exit") return

      // On error, check circuit breaker then backoff and retry.
      if (iterationOutcome === "error") {
        const breaker = spec.loop?.circuit_breaker
        if (breaker?.max_consecutive_errors !== undefined && consecutiveErrors >= breaker.max_consecutive_errors) {
          const resolved = resolveDaemonAutomaticAction({ spec, action: breaker.on_trip })
          if (resolved.action !== "continue") {
            const status = resolved.action === "abort" ? "aborted" : "paused"
            yield* input.transitionRun(input.runID, {
              status,
              phase: status === "aborted" ? "terminal" : "paused",
              last_error: "circuit breaker tripped after unhandled error",
              stopped_at: Date.now(),
            })
            return
          }
          consecutiveErrors = 0
          yield* input.store.appendEvent({
            runID: input.runID,
            iteration: run.iteration,
            eventType: resolved.suppressedByForever
              ? "circuit_breaker.tripped_but_forever"
              : "circuit_breaker.tripped_continued",
            payload: { consecutive_errors: breaker.max_consecutive_errors, on_trip: breaker.on_trip ?? "pause" },
          })
        }
        // Backoff before retrying to avoid hot error loops
        yield* Effect.sleep("10 seconds")
        continue
      }
    }
  })
}

function evaluateStop(input: {
  cwd: string
  spec: ZyalScript
  checks: DaemonChecks.Interface
}) {
  return Effect.gen(function* () {
    const all = yield* Effect.forEach(
      input.spec.stop.all,
      (condition) =>
        Effect.gen(function* () {
          if ("git_clean" in condition) {
            const result = yield* input.checks.gitClean({
              cwd: input.cwd,
              allowUntracked: condition.git_clean.allow_untracked,
            })
            return { satisfied: result.clean, reason: result.clean ? "git_clean" : "dirty", condition: "git_clean" }
          }

          const result = yield* input.checks.runShellCheck({
            cwd: input.cwd,
            command: condition.shell.command,
            timeout: condition.shell.timeout,
            assert: condition.shell.assert
              ? {
                  exit_code: condition.shell.assert.exit_code,
                  stdout_contains: condition.shell.assert.stdout_contains ? [...condition.shell.assert.stdout_contains] : undefined,
                  stdout_regex: condition.shell.assert.stdout_regex ? [...condition.shell.assert.stdout_regex] : undefined,
                  json: condition.shell.assert.json ? { ...condition.shell.assert.json } : undefined,
                }
              : undefined,
          })
          return {
            satisfied: result.matched,
            reason: result.matched ? "shell" : result.error ?? "shell",
            condition: "shell",
          }
        }),
      { concurrency: 1 },
    )

    const any =
      input.spec.stop.any && input.spec.stop.any.length > 0
        ? yield* Effect.forEach(
            input.spec.stop.any,
            (condition) =>
              Effect.gen(function* () {
                if ("git_clean" in condition) {
                  const result = yield* input.checks.gitClean({
                    cwd: input.cwd,
                    allowUntracked: condition.git_clean.allow_untracked,
                  })
                  return { satisfied: result.clean, reason: result.clean ? "git_clean" : "dirty", condition: "git_clean" }
                }
                const result = yield* input.checks.runShellCheck({
                  cwd: input.cwd,
                  command: condition.shell.command,
                  timeout: condition.shell.timeout,
                  assert: condition.shell.assert
                    ? {
                        exit_code: condition.shell.assert.exit_code,
                        stdout_contains: condition.shell.assert.stdout_contains ? [...condition.shell.assert.stdout_contains] : undefined,
                        stdout_regex: condition.shell.assert.stdout_regex ? [...condition.shell.assert.stdout_regex] : undefined,
                        json: condition.shell.assert.json ? { ...condition.shell.assert.json } : undefined,
                      }
                    : undefined,
                })
                return {
                  satisfied: result.matched,
                  reason: result.matched ? "shell" : result.error ?? "shell",
                  condition: "shell",
                }
              }),
            { concurrency: 1 },
          )
        : undefined

    return {
      satisfied: all.every((item) => item.satisfied) && (any === undefined || any.some((item) => item.satisfied)),
      all,
      any,
    }
  })
}

export * as Daemon from "./daemon"
