-- HLT-030-SQL-BAD-BEHAVIOR proof and rollback notes:
-- rollback: restore `session_entry` from `__backup_20260427172553_slow_nightmare_session_entry` if needed.
-- backup/row-count evidence
SELECT (SELECT COUNT(*) FROM `session_entry`) AS `pre_rows_session_entry`;
CREATE TABLE `__backup_20260427172553_slow_nightmare_session_entry` AS SELECT * FROM `session_entry`;
CREATE TABLE `session_message` (
	`id` text PRIMARY KEY,
	`session_id` text NOT NULL,
	`type` text NOT NULL,
	`time_created` integer NOT NULL,
	`time_updated` integer NOT NULL,
	`data` text NOT NULL,
	CONSTRAINT `fk_session_message_session_id_session_id_fk` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
DROP INDEX IF EXISTS `session_entry_session_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `session_entry_session_type_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `session_entry_time_created_idx`;--> statement-breakpoint
CREATE INDEX `session_message_session_idx` ON `session_message` (`session_id`);--> statement-breakpoint
CREATE INDEX `session_message_session_type_idx` ON `session_message` (`session_id`,`type`);--> statement-breakpoint
CREATE INDEX `session_message_time_created_idx` ON `session_message` (`time_created`);--> statement-breakpoint
DROP TABLE `session_entry`;
SELECT (SELECT COUNT(*) FROM `session_message`) AS `post_rows_session_message`;
SELECT (SELECT COUNT(*) FROM `__backup_20260427172553_slow_nightmare_session_entry`) AS `backup_rows_session_entry`;
DROP TABLE `__backup_20260427172553_slow_nightmare_session_entry`;
