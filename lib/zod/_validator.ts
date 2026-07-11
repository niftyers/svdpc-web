import { FormAuthSchema, TAuthForm } from "./_auth";
import { TFieldErrors, ToTFieldErrors } from "./_common";

export const ValidateAuth = (c: TAuthForm): TFieldErrors<TAuthForm> => {
  const res = FormAuthSchema.safeParse(c);
  return res.success ? {} : ToTFieldErrors<TAuthForm>(res.error.issues);
};
