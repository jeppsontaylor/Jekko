# jankurai Repo Score

- Standard: `jankurai`
- Auditor: `0.8.11`
- Schema: `1.6.0`
- Paper edition: `2026.05-ed8`
- Target stack ID: `rust-ts-vite-react-postgres-bounded-python`
- Target stack: `Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service`
- Repo: `.`
- Run ID: `1778286692`
- Started at: `1778286692`
- Elapsed: `38171` ms
- Scope: `full`
- Raw score: `76`
- Final score: `60`
- Decision: `fail`
- Minimum score: `85`
- Caps applied: `non-optimal-product-language-found, vibe-placeholders-in-product-code, fallback-soup-in-product-code, future-hostile-dead-language-in-product-code, severe-duplication-in-product-code, generated-zone-mutation-risk, missing-rendered-ux-qa-lane, secret-like-content-detected, false-green-test-risk, input-boundary-gap, streaming-runtime-drift, sql-bad-behavior, typescript-bad-behavior, docker-bad-behavior, ci-bad-behavior, web-security-bad-behavior, repo-rot-bad-behavior`

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
| `missing-rendered-ux-qa-lane` | 84 | yes |
| `prompt-injection-risk` | 78 | no |
| `overbroad-agent-agency` | 65 | no |
| `secret-like-content-detected` | 60 | yes |
| `false-green-test-risk` | 76 | yes |
| `destructive-migration-risk` | 70 | no |
| `authz-or-data-isolation-gap` | 78 | no |
| `input-boundary-gap` | 78 | yes |
| `agent-tool-supply-chain-gap` | 78 | no |
| `release-readiness-gap` | 80 | no |
| `missing-rust-property-or-integration-tests` | 82 | no |
| `no-agent-friendly-exception-pattern` | 76 | no |
| `missing-agent-readable-docs` | 80 | no |
| `streaming-runtime-drift` | 78 | yes |
| `rust-bad-behavior` | 72 | no |
| `sql-bad-behavior` | 72 | yes |
| `typescript-bad-behavior` | 72 | yes |
| `docker-bad-behavior` | 72 | yes |
| `python-bad-behavior` | 72 | no |
| `ci-bad-behavior` | 70 | yes |
| `git-bad-behavior` | 70 | no |
| `gittools-bad-behavior` | 70 | no |
| `release-bad-behavior` | 70 | no |
| `web-security-bad-behavior` | 68 | yes |
| `repo-rot-bad-behavior` | 88 | yes |

## Dimensions

| Dimension | Weight | Score | Weighted | Evidence |
| --- | ---: | ---: | ---: | --- |
| Ownership and navigation surface | 13 | 100 | 13.00 | root `AGENTS.md` present; `CODEOWNERS` present |
| Contract and boundary integrity | 13 | 86 | 11.18 | contract surface found; generated contract artifacts found |
| Proof lanes and test routing | 12 | 98 | 11.76 | one-command setup/validation lane found; deterministic fast lane found |
| Security and supply-chain posture | 12 | 72 | 8.64 | lockfile present; secret or dependency scan tooling found |
| Code shape and semantic surface | 12 | 0 | 0.00 | largest authored code file: packages/app/src/pages/layout.tsx (2514 LOC); code file exceeds 500 LOC |
| Data truth and workflow safety | 8 | 100 | 8.00 | database surface present; structured db boundary manifest present |
| Observability and repair evidence | 8 | 88 | 7.04 | observability libraries or patterns found; ops/observability directory present |
| Context economy and agent instructions | 7 | 100 | 7.00 | root `AGENTS.md` present; root `AGENTS.md` stays short |
| Jankurai tool adoption and CI replacement | 7 | 39 | 2.73 | control-plane files present; applicable=16 |
| Python containment and polyglot hygiene | 4 | 90 | 3.60 | no Python files in scope; non-optimal product language marker |
| Build speed signals | 4 | 70 | 2.80 | build acceleration markers found; targeted test/build commands found |

## Reference Profile Structure

- Applicable cells: `10` canonical=`10` noncanonical=`0` guidance missing=`0`

| Cell | Status | Canonical | Detected | Aliases | Guidance | Owner | Proof lane | Agent fix |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `web` | `canonical` | `apps/web/` | `apps/web, packages/ui, packages/web` | `frontend/, ui/, packages/web/, packages/ui/` | `present` | `apps/web` | `rendered UX / Playwright` | `keep `apps/web/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `api` | `canonical` | `apps/api/` | `apps/api` | `api/, server/, backend/` | `present` | `apps/api` | `edge handler / contract tests` | `keep `apps/api/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `domain` | `canonical` | `crates/domain/` | `crates/domain` | `domain/, core/` | `present` | `crates/domain` | `unit / property tests` | `keep `crates/domain/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `application` | `canonical` | `crates/application/` | `crates/application` | `application/, usecases/, use-cases/` | `present` | `crates/application` | `use-case / authz tests` | `keep `crates/application/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `adapters` | `canonical` | `crates/adapters/` | `crates/adapters, infra` | `adapters/, infra/, integrations/` | `present` | `crates/adapters` | `adapter integration tests` | `keep `crates/adapters/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `workers` | `canonical` | `crates/workers/` | `crates/workers` | `workers/, jobs/, scheduler/, queue/` | `present` | `crates/workers` | `workflow / replay tests` | `keep `crates/workers/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `contracts` | `canonical` | `contracts/` | `contracts` | `openapi/, protobuf/, json-schema/, generated/` | `present` | `contracts` | `generation / drift checks` | `keep `contracts/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `db` | `canonical` | `db/` | `db` | `migrations/, constraints/, sql/` | `present` | `db` | `migration / constraint tests` | `keep `db/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `python-ai` | `canonical` | `python/ai-service/` | `python, python/ai-service` | `python/, ai-service/, evals/, embeddings/, model/` | `present` | `python/ai-service` | `eval / contract tests` | `keep `python/ai-service/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |
| `ops` | `canonical` | `ops/` | `.github, .github/workflows, ops` | `.github/, .github/workflows/, ci/, release/, observability/, security/` | `present` | `ops` | `security lane / workflow lint` | `keep `ops/AGENTS.md` aligned with owns / forbidden / proof lane guidance` |

## Rendered UX QA

- Web surface: `true`
- Layered UX lane: `false`
- Missing: `Playwright screenshot capture`

## Tool Adoption

- Control plane present: `true`
- Applicable tools: `16`
- Configured: `6`
- CI evidence: `5`
- Artifact verified: `5`
- Replaced count: `5`
- Missing CI evidence: `audit-ci, proof-routing, ci-bad-behavior, git-bad-behavior, release-bad-behavior, contract-drift, authz-matrix, input-boundary, agent-tool-supply, release-readiness, cost-budget`

| Tool | Category | Mode | Status | Replaced | Artifacts |
| --- | --- | --- | --- | --- | --- |
| `audit-ci` | `audit` | `auto` | `configured` | `manual repo scoring, ad hoc score gates` | `agent/repo-score.json, agent/repo-score.md` |
| `proof-routing` | `proof` | `auto` | `configured` | `ad hoc proof lane selection, manual proof receipts` | `agent/repo-score.json, agent/repo-score.md, target/jankurai/repair-queue.jsonl` |
| `proofbind` | `proof` | `auto` | `artifact_verified` | `manual changed-surface routing, ad hoc proof obligation lists` | `target/jankurai/proofbind/surface-witness.json, target/jankurai/proofbind/obligations.json` |
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
- Envelope exit code: `0` · elapsed: `15` ms · strict: `false`
- Commands — ran: `1`, skipped: `0`, failed: `0`
- Generated at: `1778190961`
- Git HEAD (envelope): `c6afabf16308d5a6708c3a353573e8718dddede8`

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
   Fingerprint: `sha256:6de3a9fbc1e60d6b8008e645267a55aef7e7c90fe5e758bb0f8185b0325dc08e`
   Evidence: largest authored code file: packages/app/src/pages/layout.tsx (2514 LOC), code file exceeds 500 LOC, code file exceeds 1000 LOC, most code files stay under 300 LOC
2. `high` `security` `.github/workflows/check-encrypted-paths.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:324fabf1d337d9fa31de1bf16ffa3c0806a5539c47d5ad589f4cf09476945cd4`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/check-encrypted-paths.yml, line=1, proof_window=None, snippet=name: check-encrypted-paths
3. `high` `security` `.github/workflows/check-encrypted-paths.yml:1`
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
4. `high` `security` `.github/workflows/check-encrypted-paths.yml:20`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:eb95b72be639bc9d678b98938c72f233f7684962e632f99221efbfa3622303ed`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/check-encrypted-paths.yml, line=20, proof_window=None, snippet=uses: actions/checkout@v4
5. `high` `security` `.github/workflows/docs-locale-sync.yml:20`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:506f16f8af47087b096f4845e324f83156a371d85c3c3c2bc08e4188f855eece`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/docs-locale-sync.yml, line=20, proof_window=None, snippet=uses: github/codeql-action/upload-sarif@v2
6. `high` `security` `.github/workflows/docs-locale-sync.yml:24`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:a86995beb1238e623308d61ceed3165a8cc2b4bd7300677c351ba2a056868ba2`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/docs-locale-sync.yml, line=24, proof_window=None, snippet=uses: actions/checkout@v4
7. `high` `security` `.github/workflows/docs-locale-sync.yml:54`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:1ab5018915ebfefb993cf3aad3024f16d3f06b2d1f1a95f37e4a45f96f687a39`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/docs-locale-sync.yml, line=54, proof_window=None, snippet=run: curl -fsSL https://jekko.ai/install | bash -
8. `medium` `security` `.github/workflows/jankurai.yml`
   Rule: `HLT-016-SUPPLY-CHAIN-DRIFT`
   Check: `HLT-016-SUPPLY-CHAIN-DRIFT:security` `soft` confidence `0.76`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: `Security and supply-chain posture` scored 72 below the standard floor of 85
   Fix: wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Rerun: `just security`
   Fingerprint: `sha256:da221881fae691071bddc454109bed0998c48e6a9f99ee7c2e61538c8340a5d8`
   Evidence: lockfile present, secret or dependency scan tooling found, provenance/SBOM tooling found, security lane present
9. `high` `security` `.github/workflows/jekko.yml:34`
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
10. `high` `security` `.github/workflows/pr-standards.yml:1`
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
11. `high` `security` `.github/workflows/pr-standards.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:cea8b8c8079a5750b886e0d9b179f862d682721359c1d018a5e369cc878427ae`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/pr-standards.yml, line=1, proof_window=None, snippet=name: pr-standards
12. `high` `security` `.github/workflows/pr-standards.yml:15`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:8e47218b225e81396cbfa0e8b4d6640d84285bdb4426a5cd827a3caae8f5c34a`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/pr-standards.yml, line=15, proof_window=None, snippet=uses: actions/github-script@v7
13. `high` `security` `.github/workflows/pr-standards.yml:162`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:f9749442ea6d7375943c977963cd0c52d501ef71ec374761c499bc1058005512`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/pr-standards.yml, line=162, proof_window=None, snippet=uses: actions/github-script@v7
14. `high` `security` `.github/workflows/publish-github-action.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:66eaaed6b3aa990465764a6f345dba9ecea9de46b6fe1368cbf47c1f47430e1f`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/publish-github-action.yml, line=1, proof_window=None, snippet=name: publish-github-action
15. `high` `security` `.github/workflows/publish-github-action.yml:19`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:86efba9f9d606e4aeea44125827a01e92f9331867c00cc8bd385836bfa4d1933`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish-github-action.yml, line=19, proof_window=None, snippet=- uses: actions/checkout@v3
16. `high` `security` `.github/workflows/publish-vscode.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:a8f0783fc1da6aa00e1777d175c25da56f586eeb17e9a975f700960b1934266e`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/publish-vscode.yml, line=1, proof_window=None, snippet=name: publish-vscode
17. `high` `security` `.github/workflows/publish-vscode.yml:18`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:96682a2349c06cb76fb69053564af53e83bab4049394a7ddedb51671526481c3`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish-vscode.yml, line=18, proof_window=None, snippet=- uses: actions/checkout@v3
18. `high` `security` `.github/workflows/publish.yml:38`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:f3293d5a885c58d3563817ebfeda8a1439ba85887e96fa47961dfe2bf0c1e9d1`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=38, proof_window=None, snippet=- uses: actions/checkout@v3
19. `high` `security` `.github/workflows/publish.yml:75`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:bf31d20ca5c47a24253559da10c0da6e16b4076f6083df67012b9c0e0f7830eb`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=75, proof_window=None, snippet=- uses: actions/checkout@v3
20. `high` `security` `.github/workflows/publish.yml:98`
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
21. `high` `security` `.github/workflows/publish.yml:105`
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
22. `high` `security` `.github/workflows/publish.yml:126`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:9411c41f006a636dfc5ce173e11faef32286b51154440c1d0102a1ab7683aed7`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=126, proof_window=None, snippet=- uses: actions/checkout@v3
23. `high` `security` `.github/workflows/publish.yml:128`
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
24. `high` `security` `.github/workflows/publish.yml:141`
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
25. `high` `security` `.github/workflows/publish.yml:147`
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
26. `high` `security` `.github/workflows/publish.yml:203`
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
27. `high` `security` `.github/workflows/publish.yml:216`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.security-scan.nonblocking`
   Reason: security or proof job is explicitly non-blocking
   Fix: remove the non-blocking override so scan failures stop the pipeline
   Rerun: `just security`
   Fingerprint: `sha256:d47e3533d49d9ed82f7e62355f675ea69286717bf311125caff19f03743e66ca`
   Evidence: detector=ci.security-scan.nonblocking, path=.github/workflows/publish.yml, line=216, proof_window=None, snippet=continue-on-error: false
28. `high` `security` `.github/workflows/publish.yml:251`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:b71e0fca650b27f1bffd0aca60ab558e0306de91de94aa6ffd52a6b2be811c4e`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=251, proof_window=None, snippet=- uses: actions/checkout@v3
29. `high` `security` `.github/workflows/publish.yml:253`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:145b78755ce18c71de9fa3740218fdf8b9cd7b7ecd9cffb4f2111bda15280429`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=253, proof_window=None, snippet=- uses: apple-actions/import-codesign-certs@v2
30. `high` `security` `.github/workflows/publish.yml:262`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.secret.echo-or-debug`
   Reason: secret-bearing workflow step writes sensitive values to logs
   Fix: never echo secrets; pass them directly to trusted binaries and keep shell tracing off
   Rerun: `just security`
   Fingerprint: `sha256:3f6064e4d23d893a109b87d859a4a613be6674882a60f6dc3b060aa6d3cea711`
   Evidence: detector=ci.secret.echo-or-debug, path=.github/workflows/publish.yml, line=262, proof_window=None, snippet=run: echo "${{ secrets.APPLE_API_KEY_PATH }}" > $RUNNER_TEMP/apple-api-key.p8
31. `high` `security` `.github/workflows/publish.yml:270`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:978a7a40e98dd3ca6c5d7a833c86510f13ab95af84d08f6363d203e6064c6f10`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=270, proof_window=None, snippet=uses: azure/login@v2
32. `high` `security` `.github/workflows/publish.yml:276`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:5d18f66b6407f783b44b395894483603bad0e8d2f21cafa6a83adf94c25c5d01`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=276, proof_window=None, snippet=- uses: actions/setup-node@v4
33. `high` `security` `.github/workflows/publish.yml:282`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:5ee1ae160209c9d81dd2c4146cdfe9ebb93cfcb758541c46aef47701dc86a7cb`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=282, proof_window=None, snippet=uses: actions/cache@v4
34. `high` `security` `.github/workflows/publish.yml:390`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:79e9454cf2cb70e24c487a75bd31c4d78d8276bedb127405bb63aa21f64bb175`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=390, proof_window=None, snippet=- uses: actions/upload-artifact@v4
35. `high` `security` `.github/workflows/publish.yml:395`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:62c35d84b8b135c04f836abf9358889f52d5ace0920f5f4bd3a3d6bc7729acf9`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=395, proof_window=None, snippet=- uses: actions/upload-artifact@v4
36. `high` `security` `.github/workflows/publish.yml:410`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:7d92f9989f29a7d74af9363e36524bd5bc58c3e581569829974f29dbf6f387a1`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=410, proof_window=None, snippet=- uses: actions/checkout@v3
37. `high` `security` `.github/workflows/publish.yml:415`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:b8c33cd030f8c254848005a2eb050f56d93049226daecc318a755c21891edfd1`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=415, proof_window=None, snippet=uses: docker/login-action@v3
38. `high` `security` `.github/workflows/publish.yml:422`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:1a764e12026c67c4d75d0504d58676707500c2228a32c13c3cce0ff7f91204db`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=422, proof_window=None, snippet=uses: docker/setup-qemu-action@v3
39. `high` `security` `.github/workflows/publish.yml:425`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:7eb729f3bb94308bfea866cec514d4246361d279b6741015016ffe459d437632`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=425, proof_window=None, snippet=uses: docker/setup-buildx-action@v3
40. `high` `security` `.github/workflows/publish.yml:427`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:a3d8dc7c1cb733b1a9cfddffbf6657b8ac8dba69bc347f166e5af405cf566cd3`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=427, proof_window=None, snippet=- uses: actions/setup-node@v4
41. `high` `security` `.github/workflows/publish.yml:432`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:a248bd0abd65ab26a833ccb50ff62287e18461271e339eba2a043d8bd5e77813`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=432, proof_window=None, snippet=- uses: actions/download-artifact@v4
42. `high` `security` `.github/workflows/publish.yml:437`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:23e7d21f060a1feb9d84740214980c8a1ce768e3f54df91048dfb2a20c15f103`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=437, proof_window=None, snippet=- uses: actions/download-artifact@v4
43. `high` `security` `.github/workflows/publish.yml:442`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:5f072891c0e4efb1f0592f6a8f10ca1fee0c4dec0f45e384eb8dfa572fcb5049`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=442, proof_window=None, snippet=- uses: actions/download-artifact@v4
44. `high` `security` `.github/workflows/publish.yml:447`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:970ca876a6d5bfdd97b08aa9926cc5c9ac68423f84000a3a781b2fc70b031d58`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=447, proof_window=None, snippet=- uses: actions/download-artifact@v4
45. `high` `security` `.github/workflows/publish.yml:461`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:8f7f421470ae31c3cb44aba7b4289ca470e1cf67dec906b6aa940c41564a4992`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/publish.yml, line=461, proof_window=None, snippet=uses: actions/cache@v4
46. `high` `security` `.github/workflows/publish.yml:472`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.artifact.cache.secret-path`
   Reason: workflow stores a secret-bearing path in cache or artifact upload
   Fix: limit the path to build outputs and keep credential files out of caches and artifacts
   Rerun: `just security`
   Fingerprint: `sha256:f47a6de597cac71f693ecd7dfb87ca65070036d3a097c351d3f9212cdaa1a2dd`
   Evidence: detector=ci.artifact.cache.secret-path, path=.github/workflows/publish.yml, line=472, proof_window=None, snippet=mkdir -p ~/.ssh
47. `high` `security` `.github/workflows/publish.yml:473`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.artifact.cache.secret-path`
   Reason: workflow stores a secret-bearing path in cache or artifact upload
   Fix: limit the path to build outputs and keep credential files out of caches and artifacts
   Rerun: `just security`
   Fingerprint: `sha256:cc4cac57a6814401f3c727671204f6803aab89739c6ca5249d64cf95d9a7d77b`
   Evidence: detector=ci.artifact.cache.secret-path, path=.github/workflows/publish.yml, line=473, proof_window=None, snippet=echo "${{ secrets.AUR_KEY }}" > ~/.ssh/id_rsa
