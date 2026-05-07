-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped `interval` from `__backup_20260420185813_supreme_roxanne_simpson_model_tpm_limit`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `model_tpm_limit`) AS `pre_rows_model_tpm_limit`;
CREATE TABLE `__backup_20260420185813_supreme_roxanne_simpson_model_tpm_limit` AS SELECT * FROM `model_tpm_limit`;
ALTER TABLE `model_tpm_limit` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `model_tpm_limit` ADD PRIMARY KEY (`id`);--> statement-breakpoint
ALTER TABLE `model_tpm_limit` DROP COLUMN `interval`;
SELECT (SELECT COUNT(*) FROM `model_tpm_limit`) AS `post_rows_model_tpm_limit`;
SELECT (SELECT COUNT(*) FROM `__backup_20260420185813_supreme_roxanne_simpson_model_tpm_limit`) AS `backup_rows_model_tpm_limit`;
DROP TABLE `__backup_20260420185813_supreme_roxanne_simpson_model_tpm_limit`;
