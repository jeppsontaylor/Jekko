-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: recreate dropped unique/index state from `__backup_20260109001625_mean_frank_castle_subscription`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `subscription`) AS `pre_rows_subscription`;
CREATE TABLE `__backup_20260109001625_mean_frank_castle_subscription` AS SELECT * FROM `subscription`;
DROP INDEX `workspace_user_id` ON `subscription`;--> statement-breakpoint
ALTER TABLE `subscription` ADD CONSTRAINT `workspace_user_id` UNIQUE(`workspace_id`,`user_id`);
SELECT (SELECT COUNT(*) FROM `subscription`) AS `post_rows_subscription`;
SELECT (SELECT COUNT(*) FROM `__backup_20260109001625_mean_frank_castle_subscription`) AS `backup_rows_subscription`;
DROP TABLE `__backup_20260109001625_mean_frank_castle_subscription`;
