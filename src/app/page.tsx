import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Atmosphere } from "@/components/Atmosphere";
import { Intro } from "@/components/sections/Intro";
import { Assistants } from "@/components/sections/Assistants";
import { Features } from "@/components/sections/Features";
import { Security } from "@/components/sections/Security";
import { DownloadSection } from "@/components/sections/DownloadSection";
import { getDownloadInfo } from "@/lib/download";

export default function HomePage() {
  const info = getDownloadInfo();

  return (
    <>
      <Navbar />
      <main>
        {/* SECTION 1 — Hero */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <Atmosphere variant="hero" />
          <div className="relative mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-suite text-xs tracking-[0.3em] uppercase mb-4">
                Windows · Desktop AI
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                ONE SUITE.
                <br />
                <span className="text-suite">THREE INTELLIGENCES.</span>
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
                  className="px-6 py-3 rounded-md bg-suite text-core-bg font-display font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity shadow-[0_0_40px_-10px_rgba(78,201,192,0.6)]"
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
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-core-muted font-mono">
                <span>Windows 10 / 11</span>
                <span>Desktop Application</span>
                {info.version && <span>Version {info.version}</span>}
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
