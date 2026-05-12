# memory-benchmark — deterministic harness for advanced cognitive memory systems

Rust harness backing the two ZYAL runbooks at
`docs/ZYAL/examples/memory-benchmark/`.

Companion engineering doc: `docs/ADVANCED_MEMORY_CHALLENGE.md`.

## Design constraints

- **Zero external dependencies.** Stdlib only. Determinism, audit, and fast compile.
- **Deterministic by construction.** FNV-1a hashing (not `DefaultHasher`); sorted
  JSON keys; explicit byte-canonical encoding. Two consecutive runs of
  `bench --candidate X` must produce byte-identical output JSON.
- **100 deterministic fixtures.** Static `&'static [Fixture]` const array in
  `src/fixture/data.rs`. No I/O during fixture loading.
- **Pure-Rust scoring.** No LLM in the bench hot path. The graders in
  `src/scorer.rs` are pure functions over `RecallResult`.
- **Self-checking coverage.** `cargo test --release --lib` verifies every
  pathology tag appears in ≥ 3 fixtures and ≥ 25 (domain × pathology) cells
  are covered.

## Binaries

| Binary | Purpose |
|---|---|
| `bench` | Run all 100 fixtures against a candidate; emit JSON axis scores |
| `prompt_reduce` | Aggregate `MEMORY_BENCH_SCORE` lines from the prompt-scoring fan-out |
| `dump_tasks` | Generate deterministic task records for the fan-out shell command |
| `verify_determinism` | Run `bench` twice across all reference adapters; assert hash-equal output |
| `population_report` | Merge baseline + reference + candidate reports → final report |

## Candidates

| Candidate | Source | Target score |
|---|---|---|
| `baseline` | `src/adapters/baseline.rs` (naïve `Vec<Event>`) | 35–75 |
| `reference_context_pack` | `src/adapters/reference_context_pack.rs` (bitemporal ContextPack core) | 70–95 |
| `reference_evidence_ledger` | `src/adapters/reference_evidence_ledger.rs` (ReviewState-style modality fallback) | 70–95 |
| `reference_claim_skeptic` | `src/adapters/reference_claim_skeptic.rs` (aggressive contradiction surfacing) | 70–95 |
| `ledger_first` | `src/candidates/ledger_first.rs` (LLM-built lane stub) | variable |
| `hybrid_index` | `src/candidates/hybrid_index.rs` (LLM-built lane stub) | variable |
| `temporal_graph` | `src/candidates/temporal_graph.rs` (LLM-built lane stub) | variable |
| `compression_first` | `src/candidates/compression_first.rs` (LLM-built lane stub) | variable |
| `skeptic_dataset` | `src/candidates/skeptic_dataset.rs` (LLM-built lane stub) | variable |

## Quick start

```bash
# Build (zero deps; cold compile ~10–15 s)
cargo build --release

# Run the bench against the baseline (target [35, 75])
cargo run --release --bin bench -- --candidate baseline \
  --out target/memory-benchmark/baseline-score.json

# Run against the three reference adapters (target [70, 95])
for c in reference_context_pack reference_evidence_ledger reference_claim_skeptic; do
  cargo run --release --bin bench -- --candidate "$c" \
    --out target/memory-benchmark/"$c"-score.json
done

# Determinism check (runs all four reference candidates twice each)
cargo run --release --bin verify_determinism

# Run all tests (axis-level + adapter-level + coverage)
cargo test --release --lib

# Or use the repo-level Justfile route
just memory-benchmark-fast
```

## Adding a fixture

1. Append to the static array in `src/fixture/data.rs`. Bump `id`.
2. Set `pathologies: &[Pathology::XX, ...]` (1–3 tags).
3. Optionally set `requires_state_from: &[<id1>, <id2>]` for a compounding chain.
4. Author the `expected: Expected { ... }` ground truth.
5. Run `cargo test --release --lib` to confirm the coverage matrix still passes.

## Adding a candidate

1. New file under `src/adapters/` or `src/candidates/`.
2. `impl MemorySystem for YourThing { ... }`.
3. Register in `src/adapters/mod.rs` (or `src/candidates/mod.rs`) plus the
   dispatch table in `src/bin/bench.rs`.
4. `cargo test --release --bin bench -- --candidate <name>` should pass.

## Determinism contract

- Fixture order is `id`-sorted before iteration. Compounding predecessors are
  guaranteed run-before by ID sort.
- `RecallResult.context_pack_hash` is FNV-1a over the canonical bytes of the
  serialized RecallResult (sorted keys, no extra whitespace).
- The final `bench` output is a JSON object with keys ordered:
  `name, total, axes, fixtures[]`. Each fixture entry sorted by id.

Two consecutive `bench --candidate X` invocations are byte-identical. CI
enforces this via `verify_determinism`.

## Coverage gates

- 100 fixtures total.
- 25 ingest, 16 recall(current), 12 recall_at, 12 recall_as_of, 10 contradiction,
  10 procedural, 10 feedback, 5 determinism.
- 20+ fixtures with `requires_state_from.len() ≥ 1`.
- Every Pathology tag ≥ 3 fixtures.
- ≥ 25 of 50 (Domain × Pathology) cells covered.

These are checked by `cargo test --release --lib`. Failure means the fixture
set drifted from the published taxonomy in `docs/ADVANCED_MEMORY_CHALLENGE.md`.

## No-stale-identifier gate

`cargo test --release --lib` includes a stale-identifier guard that asserts no
source file drifts back to legacy provider/version-branded benchmark names.
