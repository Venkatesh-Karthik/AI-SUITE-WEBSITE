import Link from "next/link";
import { getDownloadInfo } from "@/lib/download";
import { Logo } from "@/components/Logo";

export function Footer() {
  const { version } = getDownloadInfo();
  return (
    <footer className="relative border-t border-core-line bg-core-panel/40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-suite/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <Logo size={32} />
          <p className="text-xs text-core-muted mt-3 tracking-[0.15em]">JARVIS · FRIDAY · EDITH</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-core-muted text-xs uppercase tracking-widest mb-1">Product</span>
            <a href="/#download" className="hover:text-suite transition-colors">Download</a>
            <a href="/#features" className="hover:text-suite transition-colors">Features</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-core-muted text-xs uppercase tracking-widest mb-1">Account</span>
            <Link href="/login" className="hover:text-suite transition-colors">Sign in</Link>
            <Link href="/dashboard" className="hover:text-suite transition-colors">Dashboard</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-core-muted text-xs uppercase tracking-widest mb-1">Legal</span>
            <Link href="/privacy" className="hover:text-suite transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-suite transition-colors">Terms</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-8 text-xs text-core-muted flex justify-between">
        <span>&copy; {new Date().getFullYear()} AI Suite</span>
        {version && <span className="font-mono">v{version}</span>}
      </div>
    </footer>
  );
}
