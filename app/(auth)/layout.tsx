import { ReactNode } from "react"

export default function AuthRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="relative">{children}</main>
    </div>
  )
}
