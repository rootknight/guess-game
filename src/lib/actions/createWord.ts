"use server";

import db from "@/db";
import { Words } from "@/db/schema";
import { z } from "zod";

const insertSchema = z.object({
  categoryId: z.number().min(1, { message: "未选择分类" }),
  words: z
    .string()
    .regex(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/u, {
      message: "只能包含中文、字母、数字",
    })
    .min(1, { message: "至少包含1个字符" })
    .max(10, { message: "最多包含10个字符" })
    .array()
    .nonempty({ message: "至少包含1个单词" }),
});

//创建分类
export async function createWord(prevState: any, formData: FormData) {
  const inputWords = formData
    .get("words")
    ?.toString()
    .split(/[，,。. \n\r]+/)
    .filter((str) => str.trim() !== "") as string[];

  console.log(inputWords);

  //使用Zod验证FormData
  const parse = insertSchema.safeParse({
    categoryId: Number(formData.get("categoryId")),
    words: inputWords,
  });
  //准备插入的数据;
  if (!parse.success) {
    console.log(parse.error.issues);
    const errors = parse.error.issues;
    const errWords = errors.map((err) => {
      const errIndex = Number(err.path[1]);
      return inputWords[errIndex];
    });
    return {
      code: 400,
      msg: "单词只能包含中文、字母、数字",
      data: {
        errWords: errWords.join("，"),
      },
    };
  }
  const { categoryId, words } = parse.data;

  try {
    console.log("Inserting word data...");
    for (const word of words) {
      await db
        .insert(Words)
        .values({
          categoryId,
          word,
        })
        .onConflictDoUpdate({
          target: [Words.word, Words.categoryId],
          set: { word: word },
        });
      console.log(word);
    }
    return {
      code: 200,
      msg: "创建成功",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      code: 401,
      msg: "插入失败",
      data: {
        error: error.message,
      },
    };
  }
}
