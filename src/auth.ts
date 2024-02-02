import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import GitHub from "next-auth/providers/GitHub";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "@/db";
import { Users } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await db.select().from(Users).where(eq(Users.email, email));
    return user[0];
  } catch (error) {
    console.error("没有找到用户:", error);
    throw new Error("没有找到用户");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        }
        console.log("验证无效");
        return null;
      },
    }),
  ],
});
