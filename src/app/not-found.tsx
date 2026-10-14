import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-grid flex items-center justify-center px-6 text-center">
      <div>
        <p className="text-suite text-xs tracking-[0.3em] uppercase mb-4">404</p>
        <h1 className="font-display text-3xl font-bold mb-4">This page isn&apos;t part of the suite.</h1>
        <Link href="/" className="text-sm text-suite hover:underline">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
