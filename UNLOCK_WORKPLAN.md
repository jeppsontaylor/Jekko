# Jnoccio Unlock Workplan

Shared coordination log for the locked Jnoccio Fusion provider and local
git-crypt unlock flow. Keep entries append-only and re-read this file plus
`ZYAL_WORKFLOW.md` before each edit batch.

## Active Claims

- 2026-05-09T00:57:58Z — Codex claim: implement locked Jnoccio provider metadata, unlock API/service, TUI unlock UX, encryption checker hardening, docs/env updates, tests, SDK regeneration, and proof receipts. Claimed paths include `packages/jekko/src/provider/**`, `packages/jekko/src/server/routes/instance/httpapi/**`, `packages/jekko/src/cli/cmd/tui/**`, `packages/jekko/test/**`, `packages/sdk/js/**` generated SDK outputs, `tools/check-encrypted-paths.sh`, `.husky/check-encrypted-paths`, `.gitignore`, `jnoccio-fusion/.env.jnoccio.example`, `jnoccio-fusion/KEYS.md`, `jnoccio-fusion/ENCRYPTION.md`, and this workplan.
- 2026-05-09T01:24:46Z — Codex claim closed. Implementation is in the worktree; remaining validation/generation blockers are recorded below.

## Decisions

- Unlock asks for a local key-file path and never accepts pasted key material.
- `.env.jnoccio` is local-only, ignored, and created from `.env.jnoccio.example` only when missing.
- Locked Jnoccio metadata lives in public Jekko code; encrypted `jnoccio-fusion` source remains protected.
- Real-key unlock tests are local-only and skip in CI, when `JNOCCIO_GIT_CRYPT_KEY_PATH` is absent, or when `git-crypt` is unavailable.

## Receipts

- 2026-05-09T00:57:58Z — Started. Re-read `AGENTS.md`, `agent/JANKURAI_STANDARD.md`, owner/test maps, generated zones, boundaries, `ZYAL_WORKFLOW.md`, `.gitattributes`, `.gitignore`, and encryption scripts. No active Claude claim found; worktree was clean before edits.
- 2026-05-09T01:24:46Z — Implemented locked Jnoccio Fusion provider metadata, `POST /provider/jnoccio/unlock` in legacy and experimental provider routes, injectable unlock service, TUI locked-model/provider unlock dialog, `.env.jnoccio` placeholder creation, provider/default filtering for locked models, generated SDK type/client updates, encryption checker index/blob mode, docs/env updates, and focused tests.
- 2026-05-09T01:24:46Z — Passing proof:
  - `rtk bun test test/jnoccio/unlock.test.ts test/provider/jnoccio-locked.test.ts` in `packages/jekko` → 9 pass / 0 fail.
  - `rtk bun test test/jnoccio/encryption-check.test.ts` in `packages/jekko` → 3 pass / 0 fail.
  - `rtk bun test test/cli/cmd/tui/sync.test.tsx` in `packages/jekko` → 4 pass / 0 fail.
  - `rtk bun test test/local/jnoccio-unlock.local.test.ts` in `packages/jekko` → 1 skip because `JNOCCIO_GIT_CRYPT_KEY_PATH` was absent.
  - `rtk bun test test/session/llm.test.ts` in `packages/jekko` → 17 pass / 0 fail.
  - `rtk bun run typecheck` in `packages/jekko` → pass.
  - `rtk cargo test` in `jnoccio-fusion` → 77 pass / 0 fail.
  - `rtk tools/check-encrypted-paths.sh --index` → 46 protected Jnoccio files encrypted in index mode.
  - `rtk git diff --check` → pass.
  - `rtk git ls-files jnoccio-fusion/.env.jnoccio` → no tracked local env file.
  - `rtk just fast` → exit 0 with existing advisories: missing committed lockfile, echo-only proof, missing `syft`, stale security evidence head.
- 2026-05-09T01:24:46Z — Partial/failed proof:
  - `rtk bun test test/server/httpapi-provider.test.ts test/cli/cmd/tui/sync.test.tsx` in `packages/jekko` → `sync.test.tsx` passes, but `test/server/httpapi-provider.test.ts` fails before the OAuth parity assertion with `Service not found: @jekko/Config`.
  - `rtk bun run --cwd packages/sdk/js build` did not complete; isolated `rtk bun run --conditions=browser ./src/index.ts generate` in `packages/jekko` exited 0 but emitted a zero-byte OpenAPI file. Generated SDK source was manually patched and formatted.
  - Strict legacy token scan for `OCAL`, `Ocal`, `ZYML`, `VYAL`, `internal:sidebar-ocal`, `.ocal.yml`, and `ocal-ready` still reports noisy/pre-existing matches in archive-style `tips/smarter/*.txt` content plus false positives such as `LOCAL_API_KEY`/`LOCALE*`. Actionable source `ZYML` hits in TUI logo/UI code were corrected.
