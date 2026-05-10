// jankurai:allow HLT-000-SCORE-DIMENSION reason=large-structured-file-with-parallel-patterns-by-design expires=2027-01-01
import { RGBA } from "@opentui/core"
import { createMemo, For } from "solid-js"

export type Align = "left" | "center" | "right"
export type RGB = { r: number; g: number; b: number }
type HSV = { h: number; s: number; v: number }
type VisibleIndexResult = { kind: "found"; index: number } | { kind: "missing" }
type WordmarkLayer = "wordmark" | "wordmarkShadowNear" | "wordmarkShadowMid" | "wordmarkShadowFar"
type WordmarkSource = {
  layer: WordmarkLayer
  sourceX: number
  sourceY: number
  sourceWidth: number
  sourceHeight: number
}

export type CellLayer =
  | "global"
  | "wordmark"
  | "wordmarkShadowNear"
  | "wordmarkShadowMid"
  | "wordmarkShadowFar"

export type LogoCell = {
  char: string
  layer: CellLayer
  strong?: boolean
  dim?: boolean
  sourceX?: number
  sourceY?: number
  sourceWidth?: number
  sourceHeight?: number
}

export type LogoRow = {
  cells: LogoCell[]
  strong?: boolean
  dim?: boolean
}

export type LogoProps = {
  shape?: unknown
  ink?: RGBA
  idle?: boolean
  support?: string
  status?: string
}

export type GoLogoProps = {
  idle?: boolean
}

export type SvgPreviewOptions = {
  cellWidth?: number
  cellHeight?: number
  fontSize?: number
  baseline?: number
  paddingX?: number
  paddingY?: number
  background?: string
  title?: string
}

export const INNER_WIDTH = 78
export const OUTER_WIDTH = INNER_WIDTH + 2
const GRADIENT_STEPS = 1024

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

function clamp255(n: number): number {
  return Math.max(0, Math.min(255, Math.round(n)))
}

function rgb(r: number, g: number, b: number): RGB {
  return { r: clamp255(r), g: clamp255(g), b: clamp255(b) }
}

function toRGBA(color: RGB): RGBA {
  return RGBA.fromInts(color.r, color.g, color.b, 255)
}

function hexToRGB(hex: string): RGB {
  const clean = hex.replace("#", "").trim()

  if (clean.length !== 6) {
    return rgb(255, 0, 184)
  }

  return rgb(
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  )
}

export function colorToCss(color: RGB): string {
  return `rgb(${color.r},${color.g},${color.b})`
}

