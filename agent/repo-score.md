# jankurai Repo Score

- Standard: `jankurai`
- Auditor: `0.8.11`
- Schema: `1.6.0`
- Paper edition: `2026.05-ed8`
- Target stack ID: `rust-ts-vite-react-postgres-bounded-python`
- Target stack: `Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service`
- Repo: `.`
- Run ID: `1778145931`
- Started at: `1778145931`
- Elapsed: `43903` ms
- Scope: `full`
- Raw score: `70`
- Final score: `60`
- Decision: `advisory`
- Minimum score: `85`
- Caps applied: `no-security-lane-on-high-risk-repo, no-secret-or-dependency-scanning-in-ci, non-optimal-product-language-found, vibe-placeholders-in-product-code, fallback-soup-in-product-code, future-hostile-dead-language-in-product-code, severe-duplication-in-product-code, generated-zone-mutation-risk, missing-rendered-ux-qa-lane, secret-like-content-detected, false-green-test-risk, input-boundary-gap, release-readiness-gap, missing-rust-property-or-integration-tests, no-agent-friendly-exception-pattern, streaming-runtime-drift, sql-bad-behavior, typescript-bad-behavior, docker-bad-behavior, ci-bad-behavior, web-security-bad-behavior, repo-rot-bad-behavior`

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
| `release-readiness-gap` | 80 | yes |
| `missing-rust-property-or-integration-tests` | 82 | yes |
| `no-agent-friendly-exception-pattern` | 76 | yes |
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
| Proof lanes and test routing | 12 | 80 | 9.60 | one-command setup/validation lane found; deterministic fast lane found |
| Security and supply-chain posture | 12 | 64 | 7.68 | lockfile present; secret or dependency scan tooling found |
| Code shape and semantic surface | 12 | 0 | 0.00 | largest authored code file: packages/app/src/pages/layout.tsx (2514 LOC); code file exceeds 500 LOC |
| Data truth and workflow safety | 8 | 100 | 8.00 | database surface present; structured db boundary manifest present |
| Observability and repair evidence | 8 | 64 | 5.12 | observability libraries or patterns found; ops/observability directory present |
| Context economy and agent instructions | 7 | 100 | 7.00 | root `AGENTS.md` present; root `AGENTS.md` stays short |
| Jankurai tool adoption and CI replacement | 7 | 35 | 2.45 | control-plane files present; applicable=16 |
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
- CI evidence: `4`
- Artifact verified: `4`
- Replaced count: `4`
- Missing CI evidence: `audit-ci, proof-routing, security, ci-bad-behavior, git-bad-behavior, release-bad-behavior, contract-drift, authz-matrix, input-boundary, agent-tool-supply, release-readiness, cost-budget`

| Tool | Category | Mode | Status | Replaced | Artifacts |
| --- | --- | --- | --- | --- | --- |
| `audit-ci` | `audit` | `auto` | `configured` | `manual repo scoring, ad hoc score gates` | `agent/repo-score.json, agent/repo-score.md` |
| `proof-routing` | `proof` | `auto` | `configured` | `ad hoc proof lane selection, manual proof receipts` | `agent/repo-score.json, agent/repo-score.md, target/jankurai/repair-queue.jsonl` |
| `proofbind` | `proof` | `auto` | `artifact_verified` | `manual changed-surface routing, ad hoc proof obligation lists` | `target/jankurai/proofbind/surface-witness.json, target/jankurai/proofbind/obligations.json` |
| `proofmark-rust` | `proof` | `auto` | `artifact_verified` | `line-only coverage review, manual in-diff mutation review` | `target/jankurai/proofmark/proofmark-receipt.json, target/jankurai/proofmark/proof-receipt.json` |
| `security` | `security` | `auto` | `configured` | `gitleaks, dependency review, SBOM/provenance` | `target/jankurai/security/evidence.json` |
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
4. `high` `security` `.github/workflows/beta.yml:21`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:594a9d6afba2b5e737f0d338f5369864063476ed1cc4bb694a7cfbb5500e5e33`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/beta.yml, line=21, proof_window=None, snippet=uses: actions/checkout@v4
5. `high` `security` `.github/workflows/containers.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:5da07808a4d4a3ebdf2050ce6cae1881ff649b63358a14367bfa8441e65b8162`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/containers.yml, line=1, proof_window=None, snippet=name: containers
6. `high` `security` `.github/workflows/containers.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:68d8f0c99ec9a9712b5e17160469cbafe84af42cab8160b04f28baa5cda68bf1`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/containers.yml, line=1, proof_window=None, snippet=name: containers
7. `high` `security` `.github/workflows/containers.yml:24`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:08205c33a5fda331c6f5b7380ec8f376d5f47d096453c4d09ab813e00a2ef1d4`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/containers.yml, line=24, proof_window=None, snippet=- uses: actions/checkout@v4
8. `high` `security` `.github/workflows/containers.yml:29`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:3feb0a3f62226da627178e117068720c953fd98a18003a83d1f38409b8e21af4`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/containers.yml, line=29, proof_window=None, snippet=uses: docker/setup-qemu-action@v3
9. `high` `security` `.github/workflows/containers.yml:32`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:864bccabcb179be0b06d4358d40aeb02b55d7c58fd1108fe5af6b634dea1d2a8`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/containers.yml, line=32, proof_window=None, snippet=uses: docker/setup-buildx-action@v3
10. `high` `security` `.github/workflows/containers.yml:35`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:492528958f3b7a3c6e9ad9c40968ac19f69565097965e73a95fcd4088078b05f`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/containers.yml, line=35, proof_window=None, snippet=uses: docker/login-action@v3
11. `high` `security` `.github/workflows/deploy.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.permissions.missing`
   Reason: workflow permissions default is not pinned in source
   Fix: add top-level `permissions: contents: read` and job-specific write scopes only where needed
   Rerun: `just security`
   Fingerprint: `sha256:399a3a5e9e1979217dbf10519e1ea9f1ca6c81dc463d93df2dbab768154638aa`
   Evidence: detector=ci.permissions.missing, path=.github/workflows/deploy.yml, line=1, proof_window=None, snippet=name: deploy
12. `high` `security` `.github/workflows/deploy.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:56ce869d51f630d8cebdb09d4577129071b8d7454f601cb0bfe2acd216764f7d`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/deploy.yml, line=1, proof_window=None, snippet=name: deploy
13. `high` `security` `.github/workflows/deploy.yml:16`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:f576309e0dc8c5be8670d080c5dfe00bf308be4344cc4e31fa001f8fd48b9996`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/deploy.yml, line=16, proof_window=None, snippet=- uses: actions/checkout@v3
14. `high` `security` `.github/workflows/deploy.yml:20`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:b8a39a10c8bcfcd823e64a1a1def60a34e411b0e22308a15c2a9280ea749da30`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/deploy.yml, line=20, proof_window=None, snippet=- uses: actions/setup-node@v4
15. `high` `security` `.github/workflows/docs-locale-sync.yml:22`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:39191044293f790fd9545aaf7ccee3ad6c06d75d3e88d94df130ecdc9f65d72b`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/docs-locale-sync.yml, line=22, proof_window=None, snippet=uses: actions/checkout@v4
16. `high` `security` `.github/workflows/docs-locale-sync.yml:56`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:332990ce552616bb1b50d175fb60dac476259998bdad4638d0d7bf73d2a38006`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/docs-locale-sync.yml, line=56, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash
17. `high` `security` `.github/workflows/docs-update.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:5266f276939624325bebaacea1566a6c0cd197e58de7e2eaeaf03d6f6f1f2381`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/docs-update.yml, line=1, proof_window=None, snippet=name: docs-update
18. `high` `security` `.github/workflows/docs-update.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:5e0417393d177a0a89bcd0601819aa1aa8d18f360fa30d3123071f01113b43a4`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/docs-update.yml, line=1, proof_window=None, snippet=name: docs-update
19. `high` `security` `.github/workflows/docs-update.yml:21`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:163c8625b66555128ab37ec00f3251e805944628cdbe462d0a261b7ffd66ffc9`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/docs-update.yml, line=21, proof_window=None, snippet=uses: actions/checkout@v4
20. `high` `security` `.github/workflows/docs-update.yml:46`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.mutable-ref`
   Reason: action ref can change without review
   Fix: pin the action to a commit SHA or stable release tag
   Rerun: `just security`
   Fingerprint: `sha256:4de16f1aaf2d98a19c89d26ca88fa6361f57a4c8cd22aeeaf1cd1418d0a3071f`
   Evidence: detector=ci.action.mutable-ref, path=.github/workflows/docs-update.yml, line=46, proof_window=None, snippet=uses: sst/opencode/github@latest
21. `high` `security` `.github/workflows/docs-update.yml:46`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:8037c3aa883724fec9ba4f589fbe4dcd154375e831b3e26d9c969f98a8d660d5`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/docs-update.yml, line=46, proof_window=None, snippet=uses: sst/opencode/github@latest
22. `high` `security` `.github/workflows/duplicate-issues.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:96d7594fab4078b693f12cda732a675693d6b7f832616ec3e7f4bd46de0830c0`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/duplicate-issues.yml, line=1, proof_window=None, snippet=name: duplicate-issues
23. `high` `security` `.github/workflows/duplicate-issues.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:5cc9f42915adb9cfa0c0a8971fe085343d0bae7dee650a71cfe34546286ac321`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/duplicate-issues.yml, line=1, proof_window=None, snippet=name: duplicate-issues
24. `high` `security` `.github/workflows/duplicate-issues.yml:16`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:60a9d26d5778f50c34893ff1541c07324e414f5e2dac00520b7cab03bad3c903`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/duplicate-issues.yml, line=16, proof_window=None, snippet=uses: actions/checkout@v4
25. `high` `security` `.github/workflows/duplicate-issues.yml:23`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:b0b6c1e3de50da857fe6b5d8333b24249e56e37ab910ccf2720994075629ea3c`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/duplicate-issues.yml, line=23, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash
26. `high` `security` `.github/workflows/duplicate-issues.yml:128`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:41ec625da63598808a6d44c15d908c4e15ec4b9bc6b53a08832c206c6b4f918d`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/duplicate-issues.yml, line=128, proof_window=None, snippet=uses: actions/checkout@v4
27. `high` `security` `.github/workflows/duplicate-issues.yml:135`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:2ad4f459877f94a5f0b0ce5ce7d29fe548e270ef93319b175b66392015ef72d6`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/duplicate-issues.yml, line=135, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash
28. `high` `security` `.github/workflows/generate.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:7dc31597a420c83f544d322a2d46efa71fe4857e712649bf37811c213ae03786`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/generate.yml, line=1, proof_window=None, snippet=name: generate
29. `high` `security` `.github/workflows/generate.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:d52b46ceee6a269a50985f7bea1d51720a044debc71b43a40a2bf828142c9c1e`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/generate.yml, line=1, proof_window=None, snippet=name: generate
30. `high` `security` `.github/workflows/generate.yml:16`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:f06b3e1760af79129d732302e012a31843841b9709a3754eee73997558e4c44f`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/generate.yml, line=16, proof_window=None, snippet=uses: actions/checkout@v4
31. `medium` `security` `.github/workflows/jankurai.yml`
   Rule: `HLT-016-SUPPLY-CHAIN-DRIFT`
   Check: `HLT-016-SUPPLY-CHAIN-DRIFT:security` `soft` confidence `0.76`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: `Security and supply-chain posture` scored 64 below the standard floor of 85
   Fix: wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Rerun: `just security`
   Fingerprint: `sha256:448fef8ddc7723add084cc7c7c107d8cc3ee2a2440a375749c98a2cec4d642b9`
   Evidence: lockfile present, secret or dependency scan tooling found, provenance/SBOM tooling found, canonical security lane wrapper present
32. `high` `security` `.github/workflows/jankurai.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:130d79c121d03f9780d3348a86c4a7eac6308bf578a32a416f722babe7df892e`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/jankurai.yml, line=1, proof_window=None, snippet=name: jankurai
33. `high` `security` `.github/workflows/jankurai.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:9e961161af32933baacaf16de5b2469db25a682f6a9e5e311b8985bcef32daa6`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/jankurai.yml, line=1, proof_window=None, snippet=name: jankurai
34. `high` `security` `.github/workflows/jankurai.yml:14`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:9ea25b4546fd02120b2de2ed543993c39a48830bf1c9507e3445bddaf195fe96`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/jankurai.yml, line=14, proof_window=None, snippet=- uses: actions/checkout@v6
35. `high` `security` `.github/workflows/jankurai.yml:17`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:5c8e3c293a011267c5ad0ae48771934d132ce141be69fcaf422f367ebdb02aac`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/jankurai.yml, line=17, proof_window=None, snippet=- uses: dtolnay/rust-toolchain@stable
36. `high` `security` `.github/workflows/jankurai.yml:22`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.sarif.not-uploaded`
   Reason: SARIF evidence is not published to code scanning
   Fix: upload the SARIF artifact with github/codeql-action/upload-sarif pinned to a full SHA
   Rerun: `just security`
   Fingerprint: `sha256:0ca2538a607749dd7399a1d1190f4586b71d5bd7fe239609c9f195890548be23`
   Evidence: detector=ci.sarif.not-uploaded, path=.github/workflows/jankurai.yml, line=22, proof_window=None, snippet=run: jankurai audit . --mode advisory --baseline agent/repo-score.json --json target/jankurai/repo-score.json --md target/jankurai/repo-score.md --sarif target/
