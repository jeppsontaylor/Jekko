# jankurai scaffold Justfile

default: fast

# fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration.
fast: check-dev test-fast
	jankurai doctor --fail-on critical

# Deterministic workspace build lane with caching.
build:
	bun turbo build

# Deterministic workspace test lane with parallel features.
test:
	bun turbo test:ci

# Incremental check for faster feedback during development.
check-dev:
	bun typecheck

# Run only critical pure tests for fast iteration.
test-fast:
	bun --cwd packages/jekko test test/keybind.test.ts test/ide/ide.test.ts

# Build workspace outputs for reference.
docs:
	bun turbo build

score:
	jankurai audit . --mode advisory --json agent/repo-score.json --md agent/repo-score.md --score-history agent/score-history.jsonl --score-history-csv agent/score-history.csv

doctor:
	jankurai doctor --fail-on high

security:
	jankurai security run . --out target/jankurai/security/evidence.json

check: fast score security
