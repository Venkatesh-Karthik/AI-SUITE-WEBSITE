import { getDownloadInfo } from "@/lib/download";
import { Atmosphere } from "@/components/Atmosphere";
import { AppWindowPreview } from "@/components/AppWindowPreview";

export function DownloadSection() {
  const info = getDownloadInfo();

  return (
    <section id="download" className="relative py-28 px-6 border-t border-core-line overflow-hidden">
      <Atmosphere variant="section" />
      <div className="relative mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <p className="text-suite text-xs tracking-[0.3em] uppercase mb-3">Get AI Suite</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">AI SUITE</h2>
          <p className="text-core-muted mt-2 tracking-[0.2em] uppercase text-xs">
            Windows Desktop Application
          </p>
          <p className="text-core-muted mt-4">Ready to meet your AI?</p>

          <div className="mt-8 flex flex-col items-center md:items-start gap-4">
            {info.configured ? (
              <a
                href="/api/download"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-suite text-core-bg font-display font-semibold tracking-wide hover:opacity-90 transition-opacity shadow-[0_0_40px_-8px_rgba(78,201,192,0.65)]"
              >
                DOWNLOAD AI SUITE
              </a>
            ) : (
              <div className="glass-panel rounded-md px-6 py-4 text-sm text-core-muted max-w-md">
                The installer isn&apos;t configured yet. Set{" "}
                <code className="font-mono text-core-text">DOWNLOAD_URL</code> in your environment
                to enable this button.
              </div>
            )}

            <dl className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-xs text-core-muted font-mono mt-2">
              <div>
                <dt className="inline text-core-muted/70">OS </dt>
                <dd className="inline">Windows 10 / 11</dd>
              </div>
              {info.version && (
                <div>
                  <dt className="inline text-core-muted/70">Version </dt>
                  <dd className="inline">{info.version}</dd>
                </div>
              )}
              {info.sizeMb && (
                <div>
                  <dt className="inline text-core-muted/70">Size </dt>
                  <dd className="inline">{info.sizeMb} MB</dd>
                </div>
              )}
              {info.releaseDate && (
                <div>
                  <dt className="inline text-core-muted/70">Released </dt>
                  <dd className="inline">{info.releaseDate}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-suite/15 blur-[100px]" />
          </div>
          <AppWindowPreview compact className="mx-auto max-w-sm animate-float" />
        </div>
      </div>
    </section>
  );
}
