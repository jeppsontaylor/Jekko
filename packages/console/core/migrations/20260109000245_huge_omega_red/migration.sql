-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped `user` fields from `__backup_20260109000245_huge_omega_red_user`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `subscription`) AS `pre_rows_subscription`;
SELECT (SELECT COUNT(*) FROM `user`) AS `pre_rows_user`;
CREATE TABLE `__backup_20260109000245_huge_omega_red_user` AS SELECT * FROM `user`;
CREATE INDEX `workspace_user_id` ON `subscription` (`workspace_id`,`user_id`);--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `time_subscribed`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `sub_interval_usage`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `sub_monthly_usage`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `sub_time_interval_usage_updated`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `sub_time_monthly_usage_updated`;
SELECT (SELECT COUNT(*) FROM `subscription`) AS `post_rows_subscription`;
SELECT (SELECT COUNT(*) FROM `user`) AS `post_rows_user`;
SELECT (SELECT COUNT(*) FROM `__backup_20260109000245_huge_omega_red_user`) AS `backup_rows_user`;
DROP TABLE `__backup_20260109000245_huge_omega_red_user`;
