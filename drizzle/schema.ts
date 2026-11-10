import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
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
  name: varchar({ length: 255 }).notNull(),
  bio: text(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  profilePic: varchar({ length: 255 }),
  role: userRoles().default("Student").notNull(),
  //posts: Posts[]
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