48. `high` `security` `.github/workflows/publish.yml:473`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.secret.echo-or-debug`
   Reason: secret-bearing workflow step writes sensitive values to logs
   Fix: never echo secrets; pass them directly to trusted binaries and keep shell tracing off
   Rerun: `just security`
   Fingerprint: `sha256:cd57d1e0db04ee4daa45a02c4f50c1b59912c4fe17ea8b962d3b0d804d8ded67`
   Evidence: detector=ci.secret.echo-or-debug, path=.github/workflows/publish.yml, line=473, proof_window=None, snippet=echo "${{ secrets.AUR_KEY }}" > ~/.ssh/id_rsa
49. `high` `security` `.github/workflows/publish.yml:474`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.artifact.cache.secret-path`
   Reason: workflow stores a secret-bearing path in cache or artifact upload
   Fix: limit the path to build outputs and keep credential files out of caches and artifacts
   Rerun: `just security`
   Fingerprint: `sha256:3031eb0588ba1253284fe56dec04b5ad3d62bd739706fe1e4190e0f6893091ea`
   Evidence: detector=ci.artifact.cache.secret-path, path=.github/workflows/publish.yml, line=474, proof_window=None, snippet=chmod 600 ~/.ssh/id_rsa
50. `high` `security` `.github/workflows/publish.yml:477`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.artifact.cache.secret-path`
   Reason: workflow stores a secret-bearing path in cache or artifact upload
   Fix: limit the path to build outputs and keep credential files out of caches and artifacts
   Rerun: `just security`
   Fingerprint: `sha256:972dd74a409e90a05bf0277482eaeab8b8eb717a1ebe33dcd19521223a270cbc`
   Evidence: detector=ci.artifact.cache.secret-path, path=.github/workflows/publish.yml, line=477, proof_window=None, snippet=ssh-keyscan -H aur.archlinux.org >> ~/.ssh/known_hosts || true
51. `high` `security` `.github/workflows/release-github-action.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:692645fa98bac4549da5ef3022b7ce58f387619c49380a537b131a74b487abbe`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/release-github-action.yml, line=1, proof_window=None, snippet=name: release-github-action
52. `high` `security` `.github/workflows/release-github-action.yml:19`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:7e6bd0d332d739198d3c48baf2648fac2085148c89d8cc7b20a0eed546eeea0b`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/release-github-action.yml, line=19, proof_window=None, snippet=- uses: actions/checkout@v4
53. `high` `security` `.github/workflows/review.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:f51b7902321755231ba74720ee093788a823e26f120cd1bcf3df0e5e11127ac9`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/review.yml, line=1, proof_window=None, snippet=name: review
54. `high` `security` `.github/workflows/triage.yml:23`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:ce7a3dbf1e21e9be193c1ced55409feaf69936003d17e98a3b9a87bbf6467f45`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/triage.yml, line=23, proof_window=None, snippet=run: curl -fsSL https://jekko.ai/install | bash
55. `high` `vibe` `.jekko/plugins/tui-smoke.tsx:680`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `agent`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: product code contains TODO/stub/unimplemented/unreachable placeholder markers
   Fix: replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Rerun: `just fast`
   Fingerprint: `sha256:e2130b8af9682343d1f11353477fd4120c0d2881e1855c0594a5b47086bbe9d3`
   Evidence: .jekko/plugins/tui-smoke.tsx:680 placeholders={{ normal }}
56. `high` `boundary` `.jekko/plugins/tui-smoke.tsx:852`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `agent`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:7f092f7f8a98c98a42e21172735494f3447e3bc7ee2df89c8514b0bb1ef9bff3`
   Evidence: detector=typescript.security.raw-command-sql, path=.jekko/plugins/tui-smoke.tsx, line=852, snippet=title: `${input.label} select dialog`,
57. `high` `security` `.jekko/plugins/tui-smoke.tsx:852`
   Rule: `HLT-023-INPUT-BOUNDARY-GAP`
   Check: `HLT-023-INPUT-BOUNDARY-GAP:security` `hard` confidence `0.88`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `agent`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Matched term: `string sql`
   Reason: input handling risk needs deterministic negative tests
   Fix: replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Rerun: `just security`
   Fingerprint: `sha256:1436350e8988a71cb92219bcdab68faeac0b79721dc32c481a003a050b3bb5fc`
   Evidence: title: `${input.label} select dialog`,
58. `medium` `proof` `Justfile`
   Rule: `HLT-018-PERF-CONCURRENCY-DRIFT`
   Check: `HLT-018-PERF-CONCURRENCY-DRIFT:proof` `soft` confidence `0.76`
   Route: TLR `Verification`, lane `fast`, owner `workspace`
   Docs: `docs/testing.md`
   Reason: `Build speed signals` scored 70 below the standard floor of 85
   Fix: add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Rerun: `just fast`
   Fingerprint: `sha256:a256a7390d4b91a5b0a95d6f092e524c8f4080f27fe2b62e28cf0801343d0fef`
   Evidence: build acceleration markers found, targeted test/build commands found, locked dependency graph present, CI cache hint found
59. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.gitattributes` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:909607d20c55b71fd1fe6044a5c55efe6aecd49a3e88e10fe40a2117e35c0237`
   Evidence: .gitattributes
60. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.husky/check-encrypted-paths` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:ac62996484c8b72de66c291f7129a84326fd5ae689148e14c44f64d087f2f502`
   Evidence: .husky/check-encrypted-paths
61. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `ZYAL_MISSION.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:4d1939e27e91644138333e960c676473c38758a038c135c40a6c6b5c1413354a`
   Evidence: ZYAL_MISSION.md
62. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `ZYAL_WORKFLOW.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:1d425243dccc4dbe80dcf404d46564f2a8be28bdd6a1ab884e12e6380a98e2bf`
   Evidence: ZYAL_WORKFLOW.md
63. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `paper/ZYAL.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:7978b6cbb1ef26087b52e53fcdfd632180a30e7aab292dde4111b6ac7a22f77b`
   Evidence: paper/ZYAL.md
64. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.gitattributes` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:5685ed57c4e04c23e7f38d6f58088747659a19ca2aeab855f958d680acaa8819`
   Evidence: .gitattributes
65. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.husky/check-encrypted-paths` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:d35172328b5fd9b080095b3e892a12782480b89b51c6caac4e6472e46bb559df`
   Evidence: .husky/check-encrypted-paths
66. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `ZYAL_MISSION.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:daaad424f51673b774861eab2cace5944401be29250981467c891597ba8addf8`
   Evidence: ZYAL_MISSION.md
67. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `ZYAL_WORKFLOW.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:b1f1b6198ee11f9fa2e3d5c5fe874c27f6acc54351b079dedd96206e880bbb08`
   Evidence: ZYAL_WORKFLOW.md
68. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `paper/ZYAL.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:3ec7ddf7454e3242a4c32c3c87048830cd943d3e6dff418bc2695293e80ddd0f`
   Evidence: paper/ZYAL.md
69. `high` `ux-qa` `apps/web`
   Rule: `HLT-013-RENDERED-UX-GAP`
   Check: `HLT-013-RENDERED-UX-GAP:ux-qa` `hard` confidence `0.88`
   Route: TLR `Verification and rendered UX`, lane `web`, owner `apps`
   Docs: `docs/testing.md`
   Reason: web surface lacks layered rendered UX QA evidence
   Fix: add Storybook state coverage, Playwright screenshots, visual review or `@jankurai/ux-qa`, accessibility scans, CLS checks, generated mocks, and design tokens
   Rerun: `just ux-qa`
   Fingerprint: `sha256:571d35c2e730a393b782bac14825b197c0543920bb21967079d264ac602ea5b1`
   Evidence: rendered UX QA lane missing
70. `medium` `release` `docs/testing.md`
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
71. `high` `vibe` `github/index.ts:300`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `agent`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: fallback soup detected in product code
   Fix: collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Rerun: `just fast`
   Fingerprint: `sha256:84b6eb14b447dca5ef73be507cf6d8f8dee70ac3f973395a21cf1048c063b813`
   Evidence: github/index.ts:300 return null
72. `high` `vibe` `infra/console.ts:1`
   Check: `HLT-000-SCORE-DIMENSION:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `ops`
   Reason: duplicated product code block detected
   Fix: extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Rerun: `just fast`
   Fingerprint: `sha256:c6cb7aa0947f7627ce6408a79cbaeb81f8afacb65f8a8b20244c65e78ae0a330`
   Evidence: duplicate block also appears at infra/console.ts:1
73. `critical` `security` `infra/console.ts:38`
   Rule: `HLT-010-SECRET-SPRAWL`
   Check: `HLT-010-SECRET-SPRAWL:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: secret-like value or credential material appears in repository text
   Fix: remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Rerun: `just security`
   Fingerprint: `sha256:c1be9a0a5ed8a59458f4e9cf664107f16928421beab1cbc2a3653410979c0324`
   Evidence: password: password.plaintext,
74. `high` `vibe` `packages/app/e2e/todo.spec.ts:6`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ad809fe3003855b59fdcaf777b694b12d77a6a2d6cbc46d23fa1b7401e247dea`
   Evidence: packages/app/e2e/todo.spec.ts:6, future-hostile/dead-language term `todo` appears
75. `high` `test` `packages/app/e2e/todo.spec.ts:9`
   Rule: `HLT-008-FALSE-GREEN-RISK`
   Check: `HLT-008-FALSE-GREEN-RISK:test` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Reason: test code contains disabled, focused, tautological, or snapshot-only proof
   Fix: replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Rerun: `just fast`
   Fingerprint: `sha256:00ca11200ae0e3b02ef06a00f25c63028d67a2c0c630f12ffb4024714e5419ce`
   Evidence: test.skip()
76. `medium` `context` `packages/app/public/apple-touch-icon-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:b92580d4aa262008edfcdda2c7b7af2b6ec1859f08fee86a9aa4739c23d4bd3e`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/app/public/apple-touch-icon-v3.png, line=1, proof_window=None
77. `medium` `context` `packages/app/public/favicon-96x96-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:5848a6e350106d96b9aa17aaae190641e8996964a5520a4ab3403eedd8d894b4`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/app/public/favicon-96x96-v3.png, line=1, proof_window=None
78. `medium` `context` `packages/app/public/favicon-v3.ico:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:88e3bd20cc0842e44555177aa38c216cb477e06d6c49d3e8f27c1765aad09f38`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/app/public/favicon-v3.ico, line=1, proof_window=None
79. `medium` `context` `packages/app/public/favicon-v3.svg:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:25e1b3727a7fa9b9b20ddab12b33092684f1ba80e4e2b05e8bbb401dff8bcf27`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/app/public/favicon-v3.svg, line=1, proof_window=None
80. `high` `stack` `packages/app/public/oc-theme-preload.js`
   Check: `HLT-000-SCORE-DIMENSION:stack` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Reason: runtime code uses a language outside the chosen optimal stack
   Fix: move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Rerun: `just score`
   Fingerprint: `sha256:139c59be93ae16bacd0a8718f1a15dcf6146bda8f4c66065769a29f3c2e62f0a`
   Evidence: packages/app/public/oc-theme-preload.js uses `.js`, Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service
81. `high` `vibe` `packages/app/src/app.tsx:153`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f00a5b87d11d9c5f58522b0663b7cff1d80495c06c12a92b776cd1779b4059fe`
   Evidence: packages/app/src/app.tsx:153, future-hostile/dead-language term `fallback` appears
82. `high` `vibe` `packages/app/src/app.tsx:202`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:87bee8692d4ff9924702f16bb09da03962d82eb21665fb20d30f1ae9856eeca2`
   Evidence: packages/app/src/app.tsx:202, future-hostile/dead-language term `fallback` appears
83. `high` `vibe` `packages/app/src/app.tsx:219`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5f8c905a30bd7917cc5e7fbcb6cba14bbd447fab052944392f5caab5c6d887ca`
   Evidence: packages/app/src/app.tsx:219, future-hostile/dead-language term `fallback` appears
84. `high` `vibe` `packages/app/src/components/dialog-edit-project.tsx:156`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:46b2ebbf4ecee0b0ecfabc3bdf74bb30c4b01c3e55a6f1440ada2bf4117d188d`
   Evidence: packages/app/src/components/dialog-edit-project.tsx:156, future-hostile/dead-language term `fallback` appears
85. `high` `boundary` `packages/app/src/components/dialog-select-directory.tsx:194`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:aa1c8e266a95c8fcad59ead14f67ae918ddbedba0a0d4062898d92d13a8f8218`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/components/dialog-select-directory.tsx, line=194, snippet=if (!scopedInput) return [] as string[]
86. `high` `vibe` `packages/app/src/components/dialog-select-file.tsx:406`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:81f2efa58e6ae22406f18c1f435c7699d4b0769e6cb8a60f372cfb7efa62e2b1`
   Evidence: packages/app/src/components/dialog-select-file.tsx:406, future-hostile/dead-language term `fallback` appears
87. `high` `vibe` `packages/app/src/components/dialog-select-server.tsx:510`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6152370ce8a3db86ad83e70b1f0804f40da319eb048f55a14518506770fddb0a`
   Evidence: packages/app/src/components/dialog-select-server.tsx:510, future-hostile/dead-language term `fallback` appears
88. `high` `vibe` `packages/app/src/components/dialog-select-server.tsx:625`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e54d649b63a6e5c993f66e0d010884d28ad10628b73edbd0a7d7bf37af3a3f83`
   Evidence: packages/app/src/components/dialog-select-server.tsx:625, future-hostile/dead-language term `fallback` appears
89. `high` `vibe` `packages/app/src/components/file-tree.tsx:432`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1434cc9c76e742fa88e37dad2665c794a0889af691c44d4cc79f29dd13d1061d`
   Evidence: packages/app/src/components/file-tree.tsx:432, future-hostile/dead-language term `fallback` appears
90. `high` `vibe` `packages/app/src/components/prompt-input.tsx:1541`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fc57a581c903e0c12f46d82ce702e0608ff7423f095670617c2a7be8a683d6cd`
   Evidence: packages/app/src/components/prompt-input.tsx:1541, future-hostile/dead-language term `fallback` appears
91. `high` `vibe` `packages/app/src/components/prompt-input/image-attachments.tsx:30`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8a081bc1ca1b02bb4cecd3a8289f0fb8abeb58504b271f6b00ae5f8b49bba39b`
   Evidence: packages/app/src/components/prompt-input/image-attachments.tsx:30, future-hostile/dead-language term `fallback` appears
92. `high` `vibe` `packages/app/src/components/prompt-input/slash-popover.tsx:52`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9449d503460ad37bb2b3196f52f753b3233258125338966f8fb85b330a4035b5`
   Evidence: packages/app/src/components/prompt-input/slash-popover.tsx:52, future-hostile/dead-language term `fallback` appears
93. `high` `vibe` `packages/app/src/components/prompt-input/slash-popover.tsx:99`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:450bdc93ad4f5e9a04ea36db3025ff5ec8fded4bcc4b2d1aaffd690446f2a9db`
   Evidence: packages/app/src/components/prompt-input/slash-popover.tsx:99, future-hostile/dead-language term `fallback` appears
94. `high` `vibe` `packages/app/src/components/server/server-row.tsx:81`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6ccd7851ee827896ce1b6c2cf74314ec5879e674e09d329e950b36673c5a2481`
   Evidence: packages/app/src/components/server/server-row.tsx:81, future-hostile/dead-language term `fallback` appears
95. `high` `vibe` `packages/app/src/components/session/session-header.tsx:319`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7a977d76564f5dfb1fd5848875c7385b47dc061ba6e372e86877ee0830141000`
   Evidence: packages/app/src/components/session/session-header.tsx:319, future-hostile/dead-language term `fallback` appears
96. `high` `vibe` `packages/app/src/components/session/session-header.tsx:348`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1bc7d7f4663ff312d02ec86283ce6a857ddc16c4b69c01aec241f3aa7cfeb306`
   Evidence: packages/app/src/components/session/session-header.tsx:348, future-hostile/dead-language term `fallback` appears
97. `high` `vibe` `packages/app/src/components/session/session-sortable-tab.tsx:18`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a964c24d1a62b572ca66d1e0e9716acc2a565f9cd337d5af018399191b20a25f`
   Evidence: packages/app/src/components/session/session-sortable-tab.tsx:18, future-hostile/dead-language term `fallback` appears
98. `high` `vibe` `packages/app/src/components/settings-keybinds.tsx:428`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:244ee11d1ab15750d37b76294d5b21ee8fd1cf7bbd079f5de7b39caf0ccc75cb`
   Evidence: packages/app/src/components/settings-keybinds.tsx:428, future-hostile/dead-language term `fallback` appears
99. `high` `vibe` `packages/app/src/components/settings-models.tsx:89`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2635da50e13bfd5ef6dc6e3441456720824940f168dc9c7931156a3a2380fa72`
   Evidence: packages/app/src/components/settings-models.tsx:89, future-hostile/dead-language term `fallback` appears
100. `high` `vibe` `packages/app/src/components/settings-models.tsx:95`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:227200d980c5ae6dd725c0b5ac8fce9041135f57966aa26c4689545942b12650`
   Evidence: packages/app/src/components/settings-models.tsx:95, future-hostile/dead-language term `fallback` appears
101. `high` `vibe` `packages/app/src/components/settings-providers.tsx:143`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ae64475a11e7a3a02921ef6cb4380c1338d1084a4ba1f749657ca9bd0de8164f`
   Evidence: packages/app/src/components/settings-providers.tsx:143, future-hostile/dead-language term `fallback` appears
102. `high` `vibe` `packages/app/src/components/settings-providers.tsx:159`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f0dfe5fec183ff542bd03404a64223869cfac8d12a3308bbdaec4713539da3e8`
   Evidence: packages/app/src/components/settings-providers.tsx:159, future-hostile/dead-language term `fallback` appears
103. `high` `vibe` `packages/app/src/components/status-popover-body.tsx:306`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:20fbacc46d3813e7a88664ae0f1cb97dbfedb9d98fd2abe5be97f16cfb866882`
   Evidence: packages/app/src/components/status-popover-body.tsx:306, future-hostile/dead-language term `fallback` appears
104. `high` `vibe` `packages/app/src/components/status-popover-body.tsx:359`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5309543a7bcbbbc6f8bd748094e2abc06af21339f83fb2d8127257cad65f648a`
   Evidence: packages/app/src/components/status-popover-body.tsx:359, future-hostile/dead-language term `fallback` appears
105. `high` `vibe` `packages/app/src/components/status-popover-body.tsx:387`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6839b1649a320c5a6308f63fb600711ae21709fc5f3da16c69ac1dcdea6aba8d`
   Evidence: packages/app/src/components/status-popover-body.tsx:387, future-hostile/dead-language term `fallback` appears
