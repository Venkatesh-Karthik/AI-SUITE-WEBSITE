"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm px-4 py-2 rounded-md border border-core-line hover:border-suite/60 transition-colors"
    >
      Sign out
    </button>
  );
}
