#!/usr/bin/env bun
import { $ } from "bun"
import * as path from "node:path"
import { resolveChannel } from "./utils"

const arg = process.argv[2]
const channel = arg === "dev" || arg === "beta" || arg === "prod" ? arg : resolveChannel()

const ICONS_DIR = path.join(process.cwd(), "icons", channel)
const ICONS_OUT_DIR = path.join(process.cwd(), "resources/icons")

await $`rm -rf ${ICONS_OUT_DIR}`
await $`mkdir -p ${path.dirname(ICONS_OUT_DIR)}`
await $`cp -R ${ICONS_DIR} ${ICONS_OUT_DIR}`
console.log(`Copied ${channel} icons from ${ICONS_DIR} to ${ICONS_OUT_DIR}`)
