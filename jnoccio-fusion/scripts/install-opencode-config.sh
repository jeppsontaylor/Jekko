#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
template="$repo_root/opencode/opencode.jnoccio.jsonc"
target="${HOME}/.config/opencode/opencode.jsonc"
mkdir -p "$(dirname "$target")"

if [[ -f "$target" ]]; then
  backup="${target}.bak.$(date +%Y%m%d%H%M%S)"
  cp "$target" "$backup"
  echo "Backed up existing config to $backup"
fi

node --input-type=module - "$repo_root" "$template" "$target" <<'NODE'
import fs from "node:fs"
const [repoRoot, templatePath, targetPath] = process.argv.slice(2)
const stripJsonc = (input) => {
  let out = ""
  let i = 0
  let inString = false
  let stringQuote = ""
  let escaped = false
  while (i < input.length) {
    const ch = input[i]
    const next = input[i + 1]
    if (inString) {
      out += ch
      if (escaped) {
        escaped = false
      } else if (ch === "\\") {
        escaped = true
      } else if (ch === stringQuote) {
        inString = false
      }
      i += 1
      continue
    }
    if (ch === '"' || ch === "'") {
      inString = true
      stringQuote = ch
      out += ch
      i += 1
      continue
    }
    if (ch === "/" && next === "/") {
      while (i < input.length && input[i] !== "\n") i += 1
      continue
    }
    if (ch === "/" && next === "*") {
      i += 2
      while (i < input.length && !(input[i] === "*" && input[i + 1] === "/")) i += 1
      i += 2
      continue
    }
    out += ch
    i += 1
  }
  return out
}
const merge = (target, source) => {
  if (Array.isArray(target) || Array.isArray(source)) return source
  if (!target || typeof target !== "object" || !source || typeof source !== "object") return source
  const out = { ...target }
  for (const [key, value] of Object.entries(source)) {
    out[key] = key in out ? merge(out[key], value) : value
  }
  return out
}
const template = JSON.parse(stripJsonc(fs.readFileSync(templatePath, "utf8")))
const existing = fs.existsSync(targetPath) ? JSON.parse(stripJsonc(fs.readFileSync(targetPath, "utf8"))) : {}
const merged = merge(existing, template)
const jnoccioLauncher = {
  mcp: {
    jnoccio: {
      type: "local",
      command: [
        "cargo",
        "run",
        "--quiet",
        "--manifest-path",
        `${repoRoot}/Cargo.toml`,
        "--bin",
        "jnoccio-mcp",
        "--",
        "--config",
        `${repoRoot}/config/server.json`,
        "--ensure-server",
      ],
      enabled: true,
      timeout: 300000,
    },
  },
}
const finalConfig = merge(jnoccioLauncher, merged)
fs.writeFileSync(targetPath, JSON.stringify(finalConfig, null, 2) + "\n")
NODE

echo "Installed OpenCode config to $target"
