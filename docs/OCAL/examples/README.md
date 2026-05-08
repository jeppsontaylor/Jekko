# OCAL Powerful Examples

Eight flagship runbooks that show what OCAL v2.1 makes possible. Each is a complete `<<<OCAL v1:daemon>>>` block — paste any of them into a trusted OpenCode prompt to preview the runtime plan, then explicitly arm to execute.

| File | Demonstrates | Power blocks |
|---|---|---|
| [`01-fix-until-green.ocal.yml`](01-fix-until-green.ocal.yml) | Bug-fix discipline with anti-vibe gates, capability leases, rollback, done | `quality`, `capabilities`, `rollback`, `done`, `models`, `budgets` |
| [`02-hypothesis-tournament.ocal.yml`](02-hypothesis-tournament.ocal.yml) | Disjoint experiments in isolated worktrees, blind cross-provider judging, negative-memory learning | `experiments`, `models`, `memory`, `budgets`, `evidence` |
| [`03-billion-loc-monorepo.ocal.yml`](03-billion-loc-monorepo.ocal.yml) | Repo intelligence + scope control + blast radius for massive codebases | `repo_intelligence`, `capabilities`, `experiments`, `quality`, `evidence` |
| [`04-fleet-portfolio.ocal.yml`](04-fleet-portfolio.ocal.yml) | Multi-issue dispatcher with cron, GitHub triggers, budgets, anti-recursion, leases | `triggers`, `budgets`, `models`, `done`, `observability` |
| [`05-secure-mcp-lockdown.ocal.yml`](05-secure-mcp-lockdown.ocal.yml) | Capability leases, command floor, brokered secrets, sandbox isolation, MCP rug-pull defense | `capabilities`, `sandbox`, `security`, `mcp`, `arming` |
| [`06-evidence-graph-merge.ocal.yml`](06-evidence-graph-merge.ocal.yml) | Proof lanes + merge witness + rollback verify + workflow-driven approvals | `workflow`, `evidence`, `approvals`, `rollback`, `done` |
| [`07-self-improving-skills.ocal.yml`](07-self-improving-skills.ocal.yml) | Governed skill quarantine → human review → repo registry promotion | `skills`, `memory`, `approvals`, `quality`, `observability` |
| [`08-full-power-runbook.ocal.yml`](08-full-power-runbook.ocal.yml) | Every v2.1 power block in one runbook | All |

## Running an example

1. Copy the YAML block (including sentinels) into the OpenCode prompt.
2. The TUI flips to the **opencode-gold** theme, signalling daemon-arm mode.
3. The host renders the **Run Card**: capabilities granted, budgets, risk score, unsupported features.
4. Type `OCAL_ARM RUN_FOREVER id=<run-id>` only after reviewing the Run Card.
5. Watch the run stream events; pause/abort/inspect via `opencode daemon ...` CLI.

## Safety reminder

These examples grant real capabilities. Read the `capabilities`, `permissions`, `rollback`, and `done` blocks before arming. Arming requires a host-generated nonce bound to the SHA-256 of the canonical YAML — model-emitted `OCAL_ARM` sentinels are rejected by the runtime.
