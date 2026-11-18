import { login } from "@/actions/user";
import { RedirectIfLoggedIn } from "@/components/redirect-if-logged-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="w-full max-w-lg rounded-xl bg-gray-100 border md:px-8 md:py-10 px-4 py-4 shadow-xl">
      <Suspense fallback={null}>
        <RedirectIfLoggedIn />
      </Suspense>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
            Create your account
          </h1>
          <p className="text-sm text-zinc-600 sm:text-base">
            Join thousands of students & teachers today
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full border-zinc-700  text-black "
          >
            <Image
              className="mr-2"
              src="/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </Button>
        </div>
        <form action={login} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="kyleCrane@gmail.com"
              autoComplete="email"
              className="h-12 w-full border-zinc-700"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="*********"
              className="h-12 w-full border-zinc-700"
              required
            />
          </div>
          <Button type="submit" className="py-6 text-lg" size="lg">
            Login
          </Button>
        </form>
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <p className="text-center text-sm text-zinc-500">
          Do Not have an account?
          <Link
            href="/register"
            className="font-medium text-zinc-800 pl-2 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
