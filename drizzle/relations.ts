import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  usersTable: {
    posts: r.many.postsTable(),
    following: r.many.followsTable({ alias: "followedSide" }),
    followers: r.many.followsTable({ alias: "followerSide" }),
  },
  postsTable: {
    author: r.one.usersTable({
      from: r.postsTable.authorId,
      to: r.usersTable.id,
    }),
  },
  followsTable: {
    followers: r.one.usersTable({
      from: r.followsTable.followerId,
      to: r.usersTable.id,
      alias: "followerSide",
    }),
    following: r.one.usersTable({
      from: r.followsTable.followingId,
      to: r.usersTable.id,
      alias: "followedSide",
    }),
  },
}));
