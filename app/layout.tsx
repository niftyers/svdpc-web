import { Geist, Geist_Mono } from "next/font/google"

import { SonnerProvider } from "@/provider"
import { QueryProviders } from "@/provider/query"
import { RouteProviders } from "@/provider/route"
import { TooltipProvider } from "@/ui/shadcn/tooltip"
import { cn } from "@/utils/_tw"
import { Check, CircleX, Info, MessageCircleWarning } from "lucide-react"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <RouteProviders />
        <SonnerProvider
          position="bottom-left"
          visibleToasts={10}
          gap={20}
          duration={2500}
          icons={{
            success: <Check className="mr-2 size-5" />,
            info: <Info className="mr-2 size-5" />,
            warning: <MessageCircleWarning className="mr-2 size-5" />,
            error: <CircleX className="mr-2 size-5" />,
          }}
          richColors
        />
        <QueryProviders>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProviders>
      </body>
    </html>
  )
}
