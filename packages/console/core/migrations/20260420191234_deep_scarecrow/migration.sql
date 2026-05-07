-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore `model_rate_limit` from `__backup_20260420191234_deep_scarecrow_model_rate_limit`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `model_rate_limit`) AS `pre_rows_model_rate_limit`;
CREATE TABLE `__backup_20260420191234_deep_scarecrow_model_rate_limit` AS SELECT * FROM `model_rate_limit`;
DROP TABLE `model_rate_limit`;
SELECT (SELECT COUNT(*) FROM `__backup_20260420191234_deep_scarecrow_model_rate_limit`) AS `backup_rows_model_rate_limit`;
DROP TABLE `__backup_20260420191234_deep_scarecrow_model_rate_limit`;
