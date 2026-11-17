import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen lg:min-w-4xl min-w-xl items-center justify-center overflow-hidden">
      <div className="py-2">{children}</div>
    </div>
  );
}
