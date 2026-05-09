# jankurai Repo Score

- Standard: `jankurai`
- Auditor: `0.8.11`
- Schema: `1.6.0`
- Paper edition: `2026.05-ed8`
- Target stack ID: `rust-ts-vite-react-postgres-bounded-python`
- Target stack: `Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service`
- Repo: `.`
- Run ID: `1778327915`
- Started at: `1778327915`
- Elapsed: `17880` ms
- Scope: `full`
- Raw score: `75`
- Final score: `60`
- Decision: `advisory`
- Minimum score: `85`
- Caps applied: `non-optimal-product-language-found, vibe-placeholders-in-product-code, fallback-soup-in-product-code, future-hostile-dead-language-in-product-code, severe-duplication-in-product-code, generated-zone-mutation-risk, secret-like-content-detected, false-green-test-risk, input-boundary-gap, missing-rust-property-or-integration-tests, sql-bad-behavior, typescript-bad-behavior, ci-bad-behavior, repo-rot-bad-behavior`

## Hard Rule Caps

| Rule | Max Score | Applied |
| --- | ---: | --- |
| `no-root-agent-instructions` | 75 | no |
| `no-one-command-setup-or-validation` | 70 | no |
| `no-deterministic-fast-lane` | 65 | no |
| `no-security-lane-on-high-risk-repo` | 60 | no |
| `generated-contracts-or-public-api-drift-untested` | 80 | no |
| `python-direct-product-truth-or-db-ownership` | 72 | no |
| `no-secret-or-dependency-scanning-in-ci` | 78 | no |
| `no-jankurai-audit-lane-in-ci` | 82 | no |
| `jankurai-required-tool-ci-evidence-gap` | 88 | no |
| `non-optimal-product-language-found` | 74 | yes |
| `too-much-python-in-product-surface` | 72 | no |
| `boundary-reclassification-evidence-gap` | 72 | no |
| `vibe-placeholders-in-product-code` | 68 | yes |
| `fallback-soup-in-product-code` | 70 | yes |
| `future-hostile-dead-language-in-product-code` | 64 | yes |
| `severe-duplication-in-product-code` | 70 | yes |
| `generated-zone-mutation-risk` | 76 | yes |
| `direct-db-access-from-wrong-layer` | 66 | no |
| `missing-web-e2e-lane` | 82 | no |
| `missing-rendered-ux-qa-lane` | 84 | no |
| `prompt-injection-risk` | 78 | no |
| `overbroad-agent-agency` | 65 | no |
| `secret-like-content-detected` | 60 | yes |
| `false-green-test-risk` | 76 | yes |
| `destructive-migration-risk` | 70 | no |
| `authz-or-data-isolation-gap` | 78 | no |
| `input-boundary-gap` | 78 | yes |
| `agent-tool-supply-chain-gap` | 78 | no |
| `release-readiness-gap` | 80 | no |
| `missing-rust-property-or-integration-tests` | 82 | yes |
| `no-agent-friendly-exception-pattern` | 76 | no |
| `missing-agent-readable-docs` | 80 | no |
| `streaming-runtime-drift` | 78 | no |
| `rust-bad-behavior` | 72 | no |
| `sql-bad-behavior` | 72 | yes |
| `typescript-bad-behavior` | 72 | yes |
| `docker-bad-behavior` | 72 | no |
| `python-bad-behavior` | 72 | no |
| `ci-bad-behavior` | 70 | yes |
| `git-bad-behavior` | 70 | no |
| `gittools-bad-behavior` | 70 | no |
| `release-bad-behavior` | 70 | no |
| `web-security-bad-behavior` | 68 | no |
| `repo-rot-bad-behavior` | 88 | yes |

## Dimensions

| Dimension | Weight | Score | Weighted | Evidence |
| --- | ---: | ---: | ---: | --- |
| Ownership and navigation surface | 13 | 100 | 13.00 | root `AGENTS.md` present; `CODEOWNERS` present |
| Contract and boundary integrity | 13 | 98 | 12.74 | contract surface found; generated contract artifacts found |
| Proof lanes and test routing | 12 | 82 | 9.84 | one-command setup/validation lane found; deterministic fast lane found |
| Security and supply-chain posture | 12 | 72 | 8.64 | lockfile present; secret or dependency scan tooling found |
| Code shape and semantic surface | 12 | 0 | 0.00 | largest authored code file: packages/jekko/test/session/compaction.test.ts (2198 LOC); code file exceeds 500 LOC |
| Data truth and workflow safety | 8 | 95 | 7.60 | database surface present; structured db boundary manifest present |
| Observability and repair evidence | 8 | 88 | 7.04 | observability libraries or patterns found; ops/observability directory present |
| Context economy and agent instructions | 7 | 100 | 7.00 | root `AGENTS.md` present; root `AGENTS.md` stays short |
| Jankurai tool adoption and CI replacement | 7 | 35 | 2.45 | control-plane files present; applicable=16 |
| Python containment and polyglot hygiene | 4 | 90 | 3.60 | no Python files in scope; non-optimal product language marker |
| Build speed signals | 4 | 70 | 2.80 | build acceleration markers found; targeted test/build commands found |

## Reference Profile Structure

- Applicable cells: `8` canonical=`8` noncanonical=`0` guidance missing=`0`

| Cell | Status | Canonical | Detected | Aliases | Guidance | Owner | Proof lane | Agent fix |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `web` | `not_applicable` | `apps/web/` | `-` | `frontend/, ui/, packages/web/, packages/ui/` | `not_required` | `apps/web` | `rendered UX / Playwright` | `no action` |
| `api` | `not_applicable` | `apps/api/` | `-` | `api/, server/, backend/` | `not_required` | `apps/api` | `edge handler / contract tests` | `no action` |
| `domain` | `canonical` | `crates/domain/` | `crates/domain` | `domain/, core/` | `present` | `crates/domain` | `unit / property tests` | `keep `crates/domain/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `application` | `canonical` | `crates/application/` | `crates/application` | `application/, usecases/, use-cases/` | `present` | `crates/application` | `use-case / authz tests` | `keep `crates/application/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `adapters` | `canonical` | `crates/adapters/` | `crates/adapters` | `adapters/, infra/, integrations/` | `present` | `crates/adapters` | `adapter integration tests` | `keep `crates/adapters/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `workers` | `canonical` | `crates/workers/` | `crates/workers` | `workers/, jobs/, scheduler/, queue/` | `present` | `crates/workers` | `workflow / replay tests` | `keep `crates/workers/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `contracts` | `canonical` | `contracts/` | `contracts` | `openapi/, protobuf/, json-schema/, generated/` | `present` | `contracts` | `generation / drift checks` | `keep `contracts/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `db` | `canonical` | `db/` | `db` | `migrations/, constraints/, sql/` | `present` | `db` | `migration / constraint tests` | `keep `db/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `python-ai` | `canonical` | `python/ai-service/` | `python, python/ai-service` | `python/, ai-service/, evals/, embeddings/, model/` | `present` | `python/ai-service` | `eval / contract tests` | `keep `python/ai-service/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `ops` | `canonical` | `ops/` | `.github, .github/workflows, ops` | `.github/, .github/workflows/, ci/, release/, observability/, security/` | `present` | `ops` | `security lane / workflow lint` | `keep `ops/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |

## Rendered UX QA

- Web surface: `true`
- Layered UX lane: `true`
- Missing: `none`

## Tool Adoption

- Control plane present: `true`
- Applicable tools: `16`
- Configured: `6`
- CI evidence: `4`
- Artifact verified: `4`
- Replaced count: `4`
- Missing CI evidence: `audit-ci, proof-routing, proofbind, ci-bad-behavior, git-bad-behavior, release-bad-behavior, contract-drift, authz-matrix, input-boundary, agent-tool-supply, release-readiness, cost-budget`

| Tool | Category | Mode | Status | Replaced | Artifacts |
| --- | --- | --- | --- | --- | --- |
| `audit-ci` | `audit` | `auto` | `configured` | `manual repo scoring, ad hoc score gates` | `agent/repo-score.json, agent/repo-score.md` |
| `proof-routing` | `proof` | `auto` | `configured` | `ad hoc proof lane selection, manual proof receipts` | `agent/repo-score.json, agent/repo-score.md, target/jankurai/repair-queue.jsonl` |
| `proofbind` | `proof` | `auto` | `missing` | `manual changed-surface routing, ad hoc proof obligation lists` | `target/jankurai/proofbind/surface-witness.json, target/jankurai/proofbind/obligations.json` |
| `proofmark-rust` | `proof` | `auto` | `artifact_verified` | `line-only coverage review, manual in-diff mutation review` | `target/jankurai/proofmark/proofmark-receipt.json, target/jankurai/proofmark/proof-receipt.json` |
| `security` | `security` | `auto` | `artifact_verified` | `gitleaks, dependency review, SBOM/provenance` | `target/jankurai/security/evidence.json` |
| `ci-bad-behavior` | `security` | `auto` | `missing` | `mutable workflow refs, secret echo/debug workflow checks, non-blocking security scans` | `target/jankurai/language-bad-behavior.log` |
| `git-bad-behavior` | `audit` | `auto` | `missing` | `destructive git automation, force-push release scripts, hidden stash-based state` | `target/jankurai/language-bad-behavior.log` |
| `release-bad-behavior` | `release` | `auto` | `missing` | `manual release checklist, ad hoc tag and artifact review, manual provenance review` | `target/jankurai/language-bad-behavior.log` |
| `ux-qa` | `ux` | `auto` | `artifact_verified` | `playwright, axe-core, visual baselines` | `target/jankurai/ux-qa.json` |
| `db-migration-analyze` | `db` | `auto` | `not_applicable` | `manual migration review` | `target/jankurai/migration-report.json` |
| `contract-drift` | `contract` | `auto` | `configured` | `handwritten contract drift checks, openapi diff` | `agent/repo-score.json, agent/repo-score.md` |
| `rust-witness` | `rust` | `auto` | `artifact_verified` | `manual witness graphing` | `target/jankurai/rust/witness-graph.json` |
| `vibe-coverage` | `audit` | `auto` | `not_applicable` | `manual vibe-coding coverage spreadsheet` | `target/jankurai/vibe-coverage.json, target/jankurai/vibe-coverage.md` |
| `authz-matrix` | `security` | `auto` | `missing` | `manual authz matrix review` | `agent/repo-score.json, agent/repo-score.md` |
| `input-boundary` | `security` | `auto` | `missing` | `manual unsafe sink review` | `agent/repo-score.json, agent/repo-score.md` |
| `agent-tool-supply` | `security` | `auto` | `missing` | `manual MCP/tool trust review` | `agent/repo-score.json, agent/repo-score.md` |
| `release-readiness` | `release` | `auto` | `missing` | `manual launch checklist` | `agent/repo-score.json, agent/repo-score.md` |
| `cost-budget` | `release` | `auto` | `missing` | `manual spend review` | `agent/repo-score.json, agent/repo-score.md` |

