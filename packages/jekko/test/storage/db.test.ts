import { describe, expect, test } from "bun:test"
import path from "path"
import { Global } from "@jekko-ai/core/global"
import { InstallationChannel } from "@jekko-ai/core/installation/version"
import { Database } from "@/storage/db"

describe("Database.Path", () => {
  test("returns database path for the current channel", () => {
    const expected = ["latest", "beta"].includes(InstallationChannel)
      ? path.join(Global.Path.data, "jekko.db")
      : path.join(Global.Path.data, `jekko-${InstallationChannel.replace(/[^a-zA-Z0-9._-]/g, "-")}.db`)
    expect(Database.getChannelPath()).toBe(expected)
  })
})
