import { Effect, Schema } from "effect"
import * as yaml from "yaml"
import { createHash } from "crypto"
import {
  assertOcalTopLevelKeys,
  buildOcalPreview,
  OcalArm,
  OcalScriptSchema,
  type OcalParsed,
  type OcalScript,
} from "./schema"

const OPEN_RE = /^<<<OCAL v(?<version>1):daemon id=(?<id>[A-Za-z0-9._-]+)>>>[ \t]*\n/
const ARM_RE = /^OCAL_ARM RUN_FOREVER id=(?<id>[A-Za-z0-9._-]+)[ \t]*$/m
const CLOSE_RE = /\n<<<END_OCAL id=(?<id>[A-Za-z0-9._-]+)>>>[ \t]*/m

export class OcalParseError extends Error {
  readonly _tag = "OcalParseError"
  constructor(message: string) {
    super(message)
    this.name = "OcalParseError"
  }
}

export function extractOcalBlock(text: string): string | null {
  const trimmed = text.trimStart()
  if (!trimmed.startsWith("<<<OCAL v1:daemon id=")) return null
  if (trimmed.includes("```")) return null
  const open = trimmed.match(OPEN_RE)
  if (!open) return null
  const close = trimmed.match(CLOSE_RE)
  if (!close) return null
  if (open.groups?.id !== close.groups?.id) return null
  const closeIndex = close.index ?? 0
  const afterClose = trimmed.slice(closeIndex + close[0].length)
  const afterCloseTrimmed = afterClose.trim()
  if (afterCloseTrimmed.length > 0) {
    const arm = afterCloseTrimmed.match(/^OCAL_ARM RUN_FOREVER id=(?<id>[A-Za-z0-9._-]+)$/)
    if (!arm?.groups?.id || arm.groups.id !== open.groups?.id) return null
  }
  return trimmed
}

export function parseOcal(
  text: string,
  options: { source?: string; requireArm?: boolean } = {},
): Effect.Effect<OcalParsed, OcalParseError, never> {
  return Effect.try({
    try: () => parseOcalSync(text, options),
    catch: (error) => (error instanceof OcalParseError ? error : new OcalParseError(String(error))),
  })
}

function parseOcalSync(text: string, options: { source?: string; requireArm?: boolean }): OcalParsed {
  if (text.includes("```")) throw new OcalParseError("OCAL blocks cannot be wrapped in code fences")
  const block = extractOcalBlock(text)
  if (!block) throw new OcalParseError("No valid OCAL block found")

  const open = block.match(OPEN_RE)
  if (!open?.groups?.id) throw new OcalParseError("Missing OCAL open sentinel")
  const close = block.match(CLOSE_RE)
  if (!close?.groups?.id) throw new OcalParseError("Missing OCAL close sentinel")
  if (open.groups.id !== close.groups.id) {
    throw new OcalParseError(`OCAL close id ${close.groups.id} does not match open id ${open.groups.id}`)
  }

  const bodyStart = open[0].length
  const bodyEnd = close.index ?? block.length - close[0].length
  const body = block.slice(bodyStart, bodyEnd).trim()
  if (!body) throw new OcalParseError("OCAL body is empty")

  const parsed = yaml.parse(body) as unknown
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new OcalParseError("OCAL body must be a YAML mapping")
  }
  assertOcalTopLevelKeys(parsed as Record<string, unknown>)
  assertOcalNestedKeys(parsed as Record<string, unknown>)
  const withMeta = { ...parsed, id: open.groups.id }
  const arm = parseArm(block)
  if (options.requireArm !== false && !arm) throw new OcalParseError("Missing trailing OCAL_ARM RUN_FOREVER sentinel")
  let spec: OcalScript
  try {
    spec = Schema.decodeUnknownSync(OcalScriptSchema)(withMeta)
  } catch (error) {
    if (error instanceof OcalParseError) throw error
    const message = error instanceof Error ? error.message : String(error)
    throw new OcalParseError(`OCAL schema validation failed: ${message}`)
  }
  validateOcalSemantics(spec)
  const preview = buildOcalPreview({ spec, arm: arm ?? undefined })
  const specHash = hashSpec(spec)
  return { spec, arm: arm ?? undefined, specHash, preview }
}

