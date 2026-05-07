-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped `data_share` from `__backup_20250921042124_cloudy_revanche_workspace`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `workspace`) AS `pre_rows_workspace`;
CREATE TABLE `__backup_20250921042124_cloudy_revanche_workspace` AS SELECT * FROM `workspace`;
ALTER TABLE `workspace` DROP COLUMN `data_share`;
SELECT (SELECT COUNT(*) FROM `workspace`) AS `post_rows_workspace`;
SELECT (SELECT COUNT(*) FROM `__backup_20250921042124_cloudy_revanche_workspace`) AS `backup_rows_workspace`;
DROP TABLE `__backup_20250921042124_cloudy_revanche_workspace`;
