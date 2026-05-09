import { BoxRenderable, RGBA, TextAttributes } from "@opentui/core"
import { For, type JSX } from "solid-js"

const ORANGE = RGBA.fromInts(255, 170, 24)
const ORANGE_2 = RGBA.fromInts(255, 140, 0)
const CYAN = RGBA.fromInts(0, 224, 214)
const CYAN_2 = RGBA.fromInts(58, 201, 255)
const WHITE = RGBA.fromInts(241, 244, 248)
const MUTED = RGBA.fromInts(151, 163, 176)
const INK = RGBA.fromInts(8, 11, 15)
const BORDER = RGBA.fromInts(28, 34, 40)

function mixRGB(left: RGBA, right: RGBA, t: number): RGBA {
  const r = Math.round(left.r + (right.r - left.r) * t)
  const g = Math.round(left.g + (right.g - left.g) * t)
  const b = Math.round(left.b + (right.b - left.b) * t)
  return RGBA.fromInts(r, g, b, 255)
}

function GradientText(props: { text: string; left: RGBA; right: RGBA; bold?: boolean }) {
  const chars = props.text.split("")
  const n = Math.max(1, chars.length - 1)
  const attrs = props.bold ? TextAttributes.BOLD : undefined

  return (
    <box flexDirection="row">
      <For each={chars}>
        {(char, i) => (
          <text fg={mixRGB(props.left, props.right, i() / n)} attributes={attrs} selectable={false}>
            {char}
          </text>
        )}
      </For>
    </box>
  )
}

// Each letter segment: [startCol, endCol] (inclusive) within the wordmark line.
// J = cols  0-8,  E = cols 15-23,  K = cols 24-30,  K = cols 32-38,  O = cols 40-47
// Gaps between letters are included in the preceding segment as trailing spaces.
const letterSegments = [
  { start: 0, end: 14 },   // J + gap
  { start: 15, end: 23 },  // E + gap
  { start: 24, end: 31 },  // K1 + gap
  { start: 32, end: 39 },  // K2 + gap
  { start: 40, end: 48 },  // O + trailing
]

// 5 colors: one per letter, gradient from amber-gold → orange
const letterColors = [
  RGBA.fromInts(255, 180, 40),   // J  – bright amber
  RGBA.fromInts(255, 160, 25),   // E  – warm gold
  RGBA.fromInts(255, 145, 15),   // K1 – deeper gold
  RGBA.fromInts(255, 130, 5),    // K2 – rich orange
  RGBA.fromInts(255, 115, 0),    // O  – deep orange
]

const brandWordmarkLines = [
  "   █████       ████████ ██   ██ ██   ██  ██████ ",
  "       ██      ██       ██  ██  ██  ██  ██    ██",
  "       ██      █████    █████   █████   ██    ██",
  "██     ██      ██       ██  ██  ██  ██  ██    ██",
  " ███████       ████████ ██   ██ ██   ██  ██████ ",
]

