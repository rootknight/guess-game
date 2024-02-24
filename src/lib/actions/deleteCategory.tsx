"use server";

import db from "@/db";
import { Categories } from "@/db/schema";
import { eq } from "drizzle-orm";

//创建分类
export async function deleteCategory(categoryType: string) {
  try {
    console.log("Deleting category data...");
    await db
      .update(Categories)
      .set({
        isDeleted: true,
      })
      .where(eq(Categories.type, `${categoryType}`));
    return {
      code: 200,
      msg: "删除成功",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      code: 400,
      msg: "删除失败",
      err: error.message,
    };
  }
}
