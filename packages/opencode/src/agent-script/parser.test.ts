import { describe, expect, test } from "bun:test"
import { Effect } from "effect"
import { detectOcal } from "./activation"
import { getOcalExample, listOcalExamples } from "./examples"
import { extractOcalBlock, parseOcal } from "./parser"

describe("OCAL parser", () => {
  test("accepts a valid example", async () => {
    const example = getOcalExample("jankurai-clean-worktree")
    expect(example).toBeDefined()
    const parsed = await Effect.runPromise(parseOcal(example!.text))
    expect(parsed.spec.intent).toBe("daemon")
    expect(parsed.spec.confirm).toBe("RUN_FOREVER")
    expect(parsed.preview.armed).toBe(true)
  })

  test("detects draft ocals without arm", () => {
    const example = getOcalExample("fix-until-tests-pass")!
    const draft = example.text.replace(/OCAL_ARM RUN_FOREVER id=.*\n?$/, "")
    const detected = detectOcal(draft)
    expect(detected.kind).toBe("preview")
    if (detected.kind === "preview") expect(detected.preview.armed).toBe(false)
  })

  test("rejects missing open block", async () => {
    const result = await Effect.runPromiseExit(parseOcal("hello"))
    expect(result._tag).toBe("Failure")
  })

  test("rejects unknown top-level keys", async () => {
    const text = `<<<OCAL v1:daemon id=test>>>
version: v1
intent: daemon
confirm: RUN_FOREVER
job:
  name: test
  objective: test
bogus: true
stop:
  all:
    - git_clean: {}
<<<END_OCAL id=test>>>
OCAL_ARM RUN_FOREVER id=test`
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects unknown nested keys outside incubator", async () => {
    const text = `<<<OCAL v1:daemon id=test>>>
version: v1
intent: daemon
confirm: RUN_FOREVER
job:
  name: test
  objective: test
  extra: nope
stop:
  all:
    - git_clean: {}
<<<END_OCAL id=test>>>
OCAL_ARM RUN_FOREVER id=test`
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects code fences", async () => {
    const text = "```yaml\n<<<OCAL v1:daemon id=test>>>\nversion: v1\nintent: daemon\nconfirm: RUN_FOREVER\njob:\n  name: test\n  objective: test\nstop:\n  all:\n    - git_clean: {}\n<<<END_OCAL id=test>>>\nOCAL_ARM RUN_FOREVER id=test\n```"
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects mismatched block ids", async () => {
    const text = `<<<OCAL v1:daemon id=one>>>
version: v1
intent: daemon
confirm: RUN_FOREVER
job:
  name: test
  objective: test
stop:
  all:
    - git_clean: {}
<<<END_OCAL id=two>>>
OCAL_ARM RUN_FOREVER id=one`
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("lists bundled examples", () => {
    expect(listOcalExamples().length).toBeGreaterThan(0)
    expect(extractOcalBlock(getOcalExample("multi-worker-audit")!.text)).toBeTruthy()
  })

  test("accepts a valid incubator block", async () => {
    const parsed = await Effect.runPromise(parseOcal(getOcalExample("hard-task-incubator")!.text))
    expect(parsed.spec.incubator?.enabled).toBe(true)
    expect(parsed.preview.incubator_enabled).toBe(true)
    expect(parsed.preview.incubator_passes.some((item) => item.includes("idea"))).toBe(true)
    expect(parsed.preview.promotion_threshold).toBe(0.78)
  })

  test("accepts the normal user incubator preset", async () => {
    const parsed = await Effect.runPromise(parseOcal(getOcalExample("normal-user-incubator")!.text))
    expect(parsed.spec.incubator?.enabled).toBe(true)
    expect(parsed.preview.cleanup_summary).toContain("archive_artifacts")
    expect(parsed.preview.readiness_summary).toContain("promote_at:0.7")
  })

  test("rejects unknown incubator keys", async () => {
    const text = getOcalExample("hard-task-incubator")!.text.replace("enabled: true", "enabled: true\n  allow_unbounded: true")
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects unbounded incubator budgets", async () => {
    const text = getOcalExample("hard-task-incubator")!.text.replace("max_passes_per_task: 7", "max_passes_per_task: .inf")
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects main worktree writes before promotion", async () => {
    const text = getOcalExample("hard-task-incubator")!.text.replace("writes: scratch_only", "writes: main_worktree")
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects prototype without isolation or scratch", async () => {
    const text = getOcalExample("safe-prototype-promotion")!.text.replace("writes: isolated_worktree", "writes: main_worktree")
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects idea count above configured parallel cap", async () => {
    const text = getOcalExample("hard-task-incubator")!.text.replace("count: 3", "count: 4")
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  // ─── v1.1 capability tests ────────────────────────────────────────────

  test("accepts a valid on handler block", async () => {
    const text = makeOcal(`
on:
  - signal: no_progress
    count_gte: 2
    do:
      - switch_agent: plan
  - signal: error
    do:
      - pause: true`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.spec.on?.length).toBe(2)
    expect(parsed.preview.on_handler_count).toBe(2)
  })

  test("rejects on handler with empty do list", async () => {
    const text = makeOcal(`
on:
  - signal: no_progress
    do: []`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects on handler with invalid count_gte", async () => {
    const text = makeOcal(`
on:
  - signal: error
    count_gte: 0
    do:
      - abort: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid fan_out block", async () => {
    const text = makeOcal(`
fan_out:
  strategy: map_reduce
  split:
    items: ["auth", "database", "api"]
  worker:
    agent: build
    isolation: git_worktree
    max_parallel: 3
  reduce:
    strategy: merge_all
  on_partial_failure: continue`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.spec.fan_out).toBeDefined()
    expect(parsed.preview.fan_out_enabled).toBe(true)
    expect(parsed.preview.fan_out_summary).toContain("merge_all")
  })

  test("rejects fan_out best_score without score_key", async () => {
    const text = makeOcal(`
fan_out:
  split:
    items: ["a"]
  worker:
    agent: build
  reduce:
    strategy: best_score`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects fan_out with non-positive max_parallel", async () => {
    const text = makeOcal(`
fan_out:
  split:
    items: ["a"]
  worker:
    max_parallel: 0
  reduce:
    strategy: merge_all`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid guardrails block", async () => {
    const text = makeOcal(`
guardrails:
  input:
    - name: no-force-push
      deny_patterns: ["git push --force"]
      action: block
  output:
    - name: type-safety
      shell: "npx tsgo --noEmit"
      on_fail: retry
      max_retries: 2`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.spec.guardrails).toBeDefined()
    expect(parsed.preview.guardrail_count).toBe(2)
    expect(parsed.preview.guardrails_summary).toContain("input:1")
  })

  test("rejects guardrails with empty deny_patterns", async () => {
    const text = makeOcal(`
guardrails:
  input:
    - name: bad
      deny_patterns: []
      action: block`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid assertions block", async () => {
    const text = makeOcal(`
assertions:
  require_structured_output: true
  on_invalid: retry
  max_retries: 2`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.spec.assertions?.require_structured_output).toBe(true)
    expect(parsed.preview.assertions_enabled).toBe(true)
  })

  test("accepts a valid retry block", async () => {
    const text = makeOcal(`
retry:
  default:
    max_attempts: 3
    backoff: exponential
    initial_delay: 2s
    jitter: true
  overrides:
    shell_checks:
      max_attempts: 5
      backoff: linear`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.spec.retry).toBeDefined()
    expect(parsed.preview.retry_enabled).toBe(true)
  })

  test("rejects retry with non-positive max_attempts", async () => {
    const text = makeOcal(`
retry:
  default:
    max_attempts: 0`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid hooks block", async () => {
    const text = makeOcal(`
hooks:
  on_start:
    - run: "git fetch origin main"
  before_iteration:
    - run: "git rebase origin/main --autostash"
      on_fail: pause
  after_checkpoint:
    - run: "echo done"
      on_fail: warn`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.spec.hooks).toBeDefined()
    expect(parsed.preview.hook_count).toBe(3)
    expect(parsed.preview.hooks_summary).toContain("on_start:1")
  })

  test("accepts a valid constraints block", async () => {
    const text = makeOcal(`
constraints:
  - name: test-count-stable
    check:
      shell: "bun test --dry-run 2>&1 | grep -c test"
    baseline: capture_on_start
    invariant: gte_baseline
    on_violation: pause
  - name: no-binaries
    check:
      shell: "find src/ -name '*.bin' | wc -l"
    invariant: equals_zero
    on_violation: block`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.spec.constraints?.length).toBe(2)
    expect(parsed.preview.constraint_count).toBe(2)
    expect(parsed.preview.constraints_summary).toContain("test-count-stable:gte_baseline")
  })

  test("rejects constraints with duplicate names", async () => {
    const text = makeOcal(`
constraints:
  - name: dup
    check:
      shell: "echo 1"
    invariant: equals_zero
  - name: dup
    check:
      shell: "echo 2"
    invariant: non_zero`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects constraint with baseline incompatible with equals_zero", async () => {
    const text = makeOcal(`
constraints:
  - name: bad
    check:
      shell: "echo 0"
    baseline: capture_on_start
    invariant: equals_zero`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts full-featured v1.1 example", async () => {
    const parsed = await Effect.runPromise(parseOcal(getOcalExample("full-v1.1-kitchen-sink")!.text))
    expect(parsed.spec.on?.length).toBeGreaterThan(0)
    expect(parsed.spec.guardrails).toBeDefined()
    expect(parsed.spec.hooks).toBeDefined()
    expect(parsed.spec.constraints?.length).toBeGreaterThan(0)
    expect(parsed.preview.on_handler_count).toBeGreaterThan(0)
    expect(parsed.preview.guardrail_count).toBeGreaterThan(0)
    expect(parsed.preview.hook_count).toBeGreaterThan(0)
    expect(parsed.preview.constraint_count).toBeGreaterThan(0)
  })
})

/** Helper: produce a minimal armed OCAL block with extra YAML appended */
function makeOcal(extra: string) {
  const body = `version: v1
intent: daemon
confirm: RUN_FOREVER
job:
  name: test
  objective: test
stop:
  all:
    - shell:
        command: "true"
        timeout: 1s
${extra.replace(/^\n/, "")}`
  return `<<<OCAL v1:daemon id=test>>>
${body}
<<<END_OCAL id=test>>>
OCAL_ARM RUN_FOREVER id=test`
}
