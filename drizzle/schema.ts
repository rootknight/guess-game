import { sqliteTable, AnySQLiteColumn, uniqueIndex, foreignKey, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	type: text("type"),
	title: text("title"),
	description: text("description").notNull(),
	userId: text("userId").notNull().references(() => users.id),
	createdAt: integer("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer("updatedAt").default(sql`(CURRENT_TIMESTAMP)`),
	version: integer("version").default(1),
	isDeleted: integer("isDeleted").default(false),
},
(table) => {
	return {
		typeUnique: uniqueIndex("categories_type_unique").on(table.type),
	}
});

export const rooms = sqliteTable("rooms", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => users.id),
	categoryId: integer("categoryId").notNull().references(() => categories.id),
	time: integer("time").notNull(),
	startAt: integer("startAt").default(sql`(CURRENT_TIMESTAMP)`),
	endAt: integer("endAt"),
	isEnd: integer("isEnd"),
	createdAt: integer("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer("updatedAt").default(sql`(CURRENT_TIMESTAMP)`),
	version: integer("version").default(1),
	isDeleted: integer("isDeleted").default(false),
});

export const users = sqliteTable("users", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	role: text("role").notNull(),
	createdAt: integer("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer("updatedAt").default(sql`(CURRENT_TIMESTAMP)`),
	version: integer("version").default(1),
	isDeleted: integer("isDeleted").default(false),
},
(table) => {
	return {
		emailUnique: uniqueIndex("users_email_unique").on(table.email),
	}
});

export const words = sqliteTable("words", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	categoryId: integer("categoryId").references(() => categories.id),
	word: text("word").notNull(),
	createdAt: integer("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: integer("updatedAt").default(sql`(CURRENT_TIMESTAMP)`),
	version: integer("version").default(1),
	isDeleted: integer("isDeleted").default(false),
},
(table) => {
	return {
		wordCategoryIdUnique: uniqueIndex("words_word_categoryId_unique").on(table.word, table.categoryId),
	}
});