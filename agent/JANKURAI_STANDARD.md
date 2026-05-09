# jankurai Standard Agent Bootstrap

Standard version: `0.8.0`

Read `docs/agent-native-standard.md` when policy detail matters. Use `agent/owner-map.json`, `agent/test-map.json`, `agent/generated-zones.toml`, `agent/proof-lanes.toml`, `agent/tool-adoption.toml`, and `agent/boundaries.toml` before editing.

## ZYAL / loop lane policy (do-not-ask)

ZYAL jobs and `*.sh` jankurai loops run headless. They MUST NOT stall on a permission prompt or on a task's `Eligibility: human-required` tag. The runtime sets `ZYAL_RUN=1` and/or `JEKKO_AUTO_ALLOW_READS=1` so the Jekko permission gate auto-allows read-like access anywhere on the filesystem. Non-read permission asks are allowed only when configured; otherwise they fail immediately without waiting for a human prompt. Tasks tagged `human-required` are agent-eligible whenever the fix is contained in the declared allowed paths, the proof lane is local, and the change does not rotate secrets, change prod credentials, mutate generated zones, run destructive migrations, or alter external service behavior. Only those listed exceptions still block — record them as `Blocked` with a reason and exit.

**Unattended permission semantics — `ask` ≡ silent deny.** In a daemon/loop spec, any `permissions:` entry set to `ask` becomes a deterministic silent deny under `JEKKO_NO_HUMAN_PROMPTS=1` / `ZYAL_RUN=1`. Specs that need shell, commit, push, workers, or MCP from the loop MUST declare those as `allow` explicitly. `deny` still denies. `allow` still allows. The legacy `ask` shorthand for "prompt the human" only fires in interactive `jekko` sessions. Read-class tools (`read`, `list`, `glob`, `grep`, plus `external_directory` with `metadata.access: "read"`) auto-allow regardless of spec, since the lane sets reads-permissive globally. Reference: `packages/jekko/src/permission/read-like.ts`, `packages/jekko/src/permission/index.ts` (`Permission.ask` env-gated path).
