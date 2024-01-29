// drizzle.config.ts
import type { Config } from "drizzle-kit";
import "dotenv";

export default {
  schema: "./app/admin/db/schema.ts",
  out: "./app/admin/db/drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
} satisfies Config;
