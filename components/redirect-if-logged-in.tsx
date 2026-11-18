import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function RedirectIfLoggedIn() {
  const session = await auth();

  if (session?.user) {
    redirect(`/`);
  }

  return null;
}
