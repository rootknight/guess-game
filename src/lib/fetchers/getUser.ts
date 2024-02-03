"use server";

import db from "@/db";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await db.select().from(Users).where(eq(Users.email, email));
    return user[0];
  } catch (error) {
    console.error("没有找到用户:", error);
    throw new Error("没有找到用户");
  }
}
