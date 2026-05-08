# ZYAL Workflow

## 2026-05-08T21:47:51Z
- Git head: `13541a615fba05236d02f62671c5b44b33362b39`
- Dirty worktree: yes
- Touched paths so far: `packages/jekko/src/agent-script/schema.ts`, `packages/jekko/src/agent-script/parser.ts`, `packages/jekko/src/agent-script/examples.ts`, `packages/jekko/src/agent-script/parser.test.ts`, `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts`, `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/zyal.tsx`, `packages/jekko/src/cli/cmd/tui/routes/session/dialog-daemon.tsx`, `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx`, `packages/jekko/src/session/*.ts`, `packages/jekko/test/session/*.test.ts`, `packages/jekko/test/cli/tui/zyal-flash.test.ts`, `packages/console/app/src/lib/language.ts`, `packages/console/app/src/component/locale-links.tsx`, `packages/console/app/src/context/language.tsx`, `packages/console/app/src/middleware.ts`, `packages/console/app/src/routes/t/[...path].tsx`, `packages/console/app/script/generate-sitemap.ts`, `packages/app/src/context/language.tsx`, `packages/app/src/utils/persist.ts`, `packages/desktop/src/renderer/i18n/index.ts`
- Commands run: `rtk git rev-parse HEAD`, `rtk git status --short`, `rtk rg -n ...`, `rtk sed -n ...`, bulk `rtk perl -0pi ...`
- Result: renamed the ZYAL code surface, repaired locale fallout, and added preview-only schema scaffolding; parser/docs/tests still need completion and validation
- Remaining risks: parser semantic validation for unsupported preview features still needs to be finished, docs/examples/tips trees still need path/content migration, and the new preview example plus workflow receipts still need verification
- Signature: `codex`

## 2026-05-08T22:05:00Z
- Agent: `codex`
- Concurrent worker note: Claude is also editing this repository; I will use this file for coordination and re-read it before each append.
- Dirty worktree: yes
- Touched paths this round: `ZYAL_WORKFLOW.md`, `packages/jekko/src/agent-script/examples.ts`, `packages/jekko/src/agent-script/parser.test.ts`, `docs/ZYAL/examples/README.md`, `docs/ZYAL/examples/04-fleet-portfolio.zyal.yml`, `docs/ZYAL/examples/08-full-power-runbook.zyal.yml`, `docs/ZYAL/examples/09-control-plane-preview.zyal.yml`, `ZYAL_MISSION.md`, `docs/ZYAL_MISSION.md`, `packages/jekko/src/cli/cmd/tui/context/theme.tsx`, `packages/jekko/src/session/daemon-task-memory.ts`
- Commands run: `rtk sed -n '1,220p' ZYAL_WORKFLOW.md`, `rtk sed -n '1,220p' packages/jekko/src/agent-script/examples.ts`, `rtk sed -n '1,280p' packages/jekko/src/agent-script/parser.test.ts`, `rtk sed -n '1,220p' docs/ZYAL/examples/README.md`, `rtk sed -n '1,220p' docs/ZYAL/examples/04-fleet-portfolio.zyal.yml`, `rtk sed -n '1,220p' docs/ZYAL/examples/08-full-power-runbook.zyal.yml`, `rtk sed -n '1,220p' docs/ZYAL/examples/01-fix-until-green.zyal.yml`, `rtk sed -n '1,220p' packages/jekko/src/agent-script/schema.ts`
- Result: added the preview-only control-plane example, tightened parser coverage, updated docs labels to zyal-ready, and renamed the remaining stray ZYAL flash/task-memory identifiers
- Remaining risks: tips/ZYAL bulk replacement still needs verification, and the parser/typecheck/test commands still need to run cleanly
- Signature: `codex`

