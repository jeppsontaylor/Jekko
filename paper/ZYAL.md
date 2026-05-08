# ZYAL: Zero-Trust YAML Agent Language

## A Host-Enforced Operating Contract for Autonomous Software Engineering

**Authors:** Jekko Contributors
**Version:** 1.0 — May 2026
**Status:** Reference Implementation Shipped

---

## Abstract

We present **ZYAL** (Zero-trust YAML Agent Language), a declarative, host-enforced control language for governing long-running autonomous AI coding agents. ZYAL addresses the fundamental unsolved problem in agentic software engineering: how to let a language model work autonomously for hours — editing files, running tests, committing code, managing tasks — without losing safety, observability, or human control.

ZYAL is not a prompt framework, an agent SDK, or a model fine-tuning strategy. It is a **typed contract between a human operator and an autonomous agent runtime**, expressed as a strict YAML runbook with 40+ declarative blocks covering iteration policy, stop conditions, evidence requirements, capability leases, anti-vibe engineering gates, hypothesis tournaments, multi-scope budgets, human approval chains, and zero-trust arming.

The key insight is structural: safety properties that matter — bounded execution, evidence-gated promotion, secret protection, anti-vibe discipline, cost caps — cannot be reliably enforced by instructing the model. They must be enforced by the host runtime where the model has no ability to circumvent them.

ZYAL is fully implemented in the Jekko TUI and daemon runtime, with 30+ runtime modules, 9 SQLite tables, a 48K-line parser, and a 65K-line schema. This paper describes the language design, runtime architecture, safety model, and comparison to prior work.

---

## 1. Introduction

### 1.1 The Problem

The current generation of AI coding assistants operates in a request-response loop: the human asks, the model answers, the human verifies. This interaction model works for small, bounded tasks — fixing a type error, writing a unit test, explaining a function — but fundamentally breaks at the scale where AI could deliver transformative productivity:

- **Multi-hour refactoring** across hundreds of files
- **Continuous integration daemons** that fix failures autonomously
- **Architecture migrations** requiring coordinated changes across service boundaries
- **Security audits** spanning entire codebases
- **Technical debt reduction** as an always-on background process

Extending AI agents to these tasks without a governance layer produces predictable, catastrophic failure modes:

| Failure Mode | Root Cause | Consequence |
|---|---|---|
| Unbounded autonomy | No iteration limits or circuit breakers | Model rewrites half the codebase chasing a red herring |
| No memory | Context window eviction | Rediscovers the same dead ends every session |
| No evidence discipline | "Tests pass" is the only gate | Broken code reaches production |
| No safety boundary | Model can execute any shell command | `git push --force`, `rm -rf`, credential exfiltration |
| No cost control | No budget enforcement | A runaway loop burns $500 before detection |
| Vibe coding | No structural quality gates | Deletes tests, weakens assertions, adds `@ts-ignore` |
| Model self-certification | Model decides when it's "done" | Claims completion without verification |

### 1.2 The Thesis

ZYAL's thesis is that **the host, not the model, must own the control loop**. Every safety property that matters must be enforced structurally by the runtime — not by asking the model to remember rules, follow a system prompt, or self-report its confidence honestly.

This is a zero-trust architecture applied to AI agents: the model is treated as an untrusted executor within a trusted control plane. The model does the thinking; the host does the governing; the human does the deciding.

### 1.3 Contributions

1. **A complete declarative language** (40+ typed blocks) for specifying agent behavior, safety constraints, and promotion criteria
2. **A zero-trust safety model** with capability leases, command floors, anti-vibe gates, and model confidence caps
3. **An incubation system** for hard tasks with 8 maturation passes, readiness scoring, and evidence-gated promotion
4. **A hypothesis tournament model** for competing implementation strategies with blind cross-provider judging
5. **A durable runtime** backed by SQLite with full event sourcing, context rotation, and checkpoint management
6. **A reference implementation** with 30+ runtime modules, comprehensive test coverage, and a gold-themed TUI with live observability

---

## 2. Related Work

### 2.1 Agent Frameworks