37. `high` `security` `.github/workflows/jankurai.yml:31`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:bfa1d535b6b6657e935ad75b78a5d65ea5c2ff5325b5ffe2b7c9862be5d9c483`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/jankurai.yml, line=31, proof_window=None, snippet=- uses: actions/upload-artifact@v7
38. `high` `security` `.github/workflows/nix-eval.yml:23`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:f0bf5dc59b34ade14a4bf941e0da2aa32e72d8e3a553a7039c66b295c2179ee9`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/nix-eval.yml, line=23, proof_window=None, snippet=uses: actions/checkout@v6
39. `high` `security` `.github/workflows/nix-eval.yml:26`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:a21bbf14f090bda712706691c865e23857d9bbcf70f7b2d5d4fdbb379e354f2a`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/nix-eval.yml, line=26, proof_window=None, snippet=uses: nixbuild/nix-quick-install-action@v34
40. `high` `security` `.github/workflows/nix-hashes.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:d9cdb7aa051bd3ebbc234c11e826e014b7a926f080bcb1ab3a071c485f9876e5`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/nix-hashes.yml, line=1, proof_window=None, snippet=name: nix-hashes
41. `high` `security` `.github/workflows/nix-hashes.yml:44`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:35823b5286495ad0fd0ce912fe6b6c6d5e30789d1e59c26a0f3852a67eecc574`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/nix-hashes.yml, line=44, proof_window=None, snippet=uses: actions/checkout@v6
42. `high` `security` `.github/workflows/nix-hashes.yml:47`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:752c91953cc11f3c7ad4390c251ba9a534b24d7589ad58289c6077e69243048f`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/nix-hashes.yml, line=47, proof_window=None, snippet=uses: nixbuild/nix-quick-install-action@v34
43. `high` `security` `.github/workflows/nix-hashes.yml:75`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:5512671a80a31f67ee3d610aee80391c96bf72854de236d9565db2afd333dabc`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/nix-hashes.yml, line=75, proof_window=None, snippet=uses: actions/upload-artifact@v4
44. `high` `security` `.github/workflows/nix-hashes.yml:88`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:063e55807b609077e6681115895cc003a2673336911950a017d8d8f82e8c3e9a`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/nix-hashes.yml, line=88, proof_window=None, snippet=uses: actions/checkout@v4
45. `high` `security` `.github/workflows/nix-hashes.yml:105`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:1f14a7a2f44964d84ba90fa378732087c93f74a368ffca186e6eb9edce243584`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/nix-hashes.yml, line=105, proof_window=None, snippet=uses: actions/download-artifact@v4
46. `high` `security` `.github/workflows/notify-discord.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:8c2a75b2daa4a3f9e2c2fd003925c8fff5bab9eec582d309ff79098496134ac6`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/notify-discord.yml, line=1, proof_window=None, snippet=name: notify-discord
47. `high` `security` `.github/workflows/notify-discord.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.permissions.missing`
   Reason: workflow permissions default is not pinned in source
   Fix: add top-level `permissions: contents: read` and job-specific write scopes only where needed
   Rerun: `just security`
   Fingerprint: `sha256:f1f3d611ed6a327cd2279b37281361222d7e685a18c7f0c80cf74164cb1dea27`
   Evidence: detector=ci.permissions.missing, path=.github/workflows/notify-discord.yml, line=1, proof_window=None, snippet=name: notify-discord
48. `high` `security` `.github/workflows/notify-discord.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:cd899c8777817d87890aba8704509e79b6dfae363f6dd82ba33aa0e0f99d5be4`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/notify-discord.yml, line=1, proof_window=None, snippet=name: notify-discord
49. `high` `security` `.github/workflows/notify-discord.yml:12`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:be945d488e3f24bc69117713b4b41876b1726099fa7c7fbcf8f28bb272f5cfa4`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/notify-discord.yml, line=12, proof_window=None, snippet=uses: SethCohen/github-releases-to-discord@v1
50. `high` `security` `.github/workflows/opencode.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:d679a778b64883420248d0e2370936c6c1c894166f43d148153594e8e42859e8`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/opencode.yml, line=1, proof_window=None, snippet=name: opencode
51. `high` `security` `.github/workflows/opencode.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:7ed105d29e8dafa5b603f717fb8ceab97c12e94b9fa2925c7b812f75d8410649`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/opencode.yml, line=1, proof_window=None, snippet=name: opencode
52. `high` `security` `.github/workflows/opencode.yml:24`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:6106a3bf55ad1ff521f8f6b424b12fd0ee584e3aed07513a43d20ce64c07f342`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/opencode.yml, line=24, proof_window=None, snippet=uses: actions/checkout@v4
53. `high` `security` `.github/workflows/opencode.yml:29`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.mutable-ref`
   Reason: action ref can change without review
   Fix: pin the action to a commit SHA or stable release tag
   Rerun: `just security`
   Fingerprint: `sha256:02a53e939c84e1d75ba0b08ce0ff0881a1ea2a59fd86fecf033dc49593497fe7`
   Evidence: detector=ci.action.mutable-ref, path=.github/workflows/opencode.yml, line=29, proof_window=None, snippet=uses: anomalyco/opencode/github@latest
54. `high` `security` `.github/workflows/opencode.yml:29`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:64493168759096ee20e18a910334ed24eee7bac856649d3013e3c76f8bf94a2b`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/opencode.yml, line=29, proof_window=None, snippet=uses: anomalyco/opencode/github@latest
55. `high` `security` `.github/workflows/pr-management.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.concurrency.missing`
   Reason: workflow can run duplicate stale audits for the same ref
   Fix: add workflow-level concurrency with cancel-in-progress
   Rerun: `just security`
   Fingerprint: `sha256:8c87082ee1c872f744295d26b06514519ed736ea0800bcf3b12d7b02ddc642c5`
   Evidence: detector=ci.concurrency.missing, path=.github/workflows/pr-management.yml, line=1, proof_window=None, snippet=name: pr-management
56. `high` `security` `.github/workflows/pr-management.yml:1`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.timeout.missing`
   Reason: workflow can run without a checked time bound
   Fix: set an explicit timeout-minutes on each job
   Rerun: `just security`
   Fingerprint: `sha256:83337f1e762b79cef1c455d5b34585e92372a907667258c3e093e14c79b774c6`
   Evidence: detector=ci.timeout.missing, path=.github/workflows/pr-management.yml, line=1, proof_window=None, snippet=name: pr-management
57. `high` `security` `.github/workflows/pr-management.yml:15`
   Rule: `HLT-034-CI-BAD-BEHAVIOR`
   Check: `HLT-034-CI-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `ci.action.not-full-sha`
   Reason: tag or branch refs can change without review
   Fix: pin every external action to a 40-character commit SHA
   Rerun: `just security`
   Fingerprint: `sha256:6a479ba9514fb6f2b51638c45a3a7d5a2024df7586c176863fdf8b8a0e3ed95a`
   Evidence: detector=ci.action.not-full-sha, path=.github/workflows/pr-management.yml, line=15, proof_window=None, snippet=uses: actions/checkout@v4
58. `high` `security` `.github/workflows/pr-management.yml:40`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:21d369e76aef3729be4bbff6b60d8f510b69af2f21c3b6a14d98d038060123ea`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/pr-management.yml, line=40, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash
59. `high` `security` `.github/workflows/review.yml:35`
   Rule: `HLT-032-DOCKER-BAD-BEHAVIOR`
   Check: `HLT-032-DOCKER-BAD-BEHAVIOR:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/testing.md`
   Matched term: `docker.install.unverified-remote`
   Reason: the build downloads remote code without a checksum or signature proof
   Fix: pin the download, verify a checksum or signature, and avoid shell piping
   Rerun: `just security`
   Fingerprint: `sha256:377af843b66483d87aa214bce02b1cb9b000d6555834e16b686d92aec466c15f`
   Evidence: detector=docker.install.unverified-remote, path=.github/workflows/review.yml, line=35, proof_window=None, snippet=run: curl -fsSL https://opencode.ai/install | bash
60. `high` `security` `.github/workflows/triage.yml:23`
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
61. `high` `vibe` `.opencode/plugins/tui-smoke.tsx:681`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: product code contains TODO/stub/unimplemented/unreachable placeholder markers
   Fix: replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Rerun: `just fast`
   Fingerprint: `sha256:b9956cfaf40180040f4219cc336ddf76d78882cfe101149aa9d15ab397ccb7d0`
   Evidence: .opencode/plugins/tui-smoke.tsx:681 placeholders={{ normal, shell }}
62. `high` `boundary` `.opencode/plugins/tui-smoke.tsx:837`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.security.raw-command-sql`
   Reason: trusted input proof is missing
   Fix: use argv arrays, prepared statements, or a safe allowlisted command path
   Rerun: `just fast`
   Fingerprint: `sha256:50228189e49863444a8f5badc6a5ecd3cdda98b96cb6502f69ff366ab5c4a403`
   Evidence: detector=typescript.security.raw-command-sql, path=.opencode/plugins/tui-smoke.tsx, line=837, snippet=title: `${input.label} select dialog`,
63. `high` `security` `.opencode/plugins/tui-smoke.tsx:837`
   Rule: `HLT-023-INPUT-BOUNDARY-GAP`
   Check: `HLT-023-INPUT-BOUNDARY-GAP:security` `hard` confidence `0.88`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Matched term: `string sql`
   Reason: input handling risk needs deterministic negative tests
   Fix: replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Rerun: `just security`
   Fingerprint: `sha256:905c5fb22e3da655bc8faf1f94f84bb2e7ac0f2b0f039179bb2952d819a7fa27`
   Evidence: title: `${input.label} select dialog`,
64. `medium` `proof` `Justfile`
   Rule: `HLT-018-PERF-CONCURRENCY-DRIFT`
   Check: `HLT-018-PERF-CONCURRENCY-DRIFT:proof` `soft` confidence `0.76`
   Route: TLR `Verification`, lane `fast`, owner `workspace`
   Docs: `docs/testing.md`
   Reason: `Build speed signals` scored 70 below the standard floor of 85
   Fix: add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Rerun: `just fast`
   Fingerprint: `sha256:a256a7390d4b91a5b0a95d6f092e524c8f4080f27fe2b62e28cf0801343d0fef`
   Evidence: build acceleration markers found, targeted test/build commands found, locked dependency graph present, CI cache hint found
65. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/env.d.ts` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:cb9827e5e8d8976aa3ec4ad58b9aa3c1fba5273b0d144a24c6df1c8b05377fc2`
   Evidence: .opencode/env.d.ts
66. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/README.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:86e717c15bf3afcdd68066b5eca209b0774e868db39fcaa1445b866889ba1884`
   Evidence: .opencode/glossary/README.md
67. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/ar.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:452b25af709102e4a58c28a8ee9cefa4a4fa1cc92f3bff1269b3aa2745380caa`
   Evidence: .opencode/glossary/ar.md
68. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/br.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:baeb66021adcdbccac848d320c1ac98c613d98803f0a0f6d73d425b9099e9b59`
   Evidence: .opencode/glossary/br.md
69. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/bs.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:530a4fba4ac369c5f5bba3bc30c277e82733f545afb73f3aca4d339f621840a1`
   Evidence: .opencode/glossary/bs.md
70. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/da.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:4f5b6d9b514656b77b157df3d5ba9b925851b03dd459bd0625c67bb276a5225b`
   Evidence: .opencode/glossary/da.md
71. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/de.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:fa14c1862d27328400f04b7da6c54b06655c87cf27b8c6ec42c0a5cfbdd85c04`
   Evidence: .opencode/glossary/de.md
72. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/es.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:6e4fab46f85fb3d085fcb9fdb0a15d2192082de495354e48f810d95ead2c2790`
   Evidence: .opencode/glossary/es.md
73. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/fr.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:ce37c23a84044d0470a8a53f63fcf995d149d5b64f8f8ed824040581e37e663b`
   Evidence: .opencode/glossary/fr.md