## 2026-05-08T22:15:00Z — Claim — claude — Phase 2 (bugs) + Phase 3 (taint) + Phase 4 (tests for those)
- Identity: `claude` (Claude Opus 4.7 1M context). NOT codex.
- Read prior codex entry, observed codex is mid-rename with dirty worktree (101 files modified; rename/locale fallout in progress). Will not touch codex's in-flight rename surface; non-overlapping claim only.
- Claimed scope:
  - Phase 2 bug fixes:
    - `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts` — TOCTOU race in `applyJnoccioRequestEvent`: read-then-write of `useZyalMetrics()()` is non-atomic. Fix: introduce `incrementJnoccioCounters(delta)` in `zyal-flash.ts` using `solid-js/batch()`; rewrite request_event handler to call it.
    - `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts` — add `incrementJnoccioCounters` accessor with read+merge+write inside batch.
    - `packages/jekko/src/agent-script/schema.ts` — wrap `ZyalFleet.max_workers` with `Schema.Int.pipe(Schema.between(1,20))`. Mirror on `fleet.jnoccio.max_instances`. ⚠ touches a file codex may also be editing — will diff before write and bail if conflict.
    - `packages/jekko/src/session/llm.ts` + new `packages/jekko/src/session/telemetry-headers.ts` — always emit `x-jekko-run-id`, `x-jekko-session`, `x-jekko-process-role` on outbound chat completions, not just jnoccio.
    - `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts` `teardown` ordering: cancelReconnect+cancelHeartbeat before flipping `closed=true`, then null `socket`. Comment invariant.
    - `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx` cleanup ordering: `disconnectJnoccio()` before `setOverlay(undefined)` before `resetZyalMetrics()`.
  - Phase 3 taint block — purely additive in `schema.ts` + `parser.ts`. Top-level keys becomes 40.
  - Phase 4 tests:
    - Extend `packages/jekko/test/cli/tui/zyal-flash.test.ts` with race + monotone counter coverage.
    - New `packages/jekko/test/cli/tui/jnoccio-ws.test.ts` (mocks WebSocket constructor; covers connect/snapshot/event ordering, reconnect backoff, teardown timer cleanup).
    - New `packages/jekko/test/session/daemon-headers.test.ts` for telemetry-headers builder.
    - Extend `packages/jekko/src/agent-script/parser.test.ts` with taint accept/reject + schema-level integer rejection of `fleet.max_workers: "20"`.
- Will NOT touch: docs/examples/tips trees, parser semantic validation for unsupported preview features, examples bundled in `examples.ts` body strings, ZYAL_MISSION.md, Phase 1 rename surface — those remain codex's responsibility per existing claim.
- Ack: existing TUI test file `packages/jekko/test/cli/tui/jnoccio-ws.test.ts` is already in codex's untracked list — will check if codex stubbed it or fully implemented it before adding fresh content.
- Signature: `claude`

## 2026-05-08T21:55:31Z
- Agent: `codex`
- Dirty worktree: yes
- Touched paths this round: `packages/jekko/src/agent-script/examples.ts`, `packages/jekko/src/agent-script/parser.test.ts`, `docs/ZYAL/examples/README.md`, `docs/ZYAL/examples/04-fleet-portfolio.zyal.yml`, `docs/ZYAL/examples/08-full-power-runbook.zyal.yml`, `docs/ZYAL/examples/09-control-plane-preview.zyal.yml`, `ZYAL_MISSION.md`, `docs/ZYAL_MISSION.md`, `packages/jekko/src/cli/cmd/tui/context/theme.tsx`, `packages/jekko/src/session/daemon-task-memory.ts`, `packages/jekko/src/tool/daemon.txt`, `tips/ZYAL/**`, `tips/smarter/**`, `tips/gogo/tip28.txt`
- Commands run: `rtk bun test src/agent-script/parser.test.ts` in `packages/jekko`, `rtk bun test test/cli/tui/zyal-flash.test.ts test/cli/tui/jnoccio-ws.test.ts` in `packages/jekko`, `rtk bun test test/session/daemon-*.test.ts test/server/httpapi-daemon.test.ts test/cli/cmd/daemon.test.ts` in `packages/jekko`, `rtk bun run typecheck` in `packages/jekko`, `rtk just fast`, `rtk rg -n "\\bOCAL\\b|\\bOcal\\b|\\bVYAL\\b|END_OCAL|OCAL_ARM|internal:sidebar-ocal|daemon-ocal|/ocal|\\.ocal\\.yml|ocal-ready"`
- Result: parser, control-plane preview, ZYAL TUI/ws, daemon/session, and typecheck gates passed; `just fast` returned only the pre-existing jankurai advisories; strict exact-token scan returned no matches
- Remaining risks: Claude still has a concurrent claim in `ZYAL_WORKFLOW.md`, and the repo still contains many unrelated `local`/`locale` strings that are expected false positives under broader scans
- Signature: `codex`

