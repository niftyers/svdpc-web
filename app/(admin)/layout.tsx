import { ReactNode } from "react";

import { GetSession } from "@/lib/auth/session";
import { SidebarProvider } from "@/ui/shadcn/sidebar";
import { AdminHeader, AdminSidebar } from "@/ui/shared/layout";

export default async function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await GetSession();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <AdminHeader session={session} />
          <main className="flex-1 bg-muted/10 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
