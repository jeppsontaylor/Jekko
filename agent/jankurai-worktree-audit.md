# Jankurai Worktree Audit

Date: 2026-05-07
Scope: worker 3 only

## Snapshot

- `rtk git status --porcelain=v1`
- `rtk git diff --stat`
- `rtk git diff --name-status`
- `rtk git diff --check`
- `rtk git ls-files -d`
- `rtk git ls-files --others --exclude-standard`

## Disposition

### Keep

- `packages/ui/src/assets/favicon/apple-touch-icon-v3.png` deletion kept
- `packages/ui/src/assets/favicon/favicon-96x96-v3.png` deletion kept
- `packages/ui/src/assets/favicon/favicon-v3.ico` deletion kept
- `packages/ui/src/assets/favicon/favicon-v3.svg` deletion kept
- `packages/ui/src/assets/icons/file-types/folder-backup-open.svg` deletion kept
- `packages/ui/src/assets/icons/file-types/folder-backup.svg` deletion kept
- `packages/web/src/assets/lander/copy.svg` deletion kept
- `packages/console/app/src/asset/lander/copy.svg` deletion kept
- `packages/console/app/src/asset/brand/opencode-brand-assets.zip` deletion kept
- `agent/repo-score.json` and `agent/repo-score.md` kept for regeneration only

### Fix First

- `JANKURAI_TASKLIST.md` protocol drift fixed by normalizing `Status: Completed` to `Status: Complete`

### Restore

- None. No deleted asset under the scoped build paths had a live import requiring restore.

### Remove

- `JANKURAI_TASKLIST.md.bak`
- `JANKURAI_TASKLIST.md.corrupted_backup`

## Evidence

- `packages/web/src/components/Lander.astro` now imports `../assets/lander/clipboard.svg`, not `copy.svg`
- `packages/ui/src/components/favicon.tsx` references non-v3 favicon files that still exist
- `packages/web/astro.config.mjs` references the same non-v3 favicon files
- `packages/console/app/src/component/email-signup.tsx` still uses `default_value`, but that is out of worker 3 scope

## Notes

- Proof receipts in `JANKURAI_TASKLIST.md` were left untouched unless backed by an actual proof run.
- Remaining dirty paths outside this scope were intentionally not changed.
