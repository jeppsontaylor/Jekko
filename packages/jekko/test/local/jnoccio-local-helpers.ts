import { existsSync } from "fs"
import fsp from "fs/promises"
import os from "os"
import path from "path"
import { Database as BunDatabase } from "bun:sqlite"
import { Database } from "../../src/storage/db"
import { migrationHash } from "../../src/storage/migration-repair"
import { expandHome, isValidUnlockSecret, jnoccioUnlockSecretPath } from "../../src/util/jnoccio-unlock"

export const repoRoot = path.resolve(import.meta.dir, "../../..", "..")

export type CommandResult = {
  stdout: string
  stderr: string
  exitCode: number
}

export type LocalUnlockPreflight =
  | {
      ok: true
      secret: string
      secretPath: string
    }
  | {
      ok: false
      reason: string
      secretPath?: string
    }

export function hasGitCrypt() {
  return Bun.spawnSync(["git-crypt", "version"], { stdout: "ignore", stderr: "ignore" }).exitCode === 0
}

export async function run(command: string, args: string[], cwd: string, env?: Record<string, string | undefined>) {
  const proc = Bun.spawn([command, ...args], {
    cwd,
    env: env ? { ...process.env, ...env } : process.env,
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  return { stdout, stderr, exitCode }
}

export async function cloneRepo(prefix: string, tempDirs: string[]) {
  const cloneParent = await fsp.mkdtemp(path.join(os.tmpdir(), prefix))
  tempDirs.push(cloneParent)
  const clone = path.join(cloneParent, "repo")
  const cloned = await run("git", ["clone", "--quiet", repoRoot, clone], cloneParent)
  if (cloned.exitCode !== 0) {
    throw new Error(`git clone failed: ${cloned.stderr || cloned.stdout}`)
  }
  return { clone, cloneParent }
}

export async function localUnlockPreflight(): Promise<LocalUnlockPreflight> {
  const secretPath = expandHome(process.env.JNOCCIO_UNLOCK_SECRET_PATH ?? jnoccioUnlockSecretPath())
  if (process.env.CI === "true") return { ok: false, reason: "CI=true", secretPath }
  if (!hasGitCrypt()) return { ok: false, reason: "git-crypt is not installed", secretPath }
  if (!existsSync(secretPath)) return { ok: false, reason: `unlock secret file is missing: ${secretPath}`, secretPath }

  let secret: string
  try {
    secret = (await fsp.readFile(secretPath, "utf8")).trim()
  } catch {
    return { ok: false, reason: `unlock secret file is not readable: ${secretPath}`, secretPath }
  }

  if (!isValidUnlockSecret(secret)) {
    return { ok: false, reason: `unlock secret file is invalid: ${secretPath}`, secretPath }
  }

  return { ok: true, secret, secretPath }
}

export async function withEnv<T>(env: Record<string, string | undefined>, fn: () => Promise<T>) {
  const previous = Object.fromEntries(Object.keys(env).map((key) => [key, process.env[key]]))
  try {
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
    return await fn()
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  }
}

export async function removeTempDirs(tempDirs: string[]) {
  await Promise.all(tempDirs.splice(0).map((dir) => fsp.rm(dir, { recursive: true, force: true })))
}

function migrationTime(name: string) {
  const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/.exec(name)
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

export async function seedTestDatabase() {
  const db = new BunDatabase(Database.Path)
  db.exec("PRAGMA foreign_keys = ON")
  db.exec("PRAGMA journal_mode = WAL")
  db.exec("PRAGMA synchronous = NORMAL")
  db.exec("PRAGMA busy_timeout = 5000")

  const migrationDir = path.join(import.meta.dir, "..", "..", "..", "..", "db", "migrations")
  const entries = (await fsp.readdir(migrationDir, { withFileTypes: true }))
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .sort()
  for (const entry of entries) {
    const sqlPath = path.join(migrationDir, entry, "migration.sql")
    db.exec(await fsp.readFile(sqlPath, "utf8"))
  }
  db.exec(`
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
      id INTEGER PRIMARY KEY,
      hash text NOT NULL,
      created_at numeric,
      name text,
      applied_at TEXT
    )
  `)
  const insert = db.prepare(
    `INSERT INTO "__drizzle_migrations" ("hash", "created_at", "name", "applied_at") VALUES (?, ?, ?, ?)`,
  )
  const appliedAt = new Date().toISOString()
  for (const entry of entries) {
    const sqlPath = path.join(migrationDir, entry, "migration.sql")
    const sql = await fsp.readFile(sqlPath, "utf8")
    insert.run(migrationHash({ sql }), migrationTime(entry), entry, appliedAt)
  }
  db.close()
}
