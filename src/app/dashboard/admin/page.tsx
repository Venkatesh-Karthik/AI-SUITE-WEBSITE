import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdminEmail } from "@/lib/admin";
import { Logo } from "@/components/Logo";
import { Atmosphere } from "@/components/Atmosphere";

export const metadata = { title: "Admin · Downloads" };

const RECENT_LIMIT = 50;

export default async function AdminDownloadsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/admin");

  // Server-side authorization only. Normal authenticated users are sent
  // back to the regular dashboard — this page never renders for them.
  if (!isAdminEmail(session.user.email)) redirect("/dashboard");

  const [totalDownloads, recent] = await Promise.all([
    prisma.downloadEvent.count(),
    prisma.downloadEvent.findMany({
      take: RECENT_LIMIT,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const uniqueUsers = await prisma.downloadEvent.findMany({
    where: { userId: { not: null } },
    distinct: ["userId"],
    select: { userId: true },
  });

  return (
    <main className="relative min-h-screen px-6 py-24 overflow-hidden">
      <Atmosphere variant="section" />
      <div className="relative mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Logo size={28} className="mb-4" />
            <p className="text-suite text-xs tracking-[0.3em] uppercase mb-2">Admin</p>
            <h1 className="font-display text-3xl font-bold">Download monitoring</h1>
          </div>
          <Link
            href="/dashboard"
            className="text-xs text-core-muted hover:text-core-text transition-colors"
          >
            ← Command Center
          </Link>
        </div>

        <section className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="glass-panel rounded-xl p-6">
            <p className="text-xs uppercase tracking-widest text-core-muted mb-2">
              Total downloads
            </p>
            <p className="font-display text-3xl font-bold text-suite">{totalDownloads}</p>
          </div>
          <div className="glass-panel rounded-xl p-6">
            <p className="text-xs uppercase tracking-widest text-core-muted mb-2">
              Unique users
            </p>
            <p className="font-display text-3xl font-bold text-suite">{uniqueUsers.length}</p>
          </div>
        </section>

        <section className="glass-panel rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-core-line">
            <h2 className="font-display font-semibold text-sm uppercase tracking-widest">
              Recent downloads
            </h2>
          </div>

          {recent.length === 0 ? (
            <p className="px-6 py-8 text-sm text-core-muted">No downloads recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-widest text-core-muted border-b border-core-line">
                    <th className="px-6 py-3 font-medium">User</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium">Version</th>
                    <th className="px-6 py-3 font-medium">IP</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((event) => (
                    <tr key={event.id} className="border-b border-core-line/60 last:border-0">
                      <td className="px-6 py-3 whitespace-nowrap">
                        {event.user?.name || <span className="text-core-muted">—</span>}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-core-muted">
                        {event.user?.email || "—"}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap font-mono text-xs">
                        {event.version}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap font-mono text-xs text-core-muted">
                        {event.ipAddress || "—"}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-core-muted">
                        {event.createdAt.toLocaleString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
