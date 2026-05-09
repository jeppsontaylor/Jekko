import { RGBA, TextAttributes } from "@opentui/core"
import { createMemo, For } from "solid-js"

type Align = "left" | "center" | "right"

type LogoRow = {
  text: string
  bold?: boolean
  dim?: boolean
}

type RGB = { r: number; g: number; b: number }
type HSV = { h: number; s: number; v: number }

const INNER_WIDTH = 78
const OUTER_WIDTH = INNER_WIDTH + 2
const GRADIENT_STEPS = 512

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function rgba(r: number, g: number, b: number, a = 255): RGBA {
  return RGBA.fromInts(clamp255(r), clamp255(g), clamp255(b), clamp255(a))
}

function hexToRGBA(hex: string): RGBA {
  const clean = hex.replace("#", "").trim()
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return rgba(r, g, b)
}

// RGBA .r/.g/.b are 0..1 floats.
function toRGB(color: RGBA): RGB {
  return { r: color.r * 255, g: color.g * 255, b: color.b * 255 }
}

// ---------------------------------------------------------------------------
// HSV conversion
// ---------------------------------------------------------------------------

function rgbToHSV(color: RGBA): HSV {
  const { r, g, b } = toRGB(color)
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

function hsvToRGBA(h: number, s: number, v: number): RGBA {
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

  return rgba((r + m) * 255, (g + m) * 255, (b + m) * 255)
}

function mixHue(left: number, right: number, t: number): number {
  const delta = ((right - left + 540) % 360) - 180
  return (left + delta * t + 360) % 360
}

function mixHSV(left: RGBA, right: RGBA, t: number): RGBA {
  const k = clamp01(t)
  const l = rgbToHSV(left)
  const r = rgbToHSV(right)

  return hsvToRGBA(
    mixHue(l.h, r.h, k),
    l.s + (r.s - l.s) * k,
    l.v + (r.v - l.v) * k,
  )
}

// ---------------------------------------------------------------------------
// Neon forcing — MAXIMUM vibrancy
// ---------------------------------------------------------------------------

function smoothstep(t: number): number {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}

function forceNeon(color: RGBA, dim = false): RGBA {
  const hsv = rgbToHSV(color)
  // Full saturation, full brightness — no exceptions.
  const sat = dim ? Math.max(0.92, hsv.s) : 1
  const val = dim ? Math.max(0.78, hsv.v) : 1
  return hsvToRGBA(hsv.h, sat, val)
}

// ---------------------------------------------------------------------------
// Acid Gecko Bloom — 512-step master gradient
// Top-left: #00FF16 (acid green) → Bottom-right: #FF00B8 (hot pink)
//
// Ultra-saturated stops — every stop is already at S=1 V=1 in HSV.
// ---------------------------------------------------------------------------

const ACID_GECKO_BLOOM_STOPS = [
  "#00FF16",  // acid green (pure neon)
  "#66FF00",  // electric lime
  "#00FFCC",  // neon cyan
  "#00BBFF",  // electric blue
  "#6600FF",  // deep violet
  "#CC00FF",  // vivid magenta
  "#FF00B8",  // hot pink
].map(hexToRGBA)

function buildGradientLUT(stops: RGBA[], steps: number): RGBA[] {
  if (stops.length < 2) return [forceNeon(stops[0] ?? rgba(0, 255, 22))]

  const out: RGBA[] = []
  const segments = stops.length - 1

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    const pos = t * segments
    const seg = Math.min(segments - 1, Math.floor(pos))
    const localT = pos - seg
    const eased = smoothstep(localT)

    const mixed = mixHSV(stops[seg]!, stops[seg + 1]!, eased)
    // Force every single pixel to max neon — no dullness allowed.
    out.push(forceNeon(mixed))
  }

  return out
}

const ACID_GECKO_BLOOM = buildGradientLUT(ACID_GECKO_BLOOM_STOPS, GRADIENT_STEPS)

// ---------------------------------------------------------------------------
// Global diagonal field
// One single gradient spans the WHOLE rendered logo area.
// Color by PHYSICAL X/Y across the full box — borders, text, everything.
// ---------------------------------------------------------------------------

function diagonalGradientColor(
  x: number,
  y: number,
  width: number,
  height: number,
  dim = false,
): RGBA {
  const tx = width <= 1 ? 0 : x / (width - 1)
  const ty = height <= 1 ? 0 : y / (height - 1)

  // Linear fade from top-left (0) to bottom-right (1).
  const t = clamp01((tx + ty) / 2)
  const idx = Math.max(0, Math.min(GRADIENT_STEPS - 1, Math.round(t * (GRADIENT_STEPS - 1))))

  return dim ? forceNeon(ACID_GECKO_BLOOM[idx]!, true) : ACID_GECKO_BLOOM[idx]!
}

// ---------------------------------------------------------------------------
// Text layout helpers
// ---------------------------------------------------------------------------

function glyphLength(text: string): number {
  return Array.from(text).length
}

function clipGlyphs(text: string, width: number): string {
  const chars = Array.from(text)
  return chars.length <= width ? text : chars.slice(0, width).join("")
}

