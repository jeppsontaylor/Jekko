-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: recreate dropped index `name` from `__backup_20251004030300_numerous_prodigy_key` as needed.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `key`) AS `pre_rows_key`;
CREATE TABLE `__backup_20251004030300_numerous_prodigy_key` AS SELECT * FROM `key`;
ALTER TABLE `key` DROP INDEX `name`;
SELECT (SELECT COUNT(*) FROM `key`) AS `post_rows_key`;
SELECT (SELECT COUNT(*) FROM `__backup_20251004030300_numerous_prodigy_key`) AS `backup_rows_key`;
DROP TABLE `__backup_20251004030300_numerous_prodigy_key`;