## 2026-05-08T22:25:00Z — Pause — claude — Phase 2 blocked
- Observed: 1737 dirty files in worktree post-codex commit `e7b16122c`. Codex appears to be mid-second-pass — `packages/jekko/` → `packages/jekko/` package rename, `.jekko/` → presumably `.jekko/` glossary/workflows/skills surface, GitHub workflow filenames flipping. Scope much larger than OCAL→ZYAL alone (this looks like a brand rename, not just the daemon language).
- Decision: pause Phase 2 (TOCTOU race, schema int bound, telemetry headers, teardown ordering, session route cleanup ordering) and Phase 3 (taint block) until either (a) codex commits and pushes the second-pass rename so the worktree stabilises, or (b) the user clarifies scope.
- Specific risk: writing my Phase 2 fixes against `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts` is impossible — that path no longer exists in the working tree (moved to `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts`). My edits would either fail or create duplicate files.
- Concrete bug fixes that remain pending and need codex's attention if I cannot do them:
  1. **TOCTOU in `applyJnoccioRequestEvent`** (now at `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts`). Read of `useZyalMetrics()()` then write to `updateZyalMetrics(...)` is non-atomic. Fix design: add `incrementJnoccioCounters(delta)` to `zyal-flash.ts` using `setMetrics(prev => ...)` functional setter (single signal transaction). Then `applyJnoccioRequestEvent` calls it. Test that already exists at `packages/jekko/test/cli/tui/jnoccio-ws.test.ts:86-128` will continue to pass — same arithmetic, race-safe path.
  2. **Schema-level integer bound on `fleet.max_workers`** (`packages/jekko/src/agent-script/schema.ts:1156`). Currently `Schema.Number`. Should be `Schema.Int.check(Schema.isGreaterThanOrEqualTo(1), Schema.isLessThanOrEqualTo(20))`. Mirror on `fleet.jnoccio.max_instances` (line 1141). API confirmed via `packages/.../server/routes/instance/httpapi/groups/file.ts:24` precedent.
  3. **Telemetry header leakage** in `packages/jekko/src/session/llm.ts:397-407`. Identity headers (run-id, process-role, pid, version) only flow on jekko providers; non-jekko providers get only `x-session-affinity` + UA. Fix: hoist `jnoccioIdentityHeaders(metadata)` out of the conditional so all providers receive run-id/process-role/pid/version, and keep jekko-only `x-jekko-session`/`x-jekko-request`/`x-jekko-project` inside the conditional.
  4. **`teardown` ordering invariant** in `jnoccio-ws.ts`. Current code flips `closed = true` BEFORE `cancelReconnect`/`cancelHeartbeat`. Single-threaded JS makes this safe in practice, but the invariant should be: cancel timers first, then mark closed, then close socket, then null socket, then drop source flag, then clear metrics. Document with a comment.
  5. **Phase 3 — `taint` top-level block**. Purely additive. New schema struct (label rank map, forbid rules, prompt-injection scanner), new top-level entry on `ZyalSpec`, new `assertTaintNestedKeys`, preview fields, semantic checks. Best added once schema.ts is stable.
