# jankurai scaffold Justfile

fast:
	jankurai doctor --fail-on critical

score:
	jankurai audit . --mode advisory --json agent/repo-score.json --md agent/repo-score.md --score-history agent/score-history.jsonl --score-history-csv agent/score-history.csv

doctor:
	jankurai doctor --fail-on high

security:
	jankurai security run . --out target/jankurai/security/evidence.json

check: fast score security