function rgbToHSV(color: RGB): HSV {
  const rn = color.r / 255
  const gn = color.g / 255
  const bn = color.b / 255

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

function hsvToRGB(h: number, s: number, v: number): RGB {
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

  return rgb((r + m) * 255, (g + m) * 255, (b + m) * 255)
}

function mixHue(left: number, right: number, t: number): number {
  const delta = ((right - left + 540) % 360) - 180
  return (left + delta * t + 360) % 360
}

function mixHSV(left: RGB, right: RGB, t: number): RGB {
  const k = clamp01(t)
  const l = rgbToHSV(left)
  const r = rgbToHSV(right)

  return hsvToRGB(
    mixHue(l.h, r.h, k),
    l.s + (r.s - l.s) * k,
    l.v + (r.v - l.v) * k,
  )
}

function smoothstep(t: number): number {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}

function forceNeon(color: RGB, dim = false): RGB {
  const hsv = rgbToHSV(color)

  if (dim) {
    return hsvToRGB(hsv.h, Math.max(0.86, hsv.s), 0.72)
  }

  return hsvToRGB(hsv.h, 1, 1)
}

function deepenNeon(color: RGB, value: number): RGB {
  const hsv = rgbToHSV(color)
  return hsvToRGB(hsv.h, 1, value)
}

// ---------------------------------------------------------------------------
// Acid Gecko Bloom palette
// ---------------------------------------------------------------------------
// Same color story as your original, but the 1024-step HSV LUT keeps gradients
// bright and cleaner in both terminal cells and generated previews.

const ACID_GECKO_BLOOM_STOPS = [
  "#00FF66",
  "#B6FF00",
  "#00FFE0",
  "#006DFF",
  "#8B00FF",
  "#FF00B8",
].map(hexToRGB)

const ACID_GECKO_SHADOW_STOPS = [
  "#00CFFF",
  "#007CFF",
  "#254BFF",
  "#6A00FF",
  "#A500FF",
  "#FF008C",
].map(hexToRGB)

function buildGradientLUT(stops: RGB[], steps: number): RGB[] {
  if (stops.length < 2) {
    return [forceNeon(stops[0] ?? rgb(0, 255, 102))]
  }

  const out: RGB[] = []
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

const ACID_GECKO_BLOOM = buildGradientLUT(
  ACID_GECKO_BLOOM_STOPS,
  GRADIENT_STEPS,
)

const ACID_GECKO_SHADOW = buildGradientLUT(
  ACID_GECKO_SHADOW_STOPS,
  GRADIENT_STEPS,
)

function colorFromLUT(lut: RGB[], t: number): RGB {
  const idx = Math.max(
    0,
    Math.min(lut.length - 1, Math.round(clamp01(t) * (lut.length - 1))),
  )

  return lut[idx]!
}

// ---------------------------------------------------------------------------
// Global diagonal field
// ---------------------------------------------------------------------------

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
): RGB {
  const t = globalDiagonalT(x, y, width, height)
  return forceNeon(colorFromLUT(ACID_GECKO_BLOOM, t), dim)
}

// ---------------------------------------------------------------------------
// Wordmark-local gradient
// ---------------------------------------------------------------------------

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
): RGB {
  const t = wordmarkT(sourceX, sourceY, width, height)
  return forceNeon(colorFromLUT(ACID_GECKO_BLOOM, t))
}

function wordmarkShadowColor(
  sourceX: number,
  sourceY: number,
  width: number,
  height: number,
  layer: "near" | "mid" | "far",
): RGB {
  const baseT = wordmarkT(sourceX, sourceY, width, height)
  const t = clamp01(
    baseT + (layer === "far" ? 0.15 : layer === "mid" ? 0.095 : 0.052),
  )
  const base = colorFromLUT(ACID_GECKO_SHADOW, t)

  if (layer === "far") return deepenNeon(base, 0.34)
  if (layer === "mid") return deepenNeon(base, 0.5)
  return deepenNeon(base, 0.68)
}

function resolveWordmarkSource(
  cell: LogoCell,
  x: number,
  y: number,
  totalWidth: number,
  totalRows: number,
): WordmarkSource | undefined {
  if (
    cell.layer !== "wordmark" &&
    cell.layer !== "wordmarkShadowNear" &&
    cell.layer !== "wordmarkShadowMid" &&
    cell.layer !== "wordmarkShadowFar"
  ) {
    return
  }

  return {
    layer: cell.layer,
    sourceX: cell.sourceX ?? x,
    sourceY: cell.sourceY ?? y,
    sourceWidth: cell.sourceWidth ?? totalWidth,
    sourceHeight: cell.sourceHeight ?? totalRows,
  }
}

// ---------------------------------------------------------------------------
// Text layout helpers
// ---------------------------------------------------------------------------

export function glyphLength(text: string): number {
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
  options: { strong?: boolean; dim?: boolean } = {},
): LogoCell {
  return {
    char,
    layer: "global",
    strong: options.strong,
    dim: options.dim,
  }
}

function emptyGlobalCell(): LogoCell {
  return globalCell(" ")
}

function textRow(
  text: string,
  options: { strong?: boolean; dim?: boolean } = {},
): LogoRow {
  return {
    strong: options.strong,
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
    cells: [
      globalCell("│"),
      ...inner,
      globalCell("│"),
    ],
  }
}

function isInk(char: string): boolean {
  return char !== " "
}

// ---------------------------------------------------------------------------
// Crisp half-block wordmarks
// ---------------------------------------------------------------------------
// A 5x7 pixel font is rendered with Unicode half-blocks (▀ ▄ █) so that two
// pixel rows pack into one terminal cell. This doubles the effective vertical
// resolution while staying perfectly crisp — every cell is either a solid
// half/full block or empty. The SVG preview renderer turns each block into the
// matching half- or full-height rectangle for vector-grade output.

