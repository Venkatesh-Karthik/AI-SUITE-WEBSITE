"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-core-bg text-core-text">
        <main className="min-h-screen flex items-center justify-center px-6 text-center">
          <div>
            <p className="text-friday text-xs tracking-[0.3em] uppercase mb-4">Error</p>
            <h1 className="font-display text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="text-sm text-core-muted mb-6">
              The page hit an unexpected error. You can try again below.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 rounded-md bg-suite text-core-bg font-display font-semibold text-sm"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
