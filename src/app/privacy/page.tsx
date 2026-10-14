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
          <p className="text-xs text-core-muted mb-10">Last updated: 2026</p>

          <div className="space-y-8 text-sm text-core-muted leading-relaxed">
            <p>
              This page explains, factually and at a practical level, what information the AI
              Suite website collects, why, and how it is used. It covers the website and account
              system described on this site — it is not a substitute for formal legal advice.
            </p>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">
                Information we collect
              </h2>
              <p>
                When you create an account, we store your name (if provided), email address, and
                which sign-in method you used — Google or email verification. If you sign in with
                Google, we receive the basic profile information Google provides (name, email,
                profile image). We never receive or store your Google password.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">
                Email verification codes
              </h2>
              <p>
                Signing in by email uses a one-time 6-digit code. Codes are hashed before they are
                stored, expire after a short time, and are invalidated after use or after too many
                incorrect attempts. We never store a verification code as plain text.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">
                Sessions and cookies
              </h2>
              <p>
                Signing in sets a session cookie used only to keep you signed in and to identify
                your account on protected pages such as the dashboard. It is not used for
                advertising or cross-site tracking.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Download records</h2>
              <p>
                Downloading the AI Suite installer requires signing in. Each successful,
                authenticated download creates a record containing your account, the installer
                version, the date and time, and basic request metadata (such as IP address and
                browser user agent) used for security and abuse monitoring. Unauthenticated
                download attempts are not recorded as downloads.
              </p>
              <p className="mt-2">
                The installer itself is hosted externally on Google Drive; downloading it is
                subject to Google&apos;s own terms and privacy practices once the file transfer begins.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">
                Administrator access
              </h2>
              <p>
                A single designated administrator account can view download records (account,
                version, and timestamp) to monitor usage and detect abuse. This access is
                restricted server-side to one specific, pre-configured account. Ordinary user
                accounts cannot view other users&apos; download records.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Data we don&apos;t store</h2>
              <p>
                Passwords — AI Suite doesn&apos;t use passwords. We also do not collect payment
                information, precise location, or contacts, and we do not sell personal
                information.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Service providers</h2>
              <p>
                We use Google for optional sign-in, Resend for delivering email verification codes,
                and a managed database provider to store account and download records. Each
                provider processes only the data necessary to perform its function.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Data retention</h2>
              <p>
                Account information is retained for as long as your account exists. Verification
                codes are short-lived and expire automatically. Download records are retained for
                administrator monitoring purposes. You can request deletion of your account and
                associated data using the contact details below.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Contact</h2>
              <p>
                Questions about this policy or your data can be sent to{" "}
                <a href="mailto:phaneendhra2508@gmail.com" className="text-suite hover:underline">
                  phaneendhra2508@gmail.com
                </a>{" "}
                or by phone at{" "}
                <a href="tel:+919948774217" className="text-suite hover:underline">
                  +91 9948774217
                </a>
                .
              </p>
            </div>

            <p className="text-xs text-core-muted/70">
              This policy describes AI Suite&apos;s actual current practices. It does not claim
              compliance with any specific regulatory framework or certification.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