| System | Year | Approach | ZYAL Difference |
|---|---|---|---|
| AutoGPT [1] | 2023 | Unbounded agent loop with plugin tools | No stop conditions, no budgets, no evidence gates. ZYAL enforces all three structurally. |
| BabyAGI [2] | 2023 | Task queue with LLM-driven prioritization | Model owns the task queue. ZYAL's task ledger is host-managed with readiness scoring. |
| MetaGPT [3] | 2023 | Multi-agent role-play with SOPs | Roles are prompt-based. ZYAL agents have capability leases and write scopes enforced at runtime. |
| CrewAI [4] | 2024 | Crew of agents with defined roles | No durable state, no checkpoint gating, no evidence requirements. |
| LangGraph [5] | 2024 | Graph-based agent orchestration | Workflow only — no safety model, no budgets, no anti-vibe gates, no zero-trust arming. |
| Devin [6] | 2024 | Full-stack autonomous SWE agent | Proprietary, closed. No user-configurable safety constraints or evidence requirements. |
| OpenHands [7] | 2024 | Open SWE agent with sandboxed execution | Sandbox-only safety. No declarative contracts, no host-enforced budgets, no evidence gates. |
| Aider [8] | 2024 | Pair-programming CLI with git integration | Single-turn. No daemon mode, no incubation, no multi-agent orchestration. |
| Claude Code [9] | 2025 | Agentic coding with permission system | Permission prompts only. No declarative runbooks, no evidence-gated promotion, no anti-vibe gates. |
| Codex CLI [10] | 2025 | Terminal agent with sandboxing | Network/filesystem sandbox. No declarative contracts, no durable state, no tournament model. |

### 2.2 Agent Safety Research

| Work | Contribution | ZYAL Extension |
|---|---|---|
| Constitutional AI [11] | Model self-critique via principles | Principles are in the prompt → model can ignore. ZYAL enforces at runtime. |
| RLHF [12] | Reward model alignment | Training-time safety. ZYAL provides inference-time structural safety. |
| Tool-use sandboxing [13] | Restrict tool access | Coarse allow/deny. ZYAL provides per-tool, per-path, per-command, time-windowed capability leases. |
| Guardrails AI [14] | Output validation framework | Validation only. ZYAL integrates validation with lifecycle management, budgets, and promotion gates. |

### 2.3 Configuration Languages

| Language | Domain | ZYAL Relationship |
|---|---|---|
| Kubernetes YAML | Container orchestration | Declarative desired-state. ZYAL applies the same philosophy to agent orchestration. |
| GitHub Actions YAML | CI/CD pipelines | Workflow definitions. ZYAL extends this with evidence gates, budgets, and safety invariants. |
| Terraform HCL | Infrastructure-as-code | Declarative infrastructure. ZYAL is declarative agent governance. |
| Rego (OPA) [15] | Policy-as-code | Policy evaluation. ZYAL embeds policy evaluation into the agent lifecycle. |

---

## 3. Language Design

### 3.1 Sentinel Format

Every ZYAL script is wrapped in typed sentinels that are structurally distinct from markdown, code fences, and model output:

```
<<<ZYAL v1:daemon id=my-script>>>
version: v1
intent: daemon
confirm: RUN_FOREVER
# ... YAML body ...
<<<END_ZYAL id=my-script>>>
ZYAL_ARM RUN_FOREVER id=my-script
```

**Design decisions:**
- Triple angle brackets (`<<<>>>`) cannot appear in normal markdown or code output
- Opening and closing IDs must match (parser-enforced)
- Code fences around the block are **rejected** — the sentinels are the format
- The `ZYAL_ARM` sentinel is a **separate line** requiring a distinct human action
- Arming can be hash-bound (`sha256=...`) and nonce-bound (`nonce=...`) for zero-trust environments

### 3.2 Block Taxonomy

ZYAL's 40+ blocks are organized into 5 evolutionary layers:

#### Layer 1: Core (v1) — 15 blocks
The minimum viable daemon: what to do, when to stop, how to commit.

`version` · `intent` · `confirm` · `id` · `job` · `loop` · `stop` · `context` · `checkpoint` · `tasks` · `incubator` · `agents` · `mcp` · `permissions` · `ui`

