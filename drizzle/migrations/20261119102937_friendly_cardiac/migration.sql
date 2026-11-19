CREATE TABLE "follows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"followerId" uuid NOT NULL,
	"followingId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "follows_pair_unique" UNIQUE("followerId","followingId"),
	CONSTRAINT "follows_must_differ" CHECK ("followerId" <> "followingId")
);
--> statement-breakpoint
CREATE INDEX "followerId_idx" ON "follows" ("followerId");--> statement-breakpoint
CREATE INDEX "followingId_idx" ON "follows" ("followingId");--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerId_users_id_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_users_id_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE;