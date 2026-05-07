-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped `time_joined` from `__backup_20250929181457_supreme_jack_power_user`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `user`) AS `pre_rows_user`;
CREATE TABLE `__backup_20250929181457_supreme_jack_power_user` AS SELECT * FROM `user`;
ALTER TABLE `user` DROP COLUMN `time_joined`;
SELECT (SELECT COUNT(*) FROM `user`) AS `post_rows_user`;
SELECT (SELECT COUNT(*) FROM `__backup_20250929181457_supreme_jack_power_user`) AS `backup_rows_user`;
DROP TABLE `__backup_20250929181457_supreme_jack_power_user`;