#### Layer 2: Safety (v1.1) — 7 blocks
Runtime safety beyond permissions: event-driven reactions, guardrails, invariants.

`on` · `fan_out` · `guardrails` · `assertions` · `retry` · `hooks` · `constraints`

#### Layer 3: Evidence (v2 Wave 1) — 4 blocks
Durable state machines, governed memory, typed proof bundles, human approval gates.

`workflow` · `memory` · `evidence` · `approvals`

#### Layer 4: Security (v2 Wave 2) — 4 blocks
Execution isolation, secrets management, skill governance, structured observability.

`skills` · `sandbox` · `security` · `observability`

#### Layer 5: Power (v2.1) — 10 blocks
The full autonomous engineering contract: zero-trust arming, capability leases, anti-vibe gates, hypothesis tournaments, multi-provider routing, nested budgets, external triggers, rollback plans, definition-of-done, and codebase intelligence.

`arming` · `capabilities` · `quality` · `experiments` · `models` · `budgets` · `triggers` · `rollback` · `done` · `repo_intelligence`

### 3.3 Schema and Parsing

The ZYAL schema is defined in TypeScript (`schema.ts`, 65K lines) with:
- Exhaustive type definitions for every block, sub-block, and enum
- Normalized canonical form for hash computation
- Semantic validation rules (e.g., workflow terminal states, evidence type uniqueness, approval gate cross-references)

The parser (`parser.ts`, 48K lines) implements:
- Sentinel extraction with code-fence rejection
- YAML parsing with strict key validation
- SHA-256 hash computation of the canonical normalized YAML
- ARM sentinel matching with hash and nonce verification
- Preview mode (parse without arming) for validation

---

## 4. Safety Model

### 4.1 Zero-Trust Arming

The most dangerous attack surface in any agent system is unauthorized execution. ZYAL's `arming` block makes model-initiated execution structurally impossible:

1. **Origin rejection**: ARM sentinels from `assistant_output`, `tool_output`, `web_content`, or `mcp_resource` are rejected by the parser
2. **Hash binding**: The ARM token includes `sha256=<hash>` of the canonical script — any modification invalidates the arm
3. **Nonce binding**: The host generates a single-use nonce; replay attacks are impossible
4. **Context binding**: ARM can be bound to `user_id`, `repo`, `branch` — a script armed for staging cannot run in production
5. **Expiration**: Preview hashes expire after a configurable duration (default: 10 minutes)

### 4.2 Capability Leases

Traditional permission systems use coarse `allow/deny` per tool. ZYAL's `capabilities` block provides fine-grained, time-windowed, path-scoped capability leases:

```yaml
capabilities:
  default: deny
  rules:
    - id: edit-src
      tool: edit
      paths: ["src/**"]
      decision: allow
    - id: shell-tests
      tool: shell
      command_regex: "^bun test"
      decision: allow
      expires: 2h
  command_floor:
    always_block: ["git push --force", "rm -rf /", "sudo ", "DROP DATABASE"]
```

The `command_floor` is absolute — no `allow` rule can override it. There is no "YOLO mode."

### 4.3 Anti-Vibe Engineering

ZYAL's `quality` block structurally prevents the canonical vibe-coding failure modes:

| Gate | What it blocks |
|---|---|
| `block_test_deletion` | Removing or commenting out existing tests |
| `block_assertion_weakening` | Weakening assertions (e.g., `toBe` → `toBeTruthy`) |
| `block_silent_catch` | Empty catch blocks (`catch (e) {}`) |
| `block_fake_data_fallback` | Hardcoded mock data in production paths |
| `block_ts_ignore` | `@ts-ignore` / `@ts-expect-error` additions |
| `require_failing_test_first_for_bugfix` | Bug fixes require a reproduction first |

All gates are **fail-closed** when enabled — the model cannot override them.

### 4.4 Model Confidence Capping

ZYAL includes a `confidence_cap` (default: 0.6) that prevents the model from inflating its own readiness score past a threshold. The host evaluates readiness based on **structural evidence** (tests pass, scope bounded, plan reviewed, rollback known), not model self-reports.

---

## 5. Runtime Architecture

### 5.1 Durable State

