#!/usr/bin/env bash
set -euo pipefail

# ── git-crypt encryption verifier ────────────────────────────────
# Ensures every committed blob under jnoccio-fusion/ (minus
# documented exceptions) starts with the \0GITCRYPT\0 magic header.
#
# This script does NOT need the decryption key.
# It runs in CI as a required status check and can be run locally.
# ─────────────────────────────────────────────────────────────────

# Hex representation of the git-crypt magic header: \0GITCRYPT\0
MAGIC_HEX="00474954435259505400"

# Files explicitly excluded from encryption (must match .gitattributes exceptions)
EXCEPTIONS=(
  "jnoccio-fusion/README.md"
  "jnoccio-fusion/.gitignore"
  "jnoccio-fusion/.env.jnoccio.example"
  "jnoccio-fusion/KEYS.md"
  "jnoccio-fusion/ENCRYPTION.md"
)

is_exception() {
  local path="$1"
  for exc in "${EXCEPTIONS[@]}"; do
    [[ "$path" == "$exc" ]] && return 0
  done
  return 1
}

ERRORS=0
CHECKED=0

# Check every tracked file under jnoccio-fusion/
while IFS= read -r file; do
  # Skip exceptions
  is_exception "$file" && continue

  # Skip files that don't exist in the working tree (deleted)
  [[ -f "$file" ]] || continue

  CHECKED=$((CHECKED + 1))

  # Read first 10 bytes and convert to hex
  hex=$(head -c 10 "$file" | od -An -tx1 -v | tr -d ' \n')

  if [[ "$hex" != "$MAGIC_HEX" ]]; then
    echo "❌ PLAINTEXT DETECTED: $file" >&2
    echo "   This file must be committed as git-crypt ciphertext." >&2
    echo "   Fix: git-crypt unlock, then:" >&2
    echo "     git rm --cached '$file'" >&2
    echo "     git add '$file'" >&2
    echo "     git commit --amend" >&2
    echo "" >&2
    ERRORS=$((ERRORS + 1))
  fi
done < <(git ls-files 'jnoccio-fusion/')

# Verify .gitattributes still contains the git-crypt rule
if ! grep -q 'jnoccio-fusion/\*\* filter=git-crypt' .gitattributes 2>/dev/null; then
  echo "❌ .gitattributes is missing the git-crypt filter rule for jnoccio-fusion/**" >&2
  ERRORS=$((ERRORS + 1))
fi

# Verify .gitattributes has not had the diff=git-crypt rule stripped
if ! grep -q 'jnoccio-fusion/\*\* .*diff=git-crypt' .gitattributes 2>/dev/null; then
  echo "❌ .gitattributes is missing the diff=git-crypt rule for jnoccio-fusion/**" >&2
  ERRORS=$((ERRORS + 1))
fi

if [[ "$ERRORS" -gt 0 ]]; then
  echo "" >&2
  echo "🚫 $ERRORS problem(s) found during encryption verification." >&2
  echo "   Protected paths must be git-crypt ciphertext before merging." >&2
  exit 1
fi

echo "✅ All $CHECKED jnoccio-fusion file(s) are properly encrypted."
