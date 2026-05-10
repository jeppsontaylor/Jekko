# jankurai scaffold Justfile

default: fast

export TURBO_CACHE_DIR := ".turbo"

# fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
fast: workspace-fast

# Workspace-wide fast lane composed from narrow proof targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
workspace-fast: typecheck-fast build-fast fusion-check-fast core-test-fast jekko-test-fast

# Narrow lane for workspace typecheck-only feedback.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
typecheck-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel typecheck --filter=@jekko-ai/core --filter=@jekko-ai/plugin --filter=@jekko-ai/sdk --filter=jekko

# Narrow lane for package builds that can reuse Turbo cache metadata.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
build-fast: plugin-build-fast sdk-build-fast core-build-fast jekko-build-fast

# Narrow lane for the jnoccio-fusion Rust crate compile path.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
fusion-check-fast:
	cargo check --manifest-path jnoccio-fusion/Cargo.toml --locked --all-targets

# Narrow lane for the jnoccio-fusion Rust crate test compile path.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
fusion-test-fast:
	cargo test --manifest-path jnoccio-fusion/Cargo.toml --locked --no-fail-fast

# Narrow lane for the jnoccio-fusion Rust crate build path.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
fusion-build-fast:
	cargo build --manifest-path jnoccio-fusion/Cargo.toml --locked

# Narrow lane for the plugin package build only.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
plugin-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=@jekko-ai/plugin

# Narrow lane for the SDK package build only.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
sdk-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=@jekko-ai/sdk

# Narrow lane for the core package build only.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
core-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=@jekko-ai/core

# Narrow lane for the core package typecheck only.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
core-typecheck-fast:
	bun --cwd packages/core typecheck

# Narrow lane for core package behavior checks.
core-test:
	bun --cwd packages/core test

# Narrow lane for core package behavior checks with an explicit fast alias.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
core-test-fast:
	bun --cwd packages/core test

# Narrow lane for the main Jekko package typecheck.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
jekko-typecheck-fast:
	bun --cwd packages/jekko typecheck

# Narrow lane for the main Jekko package behavior checks.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
jekko-test-fast:
	bun --cwd packages/jekko test test/keybind.test.ts test/ide/ide.test.ts

# Narrow lane for the main Jekko package build.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
jekko-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=jekko

# Narrow lane for package-level typechecks.
plugin-typecheck:
	bun --cwd packages/plugin typecheck

# Narrow lane for plugin package typechecks with an explicit fast alias.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
plugin-typecheck-fast:
	bun --cwd packages/plugin typecheck

sdk-typecheck:
	bun --cwd packages/sdk/js typecheck

# Narrow lane for SDK package typechecks with an explicit fast alias.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=background-jobs-wait cache=turbo-build narrow-targets=true
sdk-typecheck-fast:
	bun --cwd packages/sdk/js typecheck

# Deterministic workspace build lane with caching.
build:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw build

# Deterministic workspace test lane with parallel features.
test:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw test:ci

# Incremental check for faster feedback during development.
check-dev: typecheck-fast

# Run only critical pure tests for fast iteration.
test-fast: jekko-test-fast

# Build workspace outputs for reference.
docs:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw build

score:
	jankurai audit . --mode advisory --json agent/repo-score.json --md agent/repo-score.md --score-history agent/score-history.jsonl --score-history-csv agent/score-history.csv

doctor:
	jankurai doctor --fail-on high

security:
	bash tools/security-lane.sh

check: fast doctor score security

# Rendered TUI component proof lane for HLT-013-RENDERED-UX-GAP evidence.
ux-qa:
	bun --cwd packages/jekko test test/cli/tui/ test/cli/cmd/tui/
