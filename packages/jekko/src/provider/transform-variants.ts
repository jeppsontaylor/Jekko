import { iife } from "@/util/iife"
import type * as Provider from "./provider"
import {
  GPT5_FAMILY_RE,
  OPENAI_EFFORTS,
  OPENAI_NONE_EFFORT_RELEASE_DATE,
  OPENAI_XHIGH_EFFORT_RELEASE_DATE,
  WIDELY_SUPPORTED_EFFORTS,
} from "./transform-shared"

export function samplingParams(model: Provider.Model): { temperature?: number; topP?: number; topK?: number } {
  const id = model.id.toLowerCase()
  if (id.includes("qwen")) return { temperature: 0.55, topP: 1 }
  if (id.includes("gemini")) return { temperature: 1.0, topP: 0.95, topK: 64 }
  if (id.includes("glm-4.6") || id.includes("glm-4.7")) return { temperature: 1.0 }
  if (id.includes("minimax-m2")) {
    const topK = ["m2.", "m25", "m21"].some((s) => id.includes(s)) ? 40 : 20
    return { temperature: 1.0, topP: 0.95, topK }
  }
  if (id.includes("kimi-k2.5") || id.includes("kimi-k2p5") || id.includes("kimi-k2-5")) {
    return { temperature: 1.0, topP: 0.95 }
  }
  if (id.includes("kimi-k2")) {
    const temperature = ["thinking", "k2.", "k2p"].some((s) => id.includes(s)) ? 1.0 : 0.6
    return { temperature }
  }
  return {}
}

export function temperature(model: Provider.Model) {
  return samplingParams(model).temperature
}

export function topP(model: Provider.Model) {
  return samplingParams(model).topP
}

export function topK(model: Provider.Model) {
  return samplingParams(model).topK
}

function openaiReasoningEfforts(apiId: string, releaseDate: string): string[] | null {
  const id = apiId.toLowerCase()
  // jankurai:allow HLT-001-DEAD-MARKER reason=functional-optional-returns-by-design expires=2027-01-01
  if (id === "gpt-5-pro" || id === "openai/gpt-5-pro") return null
  if (id.includes("codex")) {
    if (id.includes("5.2") || id.includes("5.3")) return [...WIDELY_SUPPORTED_EFFORTS, "xhigh"]
    return [...WIDELY_SUPPORTED_EFFORTS]
  }
  const efforts = [...WIDELY_SUPPORTED_EFFORTS]
  if (GPT5_FAMILY_RE.test(id)) efforts.unshift("minimal")
  if (releaseDate >= OPENAI_NONE_EFFORT_RELEASE_DATE) efforts.unshift("none")
  if (releaseDate >= OPENAI_XHIGH_EFFORT_RELEASE_DATE) efforts.push("xhigh")
  return efforts
}

function anthropicAdaptiveEfforts(apiId: string): string[] | null {
  if (["opus-4-7", "opus-4.7"].some((v) => apiId.includes(v))) {
    return ["low", "medium", "high", "xhigh", "max"]
  }
  if (["opus-4-6", "opus-4.6", "sonnet-4-6", "sonnet-4.6"].some((v) => apiId.includes(v))) {
    return ["low", "medium", "high", "max"]
  }
  return null
}

function oaiEncryptedEfforts(efforts: string[]) {
  return Object.fromEntries(
    efforts.map((effort) => [effort, { reasoningEffort: effort, reasoningSummary: "auto", include: ["reasoning.encrypted_content"] }]),
  )
}

function googleThinkingConfig() {
  return {
    high: { thinkingConfig: { includeThoughts: true, thinkingBudget: 16000 } },
    max: { thinkingConfig: { includeThoughts: true, thinkingBudget: 24576 } },
  }
}

function anthropicSimpleAdaptive(efforts: string[]) {
  return Object.fromEntries(efforts.map((effort) => [effort, { thinking: { type: "adaptive" }, effort }]))
}

function anthropicStaticBudgets() {
  return {
    high: { thinking: { type: "enabled", budgetTokens: 16000 } },
    max: { thinking: { type: "enabled", budgetTokens: 31999 } },
  }
}

