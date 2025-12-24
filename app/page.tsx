import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{" "}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>

          {/* Tambahkan info kredensial di sini */}
          <div className="rounded-md border border-gray-300 bg-white p-4">
            <h2 className="mb-2 text-sm font-semibold text-gray-700">Try logging in with:</h2>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>
                <strong>Email:</strong> <code className="bg-gray-100 px-1 rounded">user@nextmail.com</code>
              </li>
              <li>
                <strong>Password:</strong> <code className="bg-gray-100 px-1 rounded">123456</code>
              </li>
              <li className="pt-2">
                <strong>Email:</strong> <code className="bg-gray-100 px-1 rounded">latif@example.com</code>
              </li>
              <li>
                <strong>Password:</strong> <code className="bg-gray-100 px-1 rounded">milano</code>
              </li>
            </ul>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
