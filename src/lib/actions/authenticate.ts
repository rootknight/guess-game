"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "用户名或密码错误";
        default:
          return "出错了，无法登陆";
      }
    }
    throw error;
  }
}

export async function signout() {
  await signOut();
}