74. `high` `context` `agent/owner-map.json`
   Rule: `HLT-003-OWNERLESS-PATH`
   Check: `HLT-003-OWNERLESS-PATH:context` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#ownership-boundaries`
   Reason: path `.opencode/glossary/ja.md` has no owner-map route
   Fix: add the narrowest stable prefix for this path to `agent/owner-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:106ce8c414074b6c9d2e0b628fa8e4cc9505c4b123d6cbb7cc83f82e81a2b794`
   Evidence: .opencode/glossary/ja.md
75. `medium` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `soft` confidence `0.76`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: `Proof lanes and test routing` scored 80 below the standard floor of 85
   Fix: route each owned path to a deterministic proof command and make the lane executable in CI
   Rerun: `just fast`
   Fingerprint: `sha256:4c32cd60475fd4c803e64a568543f5c081a156b33b97fa688f83b5a578024262`
   Evidence: one-command setup/validation lane found, deterministic fast lane found, test runner present in automation surface, GitHub workflow files present
76. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/env.d.ts` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:de6617e93b499fecac9bc2c39324c2c7f775b534d488e33b4cdf69291d9e9c45`
   Evidence: .opencode/env.d.ts
77. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/README.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:4e05f7eedecdca6154b84db3ac0f1dd8f1e87d5b9954c697701f308993a53323`
   Evidence: .opencode/glossary/README.md
78. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/ar.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:cd20f599c5172eb5ad5064b308cbfdf532959e5110174d977554a487e12640aa`
   Evidence: .opencode/glossary/ar.md
79. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/br.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:0e226e34c5e83a9986bf4f2dd5cf15253efaccd84998630e58be585994765b9b`
   Evidence: .opencode/glossary/br.md
80. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/bs.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:6fbb30b2d567e0bc64dcf4f21d3c68cc47586b17744aecafdb4ac3a3f8952e27`
   Evidence: .opencode/glossary/bs.md
81. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/da.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:82c04e548f8c0aa61e5e2dc5a982e1df0e81c8e37fbb476ab6c9402aa2cb3219`
   Evidence: .opencode/glossary/da.md
82. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/de.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:cd56b90aceef0517d58056948f1234cb29af4e1e4a4367962fa86c50e044b89e`
   Evidence: .opencode/glossary/de.md
83. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/es.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:92a2a4721e4b397090ae2a83a44582cbd648c4e03c6677f86a3bf1039bd93137`
   Evidence: .opencode/glossary/es.md
84. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/fr.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:e5aeb27cb23b1628ce94f206fe0cdf668a5cbee42dd2bc8b2dd7621d3c7a55be`
   Evidence: .opencode/glossary/fr.md
85. `high` `proof` `agent/test-map.json`
   Rule: `HLT-004-UNMAPPED-PROOF`
   Check: `HLT-004-UNMAPPED-PROOF:proof` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `agent`
   Docs: `agent/JANKURAI_STANDARD.md#proof-lanes`
   Reason: path `.opencode/glossary/ja.md` has no test-map proof route
   Fix: add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Rerun: `just fast`
   Fingerprint: `sha256:930db8d4729ba6659a92772d2d10b9f4edf19e78d2d4959aba872d8d0080a98c`
   Evidence: .opencode/glossary/ja.md
86. `high` `ux-qa` `apps/web`
   Rule: `HLT-013-RENDERED-UX-GAP`
   Check: `HLT-013-RENDERED-UX-GAP:ux-qa` `hard` confidence `0.88`
   Route: TLR `Verification and rendered UX`, lane `web`, owner `apps`
   Docs: `docs/testing.md`
   Reason: web surface lacks layered rendered UX QA evidence
   Fix: add Storybook state coverage, Playwright screenshots, visual review or `@jankurai/ux-qa`, accessibility scans, CLS checks, generated mocks, and design tokens
   Rerun: `just ux-qa`
   Fingerprint: `sha256:571d35c2e730a393b782bac14825b197c0543920bb21967079d264ac602ea5b1`
   Evidence: rendered UX QA lane missing
87. `high` `test` `crates/`
   Rule: `HLT-008-FALSE-GREEN-RISK`
   Check: `HLT-008-FALSE-GREEN-RISK:test` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Reason: Rust surface lacks required property and/or integration tests
   Fix: add `proptest` or equivalent invariant tests plus `tests/` integration coverage routed through `cargo nextest` or `cargo test`
   Rerun: `just fast`
   Fingerprint: `sha256:8ece7234070a20910736663e65a530625acd16dac7fa57476cfc7c9a74bd745c`
   Evidence: Rust surface detected
88. `high` `exceptions` `crates/domain`
   Rule: `HLT-017-OPAQUE-OBSERVABILITY`
   Check: `HLT-017-OPAQUE-OBSERVABILITY:exceptions` `hard` confidence `0.88`
   Route: TLR `Repair`, lane `observability`, owner `tools`
   Docs: `agent/JANKURAI_STANDARD.md#repair-receipts`
   Reason: no agent-friendly exception/error pattern was detected
   Fix: define a typed exception surface with purpose, reason, common fixes, docs_url, and repair_hint so the next rerun is local
   Rerun: `just score`
   Fingerprint: `sha256:538667a01e35d8e91eae100627364816dd225911862fa2fa1578642af63d4af8`
   Evidence: route repair work to the next agent, opaque failures slow local debugging and reruns, add a typed repair hint; name the common fixes; point at the local docs URL, docs/testing.md
89. `medium` `observability` `docs/testing.md`
   Rule: `HLT-017-OPAQUE-OBSERVABILITY`
   Check: `HLT-017-OPAQUE-OBSERVABILITY:observability` `soft` confidence `0.76`
   Route: TLR `Repair`, lane `observability`, owner `standard`
   Docs: `agent/JANKURAI_STANDARD.md#repair-receipts`
   Reason: `Observability and repair evidence` scored 64 below the standard floor of 85
   Fix: add structured errors, telemetry, and repair receipts that tell the next agent where to rerun proof
   Rerun: `just score`
   Fingerprint: `sha256:70c91c3c9a1f88fe8c49e24ef5ddbea9585e640f6889837cf0857995b4372117`
   Evidence: observability libraries or patterns found, ops/observability directory present, repair receipts or raw artifact language found, repair-hint and receipt convention are documented
90. `medium` `release` `docs/testing.md`
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
91. `high` `release` `docs/testing.md`
   Rule: `HLT-025-RELEASE-READINESS-GAP`
   Check: `HLT-025-RELEASE-READINESS-GAP:release` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `release`, owner `standard`
   Docs: `docs/testing.md`
   Matched term: `release readiness`
   Reason: launch gates need artifact-backed release evidence
   Fix: add launch-gate evidence for security, backups, monitoring, rollback, and abuse controls
   Rerun: `just check`
   Fingerprint: `sha256:0f21fe749a193e4585d996dc6d063b41115e23a172c09ba76bba9b549301861b`
   Evidence: release language found without full launch-gate evidence
92. `high` `vibe` `github/index.ts:300`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: fallback soup detected in product code
   Fix: collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Rerun: `just fast`
   Fingerprint: `sha256:84b6eb14b447dca5ef73be507cf6d8f8dee70ac3f973395a21cf1048c063b813`
   Evidence: github/index.ts:300 return null
93. `high` `boundary` `github/index.ts:403`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:5da7c4d567982ef058271cb9c3f1cfba8942a357efbb75a0f944e09110722a9b`
   Evidence: detector=typescript.types.any-boundary, path=github/index.ts, line=403, snippet=if (mockEvent) return parseMockContext(JSON.parse(mockEvent) as unknown)
94. `high` `boundary` `github/index.ts:451`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:74d9b255e227969c0287b76b13555e24ba945c92e621704da3c4ea40e9115d93`
   Evidence: detector=typescript.types.any-boundary, path=github/index.ts, line=451, snippet=const responseJson = (await response.json()) as unknown
95. `high` `boundary` `github/index.ts:456`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:9c7d1f4e6a9b9a66a898f45810abc2e4ec7e921ca2d9a2b77bbad74de3ac2fd2`
   Evidence: detector=typescript.types.any-boundary, path=github/index.ts, line=456, snippet=const responseJson = (await response.json()) as unknown
96. `high` `vibe` `infra/console.ts:1`
   Check: `HLT-000-SCORE-DIMENSION:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `unmapped`
   Reason: duplicated product code block detected
   Fix: extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Rerun: `just fast`
   Fingerprint: `sha256:c6cb7aa0947f7627ce6408a79cbaeb81f8afacb65f8a8b20244c65e78ae0a330`
   Evidence: duplicate block also appears at infra/console.ts:1
97. `critical` `security` `infra/console.ts:38`
   Rule: `HLT-010-SECRET-SPRAWL`
   Check: `HLT-010-SECRET-SPRAWL:security` `hard` confidence `0.95`
   Route: TLR `Security, secrets, agency`, lane `security`, owner `ops`
   Docs: `docs/audit-rubric.md#top-level-risk-mapping`
   Reason: secret-like value or credential material appears in repository text
   Fix: remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Rerun: `just security`
   Fingerprint: `sha256:c1be9a0a5ed8a59458f4e9cf664107f16928421beab1cbc2a3653410979c0324`
   Evidence: password: password.plaintext,
98. `high` `vibe` `jnoccio-fusion/src/state.rs:2229`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0567f10800bae7fb4e8b5d02ecef22736675b43833742ff73b3f67cf72b63352`
   Evidence: jnoccio-fusion/src/state.rs:2229, future-hostile/dead-language term `stale` appears
99. `high` `vibe` `jnoccio-fusion/web/src/main.tsx:527`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f0c0dd9eaf6a10c55975d89e445242c67a24292c4f3092a515597c291e9f909c`
   Evidence: jnoccio-fusion/web/src/main.tsx:527, future-hostile/dead-language term `placeholder` appears
100. `high` `stack` `packages/app/public/oc-theme-preload.js`
   Check: `HLT-000-SCORE-DIMENSION:stack` `hard` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Reason: runtime code uses a language outside the chosen optimal stack
   Fix: move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Rerun: `just score`
   Fingerprint: `sha256:139c59be93ae16bacd0a8718f1a15dcf6146bda8f4c66065769a29f3c2e62f0a`
   Evidence: packages/app/public/oc-theme-preload.js uses `.js`, Rust core + TypeScript/React/Vite + PostgreSQL + generated contracts + exception-only Python AI/data service
101. `high` `boundary` `packages/app/src/components/dialog-edit-project.tsx:68`
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
102. `high` `boundary` `packages/app/src/components/dialog-select-directory.tsx:194`
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
103. `high` `vibe` `packages/app/src/components/prompt-input.tsx:56`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2ae02b24db27d751652d71e0a859bb06239a8ede3d49529fd7f5ac62391f2f0e`
   Evidence: packages/app/src/components/prompt-input.tsx:56, future-hostile/dead-language term `placeholder` appears
104. `high` `vibe` `packages/app/src/components/prompt-input/placeholder.test.ts:2`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `placeholder` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6cf54292443d8cb0d68baaefa4a4dba276099c8253e2c90fdfc3cdc195d0da29`
   Evidence: packages/app/src/components/prompt-input/placeholder.test.ts:2, future-hostile/dead-language term `placeholder` appears
105. `high` `boundary` `packages/app/src/components/terminal.tsx:563`
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
106. `high` `vibe` `packages/app/src/context/global-sync.tsx:8`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c5ecadb1891cb9b2c3797956b57ac918fe597d822d29acf97fda1d50b817da2e`
   Evidence: packages/app/src/context/global-sync.tsx:8, future-hostile/dead-language term `todo` appears
107. `high` `vibe` `packages/app/src/context/global-sync.tsx:40`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a5e819874ea4c483ea6c552d354c0be3f225960473b0e005a20a11f548e7b9c7`
   Evidence: packages/app/src/context/global-sync.tsx:40, future-hostile/dead-language term `todo` appears
108. `high` `boundary` `packages/app/src/context/global-sync.tsx:55`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:5cabb8d2bbc3295817dbc81571f0853f2d5a0b3f5315eebab77d274e2950fcab`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=55, snippet=export const loadSessionsQueryKey = (directory: string) => [directory, "loadSessions"] as const
109. `high` `boundary` `packages/app/src/context/global-sync.tsx:57`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:98d39edc1c6f323408d48dbf9ff4f325e085924843167a95410698bdb98fe16f`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=57, snippet=export const mcpQueryKey = (directory: string) => [directory, "mcp"] as const
110. `high` `boundary` `packages/app/src/context/global-sync.tsx:65`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:26f830d0009486e32067881031a4dda87c012779e4d1b7b03369b9935ec8fb7e`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync.tsx, line=65, snippet=export const lspQueryKey = (directory: string) => [directory, "lsp"] as const
111. `high` `vibe` `packages/app/src/context/global-sync.tsx:165`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a607e889cf671d34aa40bfc36c73db05a094458c2153f422e48e9887299d956a`
   Evidence: packages/app/src/context/global-sync.tsx:165, future-hostile/dead-language term `todo` appears
