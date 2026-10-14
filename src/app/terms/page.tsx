import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-xs text-core-muted mb-10">
            Placeholder — replace with your finalized legal text before launch.
          </p>
          <div className="space-y-6 text-sm text-core-muted leading-relaxed">
            <p>
              This page will govern use of the AI Suite website, account system, and Windows
              application once finalized. It is not final legal copy.
            </p>
            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Accounts</h2>
              <p>
                You&apos;re responsible for activity under your account and for keeping access
                to your email or Google account secure.
              </p>
            </div>
            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Software</h2>
              <p>Replace with real license terms for the AI Suite Windows application.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
