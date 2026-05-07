-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped columns from `__backup_20251003202205_early_black_crow_user`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `user`) AS `pre_rows_user`;
CREATE TABLE `__backup_20251003202205_early_black_crow_user` AS SELECT * FROM `user`;
ALTER TABLE `user` DROP COLUMN `old_account_id`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `old_email`;
SELECT (SELECT COUNT(*) FROM `user`) AS `post_rows_user`;
SELECT (SELECT COUNT(*) FROM `__backup_20251003202205_early_black_crow_user`) AS `backup_rows_user`;
DROP TABLE `__backup_20251003202205_early_black_crow_user`;
