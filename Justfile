# jankurai scaffold Justfile

default: fast

# fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration.
fast:
	bun typecheck &
	bun --cwd packages/jekko test test/keybind.test.ts test/ide/ide.test.ts
	wait

# Narrow lane for workspace typecheck-only feedback.
typecheck-fast:
	bun typecheck

# Narrow lane for package builds that can reuse Turbo cache metadata.
build-fast:
	bun turbo build --filter=@jekko-ai/plugin --filter=@jekko-ai/sdk

# Narrow lane for core package behavior checks.
core-test:
	bun --cwd packages/core test

# Narrow lane for package-level typechecks.
plugin-typecheck:
	bun --cwd packages/plugin typecheck

sdk-typecheck:
	bun --cwd packages/sdk/js typecheck

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

check: fast doctor score security
