import { EOL } from "os"

function fg(r: number, g: number, b: number) {
  return `\x1b[38;2;${r};${g};${b}m`
}

const ORANGE = [255, 170, 24] as const
const ORANGE_2 = [255, 140, 0] as const
const CYAN = [0, 224, 214] as const
const CYAN_2 = [58, 201, 255] as const
const WHITE = [241, 244, 248] as const
const MUTED = [151, 163, 176] as const
const INK = [8, 11, 15] as const
const BORDER = [28, 34, 40] as const

const RESET = "\x1b[0m"
const BOLD = "\x1b[1m"
const DIM = "\x1b[2m"

export const Style = {
  TEXT_NORMAL: RESET,
  TEXT_NORMAL_BOLD: BOLD,
  TEXT_DIM: DIM,
  TEXT_DIM_BOLD: DIM + BOLD,
  TEXT_DANGER_BOLD: "\x1b[31;1m",
  TEXT_SUCCESS: "\x1b[32m",
  TEXT_INFO_BOLD: "\x1b[36;1m",
  TEXT_SUCCESS_BOLD: "\x1b[32;1m",
  TEXT_WARNING_BOLD: "\x1b[33;1m",
  TEXT_HIGHLIGHT_BOLD: "\x1b[35;1m",
} as const

export class CancelledError extends Error {
  constructor() {
    super("Cancelled")
    this.name = "CancelledError"
  }
}

export function println(...args: string[]) {
  process.stdout.write(args.join(" ") + EOL)
}

export function empty() {
  println()
}

function paint(text: string, rgb: readonly [number, number, number], opts: { bold?: boolean; dim?: boolean } = {}) {
  let res = ""
  if (opts.bold) res += BOLD
  if (opts.dim) res += DIM
  res += fg(...rgb) + text + RESET
  return res
}

function gradientText(
  text: string,
  leftRgb: readonly [number, number, number],
  rightRgb: readonly [number, number, number],
  bold = false,
) {
  if (!text) return ""
  let out = ""
  const n = Math.max(1, text.length - 1)
  for (let i = 0; i < text.length; i++) {
    const r = Math.round(leftRgb[0] + ((rightRgb[0] - leftRgb[0]) * i) / n)
    const g = Math.round(leftRgb[1] + ((rightRgb[1] - leftRgb[1]) * i) / n)
    const b = Math.round(leftRgb[2] + ((rightRgb[2] - leftRgb[2]) * i) / n)
    out += paint(text[i]!, [r, g, b], { bold })
  }
  return out
}

const brandWordmarkLines = [
  " ██████  ███████  ██   ██  ██   ██   █████ ",
  "     ██  ██       ██  ██   ██  ██   ██   ██",
  "     ██  █████    █████    █████    ██   ██",
  "██   ██  ██       ██  ██   ██  ██   ██   ██",
  " █████   ███████  ██   ██  ██   ██   █████ ",
]

export function logo(pad?: string) {
  if (!process.stdout.isTTY && !process.stderr.isTTY) {
    const result = []
    for (const row of brandWordmarkLines) {
      if (pad) result.push(pad)
      result.push(row)
      result.push(EOL)
    }
    return result.join("").trimEnd()
  }

  const w = 74
  const top = "╭" + "─".repeat(w - 2) + "╮"
  const bottom = "╰" + "─".repeat(w - 2) + "╯"
  const sep = "├" + "─".repeat(w - 2) + "┤"

  const lines: string[] = []

  lines.push((pad || "") + paint(top, ORANGE))

  const promptLeft = paint("›_", CYAN, { bold: true })
  const dots = paint("●", ORANGE) + " " + paint("●", ORANGE_2) + " " + paint("●", CYAN)
  const headerInner = promptLeft + " ".repeat(w - 8 - 6) + dots
  lines.push((pad || "") + paint("│", ORANGE) + headerInner + paint("│", ORANGE))

  lines.push((pad || "") + paint(sep, BORDER))

  // Per-letter segment boundaries — each letter is 7 cols, 2-col gaps
  const letterSegs = [
    { start: 0, end: 9 },    // J + gap
    { start: 9, end: 18 },   // E + gap
    { start: 18, end: 27 },  // K1 + gap
    { start: 27, end: 36 },  // K2 + gap
    { start: 36, end: 43 },  // O
  ]
  // One color per letter: amber-gold → deep orange gradient
  const letterRgb: readonly (readonly [number, number, number])[] = [
    [255, 185, 40],   // J  – bright amber
    [255, 160, 20],   // E  – warm gold
    [255, 140, 10],   // K1 – deeper gold
    [255, 120, 0],    // K2 – rich orange
    [245, 100, 0],    // O  – deep orange
  ]

  const wordmarkWidth = brandWordmarkLines[0]!.length
  const wmLeftPad = Math.floor((w - 2 - wordmarkWidth) / 2)
  const wmRightPad = w - 2 - wordmarkWidth - wmLeftPad

  brandWordmarkLines.forEach((raw) => {
    let inner = " ".repeat(wmLeftPad)
    for (let s = 0; s < letterSegs.length; s++) {
      const seg = letterSegs[s]!
      const slice = raw.substring(seg.start, Math.min(seg.end, raw.length))
      inner += paint(slice, letterRgb[s]!, { bold: true })
    }
    inner += " ".repeat(wmRightPad)
    lines.push((pad || "") + paint("│", ORANGE) + inner + paint("│", ORANGE))
  })

  lines.push((pad || "") + paint(sep, BORDER))

  const subtitlePlain = "[ AI coding gecko • "
  const zqmlPlain = "ZYAL"
  const suffixPlain = " support ]"
  const subtitle =
    paint(subtitlePlain, WHITE, { bold: true }) +
    paint(zqmlPlain, CYAN, { bold: true }) +
    paint(suffixPlain, WHITE, { bold: true })

  const totalPlain = subtitlePlain.length + zqmlPlain.length + suffixPlain.length
  const leftSpaces = Math.floor((w - 2 - totalPlain) / 2)
  const rightSpaces = w - 2 - totalPlain - leftSpaces
  lines.push(
    (pad || "") + paint("│", ORANGE) + " ".repeat(leftSpaces) + subtitle + " ".repeat(rightSpaces) + paint("│", ORANGE),
  )

  const cmdPlain = "gecko:// safe autonomous coding ready"
  const cmd = paint(cmdPlain, MUTED, { dim: true })
  const leftSpacesCmd = Math.floor((w - 2 - cmdPlain.length) / 2)
  const rightSpacesCmd = w - 2 - cmdPlain.length - leftSpacesCmd
  lines.push(
    (pad || "") +
      paint("│", ORANGE) +
      " ".repeat(leftSpacesCmd) +
      cmd +
      " ".repeat(rightSpacesCmd) +
      paint("│", ORANGE),
  )

  lines.push((pad || "") + paint(bottom, ORANGE))

  return lines.join(EOL)
}

export async function input(prompt: string): Promise<string> {
  const readline = require("readline")
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(prompt, (answer: string) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

export function error(message: string) {
  if (message.startsWith("Error: ")) {
    message = message.slice("Error: ".length)
  }
  println(Style.TEXT_DANGER_BOLD + "Error: " + Style.TEXT_NORMAL + message)
}

export function markdown(text: string): string {
  return text
}

export * as UI from "./ui"