All daemon state is persisted in SQLite across 9 relational tables:

| Table | Records |
|---|---|
| `daemon_run` | Run metadata: status, phase, iteration, epoch, spec hash |
| `daemon_iteration` | Per-iteration: token usage, cost, terminal reason, session ID |
| `daemon_event` | Append-only event log: every state transition, hook, handler |
| `daemon_task` | Task ledger: discovery, routing, status, lane, readiness |
| `daemon_task_pass` | Incubator passes: type, context mode, write scope, result |
| `daemon_task_memory` | Per-task memories: context capsules, findings, objections |
| `daemon_worker` | Worker pool: heartbeat, lease, session binding |
| `daemon_artifact` | Generated artifacts: evidence bundles, rollback patches |

### 5.2 Iteration Loop

Each daemon iteration follows a strict host-controlled sequence:

```
1. Check run status (abort/pause/fail → exit)
2. Execute before_iteration hooks
3. Run agent loop (model generates + executes tool calls)
4. Record iteration (tokens, cost, terminal reason)
5. Evaluate on-handlers for terminal signal
6. Check circuit breaker (consecutive errors)
7. Execute before_checkpoint hooks
8. Run checkpoint (verify → git add → commit → push)
9. Evaluate stop conditions (all + any)
10. Route tasks through incubator (if enabled)
11. Execute after_iteration hooks
12. Build continuation prompt
13. Rotate session (if hard_clear_every threshold crossed)
14. Sleep
```

### 5.3 Incubator

The incubator is ZYAL's answer to hard tasks. When a task exceeds routing thresholds (repeated attempts, high risk score), it enters an 8-pass maturation pipeline:

| # | Pass | Context | Write Scope | Purpose |
|---|---|---|---|---|
| 1 | Scout | Blind | Scratch | Independent exploration without bias |
| 2 | Idea (×3) | Inherit | Scratch | Generate competing approaches |
| 3 | Strengthen | Strengthen | Scratch | Stress-test ideas with adversarial probing |
| 4 | Critic | Critic | Scratch | Cross-provider critique (different model) |
| 5 | Synthesize | Pool | Scratch | Merge best elements from all ideas |
| 6 | Prototype | Inherit | Isolated worktree | Build in isolated git branch |
| 7 | Review | Promotion | Scratch | Evidence-gated promotion review |
| 8 | Compress | Ledger only | Scratch | Summarize for memory + archive |

Promotion requires **host-evaluated evidence**: `tests_identified ≥ 1`, `scope_bounded ≥ 1`, `plan_reviewed ≥ 1`, and `unresolved_critical_objections = 0`. The model's own readiness score is capped at 0.6.

### 5.4 Hypothesis Tournaments

The `experiments` block runs competing implementation strategies in parallel:

1. Each lane gets an isolated git worktree forked from the last green checkpoint
2. Plans must be distinct (minimum edit distance enforced by `min_plan_distance`)
3. A **blind** critic agent (required to use a different provider) scores each lane
4. The winning lane is promoted via `best_verified_patch` with a final verification pass
5. Failed lanes are preserved as **negative memory** — the system never repeats a dead end

---

## 6. Observability

### 6.1 TUI Gold Mode

When ZYAL is active, the Jekko TUI transforms:

- **Gold theme overlay**: 44-property custom theme (noir backgrounds, gold primaries, amber accents)
- **∞ ZYAL MODE sidebar**: Live iteration count, total tokens, total cost, uptime, daemon phase, job name
- **Instant validation**: `✓ ZYAL` / `✗ ZYAL: <error>` badge in prompt footer
- **Border tinting**: Gold for valid ZYAL, red for invalid
- **Fleet metrics**: Worker count, token breakdown, tasks completed/incubated

### 6.2 API Surface

The daemon exposes a complete HTTP API for programmatic observability and control:

| Category | Endpoints |
|---|---|
| Runs | `GET /daemon`, `GET /daemon/:id` (with `_stats` aggregation) |
| Events | `GET /daemon/:id/events` |
| Tasks | `GET /daemon/:id/tasks`, `GET /daemon/:id/tasks/:tid` |
| Passes | `GET /daemon/:id/tasks/:tid/passes` |
| Memory | `GET /daemon/:id/tasks/:tid/memory` |
| Control | `POST .../pause`, `POST .../resume`, `POST .../abort` |
| Incubator | `GET /daemon/:id/incubator`, `POST .../incubate`, `POST .../promote` |
| Preview | `POST /daemon/preview` |

