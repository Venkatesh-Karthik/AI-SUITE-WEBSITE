"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";
import { AccountMenu } from "@/components/AccountMenu";

const links = [
  { href: "/#assistants", label: "Assistants" },
  { href: "/#features", label: "Features" },
  { href: "/#security", label: "Security" },
  { href: "/#download", label: "Download" },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 glass-panel transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_30px_-10px_rgba(0,0,0,0.6)] border-b-core-line" : "border-b-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="shrink-0" aria-label="AI Suite home">
          <Logo size={32} priority />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-core-muted">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-core-text transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {status === "authenticated" ? (
            <AccountMenu
              name={session?.user?.name}
              email={session?.user?.email}
              image={session?.user?.image}
            />
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-2 rounded-md bg-suite text-core-bg font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_-6px_rgba(78,201,192,0.7)]"
            >
              Sign in
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-6 h-0.5 bg-core-text mb-1.5 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block w-6 h-0.5 bg-core-text mb-1.5 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block w-6 h-0.5 bg-core-text transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-core-line px-6 py-4 flex flex-col gap-4 bg-core-bg/95 backdrop-blur-xl">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-core-muted hover:text-core-text transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="h-px bg-core-line my-1" />
          {status === "authenticated" ? (
            <>
              <div className="flex items-center gap-3 pb-1">
                <span className="relative w-8 h-8 rounded-full bg-suite/15 border border-suite/40 flex items-center justify-center text-xs font-display font-semibold text-suite overflow-hidden flex-shrink-0">
                  {session?.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (session?.user?.name || session?.user?.email || "?").trim().charAt(0).toUpperCase()
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm truncate">{session?.user?.name || "AI Suite user"}</span>
                  {session?.user?.email && (
                    <span className="block text-xs text-core-muted truncate">{session.user.email}</span>
                  )}
                </span>
              </div>
              <Link href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link href="/dashboard/account" onClick={() => setOpen(false)}>
                Account settings
              </Link>
              <button className="text-left" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="text-suite">
              Sign in
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
