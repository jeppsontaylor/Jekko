import crypto from "crypto"
import fs from "fs"
import { sql } from "drizzle-orm"
import { type SQLiteBunDatabase } from "drizzle-orm/bun-sqlite"

export type MigrationEntry = {
  sql: string
  timestamp: number
  name: string
  hash: string
}

export type MigrationRepairReport = {
  backedUp: string[]
  repaired: string[]
  recreatedMigrationTable: boolean
}

type TableInfoRow = {
  cid: number
  name: string
  type: string
  notnull: number
  dflt_value: string | null
  pk: number
}

type MasterRow = {
  type: string
  name: string
  tbl_name: string | null
  sql: string | null
}

type MigrationRow = {
  id: number
  hash: string
  created_at: number | string | null
  name: string | null
  applied_at: string | null
}

const MIGRATIONS_TABLE = "__drizzle_migrations"

function quoteIdentifier(name: string) {
  return `"${name.replaceAll('"', '""')}"`
}

function quoteLiteral(value: string | number) {
  return `'${String(value).replaceAll("'", "''")}'`
}

function stripComments(statement: string) {
  return statement
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .trim()
    .replace(/;$/, "")
}

export function splitMigrationStatements(sqlText: string) {
  const statements: string[] = []

  for (const chunk of sqlText.split("--> statement-breakpoint")) {
    const cleaned = stripComments(chunk)
    let current = ""
    let single = false
    let double = false
    let backtick = false

    for (let i = 0; i < cleaned.length; i += 1) {
      const char = cleaned[i]
      const prev = cleaned[i - 1]

      if (char === "'" && !double && !backtick && prev !== "\\") single = !single
      else if (char === '"' && !single && !backtick && prev !== "\\") double = !double
      else if (char === "`" && !single && !double && prev !== "\\") backtick = !backtick

      if (char === ";" && !single && !double && !backtick) {
        const statement = current.trim()
        if (statement) statements.push(statement)
        current = ""
        continue
      }

      current += char
    }

    const statement = current.trim()
    if (statement) statements.push(statement)
  }

  return statements.filter(Boolean)
}

function sha256Hex(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex")
}

function isInternalTable(name: string) {
  return name.startsWith("sqlite_") || name === MIGRATIONS_TABLE
}

function tableInfo(db: SQLiteBunDatabase, table: string) {
  return db.all(sql.raw(`PRAGMA table_info(${quoteIdentifier(table)})`)) as TableInfoRow[]
}

function tableExists(master: MasterRow[], table: string) {
  return master.some((row) => row.type === "table" && row.name === table)
}

function indexExists(master: MasterRow[], index: string) {
  return master.some((row) => row.type === "index" && row.name === index)
}

function countRows(db: SQLiteBunDatabase, table: string) {
  const rows = db.all(sql.raw(`SELECT COUNT(*) AS count FROM ${quoteIdentifier(table)}`)) as Array<{ count: number }>
  return Number(rows[0]?.count ?? 0)
}

function migrationRows(db: SQLiteBunDatabase) {
  if (!tableExists(masterRows(db), MIGRATIONS_TABLE)) return []
  return db.all(
    sql.raw(`SELECT id, hash, created_at, name, applied_at FROM ${quoteIdentifier(MIGRATIONS_TABLE)} ORDER BY id ASC`),
  ) as MigrationRow[]
}

function masterRows(db: SQLiteBunDatabase) {
  return db.all(sql.raw(`SELECT type, name, tbl_name, sql FROM sqlite_master ORDER BY name ASC`)) as MasterRow[]
}

function backupDatabaseFiles(dbPath: string) {
  if (dbPath === ":memory:") return [] as string[]
  const stamp = new Date().toISOString().replace(/[:.]/g, "-")
  const base = `${dbPath}.repair-${stamp}`
  const backups: string[] = []
  const sources = [
    { source: dbPath, target: base },
    { source: `${dbPath}-wal`, target: `${base}-wal` },
    { source: `${dbPath}-shm`, target: `${base}-shm` },
  ]

  for (const item of sources) {
    if (!fs.existsSync(item.source)) continue
    fs.copyFileSync(item.source, item.target)
    backups.push(item.target)
  }

  return backups
}