112. `high` `vibe` `packages/app/src/context/global-sync/event-reducer.ts:12`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4327732f6492648b077948880e2c7f09ed570bb48237a7eb12a4bd3211f56feb`
   Evidence: packages/app/src/context/global-sync/event-reducer.ts:12, future-hostile/dead-language term `todo` appears
113. `high` `vibe` `packages/app/src/context/global-sync/event-reducer.ts:21`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:93905b21e94532cc622b468a56c080b1219c694c0c89ae584929c084082d7bfa`
   Evidence: packages/app/src/context/global-sync/event-reducer.ts:21, future-hostile/dead-language term `todo` appears
114. `high` `vibe` `packages/app/src/context/global-sync/event-reducer.ts:36`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8a2e8364f737787ab0ce895d21f44b2cdfb918d295fb35b0e91ca4dbcb81f241`
   Evidence: packages/app/src/context/global-sync/event-reducer.ts:36, future-hostile/dead-language term `todo` appears
115. `high` `vibe` `packages/app/src/context/global-sync/event-reducer.ts:41`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6e08aeaeb74aae3c6bef0cd2438178962fe8ff01ca3b321ad808993d3d156d52`
   Evidence: packages/app/src/context/global-sync/event-reducer.ts:41, future-hostile/dead-language term `todo` appears
116. `high` `boundary` `packages/app/src/context/global-sync/event-reducer.ts:56`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:c6a0bf3c52a3cbe8b57a11f773103c94eb5f7ef7b348e4e2278e6e4c923c7587`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync/event-reducer.ts, line=56, snippet=const properties = input.event.properties as Project
117. `high` `boundary` `packages/app/src/context/global-sync/event-reducer.ts:118`
   Rule: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR`
   Check: `HLT-031-TYPESCRIPT-BAD-BEHAVIOR:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Matched term: `typescript.types.any-boundary`
   Reason: value shape is not proven before the cast
   Fix: validate the value first, then narrow it with a proof-aware decoder
   Rerun: `just fast`
   Fingerprint: `sha256:f850cf5da866625a5fe66841cb5e6bbd81e579cddf5c04ccea767ec936c211f8`
   Evidence: detector=typescript.types.any-boundary, path=packages/app/src/context/global-sync/event-reducer.ts, line=118, snippet=input.setSessionItems ?? (input["setSession" + "To" + "do"] as SessionItemsUpdater | undefined)
118. `high` `vibe` `packages/app/src/context/global-sync/session-cache.test.ts:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:faf1bea29e26def898a9d412fb14f3a3bb622816ba7def386d19ed3147058d7f`
   Evidence: packages/app/src/context/global-sync/session-cache.test.ts:9, future-hostile/dead-language term `todo` appears
119. `high` `vibe` `packages/app/src/context/global-sync/types.ts:16`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3248aaa09b1b271a76f69b5219faf539d7e2fefd39d53cb03c8d149f9418e416`
   Evidence: packages/app/src/context/global-sync/types.ts:16, future-hostile/dead-language term `todo` appears
120. `high` `vibe` `packages/app/src/context/sync.tsx:537`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:95a5f314f90190052ba9c1263889091f27178ad9175328f691e62d0277551eac`
   Evidence: packages/app/src/context/sync.tsx:537, future-hostile/dead-language term `todo` appears
121. `high` `boundary` `packages/app/src/pages/layout.tsx:1771`
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
122. `high` `boundary` `packages/app/src/pages/session.tsx:303`
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
123. `high` `boundary` `packages/app/src/pages/session.tsx:608`
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
124. `high` `boundary` `packages/app/src/pages/session.tsx:765`
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
125. `high` `vibe` `packages/app/src/pages/session/composer/session-composer-region.tsx:16`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:36701eb2819f9f16a33553383f1b8a071c0c693be9ed30df98a6bede8f4d7c0e`
   Evidence: packages/app/src/pages/session/composer/session-composer-region.tsx:16, future-hostile/dead-language term `todo` appears
126. `high` `vibe` `packages/app/src/pages/session/composer/session-todo-dock.tsx:1`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c69c7dbfc758d983e602219a310431b321e9b0299266ac1f2f08d0bcfccb8791`
   Evidence: packages/app/src/pages/session/composer/session-todo-dock.tsx:1, future-hostile/dead-language term `todo` appears
127. `high` `vibe` `packages/app/src/pages/session/composer/session-todo-dock.tsx:17`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:02321bcd90ada1b61cf7b27485e034a231b6e45bd02c1de936dbf36cc2f88cd2`
   Evidence: packages/app/src/pages/session/composer/session-todo-dock.tsx:17, future-hostile/dead-language term `todo` appears
128. `high` `vibe` `packages/app/src/pages/session/composer/session-todo-dock.tsx:44`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6e88ce2412f45f3d2a3d9cd324983d229f14ed0d84a7ae469d5437b9b2780e20`
   Evidence: packages/app/src/pages/session/composer/session-todo-dock.tsx:44, future-hostile/dead-language term `todo` appears
129. `high` `vibe` `packages/app/src/pages/session/composer/session-todo-dock.tsx:200`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5c636a8e9711c5164d6e0ab8e168803ceba58ff4d733c37861e3599b51c5905b`
   Evidence: packages/app/src/pages/session/composer/session-todo-dock.tsx:200, future-hostile/dead-language term `todo` appears
130. `high` `boundary` `packages/app/src/sst-env.d.ts:3`
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
131. `high` `boundary` `packages/app/sst-env.d.ts:3`
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
132. `high` `security` `packages/app/vite.config.ts:25`
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
133. `high` `security` `packages/app/vite.config.ts:26`
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
134. `medium` `context` `packages/console/app/src/asset/brand/opencode-brand-assets.zip:1`
   Rule: `HLT-040-REPO-ROT-BAD-BEHAVIOR`
   Check: `HLT-040-REPO-ROT-BAD-BEHAVIOR:context` `soft` confidence `0.88`
   Route: TLR `Context/setup`, lane `audit`, owner `tools`
   Docs: `docs/language-bad-behavior.md#web-security-and-repo-rot-detectors`
   Matched term: `repo-rot.archive.source-snapshot`
   Reason: checked-in snapshots bypass normal source control review and can preserve stale code or secrets
   Fix: remove the snapshot from active source or move it to a documented artifact/archive system with ownership and retention policy
   Rerun: `just score`
   Fingerprint: `sha256:f0d147bfd1fc421fbda79cd6148cb3782102b897d4a0ca2588c68279433ef2d1`
   Evidence: detector=repo-rot.archive.source-snapshot, path=packages/console/app/src/asset/brand/opencode-brand-assets.zip, line=1, proof_window=None
135. `high` `boundary` `packages/console/app/src/component/header.tsx:90`
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
136. `high` `boundary` `packages/console/app/src/i18n/de.ts:529`
   Rule: `HLT-019-STREAMING-RUNTIME-DRIFT`
   Check: `HLT-019-STREAMING-RUNTIME-DRIFT:boundary` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `db`, owner `tools`
   Docs: `docs/streaming.md`
   Reason: queue or streaming runtime client appears outside the declared adapter boundary
   Fix: move Kafka/Tansu/Iggy/Fluvio/NATS/Redis-stream clients behind `crates/adapters/queues` or document a brownfield exception with owner, expiry, and migration path
   Rerun: `just fast`
   Fingerprint: `sha256:c91eecbc733dc2980323454247dd9e06e39e8e37813d9ec96962fb8499f8d2a8`
   Evidence: streaming client marker `nats` appears outside `crates/adapters/queues`
137. `high` `boundary` `packages/console/app/src/routes/bench/[id].tsx:85`
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
138. `high` `boundary` `packages/console/app/src/routes/bench/index.tsx:19`
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
139. `high` `boundary` `packages/console/app/src/routes/black/index.tsx:19`
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
140. `high` `boundary` `packages/console/app/src/routes/black/subscribe/[plan].tsx:279`
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
141. `high` `boundary` `packages/console/app/src/routes/enterprise/index.tsx:27`
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
142. `high` `boundary` `packages/console/app/src/routes/enterprise/index.tsx:61`
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
143. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:88`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:aa406aecfbad9a712e9cfda8234e474cf5ebcdaea7374504f2b83c4c13eec12a`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx:88, future-hostile/dead-language term `dummy` appears
144. `high` `vibe` `packages/console/app/src/routes/workspace/[id]/billing/payment-section.tsx:35`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:45ff127aa1e1f452c9f1435d2e931af12973e304532d0e89e30b1de51cc7b729`
   Evidence: packages/console/app/src/routes/workspace/[id]/billing/payment-section.tsx:35, future-hostile/dead-language term `dummy` appears
145. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:301`
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
146. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:328`
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
147. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:469`
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
148. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:528`
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
149. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:554`
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
150. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:558`
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
151. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/anthropic.ts:609`
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
152. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/google.ts:50`
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
153. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts:50`
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
154. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts:344`
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
155. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:35`
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
156. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:69`
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
157. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:132`
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
158. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:208`
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
159. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:210`
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
160. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:214`
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
161. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:262`
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
162. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:271`
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
163. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:373`
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
164. `high` `boundary` `packages/console/app/src/routes/zen/util/provider/openai.ts:376`
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
165. `high` `boundary` `packages/console/app/sst-env.d.ts:3`
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
166. `high` `security` `packages/console/app/vite.config.ts:19`
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
167. `high` `data` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql:10`
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
168. `high` `data` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql:11`
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
169. `high` `boundary` `packages/console/core/script/lookup-user.ts:260`
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
170. `high` `boundary` `packages/console/core/src/user.ts:146`
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
171. `high` `boundary` `packages/console/core/sst-env.d.ts:3`
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
172. `high` `boundary` `packages/console/function/src/auth.ts:100`
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
173. `high` `test` `packages/core/test/effect/cross-spawn-spawner.test.ts:96`
   Rule: `HLT-008-FALSE-GREEN-RISK`
   Check: `HLT-008-FALSE-GREEN-RISK:test` `hard` confidence `0.88`
   Route: TLR `Verification`, lane `fast`, owner `tools`
   Docs: `docs/testing.md`
   Reason: test code contains disabled, focused, tautological, or snapshot-only proof
   Fix: replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Rerun: `just fast`
   Fingerprint: `sha256:b758fa39412b7b6e5b14d5e0148f1890b75c47f31314ff091274537564f595e4`
   Evidence: const handle = yield* js("process.exit(42)")
174. `medium` `context` `packages/desktop/scripts/copy-bundles.ts:1`
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
175. `medium` `context` `packages/desktop/scripts/copy-icons.ts:1`
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
176. `medium` `context` `packages/docs/favicon-v3.svg:1`
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
177. `high` `security` `packages/enterprise/vite.config.ts:30`
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
178. `high` `security` `packages/enterprise/vite.config.ts:31`
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
179. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:30`
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
180. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:40`
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
181. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:48`
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
182. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:70`
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
183. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:82`
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
184. `high` `data` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql:92`
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
185. `high` `data` `packages/opencode/migration/20260228203230_blue_harpoon/migration.sql:21`
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
186. `high` `data` `packages/opencode/migration/20260323234822_events/migration.sql:17`
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
187. `high` `data` `packages/opencode/migration/20260410174513_workspace-name/migration.sql:15`
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
188. `high` `data` `packages/opencode/migration/20260410174513_workspace-name/migration.sql:19`
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
189. `high` `data` `packages/opencode/migration/20260413175956_chief_energizer/migration.sql:11`
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
190. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:13`
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
191. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:16`
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
192. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:17`
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
193. `high` `data` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql:18`
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
194. `high` `data` `packages/opencode/migration/20260507054800_memory_os/migration.sql:21`
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
195. `high` `data` `packages/opencode/migration/20260507054800_memory_os/migration.sql:42`
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
196. `high` `vibe` `packages/opencode/script/httpapi-exercise.ts:1402`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:08501c897cbe81926ba6cfbe2d2d85ed3ea2969585ea59038ee5beaec8cdfd28`
   Evidence: packages/opencode/script/httpapi-exercise.ts:1402, future-hostile/dead-language term `deprecated` appears
197. `high` `vibe` `packages/opencode/script/httpapi-exercise.ts:1759`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d34da740b37ce677c25f2fb5e3f7cc6a6cd0aa197d9d8b8f2a7a4270f48ae633`
   Evidence: packages/opencode/script/httpapi-exercise.ts:1759, future-hostile/dead-language term `legacy` appears
198. `high` `vibe` `packages/opencode/src/acp/agent.ts:48`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b606ba87ced8633257bac458dea72a9c58a3176a010531c564a1ca3ac80c74fe`
   Evidence: packages/opencode/src/acp/agent.ts:48, future-hostile/dead-language term `todo` appears
199. `high` `vibe` `packages/opencode/src/acp/agent.ts:58`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1c11ccf6ebc39a4d70a57471fbe741f0a536814d97f3afb0f33bf6bc967696ae`
   Evidence: packages/opencode/src/acp/agent.ts:58, future-hostile/dead-language term `todo` appears