### 6.3 Filesystem Mirror

All state is mirrored to `.jekko/daemon/<runID>/` for human inspection:

```
├── ledger.jsonl          # Append-only event log
├── STATE.md              # Human-readable run summary
└── tasks/<taskID>/
    ├── CAPSULE.md         # Context capsule
    ├── SCORE.json         # Readiness scores
    └── PASSES/
        ├── 001-scout.md
        ├── 002-idea.md
        └── 003-strengthen.md
```

---

## 7. Evaluation

### 7.1 Safety Properties

| Property | Enforcement | Circumventable by Model? |
|---|---|---|
| Bounded execution | Circuit breaker + budgets | No — runtime enforced |
| Evidence-gated promotion | Readiness evidence fields | No — host evaluates |
| Secret protection | Capability leases + redaction | No — command floor absolute |
| Anti-vibe discipline | Quality gates (fail-closed) | No — diff analysis in host |
| Cost control | Nested budgets with on_exhaust | No — runtime enforced |
| Arming security | Hash + nonce + origin rejection | No — parser enforced |
| Model confidence | confidence_cap | No — host caps score |

### 7.2 Expressiveness

The 8 flagship example runbooks in `docs/ZYAL/examples/` demonstrate that ZYAL can express:

1. Simple fix-until-green loops
2. Multi-worker parallel audits with guardrails
3. Hard task incubation with 8-pass maturation
4. Fan-out parallel map-reduce
5. Hypothesis tournaments with cross-provider judging
6. Billion-LOC monorepo scope control
7. Fleet portfolio management with external triggers
8. Full end-to-end autonomous engineering contracts

---

## 8. Future Work

1. **Distributed daemon fleets** — multiple ZYAL daemons coordinating across repositories
2. **Learning from negative memory** — cross-run skill transfer from failed experiments
3. **Formal verification** — proving safety properties of ZYAL scripts statically
4. **IDE integration** — ZYAL validation and authoring in VS Code, Zed, JetBrains
5. **Benchmark suite** — standardized evaluation of ZYAL daemons on SWE-bench tasks

---

## 9. Conclusion

ZYAL demonstrates that the gap between "AI coding assistant" and "autonomous software engineer" is not a model capability gap — it is a **governance gap**. Current models are capable of sustained, multi-hour autonomous work. What they lack is a control plane that makes that work safe, observable, bounded, and evidence-gated.

ZYAL fills this gap with a declarative language that gives the host total control over the agent lifecycle while giving the model maximum freedom within well-defined boundaries. The result is a system where the model does the thinking, ZYAL does the governing, and the human does the deciding.

That is the zero-trust contract for autonomous software engineering.

---

## References

[1] T. Richards et al., "Auto-GPT: An Autonomous GPT-4 Experiment," GitHub, 2023.

[2] Y. Nakajima, "BabyAGI: Task-Driven Autonomous Agent," GitHub, 2023.

[3] S. Hong et al., "MetaGPT: Meta Programming for Multi-Agent Collaborative Framework," arXiv:2308.00352, 2023.

[4] J. Moura, "CrewAI: Framework for orchestrating role-playing autonomous AI agents," GitHub, 2024.

[5] LangChain Inc., "LangGraph: Building language agents as graphs," 2024.

[6] Cognition Labs, "Devin: The first AI software engineer," 2024.

[7] X. Wang et al., "OpenHands: An Open Platform for AI Software Developers as Generalist Agents," arXiv:2407.16741, 2024.

[8] P. Gauthier, "Aider: AI pair programming in your terminal," GitHub, 2024.

[9] Anthropic, "Claude Code: Agentic coding tool," 2025.

[10] OpenAI, "Codex CLI: Lightweight coding agent," GitHub, 2025.

[11] Y. Bai et al., "Constitutional AI: Harmlessness from AI Feedback," arXiv:2212.08073, 2022.

