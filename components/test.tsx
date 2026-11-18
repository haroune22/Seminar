import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

const test = async () => {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }
  console.log(session);
  return (
    <div>
      <Button
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default test;
