import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/ui/shadcn/sidebar";
import { AppSidebar } from "@/ui/shared/layout/_sidebar";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SidebarProvider>
        <AppSidebar />
        <main className="relative">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