export function Logo(props: { shape?: any; ink?: RGBA; idle?: boolean } = {}) {
  const w = 74
  const top = "╭" + "─".repeat(w - 2) + "╮"
  const bottom = "╰" + "─".repeat(w - 2) + "╯"
  const sep = "├" + "─".repeat(w - 2) + "┤"

  const subtitlePlain = "[ AI coding gecko • "
  const zqmlPlain = "ZYAL"
  const suffixPlain = " support ]"
  const totalPlain = subtitlePlain.length + zqmlPlain.length + suffixPlain.length
  const subLeftSpaces = Math.floor((w - 2 - totalPlain) / 2)
  const subRightSpaces = w - 2 - totalPlain - subLeftSpaces

  const cmdPlain = "gecko:// safe autonomous coding ready"
  const cmdLeftSpaces = Math.floor((w - 2 - cmdPlain.length) / 2)
  const cmdRightSpaces = w - 2 - cmdPlain.length - cmdLeftSpaces

  // The wordmark is 48 chars wide. Center it in the 72-char inner width.
  const wordmarkWidth = brandWordmarkLines[0]!.length
  const wmLeftPad = Math.floor((w - 2 - wordmarkWidth) / 2)
  const wmRightPad = w - 2 - wordmarkWidth - wmLeftPad

  return (
    <box flexDirection="column">
      {/* Top Border */}
      <text fg={ORANGE} selectable={false}>
        {top}
      </text>

      {/* Header */}
      <box flexDirection="row">
        <text fg={ORANGE} selectable={false}>
          │
        </text>
        <text fg={CYAN} attributes={TextAttributes.BOLD} selectable={false}>
          ›_
        </text>
        <text selectable={false}>{" ".repeat(w - 8 - 6)}</text>
        <text fg={ORANGE} selectable={false}>
          ●{" "}
        </text>
        <text fg={ORANGE_2} selectable={false}>
          ●{" "}
        </text>
        <text fg={CYAN} selectable={false}>
          ●
        </text>
        <text fg={ORANGE} selectable={false}>
          │
        </text>
      </box>

      {/* Sep */}
      <text fg={BORDER} selectable={false}>
        {sep}
      </text>

      {/* Wordmark — per-letter coloring, no gecko prefix */}
      <For each={brandWordmarkLines}>
        {(raw) => {
          return (
            <box flexDirection="row">
              <text fg={ORANGE} selectable={false}>
                │
              </text>
              <text selectable={false}>{" ".repeat(wmLeftPad)}</text>
              {/* Render each letter segment with its own solid color */}
              <For each={letterSegments}>
                {(seg, segIdx) => {
                  const slice = raw.substring(seg.start, Math.min(seg.end, raw.length))
                  const color = letterColors[segIdx()]!
                  return (
                    <text fg={color} attributes={TextAttributes.BOLD} selectable={false}>
                      {slice}
                    </text>
                  )
                }}
              </For>
              <text selectable={false}>{" ".repeat(wmRightPad)}</text>
              <text fg={ORANGE} selectable={false}>
                │
              </text>
            </box>
          )
        }}
      </For>

      {/* Sep */}
      <text fg={BORDER} selectable={false}>
        {sep}
      </text>

      {/* Subtitle */}
      <box flexDirection="row">
        <text fg={ORANGE} selectable={false}>
          │
        </text>
        <text selectable={false}>{" ".repeat(subLeftSpaces)}</text>
        <text fg={WHITE} attributes={TextAttributes.BOLD} selectable={false}>
          {subtitlePlain}
        </text>
        <text fg={CYAN} attributes={TextAttributes.BOLD} selectable={false}>
          {zqmlPlain}
        </text>
        <text fg={WHITE} attributes={TextAttributes.BOLD} selectable={false}>
          {suffixPlain}
        </text>
        <text selectable={false}>{" ".repeat(subRightSpaces)}</text>
        <text fg={ORANGE} selectable={false}>
          │
        </text>
      </box>

      {/* Command Ready */}
      <box flexDirection="row">
        <text fg={ORANGE} selectable={false}>
          │
        </text>
        <text selectable={false}>{" ".repeat(cmdLeftSpaces)}</text>
        <text fg={MUTED} attributes={TextAttributes.DIM} selectable={false}>
          {cmdPlain}
        </text>
        <text selectable={false}>{" ".repeat(cmdRightSpaces)}</text>
        <text fg={ORANGE} selectable={false}>
          │
        </text>
      </box>

      {/* Bottom Border */}
      <text fg={ORANGE} selectable={false}>
        {bottom}
      </text>
    </box>
  )
}

const goWordmarkLines = [
  " ██████   ██████ ",
  "██       ██    ██",
  "██  ████ ██    ██",
  "██    ██ ██    ██",
  " ██████   ██████ ",
]

export function GoLogo(props: { idle?: boolean }) {
  return (
    <box flexDirection="column">
      <For each={goWordmarkLines}>
        {(raw) => (
          <box flexDirection="row">
            <GradientText text={raw} left={CYAN} right={CYAN_2} bold />
          </box>
        )}
      </For>
    </box>
  )
}
