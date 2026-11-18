import { RedirectIfLoggedIn } from "@/components/redirect-if-logged-in";
import { RegisterForm } from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div className="w-full max-w-lg rounded-xl bg-gray-100 border md:px-6 md:py-6 px-4 py-4 shadow-xl">
      <Suspense fallback={null}>
        <RedirectIfLoggedIn />
      </Suspense>
      <div className="flex flex-col gap-5">
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
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-xs text-zinc-500">OR</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
        <RegisterForm />
        <p className="text-center text-xs leading-5 text-zinc-500">
          By creating an account, you agree to our
          <span className="text-zinc-900 px-1 hover:underline">
            Terms of Service
          </span>
          and
          <span className="text-zinc-900 px-1 hover:underline">
            Privacy Policy
          </span>
        </p>
        <p className="text-center text-sm text-zinc-500">
          Already have an account?
          <Link
            href="/login"
            className="font-medium text-zinc-800 pl-2 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
