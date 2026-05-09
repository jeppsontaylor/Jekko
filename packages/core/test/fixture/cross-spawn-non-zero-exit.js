const fs = require("node:fs")

const code = Number(process.env.JEKKO_NON_ZERO_EXIT_CODE ?? "1")
fs.writeFileSync(process.env.JEKKO_NON_ZERO_EXIT_MARKER, "ran")
process.exit(code)