type PixelFont = Record<string, string[]>

const PIXEL_FONT_5X7: PixelFont = {
  J: [
    "00111",
    "00001",
    "00001",
    "00001",
    "00001",
    "10001",
    "01110",
  ],
  E: [
    "11111",
    "10000",
    "10000",
    "11110",
    "10000",
    "10000",
    "11111",
  ],
  K: [
    "10001",
    "10010",
    "10100",
    "11000",
    "10100",
    "10010",
    "10001",
  ],
  O: [
    "01110",
    "10001",
    "10001",
    "10001",
    "10001",
    "10001",
    "01110",
  ],
  G: [
    "01110",
    "10001",
    "10000",
    "10111",
    "10001",
    "10001",
    "01110",
  ],
  " ": [
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
    "00000",
  ],
}

function renderPixelWord(
  text: string,
  options: { scaleX?: number; gap?: number } = {},
): string[] {
  const scaleX = options.scaleX ?? 2
  const gap = options.gap ?? 2
  const glyphs = Array.from(text.toUpperCase()).map(
    (letter) => PIXEL_FONT_5X7[letter] ?? PIXEL_FONT_5X7[" "]!,
  )
  const pixelHeight = Math.max(...glyphs.map((glyph) => glyph.length))
  const terminalRows = Math.ceil(pixelHeight / 2)
  const rows: string[] = []

  for (let tr = 0; tr < terminalRows; tr++) {
    const topRow = 2 * tr
    const botRow = 2 * tr + 1
    const pieces: string[] = []

    for (const glyph of glyphs) {
      const top = glyph[topRow] ?? ""
      const bot = glyph[botRow] ?? ""
      const cols = Math.max(top.length, bot.length, 5)
      let piece = ""

      for (let c = 0; c < cols; c++) {
        const t = top[c] === "1"
        const b = bot[c] === "1"
        const ch = t && b ? "█" : t ? "▀" : b ? "▄" : " "
        piece += ch.repeat(scaleX)
      }

      pieces.push(piece)
    }

    rows.push(pieces.join(" ".repeat(gap)))
  }

  return rows
}

const JEKKO_WORDMARK_CRISP = renderPixelWord("JEKKO", { scaleX: 2, gap: 2 })
const GO_WORDMARK_CRISP = renderPixelWord("GO", { scaleX: 2, gap: 2 })

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

export function firstVisibleIndex(line: string): VisibleIndexResult {
  const chars = Array.from(line)
  const idx = chars.findIndex(isInk)
  return idx >= 0 ? { kind: "found", index: idx } : { kind: "missing" }
}

export function lastVisibleIndex(line: string): VisibleIndexResult {
  const chars = Array.from(line)

  for (let i = chars.length - 1; i >= 0; i--) {
    if (isInk(chars[i]!)) return { kind: "found", index: i }
  }

  return { kind: "missing" }
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
  const topAnchor = firstVisibleIndex(lines[0]!)
  const bottomAnchor = lastVisibleIndex(lines[lines.length - 1]!)
  const gradientLeft = topAnchor.kind === "found" ? topAnchor.index : minVisibleX
  const gradientRight = bottomAnchor.kind === "found" ? bottomAnchor.index : maxVisibleX

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

// Shadow layers were removed. The previous design stacked three offset copies
// of every glyph (dx=2/4/6, dy=1/2/3) which read as visual repetition rather
// than depth. The wordmark now renders single-layer with the gradient doing
// the depth work. Empty list keeps the canvas-builder API stable.
const WORDMARK_SHADOW_LAYERS: Array<{
  dx: number
  dy: number
  layer: "wordmarkShadowNear" | "wordmarkShadowMid" | "wordmarkShadowFar"
}> = []

function maxShadowDx(): number {
  return WORDMARK_SHADOW_LAYERS.length === 0
    ? 0
    : Math.max(...WORDMARK_SHADOW_LAYERS.map((layer) => layer.dx))
}

function maxShadowDy(): number {
  return WORDMARK_SHADOW_LAYERS.length === 0
    ? 0
    : Math.max(...WORDMARK_SHADOW_LAYERS.map((layer) => layer.dy))
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
      dim: options.dim,
      sourceX: x - metrics.gradientLeft,
      sourceY: y,
      sourceWidth: metrics.gradientWidth,
      sourceHeight: metrics.gradientHeight,
    }
  }

  // Single-layer foreground only — no shadow layers. The diagonal gradient
  // supplies depth without visual repetition.
  for (let y = 0; y < metrics.lines.length; y++) {
    const chars = Array.from(metrics.lines[y]!)

    for (let x = 0; x < chars.length; x++) {
      const char = chars[x]!
      if (!isInk(char)) continue

      putCell(canvas, left + x, y, makeArtCell(char, "wordmark", x, y))
    }
  }

  const rows = canvas.map((cells) => ({
    dim: options.dim,
    cells,
  }))

  return options.framed ? rows.map((row) => frameCells(row.cells)) : rows
}

