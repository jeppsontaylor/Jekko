type PromptDefaultValueInput = {
  mode: "normal" | "shell"
  commentCount: number
  example: string
  suggest: boolean
  t: (key: string, params?: Record<string, string>) => string
}

export function promptDefaultValue(input: PromptDefaultValueInput) {
  if (input.mode === "shell") return input.t("prompt.default_value.shell", { example: input.example })
  if (input.commentCount > 1) return input.t("prompt.default_value.summarizeComments")
  if (input.commentCount === 1) return input.t("prompt.default_value.summarizeComment")
  if (!input.suggest) return input.t("prompt.default_value.simple")
  return input.t("prompt.default_value.normal", { example: input.example })
}
