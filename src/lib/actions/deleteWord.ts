"use server";

import db from "@/db";
import { Words } from "@/db/schema";
import { eq } from "drizzle-orm";

//创建分类
export async function deleteWord(wordId: number) {
  try {
    console.log("Deleting word data...");
    await db
      .update(Words)
      .set({
        isDeleted: true,
      })
      .where(eq(Words.id, Number(wordId)))
      .returning({ deletedWord: Words.word });

    return {
      code: 200,
      msg: "删除成功",
      data: {},
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      code: 400,
      msg: "删除失败",
      data: { err: error.message },
    };
  }
}
