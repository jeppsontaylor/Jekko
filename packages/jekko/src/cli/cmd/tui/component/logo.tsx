import { RGBA, TextAttributes } from "@opentui/core"
import { createMemo, For } from "solid-js"

type Align = "left" | "center" | "right"

type RGB = { r: number; g: number; b: number }
type HSV = { h: number; s: number; v: number }

type CellLayer =
  | "global"
  | "wordmark"
  | "wordmarkShadowNear"
  | "wordmarkShadowFar"

type LogoCell = {
  char: string
  layer: CellLayer
  bold?: boolean
  dim?: boolean

  // Local source coordinate for the JEKKO/GO art gradient.
  sourceX?: number
  sourceY?: number
  sourceWidth?: number
  sourceHeight?: number
}

type LogoRow = {
  cells: LogoCell[]
  bold?: boolean
  dim?: boolean
}

const INNER_WIDTH = 78
const OUTER_WIDTH = INNER_WIDTH + 2
const GRADIENT_STEPS = 512

// ---------------------------------------------------------------------------
// Basic helpers
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

  if (clean.length !== 6) {
    return rgba(255, 0, 184)
  }

  return rgba(
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  )
}

// RGBA .r/.g/.b are 0..1 floats in OpenTUI.
function toRGB(color: RGBA): RGB {
  return {
    r: color.r * 255,
    g: color.g * 255,
    b: color.b * 255,
  }
}

// ---------------------------------------------------------------------------
// HSV color engine
// ---------------------------------------------------------------------------

function rgbToHSV(color: RGBA): HSV {
  const { r, g, b } = toRGB(color)

  const rn = r / 255
  const gn = g / 255
  const bn = b / 255

  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const delta = max - min

  let h = 0

  if (delta !== 0) {
    if (max === rn) {
      h = 60 * (((gn - bn) / delta) % 6)
    } else if (max === gn) {
      h = 60 * ((bn - rn) / delta + 2)
    } else {
      h = 60 * ((rn - gn) / delta + 4)
    }
  }

  if (h < 0) h += 360

  return {
    h,
    s: max === 0 ? 0 : delta / max,
    v: max,
  }
}

function hsvToRGBA(h: number, s: number, v: number): RGBA {
  const hue = ((h % 360) + 360) % 360
  const sat = clamp01(s)
  const val = clamp01(v)

  const c = val * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = val - c

  let r = 0
  let g = 0
  let b = 0

  if (hue < 60) {
    r = c
    g = x
  } else if (hue < 120) {
    r = x
    g = c
  } else if (hue < 180) {
    g = c
    b = x
  } else if (hue < 240) {
    g = x
    b = c
  } else if (hue < 300) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }

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

function smoothstep(t: number): number {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}

function forceNeon(color: RGBA, dim = false): RGBA {
  const hsv = rgbToHSV(color)

  if (dim) {
    return hsvToRGBA(hsv.h, Math.max(0.88, hsv.s), 0.76)
  }

  return hsvToRGBA(hsv.h, 1, 1)
}

function deepenNeon(color: RGBA, value: number): RGBA {
  const hsv = rgbToHSV(color)
  return hsvToRGBA(hsv.h, 1, value)
}

// ---------------------------------------------------------------------------
// 512-step Acid Gecko Bloom LUTs
// ---------------------------------------------------------------------------
// Main Acid Gecko Bloom:
// green -> acid lime -> aqua -> blue -> violet -> hot pink.
//
// The first and last colors are intentional anchors:
// - top-left / J start:  green
// - bottom-right / O end: #FF00B8

const ACID_GECKO_BLOOM_STOPS = [
  "#00FF66",
  "#B6FF00",
  "#00FFE0",
  "#006DFF",
  "#8B00FF",
  "#FF00B8",
].map(hexToRGBA)

