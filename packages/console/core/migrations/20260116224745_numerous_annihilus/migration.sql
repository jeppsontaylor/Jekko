-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore dropped `subscription_coupon_id` from `__backup_20260116224745_numerous_annihilus_billing`.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `billing`) AS `pre_rows_billing`;
CREATE TABLE `__backup_20260116224745_numerous_annihilus_billing` AS SELECT * FROM `billing`;
ALTER TABLE `billing` DROP COLUMN `subscription_coupon_id`;
SELECT (SELECT COUNT(*) FROM `billing`) AS `post_rows_billing`;
SELECT (SELECT COUNT(*) FROM `__backup_20260116224745_numerous_annihilus_billing`) AS `backup_rows_billing`;
DROP TABLE `__backup_20260116224745_numerous_annihilus_billing`;
