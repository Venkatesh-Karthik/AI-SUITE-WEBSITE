"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type AccountMenuProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

/**
 * Compact account menu for the navbar: avatar + name/email trigger that
 * opens a small dropdown with Dashboard / Account settings / Sign out.
 * Session data comes from next-auth's useSession() in the parent (Navbar)
 * — this component only renders what it's given, never fetches anything
 * itself, and never shows more than name/email/avatar.
 */
export function AccountMenu({ name, email, image }: AccountMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const label = name || email || "Account";
  const initial = label.trim().charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 border border-core-line hover:border-suite/50 transition-colors"
      >
        <span className="relative w-7 h-7 rounded-full bg-suite/15 border border-suite/40 flex items-center justify-center text-xs font-display font-semibold text-suite overflow-hidden flex-shrink-0">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            initial
          )}
        </span>
        <span className="hidden sm:block text-xs text-core-muted max-w-[140px] truncate">
          {name || email}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`w-3.5 h-3.5 text-core-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 rounded-lg border border-core-line bg-core-panel/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] py-2 text-sm overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-core-line">
            <p className="font-medium truncate">{name || "AI Suite user"}</p>
            {email && <p className="text-xs text-core-muted truncate mt-0.5">{email}</p>}
          </div>
          <Link
            href="/dashboard"
            role="menuitem"
            className="block px-4 py-2 hover:bg-core-panel2 transition-colors"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/account"
            role="menuitem"
            className="block px-4 py-2 hover:bg-core-panel2 transition-colors"
            onClick={() => setOpen(false)}
          >
            Account settings
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block w-full text-left px-4 py-2 hover:bg-core-panel2 transition-colors text-friday"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
