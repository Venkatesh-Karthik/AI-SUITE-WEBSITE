import { getDownloadInfo } from "@/lib/download";

export function DownloadSection() {
  const info = getDownloadInfo();

  return (
    <section id="download" className="relative py-28 px-6 border-t border-core-line">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-suite text-xs tracking-[0.3em] uppercase mb-3">Get AI Suite</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold">Ready to meet your AI?</h2>
        <p className="text-core-muted mt-4">Download AI Suite for Windows 10 / 11.</p>

        <div className="mt-10 flex flex-col items-center gap-4">
          {info.configured ? (
            <a
              href="/api/download"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-suite text-core-bg font-display font-semibold tracking-wide hover:opacity-90 transition-opacity"
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

          <dl className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-core-muted font-mono mt-2">
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
    </section>
  );
}
