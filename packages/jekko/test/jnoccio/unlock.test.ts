import { afterEach, describe, expect, test } from "bun:test"
import fsp from "fs/promises"
import os from "os"
import path from "path"
import { unlockJnoccioFusion, type CommandRunner } from "../../src/util/jnoccio-unlock"

const tempDirs: string[] = []

async function tempRepo(options: { plaintext?: boolean; env?: string } = {}) {
  const root = await fsp.mkdtemp(path.join(os.tmpdir(), "jnoccio-unlock-test-"))
  tempDirs.push(root)
  const fusion = path.join(root, "jnoccio-fusion")
  await fsp.mkdir(path.join(fusion, "config"), { recursive: true })
  await fsp.writeFile(path.join(root, "key.git-crypt-key"), "fake-key")
  await fsp.writeFile(path.join(fusion, ".env.jnoccio.example"), "OPENROUTER_API_KEY=\n")
  if (options.env !== undefined) await fsp.writeFile(path.join(fusion, ".env.jnoccio"), options.env)

  if (options.plaintext ?? true) {
    await fsp.writeFile(path.join(fusion, "Cargo.toml"), '[package]\nname = "jnoccio-fusion"\n')
    await fsp.writeFile(
      path.join(fusion, "config/server.json"),
      JSON.stringify({ provider: "jnoccio", model: "jnoccio/jnoccio-fusion" }),
    )
  } else {
    await fsp.writeFile(path.join(fusion, "Cargo.toml"), "\u0000GITCRYPT\u0000locked")
    await fsp.writeFile(path.join(fusion, "config/server.json"), "\u0000GITCRYPT\u0000locked")
  }

  return {
    root,
    keyPath: path.join(root, "key.git-crypt-key"),
    envPath: path.join(fusion, ".env.jnoccio"),
  }
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => fsp.rm(dir, { recursive: true, force: true })))
})

describe("unlockJnoccioFusion", () => {
  test("rejects missing key paths before running git-crypt", async () => {
    const repo = await tempRepo()
    let calls = 0
    const result = await unlockJnoccioFusion(
      { keyPath: path.join(repo.root, "missing.key") },
      {
        repoRoot: repo.root,
        runner: async () => {
          calls += 1
          return { exitCode: 0 }
        },
      },
    )

    expect(result.status).toBe("error")
    expect(result.message).toContain("could not be read")
    expect(calls).toBe(0)
  })

  test("returns a friendly message when git-crypt is unavailable", async () => {
    const repo = await tempRepo({ plaintext: false })
    const result = await unlockJnoccioFusion(
      { keyPath: repo.keyPath },
      {
        repoRoot: repo.root,
        runner: async () => ({ exitCode: 127, stderr: "not found" }),
      },
    )

    expect(result).toMatchObject({
      status: "error",
      envCreated: false,
    })
    expect(result.message).toContain("git-crypt is not installed")
  })

  test("returns a retryable error for invalid keys", async () => {
    const repo = await tempRepo({ plaintext: false })
    const result = await unlockJnoccioFusion(
      { keyPath: repo.keyPath },
      {
        repoRoot: repo.root,
        runner: async () => ({ exitCode: 1, stderr: "bad key" }),
      },
    )

    expect(result.status).toBe("error")
    expect(result.message).toContain("did not unlock")
  })

  test("treats an already unlocked repo as success when git-crypt refuses to unlock again", async () => {
    const repo = await tempRepo()
    const result = await unlockJnoccioFusion(
      { keyPath: repo.keyPath },
      {
        repoRoot: repo.root,
        runner: async () => ({ exitCode: 1, stderr: "already unlocked" }),
      },
    )

    expect(result).toMatchObject({
      status: "unlocked",
      envPath: repo.envPath,
      envCreated: true,
    })
  })

  test("verifies plaintext signals and creates .env.jnoccio without shell interpolation", async () => {
    const repo = await tempRepo()
    const calls: Parameters<CommandRunner>[] = []
    const result = await unlockJnoccioFusion(
      { keyPath: repo.keyPath },
      {
        repoRoot: repo.root,
        runner: async (...args) => {
          calls.push(args)
          return { exitCode: 0 }
        },
      },
    )

    expect(calls).toEqual([["git-crypt", ["unlock", repo.keyPath], { cwd: repo.root }]])
    expect(result).toMatchObject({
      status: "unlocked",
      envPath: repo.envPath,
      envCreated: true,
    })
    await expect(fsp.readFile(repo.envPath, "utf8")).resolves.toBe("OPENROUTER_API_KEY=\n")
  })

  test("does not overwrite an existing .env.jnoccio", async () => {
    const repo = await tempRepo({ env: "OPENROUTER_API_KEY=local\n" })
    const result = await unlockJnoccioFusion(
      { keyPath: repo.keyPath },
      {
        repoRoot: repo.root,
        runner: async () => ({ exitCode: 0 }),
      },
    )

    expect(result).toMatchObject({
      status: "unlocked",
      envCreated: false,
    })
    await expect(fsp.readFile(repo.envPath, "utf8")).resolves.toBe("OPENROUTER_API_KEY=local\n")
  })

  test("fails when git-crypt reports success but files remain locked", async () => {
    const repo = await tempRepo({ plaintext: false })
    const result = await unlockJnoccioFusion(
      { keyPath: repo.keyPath },
      {
        repoRoot: repo.root,
        runner: async () => ({ exitCode: 0 }),
      },
    )

    expect(result.status).toBe("error")
    expect(result.message).toContain("still locked")
  })
})
