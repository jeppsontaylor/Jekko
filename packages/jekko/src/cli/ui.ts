import { EOL } from "os"

function fg(r: number, g: number, b: number) {
  return `\x1b[38;2;${r};${g};${b}m`
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

// ---------------------------------------------------------------------------
// HSV neon color engine (synchronized with logo.tsx)
// ---------------------------------------------------------------------------

type RGB3 = readonly [number, number, number]
type HSV = { h: number; s: number; v: number }

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function rgbToHSV(r: number, g: number, b: number): HSV {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min

  let h = 0
  if (delta !== 0) {
    if (max === rn) h = 60 * (((gn - bn) / delta) % 6)
    else if (max === gn) h = 60 * ((bn - rn) / delta + 2)
    else h = 60 * ((rn - gn) / delta + 4)
  }
  if (h < 0) h += 360

  return { h, s: max === 0 ? 0 : delta / max, v: max }
}

function hsvToRGB(h: number, s: number, v: number): [number, number, number] {
  const hue = ((h % 360) + 360) % 360
  const sat = clamp01(s)
  const val = clamp01(v)

  const c = val * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = val - c

  let r = 0, g = 0, b = 0
  if (hue < 60)       { r = c; g = x }
  else if (hue < 120) { r = x; g = c }
  else if (hue < 180) { g = c; b = x }
  else if (hue < 240) { g = x; b = c }
  else if (hue < 300) { r = x; b = c }
  else                { r = c; b = x }

  return [clamp255((r + m) * 255), clamp255((g + m) * 255), clamp255((b + m) * 255)]
}

function mixHue(left: number, right: number, t: number): number {
  const delta = ((right - left + 540) % 360) - 180
  return (left + delta * t + 360) % 360
}

function neonMix(left: RGB3, right: RGB3, t: number): [number, number, number] {
  const k = clamp01(t)
  const l = rgbToHSV(left[0], left[1], left[2])
  const r = rgbToHSV(right[0], right[1], right[2])

  return hsvToRGB(
    mixHue(l.h, r.h, k),
    1, // force full saturation
    Math.max(0.98, l.v + (r.v - l.v) * k), // force near-max brightness
  )
}

function punchContrast(rgb: [number, number, number], amount = 1.42): [number, number, number] {
  return [
    clamp255(128 + (rgb[0] - 128) * amount),
    clamp255(128 + (rgb[1] - 128) * amount),
    clamp255(128 + (rgb[2] - 128) * amount),
  ]
}

function forceNeon(rgb: [number, number, number], hueShift = 0): [number, number, number] {
  const hsv = rgbToHSV(rgb[0], rgb[1], rgb[2])
  return hsvToRGB(hsv.h + hueShift, 1, Math.max(0.98, hsv.v))
}

type Palette = {
  topLeft: RGB3
  topRight: RGB3
  bottomLeft: RGB3
  bottomRight: RGB3
}

const JEKKO_PALETTE: Palette = {
  topLeft:     [0, 255, 22],     // acid green
  topRight:    [0, 255, 255],    // pure cyan
  bottomLeft:  [255, 255, 0],    // solar yellow
  bottomRight: [255, 0, 220],    // hot magenta
}

function geckoColor(
  x: number,
  y: number,
  width: number,
  height: number,
  palette: Palette,
  quieter = false,
): [number, number, number] {
  const tx = width <= 1 ? 0 : x / (width - 1)
  const ty = height <= 1 ? 0 : y / (height - 1)

  const top = neonMix(palette.topLeft, palette.topRight, tx)
  const bottom = neonMix(palette.bottomLeft, palette.bottomRight, tx)
  const base = neonMix(top, bottom, ty)

  const contrasted = punchContrast(base, 1.42)

  const hueShift = (tx - 0.5) * 16 + (ty - 0.5) * 8

  if (quieter) {
    const hsv = rgbToHSV(contrasted[0], contrasted[1], contrasted[2])
    return hsvToRGB(hsv.h + hueShift, Math.max(0.85, hsv.s), Math.max(0.72, hsv.v))
  }

  return forceNeon(contrasted, hueShift)
}

// Visible-glyph gradient stretching: map gradient X to non-space chars only.
function gradientLine(
  text: string,
  y: number,
  totalRows: number,
  palette: Palette,
  opts: { bold?: boolean; dim?: boolean } = {},
): string {
  const chars = Array.from(text)
  const visibleCount = chars.filter((c) => c !== " ").length

  let visibleIndex = 0
  let out = ""
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]!
    let gx: number, gw: number
    if (ch === " ") {
      gx = i
      gw = Math.max(1, chars.length)
    } else {
      gx = visibleIndex++
      gw = Math.max(1, visibleCount)
    }
    const rgb = geckoColor(gx, y, gw, totalRows, palette, opts.dim)
    out += paint(ch, rgb, { bold: opts.bold })
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

  const top = `╭${"─".repeat(INNER_WIDTH)}╮`
  const bottom = `╰${"─".repeat(INNER_WIDTH)}╯`
  const sep = `├${"─".repeat(INNER_WIDTH)}┤`

  type Row = { text: string; bold?: boolean; dim?: boolean }
  const rows: Row[] = []

  rows.push({ text: top, bold: true })
  rows.push({
    text: `│${pairStr(" ›_ JEKKO", "gecko mode active  ● ● ● ")}│`,
    bold: true,
  })
  rows.push({ text: sep, bold: true })
  rows.push({ text: `│${fit("", INNER_WIDTH)}│`, bold: true })

  for (const line of JEKKO_WORDMARK) {
    rows.push({ text: `│${fit(line, INNER_WIDTH)}│`, bold: true })
  }

  rows.push({ text: `│${fit("", INNER_WIDTH)}│`, bold: true })
  rows.push({
    text: `│${fit("AI coding gecko • ZYAL support • climbs hard problems", INNER_WIDTH)}│`,
    bold: true,
  })
  rows.push({
    text: `│${fit("gecko:// safe autonomous coding ready", INNER_WIDTH)}│`,
    bold: true,
  })
  rows.push({ text: bottom, bold: true })

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
