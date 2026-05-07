# jankurai scaffold Justfile

default: fast

# fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration.
fast:
	jankurai doctor --fail-on critical

# Deterministic workspace build lane with caching.
build:
	cargo build --locked --workspace --target-cpu=native

# Deterministic workspace test lane with parallel features.
test:
	cargo test --locked --workspace --all-features --jobs 4

# Incremental check for faster feedback during development.
check-dev:
	cargo check --locked --workspace --all-features

# Run only critical tests for fast iteration.
test-fast:
	cargo test --locked --workspace --all-features -- --skip integration

# Build documentation for reference.
docs:
	cargo doc --locked --workspace

score:
	jankurai audit . --mode advisory --json agent/repo-score.json --md agent/repo-score.md --score-history agent/score-history.jsonl --score-history-csv agent/score-history.csv

doctor:
	jankurai doctor --fail-on high

security:
	jankurai security run . --out target/jankurai/security/evidence.json

check: fast score security