// Colored shadow LUT.
// This is deliberately NOT black. It gives the drop shadow a saturated
// blue/violet/magenta extrusion underneath the foreground letters.
const ACID_GECKO_SHADOW_STOPS = [
  "#00D9FF",
  "#008CFF",
  "#0057FF",
  "#5B00FF",
  "#B000FF",
  "#FF008C",
].map(hexToRGBA)

function buildGradientLUT(stops: RGBA[], steps: number): RGBA[] {
  if (stops.length < 2) {
    return [forceNeon(stops[0] ?? rgba(0, 255, 102))]
  }

  const out: RGBA[] = []
  const segments = stops.length - 1

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    const pos = t * segments
    const segment = Math.min(segments - 1, Math.floor(pos))
    const localT = pos - segment
    const eased = smoothstep(localT)

    const mixed = mixHSV(stops[segment]!, stops[segment + 1]!, eased)
    out.push(forceNeon(mixed))
  }

  return out
}

const ACID_GECKO_BLOOM_512 = buildGradientLUT(
  ACID_GECKO_BLOOM_STOPS,
  GRADIENT_STEPS,
)

const ACID_GECKO_SHADOW_512 = buildGradientLUT(
  ACID_GECKO_SHADOW_STOPS,
  GRADIENT_STEPS,
)

function colorFromLUT(lut: RGBA[], t: number): RGBA {
  const idx = Math.max(
    0,
    Math.min(lut.length - 1, Math.round(clamp01(t) * (lut.length - 1))),
  )

  return lut[idx]!
}

// ---------------------------------------------------------------------------
// Global diagonal field
// ---------------------------------------------------------------------------
// This colors the frame, header, status text, tagline, and any normal text.
// It is one continuous diagonal fade from the entire logo's top-left corner
// to the entire logo's bottom-right corner.

function globalDiagonalT(
  x: number,
  y: number,
  width: number,
  height: number,
): number {
  const tx = width <= 1 ? 0 : x / (width - 1)
  const ty = height <= 1 ? 0 : y / (height - 1)

  return clamp01((tx + ty) / 2)
}

function globalGradientColor(
  x: number,
  y: number,
  width: number,
  height: number,
  dim = false,
): RGBA {
  const t = globalDiagonalT(x, y, width, height)
  return forceNeon(colorFromLUT(ACID_GECKO_BLOOM_512, t), dim)
}

// ---------------------------------------------------------------------------
// JEKKO-local gradient
// ---------------------------------------------------------------------------
// The wordmark has its own dedicated gradient so the J and O POP.
// This guarantees:
// - top-left of the J uses the green anchor
// - bottom-right of the O uses #FF00B8

function wordmarkT(
  sourceX: number,
  sourceY: number,
  width: number,
  height: number,
): number {
  const tx = width <= 1 ? 0 : clamp01(sourceX / (width - 1))
  const ty = height <= 1 ? 0 : clamp01(sourceY / (height - 1))

  return clamp01((tx + ty) / 2)
}

function wordmarkColor(
  sourceX: number,
  sourceY: number,
  width: number,
  height: number,
): RGBA {
  const t = wordmarkT(sourceX, sourceY, width, height)
  return forceNeon(colorFromLUT(ACID_GECKO_BLOOM_512, t))
}

function wordmarkShadowColor(
  sourceX: number,
  sourceY: number,
  width: number,
  height: number,
  layer: "near" | "far",
): RGBA {
  const baseT = wordmarkT(sourceX, sourceY, width, height)

  // Tiny forward offset makes the shadow feel like a colored extrusion
  // instead of a flat duplicate.
  const t = clamp01(baseT + (layer === "far" ? 0.12 : 0.055))
  const base = colorFromLUT(ACID_GECKO_SHADOW_512, t)

  return deepenNeon(base, layer === "far" ? 0.46 : 0.72)
}

// ---------------------------------------------------------------------------
// Text layout helpers
// ---------------------------------------------------------------------------

function glyphLength(text: string): number {
  return Array.from(text).length
}

