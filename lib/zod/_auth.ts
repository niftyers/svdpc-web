import * as z from "zod";

export const FormAuthSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export type TAuthForm = z.infer<typeof FormAuthSchema>;
