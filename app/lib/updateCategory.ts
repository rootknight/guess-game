"use server";

import { db } from "@/app/db/index";
import { Categories } from "@/app/db/schema";
import { SqliteError } from "better-sqlite3";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

const updateSchema = createInsertSchema(Categories, {
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
export async function updateCategory(prevState: any, formData: FormData) {
  console.log(typeof formData.get("categoryId"));

  //使用Zod验证FormData
  const parse = updateSchema.safeParse({
    id: Number(formData.get("categoryId")),
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    userId: formData.get("userId"),
  });
  //准备插入的数据
  if (!parse.success) {
    console.log(parse.error.format());

    return {
      code: 400,
      msg: "数据验证失败",
      err: parse.error.format(),
    };
  }
  const { id, title, type, description, userId } = parse.data;

  try {
    console.log("Updating category data...");

    await db
      .update(Categories)
      .set({
        title,
        type,
        description,
        userId,
      })
      .where(eq(Categories.id, id || 0));
    return {
      code: 200,
      msg: "修改成功",
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
