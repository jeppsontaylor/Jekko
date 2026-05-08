import { describe, expect, test } from "bun:test"
import { DaemonPaths } from "../../src/server/routes/instance/httpapi/groups/daemon"

describe("daemon http api", () => {
  test("exposes the daemon task routes", () => {
    expect(DaemonPaths.preview).toBe("/daemon/preview")
    expect(DaemonPaths.start).toBe("/session/:sessionID/daemon/start")
    expect(DaemonPaths.tasks).toBe("/daemon/:runID/tasks")
    expect(DaemonPaths.taskPasses).toBe("/daemon/:runID/tasks/:taskID/passes")
    expect(DaemonPaths.incubator).toBe("/daemon/:runID/incubator")
  })
})
