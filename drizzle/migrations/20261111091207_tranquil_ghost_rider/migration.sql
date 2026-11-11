CREATE TYPE "role" AS ENUM('Student', 'Teacher');--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(100) NOT NULL,
	"content" varchar(500) NOT NULL,
	"media" varchar(500),
	"authorId" uuid NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" varchar(255) NOT NULL,
	"bio" text,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"profilePic" varchar(255),
	"role" "role" DEFAULT 'Student'::"role" NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "authorId_unique_idx" ON "posts" ("authorId");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_users_id_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE;