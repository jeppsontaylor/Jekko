import { describe, expect, test } from "bun:test"
import { walkJsonPath } from "@/session/daemon-checks"

describe("daemon json path evaluator", () => {
  test("reads nested objects and arrays", () => {
    const value = {
      job: {
        steps: [{ name: "a" }, { name: "b" }],
      },
    }

    expect(walkJsonPath(value, "$.job.steps[1].name")).toBe("b")
  })

  test("returns undefined for missing paths", () => {
    expect(walkJsonPath({ a: 1 }, "$.a.b")).toBeUndefined()
  })

  test("returns undefined for malformed array segments", () => {
    expect(walkJsonPath({ job: { steps: [{ name: "a" }] } }, "$.job.steps[nope].name")).toBeUndefined()
  })

  test("rejects non-jsonpath input", () => {
    expect(() => walkJsonPath({}, "job.steps[0]")).toThrow(/must start with \$/)
  })
})
