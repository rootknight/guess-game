// drizzle.config.ts
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { TURSO_DB_URL, TURSO_AUTH_TOKEN } = process.env;

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: TURSO_DB_URL!,
    authToken: TURSO_AUTH_TOKEN!,
  },
  verbose: true,
} satisfies Config;
