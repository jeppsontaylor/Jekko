import { describe, expect } from "bun:test"
import { Effect, Layer, Schema } from "effect"
import fs from "fs/promises"
import path from "path"
import { CrossSpawnSpawner } from "@opencode-ai/core/cross-spawn-spawner"
import { OcalScriptSchema } from "../../src/agent-script/schema"
import { DaemonStore } from "../../src/session/daemon-store"
import { ProjectTable } from "../../src/project/project.sql"
import { ProjectID } from "../../src/project/schema"
import { SessionTable } from "../../src/session/session.sql"
import { SessionID } from "../../src/session/schema"
import { Database } from "../../src/storage/db"
import { testEffect } from "../lib/effect"
import { provideTmpdirInstance } from "../fixture/fixture"

function spec() {
  return Schema.decodeUnknownSync(OcalScriptSchema)({
    version: "v1",
    intent: "daemon",
    confirm: "RUN_FOREVER",
    id: "daemon-store-test",
    job: {
      name: "Store test",
      objective: "Exercise durable run storage.",
    },
    stop: {
      all: [{ git_clean: { allow_untracked: false } }],
    },
  })
}

describe("session.daemon-store", () => {
  const it = testEffect(Layer.mergeAll(DaemonStore.layer, CrossSpawnSpawner.defaultLayer))

  it.effect(
    "mirrors runs and leases queued tasks",
    provideTmpdirInstance(
      (directory) =>
      Effect.gen(function* () {
        const projectID = ProjectID.make("proj_daemon_store")
        const sessionID = SessionID.make("ses_daemon_store")
        const specValue = spec()

        yield* Effect.sync(() =>
          Database.use((db) => {
            db.insert(ProjectTable)
              .values({
                id: projectID,
                worktree: directory,
                vcs: "git",
                name: "Daemon Store Test",
                sandboxes: [],
                time_created: Date.now(),
                time_updated: Date.now(),
              })
              .run()
            db.insert(SessionTable)
              .values({
                id: sessionID,
                project_id: projectID,
                slug: "daemon-store",
                directory,
                title: "Daemon Store Test",
                version: "1.0.0",
                time_created: Date.now(),
                time_updated: Date.now(),
              })
              .run()
          }),
        )

        const store = yield* DaemonStore.Service
        const run = yield* store.createRun({
          rootSessionID: sessionID,
          activeSessionID: sessionID,
          spec: specValue,
          specHash: "sha256:test",
        })

        const events = yield* store.listEvents(run.id)
        expect(events.map((event) => event.event_type)).toEqual(["run.created"])

        const ledgerPath = path.join(directory, ".opencode", "daemon", run.id, "ledger.jsonl")
        const statePath = path.join(directory, ".opencode", "daemon", run.id, "STATE.md")
        const ledger = yield* Effect.promise(() => fs.readFile(ledgerPath, "utf8"))
        const state = yield* Effect.promise(() => fs.readFile(statePath, "utf8"))

        expect(ledger).toContain(`"event_type":"run.created"`)
        expect(state).toContain("# Store test")
        expect(state).toContain("- Status: created")

        yield* store.upsertTask({
          id: "task_daemon_store",
          run_id: run.id,
          external_id: "external-1",
          title: "Fix the thing",
          body_json: { goal: "fix the thing" },
          status: "queued",
          priority: 10,
          lease_worker_id: null,
          lease_expires_at: null,
          locked_paths_json: null,
          evidence_json: null,
        } as any)

        const leased = yield* store.leaseTask({ runID: run.id, workerID: "worker-1", ttlMs: 1000 })
        if (!leased) throw new Error("expected leased task")
        expect(leased.status).toBe("leased")
        expect(leased.lease_worker_id).toBe("worker-1")
        expect(leased.lease_expires_at).toBeGreaterThan(Date.now() - 1)

        const tasks = yield* store.listTasks(run.id)
        expect(tasks).toHaveLength(1)
        expect(tasks[0].status).toBe("leased")

        const pass = yield* store.beginTaskPass({
          runID: run.id,
          taskID: "task_daemon_store",
          passType: "scout",
          contextMode: "blind",
          sessionID,
        })
        expect(pass.pass_number).toBe(1)

        yield* store.appendTaskMemory({
          runID: run.id,
          taskID: "task_daemon_store",
          kind: "problem_statement",
          title: "Problem",
          summary: "Understand the daemon store task.",
          sourcePassID: pass.id,
        })
        yield* store.completeTaskPass({
          passID: pass.id,
          result: { summary: "scouted" },
          score: { readiness: 0.4 },
        })

        const passes = yield* store.listTaskPasses({ runID: run.id, taskID: "task_daemon_store" })
        const memory = yield* store.listTaskMemory({ runID: run.id, taskID: "task_daemon_store" })
        expect(passes).toHaveLength(1)
        expect(memory).toHaveLength(1)

        const capsulePath = path.join(directory, ".opencode", "daemon", run.id, "tasks", "task_daemon_store", "CAPSULE.md")
        const passPath = path.join(directory, ".opencode", "daemon", run.id, "tasks", "task_daemon_store", "PASSES", "001-scout.md")
        const scorePath = path.join(directory, ".opencode", "daemon", run.id, "tasks", "task_daemon_store", "SCORE.json")
        expect(yield* Effect.promise(() => fs.readFile(capsulePath, "utf8"))).toContain("Understand the daemon store task")
        expect(yield* Effect.promise(() => fs.readFile(passPath, "utf8"))).toContain("scout")
        expect(yield* Effect.promise(() => fs.readFile(scorePath, "utf8"))).toContain('"pass_count": 1')
      }),
      { git: true },
    ),
  )
})