106. `high` `vibe` `packages/app/src/components/status-popover.tsx:57`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0c2dae43c1cc8b7ad90f652332eba06bf085c6e7ab8feaf449a891d5c34f56f9`
   Evidence: packages/app/src/components/status-popover.tsx:57, future-hostile/dead-language term `fallback` appears
107. `high` `boundary` `packages/app/src/components/terminal.tsx:563`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:1b8d58e2ff799eecb9cbdadd8efaa3a2add777cc76ffe1bdfb30cf92f34fc2cc`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/components/terminal.tsx, line=563, snippet=const meta = JSON.parse(json) as { cursor?: unknown }
108. `high` `boundary` `packages/app/src/context/global-sync.tsx:54`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:72093552aa05d86fb5dfd8ebf148138a1fbbbb43f13936140fa42cd408b270b3`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=54, snippet=export const loadSessionsQueryKey = (directory: string) => [directory, "loadSessions"] as const
109. `high` `boundary` `packages/app/src/context/global-sync.tsx:56`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:20ee0e420dc727ca5ed60e05c5d1d3b18bc024267a2e042e51cc65029be2e07b`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=56, snippet=export const mcpQueryKey = (directory: string) => [directory, "mcp"] as const
110. `high` `boundary` `packages/app/src/context/global-sync.tsx:64`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9b99e8669fb0c983be896494a3093cf332f4e6acd4202a16559ef478117b9867`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=64, snippet=export const lspQueryKey = (directory: string) => [directory, "lsp"] as const
111. `high` `boundary` `packages/app/src/context/global-sync.tsx:137`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:26afaff865da48e09634a9dcedc75184c75d7f781efbd742cfaf1cc43d935b13`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=137, snippet=return (setGlobalStore as any)(...input)
112. `high` `boundary` `packages/app/src/context/global-sync.tsx:161`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:695085dfe4ccfd6ebda1f02a41650e24c07c7e0bc4097fa3d396cbf1eef8da6c`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=161, snippet=return (setGlobalStore as any)(...input)
113. `high` `boundary` `packages/app/src/context/global-sync/event-reducer.ts:53`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:a622ecef8a7cd82d6c66bb73a13cb52e1135f936da0ee4d79d1eaed3a4e1f3a0`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync/event-reducer.ts, line=53, snippet=const properties = input.event.properties as Project
114. `high` `vibe` `packages/app/src/context/global-sync/utils.ts:33`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1b9156901eeb6a295e668cf9a479de34a5021a9badbae3419be063dc62bd299e`
   Evidence: packages/app/src/context/global-sync/utils.ts:33, future-hostile/dead-language term `deprecated` appears
115. `high` `vibe` `packages/app/src/context/sync.tsx:538`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e8936f5eb301fed22f95b99c9f461d1721767093c32af7adb89cda558bcf5044`
   Evidence: packages/app/src/context/sync.tsx:538, future-hostile/dead-language term `todo` appears
116. `high` `vibe` `packages/app/src/context/sync.tsx:540`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cb7f5a406849bbd35c6a9224220f2fd2acd3aaa4110de2399951b4ddb4df3ed9`
   Evidence: packages/app/src/context/sync.tsx:540, future-hostile/dead-language term `todo` appears
117. `high` `vibe` `packages/app/src/pages/error.tsx:298`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:35efaf8a5891b332dec407e75781646e260561310111a8b00aa22f40b0d917fb`
   Evidence: packages/app/src/pages/error.tsx:298, future-hostile/dead-language term `fallback` appears
118. `high` `boundary` `packages/app/src/pages/layout.tsx:1771`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:7775e3f5d8271de5a2b2bab7a0d1611d33c2fda99e36217d9a10d1d50080a443`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/pages/layout.tsx, line=1771, snippet=return [pageReady(), route().slug, params.id, currentProject()?.worktree, currentDir()] as const
119. `high` `vibe` `packages/app/src/pages/layout.tsx:2091`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cb2be38762c485c7dafecdaaeae169d23329c6464325cecc1dd27f8c86f3a8c0`
   Evidence: packages/app/src/pages/layout.tsx:2091, future-hostile/dead-language term `fallback` appears
120. `high` `vibe` `packages/app/src/pages/layout.tsx:2216`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ec254120c4758014219ccaf50cf5af7e2f74f8bac94a41dc7fcad34682409b0d`
   Evidence: packages/app/src/pages/layout.tsx:2216, future-hostile/dead-language term `fallback` appears
121. `high` `vibe` `packages/app/src/pages/layout.tsx:2464`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8f1bf0133840d9d0457dff66bb1c9ac6142a78ed0234e3369c591cb2b67bb568`
   Evidence: packages/app/src/pages/layout.tsx:2464, future-hostile/dead-language term `fallback` appears
122. `high` `vibe` `packages/app/src/pages/layout/inline-editor.tsx:74`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0f80f0682f354b35b3fe46d79411fbe0a2dad22a8d52259ef41dad001f24edaa`
   Evidence: packages/app/src/pages/layout/inline-editor.tsx:74, future-hostile/dead-language term `fallback` appears
123. `high` `vibe` `packages/app/src/pages/layout/sidebar-items.tsx:229`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:876bc77ccda02b801c13d07867e706284f2a1dbc3e8633361669869f45da4512`
   Evidence: packages/app/src/pages/layout/sidebar-items.tsx:229, future-hostile/dead-language term `fallback` appears
124. `high` `vibe` `packages/app/src/pages/layout/sidebar-items.tsx:314`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ee4cb9102be8920748fb161ffda6edc3b4317024f272b2352d21b95a324b6378`
   Evidence: packages/app/src/pages/layout/sidebar-items.tsx:314, future-hostile/dead-language term `fallback` appears
125. `high` `vibe` `packages/app/src/pages/layout/sidebar-project.tsx:207`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:34f56faf1507ff8fc88a9cd7895b6089df31130cb8251a8972258d210210d623`
   Evidence: packages/app/src/pages/layout/sidebar-project.tsx:207, future-hostile/dead-language term `fallback` appears
126. `high` `vibe` `packages/app/src/pages/layout/sidebar-project.tsx:336`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dc3c2015e08e923f38efc14640a8bec2eab2a5d163ae4406dae2b3578a3794a2`
   Evidence: packages/app/src/pages/layout/sidebar-project.tsx:336, future-hostile/dead-language term `fallback` appears
127. `high` `vibe` `packages/app/src/pages/layout/sidebar-workspace.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:deca055981562b75cb0dd13d54cc64ad37dcad7b76d7db351802f7fd69bf27ce`
   Evidence: packages/app/src/pages/layout/sidebar-workspace.tsx:101, future-hostile/dead-language term `fallback` appears
128. `high` `vibe` `packages/app/src/pages/layout/sidebar-workspace.tsx:110`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9dd1620054503c108bf8f8a98827231d384dd289d4ed2657f9e1c61c82b495d7`
   Evidence: packages/app/src/pages/layout/sidebar-workspace.tsx:110, future-hostile/dead-language term `fallback` appears
129. `high` `vibe` `packages/app/src/pages/layout/sidebar-workspace.tsx:380`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0e6b6700281d45b6c484766b516dfc3895b905f4594c51f4678841d6ed5b22d2`
   Evidence: packages/app/src/pages/layout/sidebar-workspace.tsx:380, future-hostile/dead-language term `fallback` appears
130. `high` `boundary` `packages/app/src/pages/session.tsx:303`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:16925b31169b10105c5c02209df956028ae8792cbf83b99ead51ab73b17afef2`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/pages/session.tsx, line=303, snippet=() => [input.sessionID(), input.messagesReady()] as const,
131. `high` `boundary` `packages/app/src/pages/session.tsx:608`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:137e7ae53ff56ae2c34572fd538c5b9d26d0b1f56dd53dacd8bdda3b6664ffca`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/pages/session.tsx, line=608, snippet=queryKey: [...vcsKey(), mode] as const,
132. `high` `boundary` `packages/app/src/pages/session.tsx:765`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9e3c4a9153017ba1132228ed9a75ed178ad9b5b50d74b2f3dc1caf7a33e5db66`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/pages/session.tsx, line=765, snippet=() => [sdk.directory, params.id] as const,
133. `high` `vibe` `packages/app/src/pages/session/composer/session-composer-region.tsx:176`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:02bbfe431d83c8509c22805561be0fb9094b3d9e1c9b11ed1b1caca377079ae7`
   Evidence: packages/app/src/pages/session/composer/session-composer-region.tsx:176, future-hostile/dead-language term `fallback` appears
134. `high` `vibe` `packages/app/src/pages/session/composer/session-composer-region.tsx:251`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:12a92d88ca968d06a21900a12288aef4dd7cda071457d1cab75fba29bda0c9a1`
   Evidence: packages/app/src/pages/session/composer/session-composer-region.tsx:251, future-hostile/dead-language term `fallback` appears
135. `high` `vibe` `packages/app/src/pages/session/composer/session-question-dock.tsx:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3173179f796568f5a3eab8bb222ae6c65fc5ee5b2abd274736e6414b333454bc`
   Evidence: packages/app/src/pages/session/composer/session-question-dock.tsx:20, future-hostile/dead-language term `fallback` appears
136. `high` `vibe` `packages/app/src/pages/session/composer/session-question-dock.tsx:473`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:42f39a1fcb72273efdefe86cc5d741426f409f78343c5bb2e3a1168bae537b08`
   Evidence: packages/app/src/pages/session/composer/session-question-dock.tsx:473, future-hostile/dead-language term `fallback` appears
137. `high` `vibe` `packages/app/src/pages/session/composer/session-question-dock.tsx:494`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:df0e9ed1cd9ede99eeb02399b8983b9c1438365caabcbeed7c5385c3436b2502`
   Evidence: packages/app/src/pages/session/composer/session-question-dock.tsx:494, future-hostile/dead-language term `fallback` appears
138. `high` `vibe` `packages/app/src/pages/session/composer/session-question-dock.tsx:541`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:24aecdafa6fb1f5d9fa221525c06d18f7655c37b7b4dee4b9b5f5485a00caf7c`
   Evidence: packages/app/src/pages/session/composer/session-question-dock.tsx:541, future-hostile/dead-language term `placeholder` appears
139. `high` `vibe` `packages/app/src/pages/session/message-timeline.tsx:633`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:32765bf7eddd3f2e5da6e94a96d83cde1838ff59ac26b3ce78d058b67517a238`
   Evidence: packages/app/src/pages/session/message-timeline.tsx:633, future-hostile/dead-language term `fallback` appears
140. `high` `vibe` `packages/app/src/pages/session/message-timeline.tsx:781`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8898881be341a979dd3babaa85ec2cabf5b276a689c31da5824e827fa7a8f0d9`
   Evidence: packages/app/src/pages/session/message-timeline.tsx:781, future-hostile/dead-language term `fallback` appears
141. `high` `vibe` `packages/app/src/pages/session/message-timeline.tsx:943`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:903fee43da1c1e79b01b423edc3e04bfaa9944323e235aca1362af5263b5e09c`
   Evidence: packages/app/src/pages/session/message-timeline.tsx:943, future-hostile/dead-language term `fallback` appears
142. `high` `vibe` `packages/app/src/pages/session/session-side-panel.tsx:396`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6380518535b6d390ac318689552ffe5c0e6b6097d02c7064595cf1df10842a17`
   Evidence: packages/app/src/pages/session/session-side-panel.tsx:396, future-hostile/dead-language term `fallback` appears
143. `high` `vibe` `packages/app/src/pages/session/terminal-panel.tsx:232`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9cc19bd42a214d5280c9c73512e45733d6819438b70530ae774b26437cac7f02`
   Evidence: packages/app/src/pages/session/terminal-panel.tsx:232, future-hostile/dead-language term `fallback` appears
144. `high` `boundary` `packages/app/src/sst-env.d.ts:3`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:a7d96e167dad5d0bd88d22c3176120ce261345fc4cc7399e9aaa9de7f6585467`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/app/src/sst-env.d.ts, line=3, snippet=/* eslint-disable */
145. `high` `boundary` `packages/app/sst-env.d.ts:3`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:8f176df10e440a1f809e557b07678a9196114d59f90207fa4102632fed306323`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/app/sst-env.d.ts, line=3, snippet=/* eslint-disable */
146. `high` `security` `packages/app/vite.config.ts:25`
   Rule: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR`
   Check: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `websec.vite.public-dev-server`
   Reason: Vite dev-server exposure can disclose source or enable host-header and CORS abuse
   Fix: bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Rerun: `just security`
   Fingerprint: `sha256:46c8c2922de7de7a54ad38fc5ef7d1a8bc12f6da8bd3b347925dd845421281b4`
   Evidence: detector=websec.vite.public-dev-server, path=packages/app/vite.config.ts, line=25, proof_window=None, snippet=host: "0.0.0.0",
147. `high` `security` `packages/app/vite.config.ts:26`
   Rule: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR`
   Check: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `websec.vite.public-dev-server`
   Reason: Vite dev-server exposure can disclose source or enable host-header and CORS abuse
   Fix: bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Rerun: `just security`
   Fingerprint: `sha256:66a050cfbea94639a7e2691eb461a02755c187a370a1daaf491b62c2c6934849`
   Evidence: detector=websec.vite.public-dev-server, path=packages/app/vite.config.ts, line=26, proof_window=None, snippet=allowedHosts: true,
148. `medium` `context` `packages/console/app/public/apple-touch-icon-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:ecb328c8686f399df58184973a497e1f6a2b6631d452979e24044d9511755d8a`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/console/app/public/apple-touch-icon-v3.png, line=1, proof_window=None
149. `medium` `context` `packages/console/app/public/favicon-96x96-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:1f6316b05ffd3c838acd3b8530130f4d31b676d698bd1ae6fb61dea43e78c71f`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/console/app/public/favicon-96x96-v3.png, line=1, proof_window=None
150. `medium` `context` `packages/console/app/public/favicon-v3.ico:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:45457aacabc46bf555d16cb3dac5b50da9fdbcdddfd72048e06bd213c676e776`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/console/app/public/favicon-v3.ico, line=1, proof_window=None
151. `medium` `context` `packages/console/app/public/favicon-v3.svg:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:d7ae313cd7aed47ff81858df75dfe642652d5cc0af8c0abca5557fc9347dca29`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/console/app/public/favicon-v3.svg, line=1, proof_window=None
152. `high` `vibe` `packages/console/app/src/component/email-signup.tsx:34`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:465b53c8ee48bd1e8b2d7fa1bae30e73d100ba381f10a2f948e2cfce397e3b8a`
   Evidence: packages/console/app/src/component/email-signup.tsx:34, future-hostile/dead-language term `placeholder` appears
153. `high` `boundary` `packages/console/app/src/component/header.tsx:90`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:f5f138780d32f16f9ecbbf29c32199e11f59585168f2f7acde2025b645968d1f`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/component/header.tsx, line=90, snippet=const logoElement = (event.currentTarget as HTMLElement).querySelector("a")
154. `high` `boundary` `packages/console/app/src/i18n/de.ts:529`
   Rule: `HLT-019-STREAMING-RUNTIME-DRIFT`
   Check: `HLT-019-STREAMING-RUNTIME-DRIFT:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/streaming.md`
   Reason: queue or streaming runtime client appears outside the declared adapter boundary
   Fix: move Kafka/Tansu/Iggy/Fluvio/NATS/Redis-stream clients behind `crates/adapters/queues` or document a brownfield exception with owner, expiry, and migration path
   Rerun: `just fast`
   Fingerprint: `sha256:c91eecbc733dc2980323454247dd9e06e39e8e37813d9ec96962fb8499f8d2a8`
   Evidence: streaming client marker `nats` appears outside `crates/adapters/queues`
155. `high` `boundary` `packages/console/app/src/routes/bench/[id].tsx:85`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:13ab112cca18316a5ec6985bd92f96011d52b7fa7524f0aca0c2587859e10e4f`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/bench/[id].tsx, line=85, snippet=const parsed = JSON.parse(rows[0].result) as BenchmarkResult
156. `high` `vibe` `packages/console/app/src/routes/bench/[id].tsx:112`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4af6994e3f861a8cde695729cd971a2a044d8cf8064b5174ef42de13db651fb8`
   Evidence: packages/console/app/src/routes/bench/[id].tsx:112, future-hostile/dead-language term `fallback` appears
157. `high` `boundary` `packages/console/app/src/routes/bench/index.tsx:19`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:026a9ab99155274ed6b7bed9cf0909485b1bb86693f26ab2626034f1c66800db`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/bench/index.tsx, line=19, snippet=const parsed = JSON.parse(row.result) as BenchmarkResult
158. `high` `vibe` `packages/console/app/src/routes/bench/index.tsx:73`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:91ab132cf6adbd52f65a3ffbcce84fa890248b5ca0e2211ac8b403d8efcb687c`
   Evidence: packages/console/app/src/routes/bench/index.tsx:73, future-hostile/dead-language term `fallback` appears
159. `high` `boundary` `packages/console/app/src/routes/black/index.tsx:19`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:aba17699f10faefb396f86cc99622e86cf37ef139999833774f1caa6c1e55cca`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/black/index.tsx, line=19, snippet=const [selected, setSelected] = createSignal<string | null>((params.plan as string) || null)
160. `high` `vibe` `packages/console/app/src/routes/black/index.tsx:52`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9769d8f11ef60cea0db4b7c0327bc00cd1e648da72cd99b379995542f6b72ff8`
   Evidence: packages/console/app/src/routes/black/index.tsx:52, future-hostile/dead-language term `fallback` appears
161. `high` `vibe` `packages/console/app/src/routes/black/subscribe/[plan].tsx:183`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:022b17f890ac770c69b805f74062ddb44fed63803e2971a10bdfb2290fe3a28c`
   Evidence: packages/console/app/src/routes/black/subscribe/[plan].tsx:183, future-hostile/dead-language term `fallback` appears
162. `high` `boundary` `packages/console/app/src/routes/black/subscribe/[plan].tsx:279`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:bc90c05deb27d575c37cfb52a697f59fdca3d4d22a82315b9ca4506d0997e741`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/black/subscribe/[plan].tsx, line=279, snippet=const planData = plansMap[(params.plan as PlanID) ?? "20"] ?? plansMap["20"]
163. `high` `vibe` `packages/console/app/src/routes/black/subscribe/[plan].tsx:393`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6def4718763a28a3239afad0901b54d23950171f74885b76ee21bec2ade1ab21`
   Evidence: packages/console/app/src/routes/black/subscribe/[plan].tsx:393, future-hostile/dead-language term `fallback` appears
164. `high` `boundary` `packages/console/app/src/routes/enterprise/index.tsx:27`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:adf44fc353419cd265f5e0395f41870f415b18c49f09d00e4f2dcd2ab102a269`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/enterprise/index.tsx, line=27, snippet=const target = e.target as HTMLInputElement | HTMLTextAreaElement
165. `high` `boundary` `packages/console/app/src/routes/enterprise/index.tsx:61`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:39a1d6b95560bae013843d83d7febf32f9163d1cf91411e55071a67c3537f631`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/enterprise/index.tsx, line=61, snippet=const data = (await response.json().catch(() => null)) as { error?: string } | null
166. `high` `vibe` `packages/console/app/src/routes/enterprise/index.tsx:185`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:788dd2540ec5563d2da6a19a888246d2bac40969915567d2b74897022a18ed9e`
   Evidence: packages/console/app/src/routes/enterprise/index.tsx:185, future-hostile/dead-language term `placeholder` appears
