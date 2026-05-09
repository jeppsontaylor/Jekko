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

      {/* Wordmark */}
      <For each={brandWordmarkLines}>
        {(raw, idx) => {
          let prefix = ""
          const i = idx()
          if (i === 0) prefix = "     "
          else if (i === 1) prefix = "  ╭─╮"
          else if (i === 2) prefix = " ╭╯●╰"
          else if (i === 3) prefix = " ╰╮ ╭"
          else prefix = "  ╰─╯"

          const padLen = w - 2 - prefix.length - raw.length

          return (
            <box flexDirection="row">
              <text fg={ORANGE} selectable={false}>
                │
              </text>
              <GradientText text={prefix} left={ORANGE_2} right={CYAN} />
              <GradientText text={raw} left={ORANGE} right={ORANGE_2} bold />
              <text selectable={false}>{" ".repeat(Math.max(0, padLen))}</text>
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