## Security evidence (ingested)

- Source: `target/jankurai/security/evidence.json`
- Envelope exit code: `0` · elapsed: `14` ms · strict: `false`
- Commands — ran: `1`, skipped: `0`, failed: `0`
- Generated at: `1778327422`
- Git HEAD (envelope): `d19b02b20967c113aa2b39d5b7414a4377235425`

## Boundary manifest (ingested)

- Path: `agent/boundaries.toml`
- Stack: `rust-ts-vite-react-postgres-bounded-python` · version: `0.4.0`
- Queue path counts — adapter: `2`, event_contract: `0`, generated_type: `1`, client_marker: `7`, streaming_exception: `1`
- Content fingerprint: `sha256:a9130f30b09a9ed501843eb78e23d6fca84816f176ec373b156b330d1917db8d`

## Boundary Reclassifications

No audited runtime boundary reclassifications declared.

## Findings

1. `medium` `shape` `.`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:shape` `soft` confidence `0.76`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: `Code shape and semantic surface` scored 0 below the standard floor of 85
   Fix: split large or ambiguous authored code into smaller semantic modules with focused tests
   Rerun: `just fast`
   Fingerprint: `sha256:38a9f7d956ac8511198538a5576aa28c83b137f84f47796e6509f33fc6a1a180`
   Evidence: largest authored code file: packages/jekko/test/session/compaction.test.ts (2198 LOC), code file exceeds 500 LOC, code file exceeds 1000 LOC, most code files stay under 300 LOC
2. `high` `security` `.github/workflows/check-encrypted-paths.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:541fbf4b23821a0b9cbf4e6c985fa7344558d5efe223d803b9ae0bf7e3ca02a6`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/check-encrypted-paths.yml, line=1, proof_window=None, snippet=name: check-encrypted-paths
3. `high` `security` `.github/workflows/check-encrypted-paths.yml:24`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:d0791a3b403331eec3f2386768007a4ece3663d63bf3cc9fe68c94d44c9d69e1`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/check-encrypted-paths.yml, line=24, proof_window=None, snippet=uses: actions/checkout@v4
4. `medium` `security` `.github/workflows/jankurai.yml`
   Rule: `HLT-016-SUPPLY-CHAIN-DRIFT`
   Check: `HLT-016-SUPPLY-CHAIN-DRIFT:security` `soft` confidence `0.76`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: `Security and supply-chain posture` scored 72 below the standard floor of 85
   Fix: wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Rerun: `just security`
   Fingerprint: `sha256:da221881fae691071bddc454109bed0998c48e6a9f99ee7c2e61538c8340a5d8`
   Evidence: lockfile present, secret or dependency scan tooling found, provenance/SBOM tooling found, security lane present
5. `high` `security` `.github/workflows/jekko.yml:34`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:b343ceb27323859d2fa52d5aefcbbae3b0328619fc0e68c397ee69e2c8ee46a2`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/jekko.yml, line=34, proof_window=None, snippet=uses: anomalyco/jekko/github@v1.0.220
6. `high` `security` `.github/workflows/pr-standards.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:15d6b9864df0e541dd419e302cd58312e408bdd53ac8c85f5d3473cc63570ff3`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/pr-standards.yml, line=1, proof_window=None, snippet=name: pr-standards
7. `high` `security` `.github/workflows/publish.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:2a958f040bb76c4d640c0753b05894e876ee8e064e57c8461755edf5c089a5ae`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/publish.yml, line=1, proof_window=None, snippet=name: publish
8. `high` `security` `.github/workflows/publish.yml:98`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:970a10ed076b932ab80fc577b6acadfc268eb22de44dfc31149ca00c279a787c`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=98, proof_window=None, snippet=- uses: actions/upload-artifact@v4
9. `high` `security` `.github/workflows/publish.yml:105`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:d84ff3c9998219f3ed505ddaeaca0bad4df9a6517bb90c748d44d9c9da7a71b5`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=105, proof_window=None, snippet=- uses: actions/upload-artifact@v4
10. `high` `security` `.github/workflows/publish.yml:128`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:76310ec94f3bd193c71181e70c558c87a3b02a1c04813ed1f4e9d86e85f83d15`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=128, proof_window=None, snippet=- uses: actions/download-artifact@v4
11. `high` `security` `.github/workflows/publish.yml:141`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:e0c6ec145290e09ae349543bab3dd57cb2003da2e83363a519974339c3d8a5ef`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=141, proof_window=None, snippet=uses: azure/login@v2
12. `high` `security` `.github/workflows/publish.yml:147`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:950e00e9998b66da67dd58f18dcd53dfd73a5218842f76f3049149cd0d787fe4`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=147, proof_window=None, snippet=- uses: azure/artifact-signing-action@v1
13. `high` `security` `.github/workflows/publish.yml:203`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:176b33d631beac47bc1b10e805b2373cfacb9be65d694d855a97bd764ce46caf`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=203, proof_window=None, snippet=- uses: actions/upload-artifact@v4
14. `high` `security` `.github/workflows/publish.yml:220`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:1cad286ee3f72495e8857aa6aad3fe924ba053fe0351d1ab4bbd1024e3f2e121`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=220, proof_window=None, snippet=- uses: actions/checkout@v3
15. `high` `security` `.github/workflows/publish.yml:225`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:377497341b15612e61732ef088fd6d07eed0583c51a10a3b4ab85852a2a624c0`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=225, proof_window=None, snippet=uses: docker/login-action@v3
16. `high` `security` `.github/workflows/publish.yml:232`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:984a15d8bc578929a61c1082e5afc9fff551062329235f9512c248979f5e9ca4`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=232, proof_window=None, snippet=uses: docker/setup-qemu-action@v3
17. `high` `security` `.github/workflows/publish.yml:235`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:6e74216b9c7fc170e2b6e0f3baf9c836dfdcd896da0d27062cf963542bdaf241`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=235, proof_window=None, snippet=uses: docker/setup-buildx-action@v3
18. `high` `security` `.github/workflows/publish.yml:237`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:9802c1a0b274851e21d6b30b6990ab1da6cff97763b253874af2b5d21ba193b3`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=237, proof_window=None, snippet=- uses: actions/setup-node@v4
19. `high` `security` `.github/workflows/publish.yml:242`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:c291130ba0d0067212f9fefca31df029ab49cc376d882561e12d2038df7e8e08`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=242, proof_window=None, snippet=- uses: actions/download-artifact@v4
20. `high` `security` `.github/workflows/publish.yml:247`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:ea94cbb55b7939e1b9f56d2e593837a0b120966252ae90308d1b093c31676862`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=247, proof_window=None, snippet=- uses: actions/download-artifact@v4
21. `high` `security` `.github/workflows/publish.yml:252`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:eeb598e875f4a1912222ba38f804136970048e4e201bb1ce29a4e1473c759ac7`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=252, proof_window=None, snippet=- uses: actions/download-artifact@v4
22. `high` `security` `.github/workflows/publish.yml:266`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:006542ca48fe608964daf794ec418e2476ac99cdf670be53d6c31008352fb635`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=266, proof_window=None, snippet=uses: actions/cache@v4
23. `high` `security` `.github/workflows/publish.yml:281`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.secret.echo-or-debug`
   Reason: secret-bearing workflow step writes sensitive values to logs
   Fix: never echo secrets; pass them directly to trusted binaries and keep shell tracing off
   Rerun: `just security`
   Fingerprint: `sha256:a36a645957a8c334256ac5806cf262e9d4993707af21b5700367589b635a62ff`
   Evidence: detector=ci.secret.echo-or-debug, path=.github/workflows/publish.yml, line=281, proof_window=None, snippet=echo "${{ secrets.AUR_KEY }}" > "$AUR_SSH_KEY"
24. `high` `security` `.github/workflows/review.yml:37`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.mutable-ref`
   Reason: action ref can change without review
   Fix: pin the action to a commit SHA or stable release tag
   Rerun: `just security`
   Fingerprint: `sha256:b305db20e942568c39a390155e9815a7c50e4eb50cec71c6c64221e74d8989e6`
   Evidence: detector=ci.action.mutable-ref, path=.github/workflows/review.yml, line=37, proof_window=None, snippet=- uses: ./.github/actions/setup-bun@main