167. `high` `vibe` `packages/console/app/src/routes/enterprise/index.tsx:197`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c2c67fec8830196546b5e94746837e3b9e3ac822551a7d679198dc0ec28660d8`
   Evidence: packages/console/app/src/routes/enterprise/index.tsx:197, future-hostile/dead-language term `placeholder` appears
168. `high` `vibe` `packages/console/app/src/routes/enterprise/index.tsx:208`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6d9ac9f81867a68aa1418e53caec018eaa741abed9ff9aa79b38b0bab5280ad4`
   Evidence: packages/console/app/src/routes/enterprise/index.tsx:208, future-hostile/dead-language term `placeholder` appears
169. `high` `vibe` `packages/console/app/src/routes/enterprise/index.tsx:220`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3a8330d0f64f187da3585c02d7f96c2e4ee71aa8bdab8392f49658cd38ae339c`
   Evidence: packages/console/app/src/routes/enterprise/index.tsx:220, future-hostile/dead-language term `placeholder` appears
170. `high` `vibe` `packages/console/app/src/routes/enterprise/index.tsx:231`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1b850d7b53e38fbe96d3e438f090a47a56fd93db01bae97337b696ee0722f1b6`
   Evidence: packages/console/app/src/routes/enterprise/index.tsx:231, future-hostile/dead-language term `placeholder` appears
171. `high` `vibe` `packages/console/app/src/routes/enterprise/index.tsx:243`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ae8a3d7fd923312c74f744aa0e4f9f412059deebe81d276ceb4d6c3867fc6abc`
   Evidence: packages/console/app/src/routes/enterprise/index.tsx:243, future-hostile/dead-language term `placeholder` appears
172. `high` `vibe` `packages/console/app/src/routes/workspace-picker.tsx:108`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:389f1fa46e91b4a1a6b572efa28489046bc1dd32d9b05a74c594072b54502434`
   Evidence: packages/console/app/src/routes/workspace-picker.tsx:108, future-hostile/dead-language term `placeholder` appears
173. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:160`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:62a79c0674e9510715ea8b6f960c63cef473b994134e323f326e44dab7b0abd4`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:160, future-hostile/dead-language term `fallback` appears
174. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:174`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d9603b8b010141d9d5d80d59288df158fc6276ad803c7afc28af8c925d86ce42`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:174, future-hostile/dead-language term `placeholder` appears
175. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:204`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:86ba7c9944e74379f89baf582246d8fe351f410d692ae96f262f1994a5e40bde`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:204, future-hostile/dead-language term `fallback` appears
176. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:222`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d25e7013c293853e3fc7b9b8bfc9ab3a4ec7895275d012032b28460d87ca751c`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:222, future-hostile/dead-language term `fallback` appears
177. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:78`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:85e6be49cac20ec6b95f8ac2c75f357a4813a6e0731cfa51017507126aeef490`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:78, future-hostile/dead-language term `fallback` appears
178. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:87`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5404ffbf1eeb1e45e358e29775605a4731197e825bcb573f3a0ee4a1762f2749`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:87, future-hostile/dead-language term `placeholder` appears
179. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:116`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:04de128f11f672922cc596b923572536512b3bc31d8816533f3a0f5c933c5f3f`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:116, future-hostile/dead-language term `fallback` appears
180. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/redeem-section.tsx:54`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9e1b4f365e1477888a298cd0aac1d22a8e019ca72a9c831a85d3d4d76f273d95`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/redeem-section.tsx:54, future-hostile/dead-language term `placeholder` appears
181. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/reload-section.tsx:109`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:406c15a7ba56536347f3fbac8f1477f863d18d3868cc50d70794af218013a657`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/reload-section.tsx:109, future-hostile/dead-language term `fallback` appears
182. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/index.tsx:50`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cbcd6a8e20cfd6a6605c8383311cde36e941652a002eaae86a10ee4934eeba99`
   Evidence: packages/console/app/src/routes/workspace/[id]/index.tsx:50, future-hostile/dead-language term `fallback` appears
183. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:95`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2dd65bb2cc661f7886133aa6d1aca374ed1323678481f430abe4dd8defa3c284`
   Evidence: packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:95, future-hostile/dead-language term `placeholder` appears
184. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:115`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1af77b52b47bb01339606d93f495a6f359e8032dee6a4b5d669b925ce93cc2ce`
   Evidence: packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:115, future-hostile/dead-language term `fallback` appears
185. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:140`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:94e18cf5b0311bc32f92ee4c05036d8d64d099469a12ccd60b9e8fc817a40c61`
   Evidence: packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:140, future-hostile/dead-language term `fallback` appears
186. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:152`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1cb654cca9716a17b44f9eb4c03f22b5a651317502915ead5560ab8d261ad9fd`
   Evidence: packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:152, future-hostile/dead-language term `fallback` appears
187. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:158`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:47a7d964703d222dd8e458d2b09175c0bb82c0dce3d782ac48b7e46665f6f92d`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:158, future-hostile/dead-language term `fallback` appears
188. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:167`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ee5a710e4917d78d9d8596aa13c20b710c217d6b46cc476ebc1822941f07531f`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:167, future-hostile/dead-language term `fallback` appears
189. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:173`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:157e0e9e9646f1fcfd5691819ffe7fcc47927e3462a11c388138a79c0246dc9b`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:173, future-hostile/dead-language term `placeholder` appears
190. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:183`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:572d79d8854250daa2421cf1deed94b5d8d0db09f5f10f89c17e18b281a2ed5c`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:183, future-hostile/dead-language term `fallback` appears
191. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:297`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9b65e06d3ea16e71dfa43a4afddd0158b6621988f00d21eed5076ba11b4ed1c4`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:297, future-hostile/dead-language term `placeholder` appears
192. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:316`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8a73ad4532442d44c49d8dad99a903eb3df537fa4fea84a1facbf5b9ba88c598`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:316, future-hostile/dead-language term `placeholder` appears
193. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/new-user-section.tsx:77`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d0770c0b2563f8c35cb4fb83c0e60ca994ad3b800b65f00e40c8c0baaa4c17b3`
   Evidence: packages/console/app/src/routes/workspace/[id]/new-user-section.tsx:77, future-hostile/dead-language term `fallback` appears
194. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:86b4e5da23c717722639788c4eb13da47582a69581a44fdec39bfdc94876db27`
   Evidence: packages/console/app/src/routes/workspace/[id]/provider-section.tsx:101, future-hostile/dead-language term `fallback` appears
195. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx:109`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a62036e7651e328fe548a7949179a0c379da95e18b744d96059ac1085dc196b1`
   Evidence: packages/console/app/src/routes/workspace/[id]/provider-section.tsx:109, future-hostile/dead-language term `placeholder` appears
196. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx:129`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:45d61d54102c27f2188288bd89eb51016d086936310797807786bc69cbc2fb73`
   Evidence: packages/console/app/src/routes/workspace/[id]/provider-section.tsx:129, future-hostile/dead-language term `fallback` appears
197. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx:132`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0b49f989fa1dfd6e8cf8a1ab5b22edaae4132cfd05d43fd44694dce4cbf9f728`
   Evidence: packages/console/app/src/routes/workspace/[id]/provider-section.tsx:132, future-hostile/dead-language term `fallback` appears
198. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/settings/settings-section.tsx:88`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:adc696a80c995db96f8e288be741986e966dace02eb19401660f2ea88720f2f7`
   Evidence: packages/console/app/src/routes/workspace/[id]/settings/settings-section.tsx:88, future-hostile/dead-language term `fallback` appears
199. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/usage/graph-section.tsx:544`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6176a3c48ee2b2572f1a2009f59d511a638b04ba566e34c4a265bcdd618f0af7`
   Evidence: packages/console/app/src/routes/workspace/[id]/usage/graph-section.tsx:544, future-hostile/dead-language term `fallback` appears
200. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:83`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ac2eedc627d3d0559eb7530359df879c31b1538323a12122788269b6033a5547`
   Evidence: packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:83, future-hostile/dead-language term `fallback` appears
201. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:178`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0dacdaadaa32e709567e91835dce9c18079dc8b382c4027e45e7116d0cceb441`
   Evidence: packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:178, future-hostile/dead-language term `fallback` appears
202. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:301`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:50aab5c7a871de83ff84a73fddf276fd8e9472c29175f6f7b27927ae8b231ce2`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/anthropic.ts, line=301, snippet=const inp = (p as any).input
203. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:328`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:7f0deae15d153e670cfbcb0d5b67d344f7ef0258dab6f41f73154cc0e944294b`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/anthropic.ts, line=328, snippet=parameters: (t as any).input_schema,
204. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:469`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:56375275a847c0801540144b0b1e39d404df3ae09cdf15f7305d4c43134db33e`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/anthropic.ts, line=469, snippet=input_schema: (t as any).function.parameters,
205. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:528`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:4b8d79927edb88e690c9f26d7453df61ad00f64d2fc80aaf0cb31b9d51cec0e3`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/anthropic.ts, line=528, snippet=const inp = (b as any).input
206. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:554`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:54e9ce9a097fd3457dd929d76234f630e76e911949b37c9b1cdc06ce49b354a1`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/anthropic.ts, line=554, snippet=const pt = typeof (u as any).input_tokens === "number" ? (u as any).input_tokens : undefined
207. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:558`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:7d13a44b82641ded27f5d3ea9a0674ebea37dfe1c7d0c146dde6051b0cd09db8`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/anthropic.ts, line=558, snippet=typeof (u as any).cache_read_input_tokens === "number" ? (u as any).cache_read_input_tokens : undefined
208. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:609`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:6d0c6d11279afaaee5c3ee2b5b333fab0c409927ae086e0f72b44db6b0be15f9`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/anthropic.ts, line=609, snippet=input = parsed === undefined ? (tc as any).function.arguments : parsed
209. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/google.ts:50`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9e89c29b1934aa0c87b6d89179771e163f8c75c26ac46e57451964b28ae7ba54`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/google.ts, line=50, snippet=json = JSON.parse(chunk.slice(6)) as { usageMetadata?: Usage }
210. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts:50`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:04a8cbccc8977609f6d732bd489815c373948aef8cd5bfb2c21ab7e650879131`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai-compatible.ts, line=50, snippet=json = JSON.parse(chunk.slice(6)) as { usage?: Usage }
211. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts:344`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:1a3b19001d4d3f617f26fd62d9dd86b3cd72d25cd0f61d2fdd1dcc1d399addda`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai-compatible.ts, line=344, snippet=const inp = (b as any).input
212. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:35`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:860dc026bc42f2d0d9d4a379affc44772c744789a800f7aa819375b18f39e54b`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=35, snippet=json = JSON.parse(data.slice(6)) as { response?: { usage?: Usage } }
213. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:69`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:aa1d6a566c997b94cda9902e5e9530dbc51068ff8a4bb1fb87dfa293661ed6e3`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=69, snippet=if ((p as any).type === "input_image" && (p as any).image_url)
214. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:132`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:a21c244c0bb3779d5f942373a80cc425fb130c03667a7acfe7af7fe92f8e3d66`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=132, snippet=if (((p as any).type === "text" || (p as any).type === "input_text") && typeof (p as any).text === "string")
215. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:208`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:ac21594b4051dfe1b9e0774c892ed65ae5b57e8329f5a4b932e1e0d50618febb`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=208, snippet=return { type: "input_text", text: (p as any).text }
216. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:210`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:29beb419a65d09ea7c4dc819107474f01f1eaed8ecd314fcc1a6a0800534fb17`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=210, snippet=return { type: "input_image", image_url: (p as any).image_url }
217. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:214`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:cd842fad042392b7a9a91871cece9d1df2bb50e4816d55d1bb1570d3762d35fe`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=214, snippet=return { type: "input_image", image_url: { url: (s as any).url } }
218. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:262`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:4fbabe2608fc0a57f3fb737a0883b7762a02c48e37e62d04ab68fc4833d82086`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=262, snippet=input.push({ type: "function_call", call_id: (tc as any).id, name, arguments: args })
219. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:271`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9dc751ceee974c5be1302f0a29c56a2e1e191b12410f1c1083d486f4ca1e55af`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=271, snippet=input.push({ type: "function_call_output", call_id: (m as any).tool_call_id, output: out })
220. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:373`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:26d3abb8cb7a1de06d3412d2dcbd613d51d93d20e4415c537bbab81b997c4fa8`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=373, snippet=const pt = typeof (u as any).input_tokens === "number" ? (u as any).input_tokens : undefined
221. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:376`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:a6563e6b3cd1a51e7920e0a69dd333a8122020ad56fdf7838698eb0c58f510dd`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/app/src/routes/zen/util/provider/openai.ts, line=376, snippet=const cached = (u as any).input_tokens_details?.cached_tokens
222. `high` `boundary` `packages/console/app/sst-env.d.ts:3`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:de30d85b4aaa417a077aad66c4d144a3127b7c68bd0a81b7626df2b9a4e98e41`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/app/sst-env.d.ts, line=3, snippet=/* eslint-disable */
223. `high` `security` `packages/console/app/vite.config.ts:19`
   Rule: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR`
   Check: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `websec.vite.public-dev-server`
   Reason: Vite dev-server exposure can disclose source or enable host-header and CORS abuse
   Fix: bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Rerun: `just security`
   Fingerprint: `sha256:3e5e9531dcd9cd2e65fb7d20b43a6040e308e554b7cb763f53158abf4c1715eb`
   Evidence: detector=websec.vite.public-dev-server, path=packages/console/app/vite.config.ts, line=19, proof_window=None, snippet=allowedHosts: true,
224. `high` `data` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql:10`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:2f5a090506d7f109a01da3e7f8b8e9c1dc8af573178990ec7dbbc50848462fd8`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=ALTER TABLE `user` DROP COLUMN `sub_monthly_usage`
225. `high` `data` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql:11`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:39f99eed346a06ee5844f69e1318d4687f2f045a802102ee414f12316de4eca4`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=ALTER TABLE `user` DROP COLUMN `sub_time_interval_usage_updated`
226. `high` `boundary` `packages/console/core/script/lookup-user.ts:260`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:4978fe62461800382f915d59aaeca72f4935ba5e2fe888fead7cb8fb5ab0119f`
   Evidence: detector=typescript.types.any-boundary, path=packages/console/core/script/lookup-user.ts, line=260, snippet=inputTokens: null as any,
227. `high` `boundary` `packages/console/core/src/user.ts:146`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:318a20a393d3673ec45038cef779a38a250bfa1c9a140079a658fa6ab308e2f7`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/core/src/user.ts, line=146, snippet=// @ts-ignore
228. `high` `boundary` `packages/console/core/sst-env.d.ts:3`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:4225707131f28dc69f4a5f3f31e7fb7e2d94565d011122a7c6366e37e7093292`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/core/sst-env.d.ts, line=3, snippet=/* eslint-disable */
229. `high` `boundary` `packages/console/function/src/auth.ts:100`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:99390bbbcc3cf7b99e0f36212335487ccd90ce103e97107e4b5694862a98c587`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/function/src/auth.ts, line=100, snippet=// @ts-ignore
230. `high` `boundary` `packages/console/function/sst-env.d.ts:3`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:9e186db88771fb48fc57f6754c55932495a8ecc1dfd4fb84e1535435be16f4a0`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/function/sst-env.d.ts, line=3, snippet=/* eslint-disable */
231. `high` `boundary` `packages/console/mail/emails/components.tsx:1`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:b65483cc1cac050b4e22846b55df3092fb10957ca26565a8652e4dc9bbe4f17e`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/mail/emails/components.tsx, line=1, snippet=// @ts-nocheck
232. `high` `boundary` `packages/console/mail/emails/styles.ts:1`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:aed31ac272ebf925fc42d27bcd5238537f5246f0453ca6857505accfca1a61de`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/mail/emails/styles.ts, line=1, snippet=// @ts-nocheck
233. `medium` `context` `packages/desktop/scripts/copy-bundles.ts:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:6b3431f1dfb46b9690befad8fe59f268d1ca660eb356b1f50fdb87a8da657d5a`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/desktop/scripts/copy-bundles.ts, line=1, proof_window=None, snippet=#!/usr/bin/env bun
234. `medium` `context` `packages/desktop/scripts/copy-icons.ts:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:f24319c9b04ac3c7994f9f735c8c38bbc21cd1bbf47ca9e16b93b33446dcbae2`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/desktop/scripts/copy-icons.ts, line=1, proof_window=None, snippet=#!/usr/bin/env bun
235. `medium` `context` `packages/docs/favicon-v3.svg:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:b51232a21dc66e183c1997bfa080da24e0313bef3900cca8cf9091d17956532d`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/docs/favicon-v3.svg, line=1, proof_window=None
236. `medium` `context` `packages/enterprise/public/apple-touch-icon-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:902c057ae91007f73618bd099cdb5af1647e098344abde746faede12d27e1132`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/enterprise/public/apple-touch-icon-v3.png, line=1, proof_window=None
237. `medium` `context` `packages/enterprise/public/favicon-96x96-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:0204e0ec20d87b1b4fc507f25aaf1e3a2c2389f93a20cb5605433f43376d1263`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/enterprise/public/favicon-96x96-v3.png, line=1, proof_window=None
238. `medium` `context` `packages/enterprise/public/favicon-v3.ico:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:9511708b28140e63462fdf9e7948a1df0ca4eb59f2bd337e5c6cfcaedeb3b51c`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/enterprise/public/favicon-v3.ico, line=1, proof_window=None
239. `medium` `context` `packages/enterprise/public/favicon-v3.svg:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:a58e78076cfc302d4b346d43eda822dac8391c72ee1f28ed4c66a12302204ecb`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/enterprise/public/favicon-v3.svg, line=1, proof_window=None
240. `high` `vibe` `packages/enterprise/src/routes/share/[shareID].tsx:124`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c24dcd9adf353a8a73cf0ea4c180b37987d609bc77c5b6d5b104d5645580d0d6`
   Evidence: packages/enterprise/src/routes/share/[shareID].tsx:124, future-hostile/dead-language term `fallback` appears
241. `high` `security` `packages/enterprise/vite.config.ts:30`
   Rule: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR`
   Check: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `websec.vite.public-dev-server`
   Reason: Vite dev-server exposure can disclose source or enable host-header and CORS abuse
   Fix: bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Rerun: `just security`
   Fingerprint: `sha256:108a47bfce5730353c23f420a9c95e6ee9fb947b81e579b50d3e0f9b9cd5cc05`
   Evidence: detector=websec.vite.public-dev-server, path=packages/enterprise/vite.config.ts, line=30, proof_window=None, snippet=host: "0.0.0.0",
242. `high` `security` `packages/enterprise/vite.config.ts:31`
   Rule: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR`
   Check: `HLT-039-WEB-SECURITY-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `websec.vite.public-dev-server`
   Reason: Vite dev-server exposure can disclose source or enable host-header and CORS abuse
   Fix: bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Rerun: `just security`
   Fingerprint: `sha256:63aa6a36dcae77e7a0e43ae8604b85535c79a910819689dbd22b1794127b0d39`
   Evidence: detector=websec.vite.public-dev-server, path=packages/enterprise/vite.config.ts, line=31, proof_window=None, snippet=allowedHosts: true,
243. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:30`
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
244. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:40`
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
245. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:48`
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
246. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:70`
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
247. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:82`
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
248. `high` `data` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql:92`
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
249. `high` `data` `packages/jekko/migration/20260228203230_blue_harpoon/migration.sql:21`
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
250. `high` `data` `packages/jekko/migration/20260323234822_events/migration.sql:17`
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
251. `high` `data` `packages/jekko/migration/20260410174513_workspace-name/migration.sql:15`
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
252. `high` `data` `packages/jekko/migration/20260410174513_workspace-name/migration.sql:19`
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
253. `high` `data` `packages/jekko/migration/20260413175956_chief_energizer/migration.sql:11`
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
254. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:13`
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
255. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:16`
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
256. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:17`
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
257. `high` `data` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql:18`
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
258. `high` `data` `packages/jekko/migration/20260507054800_memory_os/migration.sql:21`
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
259. `high` `data` `packages/jekko/migration/20260507054800_memory_os/migration.sql:42`
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
260. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:3`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:a378c3c03d4282c3db3d80b145be738685fba157bd8b8644acfca705bc97c87c`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`root_session_id` text NOT NULL REFERENCES `session`(`id`) ON DELETE cascade,
261. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:4`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:4268dedd00f7cc98fd330c818f664578adaa307d69da2d5bf579fc8ad58938a3`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`active_session_id` text NOT NULL REFERENCES `session`(`id`) ON DELETE cascade,
262. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:25`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:48f69635f3e1f359ee2e810f3c9dadff9241bae85e847676a6dce3fc8be9d993`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`run_id` text NOT NULL REFERENCES `daemon_run`(`id`) ON DELETE cascade,
263. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:27`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:7b1b4fd75f2fdfc605750b925ed051ed6b62480dc609877e6620a623424bbc51`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`session_id` text NOT NULL REFERENCES `session`(`id`) ON DELETE cascade,
264. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:42`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:48f69635f3e1f359ee2e810f3c9dadff9241bae85e847676a6dce3fc8be9d993`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`run_id` text NOT NULL REFERENCES `daemon_run`(`id`) ON DELETE cascade,
265. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:54`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:48f69635f3e1f359ee2e810f3c9dadff9241bae85e847676a6dce3fc8be9d993`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`run_id` text NOT NULL REFERENCES `daemon_run`(`id`) ON DELETE cascade,
266. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:91`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:48f69635f3e1f359ee2e810f3c9dadff9241bae85e847676a6dce3fc8be9d993`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`run_id` text NOT NULL REFERENCES `daemon_run`(`id`) ON DELETE cascade,
267. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:92`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:a68471ceac14306be35d24c8203d07a4fe8e07b12f3c126c1a71a6fc1e6ce754`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`task_id` text NOT NULL REFERENCES `daemon_task`(`id`) ON DELETE cascade,
268. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:120`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:48f69635f3e1f359ee2e810f3c9dadff9241bae85e847676a6dce3fc8be9d993`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`run_id` text NOT NULL REFERENCES `daemon_run`(`id`) ON DELETE cascade,
269. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:121`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:a68471ceac14306be35d24c8203d07a4fe8e07b12f3c126c1a71a6fc1e6ce754`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`task_id` text NOT NULL REFERENCES `daemon_task`(`id`) ON DELETE cascade,
270. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:139`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:48f69635f3e1f359ee2e810f3c9dadff9241bae85e847676a6dce3fc8be9d993`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`run_id` text NOT NULL REFERENCES `daemon_run`(`id`) ON DELETE cascade,
271. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:155`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:48f69635f3e1f359ee2e810f3c9dadff9241bae85e847676a6dce3fc8be9d993`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`run_id` text NOT NULL REFERENCES `daemon_run`(`id`) ON DELETE cascade,
272. `high` `data` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql:156`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:0a1975a0f49144eb8ebc0533385a509be4f8ba5e4a680c72091f57e9c85bef9e`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=`task_id` text REFERENCES `daemon_task`(`id`) ON DELETE cascade,
273. `high` `vibe` `packages/jekko/script/httpapi-exercise.ts:1402`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6e7fbe617013b17b1f3fafbf1c047b5965f0b9e0725caabbc40fd23bb27c3aae`
   Evidence: packages/jekko/script/httpapi-exercise.ts:1402, future-hostile/dead-language term `deprecated` appears
274. `high` `vibe` `packages/jekko/script/httpapi-exercise.ts:1759`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f452ba56e8e46d4cf0a9c1b0d31bd4e6066e37b439bc716b96d7dca38fcc53e3`
   Evidence: packages/jekko/script/httpapi-exercise.ts:1759, future-hostile/dead-language term `legacy` appears
275. `high` `vibe` `packages/jekko/src/acp/agent.ts:48`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e60ab2d5e39adb6da7c123a402d76fa3f8ac715fd863e4a0b5c9852e85f568d4`
   Evidence: packages/jekko/src/acp/agent.ts:48, future-hostile/dead-language term `todo` appears
276. `high` `vibe` `packages/jekko/src/acp/agent.ts:58`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fe49c2aa43bbb3463aef54d435335b1403f3f388a856a0c6fa34f19bce9f9d7d`
   Evidence: packages/jekko/src/acp/agent.ts:58, future-hostile/dead-language term `todo` appears
277. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:107`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:da5b5144f626f9386e2ff96c2def41143dc208c0750d01d8af3633ee86aaf58c`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:107, future-hostile/dead-language term `legacy` appears
278. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:108`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a186d658544f17f6363b808cfc555cb63d1c0c8da3cb56b6a8a978592e2e3d32`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:108, future-hostile/dead-language term `legacy` appears
279. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:109`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:abc2e0009d99a468c247261a12da8a9882bf37af73828af0226b9d91340a9821`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:109, future-hostile/dead-language term `legacy` appears
280. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:119`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a91e03490f6fd0ef0a75ee2039c3ab9622cfe3313a7807b63f53982aa007866a`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:119, future-hostile/dead-language term `legacy` appears
281. `high` `vibe` `packages/jekko/src/agent-script/parser.test.ts:120`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2e7aef7c57f650a13c3f7a3f5fe605d53d1b96d305773f27425186ad351084cb`
   Evidence: packages/jekko/src/agent-script/parser.test.ts:120, future-hostile/dead-language term `legacy` appears
282. `high` `vibe` `packages/jekko/src/agent-script/parser.ts:868`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c9b9cf8d5c9e6cc2a103446e02d344464404f1a879a377f51744df6aeb6fa9d8`
   Evidence: packages/jekko/src/agent-script/parser.ts:868, future-hostile/dead-language term `fallback` appears
283. `high` `vibe` `packages/jekko/src/agent-script/parser.ts:887`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a5b31c07d5d43f47a97779149e88bb80c45782c57817afbf6f6a76b0fa51c212`
   Evidence: packages/jekko/src/agent-script/parser.ts:887, future-hostile/dead-language term `fallback` appears
284. `high` `vibe` `packages/jekko/src/agent-script/parser.ts:888`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:51d21b9ccab17bddb31e0ef2146ff879b918792d4566065b44cec952b81219ed`
   Evidence: packages/jekko/src/agent-script/parser.ts:888, future-hostile/dead-language term `fallback` appears
285. `high` `vibe` `packages/jekko/src/agent-script/parser.ts:1602`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:464f2531b9dfccba574ba1940340ebe313cf34f3b9b9ed17e305710a7a5bcdd7`
   Evidence: packages/jekko/src/agent-script/parser.ts:1602, future-hostile/dead-language term `legacy` appears
286. `high` `vibe` `packages/jekko/src/agent-script/schema.ts:997`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:913e5f04a6b1bb12366c4f219db1b192cdc8355609fc25b21b2285fd4d1bbcfa`
   Evidence: packages/jekko/src/agent-script/schema.ts:997, future-hostile/dead-language term `fallback` appears
287. `high` `vibe` `packages/jekko/src/agent-script/schema.ts:1015`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f96f67e4508672b237144d78180196a7d1fbbf2e93296257375dbbb4c4ff21bb`
   Evidence: packages/jekko/src/agent-script/schema.ts:1015, future-hostile/dead-language term `fallback` appears
288. `high` `vibe` `packages/jekko/src/cli/cmd/github.ts:885`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:abf8c87cff840046d48f7d6b091e065bd7a686390f2e2fdac3a245e5fa0afc43`
   Evidence: packages/jekko/src/cli/cmd/github.ts:885, future-hostile/dead-language term `todo` appears
289. `high` `vibe` `packages/jekko/src/cli/cmd/run.ts:28`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1e04cf810d596ba99ea27e9a733e1f405011ff441d80226c7c70c96dbf1661dd`
   Evidence: packages/jekko/src/cli/cmd/run.ts:28, future-hostile/dead-language term `todo` appears
290. `high` `vibe` `packages/jekko/src/cli/cmd/tui/app.tsx:144`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d15b481bcb2bf34bb91ed7179b48a856b644a381f91aedd15953d752e8eafe8e`
   Evidence: packages/jekko/src/cli/cmd/tui/app.tsx:144, future-hostile/dead-language term `fallback` appears
291. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/dialog-model.tsx:73`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:68f6ece7c6e080e21ca2d81d51dd99f67e000b121e03605953a77a4742409b8a`
   Evidence: packages/jekko/src/cli/cmd/tui/component/dialog-model.tsx:73, future-hostile/dead-language term `deprecated` appears
292. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:53`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c9be570d286063b798515cf4e5688ab10bf233e90f021d74c4dbb5f78882339a`
   Evidence: packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:53, future-hostile/dead-language term `fallback` appears
293. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:78`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e8436478df2d712aeb53e3cb68d76ae5cf838ae44ce26e130d6184ba4dbc325a`
   Evidence: packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:78, future-hostile/dead-language term `fallback` appears
294. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:121`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:beb143f331728463f0478556136d84552147234723078c68af1ef2e637ce5ac0`
   Evidence: packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:121, future-hostile/dead-language term `fallback` appears
295. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:143`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:76237f99f67ecd6b59e8571b9b2820816f6e7a23988b179d51e761f896d13905`
   Evidence: packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx:143, future-hostile/dead-language term `fallback` appears
296. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx:683`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ae397f2d0831bdbf897c7ee7d0afec883ecee2a5dd8ec9e4d2d144949f12f35b`
   Evidence: packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx:683, future-hostile/dead-language term `fallback` appears
297. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1510`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:51c185d6e7b3427b072ede0d3a6edb19cea65880bb0b1ddcd115507158de2173`
   Evidence: packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1510, future-hostile/dead-language term `fallback` appears
298. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1604`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cc0c9cf5cc5467f696d8863129a2ea32119a17f10689cbd2b0937da3e0e815bd`
   Evidence: packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx:1604, future-hostile/dead-language term `fallback` appears
299. `high` `vibe` `packages/jekko/src/cli/cmd/tui/component/spinner.tsx:15`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e26b911c91e23e51e54ee364b235b1b3f3c1ec9246f29546c02190eb864a7c98`
   Evidence: packages/jekko/src/cli/cmd/tui/component/spinner.tsx:15, future-hostile/dead-language term `fallback` appears
300. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts:120`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:752f1ed40249990b66b6e9eebbfc9a095b3a02aa6d0c2ddcbcef11f6561d3cf7`
   Evidence: packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts:120, future-hostile/dead-language term `stale` appears
301. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:8`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d0bc30b8648f8341584aa4e7bf87d2331b37181a626b6386e82008ff6fc8038a`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:8, future-hostile/dead-language term `todo` appears
302. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:61`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:535c857a2c811df44a61b4fbcb9b97ee4b0561727037913ae470c4418fd071c9`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:61, future-hostile/dead-language term `todo` appears
303. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:62`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cf271620742ea023b547edeabbed92e940e802bead0eba7fac4e89bffea55a53`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:62, future-hostile/dead-language term `todo` appears
304. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:65`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:acb369bc7b87e3887e993d1c187abf1b0a79d06809cf390fde2785be3f6f8f4a`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:65, future-hostile/dead-language term `todo` appears
305. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6a7bdc1a6ad026736d5182781628e6b8595d92082df7a09f2816246c8ae1eb33`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:101, future-hostile/dead-language term `todo` appears
306. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:159`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f8d8ee8993f6e1297f4deee1019b2dd60e2cccf1c78c363996efaaaa165e98be`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:159, future-hostile/dead-language term `todo` appears
307. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:161`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:78d63fbaa00f9bac3b8cb938790718c4929e671a775abd75d14a69c11bce679f`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:161, future-hostile/dead-language term `todo` appears
308. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:172`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4b51b17b1c5e277e448ba4129b97c735be7ecfd93f2eb9311e34abd357284437`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:172, future-hostile/dead-language term `todo` appears
309. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:173`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fe8d08d502725ec99a64d3109a5aae2afef99d0c938c939388df07838b5bddcd`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:173, future-hostile/dead-language term `todo` appears
310. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:324`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4eb58c7b194243f147aeffa1d3681e53f9101d2c1422d396a0b6b53c87b164eb`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:324, future-hostile/dead-language term `todo` appears
311. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:325`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b439b1bf19f1f1e3ac3cf8a0b8223ed646dd0b3cac5136ca9bfcbf9763991956`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx:325, future-hostile/dead-language term `todo` appears
312. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/sync.tsx:309`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2d038fa1e4013c4254823b16c30b7db38b8be42cfa65ca0d8e28dc210c1e0a32`
   Evidence: packages/jekko/src/cli/cmd/tui/context/sync.tsx:309, future-hostile/dead-language term `legacy` appears
313. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/theme.tsx:304`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2e914dc66cccf61f85049ddfe2c5173cf0ef1022c1c13ac8c69a7618ecd783a4`
   Evidence: packages/jekko/src/cli/cmd/tui/context/theme.tsx:304, future-hostile/dead-language term `fallback` appears
314. `high` `vibe` `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts:163`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a9b3460e28697a28de7b3615b2b9490c73a1b6af706bbe7e474946acacfea297`
   Evidence: packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts:163, future-hostile/dead-language term `stale` appears
315. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/mcp.tsx:60`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6bb4922e4e24ae304cab4d025e089bf2d52ee8638ba5971e05a3b018fcc9c99a`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/mcp.tsx:60, future-hostile/dead-language term `fallback` appears
316. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:3`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:172f786056a0fc02a05c7631babdc8ba517f019aec3d60780a3237f578c3d753`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:3, future-hostile/dead-language term `todo` appears
317. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:21`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2fd2146e69cd01afbbdda1be0a59d941e867d9ddf71136926b54f61799afd414`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:21, future-hostile/dead-language term `todo` appears
318. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:484`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2b05e012953ca682df0a13095ef9346f01a0b789b132e94aa5f27ed70ff8b974`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:484, future-hostile/dead-language term `fallback` appears
319. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:638`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:630178b199423f1b65a9988df22c471d513a13b53be56fa3724af7a563bab492`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:638, future-hostile/dead-language term `fallback` appears
320. `high` `vibe` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:874`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f4f275cdf522b03fa022aaa07431a1e7f6f7a40915c0b049f57ba28911001c8a`
   Evidence: packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx:874, future-hostile/dead-language term `fallback` appears
321. `high` `vibe` `packages/jekko/src/cli/cmd/tui/plugin/internal.ts:7`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4f05009f091dceaf6bd4d76676ea5e7cb553ed1bf1866f456789f81a0a1e9ae9`
   Evidence: packages/jekko/src/cli/cmd/tui/plugin/internal.ts:7, future-hostile/dead-language term `todo` appears
322. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:53`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9834d10e0a55705472e32a9fbb8ceaaba5fec4ec610fe836201008f4b1b9cff2`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:53, future-hostile/dead-language term `todo` appears
323. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:69`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2d65cc3a6b871045c508f5bd08ec4d2caaa0d8b9f8b27f12c4db1fb415d10799`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:69, future-hostile/dead-language term `todo` appears
324. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:309`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6faeefbd9b7c54dd34e38b447f167befd5309ae6e111384d2c941df1520373c4`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:309, future-hostile/dead-language term `stale` appears
325. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1436`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6b8d4c13905d9249fba0be44608c9dbe5e6b6b2dd0403779de7e09de0d018a9d`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1436, future-hostile/dead-language term `fallback` appears
326. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1740`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:62553aa61480eb5e4058da7553953eb6a5262b1b5c396d5b0c45423907b8f7c4`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1740, future-hostile/dead-language term `fallback` appears
327. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1841`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4bcb13665f8f3b28110568d5c2df8811847c00539de69722a05ddede203a4a91`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1841, future-hostile/dead-language term `fallback` appears
328. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1885`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2de78f6bf090e47ebdf3177f858244264946bd32f4da29740a29c1a9b93f74dd`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:1885, future-hostile/dead-language term `fallback` appears
329. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:2248`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:308894c6990199da017479a83dd39af46fbcf7c701fc44cd815d56644d26eb0f`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/index.tsx:2248, future-hostile/dead-language term `fallback` appears
330. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/permission.tsx:616`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:522be417cb2bdf5748d58946043186c8a5ce7f2a588d2a048e13a2567d82e5aa`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/permission.tsx:616, future-hostile/dead-language term `fallback` appears
331. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/permission.tsx:679`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:10b0087fd1b466de9c4507b58d9108f38fb9b7dcbe2837a93e7d9a9effedaf19`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/permission.tsx:679, future-hostile/dead-language term `fallback` appears
332. `high` `vibe` `packages/jekko/src/cli/cmd/tui/routes/session/sidebar.tsx:66`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f207a86f488fb60505c47877b9ddf3f061630d032e01a03b6bd1b8390aaf47a2`
   Evidence: packages/jekko/src/cli/cmd/tui/routes/session/sidebar.tsx:66, future-hostile/dead-language term `fallback` appears
333. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-prompt.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:47f34bf56c4f4d6cb1b76aa43f8785f962af5aadfad2e6e27006e4af1986796b`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-prompt.tsx:101, future-hostile/dead-language term `fallback` appears
334. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:286`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2a248073c7af6791d7c7a222a41e6ce8dc3d8d175c74a483c667b9fffa2f4cec`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:286, future-hostile/dead-language term `fallback` appears
335. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:307`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:265662bf4493a971ebd0de368a75de302fce01845b7b3bcb6aa77f1cf68ec5f5`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:307, future-hostile/dead-language term `fallback` appears
336. `high` `vibe` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:371`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:268a6915ee9561c5a528db12a9686afedec873b1c68f4e0947bc9fed7764a177`
   Evidence: packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx:371, future-hostile/dead-language term `fallback` appears
337. `high` `vibe` `packages/jekko/src/config/provider.ts:52`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:213c9a6f37cca1effddee51ac7b927260fab0ae104846d35d768404bfe2c059c`
   Evidence: packages/jekko/src/config/provider.ts:52, future-hostile/dead-language term `deprecated` appears
338. `high` `vibe` `packages/jekko/src/effect/app-runtime.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6d591e1a0b5d096f2a8d676e2e5ab06a660a6fd4785692c8992e7d658c89624c`
   Evidence: packages/jekko/src/effect/app-runtime.ts:25, future-hostile/dead-language term `todo` appears
339. `high` `vibe` `packages/jekko/src/effect/app-runtime.ts:82`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4f615faec75dfce301455362021d6f0e42b281a61b8f308bd322a24832632382`
   Evidence: packages/jekko/src/effect/app-runtime.ts:82, future-hostile/dead-language term `todo` appears
