export type OcalExample = {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly text: string
}

function wrap(id: string, body: string) {
  return `<<<OCAL v1:daemon id=${id}>>>\n${body.trim()}\n<<<END_OCAL id=${id}>>>\nOCAL_ARM RUN_FOREVER id=${id}\n`
}

export const OCAL_EXAMPLES: Record<string, OcalExample> = {
  "jankurai-clean-worktree": {
    id: "jankurai-clean-worktree",
    title: "Jankurai dirty worktree hardening",
    description: "Audit uncommitted work, fix regressions, verify, and checkpoint.",
    text: wrap(
      "jankurai-clean-worktree",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: "Jankurai dirty worktree hardening"
  objective: |
    Investigate all uncommitted work. Fix regressions. Run confidence checks.
    Commit and push completed verified work.

loop:
  policy: forever
  sleep: 5s
  continue_on: [assistant_stop, max_steps, compaction]
  pause_on: [permission_denied, checkpoint_failed, no_progress]
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
    - command: "bun test --timeout 30000 packages/opencode/test/session/daemon-runtime.test.ts"
  git:
    add: ["."]
    commit_message: "jankurai: daemon verified work item"
    push: ask

permissions:
  shell: ask
  edit: allow
  git_commit: ask
  git_push: ask
  workers: ask
  mcp: ask

ui:
  theme: opencode-gold
  banner: forever`,
    ),
  },
  "until-file-contains-done": {
    id: "until-file-contains-done",
    title: "Wait for file sentinel",
    description: "Loop until a file contains the required text.",
    text: wrap(
      "until-file-contains-done",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
  },
  "fix-until-tests-pass": {
    id: "fix-until-tests-pass",
    title: "Fix until tests pass",
    description: "Repair code until the test command succeeds.",
    text: wrap(
      "fix-until-tests-pass",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
  },
  "multi-worker-audit": {
    id: "multi-worker-audit",
    title: "Multi worker audit",
    description: "Split work between workers and verify results.",
    text: wrap(
      "multi-worker-audit",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
  },
  "mcp-health-loop": {
    id: "mcp-health-loop",
    title: "MCP health loop",
    description: "Keep running until required MCP servers are healthy.",
    text: wrap(
      "mcp-health-loop",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
  },
  "hard-task-incubator": {
    id: "hard-task-incubator",
    title: "Hard task incubator",
    description: "Route repeated failures and risky paths into bounded incubator passes.",
    text: wrap(
      "hard-task-incubator",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: "OCAL incubator hard task loop"
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
          - "packages/opencode/src/session/**"
          - "packages/opencode/migration/**"
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
  },
  "concept-strengthening-pool": {
    id: "concept-strengthening-pool",
    title: "Concept strengthening pool",
    description: "Generate several ideas, critique the pool, then synthesize the strongest packet.",
    text: wrap(
      "concept-strengthening-pool",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
  },
  "safe-prototype-promotion": {
    id: "safe-prototype-promotion",
    title: "Safe prototype promotion",
    description: "Allow prototype exploration only in an isolated git worktree.",
    text: wrap(
      "safe-prototype-promotion",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
          - "packages/opencode/src/session/**"
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
  },
  "normal-user-incubator": {
    id: "normal-user-incubator",
    title: "Normal user incubator preset",
    description: "A small bounded incubator that only wakes up for visibly risky work.",
    text: wrap(
      "normal-user-incubator",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
  },
  "full-v1.1-kitchen-sink": {
    id: "full-v1.1-kitchen-sink",
    title: "Full v1.1 kitchen sink",
    description: "All v1.1 capabilities: on handlers, fan-out, guardrails, retry, hooks, constraints.",
    text: wrap(
      "full-v1.1-kitchen-sink",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: "v1.1 kitchen sink"
  objective: "Demonstrate all v1.1 OCAL capabilities."

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
  shell: ask
  edit: allow
  git_commit: ask
  git_push: ask

ui:
  theme: opencode-gold
  banner: forever`,
    ),
  },
  "parallel-fan-out-audit": {
    id: "parallel-fan-out-audit",
    title: "Parallel fan-out audit",
    description: "Split audit tasks across parallel workers and merge results.",
    text: wrap(
      "parallel-fan-out-audit",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
  },
  "guardrailed-ci-daemon": {
    id: "guardrailed-ci-daemon",
    title: "Guardrailed CI daemon",
    description: "Automated CI fixes with safety guardrails and structured assertions.",
    text: wrap(
      "guardrailed-ci-daemon",
      `version: v1
intent: daemon
confirm: RUN_FOREVER

job:
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
      deny_patterns: ["sk-", "AKIA"]
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
      shell: "ls migration/ 2>/dev/null | wc -l"
    baseline: capture_on_start
    invariant: gte_baseline
    on_violation: abort

permissions:
  shell: ask
  edit: allow
  git_commit: ask`,
    ),
  },
}

export function listOcalExamples() {
  return Object.values(OCAL_EXAMPLES)
}

export function getOcalExample(id: string) {
  return OCAL_EXAMPLES[id]
}