200. `high` `vibe` `packages/opencode/src/cli/cmd/github.ts:885`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:219f8eab3f0c7528f23a930a1398974bbe5c43d46608bd80466736268133ff36`
   Evidence: packages/opencode/src/cli/cmd/github.ts:885, future-hostile/dead-language term `todo` appears
201. `high` `vibe` `packages/opencode/src/cli/cmd/run.ts:28`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b2df407dafb43344c90f691e3821b797cbdb0a1fe56ce15ec4b731ad34186c8f`
   Evidence: packages/opencode/src/cli/cmd/run.ts:28, future-hostile/dead-language term `todo` appears
202. `high` `vibe` `packages/opencode/src/cli/cmd/tui/context/theme.tsx:299`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:32762b8076ecbf4b5be69728a8524a2349f1e1e85841108c4a0bce62e257b8ea`
   Evidence: packages/opencode/src/cli/cmd/tui/context/theme.tsx:299, future-hostile/dead-language term `fallback` appears
203. `high` `vibe` `packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:3`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5c5fd1d727fcf860fd66a059855bf3ee97dc5bce42d887fa5c762bbfc33908b5`
   Evidence: packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:3, future-hostile/dead-language term `todo` appears
204. `high` `vibe` `packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:21`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:08a618a40665cd6e3993ddca407c3bf93a70bb730e65601130288cdfdcc9c7b4`
   Evidence: packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx:21, future-hostile/dead-language term `todo` appears
205. `high` `vibe` `packages/opencode/src/cli/cmd/tui/plugin/internal.ts:6`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c16d750821ce785c6072f6c8cf2c70f501713efd6e77aaf531c8e1ee7cfa2592`
   Evidence: packages/opencode/src/cli/cmd/tui/plugin/internal.ts:6, future-hostile/dead-language term `todo` appears
206. `high` `vibe` `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:43`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:125dff6b3b427b08340d4860ab81dc3e3a04ed480772398f2a2b45d21985117e`
   Evidence: packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:43, future-hostile/dead-language term `todo` appears
207. `high` `vibe` `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:59`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9f557041588dbec7cb51ccaad1753143bbeef54600ee642e508032ae8529f3b3`
   Evidence: packages/opencode/src/cli/cmd/tui/routes/session/index.tsx:59, future-hostile/dead-language term `todo` appears
208. `high` `vibe` `packages/opencode/src/effect/app-runtime.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8ad7328702276b57ba9dbffaed0f0290cc4d0829b1f39bd7886934f975fb7f3a`
   Evidence: packages/opencode/src/effect/app-runtime.ts:25, future-hostile/dead-language term `todo` appears
209. `high` `vibe` `packages/opencode/src/effect/app-runtime.ts:81`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7ef8ead3e35c5cd31771b143ae751419238a57d667611e369853737c121df8d5`
   Evidence: packages/opencode/src/effect/app-runtime.ts:81, future-hostile/dead-language term `todo` appears
210. `high` `vibe` `packages/opencode/src/plugin/loader.ts:142`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `deprecated` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:212b4501042c94e2e2d138b8fefdef36058e22bf1235e0ac4cd50a514ae72e9f`
   Evidence: packages/opencode/src/plugin/loader.ts:142, future-hostile/dead-language term `deprecated` appears
211. `high` `vibe` `packages/opencode/src/plugin/shared.ts:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b1543bdd3a84677040c72c9fe6cde31148810fc3452a8a70af97d28301737516`
   Evidence: packages/opencode/src/plugin/shared.ts:9, future-hostile/dead-language term `old` appears
212. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:10`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:86b739ed907f4353789049df85b8e1ed0fde21940e4886cac14c55977d71631b`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:10, future-hostile/dead-language term `todo` appears
213. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:151`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d6b3a939caaed418b20cb2f48433cce9435136180e35be619b74510762e327df`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:151, future-hostile/dead-language term `todo` appears
214. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:162`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:91ac2643c428099711b6d9e112fc0cfe73db8aaf354955cda18cf279cda1c718`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/groups/session.ts:162, future-hostile/dead-language term `todo` appears
215. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:17`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:41327d824d8d5c0e812f05953e7dc33775fe0986fae088bab10a39621b9f95f1`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:17, future-hostile/dead-language term `todo` appears
216. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:53`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f458364227e0b7ece16e79767e73e3c7cb0b8d41edae253e647c3758cb05762e`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts:53, future-hostile/dead-language term `todo` appears
217. `medium` `context` `packages/opencode/src/server/routes/instance/httpapi/handlers/v2.ts:1`
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
218. `high` `vibe` `packages/opencode/src/server/routes/instance/httpapi/server.ts:37`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fa41d8f91b70ff6dfab5d84806c3c56f2aede95c96a48751e98c2f0e7b2d6037`
   Evidence: packages/opencode/src/server/routes/instance/httpapi/server.ts:37, future-hostile/dead-language term `todo` appears
219. `high` `vibe` `packages/opencode/src/server/routes/instance/index.ts:118`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:aa39dfc86a8c712fd85d37fdf8c5aa12cded151d6a2fedda90a5bc360b496a76`
   Evidence: packages/opencode/src/server/routes/instance/index.ts:118, future-hostile/dead-language term `todo` appears
220. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:15`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f84ba0e4dbb060f9bc461b94e0b7bdd5a19b2116890b4f52c6cef1381d89705d`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:15, future-hostile/dead-language term `todo` appears
221. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:195`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c45b495f6225efc5f038258d8246bcd72646c4ed4d264f7ebdbee6d4f715f7cc`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:195, future-hostile/dead-language term `todo` appears
222. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:198`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0d53a754243cc3791879a9af6b07d8ac48343a7a59bee2a588558b96679e7a83`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:198, future-hostile/dead-language term `todo` appears
223. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:214`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:75f4b8e4d9181478ef36af7cb3a3b572c160f92b727725650cbcb6514b858719`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:214, future-hostile/dead-language term `todo` appears
224. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:220`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:011d33b08bada02a11681e3afcef881e58af55b372657ca15d27584db3e6b252`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:220, future-hostile/dead-language term `todo` appears
225. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:223`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0bc1265bdbc0a0a1bf4f4783d69f6afbf659e55d2c5f1a48ac4afddde441d59c`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:223, future-hostile/dead-language term `todo` appears
226. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:224`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ce0bec1b7eb2a31f6b126c8f6f704f02acc52940595ef593c129b6cea3fa364a`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:224, future-hostile/dead-language term `todo` appears
227. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:227`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:7a853195dfd5118fdcca9628acd8c9cc8d74c3ad78fef3fe69c87e3f1f5d8aaf`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:227, future-hostile/dead-language term `todo` appears
228. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:230`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8c7e456c3809b799e63611e8cc5784c551b1ce2e3879be801f4e8a2169054f73`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:230, future-hostile/dead-language term `todo` appears
229. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:245`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b7bf2dd590424dd699adadd6afa3dcee5671b78dde7c28860c948e2c8310f317`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:245, future-hostile/dead-language term `todo` appears
230. `high` `vibe` `packages/opencode/src/server/routes/instance/session.ts:246`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:84dc90e332287f04119b7de75e4930a5f2fcb417d430791fa94ad44770e8de7e`
   Evidence: packages/opencode/src/server/routes/instance/session.ts:246, future-hostile/dead-language term `todo` appears
231. `high` `vibe` `packages/opencode/src/session/llm.ts:243`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `unused` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:91b4f942626f0adee1b2c60f038db1d0db713eadd08ebc752e2ed4c359fdcc2f`
   Evidence: packages/opencode/src/session/llm.ts:243, future-hostile/dead-language term `unused` appears
232. `medium` `context` `packages/opencode/src/session/message-v2.ts:1`
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
233. `high` `vibe` `packages/opencode/src/session/message.ts:872`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:44ff90d94da722fa22438a476bfd308135849067c9ee7e1d5ed4c88a6bd102a1`
   Evidence: packages/opencode/src/session/message.ts:872, future-hostile/dead-language term `old` appears
234. `high` `vibe` `packages/opencode/src/session/pending.ts:1`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:52e987c551e11a3e23687c4cddbfad97f9b6b4f1d7e277df3e571c7785331be7`
   Evidence: packages/opencode/src/session/pending.ts:1, future-hostile/dead-language term `todo` appears
235. `high` `vibe` `packages/opencode/src/session/pending.ts:2`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e11e5752fa1b7cb593b55666f92885ee9a53c93101b923a4efec41ece522b915`
   Evidence: packages/opencode/src/session/pending.ts:2, future-hostile/dead-language term `todo` appears
236. `high` `vibe` `packages/opencode/src/session/processor.ts:232`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:17e65972ab67df371c552b671fd151f7993ba0c33dd493bc93661f71514d3b6e`
   Evidence: packages/opencode/src/session/processor.ts:232, future-hostile/dead-language term `compat` appears
237. `high` `vibe` `packages/opencode/src/session/processor.ts:265`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0b763c721d01447105a3d4748ca7a94057476be1ea88ccc9c8925629d9a3321c`
   Evidence: packages/opencode/src/session/processor.ts:265, future-hostile/dead-language term `compat` appears
238. `high` `vibe` `packages/opencode/src/session/processor.ts:284`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c71ef3f72eea69bf6472709a47860978088dadbbe947275eed78a870bc30a5cb`
   Evidence: packages/opencode/src/session/processor.ts:284, future-hostile/dead-language term `compat` appears
239. `high` `vibe` `packages/opencode/src/session/processor.ts:313`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:93cf433d800efbb4d2ca9189b73da7033e486df40200c206568387316badc3a9`
   Evidence: packages/opencode/src/session/processor.ts:313, future-hostile/dead-language term `compat` appears
240. `high` `vibe` `packages/opencode/src/session/processor.ts:328`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:831964c11726d8a65cfb40104b77e9d559c277e8c857227309d88a121ad325b3`
   Evidence: packages/opencode/src/session/processor.ts:328, future-hostile/dead-language term `compat` appears
241. `high` `vibe` `packages/opencode/src/session/processor.ts:396`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ea188444f340a267a5a2cfad8da48e24db8dba80084ab8ac84d9f31f3ec73bd6`
   Evidence: packages/opencode/src/session/processor.ts:396, future-hostile/dead-language term `compat` appears
242. `high` `vibe` `packages/opencode/src/session/processor.ts:427`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:60884dc7dcea1e36df0ee56655d2969a45ba1db3a2e0f9e7113dae0623f11f9a`
   Evidence: packages/opencode/src/session/processor.ts:427, future-hostile/dead-language term `compat` appears
243. `high` `vibe` `packages/opencode/src/session/processor.ts:473`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4a4ca183be850ef07f6eee5d3057d343a7359b6dc3a4cb269054a3d49018df40`
   Evidence: packages/opencode/src/session/processor.ts:473, future-hostile/dead-language term `compat` appears
244. `high` `vibe` `packages/opencode/src/session/processor.ts:496`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4ebfe31f0f80b690e03a7662479d84ba110e600917161d2d8fc0f0b492fb1f1e`
   Evidence: packages/opencode/src/session/processor.ts:496, future-hostile/dead-language term `compat` appears
245. `high` `vibe` `packages/opencode/src/session/processor.ts:526`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bfb1c3f720d067eee47bd12a1412bfb765b1e97ee7d5d3a88956d36db0241840`
   Evidence: packages/opencode/src/session/processor.ts:526, future-hostile/dead-language term `compat` appears
246. `high` `vibe` `packages/opencode/src/session/processor.ts:581`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ca6085d57bdbb81ef64ddf0df05802539741a197a004ceb71cd079943825f5f7`
   Evidence: packages/opencode/src/session/processor.ts:581, future-hostile/dead-language term `compat` appears
247. `high` `vibe` `packages/opencode/src/session/processor.ts:626`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:09133366567a0cd6d2973efe6fa6cfeae7767219a330850f577c51ff4999e423`
   Evidence: packages/opencode/src/session/processor.ts:626, future-hostile/dead-language term `compat` appears
248. `high` `vibe` `packages/opencode/src/session/processor.ts:720`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:77a82ff3d1bdf8097444b92073a9ef364d6407b8a3aadf23f454b75a8bd55227`
   Evidence: packages/opencode/src/session/processor.ts:720, future-hostile/dead-language term `compat` appears
249. `high` `vibe` `packages/opencode/src/session/processor.ts:771`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `compat` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b0e3a7fce1a0f481c738704fd05114fefbd6722f61c25bec9acd060f35528134`
   Evidence: packages/opencode/src/session/processor.ts:771, future-hostile/dead-language term `compat` appears
250. `high` `vibe` `packages/opencode/src/session/prompt.ts:1351`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9a4e6131c537cd91c573f785cd585f77297fbb3b1faf21558590650b6cbd7b5d`
   Evidence: packages/opencode/src/session/prompt.ts:1351, future-hostile/dead-language term `temporary` appears