340. `high` `vibe` `packages/jekko/src/plugin/loader.ts:142`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:53f03e62998bb385e38325703f71e9fb58f325dbb7d48ab85fba5c39c6cdf6ed`
   Evidence: packages/jekko/src/plugin/loader.ts:142, future-hostile/dead-language term `deprecated` appears
341. `high` `vibe` `packages/jekko/src/provider/models.ts:74`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:02236c00110fbf1c205b58082397a566a194ad38dd533321b6426d503f9c3de8`
   Evidence: packages/jekko/src/provider/models.ts:74, future-hostile/dead-language term `deprecated` appears
342. `high` `vibe` `packages/jekko/src/provider/provider.ts:893`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4eb8434a5ab8f79b5726b66db5e684a505780306eb7690450e313ade10053f82`
   Evidence: packages/jekko/src/provider/provider.ts:893, future-hostile/dead-language term `deprecated` appears
343. `high` `vibe` `packages/jekko/src/provider/provider.ts:894`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3482b84c89d8ce7301bc90ab7ea45555deafacf44ff8b9f1fe310d16e28b86cf`
   Evidence: packages/jekko/src/provider/provider.ts:894, future-hostile/dead-language term `deprecated` appears
344. `high` `vibe` `packages/jekko/src/provider/provider.ts:895`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ec63ba7ac023be65796934fbbc83299ae1011b6d2ae9f985ed68b9ecc6644e24`
   Evidence: packages/jekko/src/provider/provider.ts:895, future-hostile/dead-language term `deprecated` appears
345. `high` `vibe` `packages/jekko/src/provider/provider.ts:931`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:70e032989d1456e24e233c8d8dedd839be66940b2361fede137447c392299167`
   Evidence: packages/jekko/src/provider/provider.ts:931, future-hostile/dead-language term `deprecated` appears
346. `high` `vibe` `packages/jekko/src/provider/provider.ts:1404`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d8b17126566c1c01aac25c788f474430d0a7394303f4eda9854541b7a6ed2926`
   Evidence: packages/jekko/src/provider/provider.ts:1404, future-hostile/dead-language term `deprecated` appears
347. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:10`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6270b1d41dc482325e98e187187f868f7e646048e6afb3b9052584a5325243a1`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:10, future-hostile/dead-language term `todo` appears
348. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:151`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4f242b1422102d6963fcf7ced2152debe1e9f3982fc95bf1c5b7a53ebabc2d27`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:151, future-hostile/dead-language term `todo` appears
349. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:162`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c6231f59fc7a68a8b45ec3eabb61a728cf9e1ad01b4d5471773014b468b003f3`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:162, future-hostile/dead-language term `todo` appears
350. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:392`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ccca51e87a203635219cec35adb219858050c575975ed2dce82360089a07be40`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/groups/session.ts:392, future-hostile/dead-language term `deprecated` appears
351. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:17`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:52fd678eaa3880203764813b113fe635dbeac8c9f932aeff54a4cf0127c9f267`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:17, future-hostile/dead-language term `todo` appears
352. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:53`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:34308371c9b49887b66fedf5ccd6a1e96f5fa7a069a9a572d21536864bc7a008`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:53, future-hostile/dead-language term `todo` appears
353. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:86`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:759e843cbbf0aa1e1081176fcd7798704116c15dfdeaa3f1e73ef6d76d84a66d`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:86, future-hostile/dead-language term `todo` appears
354. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:361`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4e7bc57c74c419621a8a646c4b48f8a4267fe4ff08b8ad391bb1af24534a7874`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts:361, future-hostile/dead-language term `todo` appears
355. `medium` `context` `packages/jekko/src/server/routes/instance/httpapi/handlers/v2.ts:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:bd4c471d497f67ca63110535358d05200bfc36c96260e97262d2c2b179ecf19c`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/jekko/src/server/routes/instance/httpapi/handlers/v2.ts, line=1, proof_window=None, snippet=import { SessionV2 } from "@/v2/session"
356. `high` `vibe` `packages/jekko/src/server/routes/instance/httpapi/server.ts:41`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e23834a2c44d56ce3925ad37552244c6ead09c226c81a6c8c1c79e4754247dcd`
   Evidence: packages/jekko/src/server/routes/instance/httpapi/server.ts:41, future-hostile/dead-language term `todo` appears
357. `high` `vibe` `packages/jekko/src/server/routes/instance/index.ts:118`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3719b107617c1749650a1168036491619868ba8b0b800f014d0ecea06439a540`
   Evidence: packages/jekko/src/server/routes/instance/index.ts:118, future-hostile/dead-language term `todo` appears
358. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:15`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:66200aca1d8ddbdda48d49309dbcee4e7b132c09994b14f84b8e176dd9c4e046`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:15, future-hostile/dead-language term `todo` appears
359. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:195`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0fcc99869d8c03feb7084ada228110cca6f3e3634956fa71e729e9d2487a4331`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:195, future-hostile/dead-language term `todo` appears
360. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:198`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9d04a4e5dd8251d3c8cdd47da7298e857e833619250c17170d6dd862da63d37c`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:198, future-hostile/dead-language term `todo` appears
361. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:214`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:45620b19ccde5f2991dc7e513ad0e1233892637f60b6a826463f525b113ce829`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:214, future-hostile/dead-language term `todo` appears
362. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:220`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:25452d9d05028bc89661cc735a4cce7dc1bc9b5942df57e903b92aa373b3ed45`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:220, future-hostile/dead-language term `todo` appears
363. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:223`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:acf7ca97d9544e5cc8616ee16d339660971679cecf5347ab152c539705468346`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:223, future-hostile/dead-language term `todo` appears
364. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:224`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:557b1e772299d94479cf7d3d1701bb9d517ef01407a9c5bd4e2f9c83b235194d`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:224, future-hostile/dead-language term `todo` appears
365. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:227`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8cc7b141f7ad663fcb4ff0e0d304d6bd3dfde365179085b3c68ad4cce9a0a91c`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:227, future-hostile/dead-language term `todo` appears
366. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:230`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4c5f75ac5ea89825ee06290e002be13368444c4a85d9d7efd17a88700fc82ca0`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:230, future-hostile/dead-language term `todo` appears
367. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:245`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:46907fe65dd10a6e1625c93d39409f90885b9ac623149b699401c006a486430e`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:245, future-hostile/dead-language term `todo` appears
368. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:246`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:805b33d789e7a41337f1d65916f78009e3d2ea8761b21f5a54d975cb107ab4c1`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:246, future-hostile/dead-language term `todo` appears
369. `high` `vibe` `packages/jekko/src/server/routes/instance/session.ts:1119`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:067a289f67ba19eaa9afe97429538a10813c58abedad131b439a1dcd41e31884`
   Evidence: packages/jekko/src/server/routes/instance/session.ts:1119, future-hostile/dead-language term `deprecated` appears
370. `high` `vibe` `packages/jekko/src/session/daemon-pass.ts:57`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1c7478d80bda2eba8aaf24d71ce816a8ec7d976a9aa86cd65073f9b0f1fd09fd`
   Evidence: packages/jekko/src/session/daemon-pass.ts:57, future-hostile/dead-language term `fallback` appears
371. `high` `vibe` `packages/jekko/src/session/daemon-pass.ts:74`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c69bec142b6c79356e4e7572354ee7941badb5f56ad8dca5bc0373741f5fa856`
   Evidence: packages/jekko/src/session/daemon-pass.ts:74, future-hostile/dead-language term `fallback` appears
372. `high` `vibe` `packages/jekko/src/session/daemon-pass.ts:75`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d7cea62e3dee0fb8cdbb651e22b0193cf1018d7d33b9bc3fefe28e0b7d488700`
   Evidence: packages/jekko/src/session/daemon-pass.ts:75, future-hostile/dead-language term `fallback` appears
373. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:12`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f48bea03421d0e99f41227952dc9e36eff53e5925549235749f80d425e1865ce`
   Evidence: packages/jekko/src/session/daemon-retry.ts:12, future-hostile/dead-language term `fallback` appears
374. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:18`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:405d236905ac1fd2b6e60cbf03939291a0d465679f29eac888a3fc5fd02d11d1`
   Evidence: packages/jekko/src/session/daemon-retry.ts:18, future-hostile/dead-language term `fallback` appears
375. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:26`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:eb0b021184f2cadc4f0141703ef31daf05941ada5f2afaca19e305285385484c`
   Evidence: packages/jekko/src/session/daemon-retry.ts:26, future-hostile/dead-language term `fallback` appears
376. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:32`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:43debcde7971a43b2d0a4b9d1f6efd50049f5e30f2cb6b5bd46766d165760006`
   Evidence: packages/jekko/src/session/daemon-retry.ts:32, future-hostile/dead-language term `fallback` appears
377. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:33`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8062f487656c1d7ff93a2d321b1e54fa046be8864e8772b7e32c22e0b1ff95ac`
   Evidence: packages/jekko/src/session/daemon-retry.ts:33, future-hostile/dead-language term `fallback` appears
378. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:34`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:37cb279d6517f9c5967ccbbfc63c62c0f4fd0974e78c409ab8b164523c21a63d`
   Evidence: packages/jekko/src/session/daemon-retry.ts:34, future-hostile/dead-language term `fallback` appears
379. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:35`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:993027b12b9cacf4c7811fe8904ad8638490fd8072b0996ce224cd58129ead2b`
   Evidence: packages/jekko/src/session/daemon-retry.ts:35, future-hostile/dead-language term `fallback` appears
380. `high` `vibe` `packages/jekko/src/session/daemon-retry.ts:36`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c676e0c2c7e6da0db0ba22d6243779acd11188f13c1476fb5187b911f8a8d64f`
   Evidence: packages/jekko/src/session/daemon-retry.ts:36, future-hostile/dead-language term `fallback` appears
381. `high` `vibe` `packages/jekko/src/session/daemon-task-router.ts:68`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d8c742eacd5e9a38382630d73094d249d2d9f63cbed18e11b148ea1a6b1e824f`
   Evidence: packages/jekko/src/session/daemon-task-router.ts:68, future-hostile/dead-language term `fallback` appears
382. `high` `vibe` `packages/jekko/src/session/daemon-task-router.ts:84`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5f7a9bb7e4ce7caa2b284e3c313b8526ef95073d33af4a0b3a22041ea1f0f079`
   Evidence: packages/jekko/src/session/daemon-task-router.ts:84, future-hostile/dead-language term `fallback` appears
383. `high` `vibe` `packages/jekko/src/session/daemon-task-router.ts:88`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b36bb4f094237ccd33c557df5e7b2abd815bd1a070591300086c7688c627501e`
   Evidence: packages/jekko/src/session/daemon-task-router.ts:88, future-hostile/dead-language term `fallback` appears
384. `high` `vibe` `packages/jekko/src/session/daemon-task-router.ts:89`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:47c1dc0bbae8dc5a66c3c6aeef58d0ea1175c223b33c124aeb8ff0713aae009f`
   Evidence: packages/jekko/src/session/daemon-task-router.ts:89, future-hostile/dead-language term `fallback` appears
385. `high` `vibe` `packages/jekko/src/session/llm.ts:268`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `unused` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bb244b99dd866039dd35b4d1846f462f05a142641fd840a17df0b43662470601`
   Evidence: packages/jekko/src/session/llm.ts:268, future-hostile/dead-language term `unused` appears
386. `medium` `context` `packages/jekko/src/session/message-v2.ts:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:ab7189d2d1c7aaef4fa0a87761960038e7ae3281f2050bae205e7d887e8850da`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/jekko/src/session/message-v2.ts, line=1, proof_window=None, snippet=export * from "./message"
387. `high` `vibe` `packages/jekko/src/session/pending.ts:1`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2d47bbdfc9fd95d12b110371e2c35720aa36572bf1939f007642b2dac96f1963`
   Evidence: packages/jekko/src/session/pending.ts:1, future-hostile/dead-language term `todo` appears
388. `high` `vibe` `packages/jekko/src/session/pending.ts:2`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:00856b0168821d850f140d042bbe17ca2344c9240e5bffdaaf1b48835331bdfb`
   Evidence: packages/jekko/src/session/pending.ts:2, future-hostile/dead-language term `todo` appears
389. `high` `vibe` `packages/jekko/src/session/processor.ts:232`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:be2871c496ba6d2bc2596a977647b4dbb49c3b64b70efba429f87c70e9a352aa`
   Evidence: packages/jekko/src/session/processor.ts:232, future-hostile/dead-language term `compat` appears
390. `high` `vibe` `packages/jekko/src/session/processor.ts:265`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:05177788af645f57fc563a1a659bce25b3cd46f6b43f014c6eebfb534bf6de0c`
   Evidence: packages/jekko/src/session/processor.ts:265, future-hostile/dead-language term `compat` appears
391. `high` `vibe` `packages/jekko/src/session/processor.ts:284`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:920408d645c0b4f781711c1345a82ef55a11671f1527fc48c0215e88bcab459e`
   Evidence: packages/jekko/src/session/processor.ts:284, future-hostile/dead-language term `compat` appears
392. `high` `vibe` `packages/jekko/src/session/processor.ts:313`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2b98b17c889f4ea741e1a5b2525f5a225069ed0b5c2be80ee808d989caf19e6b`
   Evidence: packages/jekko/src/session/processor.ts:313, future-hostile/dead-language term `compat` appears
393. `high` `vibe` `packages/jekko/src/session/processor.ts:328`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e050eccc483f733499603fe72c5d6cd877d89d174934badf372bfd22baeee523`
   Evidence: packages/jekko/src/session/processor.ts:328, future-hostile/dead-language term `compat` appears
394. `high` `vibe` `packages/jekko/src/session/processor.ts:396`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f200c895f794e8845701d44dca47872aff991386ca2d32084d165b03ffc51d74`
   Evidence: packages/jekko/src/session/processor.ts:396, future-hostile/dead-language term `compat` appears
395. `high` `vibe` `packages/jekko/src/session/processor.ts:427`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b23a218e08a12dd8894436591854164902b4412e1cfb90329ff899bba48dea21`
   Evidence: packages/jekko/src/session/processor.ts:427, future-hostile/dead-language term `compat` appears
396. `high` `vibe` `packages/jekko/src/session/processor.ts:473`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:73881088e8c4689d8cf1cd2d225c4101f76b83830f532567df7badfe3d0dc856`
   Evidence: packages/jekko/src/session/processor.ts:473, future-hostile/dead-language term `compat` appears
397. `high` `vibe` `packages/jekko/src/session/processor.ts:496`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fbfa84574024fc880cc991fd9521a4a9458e4f46de284134259f42b6ae6e1459`
   Evidence: packages/jekko/src/session/processor.ts:496, future-hostile/dead-language term `compat` appears
398. `high` `vibe` `packages/jekko/src/session/processor.ts:526`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ee56306abddb8087f84164ce7fabbf1456e1547e36495ced5afbdf43fb4d200d`
   Evidence: packages/jekko/src/session/processor.ts:526, future-hostile/dead-language term `compat` appears
399. `high` `vibe` `packages/jekko/src/session/processor.ts:581`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:61bdfa06900b431b5aa111c9e9348b78190a010b0fc5066ee0952e68be78f023`
   Evidence: packages/jekko/src/session/processor.ts:581, future-hostile/dead-language term `compat` appears
400. `high` `vibe` `packages/jekko/src/session/processor.ts:626`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:33f9f8c90140d4684d3a499d18e380365fd5d3e13c636cef7e737ff6cafc5d14`
   Evidence: packages/jekko/src/session/processor.ts:626, future-hostile/dead-language term `compat` appears
401. `high` `vibe` `packages/jekko/src/session/processor.ts:720`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9afa50b7a0859acc399bb632cc1259647ed6f1bd66cd4f0e5bccbd4c3812e340`
   Evidence: packages/jekko/src/session/processor.ts:720, future-hostile/dead-language term `compat` appears
402. `high` `vibe` `packages/jekko/src/session/processor.ts:771`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:099b88787b7d7a7d024c616ba74557f77572903e0b1443ad7e4e20f80a7da8ba`
   Evidence: packages/jekko/src/session/processor.ts:771, future-hostile/dead-language term `compat` appears
403. `high` `vibe` `packages/jekko/src/session/prompt.ts:1355`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:16d38f1dc42425a807beb7bccee83c59edcb3cab3d7a0ed0c3b32a485c1a8798`
   Evidence: packages/jekko/src/session/prompt.ts:1355, future-hostile/dead-language term `temporary` appears
404. `high` `vibe` `packages/jekko/src/session/prompt.ts:1366`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ef1c236790c59a4d4fe3fcb3db24d0a2008bbe9519c7450859690d1612e1b761`
   Evidence: packages/jekko/src/session/prompt.ts:1366, future-hostile/dead-language term `temporary` appears
405. `high` `vibe` `packages/jekko/src/session/todo.ts:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5cc7e615058cfb1719149e9b260225c3d27cd24941d759ed37a507592a8c6fdf`
   Evidence: packages/jekko/src/session/todo.ts:20, future-hostile/dead-language term `todo` appears
406. `high` `vibe` `packages/jekko/src/session/todo.ts:46`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:15272d481eae59c5c76b55587884b8a085ed6e6340a5db0bbbfb4c07642edfef`
   Evidence: packages/jekko/src/session/todo.ts:46, future-hostile/dead-language term `todo` appears
407. `high` `vibe` `packages/jekko/src/session/todo.ts:67`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5aaf5a53bd2fa82a8a0bf968e866c81210c4a1343e0207e3b0ee8144411ec75c`
   Evidence: packages/jekko/src/session/todo.ts:67, future-hostile/dead-language term `todo` appears
408. `high` `vibe` `packages/jekko/src/session/todo.ts:86`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6974863d7eab6739d446220840b72e3b666e756aa3eb5ca1d1d4d393c4b7bff5`
   Evidence: packages/jekko/src/session/todo.ts:86, future-hostile/dead-language term `todo` appears
409. `high` `vibe` `packages/jekko/src/tool/pending.ts:1`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5d1e739130d488b2947ecca6b16c1aeb5e384daff284d86109256a5c5ca9391f`
   Evidence: packages/jekko/src/tool/pending.ts:1, future-hostile/dead-language term `todo` appears
410. `high` `vibe` `packages/jekko/src/tool/registry.ts:10`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:37504d62aaac51270430b6dd491fed87221abe187f865ad1935d6709d5041099`
   Evidence: packages/jekko/src/tool/registry.ts:10, future-hostile/dead-language term `todo` appears
411. `high` `vibe` `packages/jekko/src/tool/registry.ts:44`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:718f1a7d045ccd5fe6205e67285ad2482b0be886b71f0de3adc6a4d34ed3ffd3`
   Evidence: packages/jekko/src/tool/registry.ts:44, future-hostile/dead-language term `todo` appears
412. `high` `vibe` `packages/jekko/src/tool/registry.ts:325`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d08e99b8518990432200ad43b042660c307ca37389f8493c4896a88682bd97cd`
   Evidence: packages/jekko/src/tool/registry.ts:325, future-hostile/dead-language term `todo` appears
