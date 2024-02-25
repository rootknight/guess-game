import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";
import dotenv from "dotenv";

//更改env文件路径执行不同的migrate
const envPath = ".env.local";
dotenv.config({ path: envPath });

const { TURSO_DB_URL, TURSO_AUTH_TOKEN } = process.env;

const client = createClient({
  url: TURSO_DB_URL!,
  authToken: TURSO_AUTH_TOKEN!,
});

const db = drizzle(client);

migrate(db, {
  migrationsFolder: "drizzle",
});