function padGlyphs(text: string, width: number): string {
  const remaining = Math.max(0, width - glyphLength(text))
  return text + " ".repeat(remaining)
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
  return `╭${"─".repeat(OUTER_WIDTH - 2)}╮`
}

function divider(): string {
  return `├${"─".repeat(OUTER_WIDTH - 2)}┤`
}

function bottomBorder(): string {
  return `╰${"─".repeat(OUTER_WIDTH - 2)}╯`
}

// ---------------------------------------------------------------------------
// Cell helpers
// ---------------------------------------------------------------------------

function globalCell(
  char: string,
  options: { bold?: boolean; dim?: boolean } = {},
): LogoCell {
  return {
    char,
    layer: "global",
    bold: options.bold,
    dim: options.dim,
  }
}

function emptyGlobalCell(): LogoCell {
  return globalCell(" ")
}

function textRow(
  text: string,
  options: { bold?: boolean; dim?: boolean } = {},
): LogoRow {
  return {
    bold: options.bold,
    dim: options.dim,
    cells: Array.from(text).map((char) => globalCell(char, options)),
  }
}

function frameCells(cells: LogoCell[]): LogoRow {
  const inner = cells.slice(0, INNER_WIDTH)

  while (inner.length < INNER_WIDTH) {
    inner.push(emptyGlobalCell())
  }

  return {
    bold: true,
    cells: [
      globalCell("│", { bold: true }),
      ...inner,
      globalCell("│", { bold: true }),
    ],
  }
}

function isInk(char: string): boolean {
  return char !== " "
}

// ---------------------------------------------------------------------------
// Solid JEKKO wordmark
// ---------------------------------------------------------------------------
// This is intentionally NOT the old outline-style figlet.
// It is a filled block mask. The shadow is generated by code below,
// so there is no black outline baked into the wordmark.

const JEKKO_WORDMARK_SOLID = [
  "     ██████  ███████ ██   ██ ██   ██  ██████ ",
  "       ██    ██      ██  ██  ██  ██  ██    ██",
  "       ██    ██      ██ ██   ██ ██   ██    ██",
  "       ██    █████   ████    ████    ██    ██",
  " ██    ██    ██      ██ ██   ██ ██   ██    ██",
  " ██    ██    ██      ██  ██  ██  ██  ██    ██",
  "  ██████     ███████ ██   ██ ██   ██  ██████ ",
]

const GO_WORDMARK_SOLID = [
  " ██████   ██████ ",
  "██       ██    ██",
  "██  ████ ██    ██",
  "██    ██ ██    ██",
  " ██████   ██████ ",
]

type ArtMetrics = {
  lines: string[]
  artWidth: number
  artHeight: number
  gradientLeft: number
  gradientRight: number
  gradientWidth: number
  gradientHeight: number
}

function normalizeArt(art: string[]): string[] {
  const width = Math.max(...art.map(glyphLength))
  return art.map((line) => padGlyphs(line, width))
}

function firstVisibleIndex(line: string): number | undefined {
  const chars = Array.from(line)
  const idx = chars.findIndex(isInk)
  return idx >= 0 ? idx : undefined
}

function lastVisibleIndex(line: string): number | undefined {
  const chars = Array.from(line)

  for (let i = chars.length - 1; i >= 0; i--) {
    if (isInk(chars[i]!)) return i
  }

  return undefined
}

