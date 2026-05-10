import type { ModelMessage, ToolResultPart } from "ai"
import { mergeDeep, unique } from "remeda"
import type * as Provider from "./provider"
import { mimeToModality, sanitizeSurrogates, sdkKey } from "./transform-shared"

function filterEmptyContent(msgs: ModelMessage[]): ModelMessage[] {
  const result: ModelMessage[] = []
  for (const msg of msgs) {
    if (typeof msg.content === "string") {
      if (msg.content !== "") result.push(msg)
      continue
    }

    if (!Array.isArray(msg.content)) {
      result.push(msg)
      continue
    }

    const filtered = msg.content.filter((part) => {
      if (part.type === "text" || part.type === "reasoning") return part.text !== ""
      return true
    })
    if (filtered.length > 0) {
      result.push({ ...msg, content: filtered })
    }
  }
  return result
}

function scrubToolCallParts(
  parts: Array<{ type: string; toolCallId?: string }>,
  scrub: (id: string) => string,
  includeToolCall: boolean,
) {
  return parts.map((part) => {
    if (part.type === "tool-result" || (includeToolCall && part.type === "tool-call")) {
      return { ...part, toolCallId: scrub(part.toolCallId) }
    }
    return part
  })
}

function scrubToolCallIds(msgs: ModelMessage[], scrub: (id: string) => string) {
  return msgs.map((msg) => {
    if (!Array.isArray(msg.content)) return msg
    if (msg.role === "assistant") {
      return { ...msg, content: scrubToolCallParts(msg.content as Array<{ type: string; toolCallId?: string }>, scrub, true) }
    }
    if (msg.role === "tool") {
      return { ...msg, content: scrubToolCallParts(msg.content as Array<{ type: string; toolCallId?: string }>, scrub, false) }
    }
    return msg
  })
}

function sanitizeToolResultParts(
  parts: Array<{ type: string }>,
  sanitizeToolResultOutput: (content: ToolResultPart) => ToolResultPart,
) {
  return parts.map((content) => {
    if (content.type === "tool-result") {
      return sanitizeToolResultOutput(content)
    }
    return content
  })
}

function filterEmptyContentIfNeeded(msgs: ModelMessage[], model: Provider.Model) {
  if (model.api.npm !== "@ai-sdk/anthropic" && model.api.npm !== "@ai-sdk/amazon-bedrock") return msgs
  return filterEmptyContent(msgs)
}

function scrubClaudeToolCallIdsIfNeeded(msgs: ModelMessage[], model: Provider.Model) {
  if (!model.id.includes("claude")) return msgs
  return scrubToolCallIds(msgs, (id) => id.replace(/[^a-zA-Z0-9_-]/g, "_"))
}

function splitAnthropicToolCallMessagesIfNeeded(msgs: ModelMessage[], model: Provider.Model) {
  if (!["@ai-sdk/anthropic", "@ai-sdk/google-vertex/anthropic"].includes(model.api.npm)) return msgs
  return msgs.flatMap((msg) => {
    if (msg.role !== "assistant" || !Array.isArray(msg.content)) return [msg]

    const parts = msg.content
    const first = parts.findIndex((part) => part.type === "tool-call")
    if (first === -1) return [msg]
    if (!parts.slice(first).some((part) => part.type !== "tool-call")) return [msg]
    return [
      { ...msg, content: parts.filter((part) => part.type !== "tool-call") },
      { ...msg, content: parts.filter((part) => part.type === "tool-call") },
    ]
  })
}

function applyMistralFallbackIfNeeded(msgs: ModelMessage[], model: Provider.Model) {
  if (
    model.providerID !== "mistral" &&
    !model.api.id.toLowerCase().includes("mistral") &&
    !model.api.id.toLocaleLowerCase().includes("devstral")
  ) {
    return msgs
  }

  const scrub = (id: string) => id.replace(/[^a-zA-Z0-9]/g, "").substring(0, 9).padEnd(9, "0")
  const result: ModelMessage[] = []
  for (let i = 0; i < msgs.length; i++) {
    const msg = msgs[i]
    const nextMsg = msgs[i + 1]

    result.push(scrubToolCallIds([msg], scrub)[0])

    if (msg.role === "tool" && nextMsg?.role === "user") {
      result.push({
        role: "assistant",
        content: [
          {
            type: "text",
            text: "Done.",
          },
        ],
      })
    }
  }
  return result
}

