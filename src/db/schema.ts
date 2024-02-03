import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

// 生成不重复的6位大写字母数字作为roomId
function generateUniqueId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueId = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}

// 定义schema
export const Users = sqliteTable("users", {
  userId: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  createdAt: integer("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  version: integer("version").default(1),
  isDeleted: integer("isDeleted", { mode: "boolean" }).default(false),
});

export const Categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").unique(),
  title: text("title"),
  description: text("description").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => Users.userId),
  createdAt: integer("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  version: integer("version").default(1),
  isDeleted: integer("isDeleted", { mode: "boolean" }).default(false),
});

export const Words = sqliteTable(
  "words",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    categoryId: integer("categoryId").references(() => Categories.id),
    word: text("word").notNull(),
    createdAt: integer("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt").default(sql`CURRENT_TIMESTAMP`),
    version: integer("version").default(1),
    isDeleted: integer("isDeleted", { mode: "boolean" }).default(false),
  },
  (t) => ({
    unq: unique().on(t.word, t.categoryId),
  })
);

export const Rooms = sqliteTable("rooms", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUniqueId()),
  userId: text("userId")
    .notNull()
    .references(() => Users.userId),
  categoryId: integer("categoryId")
    .notNull()
    .references(() => Categories.id),
  time: integer("time").notNull(),
  startAt: integer("startAt").default(sql`CURRENT_TIMESTAMP`),
  endAt: integer("endAt"),
  isEnd: integer("isEnd", { mode: "boolean" }),
  createdAt: integer("createdAt").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  version: integer("version").default(1),
  isDeleted: integer("isDeleted", { mode: "boolean" }).default(false),
});
