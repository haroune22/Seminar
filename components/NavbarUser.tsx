import Link from "next/link";
import { LogOut } from "lucide-react";
import { getCurrentUser } from "@/actions/user";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function NavbarUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex items-center gap-4">
      <Link href={`/profile/${user.id}`}>
        <Avatar>
          <AvatarImage src={user.profilePic ?? ""} alt="avatar" />
          <AvatarFallback>
            {user.username?.charAt(0).toUpperCase() ?? "H"}
          </AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
      </Link>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button
          className="py-6 px-5 flex items-center justify-center"
          variant="destructive"
        >
          <LogOut className="ml-4" />
          Logout
        </Button>
      </form>
    </div>
  );
}
