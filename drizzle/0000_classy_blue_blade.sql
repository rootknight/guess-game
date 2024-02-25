CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text,
	`title` text,
	`icon` text,
	`description` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` integer DEFAULT (datetime('now', 'localtime')),
	`updatedAt` integer DEFAULT (datetime('now', 'localtime')),
	`version` integer DEFAULT 1,
	`isEnable` integer DEFAULT true,
	`isDeleted` integer DEFAULT false,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`categoryId` integer NOT NULL,
	`time` integer NOT NULL,
	`startAt` integer DEFAULT (datetime('now', 'localtime')),
	`endAt` integer,
	`isEnd` integer,
	`createdAt` integer DEFAULT (datetime('now', 'localtime')),
	`updatedAt` integer DEFAULT (datetime('now', 'localtime')),
	`version` integer DEFAULT 1,
	`isDeleted` integer DEFAULT false,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text NOT NULL,
	`createdAt` integer DEFAULT (datetime('now', 'localtime')),
	`updatedAt` integer DEFAULT (datetime('now', 'localtime')),
	`version` integer DEFAULT 1,
	`isDeleted` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `words` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`categoryId` integer,
	`word` text NOT NULL,
	`createdAt` integer DEFAULT (datetime('now', 'localtime')),
	`updatedAt` integer DEFAULT (datetime('now', 'localtime')),
	`version` integer DEFAULT 1,
	`isDeleted` integer DEFAULT false,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_type_unique` ON `categories` (`type`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `words_word_categoryId_unique` ON `words` (`word`,`categoryId`);