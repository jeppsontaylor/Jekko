# OCAL v1

`OCAL` is the host-enforced daemon/runbook format for OpenCode.

Rules:

1. The block must start with `<<<OCAL v1:daemon id=<id>>>`.
2. The body must be YAML.
3. `intent` must be `daemon`.
4. `confirm` must be `RUN_FOREVER`.
5. The block must end with `<<<END_OCAL id=<id>>>` and `OCAL_ARM RUN_FOREVER id=<id>`.
6. Top-level keys are strict. Unknown keys are rejected.
7. Code fences and duplicate OCAL blocks are rejected.
8. Nested keys are strict inside every block, including `job`, `loop`, `stop`, `context`, `checkpoint`, `tasks`, `agents`, `mcp`, `permissions`, `ui`, and `incubator`.

The runtime owns continuation. The model may finish an iteration, but it does not get to declare the daemon complete.

## Incubator

OCAL v1 supports an optional top-level `incubator` block for hard tasks. The incubator is host-enforced: each task gets finite typed passes, durable SQLite-backed artifacts, generated mirrors under `.opencode/daemon/<runID>/tasks/<taskID>/`, and a runtime-owned promotion gate.

Allowed pass types are `scout`, `idea`, `strengthen`, `critic`, `synthesize`, `prototype`, `promotion_review`, and `compress`.

Allowed context modes are:

- `blind`: objective and constraints only.
- `inherit`: current capsule plus selected memory summaries.
- `strengthen`: current best candidate plus an improvement rubric.
- `critic`: candidate or current best plus an adversarial checklist.
- `pool`: candidate summaries, objections, and score table.
- `promotion`: final packet plus required evidence checklist.
- `ledger_only`: compressed memory summary only.

Allowed write scopes are `scratch_only` and `isolated_worktree`. `main_worktree` is never accepted inside `incubator`; prototype passes may use only `isolated_worktree` or `scratch_only`.

The incubator also supports these optional hardening blocks:

- `exclude_when`: same condition schema as `route_when`, but matching tasks remain in the normal lane.
- `cleanup`: host-owned cleanup policy with `summarize_to_task_memory`, `archive_artifacts`, `delete_scratch`, and `delete_unmerged_worktrees`.
- `readiness`: optional thresholds used by the preview and runtime gate to explain or tune promotion readiness.

When `incubator.enabled` is true, these fields are required and must be finite positive values:

- `budget.max_passes_per_task`
- `budget.max_rounds_per_task`
- `promotion.promote_at`

Idea pass `count` must be finite and no greater than `budget.max_parallel_idea_passes`. Unknown incubator keys, unknown pass types, unknown context modes, unbounded budgets, negative counts, and pre-promotion main worktree writes are rejected during preview.

Model confidence is only a low-weight input. Promotion depends on host evidence such as a problem statement, current best plan, verification strategy, risk review, resolved critical objections, bounded scope, and prototype evidence when configured.

MCP profile rules are exact allow lists. A pass may name `mcp_profile`; daemon execution must verify required profiles before exposing tools. Unlisted MCP tools remain hidden.

Prototype passes run in an isolated git worktree with a child session and a recorded artifact path for the generated diff. The main worktree remains untouched until host promotion.