25. `high` `security` `.github/workflows/review.yml:37`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:9df38fdb10af16599d54d4ae774d8d1da4b4d1acfc515fa43d9fadbaf1b84c87`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/review.yml, line=37, proof_window=None, snippet=- uses: ./.github/actions/setup-bun@main
26. `high` `security` `.github/workflows/stats.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:ef174017b67b59504a073697e9eba39281cf651cb919cef8e5cc773ad73fa2f3`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/stats.yml, line=1, proof_window=None, snippet=name: stats
27. `high` `security` `.github/workflows/stats.yml:19`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:014304386ed4aa7d18f28edadff266b549446ebd6e11d8ae9e280b71e84caef1`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/stats.yml, line=19, proof_window=None, snippet=uses: actions/checkout@v4
28. `high` `security` `.github/workflows/test.yml:44`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:f7aa60e6b74f364622fc28e8f61c7bc6c664dafcf87a25c57be99275bfbc5589`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/test.yml, line=44, proof_window=None, snippet=uses: actions/setup-node@v4
29. `high` `security` `.github/workflows/test.yml:57`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:2b65bfd3cacf3d74704ff1b19549223fa55a616bedb0dda688a611f9b0fab178`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/test.yml, line=57, proof_window=None, snippet=uses: actions/cache@v4
30. `high` `security` `.github/workflows/test.yml:72`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:d03031d1781268cba5748e06d62dac5833a8f6819e8e1a92073dc66113d4b89e`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/test.yml, line=72, proof_window=None, snippet=uses: mikepenz/action-junit-report@v6
31. `high` `security` `.github/workflows/test.yml:82`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:856be547b6a4ea0e69ea15e14580e5cbb0d2db4090613dc7191e293165cdfaf0`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/test.yml, line=82, proof_window=None, snippet=uses: actions/upload-artifact@v4
32. `high` `security` `.github/workflows/typecheck.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:c8436f86e9370c5a1c31ebb8da9b974738c0d5aeee14f4ae2e54625cc53536bf`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/typecheck.yml, line=1, proof_window=None, snippet=name: typecheck
33. `high` `security` `.github/workflows/typecheck.yml:22`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:5bdc15761599dff906c2fe791e671271ad4bfebdfbb6ed23326b708a5cbefbc2`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/typecheck.yml, line=22, proof_window=None, snippet=uses: actions/checkout@v4
34. `high` `boundary` `.jekko/plugins/tui-smoke.tsx:846`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:f65f3a4dd8999921c5c266f6d6e0126ca565ecb2d53c2bd39a46901c00387308`
   Evidence: detector=typescript.security.raw-command-sql, path=.jekko/plugins/tui-smoke.tsx, line=846, snippet=title: `${input.label} select dialog`,
35. `high` `security` `.jekko/plugins/tui-smoke.tsx:846`
   Rule: `HLT-023-INPUT-BOUNDARY-GAP`
   Check: `HLT-023-INPUT-BOUNDARY-GAP:security` `hard` confidence `0.88`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Matched term: `string sql`
   Reason: input handling risk needs deterministic negative tests
   Fix: replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Rerun: `just security`
   Fingerprint: `sha256:1436350e8988a71cb92219bcdab68faeac0b79721dc32c481a003a050b3bb5fc`
   Evidence: title: `${input.label} select dialog`,
36. `medium` `proof` `Justfile`
   Rule: `HLT-018-PERF-CONCURRENCY-DRIFT`
   Check: `HLT-018-PERF-CONCURRENCY-DRIFT:proof` `soft` confidence `0.76`
   Route: TLR `Verification`, lane `fast`, owner `workspace`
   Docs: `docs/testing.md`
   Reason: `Build speed signals` scored 70 below the standard floor of 85
   Fix: add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Rerun: `just fast`
   Fingerprint: `sha256:a256a7390d4b91a5b0a95d6f092e524c8f4080f27fe2b62e28cf0801343d0fef`
   Evidence: build acceleration markers found, targeted test/build commands found, locked dependency graph present, CI cache hint found
37. `high` `audit` `agent/owner-map.json:1`
   Rule: `HLT-017-OPAQUE-OBSERVABILITY`
   Check: `HLT-017-OPAQUE-OBSERVABILITY:audit` `hard` confidence `0.88`
   Route: TLR `Repair`, lane `observability`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#repair-receipts`
   Reason: jankurai manifest could not be parsed
   Fix: fix the manifest syntax so audit policy and routing maps are authoritative
   Rerun: `just score`
   Fingerprint: `sha256:ec84a3ecc0e4081167b9d23bfacad10524a63ea9755f75d602f98db6645f469c`
   Evidence: trailing characters at line 70 column 1
38. `medium` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `soft` confidence `0.76`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: `Proof lanes and test routing` scored 82 below the standard floor of 85
   Fix: route each owned path to a deterministic proof command and make the lane executable in CI
   Rerun: `just fast`
   Fingerprint: `sha256:bdf3cadf95ed85807c79fc4819b124bb6247736f25877aa8f0846f94a0f62bb5`
   Evidence: one-command setup/validation lane found, deterministic fast lane found, GitHub workflow files present, test/proof routing map present
39. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.gitattributes` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:5685ed57c4e04c23e7f38d6f58088747659a19ca2aeab855f958d680acaa8819`
   Evidence: .gitattributes
40. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.husky/check-encrypted-paths` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:d35172328b5fd9b080095b3e892a12782480b89b51c6caac4e6472e46bb559df`
   Evidence: .husky/check-encrypted-paths
41. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.jekko/daemon/01KR672V7AJBS94YYTH5JDMJNW/STATE.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:a3db3deac7a919ad09f4c582c6a9e7aab265d4a51b4be8fd8a6963d09cf68364`
   Evidence: .jekko/daemon/01KR672V7AJBS94YYTH5JDMJNW/STATE.md
42. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.jekko/daemon/01KR672V7AJBS94YYTH5JDMJNW/ledger.jsonl` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:17548236b87b084109efa0c895f34f02a5f9731259e0bd29ad2306410683e692`
   Evidence: .jekko/daemon/01KR672V7AJBS94YYTH5JDMJNW/ledger.jsonl
43. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.oxlintrc.json` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:6184550d1f7eb9951a12b6eb6d56d3b412ed222ec57c2d3a59140c808f5db00c`
   Evidence: .oxlintrc.json
44. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `DO_NOT_ASK_ZYAL.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:94e3f356da1a3f2bc0061538410f7f2eb207b8c45accb3f0f1de8984b791eb29`
   Evidence: DO_NOT_ASK_ZYAL.md
45. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `SESSION_SCOPED_ZYAL_METRICS_PLAN.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:79e8ba341a766949efafa80072f7053fa74572c46c1b519124801e8eb0116401`
   Evidence: SESSION_SCOPED_ZYAL_METRICS_PLAN.md
46. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `UNLOCK_WORKPLAN.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:be9ff68142677c6046132fdc6319abee184e147c2cef9b8d5007f37b43d9dbaa`
   Evidence: UNLOCK_WORKPLAN.md
47. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `ZYAL_MISSION.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:daaad424f51673b774861eab2cace5944401be29250981467c891597ba8addf8`
   Evidence: ZYAL_MISSION.md
48. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `ZYAL_WORKFLOW.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:b1f1b6198ee11f9fa2e3d5c5fe874c27f6acc54351b079dedd96206e880bbb08`
   Evidence: ZYAL_WORKFLOW.md
49. `high` `test` `crates/`
   Rule: `HLT-008-FALSE-GREEN-RISK`
   Check: `HLT-008-FALSE-GREEN-RISK:test` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Reason: Rust surface lacks required property and/or integration tests
   Fix: add `proptest` or equivalent invariant tests plus `tests/` integration coverage routed through `cargo nextest` or `cargo test`
   Rerun: `just fast`
   Fingerprint: `sha256:8ece7234070a20910736663e65a530625acd16dac7fa57476cfc7c9a74bd745c`
   Evidence: Rust surface detected
50. `high` `vibe` `crates/tuiwright-jekko-unlock/tests/zyal_paste_perf.rs:1`
   Check: `HLT-000-SCORE-DIMENSION:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Reason: duplicated product code block detected
   Fix: extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Rerun: `just fast`
   Fingerprint: `sha256:f05efdcc9a1a6f4f5d9a91987f56ed4eff0f325db6079e08cd1298fe1c3d69c4`
   Evidence: duplicate block also appears at crates/tuiwright-jekko-unlock/tests/zyal_paste.rs:1
51. `high` `vibe` `crates/tuiwright-jekko-unlock/tests/zyal_session_paste.rs:223`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: fallback soup detected in product code
   Fix: collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Rerun: `just fast`
   Fingerprint: `sha256:c902a2bcbe0c94fad938c69a91290202c78684c7af9a12913beea37f9c3a1c4d`
   Evidence: crates/tuiwright-jekko-unlock/tests/zyal_session_paste.rs:223 extract_session_id(&body).ok_or_else(|| anyhow!("no session id in response: {body}"))
52. `medium` `release` `docs/testing.md`
   Rule: `HLT-026-COST-BUDGET-GAP`
   Check: `HLT-026-COST-BUDGET-GAP:release` `soft` confidence `0.88`
   Route: TLR `Verification`, lane `release`, owner `standard`
   Docs: `docs/testing.md`
   Matched term: `budget`
   Reason: unbounded paid work needs budgets and stop conditions
   Fix: add explicit budgets, quotas, stop conditions, and kill-switch evidence for paid or unbounded operations
   Rerun: `just check`
   Fingerprint: `sha256:edd248b7afc24b644107205fa5b84a88103ac4b622009ff9f19b779de8798f59`
   Evidence: cost surface found without budget/stop-condition policy
