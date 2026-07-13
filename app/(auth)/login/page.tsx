import { Metadata } from "next";
import Image from "next/image";

import MetaConfig from "@/meta.json";
import Logo from "@/public/logo.png";
import { Card, CardContent, CardHeader } from "@/ui/shadcn/card";
import { FormLogin } from "@/ui/shared/form";

export const metadata: Metadata = {
  title: `Login - ${MetaConfig.title}`,
  description: MetaConfig.description,
};

const PageLogin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand">
      <Card className="w-full max-w-md p-12 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="relative mx-auto w-24">
            <Image
              src={Logo.src}
              alt="Greenland Bio Organic Fertilizer"
              width={180}
              height={180}
              priority={true}
              className="h-auto w-full"
            />
          </div>
          <div className="my-6 text-center text-xl font-bold text-zinc-800">
            Computer Lab Monitoring
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  );
};

export default PageLogin;
