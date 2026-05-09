import { EOL } from "os"

function fg(r: number, g: number, b: number) {
  return `\x1b[38;2;${r};${g};${b}m`
}

const GECKO = {
  lime: [188, 255, 72] as const,
  cyan: [0, 235, 216] as const,
  aqua: [62, 196, 255] as const,
  gold: [255, 190, 48] as const,
  orange: [255, 102, 36] as const,
  white: [246, 250, 252] as const,
  muted: [128, 146, 156] as const,
}

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

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function mixColor(
  left: readonly [number, number, number],
  right: readonly [number, number, number],
  t: number,
): [number, number, number] {
  const k = clamp01(t)
  return [
    Math.round(left[0] + (right[0] - left[0]) * k),
    Math.round(left[1] + (right[1] - left[1]) * k),
    Math.round(left[2] + (right[2] - left[2]) * k),
  ]
}

type Palette = {
  topLeft: readonly [number, number, number]
  topRight: readonly [number, number, number]
  bottomLeft: readonly [number, number, number]
  bottomRight: readonly [number, number, number]
}

const JEKKO_PALETTE: Palette = {
  topLeft: [80, 255, 0],      // electric green
  topRight: [0, 255, 255],    // pure cyan
  bottomLeft: [255, 200, 0],  // vivid gold
  bottomRight: [255, 60, 0],  // hot orange-red
}

function geckoColor(
  x: number,
  y: number,
  width: number,
  height: number,
  palette: Palette,
): [number, number, number] {
  const tx = width <= 1 ? 0 : x / (width - 1)
  const ty = height <= 1 ? 0 : y / (height - 1)
  const top = mixColor(palette.topLeft, palette.topRight, tx)
  const bottom = mixColor(palette.bottomLeft, palette.bottomRight, tx)
  const base = mixColor(top, bottom, ty)

  return base
}

function gradientLine(
  text: string,
  y: number,
  totalRows: number,
  palette: Palette,
  opts: { bold?: boolean; dim?: boolean } = {},
): string {
  const chars = Array.from(text)
  const width = chars.length
  let out = ""
  for (let x = 0; x < chars.length; x++) {
    const rgb = geckoColor(x, y, width, totalRows, palette)
    out += paint(chars[x]!, rgb, opts)
  }
  return out
}

const INNER_WIDTH = 78

function fit(text: string, width: number): string {
  const remaining = Math.max(0, width - text.length)
  const left = Math.floor(remaining / 2)
  const right = remaining - left
  return " ".repeat(left) + text + " ".repeat(right)
}

function pairStr(left: string, right: string, width = INNER_WIDTH): string {
  const gap = Math.max(1, width - left.length - right.length)
  return left + " ".repeat(gap) + right
}

const JEKKO_WORDMARK = [
  "     ██╗███████╗██╗  ██╗██╗  ██╗ ██████╗ ",
  "     ██║██╔════╝██║ ██╔╝██║ ██╔╝██╔═══██╗",
  "     ██║█████╗  █████╔╝ █████╔╝ ██║   ██║",
  "██   ██║██╔══╝  ██╔═██╗ ██╔═██╗ ██║   ██║",
  "╚█████╔╝███████╗██║  ██╗██║  ██╗╚██████╔╝",
  " ╚════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ",
]

export function logo(pad?: string) {
  if (!process.stdout.isTTY && !process.stderr.isTTY) {
    const result = []
    for (const row of JEKKO_WORDMARK) {
      if (pad) result.push(pad)
      result.push(row)
      result.push(EOL)
    }
    return result.join("").trimEnd()
  }

  const w = INNER_WIDTH + 2
  const top = `╭${"─".repeat(INNER_WIDTH)}╮`
  const bottom = `╰${"─".repeat(INNER_WIDTH)}╯`
  const sep = `├${"─".repeat(INNER_WIDTH)}┤`

  type Row = { text: string; bold?: boolean; dim?: boolean }
  const rows: Row[] = []

  rows.push({ text: top })
  rows.push({
    text: `│${pairStr(" ›_ JEKKO", "gecko mode active  ● ● ● ")}│`,
    bold: true,
  })
  rows.push({ text: sep })
  rows.push({ text: `│${fit("", INNER_WIDTH)}│` })

  for (const line of JEKKO_WORDMARK) {
    rows.push({ text: `│${fit(line, INNER_WIDTH)}│`, bold: true })
  }

  rows.push({ text: `│${fit("", INNER_WIDTH)}│` })
  rows.push({
    text: `│${fit("AI coding gecko • ZYAL support • climbs hard problems", INNER_WIDTH)}│`,
    bold: true,
  })
  rows.push({
    text: `│${fit("gecko:// safe autonomous coding ready", INNER_WIDTH)}│`,
    dim: true,
  })
  rows.push({ text: bottom })

  const totalRows = rows.length
  const rendered = rows.map((row, y) =>
    (pad || "") + gradientLine(row.text, y, totalRows, JEKKO_PALETTE, { bold: row.bold, dim: row.dim }),
  )

  return rendered.join(EOL)
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
