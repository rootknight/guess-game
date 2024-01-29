import { db, schema } from "@/app/admin/db/index";
import { users, categories, words, rooms } from "@/app/admin/db/seed.json";

const seed = async () => {
  console.log("Seed start");
  // 插入 users 数据
  for (const user of users) {
    const { userId, name, email, password, role } = user;
    if (role === "admin" || role === "player") {
      await db
        .insert(schema.Users)
        .values({ userId, name, email, password, role });
    } else {
      console.error(`Invalid role: ${role}`);
    }
  }

  // 插入 categories 数据
  for (const category of categories) {
    const { type, title, description, userId } = category;
    await db
      .insert(schema.Categories)
      .values({ type, title, description, userId });
  }

  // 插入 wrods 数据
  for (const item of words) {
    const { categoryId, word } = item;
    await db.insert(schema.Words).values({ categoryId, word });
  }

  // 插入 rooms 数据
  for (const item of rooms) {
    const { userId, categoryId, time, startAt, endAt, isEnd } = item;
    await db
      .insert(schema.Rooms)
      .values({ userId, categoryId, time, startAt, endAt, isEnd });
  }

  console.log("Seed done");
};

seed();