413. `high` `vibe` `packages/jekko/src/tool/todo.ts:4`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e9c977190e54c816e383078360c43b2a129d2d561f25c7ea61c5c06d006604c2`
   Evidence: packages/jekko/src/tool/todo.ts:4, future-hostile/dead-language term `todo` appears
414. `high` `vibe` `packages/jekko/src/tool/todo.ts:6`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b516bf2cf55cb3365ede04094d22e5e24388ece29af3385ddfaff1de631e362f`
   Evidence: packages/jekko/src/tool/todo.ts:6, future-hostile/dead-language term `todo` appears
415. `high` `vibe` `packages/jekko/src/tool/todo.ts:22`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5022302aa7ebdd3ff39b6b269a7048b3d449214a1008f3d6930aa2911509cce0`
   Evidence: packages/jekko/src/tool/todo.ts:22, future-hostile/dead-language term `todo` appears
416. `high` `vibe` `packages/jekko/src/tool/todo.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:660de089e507edd9eed0977b74b0934ce6089909392aaaadcd5d50d8ca32cc2d`
   Evidence: packages/jekko/src/tool/todo.ts:25, future-hostile/dead-language term `todo` appears
417. `high` `vibe` `packages/jekko/src/tool/todo.ts:28`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:42198bf4fe889a1296f7da208496f8209ee106a7718852f63a35da396188fb1b`
   Evidence: packages/jekko/src/tool/todo.ts:28, future-hostile/dead-language term `todo` appears
418. `high` `vibe` `packages/jekko/src/v2/model.ts:117`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:92570ae67d3db4df4df54b7bb0db00659013a86c20c2312c29d5b00af5cf0c14`
   Evidence: packages/jekko/src/v2/model.ts:117, future-hostile/dead-language term `deprecated` appears
419. `high` `vibe` `packages/jekko/test/config/config.part-07.test.ts:343`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ec373342087665e738146a626d1f9f208caae297b97fa372297ee439cf7c8351`
   Evidence: packages/jekko/test/config/config.part-07.test.ts:343, future-hostile/dead-language term `legacy` appears
420. `high` `vibe` `packages/jekko/test/effect/app-runtime-logger.test.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9198bbe70b71fe65505d84fe0d8c23a1be427f0d2134c8ae00df5bf2e41524f8`
   Evidence: packages/jekko/test/effect/app-runtime-logger.test.ts:25, future-hostile/dead-language term `dummy` appears
421. `high` `vibe` `packages/jekko/test/effect/app-runtime-logger.test.ts:26`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d829f63e1d4c169e0b752a66ad29b91810e18396d0d53535ed2cb46141a29bf6`
   Evidence: packages/jekko/test/effect/app-runtime-logger.test.ts:26, future-hostile/dead-language term `dummy` appears
422. `high` `vibe` `packages/jekko/test/effect/app-runtime-logger.test.ts:30`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b053306e61d0e11166de840c65c748f6883bb22c7391bd5dd8058b27de2c1b2c`
   Evidence: packages/jekko/test/effect/app-runtime-logger.test.ts:30, future-hostile/dead-language term `dummy` appears
423. `high` `vibe` `packages/jekko/test/effect/app-runtime-logger.test.ts:32`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0501017466fbd9875986b425af660e678e76e1a988ad11233f4ab06c863cc047`
   Evidence: packages/jekko/test/effect/app-runtime-logger.test.ts:32, future-hostile/dead-language term `dummy` appears
424. `high` `vibe` `packages/jekko/test/effect/app-runtime-logger.test.ts:38`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5f8927113b965aa6d89891b02b2fc6afa42e02bba5c57255fd2fefa04ef404bb`
   Evidence: packages/jekko/test/effect/app-runtime-logger.test.ts:38, future-hostile/dead-language term `dummy` appears
425. `medium` `proof` `packages/jekko/test/provider/copilot/copilot-chat-model.test.ts:55`
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
426. `high` `vibe` `packages/jekko/test/provider/models.test.ts:224`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1ef2e915c23685bbe646e280e2019c19777aa171916ea2b66ffaf7cbe40545cb`
   Evidence: packages/jekko/test/provider/models.test.ts:224, future-hostile/dead-language term `stale` appears
427. `high` `vibe` `packages/jekko/test/server/httpapi-sdk.test.ts:487`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0f66b7a224ab2e1dc18aa818b83c5d1f8c11f7b6d081380ac66ea80828a83cbb`
   Evidence: packages/jekko/test/server/httpapi-sdk.test.ts:487, future-hostile/dead-language term `todo` appears
428. `high` `vibe` `packages/jekko/test/session/daemon-memory.test.ts:84`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:93c7775da15544fe94fc8740756823e67e889a05022ee1cbc7c30da343da8493`
   Evidence: packages/jekko/test/session/daemon-memory.test.ts:84, future-hostile/dead-language term `old` appears
429. `high` `vibe` `packages/jekko/test/session/daemon-memory.test.ts:106`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temp` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1dc674e92b878a9f0e97439eb369dde8a7822e2d51eb27e9f2a993879e922188`
   Evidence: packages/jekko/test/session/daemon-memory.test.ts:106, future-hostile/dead-language term `temp` appears
430. `high` `vibe` `packages/jekko/test/session/daemon-memory.test.ts:107`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temp` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:64112106f6df4e5811c52bbebc5e6e7b235e943b00a0e51e84bbbaa3e897b933`
   Evidence: packages/jekko/test/session/daemon-memory.test.ts:107, future-hostile/dead-language term `temp` appears
431. `high` `vibe` `packages/jekko/test/session/daemon-retry.test.ts:51`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ed5a04d4535811bd218c761f885ac13a6fbc1f1a8fcd77501d3bef7dcf937b8d`
   Evidence: packages/jekko/test/session/daemon-retry.test.ts:51, future-hostile/dead-language term `fallback` appears
432. `high` `vibe` `packages/jekko/test/session/prompt.test.ts:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bf9a50303fcde13ea6c1432d7815359a71ceef45e7499f3a6a7eeccaa87720e1`
   Evidence: packages/jekko/test/session/prompt.test.ts:20, future-hostile/dead-language term `todo` appears
433. `high` `vibe` `packages/jekko/test/session/prompt.test.ts:180`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2f945e2f81050c2dce8a4206c615cc535d5d3d1d58d7e4d148a426bac8a2442d`
   Evidence: packages/jekko/test/session/prompt.test.ts:180, future-hostile/dead-language term `todo` appears
434. `high` `vibe` `packages/jekko/test/session/schema-decoding.test.ts:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5f9a4808e2b0b841e9f8742afd9947908374e14b35d007bf84b4b3c5f8bfaacb`
   Evidence: packages/jekko/test/session/schema-decoding.test.ts:9, future-hostile/dead-language term `todo` appears
435. `high` `vibe` `packages/jekko/test/session/schema-decoding.test.ts:245`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f8f4369bb2703d3f21c461344edaa38edb7e42153c0b5d506407f920a4742221`
   Evidence: packages/jekko/test/session/schema-decoding.test.ts:245, future-hostile/dead-language term `todo` appears
436. `high` `vibe` `packages/jekko/test/session/schema-decoding.test.ts:246`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a30480a9ac20b11b5f99d678d6a415354a11e6f3479c2c14daa8e1e2f5030e1d`
   Evidence: packages/jekko/test/session/schema-decoding.test.ts:246, future-hostile/dead-language term `todo` appears
437. `high` `vibe` `packages/jekko/test/session/schema-decoding.test.ts:251`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3cb1ae334f92e6f2bd735c3cf0deb8463d799f36149badfd30b02a3923069b8b`
   Evidence: packages/jekko/test/session/schema-decoding.test.ts:251, future-hostile/dead-language term `todo` appears
438. `high` `vibe` `packages/jekko/test/session/snapshot-tool-race.test.ts:130`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:22b4d3d63e3868f01bcff32a4e9b1be5f685a1685bdd68325c1077c2c8ac61cc`
   Evidence: packages/jekko/test/session/snapshot-tool-race.test.ts:130, future-hostile/dead-language term `todo` appears
439. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:140`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dca52572a7fd7a7e667e8977b58c95648959507902be185a108c8e18c327e48a`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:140, future-hostile/dead-language term `stale` appears
440. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:320`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:006310f9368420836cce0c735eb8b76b07e8c278060150d26756182b5ac22c09`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:320, future-hostile/dead-language term `stale` appears
441. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:357`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e69347cdf7d1c9ba96988281ce89fbbf6c092e0aca8a989c56fddfad782707ed`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:357, future-hostile/dead-language term `stale` appears
442. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:358`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:936da910bbfd2c96baff9042fef280c3e7b91c84cb9a89dbdd0e9023f41bbdf1`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:358, future-hostile/dead-language term `stale` appears
443. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:409`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c50e5e138148f72e7859093a79fa14fa3002d9c215795bc5be78087e02245bf2`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:409, future-hostile/dead-language term `stale` appears
444. `high` `vibe` `packages/jekko/test/storage/json-migration.test.ts:438`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7bf910906946cfce77b19df697eddccad07430a6f1632d26c90e98e06d82161f`
   Evidence: packages/jekko/test/storage/json-migration.test.ts:438, future-hostile/dead-language term `stale` appears
445. `high` `vibe` `packages/jekko/test/tool/parameters.test.ts:24`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:73d03eeae505870a8b0453ad3f47732ea507aa8f13ff3bd88bd58396c1d4de94`
   Evidence: packages/jekko/test/tool/parameters.test.ts:24, future-hostile/dead-language term `todo` appears
446. `high` `vibe` `packages/jekko/test/tool/parameters.test.ts:49`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ed81d07982f3dc416629296c32181f6e78b293ea102897d3af25fc09dc237a88`
   Evidence: packages/jekko/test/tool/parameters.test.ts:49, future-hostile/dead-language term `todo` appears
447. `high` `vibe` `packages/jekko/test/tool/parameters.test.ts:213`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0f6291b58ed8d43c847b377bcbf447352aa35496f0a976ad3c0ae6b03149bc45`
   Evidence: packages/jekko/test/tool/parameters.test.ts:213, future-hostile/dead-language term `todo` appears
448. `high` `vibe` `packages/jekko/test/tool/parameters.test.ts:219`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:32bbebd717267003a9176c1a34c330777a8ee65277569548330fbee42fff7788`
   Evidence: packages/jekko/test/tool/parameters.test.ts:219, future-hostile/dead-language term `todo` appears
449. `high` `vibe` `packages/jekko/test/tool/registry.test.ts:38`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c450e4ac1ced4cb2bb79290fc280c0a4611f9c2be71e68c97d58bb654d644641`
   Evidence: packages/jekko/test/tool/registry.test.ts:38, future-hostile/dead-language term `todo` appears
450. `high` `vibe` `packages/plugin/src/tui.ts:8`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e165294ebd150c3bd91e093666189472a2d918c92d38d49eca5592c33731eda9`
   Evidence: packages/plugin/src/tui.ts:8, future-hostile/dead-language term `todo` appears
451. `high` `vibe` `packages/plugin/src/tui.ts:313`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f8132c2e97e20835563aeb7d1288d7aa88e77593e6735e8b544885f941eb6adb`
   Evidence: packages/plugin/src/tui.ts:313, future-hostile/dead-language term `todo` appears
452. `high` `generated` `packages/sdk/js/src/gen/client/client.gen.ts:1`
   Rule: `HLT-002-GENERATED-MUTATION`
   Check: `HLT-002-GENERATED-MUTATION:generated` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `contract`, owner `tools`
   Docs: `agent/JANKURAI_STANDARD.md#generated-zones`
   Reason: generated zone is not protected strongly enough against hand edits
   Fix: add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Rerun: `just fast`
   Fingerprint: `sha256:14ea5b3fddebb2958fcd0d3eb2c97d6432765cb2685c62b1a32b3ac9194ed40d`
   Evidence: generated file contains TODO/stub markers
453. `medium` `context` `packages/ui/src/assets/favicon/apple-touch-icon-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:156f84c7b88b53bcd0b9517878bc0d17b80dbdcb11bcdea98699a2bf00a5d0df`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/ui/src/assets/favicon/apple-touch-icon-v3.png, line=1, proof_window=None
454. `medium` `context` `packages/ui/src/assets/favicon/favicon-96x96-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:56b0c5580e02e44bf9684c39fe15d18068582ed637d2bd42afcdf72de448471e`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/ui/src/assets/favicon/favicon-96x96-v3.png, line=1, proof_window=None
455. `medium` `context` `packages/ui/src/assets/favicon/favicon-v3.ico:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:0cddfbcc20ca03a7ac1598c63cd58e547735b81e643620e7f46d86a8a8edfe8b`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/ui/src/assets/favicon/favicon-v3.ico, line=1, proof_window=None
456. `medium` `context` `packages/ui/src/assets/favicon/favicon-v3.svg:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:79fdbd9a82dc429bb72b30a36e67975ce973ffc8ba1502eecf0df407687b5142`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/ui/src/assets/favicon/favicon-v3.svg, line=1, proof_window=None
457. `high` `vibe` `packages/ui/src/components/avatar.tsx:50`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:daa0ebd4e6355421cb2920d54661b7a31144e0e8e4a2479999d26e1cada7f916`
   Evidence: packages/ui/src/components/avatar.tsx:50, future-hostile/dead-language term `fallback` appears
458. `high` `vibe` `packages/ui/src/components/basic-tool.tsx:202`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b93ae9e907d9652c0570eff36beda9aa3fa2961f7989022dae80d58bed32dcfd`
   Evidence: packages/ui/src/components/basic-tool.tsx:202, future-hostile/dead-language term `fallback` appears
459. `high` `vibe` `packages/ui/src/components/file-icon.tsx:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2d9427a9500914786c7322daf9a3765677e25037814ad821615ff3c336bf48a9`
   Evidence: packages/ui/src/components/file-icon.tsx:25, future-hostile/dead-language term `fallback` appears
460. `high` `vibe` `packages/ui/src/components/file-icons/types.ts:76`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b93a17bd2f9be4be044827eed9de3cacad2d1ee02ea318bd6f9d21b341b63754`
   Evidence: packages/ui/src/components/file-icons/types.ts:76, future-hostile/dead-language term `todo` appears
461. `high` `vibe` `packages/ui/src/components/file-icons/types.ts:391`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `hack` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e6f962d76265c07b131777638a8da641209ae5c16cd784a15e950817ada7e009`
   Evidence: packages/ui/src/components/file-icons/types.ts:391, future-hostile/dead-language term `hack` appears
462. `high` `vibe` `packages/ui/src/components/file-media.tsx:167`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0bb8b2c0991e68703c7c3d7f31609ec340854458c6e8b221569af264cf8069a5`
   Evidence: packages/ui/src/components/file-media.tsx:167, future-hostile/dead-language term `fallback` appears
463. `high` `vibe` `packages/ui/src/components/file-search.tsx:32`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0e1586ec58cd1703e7ad6bca916908e7cb69a7bbf0703bec9d925ce9c44abf1e`
   Evidence: packages/ui/src/components/file-search.tsx:32, future-hostile/dead-language term `placeholder` appears
464. `high` `vibe` `packages/ui/src/components/file-search.tsx:34`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c8807448d6de0564d728800743c75d1f2353475b17aa48510e54617645f37d46`
   Evidence: packages/ui/src/components/file-search.tsx:34, future-hostile/dead-language term `placeholder` appears
465. `high` `vibe` `packages/ui/src/components/line-comment-annotations.tsx:129`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0f7a1a41172c955c162e694890a011b366648a54dfd5e75090bd889ec84e4a4e`
   Evidence: packages/ui/src/components/line-comment-annotations.tsx:129, future-hostile/dead-language term `fallback` appears
466. `high` `vibe` `packages/ui/src/components/line-comment.tsx:19`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5918587aad6f77c84c4b4710fc6a2e3ac44551272808edf8a25232a36e4d0cb0`
   Evidence: packages/ui/src/components/line-comment.tsx:19, future-hostile/dead-language term `fallback` appears
467. `high` `vibe` `packages/ui/src/components/line-comment.tsx:79`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:73745d5a4ead50838b4ceffda95022d09b5bf058dd9f8e387957f662afa1ac13`
   Evidence: packages/ui/src/components/line-comment.tsx:79, future-hostile/dead-language term `fallback` appears
468. `high` `vibe` `packages/ui/src/components/line-comment.tsx:92`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:79c8263a133ddbb9a94a05b4e03f32fc84cb9764d3a1a4566ecdeda784d89a29`
   Evidence: packages/ui/src/components/line-comment.tsx:92, future-hostile/dead-language term `fallback` appears
469. `high` `vibe` `packages/ui/src/components/line-comment.tsx:318`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:13978c6151c564fdc3ba003d6a43fc270e839454170c40486d6364c391c53ba9`
   Evidence: packages/ui/src/components/line-comment.tsx:318, future-hostile/dead-language term `placeholder` appears
470. `high` `vibe` `packages/ui/src/components/line-comment.tsx:403`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f1559855d51b17e63783db9cd1898eabb013a306378d939c7a76ceb139c7a06b`
   Evidence: packages/ui/src/components/line-comment.tsx:403, future-hostile/dead-language term `fallback` appears
471. `high` `vibe` `packages/ui/src/components/list.tsx:321`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:eaaab05501f82f5df03db820e018e23768219cd07b5bbe847578927cc07a6752`
   Evidence: packages/ui/src/components/list.tsx:321, future-hostile/dead-language term `fallback` appears
472. `high` `vibe` `packages/ui/src/components/message-nav.tsx:55`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a40aa3a47f44250e74d8df5a4a4334fe172c26616cc408fd19ec64e98ffd7716`
   Evidence: packages/ui/src/components/message-nav.tsx:55, future-hostile/dead-language term `fallback` appears
473. `high` `vibe` `packages/ui/src/components/message-part.tsx:29`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:17077cba5ca5bddce9a346b7e78f41693b463fc60eb4fbb79611a2b2a8dcc147`
   Evidence: packages/ui/src/components/message-part.tsx:29, future-hostile/dead-language term `todo` appears
474. `high` `vibe` `packages/ui/src/components/message-part.tsx:1085`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e33130e5b10e9735deae9edb0965b7b79be0bd5aa2f04c5d21425d6c4246e77f`
   Evidence: packages/ui/src/components/message-part.tsx:1085, future-hostile/dead-language term `fallback` appears
475. `high` `vibe` `packages/ui/src/components/message-part.tsx:1474`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:125d7771622b0e6b9c783c72b8050b1146a93154301b6860f9cf3748482689ef`
   Evidence: packages/ui/src/components/message-part.tsx:1474, future-hostile/dead-language term `fallback` appears
476. `high` `vibe` `packages/ui/src/components/message-part.tsx:1516`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:193457f3daee2983c9d1899f5c2db8c578bf22bc263774471c6d6016f127183e`
   Evidence: packages/ui/src/components/message-part.tsx:1516, future-hostile/dead-language term `fallback` appears
477. `high` `vibe` `packages/ui/src/components/message-part.tsx:2017`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:beab4fe7b5b1d8028fc906181ecee9d94a116ae5d2816f27978c56c9648c67f6`
   Evidence: packages/ui/src/components/message-part.tsx:2017, future-hostile/dead-language term `fallback` appears
