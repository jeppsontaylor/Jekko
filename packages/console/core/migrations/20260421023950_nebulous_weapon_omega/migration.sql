-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore `model_tpm_limit`/`model_tpm_rate_limit` from backups in this scope.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `model_tpm_limit`) AS `pre_rows_model_tpm_limit`;
SELECT (SELECT COUNT(*) FROM `model_tpm_rate_limit`) AS `pre_rows_model_tpm_rate_limit`;
CREATE TABLE `__backup_20260421023950_nebulous_weapon_omega_model_tpm_limit` AS SELECT * FROM `model_tpm_limit`;
CREATE TABLE `__backup_20260421023950_nebulous_weapon_omega_model_tpm_rate_limit` AS SELECT * FROM `model_tpm_rate_limit`;
DROP TABLE `model_tpm_limit`;--> statement-breakpoint
ALTER TABLE `model_tpm_rate_limit` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `model_tpm_rate_limit` ADD PRIMARY KEY (`id`,`interval`);
SELECT (SELECT COUNT(*) FROM `model_tpm_rate_limit`) AS `post_rows_model_tpm_rate_limit`;
SELECT (SELECT COUNT(*) FROM `__backup_20260421023950_nebulous_weapon_omega_model_tpm_limit`) AS `backup_rows_model_tpm_limit`;
SELECT (SELECT COUNT(*) FROM `__backup_20260421023950_nebulous_weapon_omega_model_tpm_rate_limit`) AS `backup_rows_model_tpm_rate_limit`;
DROP TABLE `__backup_20260421023950_nebulous_weapon_omega_model_tpm_limit`;
DROP TABLE `__backup_20260421023950_nebulous_weapon_omega_model_tpm_rate_limit`;
