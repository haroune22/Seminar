import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const timestamps = {
  updatedAt: timestamp()
    .$onUpdate(() => new Date())
    .defaultNow(),
  createdAt: timestamp().defaultNow().notNull(),
};

export const userRoles = pgEnum("role", ["Student", "Teacher"]);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }).notNull(),
  bio: text(),
  age: integer(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  profilePic: varchar({ length: 255 }),
  role: userRoles().default("Student").notNull(),
  //posts: Posts[]
  //following: Follows[]
  //followedBy: Follows[]
  ...timestamps,
});

export const postsTable = pgTable(
  "posts",
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    content: varchar({ length: 500 }).notNull(),
    media: varchar({ length: 500 }),
    authorId: uuid("authorId")
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    ...timestamps,
  },
  (table) => [index("authorId_unique_idx").on(table.authorId)],
);

export const followsTable = pgTable(
  "follows",
  {
    id: uuid().primaryKey().defaultRandom(),
    followerId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    followingId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index("followerId_idx").on(table.followerId),
    index("followingId_idx").on(table.followingId),
    unique("follows_pair_unique").on(table.followerId, table.followingId),
    check(
      "follows_must_differ",
      sql`${table.followerId} <> ${table.followingId}`,
    ),
  ],
);
