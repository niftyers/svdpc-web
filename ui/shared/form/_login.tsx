"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { TAuthForm, TFieldErrors, ValidateAuth } from "@/lib/zod";
import { Button } from "@/ui/shadcn/button";
import { Checkbox } from "@/ui/shadcn/checkbox";
import { Input } from "@/ui/shadcn/input";
import { Label } from "@/ui/shadcn/label";
import { cn } from "@/utils";

const DEF_AUTH: TAuthForm = {
  username: "",
  password: "",
  rememberMe: false,
};

export const FormLogin = () => {
  const router = useRouter();

  const { status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [waitingForm, setWaitingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<TFieldErrors<TAuthForm>>({});
  const [form, setForm] = useState<TAuthForm>({
    ...DEF_AUTH,
  });

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const err = ValidateAuth(form);
    const hasErrors = Object.keys(err).length > 0;

    if (hasErrors) {
      setErrors(err);

      return;
    }

    setErrors({});
    setIsLoading(true);

    const res = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false,
    });

    if (!res?.ok) {
      setIsLoading(false);
      toast.error("Invalid Username or Password");
      return;
    }

    toast.success("Authenticaton", {
      description: "👍 Logging in is successful",
      position: "top-right",
    });

    setWaitingForm(true);

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
      </div>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  if (waitingForm) {
    return (
      <div className="flex h-full items-center">
        <div className="my-4 px-4 py-3 text-slate-950 shadow-md" role="alert">
          <div className="flex flex-col items-center justify-center">
            <div className="ml-3">
              <p className="text-sm font-medium">
                Please wait while we redirect you to the dashboard.
              </p>
            </div>
            <div className="mt-4 shrink-0">
              <div className="flex space-x-2">
                <div className="inline size-5 animate-pulse rounded-full bg-green-600"></div>
                <div className="inline size-5 animate-pulse rounded-full bg-green-600"></div>
                <div className="inline size-5 animate-pulse rounded-full bg-green-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="space-y-1">
        <Input
          id="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          disabled={isLoading}
          className={cn(
            "h-9 border-slate-200 focus-visible:border-amber-400 focus-visible:ring-amber-400",
            errors.username ? "border-red-500" : ""
          )}
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username}</p>
        )}
      </div>
      <div className="space-y-1">
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete={form.rememberMe ? "current-password" : "off"}
            disabled={isLoading}
            className={cn(
              "h-9 focus-visible:border-amber-400 focus-visible:ring-amber-400",
              errors.password ? "border-red-500 pr-10" : "pr-10"
            )}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="absolute top-0 right-0 h-full px-3 text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      <div className="mb-6 flex items-center gap-2 select-none">
        <Checkbox
          id="rememberMe"
          checked={form.rememberMe}
          onCheckedChange={(checked) =>
            setForm({ ...form, rememberMe: checked })
          }
          disabled={isLoading}
          className="cursor-pointer data-checked:border-emerald-800 data-checked:bg-emerald-700"
        />
        <Label
          htmlFor="rememberMe"
          className="cursor-pointer text-xs font-normal text-slate-600"
        >
          Remember me
        </Label>
      </div>
      <Button
        size="lg"
        type="submit"
        className="h-9 w-full cursor-pointer bg-emerald-700 text-white hover:bg-emerald-600"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>
    </form>
  );
};