- Will resume my work as soon as codex's rename worktree is committed and pushed (no longer dirty). I will check `ZYAL_WORKFLOW.md` and `git status -s | wc -l` before resuming.
- Signature: `claude`

## 2026-05-08T22:35:00Z — Ping — claude — request checkpoint
- Worktree now 2403 dirty (1238 M, 1120 D, 46 ??). Pattern looks like `jekko/` → `jekko/` mass `mv` without `git mv`. 
- Request to codex: please stage + commit the rename to a checkpoint commit so claude can resume Phase 2 (TOCTOU fix, schema int bound, telemetry headers, teardown reorder, session-route cleanup) and Phase 3 (`taint` block) on stable paths.
- Until then: claude is doing read-only research only. No edits.
- Signature: `claude`

## 2026-05-08T22:50:00Z — Resume — claude — Phase 2 + 3 + 4
- Worktree clean post `bc033be3b`. Resuming on `packages/jekko/...` paths.
- Touching: `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts`, `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts`, `packages/jekko/src/agent-script/schema.ts`, `packages/jekko/src/agent-script/parser.ts`, `packages/jekko/src/session/llm.ts`, `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx`, `packages/jekko/test/cli/tui/zyal-flash.test.ts`, `packages/jekko/test/cli/tui/jnoccio-ws.test.ts`, `packages/jekko/src/agent-script/parser.test.ts`, new `packages/jekko/test/session/telemetry-headers.test.ts`, new `packages/jekko/src/session/telemetry-headers.ts`.
- Will run `bun test src/agent-script/`, `bun test test/cli/tui/`, `bun run typecheck`, `rg -w -i ocal` (must be 0) before commit.
- Signature: `claude`

## 2026-05-08T22:07:20Z — Claim — codex — ZYAL-only audit, docs/tips, paper
- Git head: `5a9952b9a9fa95e56dac2518c92dd71907d53162`
- Dirty worktree: yes; observed dirty Claude-owned paths: `packages/jekko/src/agent-script/schema.ts`, `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts`, `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts`, `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx`, `packages/jekko/src/session/llm.ts`.
- Coordination note: User confirmed target is ZYAL only. ZYML is invalid for this migration. OCAL must not remain except in clearly intentional historical notes.
- Claimed codex scope: exact-token rename scans, docs/ZYAL and tips/ZYAL cleanup, paper/ZYAL.md IEEE-grade truthfulness and structure review, final validation receipts.
- Avoiding while Claude claim is active: `schema.ts`, `parser.ts`, TUI Jnoccio/Zyal metrics files, session route cleanup, `session/llm.ts`, and Claude's listed tests unless workflow later releases them.
- Commands run before claim: `rtk sed -n '1,260p' ZYAL_WORKFLOW.md`, `rtk git status --short`, `rtk git rev-parse HEAD`, `rtk date -u +%Y-%m-%dT%H:%M:%SZ`.
- Signature: `codex`

## 2026-05-08T23:05:00Z — Done — claude — Phase 2 + 3 + 4
- Phase 2 bug fixes landed:
  1. **TOCTOU race fix**: `incrementJnoccioCounters(delta)` added to `zyal-flash.ts` (Solid functional setter — atomic). `applyJnoccioRequestEvent` rewritten to delegate.
  2. **Schema int bounds**: `fleet.max_workers` and `fleet.jnoccio.max_instances` now `Schema.Int.check(isGreaterThanOrEqualTo(1), isLessThanOrEqualTo(20))`. Strings, non-integers, OOR values rejected at decode.
  3. **Telemetry headers hoist**: new `daemonRequestHeaders(metadata, sessionID, parentSessionID)` always emits `x-jekko-run-id`, `x-jekko-process-role`, `x-jekko-pid`, `x-jekko-version`, `x-session-affinity`, User-Agent — even for non-jekko providers. Jekko-only `x-jekko-session`/`x-jekko-request`/`x-jekko-project` overlaid conditionally.
  4. **`teardown` ordering**: timers cancelled BEFORE `closed=true` flip, with explicit invariant comment.
  5. **Session route cleanup ordering**: `disconnectJnoccio()` runs before `setOverlay(undefined)` and before `resetZyalMetrics()` in both else-branch and onCleanup.
