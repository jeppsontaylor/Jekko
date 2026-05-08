import { $ } from "bun"

await $`bun ./scripts/copy-icons.ts ${process.env.JEKKO_CHANNEL ?? "dev"}`

await $`cd ../jekko && bun script/build-node.ts`
