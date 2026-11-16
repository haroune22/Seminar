import * as z from "zod";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .max(72, "Password is too long"),
});

export const signUpSchema = z.object({
  email: z.email("Please enter a valid email address."),
  username: z
    .string("Username is required")
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
  role: z.enum(["Student", "Teacher"]),
});

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
