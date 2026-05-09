# ZYAL Workflow

Single shared append-only log for all agents touching the ZYAL surface
(jekko package, jnoccio-fusion gateway, docs, tips, examples).

**Conventions** — every entry ends with `— <agent-name>`. Agents re-read
this file before each append. Earlier completed work folds into the
**Archive** at the bottom; only active claims, recent receipts, and open
coordination notes live above.

## Active claims / open coordination

No active codex claim. The 2026-05-09T00:36:01Z codex claim is closed by the 2026-05-09T00:42:17Z Done receipt below.

## Recent receipts

### 2026-05-09T00:42:17Z — Done — codex — Gap A + Run Card + docs verified

- Re-read workflow before append. No new edit conflict; Claude has ceded Gap A to codex and finished Gap B/C separately.
- Completed:
  - `jnoccio-fusion/src/router.rs` accepts both header families, preferring `x-jekko-*` and falling back to legacy `x-opencode-*`; tests cover Jekko, legacy, and mixed preference.
  - `packages/jekko/src/session/llm.ts` and `packages/jekko/test/session/llm.test.ts` are already at intended state in HEAD: all outbound LLM calls create daemon metadata, and tests cover non-Jekko + `provider: jnoccio` identity headers.
  - `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx` Start daemon confirmation now renders a Run Card with checkpoint, fleet/Jnoccio, arming, capabilities, budgets, taint, unsupported-feature policy, risk flags, and preview-only notes.
  - Jnoccio docs/snippets now use `/Users/bentaylor/Code/opencode/jnoccio-fusion` and the current 20-total-instance cap.
  - ZYAL docs now call out `taint` as parse/preview-only in this patch.
- Verification:
  - `rtk bun test test/session/llm.test.ts` in `packages/jekko` → 17 pass / 0 fail.
  - `rtk bun test src/agent-script/parser.test.ts` in `packages/jekko` → 88 pass / 0 fail.
  - `rtk bun test test/cli/tui/zyal-flash.test.ts test/cli/tui/jnoccio-ws.test.ts` in `packages/jekko` → 10 pass / 0 fail.
  - `rtk bun run typecheck` in `packages/jekko` → pass.
  - `rtk rustfmt --edition 2024 --check src/router.rs` in `jnoccio-fusion` → pass.
  - `rtk cargo test` in `jnoccio-fusion` → 77 pass / 0 fail.
  - Strict legacy token scan for `OCAL`, `Ocal`, `ZYML`, `VYAL`, `internal:sidebar-ocal`, `.ocal.yml`, `ocal-ready` → no matches.
  - `rtk git diff --check` → pass.
  - `rtk just fast` → exit 0 with existing advisories: missing committed lockfile, echo-only proof, missing `syft`, stale security evidence head.
- Formatting note: full `cargo fmt --check` still reports pre-existing formatting drift outside this patch (`fusion.rs`, `mcp.rs`, `state.rs`, `tests/mcp.rs`); only touched router was formatted.
- Remaining dirty outside codex scope: pre-existing `packages/jekko/src/cli/logo.ts`.

— codex

### 2026-05-09T00:39:43Z — Progress — codex — Gap A + Run Card + docs edits staged in worktree

- Re-read workflow after Claude compacted it; active codex claim remains for Gap A/header compatibility plus Run Card/docs drift.
- Edited so far:
  - `jnoccio-fusion/src/router.rs`: header parser now prefers `x-jekko-*` and falls back to `x-opencode-*`; unit tests added for Jekko, legacy, and preference behavior.
  - `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx`: Start daemon confirmation now renders a Run Card with checkpoint, fleet/Jnoccio, arming, capabilities, budgets, taint, unsupported-feature policy, risk flags, and explicit preview-only notes for hash/nonce/origin arming and taint.
  - Jnoccio docs: stale `/Users/bentaylor/Code/jekko` paths and 10-instance wording updated toward `/Users/bentaylor/Code/opencode` and the current 20-instance cap.
  - ZYAL docs: Run Card and taint preview-only wording made explicit.
- Next: confirm Jekko `llm.ts` / `llm.test.ts` state after concurrent workflow edits, then run targeted tests.

— codex

### 2026-05-09T00:55:00Z — Done — claude — Gap B + Gap C + workflow compact

Ceded Gap A to codex (00:36:01Z claim). Landed:

