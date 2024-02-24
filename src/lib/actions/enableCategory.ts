"use server";

import db from "@/db";
import { sql } from "drizzle-orm";
import { Categories } from "@/db/schema";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";

const insertSchema = createInsertSchema(Categories, {
  id: z.number(),
  isEnable: z.boolean(),
});

//修改分类是否启用
export async function enableCategory(id: number, isEnable: boolean) {
  // //使用Zod验证FormData
  // const parse = insertSchema.safeParse({
  //   id: id,
  //   isEnable: isEnable,
  // });
  // //准备插入的数据
  // if (!parse.success) {
  //   const err = parse.error.format();
  //   return {
  //     code: 400,
  //     msg: "数据验证失败",
  //     data: {
  //       idErrors: err.id?._errors.join("\n"),
  //       isEnableErrors: err.isEnable?._errors.join("\n"),
  //     },
  //   };
  // }

  try {
    console.log("修改分类启用状态...");
    await db
      .update(Categories)
      .set({
        isEnable,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(Categories.id, Number(id)));
    console.log("修改成功");
    return {
      code: 200,
      msg: "修改成功",
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      code: 401,
      msg: "修改失败",
    };
  }
}