- 2026-05-09T02:17:29Z — Real local key verification:
  - Verified `~/jnoccio-fusion.key` is readable and expands to the expected local key file.
  - Fixed the local unlock service to treat an already-unlocked repo as success while still creating or preserving `.env.jnoccio`.
  - Fixed `tools/check-encrypted-paths.sh --index` syntax and adjusted the local real-key test to run the current checker against the fresh clone's index.
  - `JNOCCIO_GIT_CRYPT_KEY_PATH=~/jnoccio-fusion.key rtk bun test test/local/jnoccio-unlock.local.test.ts` in `packages/jekko` → 1 pass / 0 fail.
  - Direct service call `unlockJnoccioFusion({ keyPath: "~/jnoccio-fusion.key" })` → `status: "unlocked"`, `unlocked: true`, created local ignored `jnoccio-fusion/.env.jnoccio`.
  - `rtk cargo metadata --manifest-path jnoccio-fusion/Cargo.toml --no-deps --format-version 1` → pass.
  - `rtk git check-ignore -v jnoccio-fusion/.env.jnoccio` → ignored by `jnoccio-fusion/.gitignore`; `rtk git ls-files jnoccio-fusion/.env.jnoccio` → no tracked file.
  - `rtk tools/check-encrypted-paths.sh --index` → 46 protected Jnoccio files encrypted in index mode.
  - `rtk bun test test/jnoccio/unlock.test.ts test/provider/jnoccio-locked.test.ts` in `packages/jekko` → 10 pass / 0 fail.

## Touched Files

- `UNLOCK_WORKPLAN.md`
- `ZYAL_WORKFLOW.md`
- `.gitignore`
- `.husky/check-encrypted-paths`
- `tools/check-encrypted-paths.sh`
- `jnoccio-fusion/.env.jnoccio.example`
- `jnoccio-fusion/ENCRYPTION.md`
- `jnoccio-fusion/KEYS.md`
- `packages/jekko/src/util/jnoccio-unlock.ts`
- `packages/jekko/src/provider/provider.ts`
- `packages/jekko/src/provider/models.ts`
- `packages/jekko/src/config/provider.ts`
- `packages/jekko/src/v2/model.ts`
- `packages/jekko/src/server/routes/instance/httpapi/groups/provider.ts`
- `packages/jekko/src/server/routes/instance/httpapi/handlers/provider.ts`
- `packages/jekko/src/server/routes/instance/index.ts`
- `packages/jekko/src/server/routes/instance/provider.ts`
- `packages/jekko/src/cli/cmd/tui/component/dialog-jnoccio-unlock.tsx`
- `packages/jekko/src/cli/cmd/tui/component/dialog-model.tsx`
- `packages/jekko/src/cli/cmd/tui/component/dialog-provider.tsx`
- `packages/jekko/src/cli/cmd/tui/component/use-connected.tsx`
- `packages/jekko/src/cli/cmd/tui/context/local.tsx`
- `packages/jekko/src/cli/cmd/tui/component/logo.tsx`
- `packages/jekko/src/cli/ui.ts`
- `packages/jekko/test/jnoccio/unlock.test.ts`
- `packages/jekko/test/jnoccio/encryption-check.test.ts`
- `packages/jekko/test/local/jnoccio-unlock.local.test.ts`
- `packages/jekko/test/provider/jnoccio-locked.test.ts`
- `packages/jekko/test/cli/cmd/tui/sync.test.tsx`
- `packages/sdk/js/src/gen/types.gen.ts`
- `packages/sdk/js/src/v2/gen/sdk.gen.ts`
- `packages/sdk/js/src/v2/gen/types.gen.ts`

## Blockers

- Experimental provider HttpApi parity test still fails with missing `@jekko/Config` service before the OAuth assertion. The focused locked-provider, TUI sync, unlock service, encryption, typecheck, and cargo tests pass.
- SDK regeneration is blocked by the current OpenAPI generation path producing a zero-byte spec/hanging package build; generated SDK files were patched manually to keep TypeScript consumers aligned.
- Broad strict legacy-token scan remains noisy against archived tips and substring false positives; source-level `ZYML` regressions found during this work were fixed.
