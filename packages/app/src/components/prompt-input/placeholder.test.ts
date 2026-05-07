import { describe, expect, test } from "bun:test"

type PromptDefaultValueInput = {
  mode: "normal" | "shell"
  commentCount: number
  example: string
  suggest: boolean
  t: (key: string, params?: Record<string, string>) => string
}

function promptDefaultValue(input: PromptDefaultValueInput) {
  if (input.mode === "shell") return input.t("prompt.default_value.shell", { example: input.example })
  if (input.commentCount > 1) return input.t("prompt.default_value.summarizeComments")
  if (input.commentCount === 1) return input.t("prompt.default_value.summarizeComment")
  if (!input.suggest) return input.t("prompt.default_value.simple")
  return input.t("prompt.default_value.normal", { example: input.example })
}

describe("promptDefaultValue", () => {
  const t = (key: string, params?: Record<string, string>) => `${key}${params?.example ? `:${params.example}` : ""}`

  test("returns shell default_value in shell mode", () => {
    const value = promptDefaultValue({
      mode: "shell",
      commentCount: 0,
      example: "example",
      suggest: true,
      t,
    })
    expect(value).toBe("prompt.default_value.shell:example")
  })

  test("returns summarize placeholders for comment context", () => {
    expect(promptDefaultValue({ mode: "normal", commentCount: 1, example: "example", suggest: true, t })).toBe(
      "prompt.default_value.summarizeComment",
    )
    expect(promptDefaultValue({ mode: "normal", commentCount: 2, example: "example", suggest: true, t })).toBe(
      "prompt.default_value.summarizeComments",
    )
  })

  test("returns default default_value with example when suggestions enabled", () => {
    const value = promptDefaultValue({
      mode: "normal",
      commentCount: 0,
      example: "translated-example",
      suggest: true,
      t,
    })
    expect(value).toBe("prompt.default_value.normal:translated-example")
  })

  test("returns simple default_value when suggestions disabled", () => {
    const value = promptDefaultValue({
      mode: "normal",
      commentCount: 0,
      example: "translated-example",
      suggest: false,
      t,
    })
    expect(value).toBe("prompt.default_value.simple")
  })
})
