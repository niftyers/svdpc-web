import client from "@/lib/db/client"
import { TLoginData } from "@/types"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"

import type { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const SECRET = process.env.NEXTAUTH_SECRET || ""

export default {
  adapter: MongoDBAdapter(client),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: {},
        name: {},
        username: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null

          const data: TLoginData = {
            id: Number(credentials.id),
            name: String(credentials.name),
            username: String(credentials.username),
          }

          if (!data.username) return null

          const currentUser: User = {
            id: String(data.id),
            name: data.name,
            username: data.username,
          }

          return currentUser
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.username = user.username
      }

      if (trigger === "update" && session?.user) {
        if (session.user.name) token.name = session.user.name
        if (session.user.username) token.username = session.user.username
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "xx"
      session.user.name = token.name
      session.user.username = token.username || "email"
      return session
    },
  },
  pages: {
    signIn: "/customer/login",
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
} satisfies AuthOptions