// ---------------------------------------------------------------------------
// Cell color selection
// ---------------------------------------------------------------------------

export function cellColor(
  cell: LogoCell,
  row: LogoRow,
  x: number,
  y: number,
  totalWidth: number,
  totalRows: number,
): RGB {
  const dim = Boolean(cell.dim ?? row.dim)

  const wordmarkSource = resolveWordmarkSource(cell, x, y, totalWidth, totalRows)
  if (wordmarkSource) {
    if (wordmarkSource.layer === "wordmark") {
      return wordmarkColor(
        wordmarkSource.sourceX,
        wordmarkSource.sourceY,
        wordmarkSource.sourceWidth,
        wordmarkSource.sourceHeight,
      )
    }

    return wordmarkShadowColor(
      wordmarkSource.sourceX,
      wordmarkSource.sourceY,
      wordmarkSource.sourceWidth,
      wordmarkSource.sourceHeight,
      wordmarkSource.layer === "wordmarkShadowFar"
        ? "far"
        : wordmarkSource.layer === "wordmarkShadowMid"
          ? "mid"
          : "near",
    )
  }

  return globalGradientColor(x, y, totalWidth, totalRows, dim)
}

/**
 * Monochromatic ink override — when an `ink` RGBA is provided, this maps the
 * cell's diagonal gradient position onto a luminance curve derived from the
 * ink color instead of the neon gecko palette. Produces a rich gold-to-white
 * gradient for ZYAL mode, or any other monochromatic tint.
 */
function inkMonochrome(
  ink: RGBA,
  cell: LogoCell,
  row: LogoRow,
  x: number,
  y: number,
  totalWidth: number,
  totalRows: number,
): RGB {
  // Base position in [0,1] — same diagonal as the regular gradient
  let t: number
  const wordmarkSource = resolveWordmarkSource(cell, x, y, totalWidth, totalRows)
  if (wordmarkSource) {
    t = wordmarkT(
      wordmarkSource.sourceX,
      wordmarkSource.sourceY,
      wordmarkSource.sourceWidth,
      wordmarkSource.sourceHeight,
    )
    // Shadow layers get progressively darker
    if (wordmarkSource.layer === "wordmarkShadowFar") t = clamp01(t * 0.45)
    else if (wordmarkSource.layer === "wordmarkShadowMid") t = clamp01(t * 0.6)
    else if (wordmarkSource.layer === "wordmarkShadowNear") t = clamp01(t * 0.75)
  } else {
    t = globalDiagonalT(x, y, totalWidth, totalRows)
  }

  const dim = Boolean(cell.dim ?? row.dim)

  // Convert ink RGBA to 0-255 integers
  const baseR = Math.round(ink.r * 255)
  const baseG = Math.round(ink.g * 255)
  const baseB = Math.round(ink.b * 255)

  // Luminance curve: dark amber (t=0) → ink color (t=0.4) → bright gold (t=0.7) → white highlights (t=1.0)
  const brightness = dim ? 0.55 + t * 0.35 : 0.65 + t * 0.35
  const whiteBlend = clamp01((t - 0.65) / 0.35) * 0.4 // top 35% blends toward white

  const r = clamp255(baseR * brightness + (255 - baseR * brightness) * whiteBlend)
  const g = clamp255(baseG * brightness + (255 - baseG * brightness) * whiteBlend)
  const b = clamp255(baseB * brightness + (255 - baseB * brightness) * whiteBlend)

  return rgb(r, g, b)
}

