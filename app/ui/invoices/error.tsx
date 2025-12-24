"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opsional: kirim error ke layanan pelaporan error (misal: Sentry)
    console.error("Invoice route error:", error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-center text-2xl font-bold text-red-600">
        Something went wrong!
      </h2>
      <p className="text-center text-gray-600 max-w-md">
        We couldn't load the invoices. Please try again.
      </p>
      <button
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={
          // Coba muat ulang rute invoices
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
