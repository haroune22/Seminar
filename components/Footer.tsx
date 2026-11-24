import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "./NavLinks";

async function CopyrightYear() {
  return <>{new Date().getFullYear()}</>;
}
const Footer = () => {
  return (
    <footer className="w-full md:flex flex-col mx-auto  border-t border-blue-300/30 text-black px-2 py-10">
      <div className="mx-auto flex-col w-full flex sm:flex-row max-w-7xl items-center justify-around gap-4">
        <div className="flex flex-1 flex-col items-center gap-2">
          <Image
            src="/seminar-logo.png"
            alt="Seminar"
            width={300}
            height={100}
            className="h-10 object-cover"
          />

          <p className="max-w-sm text-sm leading-6 text-gray-600">
            find teacher & students....
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h3 className="font-semibold text-white">Explore</h3>

          <NavLinks className="flex flex-col items-start gap-4" />
        </div>

        <div className="flex flex-1 flex-col gap-4">
          <h3 className="font-semibold text-white">Information</h3>

          <nav className="flex flex-col items-start gap-2">
            <Link
              href="/about"
              className="text-sm text-gray-600 transition-colors hover:text-blue-600"
            >
              About Us
            </Link>

            <Link
              href="/privacy"
              className="text-sm text-gray-600 transition-colors hover:text-blue-600"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-gray-600 transition-colors hover:text-blue-600"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/contact"
              className="text-sm text-gray-600 transition-colors hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-5 text-center text-sm text-gray-500">
        © <CopyrightYear /> Seminar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