478. `high` `vibe` `packages/ui/src/components/message-part.tsx:2193`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:daf8e4ac1d345d201290cd3f1619f66249347481d9db474994e920a66ff31420`
   Evidence: packages/ui/src/components/message-part.tsx:2193, future-hostile/dead-language term `todo` appears
479. `high` `vibe` `packages/ui/src/components/message-part.tsx:2209`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:34e96dbbe42c7b5dfc3a5b0366fe8778ca8b468942740b932c9ccd86af38ac47`
   Evidence: packages/ui/src/components/message-part.tsx:2209, future-hostile/dead-language term `todo` appears
480. `high` `vibe` `packages/ui/src/components/popover.tsx:148`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f7793b9d54aa582147cd111aa8f3747866729f1e0799dc28115cb463bd78341e`
   Evidence: packages/ui/src/components/popover.tsx:148, future-hostile/dead-language term `fallback` appears
481. `high` `vibe` `packages/ui/src/components/session-retry.tsx:60`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0e4dcc7a89910477ed09fdb140d7150a3eaefcc5fd90c83b9128b3191ec37ed4`
   Evidence: packages/ui/src/components/session-retry.tsx:60, future-hostile/dead-language term `fallback` appears
482. `high` `vibe` `packages/ui/src/components/session-review.tsx:383`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:17cc2680e4281f0fc98a21450762bcae545a6009e8ed0972b9ea855268da1310`
   Evidence: packages/ui/src/components/session-review.tsx:383, future-hostile/dead-language term `fallback` appears
483. `high` `vibe` `packages/ui/src/components/text-field.tsx:104`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dab9c4d850648f0b26b8d46b1f8140aa07e2c4f7ac588ee1f50d9cd858568dd1`
   Evidence: packages/ui/src/components/text-field.tsx:104, future-hostile/dead-language term `fallback` appears
484. `high` `vibe` `packages/ui/src/components/timeline-playground.stories.tsx:1978`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:db7b87f900340fd673a6d79cacb8d4fcb36703e60fe362628c7afc903dada7ef`
   Evidence: packages/ui/src/components/timeline-playground.stories.tsx:1978, future-hostile/dead-language term `fallback` appears
485. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:4`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:84c8a8690de0229ff6c6259f2e455146b1c0591e6705e537155ea76a3dd0624d`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:4, future-hostile/dead-language term `todo` appears
486. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:de87294e1f55c90d5d5a068cefa74d7aa5f089b1151f2b259237140e3a44651d`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:9, future-hostile/dead-language term `todo` appears
487. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:176`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b07ced2ae02090d81a019532e2f6082400daaf0d75f064d724910117a45a6e5a`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:176, future-hostile/dead-language term `todo` appears
488. `high` `vibe` `packages/ui/src/components/tool-error-card.tsx:96`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c0d593f3f4d65aa4374cc6638535bc93819efd10b594babcb5d94737193a35eb`
   Evidence: packages/ui/src/components/tool-error-card.tsx:96, future-hostile/dead-language term `fallback` appears
489. `high` `vibe` `packages/ui/src/components/tool-status-title.tsx:111`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:64875ef42bc22f81ebbac44a38f7a05c81ffc9c80a216e6b1c4be7554fd7da2e`
   Evidence: packages/ui/src/components/tool-status-title.tsx:111, future-hostile/dead-language term `fallback` appears
490. `high` `vibe` `packages/ui/src/storybook/scaffold.tsx:48`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:aad066c16bcb4ede51f087296da01af9d08572bbd69f8b601fb899fe9850ff7f`
   Evidence: packages/ui/src/storybook/scaffold.tsx:48, future-hostile/dead-language term `fallback` appears
491. `medium` `context` `packages/web/public/apple-touch-icon-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:550a282128e4e1cb16116e0e8ca43bc335f25b75a98e7183b5ebd2089017dcc8`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/web/public/apple-touch-icon-v3.png, line=1, proof_window=None
492. `medium` `context` `packages/web/public/favicon-96x96-v3.png:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:cd973013c4e5459f90a62444467209abe50ad5872d941ba1df7249e5a815f9e0`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/web/public/favicon-96x96-v3.png, line=1, proof_window=None
493. `medium` `context` `packages/web/public/favicon-v3.ico:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:eed19f62b403c6a129f278d4bd14570b1216ca15187d8438051291745f9cc6b7`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/web/public/favicon-v3.ico, line=1, proof_window=None
494. `medium` `context` `packages/web/public/favicon-v3.svg:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:e45ff50d6c05aa263e1e5c1760485d5d175393a4c3ed11cff2580ad3eb58932b`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/web/public/favicon-v3.svg, line=1, proof_window=None
495. `high` `vibe` `packages/web/src/components/Share.tsx:310`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ed5f2e9d6da6b9bf0af1148cf1ef1733a958a768b75af382dfdf7d5c0b9cfaf3`
   Evidence: packages/web/src/components/Share.tsx:310, future-hostile/dead-language term `fallback` appears
496. `high` `vibe` `packages/web/src/components/Share.tsx:346`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:294cd35b3ba68dd890d127eb41183ea10c217c4debc6dd40ed1c3e752ef72398`
   Evidence: packages/web/src/components/Share.tsx:346, future-hostile/dead-language term `fallback` appears
497. `high` `vibe` `packages/web/src/components/Share.tsx:444`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e86e1c1db9238a1e602f73e76c150b7fb597272c222255198c41a862dc264c37`
   Evidence: packages/web/src/components/Share.tsx:444, future-hostile/dead-language term `fallback` appears
498. `high` `vibe` `packages/web/src/components/share/part.tsx:305`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:85017161242b162196036627bfc06488d806b66815795c865f1b0104fe9974a7`
   Evidence: packages/web/src/components/share/part.tsx:305, future-hostile/dead-language term `todo` appears
499. `high` `vibe` `packages/web/src/components/share/part.tsx:391`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a7e2c8cd936ae3ba87076a6decf78354c9255b1b430ba627e7d7f7d9a5c65d41`
   Evidence: packages/web/src/components/share/part.tsx:391, future-hostile/dead-language term `todo` appears
500. `high` `vibe` `packages/web/src/components/share/part.tsx:397`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d6a91c59e09c7a44d260bcc09f68e8a242730b190cc5f7c7e65d773ecdc91b85`
   Evidence: packages/web/src/components/share/part.tsx:397, future-hostile/dead-language term `todo` appears
501. `high` `vibe` `packages/web/src/components/share/part.tsx:399`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bd5f7744e9c66cfd64625179b1b58f1dd069ee29ff9c7b2a95f21070b4d07578`
   Evidence: packages/web/src/components/share/part.tsx:399, future-hostile/dead-language term `todo` appears
502. `high` `vibe` `packages/web/src/components/share/part.tsx:400`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:161d76c5a26ca3f08601dd9dfb1f4bf8e07c6205712f0131b966aeb6428918fe`
   Evidence: packages/web/src/components/share/part.tsx:400, future-hostile/dead-language term `todo` appears
503. `high` `vibe` `packages/web/src/components/share/part.tsx:406`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:99af348e62fb119d60ad9c9981efd70983add95d39c02b2e0d5c4cbf7e252851`
   Evidence: packages/web/src/components/share/part.tsx:406, future-hostile/dead-language term `fallback` appears
504. `high` `vibe` `packages/web/src/components/share/part.tsx:669`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ad1a977e7b3f7519555ef22808cb7d5566d6baa74f6e068c283492df351eb75f`
   Evidence: packages/web/src/components/share/part.tsx:669, future-hostile/dead-language term `fallback` appears
505. `high` `vibe` `packages/web/src/components/share/part.tsx:802`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d42a78e1b3dad9c553d7d71489d5ed1265c97cec7d7bfda2daf3118d03a88bf3`
   Evidence: packages/web/src/components/share/part.tsx:802, future-hostile/dead-language term `fallback` appears

## Policy

- Policy file: `./agent/audit-policy.toml`
- Minimum score: `85`
- Fail on: `critical, high`

## Agent Fix Queue

1. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `.jekko/plugins/tui-smoke.tsx` - use argv arrays, prepared statements, or a safe allowlisted command path
   Route: `Contracts/data`/`fast`
2. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/dialog-select-directory.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
3. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/terminal.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
4. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/context/global-sync.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
5. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/context/global-sync/event-reducer.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
6. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/pages/layout.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
7. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/pages/session.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
8. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
9. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
10. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/component/header.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
11. `high` `HLT-019-STREAMING-RUNTIME-DRIFT` `packages/console/app/src/i18n/de.ts` - move Kafka/Tansu/Iggy/Fluvio/NATS/Redis-stream clients behind `crates/adapters/queues` or document a brownfield exception with owner, expiry, and migration path
   Route: `Contracts/data`/`db`
12. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/bench/[id].tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
13. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/bench/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
14. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/black/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
15. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/black/subscribe/[plan].tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
16. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/enterprise/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
17. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/anthropic.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
18. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/google.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
19. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
20. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/openai.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
21. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
22. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
23. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/script/lookup-user.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
24. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/src/user.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
25. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
26. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/function/src/auth.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
27. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/function/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
28. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/mail/emails/components.tsx` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
29. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/mail/emails/styles.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
30. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260127222353_familiar_lady_ursula/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
31. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260228203230_blue_harpoon/migration.sql` - add a WHERE clause or prove the full-table rewrite with a local migration receipt
   Route: `Contracts/data`/`db`
32. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260323234822_events/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
33. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260410174513_workspace-name/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
34. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260413175956_chief_energizer/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
35. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260427172553_slow_nightmare/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
36. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260507054800_memory_os/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
37. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/jekko/migration/20260507224841_daemon_runtime/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
38. `high` `HLT-002-GENERATED-MUTATION` `packages/sdk/js/src/gen/client/client.gen.ts` - add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Route: `Contracts/data`/`contract`
39. `high` `HLT-004-UNMAPPED-PROOF` `agent/test-map.json` - add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Route: `Verification`/`fast`
40. `high` `HLT-008-FALSE-GREEN-RISK` `packages/app/e2e/todo.spec.ts` - replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Route: `Verification`/`fast`
41. `medium` `HLT-018-PERF-CONCURRENCY-DRIFT` `Justfile` - add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Route: `Verification`/`fast`
42. `medium` `HLT-026-COST-BUDGET-GAP` `docs/testing.md` - add explicit budgets, quotas, stop conditions, and kill-switch evidence for paid or unbounded operations
   Route: `Verification`/`release`
43. `medium` `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP` `packages/jekko/test/provider/copilot/copilot-chat-model.test.ts` - attach raw CI logs, review receipts, and replayable commands instead of accepting claims or summaries
   Route: `Repair`/`audit`
44. `high` `HLT-003-OWNERLESS-PATH` `agent/owner-map.json` - add the narrowest stable prefix for this path to `agent/owner-map.json`
   Route: `Context/setup`/`fast`
45. `high` `packages/app/public/oc-theme-preload.js` - move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Route: `Context/setup`/`audit`
46. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/app/public/apple-touch-icon-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
47. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/app/public/favicon-96x96-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
48. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/app/public/favicon-v3.ico` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
49. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/app/public/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
50. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/console/app/public/apple-touch-icon-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
51. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/console/app/public/favicon-96x96-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
52. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/console/app/public/favicon-v3.ico` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
53. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/console/app/public/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
54. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/desktop/scripts/copy-bundles.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
55. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/desktop/scripts/copy-icons.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
56. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/docs/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
57. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/enterprise/public/apple-touch-icon-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
58. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/enterprise/public/favicon-96x96-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
59. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/enterprise/public/favicon-v3.ico` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
60. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/enterprise/public/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
61. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/jekko/src/server/routes/instance/httpapi/handlers/v2.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
62. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/jekko/src/session/message-v2.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
63. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/ui/src/assets/favicon/apple-touch-icon-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
64. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/ui/src/assets/favicon/favicon-96x96-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
65. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/ui/src/assets/favicon/favicon-v3.ico` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
66. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/ui/src/assets/favicon/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
67. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/web/public/apple-touch-icon-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
68. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/web/public/favicon-96x96-v3.png` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
69. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/web/public/favicon-v3.ico` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
70. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/web/public/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
71. `critical` `HLT-010-SECRET-SPRAWL` `infra/console.ts` - remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Route: `Security, secrets, agency`/`security`
72. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/check-encrypted-paths.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
73. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/check-encrypted-paths.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
74. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/check-encrypted-paths.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
75. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/docs-locale-sync.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
76. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/docs-locale-sync.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
77. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/jekko.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
78. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-standards.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
79. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-standards.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
80. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-standards.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
81. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-github-action.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
82. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-github-action.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
83. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-vscode.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
84. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-vscode.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
85. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
86. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - remove the non-blocking override so scan failures stop the pipeline
   Route: `Security, secrets, agency`/`security`
87. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - never echo secrets; pass them directly to trusted binaries and keep shell tracing off
   Route: `Security, secrets, agency`/`security`
88. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - limit the path to build outputs and keep credential files out of caches and artifacts
   Route: `Security, secrets, agency`/`security`
89. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/release-github-action.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
90. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/release-github-action.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
91. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/review.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
92. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/triage.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
93. `high` `HLT-001-DEAD-MARKER` `.jekko/plugins/tui-smoke.tsx` - replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Route: `Entropy`/`fast`
94. `high` `HLT-023-INPUT-BOUNDARY-GAP` `.jekko/plugins/tui-smoke.tsx` - replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Route: `Security, secrets, agency`/`security`
95. `high` `HLT-013-RENDERED-UX-GAP` `apps/web` - add Storybook state coverage, Playwright screenshots, visual review or `@jankurai/ux-qa`, accessibility scans, CLS checks, generated mocks, and design tokens
   Route: `Verification and rendered UX`/`web`
96. `high` `HLT-001-DEAD-MARKER` `github/index.ts` - collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Route: `Entropy`/`fast`
97. `high` `infra/console.ts` - extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Route: `Entropy`/`fast`
98. `high` `HLT-001-DEAD-MARKER` `packages/app/e2e/todo.spec.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
99. `high` `HLT-001-DEAD-MARKER` `packages/app/src/app.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
100. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/dialog-edit-project.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
101. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/dialog-select-file.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
102. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/dialog-select-server.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
103. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/file-tree.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
104. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
105. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input/image-attachments.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
106. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input/slash-popover.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
107. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/server/server-row.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
108. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/session/session-header.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
109. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/session/session-sortable-tab.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
110. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/settings-keybinds.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
111. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/settings-models.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
112. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/settings-providers.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
113. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/status-popover-body.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
114. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/status-popover.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
115. `high` `HLT-001-DEAD-MARKER` `packages/app/src/context/global-sync/utils.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
116. `high` `HLT-001-DEAD-MARKER` `packages/app/src/context/sync.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
117. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/error.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
118. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
119. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/inline-editor.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
120. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/sidebar-items.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
121. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/sidebar-project.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
122. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/sidebar-workspace.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
123. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/composer/session-composer-region.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
124. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/composer/session-question-dock.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
125. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/message-timeline.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
126. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/session-side-panel.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
127. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/terminal-panel.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
128. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/app/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
129. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/component/email-signup.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
130. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/bench/[id].tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
131. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/bench/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
132. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/black/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
133. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/black/subscribe/[plan].tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
134. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/enterprise/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
135. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace-picker.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
136. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
137. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
138. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/redeem-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
139. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/reload-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
140. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
141. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
142. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
143. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/new-user-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
144. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
145. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/settings/settings-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
146. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/usage/graph-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
147. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
148. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/console/app/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
149. `high` `HLT-001-DEAD-MARKER` `packages/enterprise/src/routes/share/[shareID].tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
150. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/enterprise/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
151. `high` `HLT-001-DEAD-MARKER` `packages/jekko/script/httpapi-exercise.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
152. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/acp/agent.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
153. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/agent-script/parser.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
154. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/agent-script/parser.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
155. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/agent-script/schema.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
156. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/github.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
157. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/run.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
158. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/app.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
159. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/component/dialog-model.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
160. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/component/dialog-status.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
161. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/component/prompt/autocomplete.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
162. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/component/prompt/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
163. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/component/spinner.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
164. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/jnoccio-ws.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
165. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/sync-legacy.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
166. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/sync.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
167. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/theme.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
168. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/context/zyal-flash.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
169. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/mcp.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
170. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
171. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/feature-plugins/system/session-debug.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
172. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/plugin/internal.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
173. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/routes/session/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
174. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/routes/session/permission.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
175. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/routes/session/sidebar.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
176. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/ui/dialog-prompt.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
177. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/cli/cmd/tui/ui/dialog-select.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
178. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/config/provider.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
179. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/effect/app-runtime.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
180. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/plugin/loader.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
181. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/provider/models.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
182. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/provider/provider.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
183. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/server/routes/instance/httpapi/groups/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
184. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/server/routes/instance/httpapi/handlers/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
185. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/server/routes/instance/httpapi/server.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
186. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/server/routes/instance/index.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
187. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/server/routes/instance/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
188. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/daemon-pass.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
189. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/daemon-retry.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
190. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/daemon-task-router.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
191. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/llm.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
192. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/pending.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
193. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/processor.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
194. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/prompt.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
195. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/session/todo.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
196. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/tool/pending.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
197. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/tool/registry.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
198. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/tool/todo.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
199. `high` `HLT-001-DEAD-MARKER` `packages/jekko/src/v2/model.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
200. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/config/config.part-07.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
201. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/effect/app-runtime-logger.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
202. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/provider/models.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
203. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/server/httpapi-sdk.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
204. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/session/daemon-memory.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
205. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/session/daemon-retry.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
206. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/session/prompt.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
207. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/session/schema-decoding.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
208. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/session/snapshot-tool-race.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
209. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/storage/json-migration.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
210. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/tool/parameters.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
211. `high` `HLT-001-DEAD-MARKER` `packages/jekko/test/tool/registry.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
212. `high` `HLT-001-DEAD-MARKER` `packages/plugin/src/tui.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
213. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/avatar.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
214. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/basic-tool.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
215. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-icon.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
216. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-icons/types.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
217. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-media.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
218. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-search.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
219. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/line-comment-annotations.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
220. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/line-comment.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
221. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/list.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
222. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/message-nav.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
223. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/message-part.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
224. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/popover.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
225. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/session-retry.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
226. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/session-review.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
227. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/text-field.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
228. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/timeline-playground.stories.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
229. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/todo-panel-motion.stories.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
230. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/tool-error-card.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
231. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/tool-status-title.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
232. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/storybook/scaffold.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
233. `high` `HLT-001-DEAD-MARKER` `packages/web/src/components/Share.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
234. `high` `HLT-001-DEAD-MARKER` `packages/web/src/components/share/part.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
235. `medium` `HLT-001-DEAD-MARKER` `.` - split large or ambiguous authored code into smaller semantic modules with focused tests
   Route: `Entropy`/`fast`
236. `medium` `HLT-016-SUPPLY-CHAIN-DRIFT` `.github/workflows/jankurai.yml` - wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Route: `Security, secrets, agency`/`security`
