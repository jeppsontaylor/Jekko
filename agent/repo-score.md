# jankurai Repo Score

- Standard: `jankurai`
- Auditor: `0.8.11`
- Schema: `1.6.0`
- Paper edition: `2026.05-ed8`
- Target stack ID: `rust-ts-vite-react-postgres-bounded-python`
- Target stack: `Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service`
- Repo: `.`
- Run ID: `1778172212`
- Started at: `1778172212`
- Elapsed: `35029` ms
- Scope: `full`
- Raw score: `75`
- Final score: `60`
- Decision: `advisory`
- Minimum score: `85`
- Caps applied: `no-security-lane-on-high-risk-repo, no-secret-or-dependency-scanning-in-ci, non-optimal-product-language-found, vibe-placeholders-in-product-code, fallback-soup-in-product-code, future-hostile-dead-language-in-product-code, severe-duplication-in-product-code, generated-zone-mutation-risk, missing-rendered-ux-qa-lane, secret-like-content-detected, false-green-test-risk, input-boundary-gap, streaming-runtime-drift, sql-bad-behavior, typescript-bad-behavior, docker-bad-behavior, ci-bad-behavior, web-security-bad-behavior, repo-rot-bad-behavior`

## Hard Rule Caps

| Rule | Max Score | Applied |
| --- | ---: | --- |
| `no-root-agent-instructions` | 75 | no |
| `no-one-command-setup-or-validation` | 70 | no |
| `no-deterministic-fast-lane` | 65 | no |
| `no-security-lane-on-high-risk-repo` | 60 | yes |
| `generated-contracts-or-public-api-drift-untested` | 80 | no |
| `python-direct-product-truth-or-db-ownership` | 72 | no |
| `no-secret-or-dependency-scanning-in-ci` | 78 | yes |
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
| Security and supply-chain posture | 12 | 64 | 7.68 | lockfile present; secret or dependency scan tooling found |
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
- Envelope exit code: `0` · elapsed: `17` ms · strict: `false`
- Commands — ran: `1`, skipped: `0`, failed: `0`
- Generated at: `1778166929`
- Git HEAD (envelope): `0e09372fd1e14cd4c8277881fd23fc6e1947aebf`

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
2. `high` `security` `.github/workflows`
   Rule: `HLT-009-GENERATED-SECURITY`
   Check: `HLT-009-GENERATED-SECURITY:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: high-risk repo has no explicit security lane
   Fix: add a dedicated security lane with secret scanning, dependency review, and workflow linting
   Rerun: `just security`
   Fingerprint: `sha256:c249be982d975721833fe396cdfff422f53a2d61819df881968fba63fdd6b9bf`
   Evidence: no security lane markers found
3. `high` `security` `.github/workflows`
   Rule: `HLT-016-SUPPLY-CHAIN-DRIFT`
   Check: `HLT-016-SUPPLY-CHAIN-DRIFT:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: no secret or dependency scanning was found in CI
   Fix: add secret scanning, dependency review, and SBOM or provenance checks to CI
   Rerun: `just security`
   Fingerprint: `sha256:2e22551cbdbd8da1f6fedd2d509dba064990dc4b1505df71609f431d11901099`
   Evidence: no CI scan markers found
4. `high` `security` `.github/workflows/docs-locale-sync.yml:20`
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
5. `high` `security` `.github/workflows/docs-locale-sync.yml:24`
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
6. `high` `security` `.github/workflows/docs-locale-sync.yml:54`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:58e0e923f4fe83904de413db3c7ca3e07f3f867661bd430c108a9fc93d612149`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/docs-locale-sync.yml, line=54, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash -
7. `medium` `security` `.github/workflows/jankurai.yml`
   Rule: `HLT-016-SUPPLY-CHAIN-DRIFT`
   Check: `HLT-016-SUPPLY-CHAIN-DRIFT:security` `soft` confidence `0.76`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: `Security and supply-chain posture` scored 64 below the standard floor of 85
   Fix: wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Rerun: `just security`
   Fingerprint: `sha256:448fef8ddc7723add084cc7c7c107d8cc3ee2a2440a375749c98a2cec4d642b9`
   Evidence: lockfile present, secret or dependency scan tooling found, provenance/SBOM tooling found, canonical security lane wrapper present
8. `high` `security` `.github/workflows/jankurai.yml:28`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:ffacf28c6809abe7729e789de1498381e6370a8c7f153158409b03c10e39477c`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/jankurai.yml, line=28, proof_window=None, snippet=uses: github/codeql-action/upload-sarif@v2
9. `high` `security` `.github/workflows/opencode.yml:34`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:f4409cd68dc48838fcf9313c2320676dac7cd73e14d99ba87c178caf8f47a6f1`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/opencode.yml, line=34, proof_window=None, snippet=uses: anomalyco/opencode/github@v1.0.220
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
54. `high` `security` `.github/workflows/review.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:ee28699a9ec6051cff0052e5f9dfb1b61a27695ed14389a981ed571efcf98791`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/review.yml, line=1, proof_window=None, snippet=name: review
55. `high` `security` `.github/workflows/review.yml:35`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:4a8ac492455055a061b1c4a78567ebe865f39811fe7930be46ecb37277bf0c0a`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/review.yml, line=35, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash -s -- --version v1.0.220
56. `high` `security` `.github/workflows/stats.yml:1`
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
57. `high` `security` `.github/workflows/triage.yml:23`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:31091e87505a8a41edd98a2ac05e536f0fe1229a0845c14dd5a0612f684fe95e`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/triage.yml, line=23, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash
58. `high` `vibe` `.opencode/plugins/tui-smoke.tsx:680`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `agent`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: product code contains TODO/stub/unimplemented/unreachable placeholder markers
   Fix: replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Rerun: `just fast`
   Fingerprint: `sha256:abe0534991e954e8f8a08fbbe89b78ccab8c59a788c0fedd0103382edde1e606`
   Evidence: .opencode/plugins/tui-smoke.tsx:680 placeholders={{ normal }}
59. `high` `boundary` `.opencode/plugins/tui-smoke.tsx:852`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `agent`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:cf5f66102b9be7e72763c6b7417a78e4ff7f6b2a29575981d10e68e04a13c44f`
   Evidence: detector=typescript.security.raw-command-sql, path=.opencode/plugins/tui-smoke.tsx, line=852, snippet=title: `${input.label} select dialog`,
60. `high` `security` `.opencode/plugins/tui-smoke.tsx:852`
   Rule: `HLT-023-INPUT-BOUNDARY-GAP`
   Check: `HLT-023-INPUT-BOUNDARY-GAP:security` `hard` confidence `0.88`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `agent`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Matched term: `string sql`
   Reason: input handling risk needs deterministic negative tests
   Fix: replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Rerun: `just security`
   Fingerprint: `sha256:905c5fb22e3da655bc8faf1f94f84bb2e7ac0f2b0f039179bb2952d819a7fa27`
   Evidence: title: `${input.label} select dialog`,
61. `medium` `proof` `Justfile`
   Rule: `HLT-018-PERF-CONCURRENCY-DRIFT`
   Check: `HLT-018-PERF-CONCURRENCY-DRIFT:proof` `soft` confidence `0.76`
   Route: TLR `Verification`, lane `fast`, owner `workspace`
   Docs: `docs/testing.md`
   Reason: `Build speed signals` scored 70 below the standard floor of 85
   Fix: add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Rerun: `just fast`
   Fingerprint: `sha256:a256a7390d4b91a5b0a95d6f092e524c8f4080f27fe2b62e28cf0801343d0fef`
   Evidence: build acceleration markers found, targeted test/build commands found, locked dependency graph present, CI cache hint found
62. `high` `ux-qa` `apps/web`
   Rule: `HLT-013-RENDERED-UX-GAP`
   Check: `HLT-013-RENDERED-UX-GAP:ux-qa` `hard` confidence `0.88`
   Route: TLR `Verification and rendered UX`, lane `web`, owner `apps`
   Docs: `docs/testing.md`
   Reason: web surface lacks layered rendered UX QA evidence
   Fix: add Storybook state coverage, Playwright screenshots, visual review or `@jankurai/ux-qa`, accessibility scans, CLS checks, generated mocks, and design tokens
   Rerun: `just ux-qa`
   Fingerprint: `sha256:571d35c2e730a393b782bac14825b197c0543920bb21967079d264ac602ea5b1`
   Evidence: rendered UX QA lane missing
63. `medium` `release` `docs/testing.md`
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
64. `high` `vibe` `github/index.ts:300`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `agent`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: fallback soup detected in product code
   Fix: collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Rerun: `just fast`
   Fingerprint: `sha256:84b6eb14b447dca5ef73be507cf6d8f8dee70ac3f973395a21cf1048c063b813`
   Evidence: github/index.ts:300 return null
65. `high` `vibe` `infra/console.ts:1`
   Check: `HLT-000-SCORE-DIMENSION:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `ops`
   Reason: duplicated product code block detected
   Fix: extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Rerun: `just fast`
   Fingerprint: `sha256:c6cb7aa0947f7627ce6408a79cbaeb81f8afacb65f8a8b20244c65e78ae0a330`
   Evidence: duplicate block also appears at infra/console.ts:1
66. `critical` `security` `infra/console.ts:38`
   Rule: `HLT-010-SECRET-SPRAWL`
   Check: `HLT-010-SECRET-SPRAWL:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: secret-like value or credential material appears in repository text
   Fix: remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Rerun: `just security`
   Fingerprint: `sha256:c1be9a0a5ed8a59458f4e9cf664107f16928421beab1cbc2a3653410979c0324`
   Evidence: password: password.plaintext,
67. `high` `stack` `packages/app/public/oc-theme-preload.js`
   Check: `HLT-000-SCORE-DIMENSION:stack` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Reason: runtime code uses a language outside the chosen optimal stack
   Fix: move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Rerun: `just score`
   Fingerprint: `sha256:139c59be93ae16bacd0a8718f1a15dcf6146bda8f4c66065769a29f3c2e62f0a`
   Evidence: packages/app/public/oc-theme-preload.js uses `.js`, Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service
68. `high` `vibe` `packages/app/src/app.tsx:153`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f00a5b87d11d9c5f58522b0663b7cff1d80495c06c12a92b776cd1779b4059fe`
   Evidence: packages/app/src/app.tsx:153, future-hostile/dead-language term `fallback` appears
69. `high` `vibe` `packages/app/src/app.tsx:219`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5f8c905a30bd7917cc5e7fbcb6cba14bbd447fab052944392f5caab5c6d887ca`
   Evidence: packages/app/src/app.tsx:219, future-hostile/dead-language term `fallback` appears