function artMetrics(art: string[]): ArtMetrics {
  const lines = normalizeArt(art)
  const artWidth = Math.max(...lines.map(glyphLength))
  const artHeight = lines.length

  const allVisibleXs: number[] = []

  for (const line of lines) {
    const chars = Array.from(line)

    chars.forEach((char, x) => {
      if (isInk(char)) allVisibleXs.push(x)
    })
  }

  const minVisibleX = Math.min(...allVisibleXs)
  const maxVisibleX = Math.max(...allVisibleXs)

  // Important:
  // Use the first visible cell on the TOP ROW as the green anchor
  // and the last visible cell on the BOTTOM ROW as the hot-pink anchor.
  //
  // This makes the top-left of the J actually start green, rather than
  // wasting the first part of the gradient on the lower J hook.
  const topAnchor = firstVisibleIndex(lines[0]!) ?? minVisibleX
  const bottomAnchor = lastVisibleIndex(lines[lines.length - 1]!) ?? maxVisibleX

  const gradientLeft = topAnchor
  const gradientRight = bottomAnchor

  return {
    lines,
    artWidth,
    artHeight,
    gradientLeft,
    gradientRight,
    gradientWidth: Math.max(1, gradientRight - gradientLeft + 1),
    gradientHeight: Math.max(1, artHeight),
  }
}

const WORDMARK_SHADOW_LAYERS: Array<{
  dx: number
  dy: number
  layer: "wordmarkShadowNear" | "wordmarkShadowFar"
}> = [
    // Far pass first: lower, darker, more purple/blue.
    { dx: 4, dy: 2, layer: "wordmarkShadowFar" },
    { dx: 3, dy: 2, layer: "wordmarkShadowFar" },
    { dx: 2, dy: 2, layer: "wordmarkShadowFar" },

    // Near pass second: brighter colored filled extrusion.
    { dx: 2, dy: 1, layer: "wordmarkShadowNear" },
    { dx: 1, dy: 1, layer: "wordmarkShadowNear" },
    { dx: 0, dy: 1, layer: "wordmarkShadowNear" },
  ]

function maxShadowDx(): number {
  return Math.max(...WORDMARK_SHADOW_LAYERS.map((layer) => layer.dx))
}

function maxShadowDy(): number {
  return Math.max(...WORDMARK_SHADOW_LAYERS.map((layer) => layer.dy))
}

function putCell(
  canvas: LogoCell[][],
  x: number,
  y: number,
  cell: LogoCell,
): void {
  if (y < 0 || y >= canvas.length) return
  if (x < 0 || x >= canvas[y]!.length) return

  canvas[y]![x] = cell
}

function buildShadowedArtRows(
  art: string[],
  targetWidth: number,
  options: {
    framed?: boolean
    dim?: boolean
  } = {},
): LogoRow[] {
  const metrics = artMetrics(art)
  const shadowDx = maxShadowDx()
  const shadowDy = maxShadowDy()

  const visualWidth = metrics.artWidth + shadowDx
  const visualHeight = metrics.artHeight + shadowDy

  const left = Math.max(0, Math.floor((targetWidth - visualWidth) / 2))

  const canvas: LogoCell[][] = Array.from({ length: visualHeight }, () =>
    Array.from({ length: targetWidth }, emptyGlobalCell),
  )

  function makeArtCell(
    char: string,
    layer: CellLayer,
    x: number,
    y: number,
  ): LogoCell {
    return {
      char,
      layer,
      bold: true,
      dim: options.dim,

      // Clamp left-hook J cells to the green side of the gradient.
      // That keeps the top-left of the J green while the J hook still
      // stays in the same green family.
      sourceX: x - metrics.gradientLeft,
      sourceY: y,
      sourceWidth: metrics.gradientWidth,
      sourceHeight: metrics.gradientHeight,
    }
  }

  // 1) Draw colored filled shadow first.
  for (const shadow of WORDMARK_SHADOW_LAYERS) {
    for (let y = 0; y < metrics.lines.length; y++) {
      const chars = Array.from(metrics.lines[y]!)

      for (let x = 0; x < chars.length; x++) {
        const char = chars[x]!

        if (!isInk(char)) continue

        putCell(
          canvas,
          left + x + shadow.dx,
          y + shadow.dy,
          makeArtCell("█", shadow.layer, x, y),
        )
      }
    }
  }

  // 2) Draw foreground last so the colored shadow sits behind it.
  for (let y = 0; y < metrics.lines.length; y++) {
    const chars = Array.from(metrics.lines[y]!)

    for (let x = 0; x < chars.length; x++) {
      const char = chars[x]!

      if (!isInk(char)) continue

      putCell(
        canvas,
        left + x,
        y,
        makeArtCell(char, "wordmark", x, y),
      )
    }
  }

  const rows = canvas.map((cells) => ({
    bold: true,
    dim: options.dim,
    cells,
  }))

  return options.framed ? rows.map((row) => frameCells(row.cells)) : rows
}

