import { ReactNode } from "react"

import { AuthProvider } from "@/provider/auth"

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <main className="relative">{children}</main>
      </div>
    </AuthProvider>
  )
}
