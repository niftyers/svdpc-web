import { Metadata } from "next";
import Link from "next/link";

import MetaConfig from "@/meta.json";
import { Button } from "@/ui/shadcn/button";

export const metadata: Metadata = {
  title: `Page Not Found - ${MetaConfig.title}`,
};

export default function PageNotFound() {
  return (
    <div className="h-screen w-screen overflow-auto bg-[#0f0f0f]">
      <div className="flex h-full flex-auto items-center justify-center px-6 lg:px-0">
        <div className="w-full py-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-bold text-8xl text-white">404</h1>
            <h2 className="mt-3 text-center text-white">Page not found</h2>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <Link href="/" className="no-underline">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="cursor-pointer"
              >
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