export function logoWidth(rows: LogoRow[]): number {
  return Math.max(OUTER_WIDTH, ...rows.map((row) => row.cells.length))
}

// ---------------------------------------------------------------------------
// Logo builders
// ---------------------------------------------------------------------------

export function buildLogoRows(props: LogoProps = {}): LogoRow[] {
  const support = props.support ?? "ZYAL"

  const status =
    props.status ??
    (props.idle
      ? "camouflage idle • watching the wall"
      : "safe autonomous coding ready")

  const headerRight = props.idle
    ? "gecko mode idle  ● ● ● "
    : "gecko mode active ● ● ● "

  return [
    textRow(topBorder()),
    textRow(framedPair(" ›_ JEKKO", headerRight)),
    textRow(divider()),

    textRow(framed()),

    ...buildShadowedArtRows(JEKKO_WORDMARK_CRISP, INNER_WIDTH, {
      framed: true,
      dim: false,
    }),

    textRow(framed()),
    textRow(
      framed(`AI coding gecko • ${support} support • climbs hard problems`),
    ),
    textRow(framed(`gecko:// ${status}`), {
      dim: props.idle,
    }),

    textRow(bottomBorder()),
  ]
}

export function buildGoLogoRows(props: GoLogoProps = {}): LogoRow[] {
  return buildShadowedArtRows(GO_WORDMARK_CRISP, 26, {
    framed: false,
    dim: props.idle,
  })
}

// ---------------------------------------------------------------------------
// OpenTUI / Solid components
// ---------------------------------------------------------------------------