- **Gap B — master-loop runbook commands** (`docs/ZYAL/examples/10-jankurai-master-loop.zyal.yml`):
  - `stop.all[0]` `jankurai audit` now writes to `/tmp/jankurai-stop.json` then `jq -e '.findings | length == 0'` against the file. Same fix in `before_iteration` + `constraints[0]` (per-purpose temp paths).
  - `before_checkpoint` + `checkpoint.verify[1]` switched from missing `bun run lint` to `(cd packages/jekko && bun run typecheck)` so the runbook works against the canonical script set.
  - `capabilities.shell-tests` regex tightened: `tsgo --noEmit` removed; `bun|pnpm|npm run typecheck` allowed; lint dropped.
  - Verify steps explicitly `cd packages/jekko` first since the master-loop runs from repo root.
- **Gap C — `# Setup` preamble** added to runbook documenting the `@ai-sdk/openai-compatible` config to point `provider: jnoccio` at `http://127.0.0.1:4317/v1` until a native jnoccio provider is registered in `packages/jekko/src/provider/provider.ts`.
- **Workflow file compaction**: 259 lines → ~80 lines. Earlier done entries (21:47:51Z through 23:50:00Z) folded into the Archive at the bottom as one-line summaries.
- Verification: `bun test src/agent-script/parser.test.ts` → 88 pass / 0 fail. Runbook parses clean (taint preview unchanged: 6 labels, 2 forbid rules, prompt-injection scan).

NOT touched (codex territory): `jnoccio-fusion/src/router.rs`, `packages/jekko/src/session/llm.ts`, TUI Run Card, jnoccio docs paths, `provider.ts`, `agent/repo-score.{json,md}`.

— claude

## Archive (closed work — chronological one-liners)

- **2026-05-08T21:47:51Z — codex** — initial ZYAL rename + locale fallout (head 13541a6).
- **2026-05-08T21:55:31Z — codex** — parser/control-plane/TUI/daemon/typecheck gates passing.
- **2026-05-08T22:05:00Z — codex** — preview-only control-plane example, parser coverage, doc labels, ZYAL flash/task-memory rename.
- **2026-05-08T22:07:20Z — codex** — ZYAL-only audit claim (head 5a9952b).
- **2026-05-08T22:14:53Z — codex** — paper/ZYAL.md IEEE-grade hardening + tips/ZYAL exact-token cleanup.
- **2026-05-08T22:15:00Z — claude** — Phase 2/3/4 claim.
- **2026-05-08T22:17:12Z — codex** — `packages/jekko/src/plugin/index.ts` compatibility cast for external auth plugins (`jekko-gitlab-auth`, `jekko-poe-auth`).
- **2026-05-08T22:19:44Z — codex** — control-plane preview taint sync (commit a658d8a).
- **2026-05-08T22:25:00Z–22:50:00Z — claude** — Phase 2 paused/resumed around codex's opencode→jekko rename (worktree peaked 2403 dirty; resumed post bc033be3).
- **2026-05-08T23:05:00Z — claude** — Phase 2 + 3 + 4 done: TOCTOU `incrementJnoccioCounters` atomic merge; schema int bounds on `fleet.max_workers` + `fleet.jnoccio.max_instances`; telemetry-headers hoist via `daemonRequestHeaders`; `teardown` ordering invariant; session-route cleanup ordering; new `taint` top-level block (key #40) with full validator; 12 new tests covering atomic counter race + 9 taint accept/reject + 3 schema int rejection. Local commit 5c5346e0.
- **2026-05-08T23:15:00Z — claude** — push initially blocked by pre-push typecheck on plugin/index.ts; codex landed compatibility cast (22:17Z entry above).
- **2026-05-08T23:35:00Z–23:50:00Z — claude** — finalize: relocate `wow.yml` → `docs/ZYAL/examples/10-jankurai-master-loop.zyal.yml`, harden with v2.3 `taint` (6 labels, 2 forbid rules, 5 injection patterns), bump key count, repoint `/opt/homebrew/bin/{jekko,opencode}` symlinks. 88 parser tests pass; pushed (a7f96cd1e).
- **2026-05-09T00:15:00Z — claude** — audit findings posted: 7 gaps surfaced (header prefix mismatch, runbook commands, test failures, no jnoccio provider registration, preview-only enforcement gaps, sequential incubator, missing MCP spawn linkage).
- **2026-05-09T00:42:00Z — claude** — claim refined: ceded Gap A to codex, took Gap B + Gap C + workflow compact.
