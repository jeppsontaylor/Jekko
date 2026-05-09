// JEKKO block-letter glyphs for the TUI logo.
// Characters: █ ▀ ▄ = lit (ink color)
// Shadow markers: _ = shadow fill, ^ = ink▀shadow, ~ = shadow▀, , = shadow▄
// The animation engine (logo.tsx) adds shimmer, glow, and interactivity.

export const logo = {
  left: [
    "                  ",
    "   █▀▀▀ █▀▀▀ █▀▄ ",
    "   ___█ █^^^ ██▀▄",
    "█~,▀▀▀  ▀▀▀▀ ▀  ▀",
  ],
  right: [
    "              ",
    "█▀▄  █▀▀█    ▄",
    "██▀▄ █__█   ▀▄",
    "▀  ▀ ▀▀▀▀    ▀",
  ],
}

export const go = {
  left: ["    ", "█▀▀▀", "█_^█", "▀▀▀▀"],
  right: ["    ", "█▀▀█", "█__█", "▀▀▀▀"],
}

export const marks = "_^~,"
