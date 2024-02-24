"use server";

import db from "@/db";
import { Categories } from "@/db/schema";
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
  icon: z.string(),
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
    icon: formData.get("icon"),
    description: formData.get("description"),
    userId: formData.get("userId"),
  });
  //准备插入的数据
  if (!parse.success) {
    const err = parse.error.format();
    return {
      code: 400,
      msg: "数据验证失败",
      data: {
        titleErrors: err.title?._errors.join("\n"),
        typeErrors: err.type?._errors.join("\n"),
        iconErrors: err.icon?._errors.join("\n"),
        descriptionErrors: err.description?._errors.join("\n"),
        userIdErrors: err.userId?._errors.join("\n"),
      },
    };
  }
  const { title, type, icon, description, userId } = parse.data;

  try {
    console.log("Inserting category data...");
    await db.insert(Categories).values({
      title,
      type,
      icon,
      description,
      userId,
    });
    return {
      code: 200,
      msg: "创建成功",
    };
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "UNIQUE constraint failed: categories.type") {
      return {
        code: 401,
        msg: "分类已存在",
        data: { typeIsExist: "分类已存在" },
      };
    }
  }
}
