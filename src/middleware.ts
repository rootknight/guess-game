import NextAuth from "next-auth";
import authConfig from "@/auth.config";
export const publicRoutes = ["/game", "/settlement", "/records", "/auth/login"];
export const authRoutes = ["/auth/login"];
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/admin/words";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isOnDashboard = nextUrl.pathname.startsWith("/admin");
  const isAuthing = nextUrl.pathname.startsWith("/auth");

  //如果在admin且未登陆，重定向到登陆
  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  //如果在登陆且已登陆，重定向到admin/words
  if (isAuthing && isLoggedIn) {
    return Response.redirect(new URL("/admin/words", nextUrl));
  }

  if (nextUrl.pathname === "/admin" && isLoggedIn) {
    return Response.redirect(new URL("/admin/words", nextUrl));
  }

  // return null;
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
