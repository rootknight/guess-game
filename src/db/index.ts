import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import "dotenv";

const { TURSO_DB_URL, TURSO_AUTH_TOKEN } = process.env;

const client = createClient({
  url: TURSO_DB_URL!,
  authToken: TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

export default db;