251. `high` `vibe` `packages/opencode/src/session/prompt.ts:1362`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temporary` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:30a6c306800550ba03900dd86d37e64852945a9b7bdb8ff4d51ba818350237f7`
   Evidence: packages/opencode/src/session/prompt.ts:1362, future-hostile/dead-language term `temporary` appears
252. `high` `vibe` `packages/opencode/src/session/session.ts:155`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:de83cfefcd00202538d824490148aac0ce593e286db9eb61d62e04ee06c18bf7`
   Evidence: packages/opencode/src/session/session.ts:155, future-hostile/dead-language term `legacy` appears
253. `high` `vibe` `packages/opencode/src/session/todo.ts:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c5b25b71802aa4cd89f65596b01d4d67b7f5a857e1b8c215867300955e29d235`
   Evidence: packages/opencode/src/session/todo.ts:20, future-hostile/dead-language term `todo` appears
254. `high` `vibe` `packages/opencode/src/session/todo.ts:46`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0ed582ec645ca2a105608a8483231c333da13865162ff7d8a8cf2491f9e59fc3`
   Evidence: packages/opencode/src/session/todo.ts:46, future-hostile/dead-language term `todo` appears
255. `high` `vibe` `packages/opencode/src/session/todo.ts:67`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:06e4bfffa4411bad6a7c5565bac943807e6f1d34abee1e32be411bfbd1e63d18`
   Evidence: packages/opencode/src/session/todo.ts:67, future-hostile/dead-language term `todo` appears
256. `high` `vibe` `packages/opencode/src/session/todo.ts:86`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9da39dbd78f5a649b65a161c8cc39cc87ded481938a41431ebcf7276fbda5991`
   Evidence: packages/opencode/src/session/todo.ts:86, future-hostile/dead-language term `todo` appears
257. `high` `vibe` `packages/opencode/src/tool/registry.ts:10`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3d33e9e259ae525fb4910dacc463d67f2785f3624c798572c1c93a25ad07280c`
   Evidence: packages/opencode/src/tool/registry.ts:10, future-hostile/dead-language term `todo` appears
258. `high` `vibe` `packages/opencode/src/tool/registry.ts:42`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d1042d08f1fb00023f44022d75d4c6e4fceaadd7077d23b31cf62b5c6af34c6e`
   Evidence: packages/opencode/src/tool/registry.ts:42, future-hostile/dead-language term `todo` appears
259. `high` `vibe` `packages/opencode/src/tool/registry.ts:320`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:cdb93438e41ae4680d7ceea15ced34933eb39aa87227bb9985385733adebd644`
   Evidence: packages/opencode/src/tool/registry.ts:320, future-hostile/dead-language term `todo` appears
260. `high` `vibe` `packages/opencode/src/tool/todo.ts:4`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:83d0dae4a2c61e026073741d0028d610dbad04df9cc3071caf4554bfc8cffb30`
   Evidence: packages/opencode/src/tool/todo.ts:4, future-hostile/dead-language term `todo` appears
261. `high` `vibe` `packages/opencode/src/tool/todo.ts:6`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f636d593d22d15c9927ae3b0712bb3d243b78f1bb6af762b1db6e7229a158d04`
   Evidence: packages/opencode/src/tool/todo.ts:6, future-hostile/dead-language term `todo` appears
262. `high` `vibe` `packages/opencode/src/tool/todo.ts:22`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:524068d61d7d6c1e627fe290c74c5442d361c5c557902821f2c46a46b1ee8c89`
   Evidence: packages/opencode/src/tool/todo.ts:22, future-hostile/dead-language term `todo` appears
263. `high` `vibe` `packages/opencode/src/tool/todo.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:eedf99f1a8195c15c1d294b222b6bd89cbe4274f1b618d598adcf4c215f6e059`
   Evidence: packages/opencode/src/tool/todo.ts:25, future-hostile/dead-language term `todo` appears
264. `high` `vibe` `packages/opencode/src/tool/todo.ts:28`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:56d8c2f002c6c60cc94f02e14a0364ae258b12361c190165e3bc8e332fd2275d`
   Evidence: packages/opencode/src/tool/todo.ts:28, future-hostile/dead-language term `todo` appears
265. `high` `vibe` `packages/opencode/test/config/config.part-07.test.ts:343`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:9083151d923f178e440d6088e9c45beb022b6fdfd22035b4c3775cde98a90dc6`
   Evidence: packages/opencode/test/config/config.part-07.test.ts:343, future-hostile/dead-language term `legacy` appears
266. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c8435c98d7c503ecc065f19fa9c9f48c6a212df522eeabdf41f3bbb704d9c849`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:25, future-hostile/dead-language term `dummy` appears
267. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:26`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:171020305b466bb61e217df21abb12ed65aa213dac6f5cc284e3173e940faa79`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:26, future-hostile/dead-language term `dummy` appears
268. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:30`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3cda88310d9312f10fa14025429b26933699184a9525308efe44bf7f377b5940`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:30, future-hostile/dead-language term `dummy` appears
269. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:32`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1e30c26912c8716c1e25af7960fe18ad1fbffb5bd883f99717922287c49f8c56`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:32, future-hostile/dead-language term `dummy` appears
270. `high` `vibe` `packages/opencode/test/effect/app-runtime-logger.test.ts:38`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `dummy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:66921e2b5ee7f7ebc4a9c2e119b2b7b5873007338bf5b3cda15fff4ffaa9f598`
   Evidence: packages/opencode/test/effect/app-runtime-logger.test.ts:38, future-hostile/dead-language term `dummy` appears
271. `high` `vibe` `packages/opencode/test/lsp/lifecycle.test.ts:171`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `unused` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c0a460747444cf30e387cfdad30767dbf1dcfb3458c3a17b2266931048026c1b`
   Evidence: packages/opencode/test/lsp/lifecycle.test.ts:171, future-hostile/dead-language term `unused` appears
272. `high` `vibe` `packages/opencode/test/lsp/lifecycle.test.ts:174`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `unused` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4abc0b4a003db00efef9e60da067af9e343ad1c0f81119e78dd58a991ebfc071`
   Evidence: packages/opencode/test/lsp/lifecycle.test.ts:174, future-hostile/dead-language term `unused` appears
273. `high` `vibe` `packages/opencode/test/memory/abort-leak.test.ts:54`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:8588a13e7e7795d4fa5fdb360f50642abe6151aaa3f9753d13850d90e0c9d91f`
   Evidence: packages/opencode/test/memory/abort-leak.test.ts:54, future-hostile/dead-language term `old` appears
274. `high` `vibe` `packages/opencode/test/memory/abort-leak.test.ts:70`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:fc3ebcd66ac907f8bbbaed12717f6e4c47df63aa7da8b9e5d485020d6878c34c`
   Evidence: packages/opencode/test/memory/abort-leak.test.ts:70, future-hostile/dead-language term `old` appears
275. `high` `vibe` `packages/opencode/test/memory/abort-leak.test.ts:85`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0bf3992d3a365ebbaf8b2476289480ad390c4b7a9d3b543ca687d5cb585d9dd7`
   Evidence: packages/opencode/test/memory/abort-leak.test.ts:85, future-hostile/dead-language term `old` appears
276. `high` `vibe` `packages/opencode/test/patch/patch.test.ts:69`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2912438f48f5afe1d315a3257d37f6210e3b49e739d411be9148fee1563324b2`
   Evidence: packages/opencode/test/patch/patch.test.ts:69, future-hostile/dead-language term `old` appears
277. `high` `vibe` `packages/opencode/test/preload.ts:80`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `temp` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6ddb1d7d9b3bc20a07ce419adf8a1e4b6aa5308c49625a21ef03b8f446d60a28`
   Evidence: packages/opencode/test/preload.ts:80, future-hostile/dead-language term `temp` appears
278. `high` `vibe` `packages/opencode/test/project/migrate-global.test.ts:122`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:950de7bcefa2f10ca4d7e06cfdebdcc017addb59bd6a4232373cc323e75fdc82`
   Evidence: packages/opencode/test/project/migrate-global.test.ts:122, future-hostile/dead-language term `legacy` appears
279. `medium` `proof` `packages/opencode/test/provider/copilot/copilot-chat-model.test.ts:55`
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
280. `high` `vibe` `packages/opencode/test/provider/models.test.ts:224`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:97612d35b560dcb212a9e85229f70102c50ac8d137bd80c1fc7140a1a6f4ceee`
   Evidence: packages/opencode/test/provider/models.test.ts:224, future-hostile/dead-language term `stale` appears
281. `high` `vibe` `packages/opencode/test/provider/provider.part-07.test.ts:231`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fallback` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:c8e6cfc64e848d828ca54fc20b0b2744e3e27c3eeee01a6e6a54529a441eb723`
   Evidence: packages/opencode/test/provider/provider.part-07.test.ts:231, future-hostile/dead-language term `fallback` appears
282. `high` `vibe` `packages/opencode/test/server/httpapi-event.test.ts:16`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2d608621fb76d03bdd00d4cbba6d0a5b748e49e58e73188b8891a0899ebf895a`
   Evidence: packages/opencode/test/server/httpapi-event.test.ts:16, future-hostile/dead-language term `legacy` appears
283. `high` `vibe` `packages/opencode/test/server/httpapi-json-parity.test.ts:27`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:1547d67f1f3dc08e1e5c85406dee74c8b73a3280be16237509c3a56efca2199a`
   Evidence: packages/opencode/test/server/httpapi-json-parity.test.ts:27, future-hostile/dead-language term `legacy` appears
284. `high` `vibe` `packages/opencode/test/server/httpapi-mcp.test.ts:24`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3c8cb8a62c0e80e52c471efa68c1f210e7de0b7a4080307d28a22799f6ef2805`
   Evidence: packages/opencode/test/server/httpapi-mcp.test.ts:24, future-hostile/dead-language term `legacy` appears
285. `high` `vibe` `packages/opencode/test/server/httpapi-parity.test.ts:25`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:4f2078cb115c94aa080a6455abe2f0f91e70a34e2f3521c4b7d94f7f0129a179`
   Evidence: packages/opencode/test/server/httpapi-parity.test.ts:25, future-hostile/dead-language term `legacy` appears
286. `high` `vibe` `packages/opencode/test/server/httpapi-parity.test.ts:93`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `fixme` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b7a2beffa4f41a514e345e01b6eb026e23918e047a827cd312ed5b7d8f5f22ea`
   Evidence: packages/opencode/test/server/httpapi-parity.test.ts:93, future-hostile/dead-language term `fixme` appears
287. `high` `vibe` `packages/opencode/test/server/httpapi-provider.test.ts:24`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:66d789d13ffe46914f86ded0b0b16d5d51850d819fe3f250f730a52f0308aebd`
   Evidence: packages/opencode/test/server/httpapi-provider.test.ts:24, future-hostile/dead-language term `legacy` appears
288. `high` `vibe` `packages/opencode/test/server/httpapi-pty.test.ts:55`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:add5e8159aa05efeb69fb01337499c474ed8278a76661acfd2d0137a0cc10b46`
   Evidence: packages/opencode/test/server/httpapi-pty.test.ts:55, future-hostile/dead-language term `legacy` appears
289. `high` `vibe` `packages/opencode/test/server/httpapi-sdk.test.ts:41`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b360d539d356c742b33acb755a0cf62c94b700da25e3b6d97a40040b199519b9`
   Evidence: packages/opencode/test/server/httpapi-sdk.test.ts:41, future-hostile/dead-language term `legacy` appears
290. `high` `vibe` `packages/opencode/test/server/httpapi-session.test.ts:36`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:43aa0f4b6b211e80e86b6b75b425453e2a29e3d28a7339c9b48829182d8ed915`
   Evidence: packages/opencode/test/server/httpapi-session.test.ts:36, future-hostile/dead-language term `legacy` appears
291. `high` `vibe` `packages/opencode/test/server/httpapi-sync.test.ts:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a15cfc10c77e1cc69d0cc2d3251edd2ddd8f75eaf9a274e4d765879489b3077b`
   Evidence: packages/opencode/test/server/httpapi-sync.test.ts:20, future-hostile/dead-language term `legacy` appears
292. `high` `vibe` `packages/opencode/test/server/httpapi-tui.test.ts:22`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `legacy` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:6c4420b70418b5f227f984f9faca68f4cdd7e9733eaa3678aa957fe6636b7154`
   Evidence: packages/opencode/test/server/httpapi-tui.test.ts:22, future-hostile/dead-language term `legacy` appears