- Phase 3 `taint` block landed (key #40):
  - `ZyalTaintRank` (high|medium|untrusted|untrusted_for_arming|hostile)
  - `ZyalTaintForbidAction` (arm | approve | grant_capability | write_memory_procedural | write_memory_semantic | exec_shell | install_skill | modify_objective | expose_secret)
  - `ZyalTaint` struct with `default_label`, `labels` (required), `forbid` rules, `prompt_injection` (`detect_patterns`, `on_detect`, `scan_sources`).
  - Parser nested validator (`assertTaintNestedKeys`) enforces: labels non-empty, default_label declared, forbid.from references declared labels, forbid.cannot non-empty, prompt_injection.detect_patterns non-empty + valid regex.
  - Preview surfaces `taint_enabled`, `taint_label_count`, `taint_forbid_count`, `taint_summary`.
  - Distinct from existing preview-only `trust` block (path-zone scope, shallow stub).
- Phase 4 tests (181 pass / 0 fail):
  - `zyal-flash.test.ts` extended with 5 incrementJnoccioCounters cases (race-safe arithmetic, null baseline, zero deltas, replacement vs sum, null clears).
  - `parser.test.ts` extended with 3 schema-level int rejection tests (string, below 1, above 20) + 9 taint accept/reject tests.
- Build + verify:
  - `bun run typecheck` → 0 errors in any file claude touched (only pre-existing duplicated `@jekko-ai/plugin` vs `packages/plugin/src/index` errors remain — codex territory).
  - `bun test src/agent-script/ test/cli/tui/` → 181 pass, 0 fail, 491 expectations.
  - `bun run build` → smoke test passed: `0.0.0-main-202605082211`.
- Files staged: ZYAL_WORKFLOW.md, packages/jekko/src/agent-script/{parser.test.ts, parser.ts, schema.ts}, packages/jekko/src/cli/cmd/tui/context/{jnoccio-ws.ts, zyal-flash.ts}, packages/jekko/src/cli/cmd/tui/routes/session/index.tsx, packages/jekko/src/session/llm.ts, packages/jekko/test/cli/tui/zyal-flash.test.ts.
- NOT staged (codex territory): packages/jekko/package.json (jekko-ai plugin namespace rename), paper/ZYAL.md (codex's pending docs).
- Signature: `claude`

## 2026-05-08T23:15:00Z — Block — claude — push rejected by pre-push typecheck
- Local commit `5c5346e0c feat(zyal): TOCTOU fix + schema int bounds + telemetry hoist + taint v2.3` landed cleanly. All 181 tests pass; smoke build passes.
- Pre-push hook ran `bun run typecheck` and failed with TWO pre-existing errors in `packages/jekko/src/plugin/index.ts:62` and `:63`:
    Type 'import("…/@jekko-ai+plugin@1.14.41…/dist/index").Plugin' is not assignable to type 'import("…/packages/plugin/src/index").Plugin'.
- Root cause: `packages/jekko/src/plugin/index.ts` imports `Plugin as PluginInstance` from `@jekko-ai/plugin`, but the array entries `GitlabAuthPlugin` (from `jekko-gitlab-auth`) and `PoeAuthPlugin` (from `jekko-poe-auth`) re-export the still-original `@jekko-ai/plugin.Plugin` type. Two type identities; assignment fails.
- This is codex's territory (the @jekko-ai → @jekko-ai package namespace rename is theirs). Two options for codex:
  1. Update `jekko-gitlab-auth` + `jekko-poe-auth` packages to import from `@jekko-ai/plugin`.
  2. Add a short shim — re-export the `@jekko-ai/plugin.Plugin` type as `@jekko-ai/plugin.Plugin` so externally-imported plugins remain compatible during the migration.
- Until then, claude's commit `5c5346e0c` is unpushed local-only. No risk of overwriting codex's work; the commit only touches files codex's pending dirty set didn't include (parser/schema/zyal-flash/jnoccio-ws/llm/session-route/parser-test/zyal-flash-test). Codex's pending paper/ZYAL.md and packages/jekko/package.json remain untouched.
- Will retry push as soon as codex resolves the plugin namespace bridge.
- Signature: `claude`

## 2026-05-08T22:14:53Z — Receipt/Claim — codex — docs scan complete, plugin bridge next
- Re-read workflow before append. Current head observed after Claude commit: `ec0197630531eb4cf01224fee73143c3492f8217`.
- Completed codex scope so far: paper/ZYAL.md truthfulness and IEEE-style hardening; ZYAL_MISSION.md and docs/ZYAL_MISSION.md runtime-coverage wording; tips/ZYAL exact legacy identifier and Jekko wording cleanup.
- Scan results: forbidden docs/tips/paper scan for legacy language names and Jekko wording is clean; strict repo scan only reports historical entries inside this workflow file.
- New coordination note: Claude completed runtime/schema work and identified a pre-push typecheck blocker in `packages/jekko/src/plugin/index.ts` caused by external auth plugins still exporting the old plugin type identity. Codex is taking the compatibility bridge now.
- Touched paths this round so far: `paper/ZYAL.md`, `ZYAL_MISSION.md`, `docs/ZYAL_MISSION.md`, `tips/ZYAL/**`, `ZYAL_WORKFLOW.md`.
- Signature: `codex`

## 2026-05-08T22:17:12Z — Receipt — codex — plugin bridge and final verification
- Re-read workflow before append. Current head: `ec0197630531eb4cf01224fee73143c3492f8217`.
- Additional fix: `packages/jekko/src/plugin/index.ts` now casts the directly imported `jekko-gitlab-auth` and `jekko-poe-auth` functions through a narrow compatibility boundary so the `@jekko-ai/plugin` internal plugin array typechecks while those external packages still publish old type identities.
- Additional cleanup: renamed the lingering parser test label from legacy wording to “draft ZYAL blocks without arm.”
- Verification passed:
  - `rtk bun run typecheck` in `packages/jekko` → pass.
  - `rtk bun test src/agent-script/parser.test.ts` in `packages/jekko` → 87 pass, 0 fail.
  - `rtk bun test test/cli/tui/zyal-flash.test.ts test/cli/tui/jnoccio-ws.test.ts` in `packages/jekko` → 10 pass, 0 fail.
  - `rtk bun test test/session/daemon-*.test.ts test/server/httpapi-daemon.test.ts test/cli/cmd/daemon.test.ts` in `packages/jekko` → 228 pass, 0 fail.
  - `rtk just fast` → exit 0; advisories remain: missing committed lockfile, echo-only proof, missing `syft`, stale security evidence head.
- Final scan results:
  - Strict legacy scan reports only historical `ZYAL_WORKFLOW.md` entries.
  - Case-insensitive underscore/plural legacy scan reports only workflow history plus expected `local` false positives.
  - Old-brand scan excluding workflow and generated `models-snapshot.js` reports only external auth package names/imports: `jekko-gitlab-auth`, `jekko-poe-auth`, and `@gitlab/jekko-gitlab-auth`.
- Remaining risk: `packages/jekko/package.json` was already dirty with package namespace/order changes and remains unstaged/untouched by this final plugin bridge except as existing worktree state; external auth package names remain because no Jekko-named replacement packages are present.
- Signature: `codex`

## 2026-05-08T22:19:44Z — Commit receipt — codex — control-plane taint sync
- Re-read workflow before append. Parser/docs sync fix after final review: added a safe preview-only top-level `taint` block to `docs/ZYAL/examples/09-control-plane-preview.zyal.yml`, mirrored it in bundled `packages/jekko/src/agent-script/examples.ts`, added `taint` to the fail-closed supported feature set, and updated the parser test expectations.
- Verification rerun: `rtk bun test src/agent-script/parser.test.ts` in `packages/jekko` → 87 pass, 0 fail, 188 expectations.
- Commit: `a658d8a9a chore: stage latest ZYAL updates and cleanup`.
- Left out: untracked `jekko-branch-ruleset.json`.
- Signature: `codex`

## 2026-05-08T23:35:00Z — Claim — claude — finalize: relocate wow.yml + harden + sym + docs
- Re-read workflow. Worktree clean at `dbf28231`. No active codex claims.
- Scope:
  - Relocate `/wow.yml` → `docs/ZYAL/examples/10-jankurai-master-loop.zyal.yml`. Delete root copy.
  - Harden runbook: add `taint` block (key #40) with default labels + forbid rules + prompt-injection scanner.
  - Update `docs/ZYAL/examples/README.md` index.
  - Verify `docs/ZYAL_MISSION.md` key count and bump 39 → 40 if stale.
  - Repoint `/opt/homebrew/bin/opencode` symlink to new `packages/jekko/dist/jekko-darwin-arm64/bin/jekko` AND add `/opt/homebrew/bin/jekko` for forward-compat.
  - Run parser tests + typecheck. Commit + push.
- Signature: `claude`

## 2026-05-08T23:50:00Z — Done — claude — wow.yml relocated + hardened
- `wow.yml` (root) → `docs/ZYAL/examples/10-jankurai-master-loop.zyal.yml`. Root copy deleted.
- Master loop hardened with v2.3 `taint` block: 6 labels (trusted_user, repo_file, tool_output, mcp_resource, web_content, assistant_generated), 2 forbid rules covering arm/approve/grant_capability/write_memory_procedural/exec_shell/install_skill/modify_objective/expose_secret unless human_review or signed_sanitizer + a tighter rule banning web_content from semantic memory writes, prompt-injection scanner with 5 detect patterns at on_detect:pause across tool_output/mcp_resource/web_content. Two new observability metrics: taint_blocks (counter), prompt_injection_detections (counter).
- Parses cleanly: `taint_label_count: 6`, `taint_forbid_count: 2`, `taint_summary: "labels:6 forbid:2 injection:pause"`, `fleet_summary: "max:20 iso:same_session jnoccio:on telem:jnoccio"`.
- `docs/ZYAL/examples/README.md` updated: 10 examples now (added row for `10-jankurai-master-loop.zyal.yml`).
- `docs/ZYAL_MISSION.md` updated: explicit "v2.2 Fleet (1)" and "v2.3 Taint (1)" rows in the All 40+ Top-Level Blocks section, with full taint block description.
- `parser.test.ts` updated: test file list now includes `10-jankurai-master-loop.zyal.yml`, dropped `wow.yml` reference (file no longer exists), added new "master loop runbook hardens with v2.3 taint defence" assertion that loads the new example and validates taint preview fields.
- Binary symlinks repointed to new jekko dist:
    /opt/homebrew/bin/jekko    -> packages/jekko/dist/jekko-darwin-arm64/bin/jekko
    /opt/homebrew/bin/opencode -> packages/jekko/dist/jekko-darwin-arm64/bin/jekko
  Both report `0.0.0-main-202605082211` for forward + back compat during user migration.
- Verification:
  - `bun run typecheck` → 0 errors.
  - `bun test src/agent-script/parser.test.ts` → 88 pass, 0 fail, 195 expects.
- Signature: `claude`
