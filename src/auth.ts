import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const clientId = process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: clientId && clientSecret
    ? [Google({ clientId, clientSecret })]
    : [],
  pages: {
    signIn: "/login",
  },
});
