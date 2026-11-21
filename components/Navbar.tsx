import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "./NavLinks";
import { NavbarUser } from "./NavbarUser";

const Navbar = () => {
  return (
    <div className="w-full flex items-center px-8 justify-between h-20 border-b border-blue-300/40">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <Link href="/" className="shrink-0 hidden lg:flex ...">
          <Image
            src="/seminar-logo.png"
            alt="Seminar logo"
            width={230}
            height={150}
            priority
            className="..."
          />
        </Link>
      </div>
      <div className="hidden md:flex items-center justify-center gap-6">
        <NavLinks className="flex items-center justify-center gap-6" />
      </div>
      <Suspense
        fallback={
          <div className="h-10 w-10 rounded-full bg-zinc-200 animate-pulse" />
        }
      >
        <NavbarUser />
      </Suspense>
    </div>
  );
};

export default Navbar;