function parseAddColumn(statement: string) {
  const match = /^ALTER\s+TABLE\s+([`"]?[^`"\s]+[`"]?)\s+ADD\s+(?:COLUMN\s+)?([`"]?[^`"\s]+[`"]?)\s+(.+)$/is.exec(
    statement,
  )
  if (!match) return undefined
  return {
    table: match[1].replaceAll(/^[`"]|[`"]$/g, ""),
    column: match[2].replaceAll(/^[`"]|[`"]$/g, ""),
    definition: match[3].trim(),
    safe: !/\bNOT\s+NULL\b/i.test(match[3]) || /\bDEFAULT\b/i.test(match[3]),
  }
}

function parseCreateIndex(statement: string) {
  const match = /^CREATE\s+(?:UNIQUE\s+)?INDEX\s+([`"]?[^`"\s]+[`"]?)\s+ON\s+([`"]?[^`"\s]+[`"]?)/is.exec(statement)
  if (!match) return undefined
  return {
    index: match[1].replaceAll(/^[`"]|[`"]$/g, ""),
    table: match[2].replaceAll(/^[`"]|[`"]$/g, ""),
  }
}

function parseRenameTable(statement: string) {
  const match = /^ALTER\s+TABLE\s+([`"]?[^`"\s]+[`"]?)\s+RENAME\s+TO\s+([`"]?[^`"\s]+[`"]?)$/is.exec(statement)
  if (!match) return undefined
  return {
    from: match[1].replaceAll(/^[`"]|[`"]$/g, ""),
    to: match[2].replaceAll(/^[`"]|[`"]$/g, ""),
  }
}

function rebuildMigrationTable(db: SQLiteBunDatabase) {
  db.run(
    sql.raw(
      `CREATE TABLE IF NOT EXISTS ${quoteIdentifier(MIGRATIONS_TABLE)} (
        id INTEGER PRIMARY KEY,
        hash text NOT NULL,
        created_at numeric,
        name text,
        applied_at TEXT
      )`,
    ),
  )
}

function upsertMigrationRow(db: SQLiteBunDatabase, entry: MigrationEntry) {
  const existing = db.all(
    sql.raw(`SELECT id FROM ${quoteIdentifier(MIGRATIONS_TABLE)} WHERE name = ${quoteLiteral(entry.name)} LIMIT 1`),
  ) as Array<{ id: number }>

  if (existing.length > 0) {
    db.run(
      sql.raw(
        `UPDATE ${quoteIdentifier(MIGRATIONS_TABLE)}
         SET hash = ${quoteLiteral(entry.hash)},
             created_at = ${entry.timestamp},
             name = ${quoteLiteral(entry.name)}
         WHERE id = ${existing[0].id}`,
      ),
    )
    return
  }

  db.run(
    sql.raw(
      `INSERT INTO ${quoteIdentifier(MIGRATIONS_TABLE)} ("hash", "created_at", "name", "applied_at")
       VALUES (${quoteLiteral(entry.hash)}, ${entry.timestamp}, ${quoteLiteral(entry.name)}, ${quoteLiteral(new Date().toISOString())})`,
    ),
  )
}

export function repairSqliteMigrations(
  db: SQLiteBunDatabase,
  input: { dbPath: string; migrations: MigrationEntry[] },
): MigrationRepairReport {
  let master = masterRows(db)
  const rows = migrationRows(db)
  const nonInternalTables = master.filter((row) => row.type === "table" && !isInternalTable(row.name))
  const userTableNames = new Set(nonInternalTables.map((row) => row.name))
  const report: MigrationRepairReport = {
    backedUp: [],
    repaired: [],
    recreatedMigrationTable: false,
  }

  if (master.length === 1 && master[0]?.type === "table" && master[0].name === MIGRATIONS_TABLE) {
    report.backedUp = backupDatabaseFiles(input.dbPath)
    db.run(sql.raw(`DROP TABLE IF EXISTS ${quoteIdentifier(MIGRATIONS_TABLE)}`))
    report.recreatedMigrationTable = true
    return report
  }

  const byName = new Map(rows.filter((row) => row.name).map((row) => [row.name as string, row]))
  const missingRepair: Array<{ entry: MigrationEntry; statements: string[] }> = []

  for (const entry of input.migrations) {
    const existing = byName.get(entry.name)
    if (existing) {
      const needsUpdate =
        existing.hash !== entry.hash ||
        Number(existing.created_at ?? 0) !== entry.timestamp ||
        existing.name !== entry.name
      if (needsUpdate) {
        if (report.backedUp.length === 0) report.backedUp = backupDatabaseFiles(input.dbPath)
        upsertMigrationRow(db, entry)
        report.repaired.push(entry.name)
      }
      continue
    }

    const statements = splitMigrationStatements(entry.sql)
    const missingStatements: string[] = []
    let unsafe = false

    for (const statement of statements) {
      const addColumn = parseAddColumn(statement)
      if (addColumn) {
        if (!tableExists(master, addColumn.table)) {
          unsafe = true
          break
        }
        const columns = new Set(tableInfo(db, addColumn.table).map((row) => row.name))
        if (columns.has(addColumn.column)) continue
        if (countRows(db, addColumn.table) > 0 && !addColumn.safe) {
          unsafe = true
          break
        }
        missingStatements.push(statement)
        continue
      }

      const createIndex = parseCreateIndex(statement)
      if (createIndex) {
        if (indexExists(master, createIndex.index)) continue
        missingStatements.push(statement)
        continue
      }

      const renameTable = parseRenameTable(statement)
      if (renameTable) {
        const sourceExists = tableExists(master, renameTable.from)
        const targetExists = tableExists(master, renameTable.to)
        if (sourceExists && !targetExists) {
          missingStatements.push(statement)
          continue
        }
        if (!sourceExists && targetExists) continue
        unsafe = true
        break
      }

      unsafe = true
      break
    }

    if (unsafe) {
      if (report.backedUp.length === 0) report.backedUp = backupDatabaseFiles(input.dbPath)
      if (userTableNames.size > 0) {
        throw new Error(
          [
            `SQLite migrations are out of sync and could not be repaired automatically.`,
            `Backups: ${report.backedUp.join(", ") || "created on demand"}`,
            `Repair command: restore the backup, then rerun Jekko after fixing the migration state.`,
          ].join(" "),
        )
      }
      continue
    }

    if (missingStatements.length === 0) {
      if (report.backedUp.length === 0) report.backedUp = backupDatabaseFiles(input.dbPath)
      rebuildMigrationTable(db)
      upsertMigrationRow(db, entry)
      report.repaired.push(entry.name)
      master = masterRows(db)
      continue
    }

    if (report.backedUp.length === 0) report.backedUp = backupDatabaseFiles(input.dbPath)
    rebuildMigrationTable(db)
    for (const statement of missingStatements) {
      db.run(sql.raw(statement))
    }
    upsertMigrationRow(db, entry)
    report.repaired.push(entry.name)
    master = masterRows(db)
  }

  if (rows.length === 0 && nonInternalTables.length > 0) {
    rebuildMigrationTable(db)
  }

  return report
}

export function migrationHash(entry: Pick<MigrationEntry, "sql">) {
  return sha256Hex(entry.sql)
}
