import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/sections/Intro";
import { Assistants } from "@/components/sections/Assistants";
import { Features } from "@/components/sections/Features";
import { Security } from "@/components/sections/Security";
import { DownloadSection } from "@/components/sections/DownloadSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* SECTION 1 — Hero */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-suite text-xs tracking-[0.3em] uppercase mb-4">
                Windows · Desktop AI
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                AI SUITE
              </h1>
              <p className="mt-4 text-core-muted tracking-[0.2em] text-sm uppercase">
                JARVIS &middot; FRIDAY &middot; EDITH
              </p>
              <p className="mt-6 text-core-muted leading-relaxed max-w-md">
                A Windows AI ecosystem built around three assistants, one account, and a
                single desktop install.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/#download"
                  className="px-6 py-3 rounded-md bg-suite text-core-bg font-display font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  DOWNLOAD AI SUITE
                </a>
                <a
                  href="/#assistants"
                  className="px-6 py-3 rounded-md border border-core-line text-sm hover:border-suite/60 transition-colors"
                >
                  EXPLORE AI SUITE
                </a>
              </div>
            </div>
            <Hero />
          </div>
        </section>

        <Intro />
        <Assistants />
        <Features />
        <Security />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