[12] L. Ouyang et al., "Training language models to follow instructions with human feedback," NeurIPS, 2022.

[13] M. Chen et al., "Evaluating Large Language Models Trained on Code," arXiv:2107.03374, 2021.

[14] Guardrails AI, "guardrails: Adding guardrails to large language models," GitHub, 2023.

[15] Open Policy Agent, "Rego: Policy Language," openpolicyagent.org, 2024.

---

## Appendix A: Complete Block Reference

See [`docs/ZYAL_MISSION.md`](../docs/ZYAL_MISSION.md) for the complete syntax reference with YAML examples for all 40+ blocks.

## Appendix B: Example Runbooks

See [`docs/ZYAL/examples/`](../docs/ZYAL/examples/) for 8 production-ready runbooks:

| # | File | Blocks Demonstrated |
|---|---|---|
| 1 | `01-fix-until-green.zyal.yml` | `job`, `loop`, `stop`, `checkpoint`, `quality`, `rollback`, `done` |
| 2 | `02-hypothesis-tournament.zyal.yml` | `experiments`, `models`, `scoring`, `reduce`, `negative_memory` |
| 3 | `03-billion-loc-monorepo.zyal.yml` | `repo_intelligence`, `scope_control`, `blast_radius`, `capabilities` |
| 4 | `04-fleet-portfolio.zyal.yml` | `triggers`, `budgets`, `anti_recursion`, `idempotency` |
| 5 | `05-secure-mcp-lockdown.zyal.yml` | `capabilities`, `command_floor`, `security`, `sandbox` |
| 6 | `06-evidence-graph-merge.zyal.yml` | `evidence`, `workflow`, `approvals`, `rollback` |
| 7 | `07-self-improving-skills.zyal.yml` | `skills`, `quarantine`, `promotion`, `memory` |
| 8 | `08-full-power-runbook.zyal.yml` | All 40+ blocks end-to-end |

## Appendix C: Runtime Module Inventory

| Module | Lines | Purpose |
|---|---|---|
| `schema.ts` | 65K | Type definitions for all blocks |
| `parser.ts` | 48K | Sentinel extraction, YAML parsing, hash computation |
| `parser.test.ts` | 25K | Comprehensive test suite |
| `activation.ts` | 748 | Real-time ZYAL detection |
| `daemon.ts` | 29K | Core daemon loop |
| `daemon-store.ts` | 37K | SQLite-backed durable state (9 tables) |
| `daemon-incubator.ts` | 15K | 8-pass task maturation |
| `daemon-task-router.ts` | 7.6K | Risk/readiness scoring, lane routing |
| `daemon-observability.ts` | 6.7K | Spans, metrics, cost tracking |
| `daemon-sandbox.ts` | 6.5K | Execution isolation |
| `daemon-workflow.ts` | 6K | Durable state machine |
| `daemon-security.ts` | 5.5K | Secrets brokering, audit logging |
| `daemon-memory.ts` | 5.4K | Governed memory stores |
| `daemon-evidence.ts` | 4.9K | Proof bundles with SHA-256 signing |
| `daemon-assertions.ts` | 5K | Structured output contracts |
| `daemon-approvals.ts` | 4.5K | Human approval gates |
| `daemon-reduce.ts` | 4.1K | Result reduction strategies |
| `daemon-skills.ts` | 3.9K | Skill governance |
| `daemon-constraints.ts` | 3.2K | Runtime invariants |
| `daemon-guardrails.ts` | 2.9K | Input/output validation |
| `daemon-retry.ts` | 2.7K | Backoff policies |
| `daemon-on-handler.ts` | 2.4K | Signal-driven event handlers |
| `daemon-fanout.ts` | 2.1K | Parallel execution |
| `daemon-hooks.ts` | 1.7K | Lifecycle hook resolution |
| `daemon-context.ts` | 1.5K | Iteration prompt builder |
| `daemon-event.ts` | 1.7K | Typed event system |
| `zyal-flash.ts` | 4.4K | Multi-source gold overlay + fleet metrics |
| `zyal-sidebar.tsx` | — | Live ∞ ZYAL MODE sidebar |
