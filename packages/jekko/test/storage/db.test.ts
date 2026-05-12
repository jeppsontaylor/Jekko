import { describe, expect, test } from "bun:test"
import { Database as SQLiteDatabase } from "bun:sqlite"
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

  test("skips the stale project commands migration when the column already exists", () => {
    const previousSkip = process.env.JEKKO_SKIP_MIGRATIONS
    delete process.env.JEKKO_SKIP_MIGRATIONS

    Database.close()
    Database.Client.reset()

    try {
      const sqlite = new SQLiteDatabase(Database.Path)
      sqlite.exec("CREATE TABLE IF NOT EXISTS __drizzle_migrations (id integer primary key autoincrement, hash text not null, created_at integer not null, name text, applied_at text)")
      sqlite.exec("DELETE FROM __drizzle_migrations")
      sqlite.exec("INSERT INTO __drizzle_migrations (hash, created_at, name, applied_at) VALUES ('', 20260127222353, '20260127222353_familiar_lady_ursula', CURRENT_TIMESTAMP)")
      sqlite.close()

      const db = Database.Client()
      const columns = db.$client.prepare("PRAGMA table_info(`project`)").all() as Array<{ name?: string }>
      expect(columns.some((row) => row.name === "commands")).toBe(true)
    } finally {
      Database.close()
      Database.Client.reset()
      if (previousSkip === undefined) delete process.env.JEKKO_SKIP_MIGRATIONS
      else process.env.JEKKO_SKIP_MIGRATIONS = previousSkip
    }
  })
})
