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
          <p className="text-xs text-core-muted mb-10">Last updated: 2026</p>

          <div className="space-y-8 text-sm text-core-muted leading-relaxed">
            <p>
              These terms govern use of the AI Suite website, its account system, and the AI
              Suite Windows desktop application (JARVIS, FRIDAY, and EDITH). By using this site or
              downloading AI Suite, you agree to these terms.
            </p>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Accounts</h2>
              <p>
                You can create an account with Google sign-in or by verifying your email address
                with a one-time code. You&apos;re responsible for activity under your account and for
                keeping access to your email or Google account secure. Do not share your
                verification codes with anyone.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Downloading AI Suite</h2>
              <p>
                Downloading the AI Suite installer requires a signed-in account. The installer is
                hosted externally on Google Drive; clicking Download on this site verifies your
                session and then redirects you to that external file. We do not host or transmit
                the installer file through this website&apos;s own servers, and we are not responsible
                for Google Drive&apos;s availability, download experience, or any warnings your browser
                or Google Drive may show for large executable files.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Acceptable use</h2>
              <p>
                Don&apos;t attempt to bypass account authentication, access another user&apos;s account or
                download records, abuse the sign-in or verification-code system, or use the
                website or application for unlawful purposes.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Software</h2>
              <p>
                AI Suite is provided for your personal use on Windows 10/11. Individual assistants
                (JARVIS, FRIDAY, EDITH) may be at different stages of development, and features
                described on this site reflect the current state of the application, which may
                change between versions.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">
                Intellectual property
              </h2>
              <p>
                The AI Suite name, branding, logo, and application are the property of their
                developer. You may install and use the application for personal use; you may not
                redistribute, resell, or reverse engineer it without permission.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">
                Disclaimer &amp; limitation
              </h2>
              <p>
                This website and the AI Suite application are provided &quot;as is,&quot; without
                warranties of any kind, express or implied. AI Suite is an independently developed
                project and is not liable for indirect or consequential damages arising from use
                of the website or application, to the maximum extent permitted by law.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Changes</h2>
              <p>
                These terms may be updated as the website and application evolve. Continued use
                after changes take effect constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-core-text font-display font-semibold mb-2">Contact</h2>
              <p>
                Questions about these terms can be sent to{" "}
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
