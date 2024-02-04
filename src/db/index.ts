import { drizzle } from "drizzle-orm/better-sqlite3";

import Database from "better-sqlite3";
import * as schema from "./schema";
import "dotenv";

const sqlite = Database(process.env.DB_URL);

const db = drizzle(sqlite, { schema });

export default db;
