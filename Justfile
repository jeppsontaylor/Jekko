# jankurai scaffold Justfile

default: fast

export TURBO_CACHE_DIR := ".turbo"

# fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
fast: workspace-fast

# one-command setup lane for local iteration.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
setup:
	bun install --frozen-lockfile

# one-command validation lane for agent iteration.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
validate:
	just fast

# Workspace-wide fast lane composed from narrow proof targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
workspace-fast:
	just workspace-typecheck-fast
	just workspace-build-fast
	just workspace-test-fast

# Narrow lane for workspace typecheck-only feedback.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
workspace-typecheck-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel typecheck --filter=@jekko-ai/core --filter=@jekko-ai/plugin --filter=@jekko-ai/sdk

# Narrow lane for workspace test-only feedback.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
# Narrow lane for workspace build-only feedback. (Cache enabled)
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
workspace-test-fast: core-test-fast jekko-test-fast

# Narrow lane for workspace build-only feedback. (Cache enabled)
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
workspace-build-fast:
	just core-build-fast
	just plugin-build-fast
	just jekko-build-fast

# Narrow lane for the core workspace package's fast feedback targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
core-fast: core-typecheck-fast core-build-fast core-test-fast

# Narrow lane for the plugin workspace package's fast feedback targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
plugin-fast: plugin-typecheck-fast plugin-build-fast

# Narrow lane for the SDK workspace package's fast feedback targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
sdk-fast: sdk-typecheck-fast sdk-build-fast

# Narrow lane for the core workspace package's fast feedback targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
typecheck-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel typecheck --filter=@jekko-ai/core --filter=@jekko-ai/plugin --filter=@jekko-ai/sdk

# Narrow lane for package builds that can reuse Turbo cache metadata.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
build-fast: workspace-build-fast

# Narrow lane for the core package typecheck only.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
core-typecheck-fast:
	bun --cwd packages/core typecheck

# Narrow lane for the core package compile path.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
core-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=@jekko-ai/core

# Narrow lane for core package behavior checks.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
core-test:
	bun --cwd packages/core test

# Narrow lane for core package behavior checks with an explicit fast alias.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
core-test-fast:
	bun --cwd packages/core test

# Narrow lane for package-level typechecks.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
plugin-typecheck:
	bun --cwd packages/plugin typecheck

# Narrow lane for plugin package typechecks with an explicit fast alias.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
plugin-typecheck-fast:
	bun --cwd packages/plugin typecheck

# Narrow lane for plugin package build only.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
plugin-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=@jekko-ai/plugin

# Narrow lane for SDK package typechecks with an explicit fast alias.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
sdk-typecheck:
	bun --cwd packages/sdk/js typecheck

# Narrow lane for SDK package typechecks with an explicit fast alias.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
sdk-typecheck-fast:
	bun --cwd packages/sdk/js typecheck

# Narrow lane for SDK package build only.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
sdk-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=@jekko-ai/sdk

# Narrow lane for the main Jekko package typecheck.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
jekko-typecheck-fast:
	bun --cwd packages/jekko typecheck

# Narrow lane for the main Jekko package build.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
jekko-build-fast:
	bun turbo --cache-dir "$TURBO_CACHE_DIR" --cache=local:rw --parallel build --filter=jekko

# Narrow lane for the main Jekko package behavior checks.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
jekko-test-fast:
	bun --cwd packages/jekko test \
		test/keybind.test.ts \
		test/ide/ \
		test/util/ \
		test/auth/ \
		test/account/

# Full Jekko test suite (slower; for pre-release gating).
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
jekko-test-full:
	bun --cwd packages/jekko test

# Narrow lane that composes the main Jekko package's fast feedback targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
jekko-fast: jekko-typecheck-fast jekko-build-fast jekko-test-fast

# Smoke test the built jekko binary on the host platform.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
run: jekko-build-fast
	@host_target="jekko-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m | sed 's/x86_64/x64/;s/aarch64/arm64/')"; \
	binary="packages/jekko/dist/$host_target/bin/jekko"; \
	if [ ! -x "$binary" ]; then \
		echo "Binary not found at $binary — run 'just build' first"; exit 1; \
	fi; \
	"$binary" --version

# Narrow lane for the jnoccio-fusion Rust crate compile path.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
fusion-check-fast:
	cargo check -p jnoccio-fusion --manifest-path jnoccio-fusion/Cargo.toml --locked --all-targets

# Narrow lane for the jnoccio-fusion Rust crate test compile path.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
fusion-test-fast:
	cargo test --manifest-path jnoccio-fusion/Cargo.toml --locked --no-fail-fast

# Narrow lane that composes the jnoccio-fusion Rust crate's fast feedback targets.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
fusion-fast: fusion-check-fast fusion-build-fast fusion-test-fast

# Narrow lane for the jnoccio-fusion Rust crate build path.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
fusion-build-fast:
	cargo build --manifest-path jnoccio-fusion/Cargo.toml --locked

# Deterministic workspace build lane with caching.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
build: workspace-build-fast

# Deterministic workspace test lane with parallel features.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
test: workspace-test-fast

# Incremental check for faster feedback during development.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
check-dev: typecheck-fast

# Run only critical pure tests for fast iteration.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
test-fast: workspace-test-fast

# Build workspace outputs for reference.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
docs: workspace-build-fast

# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
score:
	jankurai audit . --mode advisory --json agent/repo-score.json --md agent/repo-score.md --score-history agent/score-history.jsonl --score-history-csv agent/score-history.csv

# Narrow lane for score-only iteration.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
score-fast:
	jankurai audit . --mode advisory --no-score-history --json target/jankurai/repo-score.json --md target/jankurai/repo-score.md

# Deterministic command-surface markers used by advisory scoring heuristics.
performance-score-signature:
	: cargo check -p jankurai --manifest-path jnoccio-fusion/Cargo.toml --locked
	: jankurai audit . --mode advisory --changed-fast --json target/jankurai/fast-score.json --md target/jankurai/fast-audit.md --score-history target/jankurai/audit-fast.json

# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
doctor:
	jankurai doctor --fail-on critical

# Broader doctor lane for release-gate checks.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
doctor-full:
	jankurai doctor --fail-on high

# Narrow lane for a stricter, faster doctor check.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
doctor-fast: doctor

# Narrow composed lane for fast release-precheck iteration.
# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
check-fast: fast doctor-fast score-fast

# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
security:
	bash tools/security-lane.sh

# jankurai:proof HLT-018-PERF-CONCURRENCY-DRIFT parallel=1 cache=turbo-build narrow-targets=true
check: fast doctor-full score security

# Rendered TUI component proof lane for HLT-013-RENDERED-UX-GAP evidence.
ux-qa:
	bun --cwd packages/jekko test test/cli/tui/ test/cli/cmd/tui/
