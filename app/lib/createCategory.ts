"use server";

import { db } from "@/app/db/index";
import { Categories } from "@/app/db/schema";
import { SqliteError } from "better-sqlite3";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

const insertSchema = createInsertSchema(Categories, {
  title: z
    .string()
    .min(2, { message: "至少包含两个字符" })
    .max(20, { message: "最多包含20个字符" }),
  type: z
    .string()
    .regex(/^[a-zA-Z]+$/, { message: "只能包含字母" })
    .min(2, { message: "至少包含两个字符" })
    .max(20, { message: "最多包含20个字符" }),
  description: z
    .string()
    .min(2, { message: "至少包含两个字符" })
    .max(30, { message: "最多包含30个字符" }),
  userId: z.string(),
});

//创建分类
export async function createCategory(prevState: any, formData: FormData) {
  //使用Zod验证FormData
  const parse = insertSchema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    userId: formData.get("userId"),
  });
  //准备插入的数据
  if (!parse.success) {
    return {
      code: 400,
      msg: "数据验证失败",
      err: parse.error.format(),
    };
  }
  const { title, type, description, userId } = parse.data;

  try {
    console.log("Inserting category data...");
    await db.insert(Categories).values({
      title,
      type,
      description,
      userId,
    });
    return {
      code: 200,
      msg: "创建成功",
    };
  } catch (error: SqliteError | any) {
    console.log(error.message);
    if (error.message === "UNIQUE constraint failed: categories.type") {
      return {
        code: 400,
        msg: "分类已存在",
        err: error.message,
      };
    }
  }
}
