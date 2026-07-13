"use client";

import { LogOut, Settings, User } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { Initials } from "@/utils";

export const AdminHeader = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  // const currentRoute = useStoreRoutes((state) => state.currentRoute);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-base font-semibold text-slate-800">
          Welcome back, {session?.user.name}
        </h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-10 w-10 cursor-pointer items-center justify-center border-0 ring-0 ring-offset-background transition-all outline-none">
          <Avatar className="h-10 w-10 rounded-md">
            <AvatarImage src="/admin.png" alt="Admin" />
            <AvatarFallback className="rounded-md text-xs">
              {Initials(session?.user?.name || "System Administrator")}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 size-4 text-slate-500" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 size-4 text-slate-500" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={async () => {
                await signOut({ redirect: false });
                router.push("/login");
              }}
            >
              <LogOut className="mr-2 size-4 cursor-pointer text-slate-500" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
