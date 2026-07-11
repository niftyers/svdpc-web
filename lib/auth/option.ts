import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import client from "@/lib/db/client";
import { HashVerify } from "@/utils";

const SECRET = process.env.NEXTAUTH_SECRET || "";

export default {
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const db = (await client).db();
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({
            username: credentials.username,
          });

          if (!user) {
            return null;
          }

          const isMatch = await HashVerify(credentials.password, user.password);

          if (!isMatch) {
            return null;
          }

          return {
            id: user._id.toString(),
            role: user.role,
            name: user.name,
            username: user.username,
            photo: user.photo,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.username = user.username;
        token.photo = user.photo;
      }

      if (trigger === "update" && session?.user) {
        if (session.user.name) token.name = session.user.name;
        if (session.user.role) token.role = session.user.role;
        if (session.user.username) token.username = session.user.username;
        if (session.user.photo) token.photo = session.user.photo;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.username = token.username ?? "";
      session.user.photo = token.photo;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  jwt: {
    secret: SECRET,
  },
} satisfies AuthOptions;
