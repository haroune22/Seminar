import Image from "next/image";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth, signOut } from "@/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className="w-full flex items-center px-8 justify-between h-20 border-b border-blue-300/40 ">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="shrink-0 hidden lg:flex cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/seminar-logo.png"
            alt="Seminar logo"
            width={230}
            height={150}
            priority
            className="h-auto w-35 rounded-lg object-cover sm:w-45 md:w-57.5"
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center justify-center gap-6">
        <NavLinks className="flex items-center justify-center gap-6" />
      </div>
      <div className="flex items-center gap-4">
        <Link href={`/profile/${session?.user?.id}`}>
          <Avatar>
            <AvatarImage src={session?.user?.image || ""} alt="avatar" />
            <AvatarFallback>
              {session?.user.name?.charAt(0).toUpperCase() || "H"}
            </AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </Link>

        <Button
          className="py-6 px-5 flex items-center justify-center"
          onClick={async () => {
            "use server";
            await signOut();
          }}
          variant="destructive"
        >
          <LogOut className="ml-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
