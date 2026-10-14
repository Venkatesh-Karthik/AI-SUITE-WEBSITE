import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/SignOutButton";
import { Logo } from "@/components/Logo";
import { Atmosphere } from "@/components/Atmosphere";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/account");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { accounts: { select: { provider: true, type: true } } },
  });
  if (!user) redirect("/login?callbackUrl=/dashboard/account");

  return (
    <main className="relative min-h-screen px-6 py-24 overflow-hidden">
      <Atmosphere variant="section" />
      <div className="relative mx-auto max-w-2xl">
        <Logo size={28} className="mb-6" />
        <Link href="/dashboard" className="text-xs text-core-muted hover:text-core-text">
          ← Command Center
        </Link>
        <h1 className="font-display text-3xl font-bold mt-4 mb-8">Account settings</h1>

        <div className="glass-panel rounded-xl p-6 mb-6">
          <dl className="text-sm space-y-3">
            <div>
              <dt className="text-core-muted text-xs uppercase tracking-widest mb-1">Name</dt>
              <dd>{user.name || "Not set"}</dd>
            </div>
            <div>
              <dt className="text-core-muted text-xs uppercase tracking-widest mb-1">Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt className="text-core-muted text-xs uppercase tracking-widest mb-1">
                Linked sign-in methods
              </dt>
              <dd className="flex gap-2 mt-1">
                {user.accounts.length === 0 && <span className="text-core-muted">None</span>}
                {user.accounts.map((a) => (
                  <span
                    key={a.provider}
                    className="text-xs px-3 py-1 rounded-full border border-core-line capitalize"
                  >
                    {a.provider}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-core-muted text-xs uppercase tracking-widest mb-1">
                Account created
              </dt>
              <dd>
                {user.createdAt.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </dd>
            </div>
          </dl>
        </div>

        <SignOutButton />
      </div>
    </main>
  );
}
