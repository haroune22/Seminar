"use client";

import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = ({ className }: { className?: string }) => {
  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: <Home />,
    },
    {
      href: "/feed",
      label: "feed",
      icon: <Home />,
    },
  ];
  const pathname = usePathname();

  return (
    <div className={cn("", className)}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            href={link.href}
            key={link.label}
            className={cn(
              `flex gap-2 items-center justify-center text-lg`,
              isActive ? "text-blue-900" : "text-gray-900",
            )}
          >
            {link.icon}
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