function assertOcalNestedKeys(input: Record<string, unknown>) {
  if (input.job !== undefined) {
    const job = expectRecord(input.job, "job")
    assertKeys("job", job, ["name", "objective", "risk"])
  }

  if (input.loop !== undefined) {
    const loop = expectRecord(input.loop, "loop")
    assertKeys("loop", loop, ["policy", "sleep", "continue_on", "pause_on", "circuit_breaker"])
    if (loop.continue_on !== undefined) assertSignalList(loop.continue_on, "loop.continue_on")
    if (loop.pause_on !== undefined) assertSignalList(loop.pause_on, "loop.pause_on")
    if (loop.circuit_breaker !== undefined) {
      const breaker = expectRecord(loop.circuit_breaker, "loop.circuit_breaker")
      assertKeys("loop.circuit_breaker", breaker, ["max_consecutive_errors", "on_trip"])
    }
  }

  if (input.stop !== undefined) {
    const stop = expectRecord(input.stop, "stop")
    assertKeys("stop", stop, ["all", "any"])
    for (const mode of ["all", "any"] as const) {
      const value = stop[mode]
      if (value === undefined) continue
      if (!Array.isArray(value)) throw new OcalParseError(`stop.${mode} must be a list`)
      value.forEach((condition, index) => {
        const record = expectRecord(condition, `stop.${mode}[${index}]`)
        assertStopConditionKeys(record, `stop.${mode}[${index}]`)
      })
    }
  }

  if (input.context !== undefined) {
    const context = expectRecord(input.context, "context")
    assertKeys("context", context, ["strategy", "compact_every", "hard_clear_every", "preserve"])
  }

  if (input.checkpoint !== undefined) {
    const checkpoint = expectRecord(input.checkpoint, "checkpoint")
    assertKeys("checkpoint", checkpoint, ["when", "noop_if_clean", "verify", "git"])
    if (checkpoint.verify !== undefined) {
      if (!Array.isArray(checkpoint.verify)) throw new OcalParseError("checkpoint.verify must be a list")
      checkpoint.verify.forEach((check, index) => {
        const record = expectRecord(check, `checkpoint.verify[${index}]`)
        assertShellCheckKeys(record, `checkpoint.verify[${index}]`)
      })
    }
    if (checkpoint.git !== undefined) {
      const git = expectRecord(checkpoint.git, "checkpoint.git")
      assertKeys("checkpoint.git", git, ["add", "commit_message", "push"])
    }
  }

  if (input.tasks !== undefined) {
    const tasks = expectRecord(input.tasks, "tasks")
    assertKeys("tasks", tasks, ["ledger", "discover"])
  }

  if (input.agents !== undefined) {
    const agents = expectRecord(input.agents, "agents")
    assertKeys("agents", agents, ["supervisor", "workers"])
    if (agents.supervisor !== undefined) {
      const supervisor = expectRecord(agents.supervisor, "agents.supervisor")
      assertKeys("agents.supervisor", supervisor, ["agent"])
    }
    if (agents.workers !== undefined) {
      if (!Array.isArray(agents.workers)) throw new OcalParseError("agents.workers must be a list")
      agents.workers.forEach((worker, index) => {
        const record = expectRecord(worker, `agents.workers[${index}]`)
        assertKeys(`agents.workers[${index}]`, record, ["id", "count", "agent", "isolation"])
      })
    }
  }

  if (input.mcp !== undefined) {
    const mcp = expectRecord(input.mcp, "mcp")
    assertKeys("mcp", mcp, ["profiles"])
    if (mcp.profiles !== undefined) {
      const profiles = expectRecord(mcp.profiles, "mcp.profiles")
      for (const [profileName, profile] of Object.entries(profiles)) {
        const record = expectRecord(profile, `mcp.profiles.${profileName}`)
        assertKeys(`mcp.profiles.${profileName}`, record, ["servers", "tools", "resources"])
      }
    }
  }

  if (input.permissions !== undefined) {
    const permissions = expectRecord(input.permissions, "permissions")
    assertKeys("permissions", permissions, ["shell", "edit", "git_commit", "git_push", "workers", "mcp"])
  }

  if (input.ui !== undefined) {
    const ui = expectRecord(input.ui, "ui")
    assertKeys("ui", ui, ["theme", "banner"])
  }

  // ─── v1.1 blocks ─────────────────────────────────────────────────────────
  if (input.on !== undefined) {
    if (!Array.isArray(input.on)) throw new OcalParseError("on must be a list")
    input.on.forEach((handler, index) => {
      const record = expectRecord(handler, `on[${index}]`)
      assertKeys(`on[${index}]`, record, ["signal", "count_gte", "message_contains", "if", "do"])
      if (record.if !== undefined) {
        assertShellCheckKeys(expectRecord(record.if, `on[${index}].if`), `on[${index}].if`)
      }
      if (!Array.isArray(record.do)) throw new OcalParseError(`on[${index}].do must be a list`)
      record.do.forEach((action, ai) => {
        const act = expectRecord(action, `on[${index}].do[${ai}]`)
        assertKeys(`on[${index}].do[${ai}]`, act, [
          "switch_agent", "run", "incubate_current_task", "checkpoint",
          "pause", "abort", "notify", "set_context",
        ])
      })
    })
  }

  if (input.fan_out !== undefined) {
    const fo = expectRecord(input.fan_out, "fan_out")
    assertKeys("fan_out", fo, ["strategy", "split", "worker", "reduce", "on_partial_failure"])
    if (fo.split !== undefined) {
      const split = expectRecord(fo.split, "fan_out.split")
      assertKeys("fan_out.split", split, ["shell", "items"])
    }
    if (fo.worker !== undefined) {
      assertKeys("fan_out.worker", expectRecord(fo.worker, "fan_out.worker"), [
        "agent", "isolation", "timeout", "max_parallel",
      ])
    }
    if (fo.reduce !== undefined) {
      assertKeys("fan_out.reduce", expectRecord(fo.reduce, "fan_out.reduce"), [
        "strategy", "score_key", "command",
      ])
    }
  }

  if (input.guardrails !== undefined) {
    const gr = expectRecord(input.guardrails, "guardrails")
    assertKeys("guardrails", gr, ["input", "output", "iteration"])
    if (gr.input !== undefined) {
      if (!Array.isArray(gr.input)) throw new OcalParseError("guardrails.input must be a list")
      gr.input.forEach((rail, i) => {
        assertKeys(`guardrails.input[${i}]`, expectRecord(rail, `guardrails.input[${i}]`), [
          "name", "deny_patterns", "scope", "action",
        ])
      })
    }
    if (gr.output !== undefined) {
      if (!Array.isArray(gr.output)) throw new OcalParseError("guardrails.output must be a list")
      gr.output.forEach((rail, i) => {
        const rec = expectRecord(rail, `guardrails.output[${i}]`)
        assertKeys(`guardrails.output[${i}]`, rec, [
          "name", "deny_patterns", "scope", "action",
          "shell", "assert", "on_fail", "max_retries",
        ])
        if (rec.assert !== undefined) {
          assertKeys(`guardrails.output[${i}].assert`, expectRecord(rec.assert, `guardrails.output[${i}].assert`), [
            "exit_code", "stdout_contains", "stdout_regex", "json",
          ])
        }
      })
    }
    if (gr.iteration !== undefined) {
      if (!Array.isArray(gr.iteration)) throw new OcalParseError("guardrails.iteration must be a list")
      gr.iteration.forEach((rail, i) => {
        const rec = expectRecord(rail, `guardrails.iteration[${i}]`)
        assertKeys(`guardrails.iteration[${i}]`, rec, [
          "name", "shell", "assert", "on_fail", "max_retries",
        ])
      })
    }
  }

  if (input.assertions !== undefined) {
    const asr = expectRecord(input.assertions, "assertions")
    assertKeys("assertions", asr, ["require_structured_output", "schema", "on_invalid", "max_retries"])
  }

  if (input.retry !== undefined) {
    const rt = expectRecord(input.retry, "retry")
    assertKeys("retry", rt, ["default", "overrides"])
    if (rt.default !== undefined) {
      assertKeys("retry.default", expectRecord(rt.default, "retry.default"), [
        "max_attempts", "backoff", "initial_delay", "max_delay", "jitter",
      ])
    }
    if (rt.overrides !== undefined) {
      const overrides = expectRecord(rt.overrides, "retry.overrides")
      assertKeys("retry.overrides", overrides, ["shell_checks", "checkpoint", "worker_spawn", "stop_evaluation"])
      for (const key of ["shell_checks", "checkpoint", "worker_spawn", "stop_evaluation"] as const) {
        if (overrides[key] !== undefined) {
          assertKeys(`retry.overrides.${key}`, expectRecord(overrides[key], `retry.overrides.${key}`), [
            "max_attempts", "backoff", "initial_delay", "max_delay", "jitter",
          ])
        }
      }
    }
  }

  if (input.hooks !== undefined) {
    const hooks = expectRecord(input.hooks, "hooks")
    assertKeys("hooks", hooks, [
      "on_start", "before_iteration", "after_iteration",
      "before_checkpoint", "after_checkpoint",
      "on_promote", "on_exhaust", "on_stop",
    ])
    for (const [key, value] of Object.entries(hooks)) {
      if (value === undefined) continue
      if (!Array.isArray(value)) throw new OcalParseError(`hooks.${key} must be a list`)
      value.forEach((step, i) => {
        assertKeys(`hooks.${key}[${i}]`, expectRecord(step, `hooks.${key}[${i}]`), [
          "run", "assert", "on_fail", "timeout",
        ])
        if ((step as Record<string, unknown>).assert !== undefined) {
          assertKeys(`hooks.${key}[${i}].assert`, expectRecord((step as Record<string, unknown>).assert, `hooks.${key}[${i}].assert`), [
            "exit_code", "stdout_contains", "stdout_regex", "json",
          ])
        }
      })
    }
  }

  if (input.constraints !== undefined) {
    if (!Array.isArray(input.constraints)) throw new OcalParseError("constraints must be a list")
    input.constraints.forEach((constraint, i) => {
      const rec = expectRecord(constraint, `constraints[${i}]`)
      assertKeys(`constraints[${i}]`, rec, ["name", "check", "baseline", "invariant", "on_violation"])
      if (rec.check !== undefined) {
        assertKeys(`constraints[${i}].check`, expectRecord(rec.check, `constraints[${i}].check`), ["shell", "timeout"])
      }
    })
  }

  const incubator = input.incubator
  if (incubator === undefined) return
  const root = expectRecord(incubator, "incubator")
  assertKeys("incubator", root, [
    "enabled",
    "strategy",
    "route_when",
    "exclude_when",
    "budget",
    "scratch",
    "cleanup",
    "readiness",
    "passes",
    "promotion",
  ])
  if ("allow_unbounded" in root) throw new OcalParseError("incubator.allow_unbounded is not supported")

  if (root.route_when !== undefined) {
    const route = expectRecord(root.route_when, "incubator.route_when")
    assertKeys("incubator.route_when", route, ["any", "all"])
    for (const mode of ["any", "all"] as const) {
      const value = route[mode]
      if (value === undefined) continue
      if (!Array.isArray(value)) throw new OcalParseError(`incubator.route_when.${mode} must be a list`)
      value.forEach((condition, index) => {
        const record = expectRecord(condition, `incubator.route_when.${mode}[${index}]`)
        assertKeys(`incubator.route_when.${mode}[${index}]`, record, [
          "repeated_attempts_gte",
          "no_progress_iterations_gte",
          "risk_score_gte",
          "readiness_score_lt",
          "touches_paths",
        ])
      })
    }
  }

  if (root.exclude_when !== undefined) {
    const route = expectRecord(root.exclude_when, "incubator.exclude_when")
    assertKeys("incubator.exclude_when", route, ["any", "all"])
    for (const mode of ["any", "all"] as const) {
      const value = route[mode]
      if (value === undefined) continue
      if (!Array.isArray(value)) throw new OcalParseError(`incubator.exclude_when.${mode} must be a list`)
      value.forEach((condition, index) => {
        const record = expectRecord(condition, `incubator.exclude_when.${mode}[${index}]`)
        assertKeys(`incubator.exclude_when.${mode}[${index}]`, record, [
          "repeated_attempts_gte",
          "no_progress_iterations_gte",
          "risk_score_gte",
          "readiness_score_lt",
          "touches_paths",
        ])
      })
    }
  }

  if (root.budget !== undefined) {
    assertKeys("incubator.budget", expectRecord(root.budget, "incubator.budget"), [
      "max_passes_per_task",
      "max_rounds_per_task",
      "max_active_tasks",
      "max_parallel_idea_passes",
    ])
  }

  if (root.scratch !== undefined) {
    assertKeys("incubator.scratch", expectRecord(root.scratch, "incubator.scratch"), ["storage", "mirror", "cleanup"])
  }

  if (root.cleanup !== undefined) {
    assertKeys("incubator.cleanup", expectRecord(root.cleanup, "incubator.cleanup"), [
      "summarize_to_task_memory",
      "archive_artifacts",
      "delete_scratch",
      "delete_unmerged_worktrees",
    ])
  }

  if (root.readiness !== undefined) {
    assertKeys("incubator.readiness", expectRecord(root.readiness, "incubator.readiness"), [
      "promote_at",
      "tests_identified_gte",
      "scope_bounded_gte",
      "plan_reviewed_gte",
      "prototype_validated_gte",
      "rollback_known_gte",
      "affected_files_known_gte",
      "critical_objections_resolved_gte",
      "model_confidence_cap",
    ])
  }

  if (!Array.isArray(root.passes)) throw new OcalParseError("incubator.passes must be a list")
  root.passes.forEach((pass, index) => {
    assertKeys(`incubator.passes[${index}]`, expectRecord(pass, `incubator.passes[${index}]`), [
      "id",
      "type",
      "context",
      "reads",
      "writes",
      "count",
      "agent",
      "mcp_profile",
    ])
  })

  if (root.promotion !== undefined) {
    const promotion = expectRecord(root.promotion, "incubator.promotion")
    assertKeys("incubator.promotion", promotion, ["promote_at", "require", "block_on", "on_promote", "on_exhausted"])
    if (promotion.block_on !== undefined) {
      assertKeys("incubator.promotion.block_on", expectRecord(promotion.block_on, "incubator.promotion.block_on"), [
        "unresolved_critical_objections_gte",
      ])
    }
  }
}

