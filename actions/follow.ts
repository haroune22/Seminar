"use server";
import { db } from "@/drizzle/db";
import { getCurrentUser } from "./user";
import { followsTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleFollow(teacherId: string) {
  const viewer = await getCurrentUser();

  if (!viewer) throw new Error("You must be logged in.");
  if (viewer.role !== "Student")
    throw new Error("Only students can follow teachers.");
  if (viewer.id === teacherId) throw new Error("Invalid target.");

  const teacher = await db.query.usersTable.findFirst({
    where: {
      id: teacherId,
    },
  });

  if (!teacher || teacher.role !== "Teacher") {
    throw new Error("This user is not a teacher.");
  }

  const existingFollower = await db.query.followsTable.findFirst({
    where: {
      followerId: viewer.id,
      followingId: teacherId,
    },
  });

  if (existingFollower) {
    await db
      .delete(followsTable)
      .where(
        and(
          eq(followsTable.followerId, viewer.id),
          eq(followsTable.followingId, teacherId),
        ),
      );
  } else {
    await db.insert(followsTable).values({
      followerId: viewer.id,
      followingId: teacherId,
    });
  }

  revalidatePath(`/profile/${teacherId}`);
}
