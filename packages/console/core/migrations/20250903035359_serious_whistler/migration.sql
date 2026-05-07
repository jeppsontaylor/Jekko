-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore from `__backup_20250903035359_serious_whistler_key` and re-add dropped columns.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `key`) AS `pre_rows_key`;
CREATE TABLE `__backup_20250903035359_serious_whistler_key` AS SELECT * FROM `key`;
ALTER TABLE `key` ADD `actor` json;--> statement-breakpoint
ALTER TABLE `key` DROP COLUMN `user_id`;
SELECT (SELECT COUNT(*) FROM `key`) AS `post_rows_key`;
SELECT (SELECT COUNT(*) FROM `__backup_20250903035359_serious_whistler_key`) AS `backup_rows_key`;
DROP TABLE `__backup_20250903035359_serious_whistler_key`;