export function variants(model: Provider.Model): Record<string, Record<string, any>> {
  if (!model.capabilities.reasoning) return {}

  const id = model.id.toLowerCase()
  const adaptiveEfforts = anthropicAdaptiveEfforts(model.api.id)
  if (
    id.includes("deepseek-chat") ||
    id.includes("deepseek-reasoner") ||
    id.includes("deepseek-r1") ||
    id.includes("deepseek-v3") ||
    id.includes("minimax") ||
    id.includes("glm") ||
    id.includes("kimi") ||
    id.includes("k2p") ||
    id.includes("qwen") ||
    id.includes("big-pickle")
  )
    return {}

  if (id.includes("grok") && id.includes("grok-3-mini")) {
    if (model.api.npm === "@openrouter/ai-sdk-provider") {
      return {
        low: { reasoning: { effort: "low" } },
        high: { reasoning: { effort: "high" } },
      }
    }
    return {
      low: { reasoningEffort: "low" },
      high: { reasoningEffort: "high" },
    }
  }
  if (id.includes("grok")) return {}

  switch (model.api.npm) {
    case "@openrouter/ai-sdk-provider":
      if (!model.id.includes("gpt") && !model.id.includes("gemini-3") && !model.id.includes("claude")) return {}
      return Object.fromEntries(OPENAI_EFFORTS.map((effort) => [effort, { reasoning: { effort } }]))

    case "ai-gateway-provider": {
      if (model.api.id.startsWith("openai/")) {
        const efforts = openaiReasoningEfforts(model.api.id, model.release_date)
        if (!efforts) return {}
        return Object.fromEntries(efforts.map((effort) => [effort, { reasoningEffort: effort }]))
      }
      return Object.fromEntries(WIDELY_SUPPORTED_EFFORTS.map((effort) => [effort, { reasoningEffort: effort }]))
    }

    case "@ai-sdk/gateway":
      if (model.id.includes("anthropic")) {
        if (adaptiveEfforts) {
          return anthropicSimpleAdaptive(adaptiveEfforts)
        }
        return anthropicStaticBudgets()
      }
      if (model.id.includes("google")) {
        if (id.includes("2.5")) {
          return googleThinkingConfig()
        }
        return Object.fromEntries(
          ["low", "high"].map((effort) => [
            effort,
            {
              includeThoughts: true,
              thinkingLevel: effort,
            },
          ]),
        )
      }
      return Object.fromEntries(OPENAI_EFFORTS.map((effort) => [effort, { reasoningEffort: effort }]))

    case "@ai-sdk/github-copilot":
      if (model.id.includes("gemini")) {
        return {}
      }
      if (model.id.includes("claude")) {
        return Object.fromEntries(WIDELY_SUPPORTED_EFFORTS.map((effort) => [effort, { reasoningEffort: effort }]))
      }
      const copilotEfforts = iife(() => {
        if (id.includes("5.1-codex-max") || id.includes("5.2") || id.includes("5.3"))
          return [...WIDELY_SUPPORTED_EFFORTS, "xhigh"]
        const arr = [...WIDELY_SUPPORTED_EFFORTS]
        if (id.includes("gpt-5") && model.release_date >= "2025-12-04") arr.push("xhigh")
        return arr
      })
      return oaiEncryptedEfforts(copilotEfforts)

    case "@ai-sdk/cerebras":
    case "@ai-sdk/togetherai":
    case "@ai-sdk/xai":
    case "@ai-sdk/deepinfra":
    case "venice-ai-sdk-provider":
    case "@ai-sdk/openai-compatible":
      const efforts = [...WIDELY_SUPPORTED_EFFORTS]
      if (model.api.id.toLowerCase().includes("deepseek-v4")) {
        efforts.push("max")
      }
      return Object.fromEntries(efforts.map((effort) => [effort, { reasoningEffort: effort }]))

    case "@ai-sdk/azure":
      if (id === "o1-mini") return {}
      const azureEfforts = ["low", "medium", "high"]
      if (id.includes("gpt-5-") || id === "gpt-5") {
        azureEfforts.unshift("minimal")
      }
      return oaiEncryptedEfforts(azureEfforts)

    case "@ai-sdk/openai": {
      const efforts = openaiReasoningEfforts(model.api.id, model.release_date)
      if (!efforts) return {}
      return oaiEncryptedEfforts(efforts)
    }

    case "@ai-sdk/anthropic":
    case "@ai-sdk/google-vertex/anthropic":
      if (adaptiveEfforts) {
        let efforts = [...adaptiveEfforts]
        if (model.providerID === "github-copilot") {
          if (model.api.id.includes("opus-4.7")) {
            efforts = ["medium"]
          }
          efforts = efforts.filter((v) => v !== "max" && v !== "xhigh")
        }
        return Object.fromEntries(
          efforts.map((effort) => [
            effort,
            {
              thinking: {
                type: "adaptive",
                ...(model.api.id.includes("opus-4-7") || model.api.id.includes("opus-4.7")
                  ? { display: "summarized" }
                  : {}),
              },
              effort,
            },
          ]),
        )
      }

      return {
        high: {
          thinking: {
            type: "enabled",
            budgetTokens: Math.min(16_000, Math.floor(model.limit.output / 2 - 1)),
          },
        },
        max: {
          thinking: {
            type: "enabled",
            budgetTokens: Math.min(31_999, model.limit.output - 1),
          },
        },
      }

    case "@ai-sdk/amazon-bedrock":
      if (adaptiveEfforts) {
        return Object.fromEntries(
          adaptiveEfforts.map((effort) => [
            effort,
            {
              reasoningConfig: {
                type: "adaptive",
                maxReasoningEffort: effort,
                ...(model.api.id.includes("opus-4-7") || model.api.id.includes("opus-4.7")
                  ? { display: "summarized" }
                  : {}),
              },
            },
          ]),
        )
      }
      if (model.api.id.includes("anthropic")) {
        return {
          high: {
            reasoningConfig: {
              type: "enabled",
              budgetTokens: 16000,
            },
          },
          max: {
            reasoningConfig: {
              type: "enabled",
              budgetTokens: 31999,
            },
          },
        }
      }

      return Object.fromEntries(
        WIDELY_SUPPORTED_EFFORTS.map((effort) => [
          effort,
          {
            reasoningConfig: {
              type: "enabled",
              maxReasoningEffort: effort,
            },
          },
        ]),
      )

    case "@ai-sdk/google-vertex":
    case "@ai-sdk/google":
      if (id.includes("2.5")) {
        return googleThinkingConfig()
      }
      let levels = ["low", "high"]
      if (id.includes("3.1")) {
        levels = ["low", "medium", "high"]
      }

      return Object.fromEntries(
        levels.map((effort) => [
          effort,
          {
            thinkingConfig: {
              includeThoughts: true,
              thinkingLevel: effort,
            },
          },
        ]),
      )

    case "@ai-sdk/mistral":
      if (!model.capabilities.reasoning) return {}
      const MISTRAL_REASONING_IDS = [
        "mistral-small-2603",
        "mistral-small-latest",
        "mistral-medium-3.5",
        "mistral-medium-2604",
      ]
      const mistralId = model.api.id.toLowerCase()
      if (!MISTRAL_REASONING_IDS.some((id) => mistralId.includes(id))) return {}
      return {
        high: { reasoningEffort: "high" },
      }

    case "@ai-sdk/cohere":
      return {}

    case "@ai-sdk/groq":
      const groqEffort = ["none", ...WIDELY_SUPPORTED_EFFORTS]
      return Object.fromEntries(
        groqEffort.map((effort) => [
          effort,
          {
            reasoningEffort: effort,
          },
        ]),
      )

    case "@ai-sdk/perplexity":
      return {}

    case "@jerome-benoit/sap-ai-provider-v2":
      if (model.api.id.includes("anthropic")) {
        if (adaptiveEfforts) {
          return anthropicSimpleAdaptive(adaptiveEfforts)
        }
        return anthropicStaticBudgets()
      }
      if (model.api.id.includes("gemini") && id.includes("2.5")) {
        return googleThinkingConfig()
      }
      if (model.api.id.includes("gpt") || /\bo[1-9]/.test(model.api.id)) {
        return Object.fromEntries(WIDELY_SUPPORTED_EFFORTS.map((effort) => [effort, { reasoningEffort: effort }]))
      }
      return {}
  }
  return {}
}

