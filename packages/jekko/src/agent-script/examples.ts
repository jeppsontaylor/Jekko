// jankurai:allow HLT-000-SCORE-DIMENSION reason=examples-file-contains-parallel-zyal-templates-by-design expires=2027-01-01
export type ZyalExample = {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly text: string
}

function wrap(id: string, body: string) {
  return `<<<ZYAL v1:daemon id=${id}>>>\nversion: v1\nintent: daemon\nconfirm: RUN_FOREVER\n\n${body.trim()}\n<<<END_ZYAL id=${id}>>>\nZYAL_ARM RUN_FOREVER id=${id}\n`
}

function example(id: string, title: string, description: string, body: string): ZyalExample {
  return { id, title, description, text: wrap(id, body) }
}

export const ZYAL_EXAMPLES: Record<string, ZyalExample> = {
  "jankurai-clean-worktree": example(
    "jankurai-clean-worktree",
    "Jankurai dirty worktree hardening",
    "Audit uncommitted work, fix regressions, verify, and checkpoint.",
    `job:
  name: "Jankurai dirty worktree hardening"
  objective: |
    Investigate all uncommitted work. Fix regressions. Run confidence checks.
    Commit and push completed verified work.

loop:
  policy: forever
  sleep: 5s
  continue_on: [assistant_stop, max_steps, compaction]
  pause_on: [checkpoint_failed, no_progress]
  circuit_breaker:
    max_consecutive_errors: 3
    on_trip: pause

stop:
  all:
    - git_clean:
        allow_untracked: false

checkpoint:
  when: after_verified_change
  noop_if_clean: true
  verify:
    - command: "bun test --timeout 30000 packages/jekko/test/session/daemon-runtime.test.ts"
  git:
    add: ["."]
    commit_message: "jankurai: daemon verified work item"
    push: allow

permissions:
  shell: allow
  edit: allow
  git_commit: allow
  git_push: allow
  workers: allow
  mcp: allow

ui:
  theme: jekko-gold
  banner: forever`,
  ),

  "until-file-contains-done": example(
    "until-file-contains-done",
    "Wait for file sentinel",
    "Loop until a file contains the required text.",
    `job:
  name: "Wait for DONE"
  objective: "Keep checking the target file until it contains DONE."

loop:
  policy: forever
  sleep: 2s

stop:
  all:
    - shell:
        command: "test -f target.txt && grep -q DONE target.txt"
        timeout: 5s`,
  ),

  "fix-until-tests-pass": example(
    "fix-until-tests-pass",
    "Fix until tests pass",
    "Repair code until the test command succeeds.",
    `job:
  name: "Fix until tests pass"
  objective: "Make the failing tests pass without widening permissions."

stop:
  all:
    - shell:
        command: "bun test --timeout 30000"
        timeout: 30s
        assert:
          exit_code: 0`,
  ),

  "multi-worker-audit": example(
    "multi-worker-audit",
    "Multi worker audit",
    "Split work between workers and verify results.",
    `job:
  name: "Audit and repair"
  objective: "Inspect all findings, delegate isolated fixes, and verify the tree."

agents:
  workers:
    - id: fixers
      count: 3
      agent: build
      isolation: git_worktree

stop:
  all:
    - git_clean:
        allow_untracked: false`,
  ),

  "mcp-health-loop": example(
    "mcp-health-loop",
    "MCP health loop",
    "Keep running until required MCP servers are healthy.",
    `job:
  name: "MCP health loop"
  objective: "Retry until the required MCP profile is healthy."

mcp:
  profiles:
    default:
      servers: ["filesystem"]
      tools: ["read"]
      resources: ["/tmp"]

stop:
  all:
    - shell:
        command: "true"
        timeout: 1s`,
  ),

  "hard-task-incubator": example(
    "hard-task-incubator",
    "Hard task incubator",
    "Route repeated failures and risky paths into bounded incubator passes.",
    `job:
  name: "ZYAL incubator hard task loop"
  objective: "Mature risky daemon runtime tasks before implementation."

loop:
  policy: forever
  sleep: 5s

stop:
  all:
    - git_clean:
        allow_untracked: false

incubator:
  enabled: true
  strategy: generate_pool_strengthen
  route_when:
    any:
      - repeated_attempts_gte: 2
      - no_progress_iterations_gte: 2
      - risk_score_gte: 0.7
      - touches_paths:
          - "packages/jekko/src/session/**"
          - "db/migrations/**"
  exclude_when:
    any:
      - readiness_score_lt: 0.25
      - touches_paths:
          - "docs/**"
  budget:
    max_passes_per_task: 7
    max_rounds_per_task: 2
    max_active_tasks: 1
    max_parallel_idea_passes: 3
  scratch:
    storage: sqlite
    mirror: true
    cleanup: summarize_and_archive
  cleanup:
    summarize_to_task_memory: true
    archive_artifacts: true
    delete_scratch: true
    delete_unmerged_worktrees: true
  readiness:
    promote_at: 0.78
    tests_identified_gte: 1
    scope_bounded_gte: 1
    plan_reviewed_gte: 1
    prototype_validated_gte: 1
    rollback_known_gte: 1
    affected_files_known_gte: 1
    critical_objections_resolved_gte: 1
    model_confidence_cap: 0.06
  passes:
    - id: blind-scout
      type: scout
      context: blind
      writes: scratch_only
    - id: ideas
      type: idea
      context: blind
      count: 3
      writes: scratch_only
    - id: strengthen-best
      type: strengthen
      context: inherit
      reads: [current_best]
      writes: scratch_only
    - id: red-team
      type: critic
      context: pool
      reads: [candidate_pool]
      writes: scratch_only
    - id: synthesize
      type: synthesize
      context: pool
      reads: [candidate_pool, objections]
      writes: scratch_only
    - id: promotion-review
      type: promotion_review
      context: promotion
      writes: scratch_only
  promotion:
    promote_at: 0.78
    require:
      - problem_statement
      - current_best_plan
      - verification_strategy
      - risk_review
    block_on:
      unresolved_critical_objections_gte: 1
    on_promote: move_to_ready_queue
    on_exhausted: park_with_summary`,
  ),

  "concept-strengthening-pool": example(
    "concept-strengthening-pool",
    "Concept strengthening pool",
    "Generate several ideas, critique the pool, then synthesize the strongest packet.",
    `job:
  name: "Strengthen design concepts"
  objective: "Explore competing ideas and promote only evidence-backed implementation packets."

stop:
  all:
    - shell:
        command: "true"
        timeout: 1s

incubator:
  enabled: true
  strategy: generate_pool_strengthen
  route_when:
    any:
      - readiness_score_lt: 0.62
      - risk_score_gte: 0.7
  exclude_when:
    all:
      - repeated_attempts_gte: 0
  budget:
    max_passes_per_task: 6
    max_rounds_per_task: 1
    max_active_tasks: 1
    max_parallel_idea_passes: 3
  scratch:
    storage: sqlite
    mirror: true
    cleanup: summarize_and_archive
  cleanup:
    summarize_to_task_memory: true
    archive_artifacts: true
  passes:
    - id: ideas
      type: idea
      context: blind
      count: 3
      writes: scratch_only
    - id: critic
      type: critic
      context: pool
      reads: [candidate_pool]
      writes: scratch_only
    - id: strengthen
      type: strengthen
      context: strengthen
      reads: [current_best, objections]
      writes: scratch_only
    - id: synthesize
      type: synthesize
      context: pool
      reads: [candidate_pool, objections]
      writes: scratch_only
  promotion:
    promote_at: 0.8
    require: [problem_statement, current_best_plan, verification_strategy, risk_review]
    on_promote: move_to_ready_queue
    on_exhausted: park_with_summary`,
  ),

  "safe-prototype-promotion": example(
    "safe-prototype-promotion",
    "Safe prototype promotion",
    "Allow prototype exploration only in an isolated git worktree.",
    `job:
  name: "Prototype before promotion"
  objective: "Create isolated evidence before promoting a risky task."

stop:
  all:
    - git_clean:
        allow_untracked: false

incubator:
  enabled: true
  strategy: bounded_passes
  route_when:
    any:
      - touches_paths:
          - "packages/jekko/src/session/**"
      - repeated_attempts_gte: 2
  exclude_when:
    any:
      - readiness_score_lt: 0.35
  budget:
    max_passes_per_task: 5
    max_rounds_per_task: 1
    max_active_tasks: 1
    max_parallel_idea_passes: 1
  scratch:
    storage: sqlite
    mirror: true
    cleanup: summarize_and_archive
  cleanup:
    summarize_to_task_memory: true
    delete_scratch: true
  readiness:
    promote_at: 0.72
    tests_identified_gte: 1
    scope_bounded_gte: 1
  passes:
    - id: scout
      type: scout
      context: blind
      writes: scratch_only
    - id: plan
      type: synthesize
      context: inherit
      writes: scratch_only
    - id: prototype
      type: prototype
      context: inherit
      reads: [current_best]
      writes: isolated_worktree
    - id: review
      type: promotion_review
      context: promotion
      writes: scratch_only
  promotion:
    promote_at: 0.78
    require: [problem_statement, current_best_plan, verification_strategy, risk_review]
    block_on:
      unresolved_critical_objections_gte: 1
    on_promote: move_to_ready_queue
    on_exhausted: park_with_summary`,
  ),

  "normal-user-incubator": example(
    "normal-user-incubator",
    "Normal user incubator preset",
    "A small bounded incubator that only wakes up for visibly risky work.",
    `job:
  name: "User-facing hard task helper"
  objective: "Stay in normal chat unless the task becomes clearly risky or repetitive."

stop:
  all:
    - shell:
        command: "true"
        timeout: 1s

incubator:
  enabled: true
  strategy: bounded_passes
  route_when:
    any:
      - repeated_attempts_gte: 2
      - no_progress_iterations_gte: 2
      - risk_score_gte: 0.65
  exclude_when:
    any:
      - readiness_score_lt: 0.2
  budget:
    max_passes_per_task: 4
    max_rounds_per_task: 1
    max_active_tasks: 1
    max_parallel_idea_passes: 2
  scratch:
    storage: sqlite
    mirror: true
    cleanup: summarize_and_archive
  cleanup:
    summarize_to_task_memory: true
    archive_artifacts: true
    delete_scratch: true
  readiness:
    promote_at: 0.7
    tests_identified_gte: 1
    scope_bounded_gte: 1
    plan_reviewed_gte: 1
  passes:
    - id: scout
      type: scout
      context: blind
      writes: scratch_only
    - id: synthesize
      type: synthesize
      context: pool
      reads: [candidate_pool]
      writes: scratch_only
    - id: review
      type: promotion_review
      context: promotion
      writes: scratch_only
  promotion:
    promote_at: 0.7
    require:
      - problem_statement
      - current_best_plan
      - verification_strategy
      - risk_review
    on_promote: move_to_ready_queue
    on_exhausted: park_with_summary`,
  ),

  "full-v1.1-kitchen-sink": example(
    "full-v1.1-kitchen-sink",
    "Full v1.1 kitchen sink",
    "All v1.1 capabilities: on handlers, fan-out, guardrails, retry, hooks, constraints.",
    `job:
  name: "v1.1 kitchen sink"
  objective: "Demonstrate all v1.1 ZYAL capabilities."

loop:
  policy: forever
  sleep: 5s

stop:
  all:
    - git_clean:
        allow_untracked: false

on:
  - signal: no_progress
    count_gte: 3
    do:
      - switch_agent: plan
  - signal: error
    message_contains: "ENOMEM"
    do:
      - pause: true
      - notify: "Out of memory detected"
  - signal: checkpoint_failed
    do:
      - incubate_current_task: true

guardrails:
  input:
    - name: no-force-push
      deny_patterns:
        - "git push --force"
        - "git push -f"
      action: block
    - name: no-drop-table
      deny_patterns:
        - "DROP TABLE"
        - "DROP DATABASE"
      action: block
  output:
    - name: type-safety
      shell: "npx tsgo --noEmit 2>&1 | tail -1"
      on_fail: retry
      max_retries: 3
  iteration:
    - name: diff-size
      shell: "git diff --stat | wc -l"
      on_fail: warn

retry:
  default:
    max_attempts: 3
    backoff: exponential
    initial_delay: 2s
    max_delay: 30s
    jitter: true
  overrides:
    shell_checks:
      max_attempts: 5
      backoff: linear
      initial_delay: 1s

hooks:
  on_start:
    - run: "git fetch origin main"
  before_iteration:
    - run: "git rebase origin/main --autostash"
      on_fail: warn
  after_checkpoint:
    - run: "echo 'checkpoint committed'"
      on_fail: continue

constraints:
  - name: test-count-stable
    check:
      shell: "bun test --dry-run 2>&1 | grep -c test"
    baseline: capture_on_start
    invariant: gte_baseline
    on_violation: pause
  - name: no-binary-files
    check:
      shell: "git diff --cached --diff-filter=A --name-only | xargs file 2>/dev/null | grep -c binary || echo 0"
    invariant: equals_zero
    on_violation: block

permissions:
  shell: allow
  edit: allow
  git_commit: allow
  git_push: allow

ui:
  theme: jekko-gold
  banner: forever`,
  ),

  "parallel-fan-out-audit": example(
    "parallel-fan-out-audit",
    "Parallel fan-out audit",
    "Split audit tasks across parallel workers and merge results.",
    `job:
  name: "Parallel audit"
  objective: "Decompose audit into parallel subtasks, merge results."

stop:
  all:
    - git_clean:
        allow_untracked: false

fan_out:
  strategy: map_reduce
  split:
    items: ["lint", "typecheck", "unit-tests", "integration-tests"]
  worker:
    agent: build
    isolation: git_worktree
    timeout: 10m
    max_parallel: 4
  reduce:
    strategy: merge_all
  on_partial_failure: continue

hooks:
  on_start:
    - run: "bun install"`,
  ),

  "guardrailed-ci-daemon": example(
    "guardrailed-ci-daemon",
    "Guardrailed CI daemon",
    "Automated CI fixes with safety guardrails and structured assertions.",
    `job:
  name: "Safe CI fixer"
  objective: "Fix CI failures with guardrails preventing dangerous operations."

loop:
  policy: forever
  sleep: 10s

stop:
  all:
    - shell:
        command: "bun test --timeout 30000"
        timeout: 60s
        assert:
          exit_code: 0

guardrails:
  input:
    - name: no-force-push
      deny_patterns: ["git push --force", "git push -f"]
      action: block
    - name: no-secrets
      # jankurai:allow HLT-010-SECRET-SPRAWL reason=deny-pattern-list-not-leaked-token expires=2026-12-31
      deny_patterns: ["example-secret-", "example-aws-key-"]
      scope: tool_output
      action: block
  output:
    - name: lint-check
      shell: "bun run lint 2>&1 | tail -1"
      on_fail: retry
      max_retries: 2

assertions:
  require_structured_output: true
  on_invalid: retry
  max_retries: 2

constraints:
  - name: migration-stability
    check:
      shell: "ls db/migrations/ 2>/dev/null | wc -l"
    baseline: capture_on_start
    invariant: gte_baseline
    on_violation: abort

permissions:
  shell: allow
  edit: allow
  git_commit: allow`,
  ),

  "v2-workflow-driven": example(
    "v2-workflow-driven",
    "Workflow-driven feature implementation",
    "Evidence-gated state machine with memory, approvals, and proof bundles.",
    `job:
  name: v2-workflow-feature
  objective: Implement a feature using workflow-driven orchestration
  risk: medium

stop:
  all:
    - git_clean: {}

workflow:
  type: state_machine
  initial: discover
  states:
    discover:
      agent: plan
      writes: scratch_only
      produces:
        - impact_map
        - task_graph
      transitions:
        - to: plan
          when:
            evidence_exists: impact_map
    plan:
      agent: plan
      writes: scratch_only
      requires:
        - impact_map
      produces:
        - change_plan
        - test_plan
        - rollback_plan
      approval: plan_review
      transitions:
        - to: implement
          when:
            approval_granted: plan_review
    implement:
      agent: build
      writes: isolated_worktree
      requires:
        - change_plan
        - test_plan
      produces:
        - code_changes
        - test_results
      transitions:
        - to: verify
          when:
            all_checks_pass: true
        - to: plan
          when:
            checks_failed: true
    verify:
      agent: build
      writes: none
      requires:
        - test_results
      produces:
        - verification_report
      transitions:
        - to: promote
          when:
            all_checks_pass: true
    promote:
      terminal: true
      approval: merge_review

memory:
  stores:
    task_context:
      scope: task
      retention: until_promotion
      max_entries: 100
      write_policy: append_only
      read_policy: inject_at_start
    lessons_learned:
      scope: global
      retention: permanent
      write_policy: upsert
      read_policy: on_demand
      searchable: true
  redaction:
    # jankurai:allow HLT-010-SECRET-SPRAWL reason=example-redaction-pattern-not-leaked-token expires=2027-01-01
    patterns:
      - "example-secret-*"
      - "example-aws-key-*"
    action: mask
  provenance:
    track_source: true
    hash_chain: true

evidence:
  require_before_promote:
    - type: test_results
      must_pass: true
    - type: affected_files
      must_be_known: true
    - type: rollback_plan
      must_exist: true
    - type: risk_delta
      max_increase: 0.1
  bundle_format: json
  sign: sha256
  archive: true

approvals:
  gates:
    plan_review:
      required_role: tech_lead
      timeout: 24h
      on_timeout: pause
      decisions:
        - approve
        - reject
        - edit
      auto_approve_if:
        risk_score_lt: 0.3
        all_checks_pass: true
    merge_review:
      required_role: code_owner
      require_evidence:
        - test_results
        - rollback_plan
  escalation:
    chain:
      - tech_lead
      - staff_engineer
    auto_escalate_after: 48h

permissions:
  shell: allow
  edit: allow
  git_commit: allow
  git_push: deny`,
  ),

  "control-plane-preview": example(
    "control-plane-preview",
    "Control-plane preview contract",
    "Preview-only control-plane blocks with fail-closed unsupported feature policy.",
    `job:
  name: "Control-plane preview"
  objective: |
    Demonstrate the preview-only control-plane blocks without granting any
    runtime execution surface. The host should parse, preview, and summarize
    these contracts before any arming decision.
  risk:
    - Preview contract only; no runtime execution requested

stop:
  all:
    - git_clean:
        allow_untracked: false

arming:
  preview_hash_required: true
  host_nonce_required: true
  reject_inside_code_fence: true
  reject_from: [assistant_output, tool_output, web_content, mcp_resource, issue_comment, repo_files]
  accepted_origins: [trusted_user_message, signed_cli_input, host_ui_button]
  preview_expires_after: 10m
  arm_token_single_use: true
  bound_to: ["script_hash", "user_id", "repo", "branch"]

interop:
  protocols:
    - name: mcp
      target: host_tools
      version: v1
      notes: "Read-only host tool bridge"
    - name: a2a
      target: worker_fleet
      version: v0
      notes: "Preview negotiation only"
  adapters:
    - zyal-daemon
    - jnoccio
  compile_to:
    - run_card
    - capability_matrix
    - preview_bundle

runtime:
  mode: preview
  workspace: isolated_worktree
  network: deny
  env: [JEKKO_HOME, RUN_ID]
  resources:
    cpu: "2"
    memory: "4Gi"
    disk: "1Gi"
    processes: 8

capability_negotiation:
  host: jekko-daemon
  required: [interop, runtime, memory_kernel, evidence_graph]
  optional: [release, roles, channels, unsupported_preview_hooks]
  fail_closed: true
  degrade_to: preview_card

memory_kernel:
  stores:
    task_context:
      scope: task
      retention: until_promotion
      searchable: true
    design_notes:
      scope: global
      retention: permanent
      searchable: true
  redaction:
    # jankurai:allow HLT-010-SECRET-SPRAWL reason=example-redaction-pattern-not-leaked-token expires=2027-01-01
    patterns: ["example-secret-*", "example-gh-token-*", "example-aws-key-*"]
    action: mask
  provenance:
    track_source: true
    hash_chain: true

evidence_graph:
  nodes:
    preview_bundle:
      type: proof_bundle
      required: true
    runtime_contract:
      type: host_contract
      required: true
    release_candidate:
      type: host_gate
  edges:
    - from: preview_bundle
      to: runtime_contract
      kind: validates
    - from: runtime_contract
      to: release_candidate
      kind: gates
  merge_witness: preview_bundle

trust:
  zones:
    trusted_user_prompt:
      paths: ["prompt", "cli"]
      taint: clean
      require_approval: false
    assistant_output:
      paths: ["assistant", "tool"]
      taint: tainted
      require_approval: true
  on_taint: pause
  notes: "Preview contracts do not inherit trust from assistant output."

taint:
  default_label: external
  labels:
    trusted_user:
      rank: high
      notes: "Direct human operator input."
    external:
      rank: untrusted
      notes: "Web, issue, tool, MCP, or remote-agent content."
    hostile_instruction:
      rank: hostile
      notes: "Detected prompt-injection or delegated-authority text."
  forbid:
    - from: [external, hostile_instruction]
      cannot: [arm, approve, grant_capability, exec_shell, expose_secret]
      unless: [human_review, signed_sanitizer]
  prompt_injection:
    detect_patterns:
      - "[Ii]gnore (all )?previous instructions"
      - "[Rr]eveal (the )?(secret|token|key)"
    on_detect: pause
    scan_sources: [web_content, issue_comment, mcp_resource, tool_output]

requirements:
  must:
    - parse_successfully
    - summarize_all_preview_blocks
    - fail_closed_for_unknown_required_features
  should:
    - keep_runtime_mode_preview_only
    - keep_network_denied
  avoid:
    - runtime_side_effects
    - code_fence_wrapping

evaluation:
  metrics:
    - name: parse_latency_ms
      command: "bun test packages/jekko/src/agent-script/parser.test.ts"
      threshold: 5000
    - name: preview_summary_complete
      command: "bun run --filter @jekko-ai/jekko typecheck"
      threshold: 1
  compare: baseline

release:
  channel: preview
  version: 0.0.0-preview
  gates: [parse_success, preview_summary_complete]
  notes: "Preview-only contract for schema and parser coverage."

roles:
  list:
    - id: host
      agent: plan
      permissions: [read, preview]
      description: "Host evaluates and previews the contract."
    - id: reviewer
      agent: critic
      permissions: [read]
      description: "Human or critic reviews the preview bundle."

channels:
  list:
    - id: prompt
      kind: input
      route: prompt_preview
      approval: review_required
    - id: daemon
      kind: status
      route: daemon_preview
    - id: report
      kind: artifact
      route: preview_bundle

imports:
  list:
    - source: "docs/ZYAL/examples/08-full-power-runbook.zyal.yml"
      optional: true
    - source: "zyal://stdlib/control-plane-preview@1"
      optional: true
      pin: "1"

reasoning_privacy:
  store_reasoning: false
  redact_chain_of_thought: true
  summaries_only: true

unsupported_feature_policy:
  required: [interop, runtime, capability_negotiation, memory_kernel, evidence_graph, trust, taint, requirements, evaluation, release, roles, channels, imports, reasoning_privacy]
  optional: [unsupported_preview_hooks]
  fail_closed: true
  on_missing: reject`,
  ),

}

export function listZyalExamples() {
  return Object.values(ZYAL_EXAMPLES)
}

export function getZyalExample(id: string) {
  return ZYAL_EXAMPLES[id]
}
