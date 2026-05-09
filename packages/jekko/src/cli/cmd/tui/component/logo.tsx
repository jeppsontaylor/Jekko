import { RGBA, TextAttributes } from "@opentui/core"
import { createMemo, For } from "solid-js"

type Align = "left" | "center" | "right"

type CornerPalette = {
  topLeft: RGBA
  topRight: RGBA
  bottomLeft: RGBA
  bottomRight: RGBA
}

type LogoRow = {
  text: string
  bold?: boolean
  dim?: boolean
  palette?: CornerPalette
}

type RGB = { r: number; g: number; b: number }
type HSV = { h: number; s: number; v: number }

const INNER_WIDTH = 78
const OUTER_WIDTH = INNER_WIDTH + 2

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

// RGBA .r/.g/.b return 0-1 floats — always scale to 0-255 for math.
function toRGB(color: RGBA): RGB {
  return { r: color.r * 255, g: color.g * 255, b: color.b * 255 }
}

// ---------------------------------------------------------------------------
// HSV conversion — hue-aware interpolation prevents muddy midtones
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

// Shortest-arc hue interpolation (handles 350° → 10° correctly).
function mixHue(left: number, right: number, t: number): number {
  const delta = ((right - left + 540) % 360) - 180
  return (left + delta * t + 360) % 360
}

// HSV-aware mix: rotates hue, lerps saturation and value.
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
// Neon post-processing: force saturation=1 and value≥0.98
// ---------------------------------------------------------------------------

function forceNeon(color: RGBA, hueShift = 0): RGBA {
  const hsv = rgbToHSV(color)
  return hsvToRGBA(hsv.h + hueShift, 1, Math.max(0.98, hsv.v))
}

// Neon mix: HSV interpolate then force full saturation/brightness.
function neonMix(left: RGBA, right: RGBA, t: number): RGBA {
  return forceNeon(mixHSV(left, right, t))
}

// Contrast amplification — push channels away from 128 midpoint.
function punchContrast(color: RGBA, amount = 1.42): RGBA {
  const { r, g, b } = toRGB(color)
  return rgba(
    128 + (r - 128) * amount,
    128 + (g - 128) * amount,
    128 + (b - 128) * amount,
  )
}

// ---------------------------------------------------------------------------
// Palettes — maximum hue separation for dramatic 2D gradient
// ---------------------------------------------------------------------------

const GECKO = {
  acid:     rgba(0, 255, 22),
  leaf:     rgba(84, 255, 0),
  lime:     rgba(176, 255, 0),
  cyan:     rgba(0, 255, 255),
  aqua:     rgba(0, 190, 255),
  blue:     rgba(42, 112, 255),
  violet:   rgba(180, 0, 255),
  magenta:  rgba(255, 0, 220),
  hotPink:  rgba(255, 0, 150),
  solar:    rgba(255, 255, 0),
  gold:     rgba(255, 190, 0),
  orange:   rgba(255, 72, 0),
  ember:    rgba(255, 12, 0),
  white:    rgba(255, 255, 255),
  muted:    rgba(120, 160, 170),
}

const JEKKO_PALETTE: CornerPalette = {
  topLeft:     GECKO.acid,     // neon green
  topRight:    GECKO.cyan,     // pure cyan
  bottomLeft:  GECKO.solar,    // solar yellow
  bottomRight: GECKO.magenta,  // hot pink
}

const GO_PALETTE: CornerPalette = {
  topLeft:     GECKO.cyan,
  topRight:    GECKO.blue,
  bottomLeft:  GECKO.acid,
  bottomRight: GECKO.gold,
}

const IDLE_PALETTE: CornerPalette = {
  // Still neon-bright but slightly softer hues.
  topLeft:     rgba(58, 255, 18),
  topRight:    rgba(0, 226, 255),
  bottomLeft:  rgba(255, 224, 28),
  bottomRight: rgba(255, 74, 168),
}

// ---------------------------------------------------------------------------
// 2D Gradient engine
// ---------------------------------------------------------------------------

function gradient2D(
  x: number,
  y: number,
  width: number,
  height: number,
  palette: CornerPalette,
): RGBA {
  const tx = width <= 1 ? 0 : x / (width - 1)
  const ty = height <= 1 ? 0 : y / (height - 1)

  // HSV neon mix left→right on top and bottom edges.
  const top = neonMix(palette.topLeft, palette.topRight, tx)
  const bottom = neonMix(palette.bottomLeft, palette.bottomRight, tx)

  // Then mix top→bottom.
  return neonMix(top, bottom, ty)
}

