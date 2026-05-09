import { rm, readdir, readFile } from "fs/promises"
import path from "path"
import { Database as BunSqlite } from "bun:sqlite"
import { Database } from "@/storage/db"
import { disposeAllInstances } from "./fixture"
import { migrationHash } from "@/storage/migration-repair"

const MIGRATION_DIR = path.join(import.meta.dir, "..", "..", "..", "..", "db", "migrations")

async function seedSchema(dbPath: string) {
  const seedDb = new BunSqlite(dbPath)
  try {
    seedDb.exec("PRAGMA foreign_keys = ON")
    seedDb.exec("PRAGMA journal_mode = WAL")
    seedDb.exec("PRAGMA synchronous = NORMAL")
    seedDb.exec("PRAGMA busy_timeout = 5000")

    const entries = (await readdir(MIGRATION_DIR, { withFileTypes: true }))
      .filter((item) => item.isDirectory())
      .map((item) => item.name)
      .sort()

    for (const entry of entries) {
      const sql = await readFile(path.join(MIGRATION_DIR, entry, "migration.sql"), "utf8")
      seedDb.exec(sql)
    }

    seedDb.exec(`
      CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
        id INTEGER PRIMARY KEY,
        hash text NOT NULL,
        created_at numeric,
        name text,
        applied_at TEXT
      )
    `)
    const insert = seedDb.prepare(
      `INSERT INTO "__drizzle_migrations" ("hash", "created_at", "name", "applied_at") VALUES (?, ?, ?, ?)`,
    )
    const migrationTime = (tag: string) => {
      const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/.exec(tag)
      if (!match) return 0
      return Date.UTC(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3]),
        Number(match[4]),
        Number(match[5]),
        Number(match[6]),
      )
    }
    const appliedAt = new Date().toISOString()
    for (const entry of entries) {
      const sql = await readFile(path.join(MIGRATION_DIR, entry, "migration.sql"), "utf8")
      insert.run(migrationHash({ sql }), migrationTime(entry), entry, appliedAt)
    }
  } finally {
    seedDb.close()
  }
}

export async function resetDatabase() {
  await disposeAllInstances().catch(() => undefined)
  Database.close()
  await rm(Database.Path, { force: true }).catch(() => undefined)
  await rm(`${Database.Path}-wal`, { force: true }).catch(() => undefined)
  await rm(`${Database.Path}-shm`, { force: true }).catch(() => undefined)
  await seedSchema(Database.Path)
}