70. `high` `boundary` `packages/app/src/components/dialog-edit-project.tsx:68`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:3f8fa05bb593c98f6d8c7c05bd84b85cb7787826f2f8b45f6eb04bc5b68c6311`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/components/dialog-edit-project.tsx, line=68, snippet=const input = e.target as HTMLInputElement
71. `high` `vibe` `packages/app/src/components/dialog-edit-project.tsx:155`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bb962caa68a755d037323dca6176206c1e20d12702643323428e1fb8f73868c1`
   Evidence: packages/app/src/components/dialog-edit-project.tsx:155, future-hostile/dead-language term `fallback` appears
72. `high` `boundary` `packages/app/src/components/dialog-select-directory.tsx:194`
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
73. `high` `vibe` `packages/app/src/components/dialog-select-file.tsx:406`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:81f2efa58e6ae22406f18c1f435c7699d4b0769e6cb8a60f372cfb7efa62e2b1`
   Evidence: packages/app/src/components/dialog-select-file.tsx:406, future-hostile/dead-language term `fallback` appears
74. `high` `vibe` `packages/app/src/components/dialog-select-server.tsx:510`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6152370ce8a3db86ad83e70b1f0804f40da319eb048f55a14518506770fddb0a`
   Evidence: packages/app/src/components/dialog-select-server.tsx:510, future-hostile/dead-language term `fallback` appears
75. `high` `vibe` `packages/app/src/components/dialog-select-server.tsx:625`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e54d649b63a6e5c993f66e0d010884d28ad10628b73edbd0a7d7bf37af3a3f83`
   Evidence: packages/app/src/components/dialog-select-server.tsx:625, future-hostile/dead-language term `fallback` appears
76. `high` `vibe` `packages/app/src/components/file-tree.tsx:432`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1434cc9c76e742fa88e37dad2665c794a0889af691c44d4cc79f29dd13d1061d`
   Evidence: packages/app/src/components/file-tree.tsx:432, future-hostile/dead-language term `fallback` appears
77. `high` `vibe` `packages/app/src/components/prompt-input.tsx:1541`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fc57a581c903e0c12f46d82ce702e0608ff7423f095670617c2a7be8a683d6cd`
   Evidence: packages/app/src/components/prompt-input.tsx:1541, future-hostile/dead-language term `fallback` appears
78. `high` `vibe` `packages/app/src/components/prompt-input/image-attachments.tsx:30`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8a081bc1ca1b02bb4cecd3a8289f0fb8abeb58504b271f6b00ae5f8b49bba39b`
   Evidence: packages/app/src/components/prompt-input/image-attachments.tsx:30, future-hostile/dead-language term `fallback` appears
79. `high` `vibe` `packages/app/src/components/prompt-input/slash-popover.tsx:52`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9449d503460ad37bb2b3196f52f753b3233258125338966f8fb85b330a4035b5`
   Evidence: packages/app/src/components/prompt-input/slash-popover.tsx:52, future-hostile/dead-language term `fallback` appears
80. `high` `vibe` `packages/app/src/components/prompt-input/slash-popover.tsx:99`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:450bdc93ad4f5e9a04ea36db3025ff5ec8fded4bcc4b2d1aaffd690446f2a9db`
   Evidence: packages/app/src/components/prompt-input/slash-popover.tsx:99, future-hostile/dead-language term `fallback` appears
81. `high` `vibe` `packages/app/src/components/server/server-row.tsx:81`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6ccd7851ee827896ce1b6c2cf74314ec5879e674e09d329e950b36673c5a2481`
   Evidence: packages/app/src/components/server/server-row.tsx:81, future-hostile/dead-language term `fallback` appears
82. `high` `vibe` `packages/app/src/components/session/session-header.tsx:319`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7a977d76564f5dfb1fd5848875c7385b47dc061ba6e372e86877ee0830141000`
   Evidence: packages/app/src/components/session/session-header.tsx:319, future-hostile/dead-language term `fallback` appears
83. `high` `vibe` `packages/app/src/components/session/session-header.tsx:348`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1bc7d7f4663ff312d02ec86283ce6a857ddc16c4b69c01aec241f3aa7cfeb306`
   Evidence: packages/app/src/components/session/session-header.tsx:348, future-hostile/dead-language term `fallback` appears
84. `high` `vibe` `packages/app/src/components/session/session-sortable-tab.tsx:18`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a964c24d1a62b572ca66d1e0e9716acc2a565f9cd337d5af018399191b20a25f`
   Evidence: packages/app/src/components/session/session-sortable-tab.tsx:18, future-hostile/dead-language term `fallback` appears
85. `high` `vibe` `packages/app/src/components/settings-keybinds.tsx:428`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:244ee11d1ab15750d37b76294d5b21ee8fd1cf7bbd079f5de7b39caf0ccc75cb`
   Evidence: packages/app/src/components/settings-keybinds.tsx:428, future-hostile/dead-language term `fallback` appears
86. `high` `vibe` `packages/app/src/components/settings-models.tsx:89`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2635da50e13bfd5ef6dc6e3441456720824940f168dc9c7931156a3a2380fa72`
   Evidence: packages/app/src/components/settings-models.tsx:89, future-hostile/dead-language term `fallback` appears
87. `high` `vibe` `packages/app/src/components/settings-models.tsx:95`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:227200d980c5ae6dd725c0b5ac8fce9041135f57966aa26c4689545942b12650`
   Evidence: packages/app/src/components/settings-models.tsx:95, future-hostile/dead-language term `fallback` appears
88. `high` `vibe` `packages/app/src/components/settings-providers.tsx:143`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ae64475a11e7a3a02921ef6cb4380c1338d1084a4ba1f749657ca9bd0de8164f`
   Evidence: packages/app/src/components/settings-providers.tsx:143, future-hostile/dead-language term `fallback` appears
89. `high` `vibe` `packages/app/src/components/settings-providers.tsx:159`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f0dfe5fec183ff542bd03404a64223869cfac8d12a3308bbdaec4713539da3e8`
   Evidence: packages/app/src/components/settings-providers.tsx:159, future-hostile/dead-language term `fallback` appears
90. `high` `vibe` `packages/app/src/components/status-popover-body.tsx:306`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:20fbacc46d3813e7a88664ae0f1cb97dbfedb9d98fd2abe5be97f16cfb866882`
   Evidence: packages/app/src/components/status-popover-body.tsx:306, future-hostile/dead-language term `fallback` appears
91. `high` `vibe` `packages/app/src/components/status-popover-body.tsx:359`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5309543a7bcbbbc6f8bd748094e2abc06af21339f83fb2d8127257cad65f648a`
   Evidence: packages/app/src/components/status-popover-body.tsx:359, future-hostile/dead-language term `fallback` appears
92. `high` `vibe` `packages/app/src/components/status-popover-body.tsx:387`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6839b1649a320c5a6308f63fb600711ae21709fc5f3da16c69ac1dcdea6aba8d`
   Evidence: packages/app/src/components/status-popover-body.tsx:387, future-hostile/dead-language term `fallback` appears
93. `high` `boundary` `packages/app/src/components/terminal.tsx:563`
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
94. `high` `boundary` `packages/app/src/context/global-sync.tsx:57`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:75ff82a9049de4eaf9bdb98953f311c8f3eb9feb977a4293da3221859c88a006`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=57, snippet=export const loadSessionsQueryKey = (directory: string) => [directory, "loadSessions"] as const
95. `high` `boundary` `packages/app/src/context/global-sync.tsx:59`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9ba321289f90486adc0438ae0dc0ccb9a84fb85f3698b7d16c97c3add8d25b5f`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=59, snippet=export const mcpQueryKey = (directory: string) => [directory, "mcp"] as const
96. `high` `boundary` `packages/app/src/context/global-sync.tsx:67`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:a8a1ecd579c280d173ac5aeb4c6f1d7f3a75d37dd7ed19276d55ed2b2b9a0d69`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=67, snippet=export const lspQueryKey = (directory: string) => [directory, "lsp"] as const
97. `high` `boundary` `packages/app/src/context/global-sync/event-reducer.ts:60`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:c63273947a357bb9541d38819286951fd8bb97d95d3822515a651dd8f3d28d6e`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync/event-reducer.ts, line=60, snippet=const properties = input.event.properties as Project
98. `high` `vibe` `packages/app/src/pages/error.tsx:298`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:35efaf8a5891b332dec407e75781646e260561310111a8b00aa22f40b0d917fb`
   Evidence: packages/app/src/pages/error.tsx:298, future-hostile/dead-language term `fallback` appears
99. `high` `boundary` `packages/app/src/pages/layout.tsx:1771`
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
100. `high` `vibe` `packages/app/src/pages/layout.tsx:2091`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cb2be38762c485c7dafecdaaeae169d23329c6464325cecc1dd27f8c86f3a8c0`
   Evidence: packages/app/src/pages/layout.tsx:2091, future-hostile/dead-language term `fallback` appears
101. `high` `vibe` `packages/app/src/pages/layout.tsx:2216`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ec254120c4758014219ccaf50cf5af7e2f74f8bac94a41dc7fcad34682409b0d`
   Evidence: packages/app/src/pages/layout.tsx:2216, future-hostile/dead-language term `fallback` appears
102. `high` `vibe` `packages/app/src/pages/layout.tsx:2464`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8f1bf0133840d9d0457dff66bb1c9ac6142a78ed0234e3369c591cb2b67bb568`
   Evidence: packages/app/src/pages/layout.tsx:2464, future-hostile/dead-language term `fallback` appears
103. `high` `vibe` `packages/app/src/pages/layout/inline-editor.tsx:74`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0f80f0682f354b35b3fe46d79411fbe0a2dad22a8d52259ef41dad001f24edaa`
   Evidence: packages/app/src/pages/layout/inline-editor.tsx:74, future-hostile/dead-language term `fallback` appears
104. `high` `vibe` `packages/app/src/pages/layout/sidebar-items.tsx:229`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:876bc77ccda02b801c13d07867e706284f2a1dbc3e8633361669869f45da4512`
   Evidence: packages/app/src/pages/layout/sidebar-items.tsx:229, future-hostile/dead-language term `fallback` appears
105. `high` `vibe` `packages/app/src/pages/layout/sidebar-items.tsx:314`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ee4cb9102be8920748fb161ffda6edc3b4317024f272b2352d21b95a324b6378`
   Evidence: packages/app/src/pages/layout/sidebar-items.tsx:314, future-hostile/dead-language term `fallback` appears
106. `high` `vibe` `packages/app/src/pages/layout/sidebar-project.tsx:207`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:34f56faf1507ff8fc88a9cd7895b6089df31130cb8251a8972258d210210d623`
   Evidence: packages/app/src/pages/layout/sidebar-project.tsx:207, future-hostile/dead-language term `fallback` appears
