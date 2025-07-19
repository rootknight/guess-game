"use server";

import db from "@/db";
import { sql } from "drizzle-orm";
import { Words } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

const insertSchema = z.object({
  id: z.number().min(1, { message: "未选择单词" }),
  word: z
    .string()
    .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/u, {
      message: "只能包含中文、字母、数字",
    })
    .min(1, { message: "至少包含1个字符" })
    .max(10, { message: "最多包含10个字符" }),
});

//修改单词
export async function updateWord(prevState: any, formData: FormData) {
  //使用Zod验证FormData
  const parse = insertSchema.safeParse({
    id: Number(formData.get("wordId")),
    word: formData.get("word"),
  });
  //准备更新的数据;
  if (!parse.success) {
    const errors = parse.error.issues;
    console.log(errors);

    return {
      code: 400,
      msg: "单词只能包含中文、字母、数字",
      data: { error: errors[0].message },
    };
  }
  const { id, word } = parse.data;

  try {
    console.log("Deleting word data...");
    await db
      .update(Words)
      .set({
        word,
        updatedAt: sql`(datetime('now', 'localtime'))`,
      })
      .where(eq(Words.id, Number(id)));
    return {
      code: 200,
      msg: "修改成功",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      code: 401,
      msg: "修改失败",
      data: {
        error: error.message,
      },
    };
  }
}
