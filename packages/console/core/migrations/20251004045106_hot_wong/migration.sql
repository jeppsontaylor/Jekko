-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped columns from `__backup_20251004045106_hot_wong_key` and revert type changes manually.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `key`) AS `pre_rows_key`;
CREATE TABLE `__backup_20251004045106_hot_wong_key` AS SELECT * FROM `key`;
ALTER TABLE `key` MODIFY COLUMN `user_id` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `key` DROP COLUMN `actor`;--> statement-breakpoint
ALTER TABLE `key` DROP COLUMN `old_name`;
SELECT (SELECT COUNT(*) FROM `key`) AS `post_rows_key`;
SELECT (SELECT COUNT(*) FROM `__backup_20251004045106_hot_wong_key`) AS `backup_rows_key`;
DROP TABLE `__backup_20251004045106_hot_wong_key`;
