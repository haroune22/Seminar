import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare, hashSync } from "bcryptjs";
import { eq } from "drizzle-orm";
import "next-auth/jwt";
import { db } from "./drizzle/db";
import { userRoles, usersTable } from "./drizzle/schema";
import { signInSchema } from "./lib/zod";

type Role = (typeof userRoles.enumValues)[number];

declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}

const DUMMY_HASH = hashSync("not-a-real-password", 10);

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const email = parsed.data.email.trim().toLowerCase();

        const [user] = await db
          .select({
            id: usersTable.id,
            email: usersTable.email,
            role: usersTable.role,
            password: usersTable.password,
          })
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        const isMatch = await compare(
          parsed.data.password,
          user?.password ?? DUMMY_HASH,
        );

        if (!user || !isMatch) return null;

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      if (token.role) session.user.role = token.role;
      return session;
    },
  },
});
