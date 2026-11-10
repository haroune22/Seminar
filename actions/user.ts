"use server";

import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema";

export const getUsers = async () => {
  const users = await db.select().from(usersTable);
  console.log("getting all users from database", users);

  return users;
};
