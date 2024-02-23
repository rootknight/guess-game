import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const betterSqlite = Database(process.env.DB_URL);
const db = drizzle(betterSqlite);

migrate(db, {
  migrationsFolder: "drizzle",
});

betterSqlite.close();
