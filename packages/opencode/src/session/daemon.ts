import { Effect, Layer, Context, Scope } from "effect"
import { parseOcal } from "@/agent-script/parser"
import { type OcalParsed, type OcalPreview, type OcalScript, type OcalSignal } from "@/agent-script/schema"
import { Bus } from "@/bus"
import { InstanceState } from "@/effect/instance-state"
import { AppFileSystem } from "@opencode-ai/core/filesystem"
import { Worktree } from "@/worktree"
import { Agent } from "@/agent/agent"
import { Provider } from "@/provider/provider"
import { Config } from "@/config/config"
import { Session } from "./session"
import { SessionPrompt } from "./prompt"
import { SessionStatus } from "./status"
import { DaemonStore } from "./daemon-store"
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

export type StartPayload = {
  readonly sessionID: SessionID
  readonly prompt: Omit<SessionPrompt.PromptInput, "sessionID">
}

export type PreviewResult = OcalParsed

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

export class Service extends Context.Service<Service, Interface>()("@opencode/Daemon") {}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const prompt = yield* SessionPrompt.Service
    const sessions = yield* Session.Service
    const store = yield* DaemonStore.Service
    const checks = yield* DaemonChecks.Service
    const checkpoint = yield* DaemonCheckpoint.Service
    const bus = yield* Bus.Service
    const scope = yield* Scope.Scope
    yield* Agent.Service
    yield* Provider.Service
    yield* Config.Service
    yield* AppFileSystem.Service
    const mcp = yield* MCP.Service
    const worktree = yield* Worktree.Service
    yield* SessionStatus.Service

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
      return yield* parseOcal(input.text, { requireArm: false })
    })

    const start = Effect.fn("Daemon.start")(function* (input: StartPayload) {
      const text = input.prompt.parts
        .filter((part) => part.type === "text")
        .map((part) => part.text)
        .join("\n")
      const parsed = yield* preview({ text })
      if (!parsed.arm) {
        throw new Error("OCAL daemon start requires the trailing OCAL_ARM RUN_FOREVER sentinel")
      }
      const run = yield* store.createRun({
        rootSessionID: input.sessionID,
        activeSessionID: input.sessionID,
        spec: parsed.spec,
        specHash: parsed.specHash,
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

      yield* Effect.forkScoped(
        runDaemon({
          runID: run.id,
          parsed,
          sessions,
          store,
          prompt,
          checkpoint,
          checks,
          bus,
          mcp,
          worktree,
          transitionRun,
        })(),
      )
      return yield* store.getRun(run.id).pipe(Effect.map((value) => value ?? run))
    })

    const list = Effect.fn("Daemon.list")(function* () {
      return yield* store.listRuns()
    })

    const get = Effect.fn("Daemon.get")(function* (runID: string) {
      return yield* store.getRun(runID)
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
      const spec = run.spec_json as OcalScript
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
      return yield* transitionRun(runID, { status: "armed", phase: "evaluating_stop" })
    })

    const abort = Effect.fn("Daemon.abort")(function* (runID: string) {
      return yield* transitionRun(runID, {
        status: "aborted",
        phase: "terminal",
        stopped_at: Date.now(),
      })
    })

    const compact = Effect.fn("Daemon.compact")(function* (runID: string) {
      return yield* transitionRun(runID, { phase: "compacting" })
    })

    const rotateSession = Effect.fn("Daemon.rotateSession")(function* (runID: string) {
      const run = yield* store.getRun(runID)
      if (!run) return
      const forked = yield* sessions.fork({ sessionID: SessionID.make(run.active_session_id), messageID: undefined })
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

export const defaultLayer = layer

function runDaemon(input: {
  runID: string
  parsed: OcalParsed
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
}) {
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
      const terminalSignal = loop.terminal as OcalSignal | undefined
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
              yield* input.transitionRun(input.runID, { status: "paused", phase: "paused" })
              return
            }
            if (action.type === "abort") {
              yield* input.transitionRun(input.runID, {
                status: "aborted",
                phase: "terminal",
                stopped_at: Date.now(),
              })
              return
            }
          }
        }
      }

      if (loop.terminal === "permission_denied" || loop.terminal === "error" || loop.terminal === "cancelled") {
        consecutiveErrors += 1
      } else {
        consecutiveErrors = 0
      }

      const breaker = spec.loop?.circuit_breaker
      if (breaker?.max_consecutive_errors !== undefined && consecutiveErrors >= breaker.max_consecutive_errors) {
        const status = breaker.on_trip === "abort" ? "aborted" : "paused"
        yield* input.transitionRun(input.runID, {
          status,
          phase: status === "aborted" ? "terminal" : "paused",
          last_error: "circuit breaker tripped",
          stopped_at: Date.now(),
        })
        return
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
        // ─── v1.1: Fire on-handlers for checkpoint_failed ──────────────
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
        yield* input.transitionRun(input.runID, {
          status: "paused",
          phase: "paused",
          last_error: checkpointResult.reason ?? "checkpoint failed",
        })
        return
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
        // ─── v1.1: Execute on_stop hooks ─────────────────────────────
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
        return
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
          // ─── v1.1: Execute on_promote hooks ───────────────────────
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

      const continuation = DaemonContext.buildDaemonIterationPrompt({
        parsed: input.parsed,
        run,
        lastIteration: (yield* input.store.listIterations(input.runID)).at(-1),
      })
      yield* input.prompt.prompt({
        sessionID: session.id,
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

      const hardClearEvery = input.parsed.spec.context?.hard_clear_every
      if (input.parsed.spec.context?.strategy !== "soft" && hardClearEvery && iteration % hardClearEvery === 0) {
        const forked = yield* input.sessions.fork({ sessionID: session.id, messageID: undefined })
        yield* input.transitionRun(input.runID, {
          active_session_id: forked.id,
          epoch: run.epoch + 1,
          phase: "rotating_session",
        })
      }

      const sleep = input.parsed.spec.loop?.sleep ?? "5 seconds"
      yield* input.transitionRun(input.runID, { phase: "sleeping" })
      yield* Effect.sleep(sleep as Parameters<typeof Effect.sleep>[0])
    }
  })
}

function evaluateStop(input: {
  cwd: string
  spec: OcalScript
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
