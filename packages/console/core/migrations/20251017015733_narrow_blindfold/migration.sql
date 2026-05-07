-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped index/column from backups in `__backup_20251017015733_narrow_blindfold_account`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `account`) AS `pre_rows_account`;
CREATE TABLE `__backup_20251017015733_narrow_blindfold_account` AS SELECT * FROM `account`;
ALTER TABLE `account` DROP INDEX `email`;--> statement-breakpoint
CREATE INDEX `account_id` ON `auth` (`account_id`);--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `email`;
SELECT (SELECT COUNT(*) FROM `account`) AS `post_rows_account`;
SELECT (SELECT COUNT(*) FROM `__backup_20251017015733_narrow_blindfold_account`) AS `backup_rows_account`;
DROP TABLE `__backup_20251017015733_narrow_blindfold_account`;
