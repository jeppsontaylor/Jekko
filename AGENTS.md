# Agent Instructions

Read `agent/JANKURAI_STANDARD.md` first. For explicit phase or MASTER_PLAN work only, read `agent/MASTER_PLAN.md` before `tips/phases/00-phase-index.md`. Keep generated artifacts under their declared source commands.

- Prefer short, dense context setup over prose.
- Run shell commands with `rtk` prefix when possible.
- For plan/protocol requests, include: objective, non-goals, assumptions, dependencies, completion criteria, stop conditions, read-first files, likely edit files, ownership boundaries, forbidden and generated/readonly zones, and validation proof fields.
- For this repo tasks touching `AGENTS.md` or `JANKURAI_TASKLIST.md`, update `Status`, `Assignee`, `Started`, `Completed`, `Touched files`, and `Proof receipt` consistently and explicitly.
- Proof-first discipline applies: status transitions should match proof artifacts before claiming `Complete`.
- Keep context economy high by staying concise, removing duplication, and routing to canonical docs where behavior is already defined.
