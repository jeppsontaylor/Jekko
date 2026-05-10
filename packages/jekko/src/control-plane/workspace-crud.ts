import { Effect, Iterable } from "effect"
import { asc, eq } from "drizzle-orm"
import * as WS from "./workspace-shared"
import { WorkspaceID } from "./schema"
import { Slug } from "@jekko-ai/core/util/slug"
import { errorData } from "@/util/error"
import { waitEvent } from "./util"

type CrudDeps = {
  auth: any
  session: any
  prompt: any
  http: any
  sync: any
  startSync: (space: WS.Info) => Effect.Effect<void>
  stopSync: (id: WorkspaceID) => Effect.Effect<void>
  syncHistory: (space: WS.Info, url: URL | string, headers: HeadersInit | undefined) => Effect.Effect<void>
}

export function makeWorkspaceCrud(deps: CrudDeps) {
  const create = Effect.fn("Workspace.create")(function* (input: WS.CreateInput) {
    const id = WorkspaceID.ascending(input.id)
    const adapter = WS.getAdapter(input.projectID, input.type)
    const config = yield* WS.EffectBridge.fromPromise(() =>
      adapter.configure({ ...input, id, name: Slug.create(), directory: null, extra: input.extra ?? null }),
    )

    const info: WS.Info = {
      id,
      type: config.type,
      branch: config.branch ?? null,
      name: config.name ?? null,
      directory: config.directory ?? null,
      extra: config.extra ?? null,
      projectID: input.projectID,
    }

    yield* WS.db((db) => {
      db.insert(WS.WorkspaceTable)
        .values({
          id: info.id,
          type: info.type,
          branch: info.branch,
          name: info.name,
          directory: info.directory,
          extra: info.extra,
          project_id: info.projectID,
        })
        .run()
    })

    const env = {
      JEKKO_AUTH_CONTENT: JSON.stringify(yield* deps.auth.all()),
      JEKKO_WORKSPACE_ID: config.id,
      JEKKO_EXPERIMENTAL_WORKSPACES: "true",
      OTEL_EXPORTER_OTLP_HEADERS: process.env.OTEL_EXPORTER_OTLP_HEADERS,
      OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
      OTEL_RESOURCE_ATTRIBUTES: process.env.OTEL_RESOURCE_ATTRIBUTES,
    }

    yield* WS.EffectBridge.fromPromise(() => adapter.create(config, env))
    yield* Effect.all(
      [
        waitEvent({
          timeout: WS.TIMEOUT,
          fn(event) {
            if (event.workspace === info.id && event.payload.type === WS.Event.Status.type) {
              const { status } = event.payload.properties
              return status === "error" || status === "connected"
            }
            return false
          },
        }),
        deps.startSync(info),
      ],
      { concurrency: 2, discard: true },
    )

    return info
  })

  const sessionWarp = Effect.fn("Workspace.sessionWarp")(function* (input: WS.SessionWarpInput) {
    return yield* Effect.gen(function* () {
      WS.log.info("session warp requested", {
        workspaceID: input.workspaceID,
        sessionID: input.sessionID,
      })

      const current = yield* WS.db((db) =>
        db
          .select({ workspaceID: WS.SessionTable.workspace_id })
          .from(WS.SessionTable)
          .where(eq(WS.SessionTable.id, input.sessionID))
          .get(),
      )

          if (current?.workspaceID) {
        const previous = yield* get(current.workspaceID)
        if (previous) {
          const adapter = WS.getAdapter(previous.projectID, previous.type)
          const target = yield* WS.EffectBridge.fromPromise(() => adapter.target(previous))

          if (target.type === "remote") {
            yield* deps.syncHistory(previous, target.url, target.headers).pipe(
              Effect.catch((error) =>
                Effect.sync(() => {
                  WS.log.warn("session warp final source sync failed", {
                    workspaceID: previous.id,
                    sessionID: input.sessionID,
                    error: errorData(error),
                  })
                }),
              ),
            )
          } else {
            yield* deps.prompt.cancel(input.sessionID)
          }

          WS.SyncEvent.claim(input.sessionID, input.workspaceID ?? WS.Instance.project.id)
        }
      }

      if (input.workspaceID === null) {
        yield* Effect.sync(() =>
          WS.SyncEvent.run(WS.Session.Event.Updated, {
            sessionID: input.sessionID,
            info: {
              workspaceID: null,
            },
          }),
        )

        WS.log.info("session warp complete", {
          workspaceID: input.workspaceID,
          sessionID: input.sessionID,
          target: "local",
        })
        return
      }

      const workspaceID = input.workspaceID
      const space = yield* get(workspaceID)
      if (!space)
        return yield* new WS.WorkspaceNotFoundError({
          message: `Workspace not found: ${workspaceID}`,
          workspaceID,
        })

      const adapter = WS.getAdapter(space.projectID, space.type)
      const target = yield* WS.EffectBridge.fromPromise(() => adapter.target(space))

        if (target.type === "local") {
        yield* deps.sync.run(WS.Session.Event.Updated, {
          sessionID: input.sessionID,
          info: {
            workspaceID: input.workspaceID,
          },
        })

        WS.log.info("session warp complete", {
          workspaceID: input.workspaceID,
          sessionID: input.sessionID,
          target: target.directory,
        })
        return
      }

      const rows = yield* WS.db((db) =>
        db
          .select({
            id: WS.EventTable.id,
            aggregateID: WS.EventTable.aggregate_id,
            seq: WS.EventTable.seq,
            type: WS.EventTable.type,
            data: WS.EventTable.data,
          })
          .from(WS.EventTable)
          .where(eq(WS.EventTable.aggregate_id, input.sessionID))
          .orderBy(asc(WS.EventTable.seq))
          .all(),
      )
      if (rows.length === 0)
        return yield* new WS.SessionEventsNotFoundError({
          message: `No events found for session: ${input.sessionID}`,
          sessionID: input.sessionID,
        })

      const batches = Iterable.chunksOf(rows, 10)
      const total = Iterable.size(batches)

      WS.log.info("session warp prepared", {
        workspaceID: input.workspaceID,
        sessionID: input.sessionID,
        target: String(WS.route(target.url, "/sync/replay")),
        events: rows.length,
        batches: total,
        first: rows[0]?.seq,
        last: rows.at(-1)?.seq,
      })

      yield* Effect.forEach(
        batches,
        (events, i) =>
          Effect.gen(function* () {
            const response = yield* deps.http.execute(
              WS.HttpClientRequest.post(WS.route(target.url, "/sync/replay"), {
                headers: new Headers(target.headers),
                body: WS.HttpBody.jsonUnsafe({
                  directory: space.directory ?? "",
                  events,
                }),
              }),
            )

            if (response.status < 200 || response.status >= 300) {
              const body = yield* response.text
              WS.log.error("session warp batch failed", {
                workspaceID: input.workspaceID,
                sessionID: input.sessionID,
                step: i + 1,
                total,
                status: response.status,
                body,
              })
              return yield* new WS.SessionWarpHttpError({
                message: `Failed to warp session ${input.sessionID} into workspace ${workspaceID}: HTTP ${response.status} ${body}`,
                workspaceID,
                sessionID: input.sessionID,
                status: response.status,
                body,
              })
            }

            WS.log.info("session warp batch posted", {
              workspaceID: input.workspaceID,
              sessionID: input.sessionID,
              step: i + 1,
              total,
              status: response.status,
            })
          }),
        { discard: true },
      )

      const response = yield* deps.http.execute(
        WS.HttpClientRequest.post(WS.route(target.url, "/sync/steal"), {
          headers: new Headers(target.headers),
          body: WS.HttpBody.jsonUnsafe({ sessionID: input.sessionID }),
        }),
      )
      if (response.status < 200 || response.status >= 300) {
        const body = yield* response.text
        WS.log.error("session warp steal failed", {
          workspaceID: input.workspaceID,
          sessionID: input.sessionID,
          status: response.status,
          body,
        })
        return yield* new WS.SessionWarpHttpError({
          message: `Failed to steal session ${input.sessionID} into workspace ${workspaceID}: HTTP ${response.status} ${body}`,
          workspaceID,
          sessionID: input.sessionID,
          status: response.status,
          body,
        })
      }

      WS.log.info("session warp complete", {
        workspaceID: input.workspaceID,
        sessionID: input.sessionID,
        batches: total,
      })
    }).pipe(
      Effect.tapError((err) =>
        Effect.sync(() =>
          WS.log.error("session warp failed", {
            workspaceID: input.workspaceID,
            sessionID: input.sessionID,
            error: errorData(err),
          }),
        ),
      ),
    )
  })

  const list = Effect.fn("Workspace.list")(function* (project: WS.Project.Info) {
    return yield* WS.db((db) =>
      db
        .select()
        .from(WS.WorkspaceTable)
        .where(eq(WS.WorkspaceTable.project_id, project.id))
        .all()
        .map(WS.fromRow)
        .sort((a, b) => a.id.localeCompare(b.id)),
    )
  })

  const get = Effect.fn("Workspace.get")(function* (id: WorkspaceID) {
    const row = yield* WS.db((db) => db.select().from(WS.WorkspaceTable).where(eq(WS.WorkspaceTable.id, id)).get())
    if (!row) return
    return WS.fromRow(row)
  })

  const remove = Effect.fn("Workspace.remove")(function* (id: WorkspaceID) {
    const sessions = yield* WS.db((db) =>
      db
        .select({ id: WS.SessionTable.id, parentID: WS.SessionTable.parent_id })
        .from(WS.SessionTable)
        .where(eq(WS.SessionTable.workspace_id, id))
        .all(),
    )
    const sessionIDs = new Set(sessions.map((sessionInfo) => sessionInfo.id))
    yield* Effect.forEach(
      sessions.filter((sessionInfo) => !sessionInfo.parentID || !sessionIDs.has(sessionInfo.parentID)),
      (sessionInfo) => deps.session.remove(sessionInfo.id).pipe(Effect.catchIf(WS.NotFoundError.isInstance, () => Effect.void)),
      { discard: true },
    )

    const row = yield* WS.db((db) => db.select().from(WS.WorkspaceTable).where(eq(WS.WorkspaceTable.id, id)).get())
    if (!row) return

    yield* deps.stopSync(id)

    const info = WS.fromRow(row)
    yield* Effect.catchCause(
      Effect.gen(function* () {
        const adapter = WS.getAdapter(info.projectID, row.type)
        yield* WS.EffectBridge.fromPromise(() => adapter.remove(info))
      }),
      () =>
        Effect.sync(() => {
          WS.log.error("adapter not available when removing workspace", { type: row.type })
        }),
    )

    yield* WS.db((db) => db.delete(WS.WorkspaceTable).where(eq(WS.WorkspaceTable.id, id)).run())
    return info
  })

  return {
    create,
    sessionWarp,
    list,
    get,
    remove,
  }
}

export const createWorkspaceCrud = makeWorkspaceCrud
