"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleFollow } from "@/actions/follow";

export function FollowButton({
  teacherId,
  initiallyFollowing,
}: {
  teacherId: string;
  initiallyFollowing: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      variant={initiallyFollowing ? "outline" : "default"}
      onClick={() => startTransition(() => toggleFollow(teacherId))}
    >
      {isPending ? "..." : initiallyFollowing ? "Following" : "Follow"}
    </Button>
  );
}
