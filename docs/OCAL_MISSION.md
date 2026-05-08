# OCAL — OpenCode Agent Language

## Vision

OCAL is the **host-enforced daemon control language** for OpenCode. It is a strict, declarative YAML runbook that lets the host — not the model — own the lifecycle of long-running agentic work. Every daemon run is bounded, observable, durable, and subject to human approval at critical gates.

OCAL solves a fundamental problem in agentic AI: **how do you let a model work autonomously for hours without losing control?** The answer is a typed control surface where the host defines what the model may do (permissions), how long it may run (budgets), what must be true before work is committed (stop conditions, guardrails, constraints), and what happens when things go wrong (circuit breakers, on-handlers, retry policies).

### Core Principles

1. **Host owns the loop.** The model never decides when to start, stop, or promote. The host evaluates stop conditions, gates promotions with evidence, and enforces budgets.
2. **Preview before arming.** Every OCAL block can be previewed without execution. The `OCAL_ARM RUN_FOREVER` sentinel is a deliberate, separate human action.
3. **SQLite is truth.** All daemon state — runs, tasks, passes, iterations, events — lives in SQLite. The `.opencode/daemon/` mirror is generated output for human inspection.
4. **Bounded by design.** Every loop has a circuit breaker. Every incubator has a budget. Every pass has a write scope. There are no unbounded swarms.
5. **Safety is structural.** Guardrails, constraints, and permissions are enforced by the runtime, not by asking the model to remember rules.

### What OCAL Is Not

- Not a prompt trick or hidden chain-of-thought store
- Not an unbounded swarm launcher
- Not a model-owned completion signal
- Not a path for assistant output to start or stop the daemon

---

## Block Structure

Every OCAL script is wrapped in sentinels:

```
<<<OCAL v1:daemon id=my-script>>>
version: v1
intent: daemon
confirm: RUN_FOREVER
# ... YAML body ...
<<<END_OCAL id=my-script>>>
OCAL_ARM RUN_FOREVER id=my-script
```

