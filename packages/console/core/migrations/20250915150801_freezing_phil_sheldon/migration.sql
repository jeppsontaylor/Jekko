-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore `payment.error` from backup and reintroduce columns from scratch.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `billing`) AS `pre_rows_billing`;
SELECT (SELECT COUNT(*) FROM `payment`) AS `pre_rows_payment`;
CREATE TABLE `__backup_20250915150801_freezing_phil_sheldon_billing` AS SELECT * FROM `billing`;
CREATE TABLE `__backup_20250915150801_freezing_phil_sheldon_payment` AS SELECT * FROM `payment`;
ALTER TABLE `billing` ADD `last_error` varchar(255);--> statement-breakpoint
ALTER TABLE `billing` ADD `time_last_error` timestamp(3);--> statement-breakpoint
ALTER TABLE `payment` DROP COLUMN `error`;
SELECT (SELECT COUNT(*) FROM `billing`) AS `post_rows_billing`;
SELECT (SELECT COUNT(*) FROM `payment`) AS `post_rows_payment`;
SELECT (SELECT COUNT(*) FROM `__backup_20250915150801_freezing_phil_sheldon_billing`) AS `backup_rows_billing`;
SELECT (SELECT COUNT(*) FROM `__backup_20250915150801_freezing_phil_sheldon_payment`) AS `backup_rows_payment`;
DROP TABLE `__backup_20250915150801_freezing_phil_sheldon_billing`;
DROP TABLE `__backup_20250915150801_freezing_phil_sheldon_payment`;