107. `high` `vibe` `packages/app/src/pages/layout/sidebar-project.tsx:336`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dc3c2015e08e923f38efc14640a8bec2eab2a5d163ae4406dae2b3578a3794a2`
   Evidence: packages/app/src/pages/layout/sidebar-project.tsx:336, future-hostile/dead-language term `fallback` appears
108. `high` `vibe` `packages/app/src/pages/layout/sidebar-workspace.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:deca055981562b75cb0dd13d54cc64ad37dcad7b76d7db351802f7fd69bf27ce`
   Evidence: packages/app/src/pages/layout/sidebar-workspace.tsx:101, future-hostile/dead-language term `fallback` appears
109. `high` `vibe` `packages/app/src/pages/layout/sidebar-workspace.tsx:110`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9dd1620054503c108bf8f8a98827231d384dd289d4ed2657f9e1c61c82b495d7`
   Evidence: packages/app/src/pages/layout/sidebar-workspace.tsx:110, future-hostile/dead-language term `fallback` appears
110. `high` `vibe` `packages/app/src/pages/layout/sidebar-workspace.tsx:380`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0e6b6700281d45b6c484766b516dfc3895b905f4594c51f4678841d6ed5b22d2`
   Evidence: packages/app/src/pages/layout/sidebar-workspace.tsx:380, future-hostile/dead-language term `fallback` appears
111. `high` `boundary` `packages/app/src/pages/session.tsx:303`
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
112. `high` `boundary` `packages/app/src/pages/session.tsx:608`
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
113. `high` `boundary` `packages/app/src/pages/session.tsx:765`
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
114. `high` `vibe` `packages/app/src/pages/session/composer/session-composer-region.tsx:176`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:02bbfe431d83c8509c22805561be0fb9094b3d9e1c9b11ed1b1caca377079ae7`
   Evidence: packages/app/src/pages/session/composer/session-composer-region.tsx:176, future-hostile/dead-language term `fallback` appears
115. `high` `vibe` `packages/app/src/pages/session/composer/session-composer-region.tsx:251`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:12a92d88ca968d06a21900a12288aef4dd7cda071457d1cab75fba29bda0c9a1`
   Evidence: packages/app/src/pages/session/composer/session-composer-region.tsx:251, future-hostile/dead-language term `fallback` appears
116. `high` `vibe` `packages/app/src/pages/session/composer/session-question-dock.tsx:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3173179f796568f5a3eab8bb222ae6c65fc5ee5b2abd274736e6414b333454bc`
   Evidence: packages/app/src/pages/session/composer/session-question-dock.tsx:20, future-hostile/dead-language term `fallback` appears
117. `high` `vibe` `packages/app/src/pages/session/composer/session-question-dock.tsx:473`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:42f39a1fcb72273efdefe86cc5d741426f409f78343c5bb2e3a1168bae537b08`
   Evidence: packages/app/src/pages/session/composer/session-question-dock.tsx:473, future-hostile/dead-language term `fallback` appears
118. `high` `vibe` `packages/app/src/pages/session/composer/session-question-dock.tsx:494`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:df0e9ed1cd9ede99eeb02399b8983b9c1438365caabcbeed7c5385c3436b2502`
   Evidence: packages/app/src/pages/session/composer/session-question-dock.tsx:494, future-hostile/dead-language term `fallback` appears
119. `high` `vibe` `packages/app/src/pages/session/message-timeline.tsx:633`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:32765bf7eddd3f2e5da6e94a96d83cde1838ff59ac26b3ce78d058b67517a238`
   Evidence: packages/app/src/pages/session/message-timeline.tsx:633, future-hostile/dead-language term `fallback` appears
120. `high` `vibe` `packages/app/src/pages/session/message-timeline.tsx:781`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8898881be341a979dd3babaa85ec2cabf5b276a689c31da5824e827fa7a8f0d9`
   Evidence: packages/app/src/pages/session/message-timeline.tsx:781, future-hostile/dead-language term `fallback` appears
121. `high` `vibe` `packages/app/src/pages/session/message-timeline.tsx:943`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:903fee43da1c1e79b01b423edc3e04bfaa9944323e235aca1362af5263b5e09c`
   Evidence: packages/app/src/pages/session/message-timeline.tsx:943, future-hostile/dead-language term `fallback` appears
122. `high` `vibe` `packages/app/src/pages/session/session-side-panel.tsx:396`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6380518535b6d390ac318689552ffe5c0e6b6097d02c7064595cf1df10842a17`
   Evidence: packages/app/src/pages/session/session-side-panel.tsx:396, future-hostile/dead-language term `fallback` appears
123. `high` `vibe` `packages/app/src/pages/session/terminal-panel.tsx:232`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9cc19bd42a214d5280c9c73512e45733d6819438b70530ae774b26437cac7f02`
   Evidence: packages/app/src/pages/session/terminal-panel.tsx:232, future-hostile/dead-language term `fallback` appears
124. `high` `boundary` `packages/app/src/sst-env.d.ts:3`
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
125. `high` `boundary` `packages/app/sst-env.d.ts:3`
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
126. `high` `security` `packages/app/vite.config.ts:25`
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
127. `high` `security` `packages/app/vite.config.ts:26`
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
128. `high` `boundary` `packages/console/app/src/component/header.tsx:90`
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
129. `high` `boundary` `packages/console/app/src/i18n/de.ts:529`
   Rule: `HLT-019-STREAMING-RUNTIME-DRIFT`
   Check: `HLT-019-STREAMING-RUNTIME-DRIFT:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/streaming.md`
   Reason: queue or streaming runtime client appears outside the declared adapter boundary
   Fix: move Kafka/Tansu/Iggy/Fluvio/NATS/Redis-stream clients behind `crates/adapters/queues` or document a brownfield exception with owner, expiry, and migration path
   Rerun: `just fast`
   Fingerprint: `sha256:c91eecbc733dc2980323454247dd9e06e39e8e37813d9ec96962fb8499f8d2a8`
   Evidence: streaming client marker `nats` appears outside `crates/adapters/queues`
130. `high` `boundary` `packages/console/app/src/routes/bench/[id].tsx:85`
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
131. `high` `vibe` `packages/console/app/src/routes/bench/[id].tsx:112`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4af6994e3f861a8cde695729cd971a2a044d8cf8064b5174ef42de13db651fb8`
   Evidence: packages/console/app/src/routes/bench/[id].tsx:112, future-hostile/dead-language term `fallback` appears
132. `high` `boundary` `packages/console/app/src/routes/bench/index.tsx:19`
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
133. `high` `vibe` `packages/console/app/src/routes/bench/index.tsx:73`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:91ab132cf6adbd52f65a3ffbcce84fa890248b5ca0e2211ac8b403d8efcb687c`
   Evidence: packages/console/app/src/routes/bench/index.tsx:73, future-hostile/dead-language term `fallback` appears
134. `high` `boundary` `packages/console/app/src/routes/black/index.tsx:19`
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
135. `high` `vibe` `packages/console/app/src/routes/black/index.tsx:52`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9769d8f11ef60cea0db4b7c0327bc00cd1e648da72cd99b379995542f6b72ff8`
   Evidence: packages/console/app/src/routes/black/index.tsx:52, future-hostile/dead-language term `fallback` appears
136. `high` `vibe` `packages/console/app/src/routes/black/subscribe/[plan].tsx:183`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:022b17f890ac770c69b805f74062ddb44fed63803e2971a10bdfb2290fe3a28c`
   Evidence: packages/console/app/src/routes/black/subscribe/[plan].tsx:183, future-hostile/dead-language term `fallback` appears
137. `high` `boundary` `packages/console/app/src/routes/black/subscribe/[plan].tsx:279`
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
138. `high` `vibe` `packages/console/app/src/routes/black/subscribe/[plan].tsx:393`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6def4718763a28a3239afad0901b54d23950171f74885b76ee21bec2ade1ab21`
   Evidence: packages/console/app/src/routes/black/subscribe/[plan].tsx:393, future-hostile/dead-language term `fallback` appears
139. `high` `boundary` `packages/console/app/src/routes/enterprise/index.tsx:27`
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
140. `high` `boundary` `packages/console/app/src/routes/enterprise/index.tsx:61`
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
141. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:160`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:62a79c0674e9510715ea8b6f960c63cef473b994134e323f326e44dab7b0abd4`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:160, future-hostile/dead-language term `fallback` appears
142. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:204`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:86ba7c9944e74379f89baf582246d8fe351f410d692ae96f262f1994a5e40bde`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:204, future-hostile/dead-language term `fallback` appears
143. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:222`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d25e7013c293853e3fc7b9b8bfc9ab3a4ec7895275d012032b28460d87ca751c`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:222, future-hostile/dead-language term `fallback` appears
144. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:78`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:85e6be49cac20ec6b95f8ac2c75f357a4813a6e0731cfa51017507126aeef490`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:78, future-hostile/dead-language term `fallback` appears
145. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:116`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:04de128f11f672922cc596b923572536512b3bc31d8816533f3a0f5c933c5f3f`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx:116, future-hostile/dead-language term `fallback` appears
146. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/reload-section.tsx:109`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:406c15a7ba56536347f3fbac8f1477f863d18d3868cc50d70794af218013a657`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/reload-section.tsx:109, future-hostile/dead-language term `fallback` appears
147. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/index.tsx:50`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cbcd6a8e20cfd6a6605c8383311cde36e941652a002eaae86a10ee4934eeba99`
   Evidence: packages/console/app/src/routes/workspace/[id]/index.tsx:50, future-hostile/dead-language term `fallback` appears
148. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:115`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1af77b52b47bb01339606d93f495a6f359e8032dee6a4b5d669b925ce93cc2ce`
   Evidence: packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:115, future-hostile/dead-language term `fallback` appears
149. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:140`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:94e18cf5b0311bc32f92ee4c05036d8d64d099469a12ccd60b9e8fc817a40c61`
   Evidence: packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:140, future-hostile/dead-language term `fallback` appears
150. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:152`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1cb654cca9716a17b44f9eb4c03f22b5a651317502915ead5560ab8d261ad9fd`
   Evidence: packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx:152, future-hostile/dead-language term `fallback` appears
151. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:158`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:47a7d964703d222dd8e458d2b09175c0bb82c0dce3d782ac48b7e46665f6f92d`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:158, future-hostile/dead-language term `fallback` appears
152. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:167`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ee5a710e4917d78d9d8596aa13c20b710c217d6b46cc476ebc1822941f07531f`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:167, future-hostile/dead-language term `fallback` appears
153. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:183`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:572d79d8854250daa2421cf1deed94b5d8d0db09f5f10f89c17e18b281a2ed5c`
   Evidence: packages/console/app/src/routes/workspace/[id]/members/member-section.tsx:183, future-hostile/dead-language term `fallback` appears
154. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/new-user-section.tsx:77`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d0770c0b2563f8c35cb4fb83c0e60ca994ad3b800b65f00e40c8c0baaa4c17b3`
   Evidence: packages/console/app/src/routes/workspace/[id]/new-user-section.tsx:77, future-hostile/dead-language term `fallback` appears
155. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx:101`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:86b4e5da23c717722639788c4eb13da47582a69581a44fdec39bfdc94876db27`
   Evidence: packages/console/app/src/routes/workspace/[id]/provider-section.tsx:101, future-hostile/dead-language term `fallback` appears
156. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx:129`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:45d61d54102c27f2188288bd89eb51016d086936310797807786bc69cbc2fb73`
   Evidence: packages/console/app/src/routes/workspace/[id]/provider-section.tsx:129, future-hostile/dead-language term `fallback` appears
157. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx:132`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0b49f989fa1dfd6e8cf8a1ab5b22edaae4132cfd05d43fd44694dce4cbf9f728`
   Evidence: packages/console/app/src/routes/workspace/[id]/provider-section.tsx:132, future-hostile/dead-language term `fallback` appears
158. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/settings/settings-section.tsx:88`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:adc696a80c995db96f8e288be741986e966dace02eb19401660f2ea88720f2f7`
   Evidence: packages/console/app/src/routes/workspace/[id]/settings/settings-section.tsx:88, future-hostile/dead-language term `fallback` appears
159. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/usage/graph-section.tsx:544`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6176a3c48ee2b2572f1a2009f59d511a638b04ba566e34c4a265bcdd618f0af7`
   Evidence: packages/console/app/src/routes/workspace/[id]/usage/graph-section.tsx:544, future-hostile/dead-language term `fallback` appears
160. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:83`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ac2eedc627d3d0559eb7530359df879c31b1538323a12122788269b6033a5547`
   Evidence: packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:83, future-hostile/dead-language term `fallback` appears
161. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:178`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0dacdaadaa32e709567e91835dce9c18079dc8b382c4027e45e7116d0cceb441`
   Evidence: packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx:178, future-hostile/dead-language term `fallback` appears
162. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:301`
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
163. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:328`
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
164. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:469`
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
165. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:528`
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
166. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:554`
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
167. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:558`
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
168. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:609`
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
169. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/google.ts:50`
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
170. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts:50`
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
171. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts:344`
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
172. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:35`
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
173. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:69`
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
174. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:132`
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
175. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:208`
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
176. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:210`
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
177. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:214`
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
178. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:262`
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
179. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:271`
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
180. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:373`
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
181. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:376`
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
182. `high` `boundary` `packages/console/app/sst-env.d.ts:3`
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
183. `high` `security` `packages/console/app/vite.config.ts:19`
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
184. `high` `data` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql:10`
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
185. `high` `data` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql:11`
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
186. `high` `boundary` `packages/console/core/script/lookup-user.ts:260`
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
187. `high` `boundary` `packages/console/core/src/user.ts:146`
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
188. `high` `boundary` `packages/console/core/sst-env.d.ts:3`
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
189. `high` `boundary` `packages/console/function/src/auth.ts:100`
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
190. `high` `boundary` `packages/console/function/sst-env.d.ts:3`
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
191. `high` `boundary` `packages/console/mail/emails/components.tsx:1`
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
192. `high` `boundary` `packages/console/mail/emails/styles.ts:1`
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
193. `high` `boundary` `packages/console/mail/emails/templates/InviteEmail.tsx:1`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.suppress.ts-nocheck`
   Reason: broad suppression is hard to audit
   Fix: remove the broad suppression or scope it to a single justified line
   Rerun: `just fast`
   Fingerprint: `sha256:acd0990c1256d7bd25e2745bb3e23ebc8a67f5fdfcf2932f9345c0f87e715c35`
   Evidence: detector=typescript.suppress.ts-nocheck, path=packages/console/mail/emails/templates/InviteEmail.tsx, line=1, snippet=// @ts-nocheck
