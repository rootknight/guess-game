import type { NextAuthConfig } from "next-auth";

export default {
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/admin");
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL("/admin/words", nextUrl));
    //   }
    //   return true;
    // },
  },
  providers: [],
} satisfies NextAuthConfig;
