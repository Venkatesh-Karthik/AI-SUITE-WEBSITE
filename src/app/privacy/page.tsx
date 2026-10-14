import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-xs text-core-muted mb-10">
            Placeholder — replace with your finalized legal text before launch.
          </p>

          <div className="space-y-6 text-sm text-core-muted leading-relaxed">
            <p>
              This page describes, at a high level, the data AI Suite collects to operate
              accounts and authentication. It is not final legal copy.
            </p>
            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Data we store</h2>
              <p>
                Name, email address, and sign-in method (Google or email verification) needed
                to create and secure your account. Verification codes are hashed and never
                stored as plain text.
              </p>
            </div>
            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Data we don&apos;t store</h2>
              <p>Passwords. AI Suite doesn&apos;t use passwords.</p>
            </div>
            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Contact</h2>
              <p>Replace with a real contact method before publishing this page.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
