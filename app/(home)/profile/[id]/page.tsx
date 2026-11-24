import { notFound } from "next/navigation";
import { getCurrentUser, getUserById } from "@/actions/user";
import { db } from "@/drizzle/db";
import { FollowButton } from "@/components/FollowButton";
import Image from "next/image";

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [viewer, profileUser] = await Promise.all([
    getCurrentUser(),
    getUserById(id),
  ]);

  if (!profileUser) notFound();

  const isOwnProfile = viewer?.id === profileUser.id;
  const isTeacher = profileUser.role === "Teacher";

  const alreadyFollowing =
    viewer?.role === "Student" && isTeacher
      ? !!(await db.query.followsTable.findFirst({
          where: { followerId: viewer.id, followingId: profileUser.id },
        }))
      : false;

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-sm sm:flex-row sm:items-start">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-zinc-200">
            {profileUser.profilePic && (
              <Image
                src={profileUser.profilePic}
                alt={profileUser.username}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold">{profileUser.username}</h1>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                {profileUser.role}
              </span>
            </div>

            {profileUser.bio && (
              <p className="max-w-xl text-sm text-zinc-600">
                {profileUser.bio}
              </p>
            )}

            {isTeacher && (
              <p className="text-sm text-zinc-500">⭐ — no ratings yet</p>
            )}
          </div>

          {!isOwnProfile && isTeacher && viewer?.role === "Student" && (
            <FollowButton
              teacherId={profileUser.id}
              initiallyFollowing={alreadyFollowing}
            />
          )}
        </div>

        {isTeacher && (
          <>
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold">Introduction</h2>
              <div className="flex aspect-video items-center justify-center rounded-lg bg-zinc-100 text-sm text-zinc-400">
                Intro video placeholder
              </div>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold">What I teach</h2>
              <p className="text-sm text-zinc-400">
                Subjects, languages, and price per lesson
              </p>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold">Book a session</h2>
              <p className="text-sm text-zinc-400">
                Scheduling UI goes here once sessions are built
              </p>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold">Experience</h2>
              <p className="text-sm text-zinc-400">Resume / teaching history</p>
            </section>

            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-3 font-semibold">Reviews</h2>
              <p className="text-sm text-zinc-400">No reviews yet.</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
