// drizzle.config.ts
import type { Config } from "drizzle-kit";
import "dotenv";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
} satisfies Config;