194. `high` `test` `packages/core/test/effect/cross-spawn-spawner.test.ts:96`
   Rule: `HLT-008-FALSE-GREEN-RISK`
   Check: `HLT-008-FALSE-GREEN-RISK:test` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Reason: test code contains disabled, focused, tautological, or snapshot-only proof
   Fix: replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Rerun: `just fast`
   Fingerprint: `sha256:b758fa39412b7b6e5b14d5e0148f1890b75c47f31314ff091274537564f595e4`
   Evidence: const handle = yield* js("process.exit(42)")
195. `medium` `context` `packages/desktop/scripts/copy-bundles.ts:1`
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
196. `medium` `context` `packages/desktop/scripts/copy-icons.ts:1`
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
197. `medium` `context` `packages/docs/favicon-v3.svg:1`
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
198. `high` `vibe` `packages/enterprise/src/routes/share/[shareID].tsx:124`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c24dcd9adf353a8a73cf0ea4c180b37987d609bc77c5b6d5b104d5645580d0d6`
   Evidence: packages/enterprise/src/routes/share/[shareID].tsx:124, future-hostile/dead-language term `fallback` appears
199. `high` `security` `packages/enterprise/vite.config.ts:30`
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
200. `high` `security` `packages/enterprise/vite.config.ts:31`
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
201. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:30`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:50c96cd9b46a77d66e87e1b8aea1dfbed789a089168eea256e0fffb46d5025aa`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_message_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
202. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:40`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:1e79451626eba6b0ba3700f5410e6e85591f75d42b3055d1311cd666335331f3`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_part_message_id_message_id_fk` FOREIGN KEY (`message_id`) REFERENCES `message`(`id`) ON DELETE CASCADE
203. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:48`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:028d147e225e5ab9fe890280fc78f6ce77bec1955298e6ca4948b9267d226009`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_permission_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE
204. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:70`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:cd34308dff1a0a6656779b41968993c47d54b47888a76756c425f9aad17acdfd`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE
205. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:82`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:112283fd2b0e3dfdc3fd4d475d1e27661a7d8b698d26095cc67c11b10e5b1c76`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_todo_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
206. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:92`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:6684b442d273a0ab674bdcc821e68f977d70aa22407dff94c72b4f37d4069c1a`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_share_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
207. `high` `data` `packages/opencode/migration/20260228203230_blue_harpoon/migration.sql:21`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `update/delete`
   Reason: the statement reaches a whole-table write path without a row filter
   Fix: add a WHERE clause or prove the full-table rewrite with a local migration receipt
   Rerun: `just fast`
   Fingerprint: `sha256:24a20a13eed31776d0966a1c95f79474b66281867ed328c6b97963959d5e98aa`
   Evidence: detector=sql.query.full-table-write, proof-window=where-clause, snippet=FOREIGN KEY (`active_account_id`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE set null
208. `high` `data` `packages/opencode/migration/20260323234822_events/migration.sql:17`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:930020673218eaa5a31718bcc9133da43fea2dcc4e5c4a34a081e6dbcd87316c`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_event_aggregate_id_event_sequence_aggregate_id_fk` FOREIGN KEY (`aggregate_id`) REFERENCES `event_sequence`(`aggregate_id`) ON DELETE CASCADE
209. `high` `data` `packages/opencode/migration/20260410174513_workspace-name/migration.sql:15`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:85f7a6e4d72b91ec050d43f3d80119cdd33387fc12867d95f0bb196788a24b27`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_workspace_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE CASCADE
210. `high` `data` `packages/opencode/migration/20260410174513_workspace-name/migration.sql:19`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:d430f69eefd1e6fbab0b344ebe7810c702afeb12c83b849de10e78e434437992`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP TABLE `workspace`
211. `high` `data` `packages/opencode/migration/20260413175956_chief_energizer/migration.sql:11`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:87760ec65336c80d325f3f3abe2362bc839514ef2af3307463316bc21eea42d8`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_entry_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
212. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:13`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:681c48cd39eafd9dc5985b8c3862a384ce4cfed48ee94f39d674d22080453e3a`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=CONSTRAINT `fk_session_message_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
213. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:16`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:76435eae02994dfb78f3b28a6f861cc8f1dad0cc7b0eb45adcbd64712ffa3ba0`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP INDEX IF EXISTS `session_entry_session_idx`
214. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:17`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:0bc40c323bc7ce00ea05382dc57c6f77bcc45d34aab5a136d68c7fc79892373a`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP INDEX IF EXISTS `session_entry_session_type_idx`
215. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:18`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:731c098c1168fbab99e37f45d8988040cf348e8acf832c51caf908905e1b7d4d`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=DROP INDEX IF EXISTS `session_entry_time_created_idx`
216. `high` `data` `packages/opencode/migration/20260507054800_memory_os/migration.sql:21`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:a4230e5db5b65c97e7ea5ea630169223539395d56a632599335d087804bfff8f`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
217. `high` `data` `packages/opencode/migration/20260507054800_memory_os/migration.sql:42`
   Rule: `HLT-030-SQL-BAD-BEHAVIOR`
   Check: `HLT-030-SQL-BAD-BEHAVIOR:data` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `drop table`
   Reason: the migration can remove or rewrite data without local evidence of recovery
   Fix: split the change into a reviewed migration with rollback, backup, and row-count evidence
   Rerun: `just fast`
   Fingerprint: `sha256:a4230e5db5b65c97e7ea5ea630169223539395d56a632599335d087804bfff8f`
   Evidence: detector=sql.migration.destructive-no-proof, proof-window=nearby-proof, snippet=FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
218. `high` `vibe` `packages/opencode/script/httpapi-exercise.ts:1402`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:08501c897cbe81926ba6cfbe2d2d85ed3ea2969585ea59038ee5beaec8cdfd28`
   Evidence: packages/opencode/script/httpapi-exercise.ts:1402, future-hostile/dead-language term `deprecated` appears
219. `high` `vibe` `packages/opencode/script/httpapi-exercise.ts:1759`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d34da740b37ce677c25f2fb5e3f7cc6a6cd0aa197d9d8b8f2a7a4270f48ae633`
   Evidence: packages/opencode/script/httpapi-exercise.ts:1759, future-hostile/dead-language term `legacy` appears
220. `high` `vibe` `packages/opencode/src/acp/agent.ts:48`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b606ba87ced8633257bac458dea72a9c58a3176a010531c564a1ca3ac80c74fe`
   Evidence: packages/opencode/src/acp/agent.ts:48, future-hostile/dead-language term `todo` appears
221. `high` `vibe` `packages/opencode/src/acp/agent.ts:58`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1c11ccf6ebc39a4d70a57471fbe741f0a536814d97f3afb0f33bf6bc967696ae`
   Evidence: packages/opencode/src/acp/agent.ts:58, future-hostile/dead-language term `todo` appears
222. `high` `vibe` `packages/opencode/src/cli/cmd/github.ts:885`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:219f8eab3f0c7528f23a930a1398974bbe5c43d46608bd80466736268133ff36`
   Evidence: packages/opencode/src/cli/cmd/github.ts:885, future-hostile/dead-language term `todo` appears
223. `high` `vibe` `packages/opencode/src/cli/cmd/run.ts:28`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b2df407dafb43344c90f691e3821b797cbdb0a1fe56ce15ec4b731ad34186c8f`
   Evidence: packages/opencode/src/cli/cmd/run.ts:28, future-hostile/dead-language term `todo` appears
224. `high` `vibe` `packages/opencode/src/cli/cmd/tui/context/theme.tsx:299`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:32762b8076ecbf4b5be69728a8524a2349f1e1e85841108c4a0bce62e257b8ea`
   Evidence: packages/opencode/src/cli/cmd/tui/context/theme.tsx:299, future-hostile/dead-language term `fallback` appears
225. `high` `vibe` `packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:3`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5c5fd1d727fcf860fd66a059855bf3ee97dc5bce42d887fa5c762bbfc33908b5`
   Evidence: packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:3, future-hostile/dead-language term `todo` appears
226. `high` `vibe` `packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:21`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:08a618a40665cd6e3993ddca407c3bf93a70bb730e65601130288cdfdcc9c7b4`
   Evidence: packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:21, future-hostile/dead-language term `todo` appears
227. `high` `vibe` `packages/opencode/src/cli/cmd/tui/plugin/internal.ts:6`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c16d750821ce785c6072f6c8cf2c70f501713efd6e77aaf531c8e1ee7cfa2592`
   Evidence: packages/opencode/src/cli/cmd/tui/plugin/internal.ts:6, future-hostile/dead-language term `todo` appears
228. `high` `vibe` `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:43`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:125dff6b3b427b08340d4860ab81dc3e3a04ed480772398f2a2b45d21985117e`
   Evidence: packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:43, future-hostile/dead-language term `todo` appears
229. `high` `vibe` `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:59`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9f557041588dbec7cb51ccaad1753143bbeef54600ee642e508032ae8529f3b3`
   Evidence: packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:59, future-hostile/dead-language term `todo` appears
230. `high` `vibe` `packages/opencode/src/effect/app-runtime.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8ad7328702276b57ba9dbffaed0f0290cc4d0829b1f39bd7886934f975fb7f3a`
   Evidence: packages/opencode/src/effect/app-runtime.ts:25, future-hostile/dead-language term `todo` appears
231. `high` `vibe` `packages/opencode/src/effect/app-runtime.ts:81`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7ef8ead3e35c5cd31771b143ae751419238a57d667611e369853737c121df8d5`
   Evidence: packages/opencode/src/effect/app-runtime.ts:81, future-hostile/dead-language term `todo` appears
232. `high` `vibe` `packages/opencode/src/plugin/loader.ts:142`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:212b4501042c94e2e2d138b8fefdef36058e22bf1235e0ac4cd50a514ae72e9f`
   Evidence: packages/opencode/src/plugin/loader.ts:142, future-hostile/dead-language term `deprecated` appears
233. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:10`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:86b739ed907f4353789049df85b8e1ed0fde21940e4886cac14c55977d71631b`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:10, future-hostile/dead-language term `todo` appears
234. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:151`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d6b3a939caaed418b20cb2f48433cce9435136180e35be619b74510762e327df`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:151, future-hostile/dead-language term `todo` appears
235. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:162`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:91ac2643c428099711b6d9e112fc0cfe73db8aaf354955cda18cf279cda1c718`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:162, future-hostile/dead-language term `todo` appears
236. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:17`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:41327d824d8d5c0e812f05953e7dc33775fe0986fae088bab10a39621b9f95f1`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:17, future-hostile/dead-language term `todo` appears
237. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:53`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f458364227e0b7ece16e79767e73e3c7cb0b8d41edae253e647c3758cb05762e`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:53, future-hostile/dead-language term `todo` appears
238. `medium` `context` `packages/opencode/src/server/routes/instance/httpapi/handlers/v2.ts:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:2d4bc3e1a65c095ad6607a3de201f2b5743a40ccfdccf3411ee46886ab968608`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/opencode/src/server/routes/instance/httpapi/handlers/v2.ts, line=1, proof_window=None, snippet=import { SessionV2 } from "@/v2/session"
239. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/server.ts:37`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fa41d8f91b70ff6dfab5d84806c3c56f2aede95c96a48751e98c2f0e7b2d6037`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/server.ts:37, future-hostile/dead-language term `todo` appears
240. `high` `vibe` `packages/opencode/src/server/routes/instance/index.ts:118`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:aa39dfc86a8c712fd85d37fdf8c5aa12cded151d6a2fedda90a5bc360b496a76`
   Evidence: packages/opencode/src/server/routes/instance/index.ts:118, future-hostile/dead-language term `todo` appears
241. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:15`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f84ba0e4dbb060f9bc461b94e0b7bdd5a19b2116890b4f52c6cef1381d89705d`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:15, future-hostile/dead-language term `todo` appears
242. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:195`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c45b495f6225efc5f038258d8246bcd72646c4ed4d264f7ebdbee6d4f715f7cc`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:195, future-hostile/dead-language term `todo` appears
243. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:198`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0d53a754243cc3791879a9af6b07d8ac48343a7a59bee2a588558b96679e7a83`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:198, future-hostile/dead-language term `todo` appears
244. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:214`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:75f4b8e4d9181478ef36af7cb3a3b572c160f92b727725650cbcb6514b858719`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:214, future-hostile/dead-language term `todo` appears
245. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:220`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:011d33b08bada02a11681e3afcef881e58af55b372657ca15d27584db3e6b252`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:220, future-hostile/dead-language term `todo` appears
246. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:223`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0bc1265bdbc0a0a1bf4f4783d69f6afbf659e55d2c5f1a48ac4afddde441d59c`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:223, future-hostile/dead-language term `todo` appears
247. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:224`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ce0bec1b7eb2a31f6b126c8f6f704f02acc52940595ef593c129b6cea3fa364a`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:224, future-hostile/dead-language term `todo` appears
248. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:227`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7a853195dfd5118fdcca9628acd8c9cc8d74c3ad78fef3fe69c87e3f1f5d8aaf`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:227, future-hostile/dead-language term `todo` appears
249. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:230`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8c7e456c3809b799e63611e8cc5784c551b1ce2e3879be801f4e8a2169054f73`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:230, future-hostile/dead-language term `todo` appears
250. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:245`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b7bf2dd590424dd699adadd6afa3dcee5671b78dde7c28860c948e2c8310f317`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:245, future-hostile/dead-language term `todo` appears
251. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:246`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:84dc90e332287f04119b7de75e4930a5f2fcb417d430791fa94ad44770e8de7e`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:246, future-hostile/dead-language term `todo` appears
252. `high` `vibe` `packages/opencode/src/session/llm.ts:243`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `unused` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:91b4f942626f0adee1b2c60f038db1d0db713eadd08ebc752e2ed4c359fdcc2f`
   Evidence: packages/opencode/src/session/llm.ts:243, future-hostile/dead-language term `unused` appears
253. `medium` `context` `packages/opencode/src/session/message-v2.ts:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.path.fake-versioned-source`
   Reason: ambiguous old-looking active source makes agents and reviewers guess whether code is live
   Fix: delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Rerun: `just score`
   Fingerprint: `sha256:2e48109564bc9d0b495401c1fc4c2092b9ca10b52102f964f493d80818c61d0d`
   Evidence: detector=repo-rot.path.fake-versioned-source, path=packages/opencode/src/session/message-v2.ts, line=1, proof_window=None, snippet=export * from "./message"
254. `high` `vibe` `packages/opencode/src/session/pending.ts:1`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:52e987c551e11a3e23687c4cddbfad97f9b6b4f1d7e277df3e571c7785331be7`
   Evidence: packages/opencode/src/session/pending.ts:1, future-hostile/dead-language term `todo` appears
255. `high` `vibe` `packages/opencode/src/session/pending.ts:2`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e11e5752fa1b7cb593b55666f92885ee9a53c93101b923a4efec41ece522b915`
   Evidence: packages/opencode/src/session/pending.ts:2, future-hostile/dead-language term `todo` appears
256. `high` `vibe` `packages/opencode/src/session/processor.ts:232`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:17e65972ab67df371c552b671fd151f7993ba0c33dd493bc93661f71514d3b6e`
   Evidence: packages/opencode/src/session/processor.ts:232, future-hostile/dead-language term `compat` appears
257. `high` `vibe` `packages/opencode/src/session/processor.ts:265`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0b763c721d01447105a3d4748ca7a94057476be1ea88ccc9c8925629d9a3321c`
   Evidence: packages/opencode/src/session/processor.ts:265, future-hostile/dead-language term `compat` appears
258. `high` `vibe` `packages/opencode/src/session/processor.ts:284`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c71ef3f72eea69bf6472709a47860978088dadbbe947275eed78a870bc30a5cb`
   Evidence: packages/opencode/src/session/processor.ts:284, future-hostile/dead-language term `compat` appears
259. `high` `vibe` `packages/opencode/src/session/processor.ts:313`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:93cf433d800efbb4d2ca9189b73da7033e486df40200c206568387316badc3a9`
   Evidence: packages/opencode/src/session/processor.ts:313, future-hostile/dead-language term `compat` appears
260. `high` `vibe` `packages/opencode/src/session/processor.ts:328`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:831964c11726d8a65cfb40104b77e9d559c277e8c857227309d88a121ad325b3`
   Evidence: packages/opencode/src/session/processor.ts:328, future-hostile/dead-language term `compat` appears
261. `high` `vibe` `packages/opencode/src/session/processor.ts:396`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ea188444f340a267a5a2cfad8da48e24db8dba80084ab8ac84d9f31f3ec73bd6`
   Evidence: packages/opencode/src/session/processor.ts:396, future-hostile/dead-language term `compat` appears
262. `high` `vibe` `packages/opencode/src/session/processor.ts:427`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:60884dc7dcea1e36df0ee56655d2969a45ba1db3a2e0f9e7113dae0623f11f9a`
   Evidence: packages/opencode/src/session/processor.ts:427, future-hostile/dead-language term `compat` appears
263. `high` `vibe` `packages/opencode/src/session/processor.ts:473`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4a4ca183be850ef07f6eee5d3057d343a7359b6dc3a4cb269054a3d49018df40`
   Evidence: packages/opencode/src/session/processor.ts:473, future-hostile/dead-language term `compat` appears
264. `high` `vibe` `packages/opencode/src/session/processor.ts:496`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4ebfe31f0f80b690e03a7662479d84ba110e600917161d2d8fc0f0b492fb1f1e`
   Evidence: packages/opencode/src/session/processor.ts:496, future-hostile/dead-language term `compat` appears
265. `high` `vibe` `packages/opencode/src/session/processor.ts:526`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bfb1c3f720d067eee47bd12a1412bfb765b1e97ee7d5d3a88956d36db0241840`
   Evidence: packages/opencode/src/session/processor.ts:526, future-hostile/dead-language term `compat` appears
266. `high` `vibe` `packages/opencode/src/session/processor.ts:581`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ca6085d57bdbb81ef64ddf0df05802539741a197a004ceb71cd079943825f5f7`
   Evidence: packages/opencode/src/session/processor.ts:581, future-hostile/dead-language term `compat` appears
267. `high` `vibe` `packages/opencode/src/session/processor.ts:626`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:09133366567a0cd6d2973efe6fa6cfeae7767219a330850f577c51ff4999e423`
   Evidence: packages/opencode/src/session/processor.ts:626, future-hostile/dead-language term `compat` appears
268. `high` `vibe` `packages/opencode/src/session/processor.ts:720`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:77a82ff3d1bdf8097444b92073a9ef364d6407b8a3aadf23f454b75a8bd55227`
   Evidence: packages/opencode/src/session/processor.ts:720, future-hostile/dead-language term `compat` appears
269. `high` `vibe` `packages/opencode/src/session/processor.ts:771`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b0e3a7fce1a0f481c738704fd05114fefbd6722f61c25bec9acd060f35528134`
   Evidence: packages/opencode/src/session/processor.ts:771, future-hostile/dead-language term `compat` appears
270. `high` `vibe` `packages/opencode/src/session/prompt.ts:1351`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9a4e6131c537cd91c573f785cd585f77297fbb3b1faf21558590650b6cbd7b5d`
   Evidence: packages/opencode/src/session/prompt.ts:1351, future-hostile/dead-language term `temporary` appears
271. `high` `vibe` `packages/opencode/src/session/prompt.ts:1362`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:30a6c306800550ba03900dd86d37e64852945a9b7bdb8ff4d51ba818350237f7`
   Evidence: packages/opencode/src/session/prompt.ts:1362, future-hostile/dead-language term `temporary` appears
272. `high` `vibe` `packages/opencode/src/session/todo.ts:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c5b25b71802aa4cd89f65596b01d4d67b7f5a857e1b8c215867300955e29d235`
   Evidence: packages/opencode/src/session/todo.ts:20, future-hostile/dead-language term `todo` appears
273. `high` `vibe` `packages/opencode/src/session/todo.ts:46`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0ed582ec645ca2a105608a8483231c333da13865162ff7d8a8cf2491f9e59fc3`
   Evidence: packages/opencode/src/session/todo.ts:46, future-hostile/dead-language term `todo` appears
274. `high` `vibe` `packages/opencode/src/session/todo.ts:67`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:06e4bfffa4411bad6a7c5565bac943807e6f1d34abee1e32be411bfbd1e63d18`
   Evidence: packages/opencode/src/session/todo.ts:67, future-hostile/dead-language term `todo` appears
275. `high` `vibe` `packages/opencode/src/session/todo.ts:86`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9da39dbd78f5a649b65a161c8cc39cc87ded481938a41431ebcf7276fbda5991`
   Evidence: packages/opencode/src/session/todo.ts:86, future-hostile/dead-language term `todo` appears
276. `high` `vibe` `packages/opencode/src/tool/pending.ts:2`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:54d477f0bcdfd66d4808926d6a9398873a852727f10ae9ff8125dd3e30256c99`
   Evidence: packages/opencode/src/tool/pending.ts:2, future-hostile/dead-language term `todo` appears
277. `high` `vibe` `packages/opencode/src/tool/registry.ts:10`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3d33e9e259ae525fb4910dacc463d67f2785f3624c798572c1c93a25ad07280c`
   Evidence: packages/opencode/src/tool/registry.ts:10, future-hostile/dead-language term `todo` appears
278. `high` `vibe` `packages/opencode/src/tool/registry.ts:42`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d1042d08f1fb00023f44022d75d4c6e4fceaadd7077d23b31cf62b5c6af34c6e`
   Evidence: packages/opencode/src/tool/registry.ts:42, future-hostile/dead-language term `todo` appears
279. `high` `vibe` `packages/opencode/src/tool/registry.ts:320`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cdb93438e41ae4680d7ceea15ced34933eb39aa87227bb9985385733adebd644`
   Evidence: packages/opencode/src/tool/registry.ts:320, future-hostile/dead-language term `todo` appears
280. `high` `vibe` `packages/opencode/src/tool/todo.ts:4`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:83d0dae4a2c61e026073741d0028d610dbad04df9cc3071caf4554bfc8cffb30`
   Evidence: packages/opencode/src/tool/todo.ts:4, future-hostile/dead-language term `todo` appears
281. `high` `vibe` `packages/opencode/src/tool/todo.ts:6`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f636d593d22d15c9927ae3b0712bb3d243b78f1bb6af762b1db6e7229a158d04`
   Evidence: packages/opencode/src/tool/todo.ts:6, future-hostile/dead-language term `todo` appears
282. `high` `vibe` `packages/opencode/src/tool/todo.ts:22`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:524068d61d7d6c1e627fe290c74c5442d361c5c557902821f2c46a46b1ee8c89`
   Evidence: packages/opencode/src/tool/todo.ts:22, future-hostile/dead-language term `todo` appears
283. `high` `vibe` `packages/opencode/src/tool/todo.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:eedf99f1a8195c15c1d294b222b6bd89cbe4274f1b618d598adcf4c215f6e059`
   Evidence: packages/opencode/src/tool/todo.ts:25, future-hostile/dead-language term `todo` appears
284. `high` `vibe` `packages/opencode/src/tool/todo.ts:28`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:56d8c2f002c6c60cc94f02e14a0364ae258b12361c190165e3bc8e332fd2275d`
   Evidence: packages/opencode/src/tool/todo.ts:28, future-hostile/dead-language term `todo` appears
285. `high` `vibe` `packages/opencode/test/config/config.part-07.test.ts:343`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9083151d923f178e440d6088e9c45beb022b6fdfd22035b4c3775cde98a90dc6`
   Evidence: packages/opencode/test/config/config.part-07.test.ts:343, future-hostile/dead-language term `legacy` appears
286. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c8435c98d7c503ecc065f19fa9c9f48c6a212df522eeabdf41f3bbb704d9c849`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:25, future-hostile/dead-language term `dummy` appears
287. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:26`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:171020305b466bb61e217df21abb12ed65aa213dac6f5cc284e3173e940faa79`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:26, future-hostile/dead-language term `dummy` appears
288. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:30`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3cda88310d9312f10fa14025429b26933699184a9525308efe44bf7f377b5940`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:30, future-hostile/dead-language term `dummy` appears
289. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:32`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1e30c26912c8716c1e25af7960fe18ad1fbffb5bd883f99717922287c49f8c56`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:32, future-hostile/dead-language term `dummy` appears
290. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:38`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:66921e2b5ee7f7ebc4a9c2e119b2b7b5873007338bf5b3cda15fff4ffaa9f598`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:38, future-hostile/dead-language term `dummy` appears
291. `medium` `proof` `packages/opencode/test/provider/copilot/copilot-chat-model.test.ts:55`
   Rule: `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP`
   Check: `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP:proof` `soft` confidence `0.88`
   Route: TLR `Repair`, lane `audit`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `review evidence`
   Reason: proof and review claims need receipts
   Fix: attach raw CI logs, review receipts, and replayable commands instead of accepting claims or summaries
   Rerun: `just score`
   Fingerprint: `sha256:c91c92883818a69b16e72254221fd8fc4ad8134809e57496d11661c8be994ca2`
   Evidence: `data: {"choices":[{"index":0,"delta":{"content":"Okay, I need to check out the project's file structure.","role":"assistant","reasoning_opaque":"WHOd3dYFnxEBOs
292. `high` `vibe` `packages/opencode/test/provider/models.test.ts:224`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:97612d35b560dcb212a9e85229f70102c50ac8d137bd80c1fc7140a1a6f4ceee`
   Evidence: packages/opencode/test/provider/models.test.ts:224, future-hostile/dead-language term `stale` appears
293. `high` `vibe` `packages/opencode/test/session/prompt.test.ts:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:395a492f328df3c3af3c5920cc7d77548654d765cd917f3f29b91122afa62689`
   Evidence: packages/opencode/test/session/prompt.test.ts:20, future-hostile/dead-language term `todo` appears
294. `high` `vibe` `packages/opencode/test/session/prompt.test.ts:179`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:32fbdbc1dbb5c0175aaf219e3b5a303f9a72ca521e3507411cbde1ba8d185f0b`
   Evidence: packages/opencode/test/session/prompt.test.ts:179, future-hostile/dead-language term `todo` appears
295. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:af6df614ebc843aac6acf6ad5aa76a6d932661cb5abf30fa7197dfeb0c5d23e0`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:9, future-hostile/dead-language term `todo` appears
296. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:245`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:29ca5401aabdf013a9eeb6308995e95f3796171a885df359b276bea1ab26b5ef`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:245, future-hostile/dead-language term `todo` appears
297. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:246`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:36de5ccf599f7d9ca273241f7cc344f06d6fb2ab6091b65a3a28f38c14699525`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:246, future-hostile/dead-language term `todo` appears
298. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:251`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e52c2dfc0d429985d1cb4c73fcd49ab7e26f57cf1cc0503f5e23914613bd7498`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:251, future-hostile/dead-language term `todo` appears
299. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:140`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5c919fc235533016a6e25a5c3f92c8d437bcbc0d9cc6829645c13be0fa423446`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:140, future-hostile/dead-language term `stale` appears
300. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:320`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ab0139d13ff9a29d4a61902735325581402578fb1edb7f60b94f27c7bd7c57ac`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:320, future-hostile/dead-language term `stale` appears
301. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:357`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2e2b75b7490343568982be3db3302fae850fe6bc3f0fcfe0433c41a88656906d`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:357, future-hostile/dead-language term `stale` appears
302. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:358`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3e83907c46bc5434a26f27ac0abeccb5c0364c71d72018bf71dfa689384a35e7`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:358, future-hostile/dead-language term `stale` appears
303. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:409`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dd041de4213318b09b851439bca17aec44d72014cd23174bc2134a652b5ced35`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:409, future-hostile/dead-language term `stale` appears
304. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:438`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b6098e71f8c3f2033b2692dcc84c487a83588df7f0a9a1a2a74c27b39c0cbcb7`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:438, future-hostile/dead-language term `stale` appears
305. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:24`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:76073a8dd9fcd60befe60a4644331c4b22915fe558d5e6036c4581bafc34721b`
   Evidence: packages/opencode/test/tool/parameters.test.ts:24, future-hostile/dead-language term `todo` appears
306. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:49`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0c25fb3c39e1c14d74b7e9da93c11101500eec78eb3651fd8b6f05a7831d8747`
   Evidence: packages/opencode/test/tool/parameters.test.ts:49, future-hostile/dead-language term `todo` appears
307. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:213`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:27aa5c088dfbb9eccb853e55bc7767f6ba934788ce22679a47bf5b79fa019b80`
   Evidence: packages/opencode/test/tool/parameters.test.ts:213, future-hostile/dead-language term `todo` appears
308. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:219`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3add71aeedf367eff1075c989ecbcb51e121a791221b421d5cd7f00bcae49417`
   Evidence: packages/opencode/test/tool/parameters.test.ts:219, future-hostile/dead-language term `todo` appears
309. `high` `vibe` `packages/plugin/src/tui.ts:8`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e165294ebd150c3bd91e093666189472a2d918c92d38d49eca5592c33731eda9`
   Evidence: packages/plugin/src/tui.ts:8, future-hostile/dead-language term `todo` appears
310. `high` `vibe` `packages/plugin/src/tui.ts:313`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f8132c2e97e20835563aeb7d1288d7aa88e77593e6735e8b544885f941eb6adb`
   Evidence: packages/plugin/src/tui.ts:313, future-hostile/dead-language term `todo` appears
311. `high` `generated` `packages/sdk/js/src/gen/client/client.gen.ts:1`
   Rule: `HLT-002-GENERATED-MUTATION`
   Check: `HLT-002-GENERATED-MUTATION:generated` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `contract`, owner `tools`
   Docs: `agent/JANKURAI_STANDARD.md#generated-zones`
   Reason: generated zone is not protected strongly enough against hand edits
   Fix: add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Rerun: `just fast`
   Fingerprint: `sha256:14ea5b3fddebb2958fcd0d3eb2c97d6432765cb2685c62b1a32b3ac9194ed40d`
   Evidence: generated file contains TODO/stub markers
312. `high` `vibe` `packages/ui/src/components/avatar.tsx:50`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:daa0ebd4e6355421cb2920d54661b7a31144e0e8e4a2479999d26e1cada7f916`
   Evidence: packages/ui/src/components/avatar.tsx:50, future-hostile/dead-language term `fallback` appears
313. `high` `vibe` `packages/ui/src/components/basic-tool.tsx:202`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b93ae9e907d9652c0570eff36beda9aa3fa2961f7989022dae80d58bed32dcfd`
   Evidence: packages/ui/src/components/basic-tool.tsx:202, future-hostile/dead-language term `fallback` appears
314. `high` `vibe` `packages/ui/src/components/file-icon.tsx:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2d9427a9500914786c7322daf9a3765677e25037814ad821615ff3c336bf48a9`
   Evidence: packages/ui/src/components/file-icon.tsx:25, future-hostile/dead-language term `fallback` appears
315. `high` `vibe` `packages/ui/src/components/file-icons/types.ts:76`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b93a17bd2f9be4be044827eed9de3cacad2d1ee02ea318bd6f9d21b341b63754`
   Evidence: packages/ui/src/components/file-icons/types.ts:76, future-hostile/dead-language term `todo` appears
316. `high` `vibe` `packages/ui/src/components/file-icons/types.ts:391`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `hack` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e6f962d76265c07b131777638a8da641209ae5c16cd784a15e950817ada7e009`
   Evidence: packages/ui/src/components/file-icons/types.ts:391, future-hostile/dead-language term `hack` appears
317. `high` `vibe` `packages/ui/src/components/file-media.tsx:167`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0bb8b2c0991e68703c7c3d7f31609ec340854458c6e8b221569af264cf8069a5`
   Evidence: packages/ui/src/components/file-media.tsx:167, future-hostile/dead-language term `fallback` appears
318. `high` `vibe` `packages/ui/src/components/line-comment-annotations.tsx:129`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0f7a1a41172c955c162e694890a011b366648a54dfd5e75090bd889ec84e4a4e`
   Evidence: packages/ui/src/components/line-comment-annotations.tsx:129, future-hostile/dead-language term `fallback` appears
319. `high` `vibe` `packages/ui/src/components/line-comment.tsx:19`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5918587aad6f77c84c4b4710fc6a2e3ac44551272808edf8a25232a36e4d0cb0`
   Evidence: packages/ui/src/components/line-comment.tsx:19, future-hostile/dead-language term `fallback` appears
320. `high` `vibe` `packages/ui/src/components/line-comment.tsx:79`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:73745d5a4ead50838b4ceffda95022d09b5bf058dd9f8e387957f662afa1ac13`
   Evidence: packages/ui/src/components/line-comment.tsx:79, future-hostile/dead-language term `fallback` appears
321. `high` `vibe` `packages/ui/src/components/line-comment.tsx:92`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:79c8263a133ddbb9a94a05b4e03f32fc84cb9764d3a1a4566ecdeda784d89a29`
   Evidence: packages/ui/src/components/line-comment.tsx:92, future-hostile/dead-language term `fallback` appears
322. `high` `vibe` `packages/ui/src/components/line-comment.tsx:403`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f1559855d51b17e63783db9cd1898eabb013a306378d939c7a76ceb139c7a06b`
   Evidence: packages/ui/src/components/line-comment.tsx:403, future-hostile/dead-language term `fallback` appears
323. `high` `vibe` `packages/ui/src/components/list.tsx:321`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:eaaab05501f82f5df03db820e018e23768219cd07b5bbe847578927cc07a6752`
   Evidence: packages/ui/src/components/list.tsx:321, future-hostile/dead-language term `fallback` appears
324. `high` `vibe` `packages/ui/src/components/message-nav.tsx:55`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a40aa3a47f44250e74d8df5a4a4334fe172c26616cc408fd19ec64e98ffd7716`
   Evidence: packages/ui/src/components/message-nav.tsx:55, future-hostile/dead-language term `fallback` appears
325. `high` `vibe` `packages/ui/src/components/message-part.tsx:29`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:17077cba5ca5bddce9a346b7e78f41693b463fc60eb4fbb79611a2b2a8dcc147`
   Evidence: packages/ui/src/components/message-part.tsx:29, future-hostile/dead-language term `todo` appears
326. `high` `vibe` `packages/ui/src/components/message-part.tsx:1085`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e33130e5b10e9735deae9edb0965b7b79be0bd5aa2f04c5d21425d6c4246e77f`
   Evidence: packages/ui/src/components/message-part.tsx:1085, future-hostile/dead-language term `fallback` appears
327. `high` `vibe` `packages/ui/src/components/message-part.tsx:1474`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:125d7771622b0e6b9c783c72b8050b1146a93154301b6860f9cf3748482689ef`
   Evidence: packages/ui/src/components/message-part.tsx:1474, future-hostile/dead-language term `fallback` appears
328. `high` `vibe` `packages/ui/src/components/message-part.tsx:1516`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:193457f3daee2983c9d1899f5c2db8c578bf22bc263774471c6d6016f127183e`
   Evidence: packages/ui/src/components/message-part.tsx:1516, future-hostile/dead-language term `fallback` appears
329. `high` `vibe` `packages/ui/src/components/message-part.tsx:2017`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:beab4fe7b5b1d8028fc906181ecee9d94a116ae5d2816f27978c56c9648c67f6`
   Evidence: packages/ui/src/components/message-part.tsx:2017, future-hostile/dead-language term `fallback` appears
330. `high` `vibe` `packages/ui/src/components/message-part.tsx:2193`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:daf8e4ac1d345d201290cd3f1619f66249347481d9db474994e920a66ff31420`
   Evidence: packages/ui/src/components/message-part.tsx:2193, future-hostile/dead-language term `todo` appears
331. `high` `vibe` `packages/ui/src/components/message-part.tsx:2209`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:34e96dbbe42c7b5dfc3a5b0366fe8778ca8b468942740b932c9ccd86af38ac47`
   Evidence: packages/ui/src/components/message-part.tsx:2209, future-hostile/dead-language term `todo` appears
332. `high` `vibe` `packages/ui/src/components/popover.tsx:148`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f7793b9d54aa582147cd111aa8f3747866729f1e0799dc28115cb463bd78341e`
   Evidence: packages/ui/src/components/popover.tsx:148, future-hostile/dead-language term `fallback` appears
333. `high` `vibe` `packages/ui/src/components/session-retry.tsx:60`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0e4dcc7a89910477ed09fdb140d7150a3eaefcc5fd90c83b9128b3191ec37ed4`
   Evidence: packages/ui/src/components/session-retry.tsx:60, future-hostile/dead-language term `fallback` appears
334. `high` `vibe` `packages/ui/src/components/session-review.tsx:383`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:17cc2680e4281f0fc98a21450762bcae545a6009e8ed0972b9ea855268da1310`
   Evidence: packages/ui/src/components/session-review.tsx:383, future-hostile/dead-language term `fallback` appears
335. `high` `vibe` `packages/ui/src/components/text-field.tsx:104`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dab9c4d850648f0b26b8d46b1f8140aa07e2c4f7ac588ee1f50d9cd858568dd1`
   Evidence: packages/ui/src/components/text-field.tsx:104, future-hostile/dead-language term `fallback` appears
336. `high` `vibe` `packages/ui/src/components/timeline-playground.stories.tsx:1978`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:db7b87f900340fd673a6d79cacb8d4fcb36703e60fe362628c7afc903dada7ef`
   Evidence: packages/ui/src/components/timeline-playground.stories.tsx:1978, future-hostile/dead-language term `fallback` appears
337. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:4`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:84c8a8690de0229ff6c6259f2e455146b1c0591e6705e537155ea76a3dd0624d`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:4, future-hostile/dead-language term `todo` appears
338. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:de87294e1f55c90d5d5a068cefa74d7aa5f089b1151f2b259237140e3a44651d`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:9, future-hostile/dead-language term `todo` appears
339. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:176`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b07ced2ae02090d81a019532e2f6082400daaf0d75f064d724910117a45a6e5a`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:176, future-hostile/dead-language term `todo` appears
340. `high` `vibe` `packages/ui/src/components/tool-error-card.tsx:96`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c0d593f3f4d65aa4374cc6638535bc93819efd10b594babcb5d94737193a35eb`
   Evidence: packages/ui/src/components/tool-error-card.tsx:96, future-hostile/dead-language term `fallback` appears
341. `high` `vibe` `packages/ui/src/components/tool-status-title.tsx:111`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:64875ef42bc22f81ebbac44a38f7a05c81ffc9c80a216e6b1c4be7554fd7da2e`
   Evidence: packages/ui/src/components/tool-status-title.tsx:111, future-hostile/dead-language term `fallback` appears
342. `high` `vibe` `packages/ui/src/storybook/scaffold.tsx:48`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:aad066c16bcb4ede51f087296da01af9d08572bbd69f8b601fb899fe9850ff7f`
   Evidence: packages/ui/src/storybook/scaffold.tsx:48, future-hostile/dead-language term `fallback` appears
343. `high` `vibe` `packages/web/src/components/Share.tsx:310`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ed5f2e9d6da6b9bf0af1148cf1ef1733a958a768b75af382dfdf7d5c0b9cfaf3`
   Evidence: packages/web/src/components/Share.tsx:310, future-hostile/dead-language term `fallback` appears
344. `high` `vibe` `packages/web/src/components/Share.tsx:346`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:294cd35b3ba68dd890d127eb41183ea10c217c4debc6dd40ed1c3e752ef72398`
   Evidence: packages/web/src/components/Share.tsx:346, future-hostile/dead-language term `fallback` appears
345. `high` `vibe` `packages/web/src/components/Share.tsx:444`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e86e1c1db9238a1e602f73e76c150b7fb597272c222255198c41a862dc264c37`
   Evidence: packages/web/src/components/Share.tsx:444, future-hostile/dead-language term `fallback` appears
346. `high` `vibe` `packages/web/src/components/share/part.tsx:305`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:85017161242b162196036627bfc06488d806b66815795c865f1b0104fe9974a7`
   Evidence: packages/web/src/components/share/part.tsx:305, future-hostile/dead-language term `todo` appears
347. `high` `vibe` `packages/web/src/components/share/part.tsx:391`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a7e2c8cd936ae3ba87076a6decf78354c9255b1b430ba627e7d7f7d9a5c65d41`
   Evidence: packages/web/src/components/share/part.tsx:391, future-hostile/dead-language term `todo` appears
348. `high` `vibe` `packages/web/src/components/share/part.tsx:397`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d6a91c59e09c7a44d260bcc09f68e8a242730b190cc5f7c7e65d773ecdc91b85`
   Evidence: packages/web/src/components/share/part.tsx:397, future-hostile/dead-language term `todo` appears
349. `high` `vibe` `packages/web/src/components/share/part.tsx:399`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bd5f7744e9c66cfd64625179b1b58f1dd069ee29ff9c7b2a95f21070b4d07578`
   Evidence: packages/web/src/components/share/part.tsx:399, future-hostile/dead-language term `todo` appears
350. `high` `vibe` `packages/web/src/components/share/part.tsx:400`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:161d76c5a26ca3f08601dd9dfb1f4bf8e07c6205712f0131b966aeb6428918fe`
   Evidence: packages/web/src/components/share/part.tsx:400, future-hostile/dead-language term `todo` appears
351. `high` `vibe` `packages/web/src/components/share/part.tsx:406`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:99af348e62fb119d60ad9c9981efd70983add95d39c02b2e0d5c4cbf7e252851`
   Evidence: packages/web/src/components/share/part.tsx:406, future-hostile/dead-language term `fallback` appears
352. `high` `vibe` `packages/web/src/components/share/part.tsx:669`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ad1a977e7b3f7519555ef22808cb7d5566d6baa74f6e068c283492df351eb75f`
   Evidence: packages/web/src/components/share/part.tsx:669, future-hostile/dead-language term `fallback` appears
353. `high` `vibe` `packages/web/src/components/share/part.tsx:802`
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

1. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `.opencode/plugins/tui-smoke.tsx` - use argv arrays, prepared statements, or a safe allowlisted command path
   Route: `Contracts/data`/`fast`
2. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/dialog-edit-project.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
3. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/dialog-select-directory.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
4. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/terminal.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
5. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/context/global-sync.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
6. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/context/global-sync/event-reducer.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
7. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/pages/layout.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
8. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/pages/session.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
9. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
10. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
11. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/component/header.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
12. `high` `HLT-019-STREAMING-RUNTIME-DRIFT` `packages/console/app/src/i18n/de.ts` - move Kafka/Tansu/Iggy/Fluvio/NATS/Redis-stream clients behind `crates/adapters/queues` or document a brownfield exception with owner, expiry, and migration path
   Route: `Contracts/data`/`db`
13. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/bench/[id].tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
14. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/bench/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
15. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/black/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
16. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/black/subscribe/[plan].tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
17. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/enterprise/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
18. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/anthropic.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
19. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/google.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
20. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
21. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/openai.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
22. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
23. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
24. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/script/lookup-user.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
25. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/src/user.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
26. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
27. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/function/src/auth.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
28. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/function/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
29. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/mail/emails/components.tsx` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
30. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/mail/emails/styles.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
31. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/mail/emails/templates/InviteEmail.tsx` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
32. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
33. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260228203230_blue_harpoon/migration.sql` - add a WHERE clause or prove the full-table rewrite with a local migration receipt
   Route: `Contracts/data`/`db`
34. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260323234822_events/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
35. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260410174513_workspace-name/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
36. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260413175956_chief_energizer/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
37. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
38. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260507054800_memory_os/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
39. `high` `HLT-002-GENERATED-MUTATION` `packages/sdk/js/src/gen/client/client.gen.ts` - add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Route: `Contracts/data`/`contract`
40. `high` `HLT-008-FALSE-GREEN-RISK` `packages/core/test/effect/cross-spawn-spawner.test.ts` - replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Route: `Verification`/`fast`
41. `medium` `HLT-018-PERF-CONCURRENCY-DRIFT` `Justfile` - add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Route: `Verification`/`fast`
42. `medium` `HLT-026-COST-BUDGET-GAP` `docs/testing.md` - add explicit budgets, quotas, stop conditions, and kill-switch evidence for paid or unbounded operations
   Route: `Verification`/`release`
43. `medium` `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP` `packages/opencode/test/provider/copilot/copilot-chat-model.test.ts` - attach raw CI logs, review receipts, and replayable commands instead of accepting claims or summaries
   Route: `Repair`/`audit`
44. `high` `packages/app/public/oc-theme-preload.js` - move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Route: `Context/setup`/`audit`
45. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/desktop/scripts/copy-bundles.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
46. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/desktop/scripts/copy-icons.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
47. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/docs/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
48. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/opencode/src/server/routes/instance/httpapi/handlers/v2.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
49. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/opencode/src/session/message-v2.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
50. `critical` `HLT-010-SECRET-SPRAWL` `infra/console.ts` - remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Route: `Security, secrets, agency`/`security`
51. `high` `HLT-009-GENERATED-SECURITY` `.github/workflows` - add a dedicated security lane with secret scanning, dependency review, and workflow linting
   Route: `Security, secrets, agency`/`security`
52. `high` `HLT-016-SUPPLY-CHAIN-DRIFT` `.github/workflows` - add secret scanning, dependency review, and SBOM or provenance checks to CI
   Route: `Security, secrets, agency`/`security`
53. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/docs-locale-sync.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
54. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/docs-locale-sync.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
55. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/jankurai.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
56. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/opencode.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
57. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-standards.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
58. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-standards.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
59. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-standards.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
60. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-github-action.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
61. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-github-action.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
62. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-vscode.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
63. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish-vscode.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
64. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
65. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - remove the non-blocking override so scan failures stop the pipeline
   Route: `Security, secrets, agency`/`security`
66. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - never echo secrets; pass them directly to trusted binaries and keep shell tracing off
   Route: `Security, secrets, agency`/`security`
67. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/publish.yml` - limit the path to build outputs and keep credential files out of caches and artifacts
   Route: `Security, secrets, agency`/`security`
68. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/release-github-action.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
69. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/release-github-action.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
70. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/review.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
71. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/review.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
72. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/review.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
73. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/stats.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
74. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/triage.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
75. `high` `HLT-001-DEAD-MARKER` `.opencode/plugins/tui-smoke.tsx` - replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Route: `Entropy`/`fast`
76. `high` `HLT-023-INPUT-BOUNDARY-GAP` `.opencode/plugins/tui-smoke.tsx` - replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Route: `Security, secrets, agency`/`security`
77. `high` `HLT-013-RENDERED-UX-GAP` `apps/web` - add Storybook state coverage, Playwright screenshots, visual review or `@jankurai/ux-qa`, accessibility scans, CLS checks, generated mocks, and design tokens
   Route: `Verification and rendered UX`/`web`
78. `high` `HLT-001-DEAD-MARKER` `github/index.ts` - collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Route: `Entropy`/`fast`
79. `high` `infra/console.ts` - extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Route: `Entropy`/`fast`
80. `high` `HLT-001-DEAD-MARKER` `packages/app/src/app.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
81. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/dialog-edit-project.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
82. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/dialog-select-file.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
83. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/dialog-select-server.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
84. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/file-tree.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
85. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
86. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input/image-attachments.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
87. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input/slash-popover.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
88. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/server/server-row.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
89. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/session/session-header.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
90. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/session/session-sortable-tab.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
91. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/settings-keybinds.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
92. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/settings-models.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
93. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/settings-providers.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
94. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/status-popover-body.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
95. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/error.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
96. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
97. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/inline-editor.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
98. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/sidebar-items.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
99. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/sidebar-project.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
100. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/layout/sidebar-workspace.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
101. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/composer/session-composer-region.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
102. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/composer/session-question-dock.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
103. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/message-timeline.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
104. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/session-side-panel.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
105. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/terminal-panel.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
106. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/app/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
107. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/bench/[id].tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
108. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/bench/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
109. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/black/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
110. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/black/subscribe/[plan].tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
111. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
112. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/monthly-limit-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
113. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/reload-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
114. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
115. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/keys/key-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
116. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/members/member-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
117. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/new-user-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
118. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/provider-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
119. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/settings/settings-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
120. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/usage/graph-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
121. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/usage/usage-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
122. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/console/app/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
123. `high` `HLT-001-DEAD-MARKER` `packages/enterprise/src/routes/share/[shareID].tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
124. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/enterprise/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
125. `high` `HLT-001-DEAD-MARKER` `packages/opencode/script/httpapi-exercise.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
126. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/acp/agent.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
127. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/github.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
128. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/run.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
129. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/context/theme.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
130. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
131. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/plugin/internal.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
132. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
133. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/effect/app-runtime.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
134. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/plugin/loader.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
135. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
136. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
137. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/httpapi/server.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
138. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/index.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
139. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
140. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/llm.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
141. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/pending.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
142. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/processor.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
143. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/prompt.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
144. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/todo.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
145. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/tool/pending.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
146. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/tool/registry.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
147. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/tool/todo.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
148. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/config/config.part-07.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
149. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/effect/app-runtime-logger.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
150. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/provider/models.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
151. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/session/prompt.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
152. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/session/schema-decoding.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
153. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/storage/json-migration.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
154. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/tool/parameters.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
155. `high` `HLT-001-DEAD-MARKER` `packages/plugin/src/tui.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
156. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/avatar.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
157. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/basic-tool.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
158. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-icon.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
159. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-icons/types.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
160. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-media.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
161. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/line-comment-annotations.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
162. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/line-comment.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
163. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/list.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
164. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/message-nav.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
165. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/message-part.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
166. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/popover.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
167. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/session-retry.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
168. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/session-review.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
169. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/text-field.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
170. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/timeline-playground.stories.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
171. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/todo-panel-motion.stories.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
172. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/tool-error-card.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
173. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/tool-status-title.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
174. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/storybook/scaffold.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
175. `high` `HLT-001-DEAD-MARKER` `packages/web/src/components/Share.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
176. `high` `HLT-001-DEAD-MARKER` `packages/web/src/components/share/part.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
177. `medium` `HLT-001-DEAD-MARKER` `.` - split large or ambiguous authored code into smaller semantic modules with focused tests
   Route: `Entropy`/`fast`
178. `medium` `HLT-016-SUPPLY-CHAIN-DRIFT` `.github/workflows/jankurai.yml` - wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Route: `Security, secrets, agency`/`security`
