"use server";

import { db } from "@/app/admin/db/index";
import { z } from "zod";

//定义zod验证规则
const FormSchema = z.object({
  id: z.string(),
  title: z
    .string({
      invalid_type_error: "请输入词组名称",
    })
    .min(2)
    .max(20),
  type: z
    .string({
      invalid_type_error: "请输入词组简写",
    })
    .min(2)
    .max(20),
  description: z
    .string({
      invalid_type_error: "请输入词组描述",
    })
    .min(2)
    .max(30),
  userId: z.string({
    invalid_type_error: "请登陆后操作",
  }),
});

const CreateCategory = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    type?: string[];
    description?: string[];
    userId?: string[];
  };
  message?: string | null;
};

//创建分类
export async function createCategory(prevState: State, formData: FormData) {
  //使用Zod验证FormData
  const validatedFields = CreateCategory.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    description: formData.get("description"),
    userId: formData.get("userId"),
  });

  //如果验证失败直接返回错误
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "创建失败，请检查填写表单",
    };
  }

  //准备插入的数据
  const { title, type, description, userId } = validatedFields.data;

  try {
    console.log("Inserting category data...");
    // const result: any = await db.run(
    //   `INSERT INTO categories (title, type, description, userId) VALUES (?, ?, ?, ?)`,
    //   [title, type, description, userId]
    // );
    // console.log("Category data inserted successfully.");
    // return result;
  } catch (error) {
    console.error("Database Error:", error);
    // throw new Error("Failed to insert category data.");
    return { message: error };
  }
}