293. `high` `vibe` `packages/opencode/test/session/llm.test.ts:1293`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stub` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0bf4a26648a2558de52c8e7d12d6c9f773dc0e3bd5151f3d6533af17bfd7fb32`
   Evidence: packages/opencode/test/session/llm.test.ts:1293, future-hostile/dead-language term `stub` appears
294. `high` `vibe` `packages/opencode/test/session/llm.test.ts:1300`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stub` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dc65439d2eef1df93fc6ba169a77fe4ccc55a53e6daaba71d30a2029934af735`
   Evidence: packages/opencode/test/session/llm.test.ts:1300, future-hostile/dead-language term `stub` appears
295. `high` `vibe` `packages/opencode/test/session/message-v2.test.ts:589`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `old` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:03c5d1645466c1876e00ab1bc40b7c95fc39d5a9ef2567de8140489a553d0e1c`
   Evidence: packages/opencode/test/session/message-v2.test.ts:589, future-hostile/dead-language term `old` appears
296. `high` `vibe` `packages/opencode/test/session/prompt.test.ts:20`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:395a492f328df3c3af3c5920cc7d77548654d765cd917f3f29b91122afa62689`
   Evidence: packages/opencode/test/session/prompt.test.ts:20, future-hostile/dead-language term `todo` appears
297. `high` `vibe` `packages/opencode/test/session/prompt.test.ts:179`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:32fbdbc1dbb5c0175aaf219e3b5a303f9a72ca521e3507411cbde1ba8d185f0b`
   Evidence: packages/opencode/test/session/prompt.test.ts:179, future-hostile/dead-language term `todo` appears
298. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:af6df614ebc843aac6acf6ad5aa76a6d932661cb5abf30fa7197dfeb0c5d23e0`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:9, future-hostile/dead-language term `todo` appears
299. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:245`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:29ca5401aabdf013a9eeb6308995e95f3796171a885df359b276bea1ab26b5ef`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:245, future-hostile/dead-language term `todo` appears
300. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:246`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:36de5ccf599f7d9ca273241f7cc344f06d6fb2ab6091b65a3a28f38c14699525`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:246, future-hostile/dead-language term `todo` appears
301. `high` `vibe` `packages/opencode/test/session/schema-decoding.test.ts:251`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e52c2dfc0d429985d1cb4c73fcd49ab7e26f57cf1cc0503f5e23914613bd7498`
   Evidence: packages/opencode/test/session/schema-decoding.test.ts:251, future-hostile/dead-language term `todo` appears
302. `high` `vibe` `packages/opencode/test/session/snapshot-tool-race.test.ts:47`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b71a8a03a522c1dd71298ca735083a7e9819bc86fdebbe26f94d789413d9acc9`
   Evidence: packages/opencode/test/session/snapshot-tool-race.test.ts:47, future-hostile/dead-language term `todo` appears
303. `high` `vibe` `packages/opencode/test/session/snapshot-tool-race.test.ts:129`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f1de2ee99f55f4da6a18cfba6a633ad8eeb3349af32c25bb224a3f66cd805e96`
   Evidence: packages/opencode/test/session/snapshot-tool-race.test.ts:129, future-hostile/dead-language term `todo` appears
304. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:140`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:5c919fc235533016a6e25a5c3f92c8d437bcbc0d9cc6829645c13be0fa423446`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:140, future-hostile/dead-language term `stale` appears
305. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:320`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:ab0139d13ff9a29d4a61902735325581402578fb1edb7f60b94f27c7bd7c57ac`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:320, future-hostile/dead-language term `stale` appears
306. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:357`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:2e2b75b7490343568982be3db3302fae850fe6bc3f0fcfe0433c41a88656906d`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:357, future-hostile/dead-language term `stale` appears
307. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:358`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3e83907c46bc5434a26f27ac0abeccb5c0364c71d72018bf71dfa689384a35e7`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:358, future-hostile/dead-language term `stale` appears
308. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:409`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:dd041de4213318b09b851439bca17aec44d72014cd23174bc2134a652b5ced35`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:409, future-hostile/dead-language term `stale` appears
309. `high` `vibe` `packages/opencode/test/storage/json-migration.test.ts:438`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `stale` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b6098e71f8c3f2033b2692dcc84c487a83588df7f0a9a1a2a74c27b39c0cbcb7`
   Evidence: packages/opencode/test/storage/json-migration.test.ts:438, future-hostile/dead-language term `stale` appears
310. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:24`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:76073a8dd9fcd60befe60a4644331c4b22915fe558d5e6036c4581bafc34721b`
   Evidence: packages/opencode/test/tool/parameters.test.ts:24, future-hostile/dead-language term `todo` appears
311. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:49`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:0c25fb3c39e1c14d74b7e9da93c11101500eec78eb3651fd8b6f05a7831d8747`
   Evidence: packages/opencode/test/tool/parameters.test.ts:49, future-hostile/dead-language term `todo` appears
312. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:213`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:27aa5c088dfbb9eccb853e55bc7767f6ba934788ce22679a47bf5b79fa019b80`
   Evidence: packages/opencode/test/tool/parameters.test.ts:213, future-hostile/dead-language term `todo` appears
313. `high` `vibe` `packages/opencode/test/tool/parameters.test.ts:219`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:3add71aeedf367eff1075c989ecbcb51e121a791221b421d5cd7f00bcae49417`
   Evidence: packages/opencode/test/tool/parameters.test.ts:219, future-hostile/dead-language term `todo` appears
314. `high` `vibe` `packages/opencode/test/tool/registry.test.ts:13`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:79f7079cab9fab7ae2ce66122d1955b6a799a7bca7e0df903a3f1deb9a28546b`
   Evidence: packages/opencode/test/tool/registry.test.ts:13, future-hostile/dead-language term `todo` appears
315. `high` `vibe` `packages/opencode/test/tool/registry.test.ts:37`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a5cf27a098fc05113cde4870186cecd6f494c54ff42a63e6a31736a96d68afb2`
   Evidence: packages/opencode/test/tool/registry.test.ts:37, future-hostile/dead-language term `todo` appears
316. `high` `vibe` `packages/plugin/src/tui.ts:8`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e165294ebd150c3bd91e093666189472a2d918c92d38d49eca5592c33731eda9`
   Evidence: packages/plugin/src/tui.ts:8, future-hostile/dead-language term `todo` appears
317. `high` `vibe` `packages/plugin/src/tui.ts:313`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:f8132c2e97e20835563aeb7d1288d7aa88e77593e6735e8b544885f941eb6adb`
   Evidence: packages/plugin/src/tui.ts:313, future-hostile/dead-language term `todo` appears
318. `high` `generated` `packages/sdk/js/src/gen/client/client.gen.ts:1`
   Rule: `HLT-002-GENERATED-MUTATION`
   Check: `HLT-002-GENERATED-MUTATION:generated` `hard` confidence `0.95`
   Route: TLR `Contracts/data`, lane `contract`, owner `tools`
   Docs: `agent/JANKURAI_STANDARD.md#generated-zones`
   Reason: generated zone is not protected strongly enough against hand edits
   Fix: add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Rerun: `just fast`
   Fingerprint: `sha256:14ea5b3fddebb2958fcd0d3eb2c97d6432765cb2685c62b1a32b3ac9194ed40d`
   Evidence: generated file contains TODO/stub markers
319. `high` `vibe` `packages/ui/src/components/file-icons/types.ts:76`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b93a17bd2f9be4be044827eed9de3cacad2d1ee02ea318bd6f9d21b341b63754`
   Evidence: packages/ui/src/components/file-icons/types.ts:76, future-hostile/dead-language term `todo` appears
320. `high` `vibe` `packages/ui/src/components/file-icons/types.ts:391`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `hack` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:e6f962d76265c07b131777638a8da641209ae5c16cd784a15e950817ada7e009`
   Evidence: packages/ui/src/components/file-icons/types.ts:391, future-hostile/dead-language term `hack` appears
321. `high` `vibe` `packages/ui/src/components/message-part.tsx:29`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:17077cba5ca5bddce9a346b7e78f41693b463fc60eb4fbb79611a2b2a8dcc147`
   Evidence: packages/ui/src/components/message-part.tsx:29, future-hostile/dead-language term `todo` appears
322. `high` `vibe` `packages/ui/src/components/message-part.tsx:2193`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:daf8e4ac1d345d201290cd3f1619f66249347481d9db474994e920a66ff31420`
   Evidence: packages/ui/src/components/message-part.tsx:2193, future-hostile/dead-language term `todo` appears
323. `high` `vibe` `packages/ui/src/components/message-part.tsx:2209`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:34e96dbbe42c7b5dfc3a5b0366fe8778ca8b468942740b932c9ccd86af38ac47`
   Evidence: packages/ui/src/components/message-part.tsx:2209, future-hostile/dead-language term `todo` appears
324. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:4`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:84c8a8690de0229ff6c6259f2e455146b1c0591e6705e537155ea76a3dd0624d`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:4, future-hostile/dead-language term `todo` appears
325. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:9`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:de87294e1f55c90d5d5a068cefa74d7aa5f089b1151f2b259237140e3a44651d`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:9, future-hostile/dead-language term `todo` appears
326. `high` `vibe` `packages/ui/src/components/todo-panel-motion.stories.tsx:176`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:b07ced2ae02090d81a019532e2f6082400daaf0d75f064d724910117a45a6e5a`
   Evidence: packages/ui/src/components/todo-panel-motion.stories.tsx:176, future-hostile/dead-language term `todo` appears
327. `high` `vibe` `packages/web/src/components/share/part.tsx:305`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:85017161242b162196036627bfc06488d806b66815795c865f1b0104fe9974a7`
   Evidence: packages/web/src/components/share/part.tsx:305, future-hostile/dead-language term `todo` appears
328. `high` `vibe` `packages/web/src/components/share/part.tsx:391`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:a7e2c8cd936ae3ba87076a6decf78354c9255b1b430ba627e7d7f7d9a5c65d41`
   Evidence: packages/web/src/components/share/part.tsx:391, future-hostile/dead-language term `todo` appears
329. `high` `vibe` `packages/web/src/components/share/part.tsx:397`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:d6a91c59e09c7a44d260bcc09f68e8a242730b190cc5f7c7e65d773ecdc91b85`
   Evidence: packages/web/src/components/share/part.tsx:397, future-hostile/dead-language term `todo` appears
330. `high` `vibe` `packages/web/src/components/share/part.tsx:399`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:bd5f7744e9c66cfd64625179b1b58f1dd069ee29ff9c7b2a95f21070b4d07578`
   Evidence: packages/web/src/components/share/part.tsx:399, future-hostile/dead-language term `todo` appears
331. `high` `vibe` `packages/web/src/components/share/part.tsx:400`
   Rule: `HLT-001-DEAD-MARKER`
   Check: `HLT-001-DEAD-MARKER:vibe` `hard` confidence `0.88`
   Route: TLR `Entropy`, lane `fast`, owner `tools`
   Docs: `docs/audit-rubric.md#future-hostile-language-rule`
   Reason: future-hostile/dead-language term `todo` appears in product/runtime code
   Fix: remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Rerun: `just fast`
   Fingerprint: `sha256:161d76c5a26ca3f08601dd9dfb1f4bf8e07c6205712f0131b966aeb6428918fe`
   Evidence: packages/web/src/components/share/part.tsx:400, future-hostile/dead-language term `todo` appears

## Policy

- Policy file: `./agent/audit-policy.toml`
- Minimum score: `85`
- Fail on: `critical, high`

## Agent Fix Queue

1. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `.opencode/plugins/tui-smoke.tsx` - use argv arrays, prepared statements, or a safe allowlisted command path
   Route: `Contracts/data`/`fast`
2. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `github/index.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
3. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/dialog-edit-project.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
4. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/dialog-select-directory.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
5. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/components/terminal.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
6. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/context/global-sync.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
7. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/context/global-sync/event-reducer.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
8. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/pages/layout.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
9. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/pages/session.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
10. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/src/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
11. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/app/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
12. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/component/header.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
13. `high` `HLT-019-STREAMING-RUNTIME-DRIFT` `packages/console/app/src/i18n/de.ts` - move Kafka/Tansu/Iggy/Fluvio/NATS/Redis-stream clients behind `crates/adapters/queues` or document a brownfield exception with owner, expiry, and migration path
   Route: `Contracts/data`/`db`
14. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/bench/[id].tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
15. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/bench/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
16. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/black/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
17. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/black/subscribe/[plan].tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
18. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/enterprise/index.tsx` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
19. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/anthropic.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
20. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/google.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
21. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/openai-compatible.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
22. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/src/routes/zen/util/provider/openai.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
23. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/app/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
24. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/console/core/migrations/20260109000245_huge_omega_red/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
25. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/script/lookup-user.ts` - validate the value first, then narrow it with a proof-aware decoder
   Route: `Contracts/data`/`fast`
26. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/src/user.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
27. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/core/sst-env.d.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
28. `high` `HLT-031-TYPESCRIPT-BAD-BEHAVIOR` `packages/console/function/src/auth.ts` - remove the broad suppression or scope it to a single justified line
   Route: `Contracts/data`/`fast`
29. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260127222353_familiar_lady_ursula/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
30. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260228203230_blue_harpoon/migration.sql` - add a WHERE clause or prove the full-table rewrite with a local migration receipt
   Route: `Contracts/data`/`db`
31. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260323234822_events/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
32. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260410174513_workspace-name/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
33. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260413175956_chief_energizer/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
34. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260427172553_slow_nightmare/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
35. `high` `HLT-030-SQL-BAD-BEHAVIOR` `packages/opencode/migration/20260507054800_memory_os/migration.sql` - split the change into a reviewed migration with rollback, backup, and row-count evidence
   Route: `Contracts/data`/`db`
36. `high` `HLT-002-GENERATED-MUTATION` `packages/sdk/js/src/gen/client/client.gen.ts` - add `agent/generated-zones.toml`, require generated/do-not-edit markers, and route repairs to the source contract
   Route: `Contracts/data`/`contract`
37. `high` `HLT-004-UNMAPPED-PROOF` `agent/test-map.json` - add the narrowest stable prefix and runnable proof command to `agent/test-map.json`
   Route: `Verification`/`fast`
38. `high` `HLT-008-FALSE-GREEN-RISK` `crates/` - add `proptest` or equivalent invariant tests plus `tests/` integration coverage routed through `cargo nextest` or `cargo test`
   Route: `Verification`/`fast`
39. `high` `HLT-025-RELEASE-READINESS-GAP` `docs/testing.md` - add launch-gate evidence for security, backups, monitoring, rollback, and abuse controls
   Route: `Verification`/`release`
40. `high` `HLT-008-FALSE-GREEN-RISK` `packages/core/test/effect/cross-spawn-spawner.test.ts` - replace false-green tests with behavior assertions, red/green evidence, and mutation or fault checks for changed behavior
   Route: `Verification`/`fast`
41. `medium` `HLT-018-PERF-CONCURRENCY-DRIFT` `Justfile` - add fast deterministic build/test targets, caches, and narrow proof lanes for agent iteration
   Route: `Verification`/`fast`
42. `medium` `HLT-004-UNMAPPED-PROOF` `agent/test-map.json` - route each owned path to a deterministic proof command and make the lane executable in CI
   Route: `Verification`/`fast`
43. `medium` `HLT-026-COST-BUDGET-GAP` `docs/testing.md` - add explicit budgets, quotas, stop conditions, and kill-switch evidence for paid or unbounded operations
   Route: `Verification`/`release`
44. `high` `HLT-017-OPAQUE-OBSERVABILITY` `crates/domain` - define a typed exception surface with purpose, reason, common fixes, docs_url, and repair_hint so the next rerun is local
   Route: `Repair`/`observability`
45. `medium` `HLT-017-OPAQUE-OBSERVABILITY` `docs/testing.md` - add structured errors, telemetry, and repair receipts that tell the next agent where to rerun proof
   Route: `Repair`/`observability`
46. `medium` `HLT-027-HUMAN-REVIEW-EVIDENCE-GAP` `packages/opencode/test/provider/copilot/copilot-chat-model.test.ts` - attach raw CI logs, review receipts, and replayable commands instead of accepting claims or summaries
   Route: `Repair`/`audit`
47. `high` `HLT-003-OWNERLESS-PATH` `agent/owner-map.json` - add the narrowest stable prefix for this path to `agent/owner-map.json`
   Route: `Context/setup`/`fast`
48. `high` `packages/app/public/oc-theme-preload.js` - move product runtime behavior to Rust core, TypeScript web, SQL migrations, or generated contracts; Python needs a dated advanced-ML/data exception
   Route: `Context/setup`/`audit`
49. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/console/app/src/asset/brand/opencode-brand-assets.zip` - remove the snapshot from active source or move it to a documented artifact/archive system with ownership and retention policy
   Route: `Context/setup`/`audit`
50. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/desktop/scripts/copy-bundles.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
51. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/desktop/scripts/copy-icons.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
52. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/docs/favicon-v3.svg` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
53. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/opencode/src/server/routes/instance/httpapi/handlers/v2.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
54. `medium` `HLT-040-REPO-ROT-BAD-BEHAVIOR` `packages/opencode/src/session/message-v2.ts` - delete the stale copy, move history to VCS/archive tooling, or document owner, proof lane, expiry, and migration plan
   Route: `Context/setup`/`audit`
55. `critical` `HLT-010-SECRET-SPRAWL` `infra/console.ts` - remove and rotate the credential, add local and CI secret scanning, and scan transcripts/artifacts/MCP config for related exposure
   Route: `Security, secrets, agency`/`security`
56. `high` `HLT-009-GENERATED-SECURITY` `.github/workflows` - add a dedicated security lane with secret scanning, dependency review, and workflow linting
   Route: `Security, secrets, agency`/`security`
57. `high` `HLT-016-SUPPLY-CHAIN-DRIFT` `.github/workflows` - add secret scanning, dependency review, and SBOM or provenance checks to CI
   Route: `Security, secrets, agency`/`security`
58. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/beta.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
59. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/containers.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
60. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/containers.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
61. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/containers.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
62. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/deploy.yml` - add top-level `permissions: contents: read` and job-specific write scopes only where needed
   Route: `Security, secrets, agency`/`security`
63. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/deploy.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
64. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/deploy.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
65. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/docs-locale-sync.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
66. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/docs-locale-sync.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
67. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/docs-update.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
68. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/docs-update.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
69. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/docs-update.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
70. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/docs-update.yml` - pin the action to a commit SHA or stable release tag
   Route: `Security, secrets, agency`/`security`
71. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/duplicate-issues.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
72. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/duplicate-issues.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
73. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/duplicate-issues.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
74. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/duplicate-issues.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
75. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/generate.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
76. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/generate.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
77. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/generate.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
78. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/jankurai.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
79. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/jankurai.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
80. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/jankurai.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
81. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/jankurai.yml` - upload the SARIF artifact with github/codeql-action/upload-sarif pinned to a full SHA
   Route: `Security, secrets, agency`/`security`
82. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/nix-eval.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
83. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/nix-hashes.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
84. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/nix-hashes.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
85. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/notify-discord.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
86. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/notify-discord.yml` - add top-level `permissions: contents: read` and job-specific write scopes only where needed
   Route: `Security, secrets, agency`/`security`
87. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/notify-discord.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
88. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/notify-discord.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
89. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/opencode.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
90. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/opencode.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
91. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/opencode.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
92. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/opencode.yml` - pin the action to a commit SHA or stable release tag
   Route: `Security, secrets, agency`/`security`
93. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-management.yml` - add workflow-level concurrency with cancel-in-progress
   Route: `Security, secrets, agency`/`security`
94. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-management.yml` - set an explicit timeout-minutes on each job
   Route: `Security, secrets, agency`/`security`
95. `high` `HLT-034-CI-BAD-BEHAVIOR` `.github/workflows/pr-management.yml` - pin every external action to a 40-character commit SHA
   Route: `Security, secrets, agency`/`security`
96. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/pr-management.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
97. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/review.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
98. `high` `HLT-032-DOCKER-BAD-BEHAVIOR` `.github/workflows/triage.yml` - pin the download, verify a checksum or signature, and avoid shell piping
   Route: `Security, secrets, agency`/`security`
99. `high` `HLT-001-DEAD-MARKER` `.opencode/plugins/tui-smoke.tsx` - replace placeholders with implemented behavior, typed unsupported-state errors, or a tracked exception record with docs
   Route: `Entropy`/`fast`
100. `high` `HLT-023-INPUT-BOUNDARY-GAP` `.opencode/plugins/tui-smoke.tsx` - replace unsafe sinks with typed schemas, parameterized APIs, allowlists, or sandboxed execution plus negative tests
   Route: `Security, secrets, agency`/`security`
101. `high` `HLT-013-RENDERED-UX-GAP` `apps/web` - add Storybook state coverage, Playwright screenshots, visual review or `@jankurai/ux-qa`, accessibility scans, CLS checks, generated mocks, and design tokens
   Route: `Verification and rendered UX`/`web`
102. `high` `HLT-001-DEAD-MARKER` `github/index.ts` - collapse fallback chains into explicit typed states with bounded retry policy, telemetry, and documented repair guidance
   Route: `Entropy`/`fast`
103. `high` `infra/console.ts` - extract the duplicated behavior behind one named boundary and add focused tests before changing behavior
   Route: `Entropy`/`fast`
104. `high` `HLT-001-DEAD-MARKER` `jnoccio-fusion/src/state.rs` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
105. `high` `HLT-001-DEAD-MARKER` `jnoccio-fusion/web/src/main.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
106. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
107. `high` `HLT-001-DEAD-MARKER` `packages/app/src/components/prompt-input/placeholder.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
108. `high` `HLT-001-DEAD-MARKER` `packages/app/src/context/global-sync.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
109. `high` `HLT-001-DEAD-MARKER` `packages/app/src/context/global-sync/event-reducer.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
110. `high` `HLT-001-DEAD-MARKER` `packages/app/src/context/global-sync/session-cache.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
111. `high` `HLT-001-DEAD-MARKER` `packages/app/src/context/global-sync/types.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
112. `high` `HLT-001-DEAD-MARKER` `packages/app/src/context/sync.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
113. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/composer/session-composer-region.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
114. `high` `HLT-001-DEAD-MARKER` `packages/app/src/pages/session/composer/session-todo-dock.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
115. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/app/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
116. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/billing-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
117. `high` `HLT-001-DEAD-MARKER` `packages/console/app/src/routes/workspace/[id]/billing/payment-section.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
118. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/console/app/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
119. `high` `HLT-039-WEB-SECURITY-BAD-BEHAVIOR` `packages/enterprise/vite.config.ts` - bind Vite to localhost, use explicit allowedHosts and origins, and keep server.fs.strict enabled
   Route: `Security, secrets, agency`/`security`
120. `high` `HLT-001-DEAD-MARKER` `packages/opencode/script/httpapi-exercise.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
121. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/acp/agent.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
122. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/github.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
123. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/run.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
124. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/context/theme.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
125. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/feature-plugins/sidebar/todo.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
126. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/plugin/internal.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
127. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/cli/cmd/tui/routes/session/index.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
128. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/effect/app-runtime.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
129. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/plugin/loader.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
130. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/plugin/shared.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
131. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/httpapi/groups/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
132. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/httpapi/handlers/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
133. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/httpapi/server.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
134. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/index.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
135. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/server/routes/instance/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
136. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/llm.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
137. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/message.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
138. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/pending.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
139. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/processor.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
140. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/prompt.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
141. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/session.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
142. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/session/todo.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
143. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/tool/registry.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
144. `high` `HLT-001-DEAD-MARKER` `packages/opencode/src/tool/todo.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
145. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/config/config.part-07.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
146. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/effect/app-runtime-logger.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
147. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/lsp/lifecycle.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
148. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/memory/abort-leak.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
149. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/patch/patch.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
150. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/preload.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
151. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/project/migrate-global.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
152. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/provider/models.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
153. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/provider/provider.part-07.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
154. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-event.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
155. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-json-parity.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
156. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-mcp.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
157. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-parity.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
158. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-provider.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
159. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-pty.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
160. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-sdk.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
161. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-session.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
162. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-sync.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
163. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/server/httpapi-tui.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
164. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/session/llm.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
165. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/session/message-v2.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
166. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/session/prompt.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
167. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/session/schema-decoding.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
168. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/session/snapshot-tool-race.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
169. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/storage/json-migration.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
170. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/tool/parameters.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
171. `high` `HLT-001-DEAD-MARKER` `packages/opencode/test/tool/registry.test.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
172. `high` `HLT-001-DEAD-MARKER` `packages/plugin/src/tui.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
173. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/file-icons/types.ts` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
174. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/message-part.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
175. `high` `HLT-001-DEAD-MARKER` `packages/ui/src/components/todo-panel-motion.stories.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
176. `high` `HLT-001-DEAD-MARKER` `packages/web/src/components/share/part.tsx` - remove or rename the marker, implement the intended behavior, model a typed unsupported state, or move docs/generated/vendor/product-copy text into an allowlisted context
   Route: `Entropy`/`fast`
177. `medium` `HLT-001-DEAD-MARKER` `.` - split large or ambiguous authored code into smaller semantic modules with focused tests
   Route: `Entropy`/`fast`
178. `medium` `HLT-016-SUPPLY-CHAIN-DRIFT` `.github/workflows/jankurai.yml` - wire secret, dependency, provenance, and workflow scans into an operational CI lane
   Route: `Security, secrets, agency`/`security`