53. `critical` `security` `jnoccio-fusion/src/failure_log.rs:185`
   Rule: `HLT-010-SECRET-SPRAWL`
   Check: `HLT-010-SECRET-SPRAWL:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: secret-like value or credential material appears in repository text
   Fix: remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Rerun: `just security`
   Fingerprint: `sha256:b487e443159a2673d2f561852dfaceb76bba76951bf54927b0cddfe9fddcd6ad`
   Evidence: if token.starts_with("sk-") || token.starts_with("ghp_") || token.starts_with("rk-") {
54. `high` `vibe` `jnoccio-fusion/src/mcp.rs:169`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: product code contains TODO/stub/unimplemented/unreachable placeholder markers
   Fix: replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Rerun: `just fast`
   Fingerprint: `sha256:ca0a49ac1a7732dee98b3b783286c28619ad63e461ffd53ce3a0331dd13ba710`
   Evidence: jnoccio-fusion/src/mcp.rs:169 "completion/complete is not implemented",
55. `high` `vibe` `jnoccio-fusion/src/router.rs:440`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:130ef352a8f45ee5b94cd9908b9d08dc4d08f477dbcff3a64a7d1761fe223b95`
   Evidence: jnoccio-fusion/src/router.rs:440, future-hostile/dead-language term `legacy` appears
56. `high` `vibe` `jnoccio-fusion/src/router.rs:443`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d6215c86340cfc838594b46ecb705d9fd4cb004d03bce7cbfdf8a5301974644e`
   Evidence: jnoccio-fusion/src/router.rs:443, future-hostile/dead-language term `legacy` appears
57. `high` `vibe` `jnoccio-fusion/src/router.rs:447`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0c83db2376f965f92e084e844f3c09556cde710f3db86a3b22231772f45eeca8`
   Evidence: jnoccio-fusion/src/router.rs:447, future-hostile/dead-language term `legacy` appears
58. `high` `vibe` `jnoccio-fusion/src/router.rs:457`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ea3ccfbf6625511854908319fe5fd74a38f3903e1aaa940c2a7bf04cf33d9fdf`
   Evidence: jnoccio-fusion/src/router.rs:457, future-hostile/dead-language term `legacy` appears
59. `high` `vibe` `jnoccio-fusion/src/router.rs:458`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9574844adb1cc44e562e8bb2d12af9fde4c14bb3102012a7efec352a1240baa7`
   Evidence: jnoccio-fusion/src/router.rs:458, future-hostile/dead-language term `legacy` appears
60. `high` `vibe` `jnoccio-fusion/src/router.rs:459`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:66666d1adfd2e5dcf941e66a9fb77bcc6a2cb34e29ac8c053a9b311ef171245b`
   Evidence: jnoccio-fusion/src/router.rs:459, future-hostile/dead-language term `legacy` appears
61. `high` `vibe` `jnoccio-fusion/src/router.rs:468`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:45d790b536159d4a19e9fbd70b1abd01ca320c50aeb76be91b2d796ce6676517`
   Evidence: jnoccio-fusion/src/router.rs:468, future-hostile/dead-language term `legacy` appears
62. `high` `vibe` `jnoccio-fusion/src/router.rs:472`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:129041cc972f4cdaec97f6d4d6046eeaf4b22c9acf0c6a0b97e48f6b98c637ed`
   Evidence: jnoccio-fusion/src/router.rs:472, future-hostile/dead-language term `legacy` appears
63. `high` `boundary` `packages/core/sst-env.d.ts:3`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:dea4dad91c5b4a181ce44d9e408cbe6fe05327bbc1d4120d0a3425ff83d18909`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/core/sst-env.d.ts, line=3, snippet=/* eslint-disable */
64. `high` `test` `packages/core/test/effect/cross-spawn-spawner.test.ts:102`
   Rule: `HLT-008-FALSE-GREEN-RISK`
   Check: `HLT-008-FALSE-GREEN-RISK:test` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Reason: test code contains disabled, focused, tautological, or snapshot-only proof
   Fix: replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Rerun: `just fast`
   Fingerprint: `sha256:8e97f6d88c185f168ffec97bc6d54344eff9362c7099d13667201aaba7b633d3`
   Evidence: 'const fs = require("node:fs"); const code = Number(process.env.JEKKO_NON_ZERO_EXIT_CODE ?? "1"); fs.writeFileSync(process.env.JEKKO_NON_ZERO_EXIT_MARKER, "ran"
