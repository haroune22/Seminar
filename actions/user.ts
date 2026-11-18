"use server";

import { signIn } from "@/auth";
import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema";
import { signUpSchema } from "@/lib/zod";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import z from "zod";

export type RegisterState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
  };
  message?: string;
};
export const register = async (
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const parsed = signUpSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors };
  }

  const { username, password, role } = parsed.data;
  const email = parsed.data.email.trim().toLowerCase();

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) throw new Error("user already exists");

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(usersTable).values({
      email,
      username: username,
      role,
      password: hashedPassword,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      redirect(`/`);
    }
  }

  console.log(`User created successfully`);
  redirect("/login");
};

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error);
      redirect(`/login`);
    }
  }
  redirect("/");
};

export const getUsers = async () => {
  const users = await db.select().from(usersTable);
  console.log("getting all users from database", users);

  return users;
};