- The opening `<<<OCAL v1:daemon id=...>>>` and closing `<<<END_OCAL id=...>>>` delimit the YAML body. IDs must match.
- The trailing `OCAL_ARM RUN_FOREVER id=...` sentinel arms the script for execution. Without it, the script is preview-only.
- Code fences (`` ``` ``) around the block are rejected — the sentinels are the format.

---

## Complete Syntax Reference

### Required Keys

| Key | Type | Description |
|-----|------|-------------|
| `version` | `"v1"` | Schema version. Always `v1`. |
| `intent` | `"daemon"` | Execution mode. Always `daemon`. |
| `confirm` | `"RUN_FOREVER"` | Arming confirmation. Must match the ARM sentinel. |
| `job` | object | **`name`** (string): human-readable name. **`objective`** (string): what the daemon should accomplish. **`risk`** (string[], optional): known risks. |
| `stop` | object | **`all`** (list): conditions that must ALL be true to stop. **`any`** (list, optional): at least ONE must be true. Each condition is either `git_clean: {allow_untracked: bool}` or `shell: {command, timeout, assert: {exit_code, stdout_contains, stdout_regex, json}}`. |

### Optional Keys (38 total top-level keys)

**v1 (15):** `version`, `intent`, `confirm`, `id`, `job`, `loop`, `stop`, `context`, `checkpoint`, `tasks`, `incubator`, `agents`, `mcp`, `permissions`, `ui`.
**v1.1 (7):** `on`, `fan_out`, `guardrails`, `assertions`, `retry`, `hooks`, `constraints`.
**v2 wave 1 (4):** `workflow`, `memory`, `evidence`, `approvals`.
**v2 wave 2 (4):** `skills`, `sandbox`, `security`, `observability`.
**v2.1 power blocks (10):** `arming`, `capabilities`, `quality`, `experiments`, `models`, `budgets`, `triggers`, `rollback`, `done`, `repo_intelligence`.

#### `loop` — Iteration Policy
```yaml
loop:
  policy: forever          # once | bounded | forever
  sleep: 5s                # delay between iterations
  continue_on:             # signals that don't count as errors
    - assistant_stop
    - compaction
  pause_on:                # signals that pause the daemon
    - permission_denied
  circuit_breaker:
    max_consecutive_errors: 5
    on_trip: pause          # pause | abort
```

#### `context` — Context Window Management
```yaml
context:
  strategy: hybrid         # soft | hard | hybrid
  compact_every: 10        # compact context every N iterations
  hard_clear_every: 20     # rotate session every N iterations
  preserve:                # keys to preserve across rotations
    - "objective"
    - "progress"
```

#### `checkpoint` — Git Commit Gating
```yaml
checkpoint:
  when: after_verified_change  # after_verified_change | on_error | manual
  noop_if_clean: true
  verify:
    - command: "bun test --timeout 30000"
      timeout: 60s
      assert:
        exit_code: 0
  git:
    add: ["."]
    commit_message: "daemon: checkpoint iteration {{iteration}}"
    push: ask              # ask | allow | deny
```

#### `tasks` — Task Discovery
```yaml
tasks:
  ledger: sqlite
  discover:
    - command: "cat TODO.md | grep '- \\[ \\]'"
      timeout: 5s
```

#### `agents` — Multi-Agent Configuration
```yaml
agents:
  supervisor:
    agent: plan
  workers:
    - id: builder
      count: 2
      agent: build
      isolation: git_worktree  # git_worktree | same_session
```

#### `mcp` — MCP Server Profiles
```yaml
mcp:
  profiles:
    full:
      servers: ["filesystem", "github"]
      tools: ["read_file", "write_file", "create_pr"]
    readonly:
      servers: ["filesystem"]
      tools: ["read_file", "list_dir"]
      resources: ["repo://main"]
```

#### `permissions` — Tool Access Control
```yaml
permissions:
  shell: ask               # ask | allow | deny
  edit: allow
  git_commit: ask
  git_push: deny
  workers: allow
  mcp: ask
```

#### `ui` — TUI Customization
```yaml
ui:
  theme: opencode-gold
  banner: forever
```

#### `on` — Conditional Event Handlers
React to runtime signals with declarative actions. Signals: `assistant_stop`, `max_steps`, `compaction`, `permission_denied`, `checkpoint_failed`, `no_progress`, `tool_calls_done`, `structured_output`, `error`, `cancelled`.

```yaml
on:
  - signal: no_progress
    count_gte: 3           # fire only after 3+ occurrences
    do:
      - switch_agent: plan
      - run: "bun test --reporter=json > /tmp/diag.json"
  - signal: error
    message_contains: "ENOMEM"
    do:
      - pause: true
      - notify: "Out of memory detected"
  - signal: checkpoint_failed
    do:
      - incubate_current_task: true
  - signal: tool_calls_done
    if:                    # optional shell guard
      command: "git diff --stat --exit-code"
      assert:
        exit_code: 1       # diff exists
    do:
      - checkpoint: true
```

**Actions:** `switch_agent`, `run`, `incubate_current_task`, `checkpoint`, `pause`, `abort`, `notify`, `set_context`.

#### `fan_out` — Parallel Map-Reduce
```yaml
fan_out:
  strategy: map_reduce     # map_reduce | scatter_gather
  split:
    items: ["auth", "database", "api"]
    # OR dynamic: shell: "cat tasks.json | jq -r '.[].id'"
  worker:
    agent: build
    isolation: git_worktree
    timeout: 10m
    max_parallel: 3
  reduce:
    strategy: merge_all    # merge_all | best_score | vote | custom_shell
    # score_key: "$.readiness_score"   (for best_score)
    # command: "node merge.js"         (for custom_shell)
  on_partial_failure: continue  # continue | abort | pause
```

#### `guardrails` — Safety Validation
```yaml
guardrails:
  input:                   # block dangerous commands before execution
    - name: no-force-push
      deny_patterns: ["git push --force", "git push -f"]
      action: block        # block | retry | pause | abort | warn
    - name: no-secrets
      deny_patterns: ["sk-[a-zA-Z0-9]{20,}", "AKIA[A-Z0-9]{16}"]
      scope: tool_output   # tool_input | tool_output | file_diff | commit_message
      action: block
  output:                  # validate model output
    - name: type-safety
      shell: "npx tsgo --noEmit 2>&1 | tail -1"
      on_fail: retry
      max_retries: 3
  iteration:               # check between iterations
    - name: diff-size
      shell: "git diff --stat | wc -l"
      assert:
        exit_code: 0
      on_fail: warn
```

#### `assertions` — Structured Output Contracts
```yaml
assertions:
  require_structured_output: true
  schema:
    type: object
    properties:
      files_changed: { type: array, items: { type: string } }
      confidence: { type: number, minimum: 0, maximum: 1 }
      summary: { type: string }
    required: [files_changed, confidence, summary]
  on_invalid: retry        # retry | pause | abort | warn
  max_retries: 2
```

#### `retry` — Backoff Policies
```yaml
retry:
  default:
    max_attempts: 3
    backoff: exponential   # none | linear | exponential
    initial_delay: 2s
    max_delay: 30s
    jitter: true
  overrides:
    shell_checks:
      max_attempts: 5
      backoff: linear
      initial_delay: 1s
    checkpoint:
      max_attempts: 2
      backoff: none
    worker_spawn:
      max_attempts: 3
      backoff: exponential
      initial_delay: 5s
    stop_evaluation:
      max_attempts: 2
```

#### `hooks` — Lifecycle Commands
```yaml
hooks:
  on_start:
    - run: "git fetch origin main"
    - run: "bun install"
  before_iteration:
    - run: "git rebase origin/main --autostash"
      on_fail: pause       # pause | abort | warn | block_promotion | continue
  after_iteration:
    - run: "echo done >> .opencode/daemon/log.txt"
  before_checkpoint:
    - run: "bun run lint --fix"
  after_checkpoint:
    - run: "curl -X POST $SLACK_WEBHOOK -d '{\"text\":\"Checkpoint\"}'"
      on_fail: warn
  on_promote:
    - run: "bun test --timeout 60000"
      assert: { exit_code: 0 }
      on_fail: block_promotion
  on_exhaust:
    - run: "echo 'Budget exhausted'"
  on_stop:
    - run: "echo 'Daemon stopped' | mail -s 'Alert' $EMAIL"
      on_fail: warn
```

#### `constraints` — Runtime Invariants
```yaml
constraints:
  - name: test-count-stable
    check:
      shell: "bun test --dry-run 2>&1 | grep -c test"
      timeout: 10s
    baseline: capture_on_start  # capture_on_start | capture_on_checkpoint
    invariant: gte_baseline     # gte_baseline | lte_baseline | equals_baseline | equals_zero | non_zero
    on_violation: pause         # abort | pause | block | warn | retry
  - name: no-binary-files
    check:
      shell: "git diff --cached --diff-filter=A --name-only | xargs file 2>/dev/null | grep -c binary || echo 0"
    invariant: equals_zero
    on_violation: block
```

#### `incubator` — Hard Task Maturation
The incubator routes hard tasks through bounded strengthening passes. Each pass has a type, context mode, and write scope. Tasks are promoted only when host evidence meets the threshold.

```yaml
incubator:
  enabled: true
  strategy: generate_pool_strengthen  # generate_pool_strengthen | bounded_passes
  route_when:
    any:
      - repeated_attempts_gte: 3
      - no_progress_iterations_gte: 5
      - risk_score_gte: 0.7
  exclude_when:
    any:
      - readiness_score_lt: 0.2
  budget:
    max_passes_per_task: 7
    max_rounds_per_task: 3
    max_active_tasks: 5
    max_parallel_idea_passes: 3
  scratch:
    storage: sqlite
    mirror: true
    cleanup: summarize_and_archive  # summarize_and_archive | archive | keep
  cleanup:
    summarize_to_task_memory: true
    archive_artifacts: true
    delete_scratch: true
    delete_unmerged_worktrees: true
  readiness:
    promote_at: 0.7
    tests_identified_gte: 1
    scope_bounded_gte: 1
    plan_reviewed_gte: 1
    prototype_validated_gte: 1
    rollback_known_gte: 1
    affected_files_known_gte: 1
    critical_objections_resolved_gte: 0
    model_confidence_cap: 0.6
  passes:
    - id: scout
      type: scout
      context: blind
      writes: scratch_only
    - id: ideas
      type: idea
      context: inherit
      writes: scratch_only
      count: 3
      agent: plan
    - id: strengthen
      type: strengthen
      context: strengthen
      writes: scratch_only
      mcp_profile: full
    - id: critic
      type: critic
      context: critic
      writes: scratch_only
    - id: synthesize
      type: synthesize
      context: pool
      writes: scratch_only
    - id: prototype
      type: prototype
      context: inherit
      writes: isolated_worktree
      agent: build
      mcp_profile: full
    - id: review
      type: promotion_review
      context: promotion
      writes: scratch_only
    - id: compress
      type: compress
      context: ledger_only
      writes: scratch_only
  promotion:
    promote_at: 0.78
    require: ["tests_identified", "scope_bounded", "plan_reviewed"]
    block_on:
      unresolved_critical_objections_gte: 1
    on_promote: move_to_ready_queue
    on_exhausted: park_with_summary  # park_with_summary | block_with_summary
```

**Pass types:** `scout`, `idea`, `strengthen`, `critic`, `synthesize`, `prototype`, `promotion_review`, `compress`.
**Context modes:** `blind`, `inherit`, `strengthen`, `critic`, `pool`, `promotion`, `ledger_only`.
**Write scopes:** `scratch_only`, `isolated_worktree`.

---

## Durable State & Mirror

All runtime state is persisted in SQLite. The filesystem mirror at `.opencode/daemon/` is generated for human inspection:

```
.opencode/daemon/<runID>/
├── ledger.jsonl          # append-only event log
├── STATE.md              # human-readable run summary
└── tasks/<taskID>/
    ├── CAPSULE.md         # task context capsule
    ├── SCORE.json         # readiness scores
    └── PASSES/
        ├── 001-scout.md
        ├── 002-idea.md
        └── 003-strengthen.md
```

---

## Example 1: Fix Until Tests Pass

The simplest useful daemon — loop until `bun test` passes, commit each fix.

```yaml
<<<OCAL v1:daemon id=fix-tests>>>
version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: Fix failing tests
  objective: Make all tests pass without removing or skipping any.

loop:
  policy: forever
  sleep: 5s
  circuit_breaker:
    max_consecutive_errors: 5
    on_trip: pause

stop:
  all:
    - shell:
        command: "bun test --timeout 30000"
        timeout: 60s
        assert:
          exit_code: 0

checkpoint:
  when: after_verified_change
  noop_if_clean: true
  verify:
    - command: "bun test --timeout 30000"
      timeout: 60s
      assert:
        exit_code: 0
  git:
    add: ["."]
    push: ask

permissions:
  shell: ask
  edit: allow
  git_commit: ask
<<<END_OCAL id=fix-tests>>>
OCAL_ARM RUN_FOREVER id=fix-tests
```

## Example 2: Multi-Worker Audit with Guardrails

Parallel workers lint, typecheck, and test — with guardrails preventing dangerous operations.

```yaml
<<<OCAL v1:daemon id=guarded-audit>>>
version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: Guarded multi-worker audit
  objective: Fix all lint, type, and test errors across the codebase.
  risk:
    - Parallel workers may create merge conflicts
    - Force-push could destroy history

agents:
  supervisor:
    agent: plan
  workers:
    - id: lint-fixer
      count: 1
      agent: build
      isolation: git_worktree
    - id: type-fixer
      count: 1
      agent: build
      isolation: git_worktree

stop:
  all:
    - shell:
        command: "bun run lint && npx tsgo --noEmit && bun test"
        timeout: 120s
        assert:
          exit_code: 0

guardrails:
  input:
    - name: no-force-push
      deny_patterns: ["git push --force", "git push -f"]
      action: block
    - name: no-secrets
      deny_patterns: ["sk-[a-zA-Z0-9]{20,}", "AKIA"]
      scope: tool_output
      action: block
  output:
    - name: type-safety
      shell: "npx tsgo --noEmit 2>&1 | grep -c 'error TS' || echo 0"
      on_fail: retry
      max_retries: 2

constraints:
  - name: test-count-stable
    check:
      shell: "bun test --dry-run 2>&1 | grep -c test"
    baseline: capture_on_start
    invariant: gte_baseline
    on_violation: pause

permissions:
  shell: ask
  edit: allow
  git_commit: ask
  git_push: deny
  workers: allow
<<<END_OCAL id=guarded-audit>>>
OCAL_ARM RUN_FOREVER id=guarded-audit
```

## Example 3: Hard Task Incubator with Full Lifecycle

Routes hard tasks through 8 strengthening passes with readiness scoring and promotion gating.

```yaml
<<<OCAL v1:daemon id=incubator-full>>>
version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: Hard task incubator
  objective: Mature complex tasks through structured investigation before touching production code.

loop:
  policy: forever
  sleep: 10s
  circuit_breaker:
    max_consecutive_errors: 3
    on_trip: pause

stop:
  all:
    - git_clean:
        allow_untracked: false

on:
  - signal: no_progress
    count_gte: 5
    do:
      - switch_agent: plan
      - notify: "Switching to plan agent after 5 stalls"
  - signal: checkpoint_failed
    do:
      - incubate_current_task: true

hooks:
  on_start:
    - run: "git fetch origin main"
  before_iteration:
    - run: "git rebase origin/main --autostash"
      on_fail: warn
  on_promote:
    - run: "bun test --timeout 60000"
      assert: { exit_code: 0 }
      on_fail: block_promotion

retry:
  default:
    max_attempts: 3
    backoff: exponential
    initial_delay: 2s
    jitter: true

incubator:
  enabled: true
  strategy: generate_pool_strengthen
  route_when:
    any:
      - repeated_attempts_gte: 3
      - risk_score_gte: 0.7
  budget:
    max_passes_per_task: 7
    max_rounds_per_task: 3
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
    promote_at: 0.7
    tests_identified_gte: 1
    scope_bounded_gte: 1
    model_confidence_cap: 0.6
  passes:
    - { id: scout, type: scout, context: blind, writes: scratch_only }
    - { id: ideas, type: idea, context: inherit, writes: scratch_only, count: 3 }
    - { id: strengthen, type: strengthen, context: strengthen, writes: scratch_only }
    - { id: critic, type: critic, context: critic, writes: scratch_only }
    - { id: synthesize, type: synthesize, context: pool, writes: scratch_only }
    - { id: prototype, type: prototype, context: inherit, writes: isolated_worktree, agent: build }
    - { id: review, type: promotion_review, context: promotion, writes: scratch_only }
    - { id: compress, type: compress, context: ledger_only, writes: scratch_only }
  promotion:
    promote_at: 0.78
    require: ["tests_identified", "scope_bounded", "plan_reviewed"]
    block_on:
      unresolved_critical_objections_gte: 1
    on_promote: move_to_ready_queue
    on_exhausted: park_with_summary

permissions:
  shell: ask
  edit: allow
  git_commit: ask
<<<END_OCAL id=incubator-full>>>
OCAL_ARM RUN_FOREVER id=incubator-full
```

## Example 4: Fan-Out Parallel Audit

Decompose an audit into 4 parallel subtasks, each in its own worktree, and merge results.

```yaml
<<<OCAL v1:daemon id=fan-out-audit>>>
version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: Parallel audit sweep
  objective: Run lint, typecheck, unit tests, and integration tests in parallel, merge results.

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
    - run: "bun install"
  on_stop:
    - run: "echo 'Audit complete'"

permissions:
  shell: allow
  edit: allow
  workers: allow
<<<END_OCAL id=fan-out-audit>>>
OCAL_ARM RUN_FOREVER id=fan-out-audit
```

## Example 5: Guardrailed CI Daemon with Structured Assertions

Automated CI fixer that requires structured JSON output from the model and enforces migration stability.

```yaml
<<<OCAL v1:daemon id=safe-ci-fixer>>>
version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: Safe CI fixer
  objective: Fix CI failures with guardrails preventing dangerous operations.

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
    - name: no-drop-table
      deny_patterns: ["DROP TABLE", "DROP DATABASE"]
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
  iteration:
    - name: diff-size-check
      shell: "git diff --stat | wc -l"
      on_fail: warn

assertions:
  require_structured_output: true
  schema:
    type: object
    properties:
      files_changed: { type: array }
      confidence: { type: number, minimum: 0, maximum: 1 }
      summary: { type: string }
    required: [files_changed, confidence, summary]
  on_invalid: retry
  max_retries: 2

constraints:
  - name: migration-stability
    check:
      shell: "ls packages/opencode/migration/ 2>/dev/null | wc -l"
    baseline: capture_on_start
    invariant: gte_baseline
    on_violation: abort
  - name: no-binaries
    check:
      shell: "find src/ -name '*.bin' -o -name '*.exe' | wc -l"
    invariant: equals_zero
    on_violation: block

retry:
  default:
    max_attempts: 3
    backoff: exponential
    initial_delay: 2s
    max_delay: 30s
    jitter: true

permissions:
  shell: ask
  edit: allow
  git_commit: ask
<<<END_OCAL id=safe-ci-fixer>>>
OCAL_ARM RUN_FOREVER id=safe-ci-fixer
```

---

## Safety Invariants

These are enforced structurally by the runtime, not by the model:

1. **Preview is separate from arming.** The `OCAL_ARM` sentinel is a distinct human action.
2. **Runs are finite and host-checked.** Circuit breakers, budgets, and stop conditions are runtime-enforced.
3. **SQLite is the source of truth.** All state is durable. Mirror files are regenerated.
4. **Prototype work writes only in isolated worktrees.** `writes: isolated_worktree` is enforced for `prototype` passes.
5. **Promotion requires host evidence.** A high `readiness_score` alone cannot promote — the host checks `require` evidence fields and `block_on` conditions.
6. **Model confidence is capped.** `model_confidence_cap` prevents the model from inflating its own readiness score past a threshold.
7. **Cleanup is deliberate and recorded.** Every cleanup action is logged as a daemon event.
8. **Guardrails and constraints are runtime-enforced.** Pattern matching and invariant checks happen in the host, not in the prompt.
9. **On-handlers do not cascade.** A handler action cannot trigger another handler (max depth 1), preventing infinite loops.
10. **All daemon tools stay hidden** unless an active daemon pass explicitly allows them.

## CLI Surface

```sh
opencode daemon status          # Show active daemon runs
opencode daemon tasks <runID>   # List tasks for a run
opencode daemon pause <runID>   # Pause a running daemon
opencode daemon resume <runID>  # Resume a paused daemon
opencode daemon abort <runID>   # Abort a daemon run
```

## API Surface

The daemon is fully observable via the HTTP API:

- `GET /daemon/runs` — List all runs
- `GET /daemon/runs/:id` — Get run details
- `GET /daemon/runs/:id/events` — Event stream
- `GET /daemon/runs/:id/tasks` — Task list
- `GET /daemon/runs/:id/tasks/:taskID/passes` — Pass history
- `POST /daemon/runs/:id/tasks/:taskID/promote` — Manual promotion
- `POST /daemon/runs/:id/tasks/:taskID/block` — Block a task
- `POST /daemon/runs/:id/pause` — Pause
- `POST /daemon/runs/:id/resume` — Resume
- `POST /daemon/runs/:id/abort` — Abort

---

## OCAL v2 Capabilities

OCAL v2 extends the daemon from a loop-based runbook into an **evidence-gated agent operating contract** with durable graph execution, governed memory, proof bundles, and human approval gates. All v2 blocks are optional — omitting them has zero effect on v1/v1.1 scripts.

### `workflow` — Durable Graph Execution

Replaces or extends `loop` for complex multi-phase work. Defines a typed state machine where each state has an agent, write scope, required inputs, produced evidence, approval gates, and conditional transitions.

```yaml
workflow:
  type: state_machine          # state_machine | dag | pipeline
  initial: discover
  states:
    discover:
      agent: plan
      writes: scratch_only
      produces: [impact_map, task_graph]
      transitions:
        - to: plan
          when:
            evidence_exists: impact_map
        - to: incubate
          when:
            risk_score_gte: 0.7
    plan:
      agent: plan
      writes: scratch_only
      requires: [impact_map]
      produces: [change_plan, test_plan, rollback_plan]
      approval: plan_review     # blocks until human approves
      transitions:
        - to: implement
          when:
            approval_granted: plan_review
    implement:
      agent: build
      writes: isolated_worktree
      requires: [change_plan]
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
      transitions:
        - to: promote
          when:
            all_checks_pass: true
    promote:
      terminal: true
      approval: merge_review
  on_stuck: pause              # pause | abort | incubate
  max_total_time: 24h
```

**State properties:**

| Key | Type | Description |
|---|---|---|
| `agent` | string | Agent to use for this state |
| `writes` | enum | Write scope: `none`, `scratch_only`, `isolated_worktree`, `working_tree` |
| `requires` | string[] | Evidence that must exist before entering |
| `produces` | string[] | Evidence this state is expected to produce |
| `approval` | string | Approval gate name (must match `approvals.gates`) |
| `terminal` | boolean | If true, state ends the workflow |
| `timeout` | duration | Max time in this state |
| `hooks` | object | `on_enter` / `on_exit` lifecycle hooks |
| `transitions` | array | Ordered list of conditional transitions |

**Transition conditions:**

| Key | Type | Description |
|---|---|---|
| `evidence_exists` | string | Fires when named evidence is available |
| `approval_granted` | string | Fires when named approval gate is approved |
| `all_checks_pass` | boolean | Fires when all checks pass (or fail) |
| `checks_failed` | boolean | Fires on check failure |
| `constraint_violated` | boolean | Fires when any constraint is violated |
| `risk_score_gte` | number | Fires when risk score exceeds threshold |
| `shell` | ShellCheck | Fires when shell command succeeds |

**Semantic rules:**
- `initial` must reference a defined state
- All transition targets must reference defined states
- Terminal states must not have transitions
- At least one terminal state is required
- Cycle detection is available for DAG mode

---

### `memory` — Governed Agent Memory

Typed memory stores with scoping, retention, write policies, compression, redaction, and provenance tracking.

```yaml
memory:
  stores:
    task_context:
      scope: task              # task | run | global | agent
      retention: until_promotion   # until_promotion | until_archive | permanent | session
      max_entries: 100
      compression: summarize_after_50
      write_policy: append_only    # append_only | upsert | overwrite
      read_policy: inject_at_start # inject_at_start | on_demand | search
    lessons_learned:
      scope: global
      retention: permanent
      write_policy: upsert
      read_policy: on_demand
      searchable: true
  redaction:
    patterns: ["sk-*", "AKIA*", "password"]
    action: mask               # mask | remove | hash
  provenance:
    track_source: true         # record which agent/pass wrote each entry
    hash_chain: true           # tamper-evident memory chain
```

**Store properties:**

| Key | Type | Description |
|---|---|---|
| `scope` | enum | Visibility scope for entries |
| `retention` | enum | When entries are garbage-collected |
| `max_entries` | number | Hard cap on entry count (oldest evicted) |
| `compression` | string | Trigger expression (e.g. `summarize_after_50`) |
| `write_policy` | enum | How duplicate keys are handled |
| `read_policy` | enum | When entries are injected into context |
| `searchable` | boolean | Whether FTS search is enabled |

**Redaction** applies glob patterns to mask, remove, or hash-replace sensitive values before they enter memory. **Provenance** records which agent, pass, and iteration wrote each entry, with optional SHA-256 hash chaining for tamper detection.

---

### `evidence` — Typed Proof Bundles

Structured evidence requirements that must be satisfied before promotion. Prevents "tests pass" from being the only promotion criterion.

```yaml
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
  bundle_format: json          # json | markdown
  sign: sha256                 # sha256 | none
  archive: true                # persist bundles in SQLite
```

**Requirement types:**

| Key | Type | Description |
|---|---|---|
| `must_pass` | boolean | Evidence value must be `true` |
| `must_be_known` | boolean | Evidence value must not be undefined |
| `must_exist` | boolean | Evidence artifact must be present |
| `max_increase` | number | Numeric evidence must not exceed this value |

Bundles are signed with SHA-256 for audit integrity. The `verifyBundleHash` function detects tampering. Evidence types must be unique within a script.

---

### `approvals` — First-Class Human Decisions

Typed approval gates with roles, timeouts, auto-approval conditions, and escalation chains.

```yaml
approvals:
  gates:
    plan_review:
      required_role: tech_lead
      timeout: 24h
      on_timeout: pause        # pause | abort | escalate
      decisions: [approve, reject, edit, escalate]
      require_evidence: [test_results, rollback_plan]
      auto_approve_if:
        risk_score_lt: 0.3
        all_checks_pass: true
    merge_review:
      required_role: code_owner
      require_evidence: [test_results]
  escalation:
    chain: [tech_lead, staff_engineer, director]
    auto_escalate_after: 48h
```

**Gate properties:**

| Key | Type | Description |
|---|---|---|
| `required_role` | string | Who must approve |
| `timeout` | duration | Max time before `on_timeout` fires |
| `on_timeout` | enum | Action on timeout: pause, abort, escalate |
| `decisions` | string[] | Available decision types |
| `require_evidence` | string[] | Evidence that must exist before approval is possible |
| `auto_approve_if` | object | Conditions for auto-approval (risk score, checks) |

**Escalation** defines an ordered chain of roles. When `auto_escalate_after` expires on a pending approval, the request moves to the next role in the chain. The host manages all approval state — the model cannot approve or reject.

**Integration with workflow:** When a workflow state has an `approval` field, the state machine blocks until the referenced gate is approved. The parser validates that all referenced gate names exist in `approvals.gates`.

---

## v2 Example: Workflow-Driven Feature Implementation

```yaml
<<<OCAL v1:daemon id=feature-impl>>>
version: v1
intent: daemon
confirm: RUN_FOREVER

job:
  name: implement-feature
  objective: Build feature X with evidence-gated workflow
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
      produces: [impact_map]
      transitions:
        - to: plan
          when:
            evidence_exists: impact_map
    plan:
      agent: plan
      writes: scratch_only
      requires: [impact_map]
      produces: [change_plan, test_plan]
      approval: plan_review
      transitions:
        - to: implement
          when:
            approval_granted: plan_review
    implement:
      agent: build
      writes: isolated_worktree
      transitions:
        - to: done
          when:
            all_checks_pass: true
        - to: plan
          when:
            checks_failed: true
    done:
      terminal: true

memory:
  stores:
    context:
      scope: run
      retention: session
      write_policy: append_only
      read_policy: inject_at_start

evidence:
  require_before_promote:
    - type: test_results
      must_pass: true
    - type: affected_files
      must_be_known: true

approvals:
  gates:
    plan_review:
      required_role: tech_lead
      timeout: 24h
      on_timeout: pause
      auto_approve_if:
        risk_score_lt: 0.2
        all_checks_pass: true

permissions:
  shell: allow
  edit: allow
  git_commit: allow
<<<END_OCAL id=feature-impl>>>
OCAL_ARM RUN_FOREVER id=feature-impl
```

---

## OCAL v2.1 Power Blocks

These ten blocks raise OCAL from a daemon control language into a portable, host-enforced **autonomous-engineering contract**. They harden the arming surface, enforce least-privilege capabilities, kill vibe-coding by structure, run hypothesis tournaments instead of single-track loops, route across model portfolios, cap cost at multiple scopes, and define rollback as a first-class artifact.

### `arming` — Origin-Aware, Hash-Bound Arming

OCAL's #1 attack surface is a model-emitted `OCAL_ARM` sentinel. The `arming` block makes that structurally impossible: arming requires a host-generated nonce bound to the SHA-256 of the canonical normalized YAML, and only specific origins may arm.

```yaml
arming:
  preview_hash_required: true
  host_nonce_required: true
  reject_inside_code_fence: true
  reject_from:
    - assistant_output
    - tool_output
    - web_content
    - mcp_resource
    - issue_comment
  accepted_origins:
    - trusted_user_message
    - signed_cli_input
    - host_ui_button
  preview_expires_after: 10m
  arm_token_single_use: true
  bound_to: ["script_hash", "user_id", "repo", "branch"]
```

When `arming` is configured, the runtime emits an extended sentinel: `OCAL_ARM RUN_FOREVER id=… sha256=… nonce=… repo=git:…`.

### `capabilities` — Least-Privilege Capability Leases

Replaces coarse `permissions: { shell: ask }` with rule-list semantics: per-tool, per-path, per-command, per-time-window. A `command_floor` always blocks dangerous commands regardless of `allow` rules — there is no "YOLO mode."

```yaml
capabilities:
  default: deny
  rules:
    - id: read-anywhere
      tool: read
      decision: allow
    - id: edit-src
      tool: edit
      paths: ["packages/opencode/src/**"]
      decision: allow
    - id: edit-migrations
      tool: edit
      paths: ["packages/opencode/migration/**"]
      decision: ask
      require_gate: dba_review
      reason: schema-sensitive
    - id: shell-tests
      tool: shell
      command_regex: "^(bun test|bun run lint|tsgo --noEmit)( |$)"
      decision: allow
      expires: 2h
  command_floor:
    always_block:
      - "git push --force"
      - "rm -rf /"
      - "sudo "
      - "chmod 777"
      - "curl .* \\| sh"
      - "DROP DATABASE"
```

### `quality` — Anti-Vibe + Diff-Budget Gates

Structurally prevents the canonical vibe-coding failure modes: deleted tests, weakened assertions, silent catches, fake-data fallbacks, `@ts-ignore`, unexplained large diffs. Bug-fix discipline requires a reproduction (failing test or captured trace) before any production patch.

```yaml
quality:
  anti_vibe:
    enabled: true
    fail_closed: true
    block_test_deletion: true
    block_assertion_weakening: true
    block_silent_catch: true
    block_fake_data_fallback: true
    block_ts_ignore: true
    require_root_cause_for_bugfix: true
    require_failing_test_first_for_bugfix: true
  diff_budget:
    max_files_changed: 25
    max_added_lines: 1500
    on_violation: require_approval
  checks:
    - name: no-test-skip
      pattern: "\\.skip\\(|test\\.only\\(|describe\\.only\\("
      scope: file_diff
      on_violation: block_promotion
    - name: no-broad-catch
      pattern: "catch\\s*\\([^)]*\\)\\s*\\{\\s*\\}"
      scope: file_diff
      on_violation: warn
```

### `experiments` — Hypothesis Tournament

Distinct from `fan_out` (parallel work-items) — `experiments` runs **competing hypotheses** in isolated git worktrees, scores them on weighted criteria, and reduces with `best_verified_patch` or `synthesize_best`. Failed lanes preserve their plans as **negative memory** so future runs don't repeat the dead-end.

```yaml
experiments:
  strategy: disjoint_tournament
  fork_from: last_green_checkpoint
  diversity:
    require_distinct_plan: true
    min_plan_distance: 0.35
    axes: [minimal_patch, test_first, refactor_boundary, dependency_strategy]
  lanes:
    - id: minimal
      hypothesis: "Smallest patch satisfying acceptance criteria."
      prompt_strategy: smallest_safe_change
      isolation: git_worktree
      timeout: 30m
      budget: { max_iterations: 5, max_diff_lines: 500 }
    - id: tests-first
      hypothesis: "Write the failing tests, then make them pass."
      prompt_strategy: tests_first
      isolation: git_worktree
      timeout: 30m
    - id: refactor
      hypothesis: "Extract a clean boundary, then port."
      prompt_strategy: refactor_first
      isolation: git_worktree
  max_parallel: 3
  scoring:
    weights:
      tests_passed: 0.30
      typecheck_passed: 0.20
      diff_minimal: 0.10
      security_clean: 0.20
      maintainability: 0.15
      rollback_simplicity: 0.05
    judge:
      agent: critic
      blind: true
      must_use_different_provider: true
  reduce:
    strategy: best_verified_patch
    require_final_verification: true
  on_partial_failure: continue
  preserve_failed_lanes_as_negative_memory: true
```

### `models` — Routing, Fallback, Critic Discipline

Different phases get different models. Critic must use a **different provider** than the builder — provider-correlated blind spots are real. Confidence is capped (model self-reports never decisive). Fallback chain handles rate limits and context overflow without losing the run.

```yaml
models:
  profiles:
    planner:
      provider: anthropic
      model: claude-opus-4-7
      reasoning: true
    builder:
      provider: anthropic
      model: claude-sonnet-4-6
    critic:
      provider: openai
      model: gpt-5
      reasoning: true
    summarizer:
      provider: anthropic
      model: claude-haiku-4-5-20251001
      budget_usd: 0.50
  routes:
    plan: planner
    implement: builder
    review: critic
    compress: summarizer
  critic:
    must_differ_from_builder: true
    must_use_different_provider: true
  fallback:
    on_rate_limit: summarizer
    on_context_overflow: summarizer
    chain: [builder, summarizer]
    cooldown: 60s
  confidence_cap: 0.6
```

### `budgets` — Multi-Scope Cost Caps

Budgets nest: run → task → iteration → experiment lane. Each scope has its own `on_exhaust` policy. `renew_with_approval` requires a human + progress report — `RUN_FOREVER` is honest about being lease-bounded.

```yaml
budgets:
  run:
    wall_clock: 8h
    cost_usd: 50.00
    tokens: 5000000
    on_exhaust: renew_with_approval
  task:
    iterations: 30
    cost_usd: 5.00
    on_exhaust: park
  iteration:
    tool_calls: 40
    diff_lines: 2000
    on_exhaust: pause
  experiment_lane:
    wall_clock: 30m
    cost_usd: 2.00
    on_exhaust: abort
```

### `triggers` — Manual / Cron / GitHub / CI / Webhook

First-class trigger sources with **anti-recursion** (cron jobs cannot create more cron jobs) and idempotency keys (replay never duplicates PRs/messages/deploys).

```yaml
triggers:
  anti_recursion: true
  list:
    - id: nightly-sweep
      kind: cron
      schedule: "0 4 * * *"
      allow_create_more_cron: false
    - id: ci-fail
      kind: ci_failure
      filter: { branch: main }
      max_runs_per_sha: 1
    - id: issue-ocal-ready
      kind: github_issue
      filter: { label: ocal-ready }
      idempotency_key_template: "issue-{{number}}-{{sha}}"
    - id: pr-comment-fix
      kind: github_pr_comment
      filter: { body_contains: "/ocal fix" }
```

### `rollback` — First-Class Reversibility

Rollback is required for risky paths and risky scores. Every rollback plan is verified with `git apply --reverse --check` before promotion, and on-failure-after-merge has a typed strategy.

```yaml
rollback:
  required_when:
    touches_paths:
      - "packages/opencode/migration/**"
      - "packages/opencode/src/auth/**"
      - "infra/prod/**"
    risk_score_gte: 0.6
  plan_required: true
  verify_command: "git apply --reverse --check < .opencode/daemon/rollback.patch"
  on_failure_after_merge: revert_commit
```

### `done` — Definition-of-Done (Host-Evaluated)

Separate from `stop` conditions. `stop` says "the loop may exit." `done` says "the work is genuinely complete." The host evaluates both — model self-claims never count.

```yaml
done:
  require:
    - stop_conditions_met
    - requirements_verified
    - evidence_complete
    - no_unresolved_critical_objections
    - memory_compressed
    - rollback_plan_recorded
    - final_state_clean
  forbid:
    - model_only_claim
    - tests_not_run
    - code_index_stale
    - requirement_drift_unreviewed
    - pending_human_gate
```

### `repo_intelligence` — Codebase Indexes + Scope Control

Reads the repo into typed indexes (symbols, dependency graph, test graph, ownership, generated zones). `scope_control` forces an explicit scope before any edit — agents can't aimlessly grep their way to a billion-LOC compromise. `blast_radius` pauses the run when impact crosses a service boundary.

```yaml
repo_intelligence:
  scale: large
  indexes:
    - symbols
    - dependency_graph
    - test_graph
    - ownership
    - generated_zones
    - security_sinks
  generated_zones:
    - "**/*.gen.ts"
    - "**/*.pb.go"
    - "**/generated/**"
  scope_control:
    require_scope_before_edit: true
    max_initial_scope_files: 50
    expand_scope_requires_evidence: true
  blast_radius:
    compute_on: [edit, checkpoint]
    pause_when_score_gte: 0.75
```

---

## Powerful Example Runbooks

The full set of flagship runbooks lives in [`docs/OCAL/examples/`](OCAL/examples/). Each demonstrates a different combination of v2.1 power blocks:

| File | What it demonstrates |
|---|---|
| `01-fix-until-green.ocal.yml` | Minimum viable v2 daemon — bug-fix discipline, anti-vibe, rollback, done |
| `02-hypothesis-tournament.ocal.yml` | Disjoint experiments with isolated worktrees, blind cross-provider judging, negative memory |
| `03-billion-loc-monorepo.ocal.yml` | Repo-intelligence + scope control + blast radius for massive codebases |
| `04-fleet-portfolio.ocal.yml` | Trigger-driven multi-issue dispatcher with budgets, leases, anti-recursion |
| `05-secure-mcp-lockdown.ocal.yml` | Capability leases + command floor + secrets brokering + sandbox |
| `06-evidence-graph-merge.ocal.yml` | Proof lanes + merge witness + rollback verify + done definition |
| `07-self-improving-skills.ocal.yml` | Governed skill quarantine → human review → promotion lifecycle |
| `08-full-power-runbook.ocal.yml` | Every v2.1 power block in one runbook, end-to-end |

---

## TUI Detection

When OCAL is detected anywhere in the active session — in the user's prompt input, an assistant message stream, or an active daemon run — the OpenCode TUI overlays the **`opencode-gold`** theme, signalling host-mediated daemon mode. The overlay clears automatically when no source is active. Implementation: `packages/opencode/src/cli/cmd/tui/context/ocal-flash.ts`.