65. `high` `boundary` `packages/core/test/fixture/flock-worker.ts:29`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9be43bca94d8cf16912de5dbac3decc96b7cfba8534aa88042bab32125207e72`
   Evidence: detector=typescript.types.any-boundary, path=packages/core/test/fixture/flock-worker.ts, line=29, snippet=return JSON.parse(raw) as Msg
66. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:30`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:5cddefe562c77d799af69e0b5df4b9d4503d3869e71a8ba979de4e7d029ed2d1`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_message_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
67. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:40`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:c4050b1934ebad06ffaffd618dabeda0d5e13f01e293410c72e2414c54cbe355`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_part_message_id_message_id_fk` FOREIGN KEY (`message_id`) REFERENCES `message`(`id`) ON DELETE CASCADE
68. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:48`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:68c104b367132ee831146f25151739d91e14e6eeea2ed8160958d85e472f6a2f`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_permission_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE
69. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:70`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:1f870d3451c6623cf9b6d077fe399aa9d4dff277a19310d425aa262b3177c8c4`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE
70. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:82`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:ca3f39034d6a4270264f1039574b848a2cb8fe9715fb7f92e7af6d7908dca222`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_todo_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
71. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:92`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:b4ce5e4cc56099b7f60bf9dfe6dd94bbb810f7daea8164bc471a1e0240f90ed3`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_share_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
72. `high` `data` `packages/jekko/migration/20260228203230_blue_harpoon/migration.sql:21`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `update/delete`
   Reason: the statement reaches a whole-table write path without a row filter
   Fix: add a WHERE clause or prove the full-table rewrite with a local migration receipt
   Rerun: `just fast`
   Fingerprint: `sha256:5b782c6837ed3e8a13e885a085309c5df19af3ee84d18685f37c1f72204933b4`
   Evidence: detector=sql.query.full-table-write, proof-window=where-clause, snippet=FOREIGN KEY (`active_account_id`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE set null
73. `high` `data` `packages/jekko/migration/20260323234822_events/migration.sql:17`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:199f08b41f4f50017b7f717fd65fb45b10450b130cdc24309c558099a8dba1d4`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_event_aggregate_id_event_sequence_aggregate_id_fk` FOREIGN KEY (`aggregate_id`) REFERENCES `event_sequence`(`aggregate_id`) ON DELETE CASCADE
74. `high` `data` `packages/jekko/migration/20260410174513_workspace-name/migration.sql:15`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:d25a677c85f8bbed0f1c9ed7b87fcbff94a41dbf835cb2140277d6a5b8c3874b`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_workspace_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE
75. `high` `data` `packages/jekko/migration/20260410174513_workspace-name/migration.sql:19`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:e69c04486412ea4d36119671855b63bbdd7b1f5e82338bfc84ef0bfad38718cb`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP TABLE `workspace`
76. `high` `data` `packages/jekko/migration/20260413175956_chief_energizer/migration.sql:11`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:212edba1953875c2e212996f565016885efdffd0a386047b35ebd39aed39acbf`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_entry_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
77. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:13`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:5085641cb6ddca54e0b428ecd49ae60596f7df3464a9c2b6dc575c7a0c5b7004`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_message_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
78. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:20`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:001eca936f8714749063078297db6c619ac157c7ed4af3b8e5a7081e33b2b3fd`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP INDEX IF EXISTS `session_entry_session_idx`
79. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:21`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:e0e926c12826c8db18d27d77253a3e17d34f23bf263738c602579ea791345f1e`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP INDEX IF EXISTS `session_entry_session_type_idx`
80. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:22`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:8508b16b3ad448b53d8d65ebdb56bffa64fd980c3e9b5513f916344fd92faf19`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP INDEX IF EXISTS `session_entry_time_created_idx`
81. `high` `data` `packages/jekko/migration/20260507054800_memory_os/migration.sql:21`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:873b082b7684665686e97f9a40e9e21dcb78cc6241d6ca00a8cb00876657e4d3`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
82. `high` `data` `packages/jekko/migration/20260507054800_memory_os/migration.sql:42`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:873b082b7684665686e97f9a40e9e21dcb78cc6241d6ca00a8cb00876657e4d3`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
83. `high` `boundary` `packages/jekko/parsers-config.ts:3`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:53f07ac97660946837df3319b05d6859f73f0a223688657cdfbac1c600ac90aa`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/parsers-config.ts, line=3, snippet=// Warn: when taking queries from the nvim-treesitter repo, make sure to include the query dependencies as well
84. `high` `boundary` `packages/jekko/script/generate.ts:17`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:9dca219bafb45f9ca031a4b52c2cd0a209169fbefe611adcfc93630b01acd750`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/jekko/script/generate.ts, line=17, snippet=`// @ts-nocheck\n// Auto-generated by build.ts - do not edit\nexport const snapshot = ${modelsData}\n`,
85. `high` `vibe` `packages/jekko/script/httpapi-exercise.ts:1759`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f452ba56e8e46d4cf0a9c1b0d31bd4e6066e37b439bc716b96d7dca38fcc53e3`
   Evidence: packages/jekko/script/httpapi-exercise.ts:1759, future-hostile/dead-language term `legacy` appears
86. `high` `boundary` `packages/jekko/script/httpapi-exercise.ts:1951`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:980443eec1b82864443425c7f35fa526fc686536be79367990ae6d4908bf90b9`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/script/httpapi-exercise.ts, line=1951, snippet=return JSON.parse(text) as unknown
87. `high` `boundary` `packages/jekko/script/schema.ts:9`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:723177044c375febb0280b8a5d02d88f91c7e13af9cfebedcaf153009a7f0dc7`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/script/schema.ts, line=9, snippet=io: "input", // Generate input shape (treats optional().default() as not required)
88. `high` `boundary` `packages/jekko/specs/v2/api.ts:1`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:8ea7e5c42efb714413d2bdb3c3ac80a94d14dda964b13e21519c37e2dd21f04d`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/jekko/specs/v2/api.ts, line=1, snippet=// @ts-nocheck
89. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:187`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3957a5eeccfa10a4db0eff7542b6badc6b0dbfb445688f031b65d01a52404adc`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:187, future-hostile/dead-language term `legacy` appears
90. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:188`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4b6887f776385af71b62676543ac06419deacfc477689cf4725f9bedfefe92e4`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:188, future-hostile/dead-language term `legacy` appears
91. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:189`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:99e57af540ddb21d8b214a3e020788b43a0421dd1a3e82f3be492ea260f44b22`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:189, future-hostile/dead-language term `legacy` appears
92. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:199`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e2e78ee4dc285eb696d4df0d2e11007deb415a23f20ce52580f700fe0a96ea72`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:199, future-hostile/dead-language term `legacy` appears
93. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:200`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f717e6bcc59b82357db67af16868aabca8f04270c1011f686b24684e3eff6c2f`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:200, future-hostile/dead-language term `legacy` appears
94. `high` `vibe` `packages/jekko/src/agent-script/schema.ts:1004`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cb5494f450304e36ecf269e2d05982a7b8e537d110d9870caf5417e278c64c87`
   Evidence: packages/jekko/src/agent-script/schema.ts:1004, future-hostile/dead-language term `fallback` appears
95. `high` `vibe` `packages/jekko/src/agent-script/schema.ts:1022`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ef8fd13e360b8db6a97fe290ebbc83423a2e3d90bedb1370bdfbbd70ddb93ebb`
   Evidence: packages/jekko/src/agent-script/schema.ts:1022, future-hostile/dead-language term `fallback` appears
96. `high` `boundary` `packages/jekko/src/cli/cmd/daemon.ts:46`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:0e4af528ab9b910a0b4bbc40e14a9f0c4bcce948c6d05bad5522d24d23356548`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/daemon.ts, line=46, snippet=return text ? (JSON.parse(text) as unknown) : undefined
97. `high` `boundary` `packages/jekko/src/cli/cmd/daemon.ts:231`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:2ce72423bb864c9585d2e38b1a9fa5253323d9b0b8ca25cef6017e4c4a744412`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/daemon.ts, line=231, snippet=const runs = (yield* Effect.promise(() => requestJson(input, "/daemon"))) as readonly any[]
98. `high` `boundary` `packages/jekko/src/cli/cmd/daemon.ts:239`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:8b7b2578bf165aaddb93e701540342aadf51bd5526f46c1de9d3c83e2920d98d`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/daemon.ts, line=239, snippet=const tasks = (yield* Effect.promise(() => requestJson(input, `/daemon/${args.runID}/tasks`))) as readonly any[]
99. `high` `boundary` `packages/jekko/src/cli/cmd/daemon.ts:312`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:1d7eb1d4d3cabb9046379e627cc40d18c311e6012a1277ae88aeee15f3e94719`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/daemon.ts, line=312, snippet=const tasks = (yield* Effect.promise(() => requestJson(input, `/daemon/${args.runID}/tasks`))) as readonly any[]
100. `high` `boundary` `packages/jekko/src/cli/cmd/debug/agent.ts:32`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:07c96f8f8398f5736d7cd9907417f2c1c6cbc71db8d417eac6fdf3d1fed0c3b5`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/debug/agent.ts, line=32, snippet=description: "Tool params as JSON or a JS object literal",
101. `high` `boundary` `packages/jekko/src/cli/cmd/debug/agent.ts:109`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.runtime.dangerous-eval-dom`
   Reason: sink is not proven safe locally
   Fix: replace the dynamic sink with a bounded parser, sanitizer, or typed renderer
   Rerun: `just fast`
   Fingerprint: `sha256:3e06a63ec02609a864d69c7b90155f6b690cb37cc5ecc1d441b0342ac7153a06`
   Evidence: detector=typescript.runtime.dangerous-eval-dom, path=packages/jekko/src/cli/cmd/debug/agent.ts, line=109, snippet=return new Function(`return (${trimmed})`)()
102. `high` `boundary` `packages/jekko/src/cli/cmd/github.ts:451`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:c118d837c0b5c9b10505373bfb18b6b73f6a987e7af3dca5d0d37261b82eb867`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/github.ts, line=451, snippet=const context = isMock ? (JSON.parse(args.event!) as Context) : github.context
103. `high` `vibe` `packages/jekko/src/cli/cmd/github.ts:885`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:abf8c87cff840046d48f7d6b091e065bd7a686390f2e2fdac3a245e5fa0afc43`
   Evidence: packages/jekko/src/cli/cmd/github.ts:885, future-hostile/dead-language term `todo` appears
104. `high` `boundary` `packages/jekko/src/cli/cmd/github.ts:1062`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:d8e52014a166b2ddeb472ed78c1013c70e7478d2af708d82ad6c8d064daad35b`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/github.ts, line=1062, snippet=const responseJson = (await response.json()) as { error?: string }
105. `high` `boundary` `packages/jekko/src/cli/cmd/github.ts:1068`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:ddecfc36f785e1b464f77e5a91317a5393f46461cf6564802018ab7332082548`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/github.ts, line=1068, snippet=const responseJson = (await response.json()) as { token: string }
106. `high` `boundary` `packages/jekko/src/cli/cmd/import.ts:139`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:b60af60de4a2c77257bbd3d05d53acd450ab981f12c1a9228dcefe4a590e6c45`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/import.ts, line=139, snippet=try: () => response.json() as Promise<ShareData[]>,
107. `high` `vibe` `packages/jekko/src/cli/cmd/providers.ts:268`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:62f698717bde1a1c467492ad7c8fa8ddf3e4aae07efb2405204ecd3905a42a7d`
   Evidence: packages/jekko/src/cli/cmd/providers.ts:268, future-hostile/dead-language term `legacy` appears
108. `high` `boundary` `packages/jekko/src/cli/cmd/run.ts:40`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:4494c20b7d2a07cfb74891670fe8d55967d192ec000542e8e60e4b517dd55820`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/run.ts, line=40, snippet=input: state.input as Tool.InferParameters<T>,
109. `high` `vibe` `packages/jekko/src/cli/cmd/tui/app.tsx:145`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1f577043cfa421440dfa7624fe40f6fcd11a40a7b3d93d288862dd27f0b73e05`
   Evidence: packages/jekko/src/cli/cmd/tui/app.tsx:145, future-hostile/dead-language term `fallback` appears
110. `high` `boundary` `packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx:95`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:4da2f72221b06c64d224fc8a5fd29dfbd6be56e272b1d4c1b20206df007ac59b`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx, line=95, snippet=input: "keyboard" as "keyboard" | "mouse",
111. `high` `boundary` `packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx:150`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9ff3a1a47172a0ab0b5437a36e5fbab562483757a2de49d3e71beb5364aeeebe`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx, line=150, snippet=// via a synthetic event as the layout moves underneath the cursor. This is a alternative to make sure the input mode remains keyboard so
112. `high` `boundary` `packages/jekko/src/cli/cmd/tui/component/prompt/frecency.tsx:29`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:c2608bf3b26a40ed4d281c74f56fff7605b428bf3615a4ed3c72789a3d170c55`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/component/prompt/frecency.tsx, line=29, snippet=return JSON.parse(line) as { path: string; frequency: number; lastOpen: number }
113. `high` `boundary` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:473`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:bf4d488b3218575ff43c786846492ee55bb88061722af610e9057cf56d1860c2`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx, line=473, snippet=const ctl = input.extmarks as unknown as { updateHighlights: () => void }
114. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1668`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:beb586437bcb7fcec23db6e6fb0451ea3e56c897663dca3ef53801613ce0717f`
   Evidence: packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1668, future-hostile/dead-language term `fallback` appears
115. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1735`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5f44f091bd72fc1a5d60dbda666f21a079d8e1aeaac5e5bc49a6368921e2cf85`
   Evidence: packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1735, future-hostile/dead-language term `fallback` appears
116. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/spinner.tsx:15`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e26b911c91e23e51e54ee364b235b1b3f3c1ec9246f29546c02190eb864a7c98`
   Evidence: packages/jekko/src/cli/cmd/tui/component/spinner.tsx:15, future-hostile/dead-language term `fallback` appears
117. `high` `boundary` `packages/jekko/src/cli/cmd/tui/context/editor-zed.ts:276`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:5370f530a2fb9b24f28837508f4acdb6101b8ba2ff1c937181fc05353faa99c5`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/context/editor-zed.ts, line=276, snippet=return JSON.parse(value) as unknown
118. `high` `boundary` `packages/jekko/src/cli/cmd/tui/context/editor.ts:398`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:ff398449510b56a65eb4640d16fad8812f35263454d6bfd2efecbbc232b410fa`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/context/editor.ts, line=398, snippet=const parsed = JSON.parse(readFileSync(filePath, "utf-8")) as unknown
119. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts:120`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:752f1ed40249990b66b6e9eebbfc9a095b3a02aa6d0c2ddcbcef11f6561d3cf7`
   Evidence: packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts:120, future-hostile/dead-language term `stale` appears
120. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:8`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d0bc30b8648f8341584aa4e7bf87d2331b37181a626b6386e82008ff6fc8038a`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:8, future-hostile/dead-language term `todo` appears
121. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:61`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:535c857a2c811df44a61b4fbcb9b97ee4b0561727037913ae470c4418fd071c9`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:61, future-hostile/dead-language term `todo` appears
122. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:62`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cf271620742ea023b547edeabbed92e940e802bead0eba7fac4e89bffea55a53`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:62, future-hostile/dead-language term `todo` appears
123. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:65`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:acb369bc7b87e3887e993d1c187abf1b0a79d06809cf390fde2785be3f6f8f4a`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:65, future-hostile/dead-language term `todo` appears
124. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6a7bdc1a6ad026736d5182781628e6b8595d92082df7a09f2816246c8ae1eb33`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:101, future-hostile/dead-language term `todo` appears
125. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:159`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f8d8ee8993f6e1297f4deee1019b2dd60e2cccf1c78c363996efaaaa165e98be`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:159, future-hostile/dead-language term `todo` appears
126. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:161`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:78d63fbaa00f9bac3b8cb938790718c4929e671a775abd75d14a69c11bce679f`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:161, future-hostile/dead-language term `todo` appears
127. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:172`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4b51b17b1c5e277e448ba4129b97c735be7ecfd93f2eb9311e34abd357284437`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:172, future-hostile/dead-language term `todo` appears
128. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:173`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fe8d08d502725ec99a64d3109a5aae2afef99d0c938c939388df07838b5bddcd`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:173, future-hostile/dead-language term `todo` appears
129. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:324`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4eb58c7b194243f147aeffa1d3681e53f9101d2c1422d396a0b6b53c87b164eb`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:324, future-hostile/dead-language term `todo` appears
130. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:325`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b439b1bf19f1f1e3ac3cf8a0b8223ed646dd0b3cac5136ca9bfcbf9763991956`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:325, future-hostile/dead-language term `todo` appears
131. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync.tsx:309`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2d038fa1e4013c4254823b16c30b7db38b8be42cfa65ca0d8e28dc210c1e0a32`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync.tsx:309, future-hostile/dead-language term `legacy` appears
132. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/footer.tsx:53`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1630ef764261e8dce91f2c6d6ad435fc40af7ec9d70b1796fdc208b95cd85776`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/footer.tsx:53, future-hostile/dead-language term `fallback` appears
133. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/mcp.tsx:60`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6bb4922e4e24ae304cab4d025e089bf2d52ee8638ba5971e05a3b018fcc9c99a`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/mcp.tsx:60, future-hostile/dead-language term `fallback` appears
134. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:484`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2b05e012953ca682df0a13095ef9346f01a0b789b132e94aa5f27ed70ff8b974`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:484, future-hostile/dead-language term `fallback` appears
135. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:638`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:630178b199423f1b65a9988df22c471d513a13b53be56fa3724af7a563bab492`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:638, future-hostile/dead-language term `fallback` appears
136. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:874`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f4f275cdf522b03fa022aaa07431a1e7f6f7a40915c0b049f57ba28911001c8a`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:874, future-hostile/dead-language term `fallback` appears
137. `high` `vibe` `packages/jekko/src/cli/cmd/tui/plugin/internal.ts:7`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4f05009f091dceaf6bd4d76676ea5e7cb553ed1bf1866f456789f81a0a1e9ae9`
   Evidence: packages/jekko/src/cli/cmd/tui/plugin/internal.ts:7, future-hostile/dead-language term `todo` appears
138. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:67`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:439ae9d72eb5b8b737fc6c208a1f9176214329a35ab4882537d7849f0396d167`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:67, future-hostile/dead-language term `todo` appears
139. `high` `boundary` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:690`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:29191d577751b9be90b5e9d9d97230ae4aca21fabd3186c993af3c055096fd47`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/routes/session/index.tsx, line=690, snippet={ input: "", parts: [] as PromptInfo["parts"] },
140. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:68`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6f3ab0b3c2a3feacb6071657291f6ccf3516c52cc144951c3cca5717c1643b96`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:68, future-hostile/dead-language term `todo` appears
141. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:197`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c9ae3a97b277c3410dc3044214c4ca2a7e1d7e68751baaf56c1d9fce54b94e12`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:197, future-hostile/dead-language term `fallback` appears
142. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:270`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c065e1ce4e26c7e28567610156aa93204c9f599b10bbacb1045e8ef473e605b5`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:270, future-hostile/dead-language term `fallback` appears
143. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:340`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d9e93f6dd18691cee47a2023bcb592997389e6ff76c23c8ceda59cff7727b1c5`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:340, future-hostile/dead-language term `fallback` appears
144. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:364`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a8ad78a59f7fc7b6e732105f95f3010e5bd83ecef0e3b2796ada29b323af4d88`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:364, future-hostile/dead-language term `fallback` appears
145. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:668`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5d490790e79fc81f152c8bff3c2e22a743dfdfea3c50cd2f23e3197b1f182861`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:668, future-hostile/dead-language term `fallback` appears
146. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:769`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bd41e5c0e93175503ae519ada139d7df4be8eead863a3e09ec7799f28fa6bcde`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:769, future-hostile/dead-language term `fallback` appears
147. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:813`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1e0f53ba8e7d4611cf5073686ac81ff06ed7fb0d2d3844940833f38f16749ee0`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:813, future-hostile/dead-language term `fallback` appears
148. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:1176`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7cf96abef9adff14175a22e4b0f4d12c0a73068c9ffa363f40d183ca338764e2`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx:1176, future-hostile/dead-language term `fallback` appears
149. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/sidebar.tsx:66`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f207a86f488fb60505c47877b9ddf3f061630d032e01a03b6bd1b8390aaf47a2`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/sidebar.tsx:66, future-hostile/dead-language term `fallback` appears
150. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-prompt.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:47f34bf56c4f4d6cb1b76aa43f8785f962af5aadfad2e6e27006e4af1986796b`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-prompt.tsx:101, future-hostile/dead-language term `fallback` appears
151. `high` `boundary` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:68`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:973f81b39d304ad7dd27b37653535b35b5c575846cbc372cbccab0d80c8bc220`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx, line=68, snippet=input: "keyboard" as "keyboard" | "mouse",
152. `high` `boundary` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:109`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:acd839c238d088dc9ec980a75ffee26fd6f15e573467e4c3e74a1c1a4212cf5b`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx, line=109, snippet=// via a synthetic event as the layout moves underneath the cursor. This is a alternative to make sure the input mode remains keyboard
153. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:286`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2a248073c7af6791d7c7a222a41e6ce8dc3d8d175c74a483c667b9fffa2f4cec`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:286, future-hostile/dead-language term `fallback` appears
154. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:307`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:265662bf4493a971ebd0de368a75de302fce01845b7b3bcb6aa77f1cf68ec5f5`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:307, future-hostile/dead-language term `fallback` appears
155. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:371`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:268a6915ee9561c5a528db12a9686afedec873b1c68f4e0947bc9fed7764a177`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:371, future-hostile/dead-language term `fallback` appears
156. `high` `boundary` `packages/jekko/src/cli/error.ts:20`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:2bdc68c05f674d88a71889ad255d77b10dd42a165074e1e9e62440431cfa707e`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=20, snippet=const data = input as ErrorLike & { exitCode?: number }
157. `high` `boundary` `packages/jekko/src/cli/error.ts:27`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:2cc8b9a0cc6d41b713d394f97c556a14d7ae3bd05588c0f13d3a3eed3aa2f1c1`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=27, snippet=return `MCP server "${(input as ErrorLike).data?.name}" failed. Note, jekko does not support MCP authentication yet.`
158. `high` `boundary` `packages/jekko/src/cli/error.ts:32`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:1619d38c135a6d2e1d0129d71141ddda85729540bb9a791057017088339c4e94`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=32, snippet=return (input as ErrorLike).message ?? ""
159. `high` `boundary` `packages/jekko/src/cli/error.ts:37`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:c3e5bb74c6af828d46fb089e626d58419999662f31ebf13ecfaed16d74d9fd79`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=37, snippet=const data = (input as ErrorLike).data
160. `high` `boundary` `packages/jekko/src/cli/error.ts:49`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:472dab44cca57d5c229dcda9df21724e6749735376f8800eec8cdb4bd7387842`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=49, snippet=return `Failed to initialize provider "${(input as ErrorLike).data?.providerID}". Check credentials and configuration.`
161. `high` `boundary` `packages/jekko/src/cli/error.ts:54`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9dc6c37a24b153d9789e755b5203a31c6c425769c0f39cfc294c5f888c5657ff`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=54, snippet=const data = (input as ErrorLike).data
162. `high` `boundary` `packages/jekko/src/cli/error.ts:60`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:1cefba36ffa9761f7728003b180566c6ae298d9ffac9e415b97ce88e5b3fd986`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=60, snippet=const data = (input as ErrorLike).data
163. `high` `boundary` `packages/jekko/src/cli/error.ts:66`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:0ec6497a8e2ad2d19dc764f6d1f46410807efe9bd35ea0c747f9feac668a9e46`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=66, snippet=return (input as ErrorLike).data?.message ?? ""
164. `high` `boundary` `packages/jekko/src/cli/error.ts:71`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:8c33472c2097c45d912c88dff23d99e0b3992a5269af681fded3dc211a18a5df`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/cli/error.ts, line=71, snippet=const data = (input as ErrorLike).data
165. `high` `boundary` `packages/jekko/src/config/config.ts:527`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:683a7bb842c3da229e0000f2aa5c8e84bd6af1512e55a18b9100fff7a6c22e68`
   Evidence: detector=typescript.types.any-boundary, path=packages/jekko/src/config/config.ts, line=527, snippet=const wellknown = (yield* Effect.promise(() => response.json())) as {
166. `high` `boundary` `packages/jekko/src/config/keybinds.ts:70`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:ab5d647a17236e43394738e6c92202f662dde357bf32c9033d1b70224537d8ce`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=70, snippet=input_newline: keybind("shift+return,ctrl+return,alt+return,ctrl+j", "Insert newline in input"),
167. `high` `boundary` `packages/jekko/src/config/keybinds.ts:75`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:a531473d111402fa38bbbedc89da021bfed21735c18c549626655587e757160d`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=75, snippet=input_select_left: keybind("shift+left", "Select left in input"),
168. `high` `boundary` `packages/jekko/src/config/keybinds.ts:76`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:04efe0f3d220303486f8aaeccac354d5bfa59e2b54aab5077a0f353431b82211`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=76, snippet=input_select_right: keybind("shift+right", "Select right in input"),
169. `high` `boundary` `packages/jekko/src/config/keybinds.ts:77`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:6ac7d714d5d184d2c73a0b0a2cfde66dbf274ff7be85c049f6b1cd8071d0c2e3`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=77, snippet=input_select_up: keybind("shift+up", "Select up in input"),
170. `high` `boundary` `packages/jekko/src/config/keybinds.ts:78`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:e17aa13d7f29c3898b087709b9ab880650d76252c269d949361009431f4e0018`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=78, snippet=input_select_down: keybind("shift+down", "Select down in input"),
171. `high` `boundary` `packages/jekko/src/config/keybinds.ts:81`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:c8166ce71402b281fae04ec49e50b53b3bd2a88fac07d5b45400c3efa200f7f8`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=81, snippet=input_select_line_home: keybind("ctrl+shift+a", "Select to start of line in input"),
172. `high` `boundary` `packages/jekko/src/config/keybinds.ts:82`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:0d8427f2f4ec9abc6a36befb5f3dd221e8fd5760cb546120982b767ce0fdff96`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=82, snippet=input_select_line_end: keybind("ctrl+shift+e", "Select to end of line in input"),
173. `high` `boundary` `packages/jekko/src/config/keybinds.ts:85`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:44b01e6ccc7ccf40855fb3633cb20554718358c8e57f75553f0c6c09ddc85856`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=85, snippet=input_select_visual_line_home: keybind("alt+shift+a", "Select to start of visual line in input"),
174. `high` `boundary` `packages/jekko/src/config/keybinds.ts:86`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:9c31692c218916f99101b68487374b18a269f035b75369490c53b3e173cf12ed`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=86, snippet=input_select_visual_line_end: keybind("alt+shift+e", "Select to end of visual line in input"),
175. `high` `boundary` `packages/jekko/src/config/keybinds.ts:89`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:bac124409cc7e5a46cfdf9d030e098f50b9b474ee68e5fb6bfae604f8706e6e7`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=89, snippet=input_select_buffer_home: keybind("shift+home", "Select to start of buffer in input"),
176. `high` `boundary` `packages/jekko/src/config/keybinds.ts:90`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:d85b50fc3b925472a77f57810969649053ca7d45639c53615800d4d401a01ae3`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=90, snippet=input_select_buffer_end: keybind("shift+end", "Select to end of buffer in input"),
177. `high` `boundary` `packages/jekko/src/config/keybinds.ts:91`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:f1d88a134ce39e215bbcc7f11c5bdbfd558a737ae9c3e3155628ff8a0359591c`
   Evidence: detector=typescript.security.raw-command-sql, path=packages/jekko/src/config/keybinds.ts, line=91, snippet=input_delete_line: keybind("ctrl+shift+d", "Delete line in input"),
178. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:151`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4f242b1422102d6963fcf7ced2152debe1e9f3982fc95bf1c5b7a53ebabc2d27`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:151, future-hostile/dead-language term `todo` appears
179. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:162`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c6231f59fc7a68a8b45ec3eabb61a728cf9e1ad01b4d5471773014b468b003f3`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:162, future-hostile/dead-language term `todo` appears
180. `high` `vibe` `packages/jekko/src/session/daemon-pass.ts:57`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1c7478d80bda2eba8aaf24d71ce816a8ec7d976a9aa86cd65073f9b0f1fd09fd`
   Evidence: packages/jekko/src/session/daemon-pass.ts:57, future-hostile/dead-language term `fallback` appears
181. `high` `vibe` `packages/jekko/src/session/daemon-pass.ts:74`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c69bec142b6c79356e4e7572354ee7941badb5f56ad8dca5bc0373741f5fa856`
   Evidence: packages/jekko/src/session/daemon-pass.ts:74, future-hostile/dead-language term `fallback` appears
182. `high` `vibe` `packages/jekko/src/session/daemon-pass.ts:75`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d7cea62e3dee0fb8cdbb651e22b0193cf1018d7d33b9bc3fefe28e0b7d488700`
   Evidence: packages/jekko/src/session/daemon-pass.ts:75, future-hostile/dead-language term `fallback` appears
183. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:12`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f48bea03421d0e99f41227952dc9e36eff53e5925549235749f80d425e1865ce`
   Evidence: packages/jekko/src/session/daemon-retry.ts:12, future-hostile/dead-language term `fallback` appears
184. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:18`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:405d236905ac1fd2b6e60cbf03939291a0d465679f29eac888a3fc5fd02d11d1`
   Evidence: packages/jekko/src/session/daemon-retry.ts:18, future-hostile/dead-language term `fallback` appears
185. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:26`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:eb0b021184f2cadc4f0141703ef31daf05941ada5f2afaca19e305285385484c`
   Evidence: packages/jekko/src/session/daemon-retry.ts:26, future-hostile/dead-language term `fallback` appears
186. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:32`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:43debcde7971a43b2d0a4b9d1f6efd50049f5e30f2cb6b5bd46766d165760006`
   Evidence: packages/jekko/src/session/daemon-retry.ts:32, future-hostile/dead-language term `fallback` appears
187. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:33`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8062f487656c1d7ff93a2d321b1e54fa046be8864e8772b7e32c22e0b1ff95ac`
   Evidence: packages/jekko/src/session/daemon-retry.ts:33, future-hostile/dead-language term `fallback` appears
188. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:34`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:37cb279d6517f9c5967ccbbfc63c62c0f4fd0974e78c409ab8b164523c21a63d`
   Evidence: packages/jekko/src/session/daemon-retry.ts:34, future-hostile/dead-language term `fallback` appears
189. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:35`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:993027b12b9cacf4c7811fe8904ad8638490fd8072b0996ce224cd58129ead2b`
   Evidence: packages/jekko/src/session/daemon-retry.ts:35, future-hostile/dead-language term `fallback` appears
190. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:36`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c676e0c2c7e6da0db0ba22d6243779acd11188f13c1476fb5187b911f8a8d64f`
   Evidence: packages/jekko/src/session/daemon-retry.ts:36, future-hostile/dead-language term `fallback` appears
191. `medium` `context` `packages/jekko/src/session/message-v2.ts:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `agent`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:3bdc048683b0548d4425b27f17c0a5ae2d982322497e7130e0986057f401982c`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/jekko/src/session/message-v2.ts, line=1, proof_window=None, snippet=/**
192. `high` `vibe` `packages/jekko/src/session/message-v2.ts:2`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9677c2ff49d0e86496aa6a0c636eac1044dea76f76f2297c1a9294cb53306405`
   Evidence: packages/jekko/src/session/message-v2.ts:2, future-hostile/dead-language term `legacy` appears
193. `high` `vibe` `packages/jekko/src/session/pending.ts:4`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3be5c344786dc7b126398ca672919e3c3c0b4873d2fe19d91ade996200db711c`
   Evidence: packages/jekko/src/session/pending.ts:4, future-hostile/dead-language term `todo` appears
194. `high` `vibe` `packages/jekko/src/session/prompt.ts:1355`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:16d38f1dc42425a807beb7bccee83c59edcb3cab3d7a0ed0c3b32a485c1a8798`
   Evidence: packages/jekko/src/session/prompt.ts:1355, future-hostile/dead-language term `temporary` appears
195. `high` `vibe` `packages/jekko/src/session/prompt.ts:1366`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ef1c236790c59a4d4fe3fcb3db24d0a2008bbe9519c7450859690d1612e1b761`
   Evidence: packages/jekko/src/session/prompt.ts:1366, future-hostile/dead-language term `temporary` appears
196. `high` `vibe` `packages/jekko/test-extract.ts:24`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e9ad8b1d01644ec17065b547d27dbb9862173a64101dffbc1173b49f4c51a680`
   Evidence: packages/jekko/test-extract.ts:24, future-hostile/dead-language term `fallback` appears
197. `high` `vibe` `packages/jekko/test-zyal.ts:30`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:962dfb5ecd0ec991146a325862161702531d256cd5f313b53b1d4540e672aa82`
   Evidence: packages/jekko/test-zyal.ts:30, future-hostile/dead-language term `fallback` appears
198. `high` `vibe` `packages/jekko/test/cli/tui/zyal-flash.test.ts:103`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:87b8fa7e6eecdb072e8b8eff459b2863c9ac5c61be18354a68048039f6c7b8e7`
   Evidence: packages/jekko/test/cli/tui/zyal-flash.test.ts:103, future-hostile/dead-language term `old` appears
199. `high` `stack` `packages/jekko/test/fixture/lsp/fake-lsp-server.js`
   Check: `HLT-000-SCORE-DIMENSION:stack` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `unmapped`
   Reason: runtime code uses a language outside the chosen optimal stack
   Fix: move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Rerun: `just score`
   Fingerprint: `sha256:cbcf64a95250fc6d674d3a07151362ae07b74c8d98f9a36f9a0ca93ea604d2ed`
   Evidence: packages/jekko/test/fixture/lsp/fake-lsp-server.js uses `.js`, Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service
200. `high` `vibe` `packages/jekko/test/permission/read-like.test.ts:33`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ca714ec3848e0689a93f24578c686f1fe8b99a628ad8abd1309fbb2a914eb4b9`
   Evidence: packages/jekko/test/permission/read-like.test.ts:33, future-hostile/dead-language term `fallback` appears
201. `medium` `proof` `packages/jekko/test/provider/copilot/copilot-chat-model.test.ts:55`
   Rule: `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP`
   Check: `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP:proof` `soft` confidence `0.88`
   Route: TLR `Repair`, lane `audit`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `review evidence`
   Reason: proof and review claims need receipts
   Fix: attach raw CI logs, review receipts, and replayable commands instead of accepting claims or summaries
   Rerun: `just score`
   Fingerprint: `sha256:072aede2fe33d8963a7db9546bfd0b0bc2650c2ef8893de2508e825504b63876`
   Evidence: `data: {"choices":[{"index":0,"delta":{"content":"Okay, I need to check out the project's file structure.","role":"assistant","reasoning_opaque":"WHOd3dYFnxEBOs
202. `high` `vibe` `packages/jekko/test/server/httpapi-daemon.test.ts:34`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:42bac4770114793276827faf18fade4295bb85ba0f6722794abaa582f0cf5608`
   Evidence: packages/jekko/test/server/httpapi-daemon.test.ts:34, future-hostile/dead-language term `legacy` appears
203. `high` `vibe` `packages/jekko/test/server/httpapi-daemon.test.ts:46`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0deaa439b2fa4fd60a0079b0fe1566cfd2b7d662393bf880b2990204255e450f`
   Evidence: packages/jekko/test/server/httpapi-daemon.test.ts:46, future-hostile/dead-language term `legacy` appears
204. `high` `vibe` `packages/jekko/test/session/daemon-memory.test.ts:84`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:93c7775da15544fe94fc8740756823e67e889a05022ee1cbc7c30da343da8493`
   Evidence: packages/jekko/test/session/daemon-memory.test.ts:84, future-hostile/dead-language term `old` appears
205. `high` `vibe` `packages/jekko/test/session/daemon-memory.test.ts:106`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temp` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1dc674e92b878a9f0e97439eb369dde8a7822e2d51eb27e9f2a993879e922188`
   Evidence: packages/jekko/test/session/daemon-memory.test.ts:106, future-hostile/dead-language term `temp` appears
206. `high` `vibe` `packages/jekko/test/session/daemon-memory.test.ts:107`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temp` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:64112106f6df4e5811c52bbebc5e6e7b235e943b00a0e51e84bbbaa3e897b933`
   Evidence: packages/jekko/test/session/daemon-memory.test.ts:107, future-hostile/dead-language term `temp` appears
207. `high` `vibe` `packages/jekko/test/session/daemon-retry.test.ts:51`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ed5a04d4535811bd218c761f885ac13a6fbc1f1a8fcd77501d3bef7dcf937b8d`
   Evidence: packages/jekko/test/session/daemon-retry.test.ts:51, future-hostile/dead-language term `fallback` appears
208. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:142`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6f18e30d8db2fec8104349095f5f702eecb9074bbc5bbf5a06bcab6473b3217d`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:142, future-hostile/dead-language term `stale` appears
209. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:322`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4714f6e4ae41877bff96f0c55c269d7b5745b68e7742fd6f77f14a46483268ad`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:322, future-hostile/dead-language term `stale` appears
210. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:359`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dbd67690366d33d328281e64386390f2745a11314218464a82ce25f12aa09443`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:359, future-hostile/dead-language term `stale` appears
211. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:360`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e2033a0225a9ca2c9525a481c5ed5d6afbfb6d9bf21df1240522ff673a08f68b`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:360, future-hostile/dead-language term `stale` appears
212. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:411`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4f2ba40c38550573105e873e9f488748c04023d158d38d6e5a76153cb26f58b5`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:411, future-hostile/dead-language term `stale` appears
213. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:440`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:809cc8ff7e17a8422d1231055294d220a213ea2118f17d38af726926c96433c6`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:440, future-hostile/dead-language term `stale` appears
214. `high` `generated` `packages/sdk/js/src/gen/client/client.gen.ts:1`
   Rule: `HLT-002-GENERATED-MUTATION`
   Check: `HLT-002-GENERATED-MUTATION:generated` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `contract`, owner `tools`
   Docs: `agent/JANKURAI_STANDARD.md#generated-zones`
   Reason: generated zone is not protected strongly enough against hand edits
   Fix: add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Rerun: `just fast`
   Fingerprint: `sha256:14ea5b3fddebb2958fcd0d3eb2c97d6432765cb2685c62b1a32b3ac9194ed40d`
   Evidence: generated file contains TODO/stub markers

## Policy

- Policy file: `./agent/audit-policy.toml`
- Minimum score: `85`
- Fail on: `critical, high`

## Agent Fix Queue

1. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `.jekko/plugins/tui-smoke.tsx` - use argv arrays, prepared statements, or a safe allowlisted command path
   Route: `Contracts/data`/`fast`
2. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/core/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
3. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/core/test/fixture/flock-worker.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
4. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
5. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260228203230_blue_harpoon/migration.sql` - add a WHERE clause or prove the full-table rewrite with a local migration receipt
   Route: `Contracts/data`/`db`
6. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260323234822_events/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
7. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260410174513_workspace-name/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
8. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260413175956_chief_energizer/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
9. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
10. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260507054800_memory_os/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
11. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/parsers-config.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
12. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/script/generate.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
13. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/script/httpapi-exercise.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
14. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/script/schema.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
15. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/specs/v2/api.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
16. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/daemon.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
17. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/debug/agent.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
18. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/debug/agent.ts` - replace the dynamic sink with a bounded parser, sanitizer, or typed renderer
   Route: `Contracts/data`/`fast`
19. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/github.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
20. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/import.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
21. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/run.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
22. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
23. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/tui/component/prompt/frecency.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
24. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
25. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/tui/context/editor-zed.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
26. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/tui/context/editor.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
27. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
28. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
29. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/cli/error.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
30. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/config/config.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
31. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/jekko/src/config/keybinds.ts` - use argv arrays, prepared statements, or a safe allowlisted command path
   Route: `Contracts/data`/`fast`
32. `high` `HLT-002-GENERATED-MUTATION` `packages/sdk/js/src/gen/client/client.gen.ts` - add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Route: `Contracts/data`/`contract`
33. `high` `HLT-004-UNMAPPED-PROOF` `agent/test-map.json` - add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Route: `Verification`/`fast`
34. `high` `HLT-008-FALSE-GREEN-RISK` `crates/` - add `proptest` or equivalent invariant tests plus `tests/` integration coverage routed through `cargo nextest` or `cargo test`
   Route: `Verification`/`fast`
35. `high` `HLT-008-FALSE-GREEN-RISK` `packages/core/test/effect/cross-spawn-spawner.test.ts` - replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Route: `Verification`/`fast`
36. `medium` `HLT-018-PERF-CONCURRENCY-DRIFT` `Justfile` - add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Route: `Verification`/`fast`
37. `medium` `HLT-004-UNMAPPED-PROOF` `agent/test-map.json` - route each owned path to a deterministic proof command and make the lane executable in CI
   Route: `Verification`/`fast`
38. `medium` `HLT-026-COST-BUDGET-GAP` `docs/testing.md` - add explicit budgets, quotas, stop conditions, and kill-switch evidence for paid or unbounded operations
   Route: `Verification`/`release`
39. `high` `HLT-017-OPAQUE-OBSERVABILITY` `agent/owner-map.json` - fix the manifest syntax so audit policy and routing maps are authoritative
   Route: `Repair`/`observability`
40. `medium` `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP` `packages/jekko/test/provider/copilot/copilot-chat-model.test.ts` - attach raw CI logs, review receipts, and replayable commands instead of accepting claims or summaries
   Route: `Repair`/`audit`
41. `high` `packages/jekko/test/fixture/lsp/fake-lsp-server.js` - move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Route: `Context/setup`/`audit`
42. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/jekko/src/session/message-v2.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
43. `critical` `HLT-010-SECRET-SPRAWL` `jnoccio-fusion/src/failure_log.rs` - remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Route: `Security, secrets, agency`/`security`
44. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/check-encrypted-paths.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
45. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/check-encrypted-paths.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
46. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/jekko.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
47. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-standards.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
48. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
49. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
50. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - never echo secrets; pass them directly to trusted binaries and keep shell tracing off
   Route: `Security, secrets, agency`/`security`
51. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/review.yml` - pin the action to a commit SHA or stable release tag
   Route: `Security, secrets, agency`/`security`
52. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/review.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
53. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/stats.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
54. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/stats.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
55. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/test.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
56. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/typecheck.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
57. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/typecheck.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
58. `high` `HLT-023-INPUT-BOUNDARY-GAP` `.jekko/plugins/tui-smoke.tsx` - replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Route: `Security, secrets, agency`/`security`
59. `high` `crates/tuiwright-jekko-unlock/tests/zyal_paste_perf.rs` - extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Route: `Entropy`/`fast`
60. `high` `HLT-001-DEAD-MARKER` `crates/tuiwright-jekko-unlock/tests/zyal_session_paste.rs` - collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Route: `Entropy`/`fast`
61. `high` `HLT-001-DEAD-MARKER` `jnoccio-fusion/src/mcp.rs` - replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Route: `Entropy`/`fast`
62. `high` `HLT-001-DEAD-MARKER` `jnoccio-fusion/src/router.rs` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
63. `high` `HLT-001-DEAD-MARKER` `packages/jekko/script/httpapi-exercise.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
64. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/agent-script/parser.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
65. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/agent-script/schema.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
66. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/github.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
67. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/providers.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
68. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/app.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
69. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
70. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/component/spinner.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
71. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
72. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
73. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/sync.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
74. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/footer.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
75. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/mcp.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
76. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
77. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/plugin/internal.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
78. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
79. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/routes/session/session-renderers.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
80. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/routes/session/sidebar.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
81. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/ui/dialog-prompt.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
82. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
83. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
84. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/daemon-pass.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
85. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/daemon-retry.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
86. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/message-v2.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
87. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/pending.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
88. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/prompt.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
89. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test-extract.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
90. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test-zyal.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
91. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/cli/tui/zyal-flash.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
92. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/permission/read-like.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
93. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/server/httpapi-daemon.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
94. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/session/daemon-memory.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
95. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/session/daemon-retry.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
96. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/storage/json-migration.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
97. `medium` `HLT-001-DEAD-MARKER` `.` - split large or ambiguous authored code into smaller semantic modules with focused tests
   Route: `Entropy`/`fast`
98. `medium` `HLT-016-SUPPLY-CHAIN-DRIFT` `.github/workflows/jankurai.yml` - wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Route: `Security, secrets, agency`/`security`
