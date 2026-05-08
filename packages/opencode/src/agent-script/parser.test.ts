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

// ─── v2 parser tests ────────────────────────────────────────────────────────

describe("OCAL parser v2", () => {
  test("accepts a valid workflow block", async () => {
    const text = makeOcal(`
workflow:
  type: state_machine
  initial: discover
  states:
    discover:
      agent: plan
      writes: scratch_only
      produces:
        - impact_map
      transitions:
        - to: done
          when:
            evidence_exists: impact_map
    done:
      terminal: true`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.workflow_enabled).toBe(true)
    expect(parsed.preview.workflow_summary).toContain("state_machine")
    expect(parsed.preview.workflow_summary).toContain("states:2")
  })

  test("rejects workflow with invalid initial state", async () => {
    const text = makeOcal(`
workflow:
  type: state_machine
  initial: nonexistent
  states:
    a:
      terminal: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects workflow with invalid transition target", async () => {
    const text = makeOcal(`
workflow:
  type: state_machine
  initial: a
  states:
    a:
      transitions:
        - to: nonexistent
          when:
            all_checks_pass: true
    b:
      terminal: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects workflow with terminal state having transitions", async () => {
    const text = makeOcal(`
workflow:
  type: state_machine
  initial: a
  states:
    a:
      terminal: true
      transitions:
        - to: a
          when:
            all_checks_pass: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects workflow with no terminal state", async () => {
    const text = makeOcal(`
workflow:
  type: state_machine
  initial: a
  states:
    a:
      transitions:
        - to: a
          when:
            all_checks_pass: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects workflow with unknown nested keys", async () => {
    const text = makeOcal(`
workflow:
  type: state_machine
  initial: a
  bogus: true
  states:
    a:
      terminal: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid memory block", async () => {
    const text = makeOcal(`
memory:
  stores:
    task_context:
      scope: task
      retention: until_promotion
      max_entries: 100
      write_policy: append_only
      read_policy: inject_at_start
    lessons:
      scope: global
      retention: permanent
  redaction:
    patterns:
      - "sk-*"
    action: mask
  provenance:
    track_source: true
    hash_chain: true`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.memory_store_count).toBe(2)
    expect(parsed.preview.memory_summary).toContain("task_context:task")
  })

  test("rejects memory with unknown store keys", async () => {
    const text = makeOcal(`
memory:
  stores:
    ctx:
      scope: task
      retention: permanent
      bogus: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid evidence block", async () => {
    const text = makeOcal(`
evidence:
  require_before_promote:
    - type: test_results
      must_pass: true
    - type: affected_files
      must_be_known: true
    - type: risk_delta
      max_increase: 0.1
  bundle_format: json
  sign: sha256
  archive: true`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.evidence_enabled).toBe(true)
    expect(parsed.preview.evidence_summary).toContain("test_results")
  })

  test("rejects evidence with duplicate types", async () => {
    const text = makeOcal(`
evidence:
  require_before_promote:
    - type: test_results
      must_pass: true
    - type: test_results
      must_exist: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects evidence with empty type", async () => {
    const text = makeOcal(`
evidence:
  require_before_promote:
    - type: ""
      must_pass: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid approvals block", async () => {
    const text = makeOcal(`
approvals:
  gates:
    plan_review:
      required_role: tech_lead
      timeout: 24h
      on_timeout: pause
      decisions:
        - approve
        - reject
      auto_approve_if:
        risk_score_lt: 0.3
        all_checks_pass: true
    merge_review:
      required_role: code_owner
  escalation:
    chain:
      - tech_lead
      - director
    auto_escalate_after: 48h`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.approval_gate_count).toBe(2)
    expect(parsed.preview.approvals_summary).toContain("plan_review:tech_lead")
  })

  test("rejects approvals with unknown gate keys", async () => {
    const text = makeOcal(`
approvals:
  gates:
    review:
      required_role: admin
      bogus: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("validates approval gate references in workflow", async () => {
    const text = makeOcal(`
workflow:
  type: state_machine
  initial: a
  states:
    a:
      approval: missing_gate
      transitions:
        - to: b
          when:
            approval_granted: missing_gate
    b:
      terminal: true
approvals:
  gates:
    other_gate:
      required_role: admin`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts combined v2 blocks", async () => {
    const text = makeOcal(`
workflow:
  type: pipeline
  initial: plan
  states:
    plan:
      agent: plan
      produces:
        - plan_doc
      transitions:
        - to: done
          when:
            evidence_exists: plan_doc
    done:
      terminal: true
memory:
  stores:
    ctx:
      scope: run
      retention: session
evidence:
  require_before_promote:
    - type: test_results
      must_pass: true
approvals:
  gates:
    final_review:
      required_role: admin`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.workflow_enabled).toBe(true)
    expect(parsed.preview.memory_store_count).toBe(1)
    expect(parsed.preview.evidence_enabled).toBe(true)
    expect(parsed.preview.approval_gate_count).toBe(1)
  })
})

// ─── v2 wave 2 parser tests ─────────────────────────────────────────────────

describe("OCAL parser v2 wave 2", () => {
  test("accepts a valid skills block", async () => {
    const text = makeOcal(`
skills:
  registry:
    code_review:
      description: Review code
      agent: plan
      tools:
        - read_file
        - grep_search
      trust: builtin
      writes: none
    test_writer:
      description: Write tests
      trust: verified
      writes: isolated_worktree
  allow_creation: true
  max_skills: 10`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.skills_count).toBe(2)
    expect(parsed.preview.skills_summary).toContain("code_review:builtin")
  })

  test("rejects skills with unknown nested keys", async () => {
    const text = makeOcal(`
skills:
  registry:
    my_skill:
      description: test
      bogus: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects skills with non-positive max_skills", async () => {
    const text = makeOcal(`
skills:
  max_skills: 0`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid sandbox block", async () => {
    const text = makeOcal(`
sandbox:
  paths:
    - path: src/
      access: write
    - path: /etc
      access: deny
  network:
    outbound: allowlist
    allowlist:
      - api.openai.com
      - "*.github.com"
  resources:
    max_file_size: 10MB
    max_total_disk: 1GB
    max_processes: 4
  env_inherit:
    - HOME
    - PATH
  env_deny:
    - AWS_SECRET_KEY`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.sandbox_enabled).toBe(true)
    expect(parsed.preview.sandbox_summary).toContain("paths:2")
    expect(parsed.preview.sandbox_summary).toContain("net:allowlist")
  })

  test("rejects sandbox with unknown nested keys", async () => {
    const text = makeOcal(`
sandbox:
  paths:
    - path: src/
      access: write
      bogus: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects sandbox with allowlist but wrong outbound", async () => {
    const text = makeOcal(`
sandbox:
  network:
    outbound: deny
    allowlist:
      - example.com`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects sandbox with empty path", async () => {
    const text = makeOcal(`
sandbox:
  paths:
    - path: ""
      access: write`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid security block", async () => {
    const text = makeOcal(`
security:
  trust_zones:
    critical:
      paths:
        - src/auth
        - src/payments
      require_approval: true
      max_risk_score: 0.3
  injection:
    scan_inputs: true
    scan_outputs: true
    deny_patterns:
      - "eval("
      - "system("
    on_detect: abort
  secrets:
    allowed_env:
      - API_KEY
    redact_from_logs: true
    rotate_after: 30d`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.security_enabled).toBe(true)
    expect(parsed.preview.security_summary).toContain("zones:1")
    expect(parsed.preview.security_summary).toContain("scan:input")
  })

  test("rejects security with unknown nested keys", async () => {
    const text = makeOcal(`
security:
  trust_zones:
    zone1:
      paths:
        - src/
      bogus: true`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects security with empty deny pattern", async () => {
    const text = makeOcal(`
security:
  injection:
    scan_inputs: true
    deny_patterns:
      - ""`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts a valid observability block", async () => {
    const text = makeOcal(`
observability:
  spans:
    emit: all
    include_tool_calls: true
    include_model_calls: true
  metrics:
    - name: tool_calls
      type: counter
      source: runtime
    - name: risk_score
      type: gauge
      source: analysis
  cost:
    budget: 10.0
    currency: USD
    alert_at_percent: 80
    on_budget_exceeded: pause
  report:
    format: json
    on_complete: true
    include:
      - spans
      - costs`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.observability_enabled).toBe(true)
    expect(parsed.preview.observability_summary).toContain("spans:all")
    expect(parsed.preview.observability_summary).toContain("metrics:2")
    expect(parsed.preview.observability_summary).toContain("budget:$10")
  })

  test("rejects observability with duplicate metric names", async () => {
    const text = makeOcal(`
observability:
  metrics:
    - name: x
      type: counter
      source: a
    - name: x
      type: gauge
      source: b`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects observability with non-positive budget", async () => {
    const text = makeOcal(`
observability:
  cost:
    budget: 0`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("rejects observability with invalid alert_at_percent", async () => {
    const text = makeOcal(`
observability:
  cost:
    budget: 10
    alert_at_percent: 150`)
    const result = await Effect.runPromiseExit(parseOcal(text))
    expect(result._tag).toBe("Failure")
  })

  test("accepts combined wave 2 blocks", async () => {
    const text = makeOcal(`
skills:
  registry:
    reviewer:
      trust: builtin
sandbox:
  paths:
    - path: src/
      access: write
security:
  injection:
    scan_inputs: true
observability:
  cost:
    budget: 50`)
    const parsed = await Effect.runPromise(parseOcal(text))
    expect(parsed.preview.skills_count).toBe(1)
    expect(parsed.preview.sandbox_enabled).toBe(true)
    expect(parsed.preview.security_enabled).toBe(true)
    expect(parsed.preview.observability_enabled).toBe(true)
  })
})
