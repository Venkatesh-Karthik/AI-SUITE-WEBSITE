import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDownloadInfo } from "@/lib/download";
import { SignOutButton } from "@/components/SignOutButton";
import { Logo } from "@/components/Logo";
import { Atmosphere } from "@/components/Atmosphere";
import { isAdminEmail } from "@/lib/admin";
import { providerLabel } from "@/lib/providerLabels";

const assistants = [
  { name: "JARVIS", color: "text-jarvis", border: "border-jarvis/40" },
  { name: "FRIDAY", color: "text-friday", border: "border-friday/40" },
  { name: "EDITH", color: "text-edith", border: "border-edith/40" },
];

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  // Belt-and-suspenders: middleware already protects this route, but the
  // page checks again server-side so it's never reachable without a session.
  if (!session?.user) redirect("/login?callbackUrl=/dashboard");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { accounts: { select: { provider: true } } },
  });
  if (!user) redirect("/login?callbackUrl=/dashboard");

  const info = getDownloadInfo();
  const providers =
    user.accounts.map((a) => providerLabel(a.provider)).join(", ") || providerLabel("email-otp");
  const isAdmin = isAdminEmail(user.email);

  return (
    <main className="relative min-h-screen px-6 py-24 overflow-hidden">
      <Atmosphere variant="section" />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Logo size={28} className="mb-4" />
            <p className="text-suite text-xs tracking-[0.3em] uppercase mb-2">
              AI Suite Command Center
            </p>
            <h1 className="font-display text-3xl font-bold">
              Welcome back{user.name ? `, ${user.name}` : ""}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/dashboard/admin"
                className="text-sm px-4 py-2 rounded-md border border-suite/40 text-suite hover:border-suite/70 transition-colors"
              >
                Admin
              </Link>
            )}
            <SignOutButton />
          </div>
        </div>

        <section className="grid sm:grid-cols-3 gap-4 mb-10">
          {assistants.map((a) => (
            <div
              key={a.name}
              className={`glass-panel rounded-xl p-6 border ${a.border} transition-transform duration-300 hover:-translate-y-1`}
            >
              <span className={`font-display font-bold text-lg ${a.color}`}>{a.name}</span>
              <p className="text-xs text-core-muted mt-2 tracking-widest uppercase">
                Ready on desktop app
              </p>
            </div>
          ))}
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="font-display font-semibold text-sm uppercase tracking-widest mb-4">
              Account
            </h2>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between border-b border-core-line pb-2">
                <dt className="text-core-muted">Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div className="flex justify-between border-b border-core-line pb-2">
                <dt className="text-core-muted">Signed in with</dt>
                <dd>{providers}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-core-muted">Member since</dt>
                <dd>{user.createdAt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</dd>
              </div>
            </dl>
            <Link
              href="/dashboard/account"
              className="inline-block mt-6 text-xs text-suite hover:underline"
            >
              Manage account →
            </Link>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h2 className="font-display font-semibold text-sm uppercase tracking-widest mb-4">
              Latest AI Suite release
            </h2>
            {info.configured ? (
              <>
                <p className="font-mono text-sm text-core-muted mb-4">
                  {info.version ? `v${info.version}` : "Version not set"} · Windows 10 / 11
                  {info.sizeMb ? ` · ${info.sizeMb} MB` : ""}
                </p>
                <a
                  href="/api/download"
                  className="inline-block px-6 py-3 rounded-md bg-suite text-core-bg font-display font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  DOWNLOAD AI SUITE
                </a>
              </>
            ) : (
              <p className="text-sm text-core-muted">
                No installer is configured yet. Set{" "}
                <code className="font-mono text-core-text">DOWNLOAD_URL</code> to enable downloads.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
