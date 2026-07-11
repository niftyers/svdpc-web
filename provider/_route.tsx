"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import useStoreRoutes from "@/store/route";

export const RouteProviders = () => {
  const pathname = usePathname();
  const setCurrentRoute = useStoreRoutes((state) => state.setCurrentRoute);
  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname, setCurrentRoute]);
  return null;
};
