/* eslint-disable @typescript-eslint/no-explicit-any */
import type { $ZodIssue } from "zod/v4/core";

export type TFieldErrors<T extends Record<string, any>> = Partial<
  Record<keyof T, string>
>;

export const ToTFieldErrors = <T extends Record<string, any>>(
  issues: $ZodIssue[]
): TFieldErrors<T> => {
  const out: any = {};
  for (const i of issues) {
    const k = i.path?.[0] as keyof T | undefined;
    if (k && !out[k]) out[k] = i.message;
  }
  return out;
};