function brilliantGeckoColor(
  x: number,
  y: number,
  width: number,
  height: number,
  palette: CornerPalette,
  quieter = false,
): RGBA {
  const tx = width <= 1 ? 0 : x / (width - 1)
  const ty = height <= 1 ? 0 : y / (height - 1)

  const base = gradient2D(x, y, width, height, palette)

  // Contrast punch keeps gradient stops from collapsing to similar tones.
  const contrasted = punchContrast(base, 1.42)

  // Positional hue kick so the gradient stays directional but feels alive.
  const hueShift = (tx - 0.5) * 16 + (ty - 0.5) * 8

  // Force full neon saturation/brightness. Quieter mode softens slightly.
  if (quieter) {
    const hsv = rgbToHSV(contrasted)
    return hsvToRGBA(hsv.h + hueShift, Math.max(0.85, hsv.s), Math.max(0.72, hsv.v))
  }

  return forceNeon(contrasted, hueShift)
}

// ---------------------------------------------------------------------------
// Text layout helpers (unchanged)
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

  if (align === "left") {
    return clipped + " ".repeat(remaining)
  }

  if (align === "right") {
    return " ".repeat(remaining) + clipped
  }

  const left = Math.floor(remaining / 2)
  const right = remaining - left

  return " ".repeat(left) + clipped + " ".repeat(right)
}

function pair(left: string, right: string, width = INNER_WIDTH): string {
  const safeLeft = clipGlyphs(left, width)
  const safeRight = clipGlyphs(right, width)
  const gap = width - glyphLength(safeLeft) - glyphLength(safeRight)

  if (gap < 1) {
    return fit(`${safeLeft} ${safeRight}`, width, "left")
  }

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
// Visible-glyph gradient stretching
// ---------------------------------------------------------------------------
// Spaces are invisible — they waste gradient range. We map gradient X to
// the index among visible (non-space) characters so the wordmark uses the
// FULL left→right color sweep.

type GradientGlyph = {
  char: string
  gradientX: number
  gradientWidth: number
}

function buildGradientGlyphs(text: string): GradientGlyph[] {
  const chars = Array.from(text)
  const visibleCount = chars.filter((c) => c !== " ").length

  let visibleIndex = 0
  return chars.map((char, physicalIndex) => {
    if (char === " ") {
      return { char, gradientX: physicalIndex, gradientWidth: Math.max(1, chars.length) }
    }

    const gx = visibleIndex
    visibleIndex += 1
    return { char, gradientX: gx, gradientWidth: Math.max(1, visibleCount) }
  })
}

// ---------------------------------------------------------------------------
// GradientRow — per-character neon rendering
// ---------------------------------------------------------------------------

function GradientRow(props: { row: LogoRow; y: number; totalRows: number }) {
  const glyphs = buildGradientGlyphs(props.row.text)
  const palette = props.row.palette ?? JEKKO_PALETTE

  // Never use TextAttributes.DIM — it destroys neon colors on terminals.
  const attrs = props.row.bold ? TextAttributes.BOLD : undefined

  return (
    <box flexDirection="row">
      <For each={glyphs}>
        {(glyph) => (
          <text
            fg={brilliantGeckoColor(
              glyph.gradientX,
              props.y,
              glyph.gradientWidth,
              props.totalRows,
              palette,
              Boolean(props.row.dim),
            )}
            attributes={attrs}
            selectable={false}
          >
            {glyph.char}
          </text>
        )}
      </For>
    </box>
  )
}

// ---------------------------------------------------------------------------
// Wordmark & Logo builder
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

  const palette = props.idle ? IDLE_PALETTE : JEKKO_PALETTE

  return [
    { text: topBorder(), bold: true, palette },
    {
      text: framedPair(
        " ›_ JEKKO",
        props.idle ? "gecko mode idle  ● ● ● " : "gecko mode active  ● ● ● ",
      ),
      bold: true,
      palette,
    },
    { text: divider(), bold: true, palette },

    { text: framed(), bold: true, palette },

    ...JEKKO_WORDMARK.map((line) => ({
      text: framed(line),
      bold: true,
      palette,
    })),

    { text: framed(), bold: true, palette },
    {
      text: framed(`AI coding gecko • ${support} support • climbs hard problems`),
      bold: true,
      palette,
    },
    {
      text: framed(`gecko:// ${status}`),
      bold: true,
      dim: props.idle,
      palette,
    },

    { text: bottomBorder(), bold: true, palette },
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

  return (
    <box flexDirection="column">
      <For each={rows()}>
        {(row, y) => (
          <GradientRow row={row} y={y()} totalRows={rows().length} />
        )}
      </For>
    </box>
  )
}

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
    const palette = props.idle ? IDLE_PALETTE : GO_PALETTE

    return GO_WORDMARK.map((line) => ({
      text: fit(line, width),
      bold: true,
      dim: props.idle,
      palette,
    }))
  })

  return (
    <box flexDirection="column">
      <For each={rows()}>
        {(row, y) => (
          <GradientRow row={row} y={y()} totalRows={rows().length} />
        )}
      </For>
    </box>
  )
}
