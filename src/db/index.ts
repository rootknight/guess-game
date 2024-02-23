import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import "dotenv";

const betterSqlite = Database(process.env.DB_URL);

const db = drizzle(betterSqlite, { schema });

export default db;
