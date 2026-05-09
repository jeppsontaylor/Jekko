// JEKKO block-letter glyphs for the TUI logo.
//
// Each letter is 4 chars wide, matching the original proven design:
//   █ ▀ ▄  = lit characters (get ink color + shimmer)
//   _      = shadow fill (space with shadow bg)
//   ^      = ink top / shadow bottom (▀ split)
//   ~      = shadow top only (▀ in shadow color)
//   ,      = shadow bottom only (▄ in shadow color)
//
// J E K → left side      K O → right side

export const logo = {
  left: [
    "              ",
    "█▀▀█ █▀▀▀ █ █▀",
    " __█ █^^^ ██▀ ",
    "▀▀▀  ▀▀▀▀ ▀ ▀▀",
  ],
  right: [
    "         ",
    "█ █▀ █▀▀█",
    "██▀  █__█",
    "▀ ▀▀ ▀▀▀▀",
  ],
}

export const go = {
  left: ["    ", "█▀▀▀", "█_^█", "▀▀▀▀"],
  right: ["    ", "█▀▀█", "█__█", "▀▀▀▀"],
}

export const marks = "_^~,"
