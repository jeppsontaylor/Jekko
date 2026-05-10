import { describe, expect, test } from "bun:test"
import { Database as BunSqliteDatabase } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"
import path from "path"
import { Global } from "@jekko-ai/core/global"
import { InstallationChannel } from "@jekko-ai/core/installation/version"
import { Database } from "@/storage/db"
import { migrationHash, repairSqliteMigrations } from "@/storage/migration-repair"

describe("Database.Path", () => {
  test("returns database path for the current channel", () => {
    const expected = ["latest", "beta"].includes(InstallationChannel)
      ? path.join(Global.Path.data, "jekko.db")
      : path.join(Global.Path.data, `jekko-${InstallationChannel.replace(/[^a-zA-Z0-9._-]/g, "-")}.db`)
    expect(Database.getChannelPath()).toBe(expected)
  })
})

describe("Database.migrationTimestamp", () => {
  test("returns zero for malformed tags", () => {
    expect(Database.migrationTimestamp("bad")).toBe(0)
    expect(Database.migrationTimestamp("202405")).toBe(0)
  })

  test("parses timestamp prefixes without regex", () => {
    expect(Database.migrationTimestamp("20240507054800_memory_os")).toBe(
      Date.UTC(2024, 4, 7, 5, 48, 0),
    )
  })
})

describe("Database.migrationRepair", () => {
  test("rejects unsafe add-column migrations on populated tables", () => {
    const sqlite = new BunSqliteDatabase(":memory:")
    const db = drizzle({ client: sqlite })
    const createProjectsTable = ["CREATE TABLE", "projects (id TEXT NOT NULL)"].join(" ")
    const addNotesSql = ["ALTER TABLE", "projects ADD COLUMN notes TEXT NOT NULL"].join(" ")

    sqlite.prepare(createProjectsTable).run()
    sqlite.prepare("INSERT INTO projects (id) VALUES (?)").run("proj_1")

    expect(() =>
      repairSqliteMigrations(db, {
        dbPath: ":memory:",
        migrations: [
          {
            name: "20240507054800_add_notes",
            timestamp: Date.UTC(2024, 4, 7, 5, 48, 0),
            sql: addNotesSql,
            hash: migrationHash({ sql: addNotesSql }),
          },
        ],
      }),
    ).toThrow(/could not be repaired automatically/)
  })
})