function validateOcalSemantics(spec: OcalScript) {
  // ─── Incubator validation ─────────────────────────────────────────────
  const incubator = spec.incubator
  if (incubator?.enabled) {
    requirePositiveInteger(incubator.budget.max_passes_per_task, "incubator.budget.max_passes_per_task")
    requirePositiveInteger(incubator.budget.max_rounds_per_task, "incubator.budget.max_rounds_per_task")
    if (incubator.budget.max_active_tasks !== undefined) {
      requirePositiveInteger(incubator.budget.max_active_tasks, "incubator.budget.max_active_tasks")
    }
    if (incubator.budget.max_parallel_idea_passes !== undefined) {
      requirePositiveInteger(incubator.budget.max_parallel_idea_passes, "incubator.budget.max_parallel_idea_passes")
    }
    requireScore(incubator.promotion.promote_at, "incubator.promotion.promote_at")
    if (incubator.readiness?.promote_at !== undefined) {
      requireScore(incubator.readiness.promote_at, "incubator.readiness.promote_at")
    }
    if (incubator.readiness?.model_confidence_cap !== undefined) {
      requireScore(incubator.readiness.model_confidence_cap, "incubator.readiness.model_confidence_cap")
    }
    if (incubator.cleanup) {
      for (const [key, value] of Object.entries(incubator.cleanup)) {
        if (value !== undefined && typeof value !== "boolean") {
          throw new OcalParseError(`incubator.cleanup.${key} must be boolean`)
        }
      }
    }

    const maxIdeas = incubator.budget.max_parallel_idea_passes ?? 1
    const availableProfiles = new Set(Object.keys(spec.mcp?.profiles ?? {}))
    for (const [index, pass] of incubator.passes.entries()) {
      if (pass.count !== undefined) requirePositiveInteger(pass.count, `incubator.passes[${index}].count`)
      if (pass.writes === "isolated_worktree" && pass.type !== "prototype") {
        throw new OcalParseError(`incubator pass ${pass.id} can use isolated_worktree only for prototype`)
      }
      if (pass.type === "prototype" && !["isolated_worktree", "scratch_only"].includes(pass.writes)) {
        throw new OcalParseError(`incubator prototype pass ${pass.id} must write to isolated_worktree or scratch_only`)
      }
      if (pass.type === "idea" && (pass.count ?? 1) > maxIdeas) {
        throw new OcalParseError(`incubator idea pass ${pass.id} count exceeds max_parallel_idea_passes`)
      }
      if (pass.mcp_profile && !availableProfiles.has(pass.mcp_profile)) {
        throw new OcalParseError(`incubator pass ${pass.id} references unknown mcp_profile ${pass.mcp_profile}`)
      }
    }
  }

  // ─── v1.1: on handlers ────────────────────────────────────────────────
  if (spec.on) {
    for (const [i, handler] of spec.on.entries()) {
      if (!handler.do || handler.do.length === 0) {
        throw new OcalParseError(`on[${i}].do must have at least one action`)
      }
      if (handler.count_gte !== undefined && handler.count_gte < 1) {
        throw new OcalParseError(`on[${i}].count_gte must be >= 1`)
      }
    }
  }

  // ─── v1.1: fan_out ────────────────────────────────────────────────────
  if (spec.fan_out) {
    const fo = spec.fan_out
    if (fo.worker.max_parallel !== undefined) {
      requirePositiveInteger(fo.worker.max_parallel, "fan_out.worker.max_parallel")
    }
    if (fo.reduce.strategy === "best_score" && !fo.reduce.score_key) {
      throw new OcalParseError("fan_out.reduce.score_key is required when strategy is best_score")
    }
    if (fo.reduce.strategy === "custom_shell" && !fo.reduce.command) {
      throw new OcalParseError("fan_out.reduce.command is required when strategy is custom_shell")
    }
  }

  // ─── v1.1: guardrails ─────────────────────────────────────────────────
  if (spec.guardrails) {
    const gr = spec.guardrails
    if (gr.input) {
      for (const [i, rail] of gr.input.entries()) {
        if (!rail.deny_patterns.length) {
          throw new OcalParseError(`guardrails.input[${i}].deny_patterns must not be empty`)
        }
      }
    }
    if (gr.output) {
      for (const [i, rail] of gr.output.entries()) {
        if ("deny_patterns" in rail && !rail.deny_patterns.length) {
          throw new OcalParseError(`guardrails.output[${i}].deny_patterns must not be empty`)
        }
        if ("max_retries" in rail && rail.max_retries !== undefined) {
          requirePositiveInteger(rail.max_retries, `guardrails.output[${i}].max_retries`)
        }
      }
    }
    if (gr.iteration) {
      for (const [i, rail] of gr.iteration.entries()) {
        if (rail.max_retries !== undefined) {
          requirePositiveInteger(rail.max_retries, `guardrails.iteration[${i}].max_retries`)
        }
      }
    }
  }

  // ─── v1.1: assertions ─────────────────────────────────────────────────
  if (spec.assertions) {
    if (spec.assertions.max_retries !== undefined) {
      requirePositiveInteger(spec.assertions.max_retries, "assertions.max_retries")
    }
  }

  // ─── v1.1: retry ──────────────────────────────────────────────────────
  if (spec.retry) {
    const validateRetryPolicy = (policy: NonNullable<typeof spec.retry>["default"], path: string) => {
      if (!policy) return
      if (policy.max_attempts !== undefined) {
        requirePositiveInteger(policy.max_attempts, `${path}.max_attempts`)
      }
    }
    validateRetryPolicy(spec.retry.default, "retry.default")
    if (spec.retry.overrides) {
      for (const [key, policy] of Object.entries(spec.retry.overrides)) {
        if (policy) validateRetryPolicy(policy, `retry.overrides.${key}`)
      }
    }
  }

  // ─── v1.1: constraints ────────────────────────────────────────────────
  if (spec.constraints) {
    const names = new Set<string>()
    for (const [i, constraint] of spec.constraints.entries()) {
      if (names.has(constraint.name)) {
        throw new OcalParseError(`constraints[${i}].name '${constraint.name}' is duplicated`)
      }
      names.add(constraint.name)
      if (!constraint.check.shell.trim()) {
        throw new OcalParseError(`constraints[${i}].check.shell must not be empty`)
      }
      if (constraint.baseline && (constraint.invariant === "equals_zero" || constraint.invariant === "non_zero")) {
        throw new OcalParseError(`constraints[${i}] baseline is incompatible with ${constraint.invariant}`)
      }
    }
  }
}