function applyDeepseekFallbackIfNeeded(msgs: ModelMessage[], model: Provider.Model) {
  if (!model.api.id.toLowerCase().includes("deepseek")) return msgs
  return msgs.map((msg) => {
    if (msg.role !== "assistant") return msg
    if (Array.isArray(msg.content)) {
      if (msg.content.some((part) => part.type === "reasoning")) return msg
      return { ...msg, content: [...msg.content, { type: "reasoning", text: "" }] }
    }
    return {
      ...msg,
      content: [
        ...(msg.content ? [{ type: "text" as const, text: msg.content }] : []),
        { type: "reasoning" as const, text: "" },
      ],
    }
  })
}

function applyInterleavedReasoningIfNeeded(msgs: ModelMessage[], model: Provider.Model) {
  if (
    typeof model.capabilities.interleaved !== "object" ||
    !model.capabilities.interleaved.field ||
    model.api.npm === "@openrouter/ai-sdk-provider"
  ) {
    return msgs
  }

  const field = model.capabilities.interleaved.field
  return msgs.map((msg) => {
    if (msg.role === "assistant" && Array.isArray(msg.content)) {
      const reasoningParts = msg.content.filter((part: any) => part.type === "reasoning")
      const reasoningText = reasoningParts.map((part: any) => part.text).join("")
      const filteredContent = msg.content.filter((part: any) => part.type !== "reasoning")

      return {
        ...msg,
        content: filteredContent,
        providerOptions: {
          ...msg.providerOptions,
          openaiCompatible: {
            ...msg.providerOptions?.openaiCompatible,
            [field]: reasoningText,
          },
        },
      }
    }

    return msg
  })
}

// jankurai:allow HLT-000-SCORE-DIMENSION reason=provider-message-normalization-has-provider-specific-branches expires=2027-01-01
function normalizeMessages(
  msgs: ModelMessage[],
  model: Provider.Model,
  _options: Record<string, unknown>,
): ModelMessage[] {
  const sanitizeToolResultOutput = (content: ToolResultPart) => {
    if (content.output.type === "text" || content.output.type === "error-text") {
      content.output.value = sanitizeSurrogates(content.output.value)
    }
    if (content.output.type === "content") {
      content.output.value = content.output.value.map((item) => {
        if (item.type === "text") {
          item.text = sanitizeSurrogates(item.text)
        }
        return item
      })
    }
    return content
  }

  msgs = msgs.map((msg) => {
    switch (msg.role) {
      case "tool":
        if (!Array.isArray(msg.content)) return msg
        msg.content = sanitizeToolResultParts(msg.content, sanitizeToolResultOutput)
        return msg

      case "system":
        msg.content = sanitizeSurrogates(msg.content)
        return msg

      case "user":
        if (typeof msg.content === "string") {
          msg.content = sanitizeSurrogates(msg.content)
        } else {
          msg.content = msg.content.map((content) => {
            if (content.type === "text") {
              content.text = sanitizeSurrogates(content.text)
            }
            return content
          })
        }
        return msg

      case "assistant":
        if (typeof msg.content === "string") {
          msg.content = sanitizeSurrogates(msg.content)
        } else {
          msg.content = msg.content.map((content) => {
            if (content.type === "text" || content.type === "reasoning") {
              content.text = sanitizeSurrogates(content.text)
            }
            return content.type === "tool-result" ? sanitizeToolResultOutput(content) : content
          })
        }
        return msg
    }
  })

  msgs = filterEmptyContentIfNeeded(msgs, model)
  msgs = scrubClaudeToolCallIdsIfNeeded(msgs, model)
  msgs = splitAnthropicToolCallMessagesIfNeeded(msgs, model)
  msgs = applyMistralFallbackIfNeeded(msgs, model)
  msgs = applyDeepseekFallbackIfNeeded(msgs, model)
  msgs = applyInterleavedReasoningIfNeeded(msgs, model)
  return msgs
}