// ---------------------------------------------------------------------------
// Cell color selection
// ---------------------------------------------------------------------------

function cellColor(
  cell: LogoCell,
  row: LogoRow,
  x: number,
  y: number,
  totalWidth: number,
  totalRows: number,
): RGBA {
  const dim = Boolean(cell.dim ?? row.dim)

  if (
    cell.layer === "wordmark" ||
    cell.layer === "wordmarkShadowNear" ||
    cell.layer === "wordmarkShadowFar"
  ) {
    const sourceX = cell.sourceX ?? x
    const sourceY = cell.sourceY ?? y
    const sourceWidth = cell.sourceWidth ?? totalWidth
    const sourceHeight = cell.sourceHeight ?? totalRows

    if (cell.layer === "wordmark") {
      return wordmarkColor(sourceX, sourceY, sourceWidth, sourceHeight)
    }

    return wordmarkShadowColor(
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      cell.layer === "wordmarkShadowFar" ? "far" : "near",
    )
  }

  return globalGradientColor(x, y, totalWidth, totalRows, dim)
}

// ---------------------------------------------------------------------------
// GradientRow
// ---------------------------------------------------------------------------
// One <text> node per cell gives precise control over every character:
// borders, normal text, foreground letters, and shadow letters.

function GradientRow(props: {
  row: LogoRow
  y: number
  totalRows: number
  totalWidth: number
}) {
  return (
    <box flexDirection="row">
      <For each={props.row.cells}>
        {(cell, x) => {
          const bold = Boolean(cell.bold ?? props.row.bold)
          const attrs = bold ? TextAttributes.BOLD : undefined

          return (
            <text
              fg={cellColor(
                cell,
                props.row,
                x(),
                props.y,
                props.totalWidth,
                props.totalRows,
              )}
              attributes={attrs}
              selectable={false}
            >
              {cell.char}
            </text>
          )
        }}
      </For>
    </box>
  )
}

// ---------------------------------------------------------------------------
// Logo builder
// ---------------------------------------------------------------------------

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

  const headerRight = props.idle
    ? "gecko mode idle  ● ● ● "
    : "gecko mode active  ● ● ● "

  return [
    textRow(topBorder(), { bold: true }),
    textRow(framedPair(" ›_ JEKKO", headerRight), { bold: true }),
    textRow(divider(), { bold: true }),

    textRow(framed(), { bold: true }),

    ...buildShadowedArtRows(JEKKO_WORDMARK_SOLID, INNER_WIDTH, {
      framed: true,
      dim: false,
    }),

    textRow(framed(), { bold: true }),
    textRow(
      framed(`AI coding gecko • ${support} support • climbs hard problems`),
      { bold: true },
    ),
    textRow(framed(`gecko:// ${status}`), {
      bold: true,
      dim: props.idle,
    }),

    textRow(bottomBorder(), { bold: true }),
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
    Math.max(OUTER_WIDTH, ...rows().map((row) => row.cells.length)),
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
// GoLogo
// ---------------------------------------------------------------------------
// Uses the same filled shadow system, but without the surrounding frame.

export function GoLogo(props: { idle?: boolean } = {}) {
  const rows = createMemo<LogoRow[]>(() =>
    buildShadowedArtRows(GO_WORDMARK_SOLID, 24, {
      framed: false,
      dim: props.idle,
    }),
  )

  const totalWidth = createMemo(() =>
    Math.max(...rows().map((row) => row.cells.length)),
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