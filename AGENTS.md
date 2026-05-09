# Agent Instructions

Read `agent/JANKURAI_STANDARD.md` first. For explicit phase or MASTER_PLAN work only, read `agent/MASTER_PLAN.md` before `tips/phases/00-phase-index.md`. Keep generated artifacts under their declared source commands.

- Prefer short, dense context setup over prose.
- Run shell commands with `rtk` prefix when possible.
- For plan/protocol requests, include: objective, non-goals, assumptions, dependencies, completion criteria, stop conditions, read-first files, likely edit files, ownership boundaries, forbidden and generated/readonly zones, and validation proof fields.
- For this repo tasks touching `AGENTS.md` or `JANKURAI_TASKLIST.md`, update `Status`, `Assignee`, `Started`, `Completed`, `Touched files`, and `Proof receipt` consistently and explicitly.
- Proof-first discipline applies: status transitions should match proof artifacts before claiming `Complete`.
- Keep context economy high by staying concise, removing duplication, and routing to canonical docs where behavior is already defined.

## Tool call hygiene (jekko schema — exact, no exceptions)

Jekko tools use **camelCase** parameter names, not snake_case. Use the schemas below verbatim:

- **bash**: `{"command": "...", "description": "one-line summary"}` — both required.
- **read**: `{"filePath": "/absolute/path"}` — camelCase `filePath`, absolute path required. Never `file_path`, never relative paths. In git worktrees CWD differs from repo root.
- **edit**: `{"filePath": "/absolute/path", "oldString": "...", "newString": "..."}` — camelCase, all required.
- **write**: `{"filePath": "/absolute/path", "content": "..."}` — camelCase, both required.
- **task** (spawn sub-agent): `{"description": "3-5 words", "prompt": "...", "subagent_type": "..."}` — all three required.