function applyCaching(msgs: ModelMessage[], model: Provider.Model): ModelMessage[] {
  const system = msgs.filter((msg) => msg.role === "system").slice(0, 2)
  const final = msgs.filter((msg) => msg.role !== "system").slice(-2)

  const providerOptions = {
    anthropic: {
      cacheControl: { type: "ephemeral" },
    },
    openrouter: {
      cacheControl: { type: "ephemeral" },
    },
    bedrock: {
      cachePoint: { type: "default" },
    },
    openaiCompatible: {
      cache_control: { type: "ephemeral" },
    },
    copilot: {
      copilot_cache_control: { type: "ephemeral" },
    },
    alibaba: {
      cacheControl: { type: "ephemeral" },
    },
  }

  for (const msg of unique([...system, ...final])) {
    const useMessageLevelOptions =
      model.providerID === "anthropic" ||
      model.providerID.includes("bedrock") ||
      model.api.npm === "@ai-sdk/amazon-bedrock"
    const shouldUseContentOptions = !useMessageLevelOptions && Array.isArray(msg.content) && msg.content.length > 0

    if (shouldUseContentOptions) {
      const lastContent = msg.content[msg.content.length - 1]
      if (
        lastContent &&
        typeof lastContent === "object" &&
        lastContent.type !== "tool-approval-request" &&
        lastContent.type !== "tool-approval-response"
      ) {
        lastContent.providerOptions = mergeDeep(lastContent.providerOptions ?? {}, providerOptions)
        continue
      }
    }

    msg.providerOptions = mergeDeep(msg.providerOptions ?? {}, providerOptions)
  }

  return msgs
}

function unsupportedParts(msgs: ModelMessage[], model: Provider.Model): ModelMessage[] {
  return msgs.map((msg) => {
    if (msg.role !== "user" || !Array.isArray(msg.content)) return msg

    const filtered = msg.content.map((part) => {
      if (part.type !== "file" && part.type !== "image") return part

      if (part.type === "image") {
        const imageStr = String(part.image)
        if (imageStr.startsWith("data:")) {
          const match = imageStr.match(/^data:([^;]+);base64,(.*)$/)
          if (match && (!match[2] || match[2].length === 0)) {
            return {
              type: "text" as const,
              text: "ERROR: Image file is empty or corrupted. Please provide a valid image.",
            }
          }
        }
      }

      const mime = part.type === "image" ? String(part.image).split(";")[0].replace("data:", "") : part.mediaType
      const filename = part.type === "file" ? part.filename : undefined
      const modalityResult = mimeToModality(mime)
      if (modalityResult.kind === "unsupported") return part
      const modality = modalityResult.modality
      if (model.capabilities.input[modality]) return part

      const name = filename ? `"${filename}"` : modality
      return {
        type: "text" as const,
        text: `ERROR: Cannot read ${name} (this model does not support ${modality} input). Inform the user.`,
      }
    })

    return { ...msg, content: filtered }
  })
}

export function message(msgs: ModelMessage[], model: Provider.Model, options: Record<string, unknown>) {
  msgs = unsupportedParts(msgs, model)
  msgs = normalizeMessages(msgs, model, options)
  if (
    (model.providerID === "anthropic" ||
      model.providerID === "google-vertex-anthropic" ||
      model.api.id.includes("anthropic") ||
      model.api.id.includes("claude") ||
      model.id.includes("anthropic") ||
      model.id.includes("claude") ||
      model.api.npm === "@ai-sdk/anthropic" ||
      model.api.npm === "@ai-sdk/alibaba") &&
    model.api.npm !== "@ai-sdk/gateway"
  ) {
    msgs = applyCaching(msgs, model)
  }

  const key = sdkKey(model.api.npm)
  if (key && key !== model.providerID) {
    const remap = (opts: Record<string, any> | undefined) => {
      if (!opts) return opts
      if (!(model.providerID in opts)) return opts
      const result = { ...opts }
      result[key] = result[model.providerID]
      delete result[model.providerID]
      return result
    }

    msgs = msgs.map((msg) => {
      if (!Array.isArray(msg.content)) return { ...msg, providerOptions: remap(msg.providerOptions) }
      return {
        ...msg,
        providerOptions: remap(msg.providerOptions),
        content: msg.content.map((part) => {
          if (part.type === "tool-approval-request" || part.type === "tool-approval-response") {
            return { ...part }
          }
          return { ...part, providerOptions: remap(part.providerOptions) }
        }),
      } as typeof msg
    })
  }

  return msgs
}