function GradientRow(props: {
  row: LogoRow
  y: number
  totalRows: number
  totalWidth: number
  ink?: RGBA
}) {
  return (
    <box flexDirection="row">
      <For each={props.row.cells}>
        {(cell, x) => {
          const strong = Boolean(cell.strong ?? props.row.strong)
          const attrs = strong ? 1 : undefined

          const color = props.ink
            ? inkMonochrome(
                props.ink,
                cell,
                props.row,
                x(),
                props.y,
                props.totalWidth,
                props.totalRows,
              )
            : cellColor(
                cell,
                props.row,
                x(),
                props.y,
                props.totalWidth,
                props.totalRows,
              )

          return (
            <text
              fg={toRGBA(color)}
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

export function Logo(props: LogoProps = {}) {
  const rows = createMemo(() => buildLogoRows(props))
  const totalWidth = createMemo(() => logoWidth(rows()))

  return (
    <box flexDirection="column">
      <For each={rows()}>
        {(row, y) => (
          <GradientRow
            row={row}
            y={y()}
            totalRows={rows().length}
            totalWidth={totalWidth()}
            ink={props.ink}
          />
        )}
      </For>
    </box>
  )
}

export function GoLogo(props: GoLogoProps = {}) {
  const rows = createMemo(() => buildGoLogoRows(props))
  const totalWidth = createMemo(() => logoWidth(rows()))

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
// Code-derived preview helpers
// ---------------------------------------------------------------------------
// These render from the same row builder and color engine as <Logo />. Use the
// ANSI output for terminal screenshots, or the SVG output below for a crisp
// deterministic image pipeline without any image generator.

function colorToAnsiFg(color: RGB): string {
  return `\x1b[38;2;${color.r};${color.g};${color.b}m`
}

export function getLogoPlainText(props: LogoProps = {}): string {
  return buildLogoRows(props)
    .map((row) => row.cells.map((cell) => cell.char).join(""))
    .join("\n")
}

export function getGoLogoPlainText(props: GoLogoProps = {}): string {
  return buildGoLogoRows(props)
    .map((row) => row.cells.map((cell) => cell.char).join(""))
    .join("\n")
}

export function renderLogoToAnsi(props: LogoProps = {}): string {
  const rows = buildLogoRows(props)
  const totalWidth = logoWidth(rows)
  const totalRows = rows.length
  const reset = "\x1b[0m"
  const strong = "\x1b[1m"

  return rows
    .map((row, y) =>
      row.cells
        .map((cell, x) => {
          const color = cellColor(cell, row, x, y, totalWidth, totalRows)
          const attrs = Boolean(cell.strong ?? row.strong) ? strong : ""
          return `${attrs}${colorToAnsiFg(color)}${cell.char}${reset}`
        })
        .join(""),
    )
    .join("\n")
}

export function renderGoLogoToAnsi(props: GoLogoProps = {}): string {
  const rows = buildGoLogoRows(props)
  const totalWidth = logoWidth(rows)
  const totalRows = rows.length
  const reset = "\x1b[0m"
  const strong = "\x1b[1m"

  return rows
    .map((row, y) =>
      row.cells
        .map((cell, x) => {
          const color = cellColor(cell, row, x, y, totalWidth, totalRows)
          const attrs = Boolean(cell.strong ?? row.strong) ? strong : ""
          return `${attrs}${colorToAnsiFg(color)}${cell.char}${reset}`
        })
        .join(""),
    )
    .join("\n")
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function renderSvgCell(
  cell: LogoCell,
  row: LogoRow,
  x: number,
  y: number,
  totalWidth: number,
  totalRows: number,
  opts: Required<SvgPreviewOptions>,
): string {
  if (cell.char === " ") return ""

  const color = colorToCss(cellColor(cell, row, x, y, totalWidth, totalRows))
  const px = opts.paddingX + x * opts.cellWidth
  const py = opts.paddingY + y * opts.cellHeight
  const halfH = opts.cellHeight / 2

  if (cell.char === "█") {
    return `<rect x="${px}" y="${py}" width="${opts.cellWidth}" height="${opts.cellHeight}" fill="${color}" shape-rendering="crispEdges"/>`
  }

  if (cell.char === "▀") {
    return `<rect x="${px}" y="${py}" width="${opts.cellWidth}" height="${halfH}" fill="${color}" shape-rendering="crispEdges"/>`
  }

  if (cell.char === "▄") {
    return `<rect x="${px}" y="${py + halfH}" width="${opts.cellWidth}" height="${halfH}" fill="${color}" shape-rendering="crispEdges"/>`
  }

  const weight = Boolean(cell.strong ?? row.strong) ? 800 : 500
  return `<text x="${px}" y="${py + opts.baseline}" font-family="DejaVu Sans Mono, Menlo, Consolas, monospace" font-size="${opts.fontSize}" font-weight="${weight}" fill="${color}" xml:space="preserve">${escapeXml(cell.char)}</text>`
}

export function renderLogoToSvg(
  props: LogoProps = { idle: true },
  options: SvgPreviewOptions = {},
): string {
  const opts: Required<SvgPreviewOptions> = {
    cellWidth: options.cellWidth ?? 20,
    cellHeight: options.cellHeight ?? 40,
    fontSize: options.fontSize ?? 31,
    baseline: options.baseline ?? 31,
    paddingX: options.paddingX ?? 24,
    paddingY: options.paddingY ?? 22,
    background: options.background ?? "#050607",
    title: options.title ?? "JEKKO logo preview",
  }

  const rows = buildLogoRows(props)
  const totalWidth = logoWidth(rows)
  const totalRows = rows.length
  const width = opts.paddingX * 2 + totalWidth * opts.cellWidth
  const height = opts.paddingY * 2 + totalRows * opts.cellHeight

  const cells: string[] = []

  rows.forEach((row, y) => {
    row.cells.forEach((cell, x) => {
      const rendered = renderSvgCell(
        cell,
        row,
        x,
        y,
        totalWidth,
        totalRows,
        opts,
      )

      if (rendered) cells.push(rendered)
    })
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <title>${escapeXml(opts.title)}</title>
  <rect width="100%" height="100%" fill="${opts.background}"/>
  <g text-rendering="geometricPrecision">
    ${cells.join("\n    ")}
  </g>
</svg>
`
}
