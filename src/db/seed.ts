import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import bcrypt from "bcryptjs";
import { users, categories, words, rooms } from "./seed.json";
import { Users, Categories, Words, Rooms } from "./schema";
import dotenv from "dotenv";

//更改env文件路径执行不同的seed
const envPath = ".env.local";
dotenv.config({ path: envPath });

const { TURSO_DB_URL, TURSO_AUTH_TOKEN } = process.env;

const client = createClient({
  url: TURSO_DB_URL!,
  authToken: TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

const seedDev = async () => {
  // const sqlite = Database("./database/guess-game-dev.sqlite");
  // const db = drizzle(sqlite, { schema });
  console.log("Seed start");
  // 插入 users 数据
  for (const user of users) {
    const { userId, name, email, password, role } = user;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db
      .insert(Users)
      .values({ userId, name, email, password: hashedPassword, role });
  }

  // 插入 categories 数据
  for (const category of categories) {
    const { type, title, icon, description, userId } = category;
    await db
      .insert(Categories)
      .values({ type, title, icon, description, userId });
  }

  // 插入 wrods 数据
  for (const item of words) {
    const { categoryId, word } = item;
    await db.insert(Words).values({ categoryId, word });
  }

  // 插入 rooms 数据
  for (const item of rooms) {
    const { userId, categoryId, time, startAt, endAt, isEnd } = item;
    await db
      .insert(Rooms)
      .values({ userId, categoryId, time, startAt, endAt, isEnd });
  }

  console.log("Seed done");
};

const seedProd = async () => {
  // const sqlite = Database("./database/guess-game-prod.sqlite");
  // const db = drizzle(sqlite, { schema });
  console.log("Seed start");
  // 插入 users 数据
  for (const user of users) {
    const { userId, name, email, password, role } = user;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await db
      .insert(Users)
      .values({ userId, name, email, password: hashedPassword, role });
  }

  console.log("Seed done");
};

// 执行
if (envPath === ".env.local") {
  seedDev();
} else if (envPath === ".env.prod") {
  seedProd();
}
