import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function RedirectIfLoggedIn({ page }: { page: string }) {
  const session = await auth();

  if (session?.user) {
    redirect(`/${page}`);
  }

  return null;
}
