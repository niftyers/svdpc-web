import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from "next-auth/middleware"
import { NextFetchEvent, NextRequest } from "next/server"

const opts: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized({ token }) {
      return !!token
    },
  },
  pages: {
    signIn: "/login",
  },
}

export function proxy(req: NextRequest, event: NextFetchEvent) {
  return withAuth(opts)(req as NextRequestWithAuth, event)
}

export const config = {
  matcher: ["/:path*"],
}
