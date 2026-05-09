import { RGBA, TextAttributes } from "@opentui/core"
import { createMemo, For } from "solid-js"

// ---------------------------------------------------------------------------
// Acid Gecko Bloom — 512-stop colormap
// ---------------------------------------------------------------------------
// Diagonal gradient: top-left (green) → bottom-right (hot pink)
// Keyframes: gecko green → lime → cyan → blue → violet → magenta → fuchsia → hot pink
//
// Colors are generated once at module init from keyframe stops using HSV
// interpolation. This keeps the source compact while producing butter-smooth
// 512-stop precision at runtime.

type Align = "left" | "center" | "right"

type LogoRow = {
  text: string
  bold?: boolean
  dim?: boolean
}

const INNER_WIDTH = 78
const OUTER_WIDTH = INNER_WIDTH + 2
const COLORMAP_SIZE = 512

// ---------------------------------------------------------------------------
// HSV math (used only for colormap generation)
// ---------------------------------------------------------------------------

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
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

function rgbToHSV(r: number, g: number, b: number): [number, number, number] {
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

  return [h, max === 0 ? 0 : delta / max, max]
}

function mixHue(a: number, b: number, t: number): number {
  const delta = ((b - a + 540) % 360) - 180
  return (a + delta * t + 360) % 360
}

// ---------------------------------------------------------------------------
// Keyframe-based colormap builder
// ---------------------------------------------------------------------------

type Keyframe = { pos: number; rgb: [number, number, number] }

// Acid Gecko Bloom keyframes — gecko green → cyan → ultraviolet → hot pink
const BLOOM_KEYFRAMES: Keyframe[] = [
  { pos: 0,   rgb: [0, 255, 22] },      // acid green
  { pos: 64,  rgb: [68, 255, 0] },      // electric lime
  { pos: 128, rgb: [0, 255, 204] },     // neon cyan
  { pos: 192, rgb: [51, 0, 255] },      // electric blue/UV
  { pos: 256, rgb: [119, 0, 255] },     // deep violet
  { pos: 320, rgb: [204, 0, 255] },     // magenta
  { pos: 384, rgb: [255, 0, 170] },     // hot fuchsia
  { pos: 448, rgb: [255, 0, 102] },     // hot pink
  { pos: 511, rgb: [255, 0, 68] },      // neon pink
]

function buildColormap(keyframes: Keyframe[], size: number): RGBA[] {
  const map: RGBA[] = new Array(size)

  for (let i = 0; i < size; i++) {
    // Find the two keyframes we're between
    let lo = keyframes[0]!
    let hi = keyframes[keyframes.length - 1]!

    for (let k = 0; k < keyframes.length - 1; k++) {
      if (i >= keyframes[k]!.pos && i <= keyframes[k + 1]!.pos) {
        lo = keyframes[k]!
        hi = keyframes[k + 1]!
        break
      }
    }

    const range = hi.pos - lo.pos
    const t = range === 0 ? 0 : clamp01((i - lo.pos) / range)

    // HSV interpolation between keyframes for hue-aware blending
    const loHSV = rgbToHSV(...lo.rgb)
    const hiHSV = rgbToHSV(...hi.rgb)

    const h = mixHue(loHSV[0], hiHSV[0], t)
    const s = loHSV[1] + (hiHSV[1] - loHSV[1]) * t
    const v = loHSV[2] + (hiHSV[2] - loHSV[2]) * t

    // Force neon: full saturation, near-max brightness
    const [r, g, b] = hsvToRGB(h, Math.max(0.95, s), Math.max(0.95, v))
    map[i] = RGBA.fromInts(r, g, b, 255)
  }

  return map
}

// Pre-baked at module init
const ACID_GECKO_BLOOM = buildColormap(BLOOM_KEYFRAMES, COLORMAP_SIZE)

// Idle colormap — same hue path but reduced saturation/brightness
function buildIdleColormap(): RGBA[] {
  return ACID_GECKO_BLOOM.map((color) => {
    const [h, s, v] = rgbToHSV(
      Math.round(color.r * 255),
      Math.round(color.g * 255),
      Math.round(color.b * 255),
    )
    const [r, g, b] = hsvToRGB(h, s * 0.55, v * 0.55)
    return RGBA.fromInts(r, g, b, 255)
  })
}

const IDLE_BLOOM = buildIdleColormap()

// ---------------------------------------------------------------------------
// Diagonal gradient lookup
// ---------------------------------------------------------------------------

function bloomColor(
  x: number,
  y: number,
  width: number,
  height: number,
  idle = false,
): RGBA {
  const tx = width <= 1 ? 0 : x / (width - 1)
  const ty = height <= 1 ? 0 : y / (height - 1)

  // Diagonal: top-left (0) → bottom-right (1)
  const t = (tx + ty) / 2
  const index = Math.round(t * (COLORMAP_SIZE - 1))
  const clamped = Math.max(0, Math.min(COLORMAP_SIZE - 1, index))

  return idle ? IDLE_BLOOM[clamped]! : ACID_GECKO_BLOOM[clamped]!
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
// Visible-glyph gradient stretching + GradientRow
// ---------------------------------------------------------------------------

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
    const gx = visibleIndex++
    return { char, gradientX: gx, gradientWidth: Math.max(1, visibleCount) }
  })
}

function GradientRow(props: { row: LogoRow; y: number; totalRows: number; idle?: boolean }) {
  const glyphs = buildGradientGlyphs(props.row.text)
  const attrs = props.row.bold ? TextAttributes.BOLD : undefined

  return (
    <box flexDirection="row">
      <For each={glyphs}>
        {(glyph) => (
          <text
            fg={bloomColor(
              glyph.gradientX,
              props.y,
              glyph.gradientWidth,
              props.totalRows,
              props.idle,
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

  return (
    <box flexDirection="column">
      <For each={rows()}>
        {(row, y) => (
          <GradientRow row={row} y={y()} totalRows={rows().length} idle={props.idle} />
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
    return GO_WORDMARK.map((line) => ({
      text: fit(line, width),
      bold: true,
    }))
  })

  return (
    <box flexDirection="column">
      <For each={rows()}>
        {(row, y) => (
          <GradientRow row={row} y={y()} totalRows={rows().length} idle={props.idle} />
        )}
      </For>
    </box>
  )
}
