-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped column `cache_write_tokens` from `__backup_20250912161749_familiar_nightshade_usage`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `usage`) AS `pre_rows_usage`;
CREATE TABLE `__backup_20250912161749_familiar_nightshade_usage` AS SELECT * FROM `usage`;
ALTER TABLE `usage` DROP COLUMN `cache_write_tokens`;
SELECT (SELECT COUNT(*) FROM `usage`) AS `post_rows_usage`;
SELECT (SELECT COUNT(*) FROM `__backup_20250912161749_familiar_nightshade_usage`) AS `backup_rows_usage`;
DROP TABLE `__backup_20250912161749_familiar_nightshade_usage`;