function fit(text: string, width: number, align: Align = "center"): string {
  const clipped = clipGlyphs(text, width)
  const remaining = Math.max(0, width - glyphLength(clipped))

  if (align === "left") return clipped + " ".repeat(remaining)
  if (align === "right") return " ".repeat(remaining) + clipped

  const left = Math.floor(remaining / 2)
  const right = remaining - left
  return " ".repeat(left) + clipped + " ".repeat(right)
}

function pair(left: string, right: string, width = INNER_WIDTH): string {
  const safeLeft = clipGlyphs(left, width)
  const safeRight = clipGlyphs(right, width)
  const gap = width - glyphLength(safeLeft) - glyphLength(safeRight)

  if (gap < 1) return fit(`${safeLeft} ${safeRight}`, width, "left")
  return safeLeft + " ".repeat(gap) + safeRight
}

function framed(content = "", align: Align = "center"): string {
  return `│${fit(content, INNER_WIDTH, align)}│`
}

function framedPair(left: string, right: string): string {
  return `│${pair(left, right)}│`
}

function topBorder(): string {
  return `╭${"─".repeat(INNER_WIDTH)}╮`
}

function divider(): string {
  return `├${"─".repeat(INNER_WIDTH)}┤`
}

function bottomBorder(): string {
  return `╰${"─".repeat(INNER_WIDTH)}╯`
}

// ---------------------------------------------------------------------------
// GradientRow — physical X position, unified diagonal field
// ---------------------------------------------------------------------------

function GradientRow(props: {
  row: LogoRow
  y: number
  totalRows: number
  totalWidth: number
}) {
  const chars = Array.from(props.row.text)
  const attrs = props.row.bold ? TextAttributes.BOLD : undefined

  return (
    <box flexDirection="row">
      <For each={chars}>
        {(char, x) => (
          <text
            fg={diagonalGradientColor(
              x(),
              props.y,
              props.totalWidth,
              props.totalRows,
              Boolean(props.row.dim),
            )}
            attributes={attrs}
            selectable={false}
          >
            {char}
          </text>
        )}
      </For>
    </box>
  )
}

// ---------------------------------------------------------------------------
// Wordmark & Logo
// ---------------------------------------------------------------------------

const JEKKO_WORDMARK = [
  "     ██╗███████╗██╗  ██╗██╗  ██╗ ██████╗ ",
  "     ██║██╔════╝██║ ██╔╝██║ ██╔╝██╔═══██╗",
  "     ██║█████╗  █████╔╝ █████╔╝ ██║   ██║",
  "██   ██║██╔══╝  ██╔═██╗ ██╔═██╗ ██║   ██║",
  "╚█████╔╝███████╗██║  ██╗██║  ██╗╚██████╔╝",
  " ╚════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ",
]

function buildLogoRows(props: {
  shape?: unknown
  ink?: RGBA
  idle?: boolean
  support?: string
  status?: string
}): LogoRow[] {
  const support = props.support ?? "ZYAL"
  const status =
    props.status ??
    (props.idle
      ? "camouflage idle • watching the wall"
      : "safe autonomous coding ready")

  return [
    { text: topBorder(), bold: true },
    {
      text: framedPair(
        " ›_ JEKKO",
        props.idle ? "gecko mode idle  ● ● ● " : "gecko mode active  ● ● ● ",
      ),
      bold: true,
    },
    { text: divider(), bold: true },
    { text: framed(), bold: true },

    ...JEKKO_WORDMARK.map((line) => ({
      text: framed(line),
      bold: true,
    })),

    { text: framed(), bold: true },
    {
      text: framed(`AI coding gecko • ${support} support • climbs hard problems`),
      bold: true,
    },
    {
      text: framed(`gecko:// ${status}`),
      bold: true,
      dim: props.idle,
    },
    { text: bottomBorder(), bold: true },
  ]
}

export function Logo(
  props: {
    shape?: unknown
    ink?: RGBA
    idle?: boolean
    support?: string
    status?: string
  } = {},
) {
  const rows = createMemo(() => buildLogoRows(props))
  const totalWidth = createMemo(() =>
    Math.max(...rows().map((row) => glyphLength(row.text))),
  )

  return (
    <box flexDirection="column">
      <For each={rows()}>
        {(row, y) => (
          <GradientRow
            row={row}
            y={y()}
            totalRows={rows().length}
            totalWidth={totalWidth()}
          />
        )}
      </For>
    </box>
  )
}

// ---------------------------------------------------------------------------
// GO logo — same unified diagonal field
// ---------------------------------------------------------------------------

const GO_WORDMARK = [
  " ██████   ██████ ",
  "██       ██    ██",
  "██  ████ ██    ██",
  "██    ██ ██    ██",
  " ██████   ██████ ",
]

export function GoLogo(props: { idle?: boolean } = {}) {
  const rows = createMemo<LogoRow[]>(() => {
    const width = Math.max(...GO_WORDMARK.map(glyphLength))
    return GO_WORDMARK.map((line) => ({
      text: fit(line, width),
      bold: true,
      dim: props.idle,
    }))
  })

  const totalWidth = createMemo(() =>
    Math.max(...rows().map((row) => glyphLength(row.text))),
  )

  return (
    <box flexDirection="column">
      <For each={rows()}>
        {(row, y) => (
          <GradientRow
            row={row}
            y={y()}
            totalRows={rows().length}
            totalWidth={totalWidth()}
          />
        )}
      </For>
    </box>
  )
}
