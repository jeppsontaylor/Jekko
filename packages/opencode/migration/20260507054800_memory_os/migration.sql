CREATE TABLE `memory_evidence` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` text NOT NULL,
	`tier` text NOT NULL,
	`subject` text NOT NULL,
	`predicate` text NOT NULL,
	`object` text NOT NULL,
	`snippet` text NOT NULL,
	`search_text` text NOT NULL,
	`payload_json` text NOT NULL,
	`owner` text,
	`session_id` text,
	`evidence_hash` text,
	`time_created` integer NOT NULL,
	`time_updated` integer NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `memory_evidence_project_tier_idx` ON `memory_evidence`(`project_id`, `tier`, `time_updated` DESC);
--> statement-breakpoint
CREATE INDEX `memory_evidence_search_idx` ON `memory_evidence`(`project_id`, `search_text`);
--> statement-breakpoint
CREATE INDEX `memory_evidence_subject_idx` ON `memory_evidence`(`project_id`, `subject`, `time_updated` DESC);
--> statement-breakpoint
CREATE TABLE `failed_attempt` (
	`project_id` text NOT NULL,
	`signature` text NOT NULL,
	`failure_kind` text NOT NULL,
	`owner` text NOT NULL DEFAULT '',
	`attempted_fix_hash` text NOT NULL,
	`evidence_hash` text NOT NULL,
	`session_id` text,
	`seen_count` integer NOT NULL DEFAULT 1,
	`time_created` integer NOT NULL,
	`time_updated` integer NOT NULL,
	PRIMARY KEY(`project_id`, `signature`, `failure_kind`, `owner`, `attempted_fix_hash`, `evidence_hash`),
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `failed_attempt_sig_idx` ON `failed_attempt`(`project_id`, `signature`, `failure_kind`, `time_updated` DESC);