function assertKeys(path: string, value: Record<string, unknown>, allowed: string[]) {
  const set = new Set(allowed)
  for (const key of Object.keys(value)) {
    if (!set.has(key)) throw new OcalParseError(`Unknown OCAL key: ${path}.${key}`)
  }
}

function expectRecord(value: unknown, path: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new OcalParseError(`${path} must be a YAML mapping`)
  }
  return value as Record<string, unknown>
}

function requirePositiveInteger(value: number, path: string) {
  if (!Number.isFinite(value) || value <= 0 || !Number.isInteger(value)) {
    throw new OcalParseError(`${path} must be a finite positive integer`)
  }
}

function requireScore(value: number, path: string) {
  if (!Number.isFinite(value) || value <= 0 || value > 1) {
    throw new OcalParseError(`${path} must be a finite score in (0, 1]`)
  }
}

function assertSignalList(value: unknown, path: string) {
  if (!Array.isArray(value)) throw new OcalParseError(`${path} must be a list`)
  value.forEach((item, index) => {
    if (typeof item !== "string") throw new OcalParseError(`${path}[${index}] must be a string`)
  })
}

function assertShellCheckKeys(record: Record<string, unknown>, path: string) {
  assertKeys(path, record, ["command", "timeout", "cwd", "assert"])
  if (record.assert !== undefined) {
    const assert = expectRecord(record.assert, `${path}.assert`)
    assertKeys(`${path}.assert`, assert, ["exit_code", "stdout_contains", "stdout_regex", "json"])
  }
}

function assertStopConditionKeys(record: Record<string, unknown>, path: string) {
  assertKeys(path, record, ["shell", "git_clean"])
  const hasShell = record.shell !== undefined
  const hasGitClean = record.git_clean !== undefined
  if (hasShell === hasGitClean) {
    throw new OcalParseError(`${path} must contain exactly one of shell or git_clean`)
  }
  if (hasShell) assertShellCheckKeys(expectRecord(record.shell, `${path}.shell`), `${path}.shell`)
  if (hasGitClean) {
    const gitClean = expectRecord(record.git_clean, `${path}.git_clean`)
    assertKeys(`${path}.git_clean`, gitClean, ["allow_untracked"])
  }
}

function parseArm(text: string): OcalArm | null {
  const match = text.match(ARM_RE)
  if (!match?.groups?.id) return null
  return {
    action: "RUN_FOREVER",
    id: match.groups.id,
  }
}

function hashSpec(spec: OcalScript) {
  const stable = stableStringify(spec)
  return createHash("sha256").update(stable).digest("hex")
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortValue(value))
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortValue)
  if (!value || typeof value !== "object") return value
  return Object.fromEntries(Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, sortValue(v)]))
}
