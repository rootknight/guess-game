// drizzle.config.ts
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const DB_URL = process.env.DB_URL;

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: DB_URL!,
  },
  verbose: true,
} satisfies Config;
