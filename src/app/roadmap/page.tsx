import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Reveal } from "@/components/Reveal";
import { ROADMAP as T, type LeverKey } from "@/content";

export const metadata: Metadata = {
  title: T.meta.title,
  description: T.meta.description,
};

const LEVER_ORDER: LeverKey[] = ["margin", "retensi", "jangkauan", "kapasitas"];

/**
 * Roadmap statis — unit 005 (US-06). Baca-saja: tanpa state, tanpa
 * personalisasi; `/roadmap` dan `/roadmap#<tahap>` merender konten sama.
 */
export default function RoadmapPage() {
  const itemId = (tahap: string, i: number) => `${tahap}-${i + 1}`;
  return (
    <AppShell>
      <div className="pt-6">
        <section className="panel-dark text-white">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-4 py-10 sm:px-5 md:px-8 md:py-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[64ch]">
              <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.12em] uppercase ring-1 ring-white/20">
                {T.eyebrow}
              </p>
              <h1 className="mt-5 text-[length:var(--text-section)] text-white">{T.title}</h1>
              <p className="mt-3 text-white/85">{T.intro}</p>
            </div>
            <p className="max-w-[44ch] rounded-[var(--radius-panel)] bg-white/10 px-4 py-3 text-small leading-[1.65] text-white/90 ring-1 ring-white/15">
              {T.catatan}
            </p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 px-4 py-10 sm:px-5 md:px-8 md:py-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
          <nav aria-label={T.tocLabel} className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto">
            <p className="overline">{T.tocLabel}</p>
            <ol className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-4">
              {T.tahap.map((t, ti) => (
                <li key={t.id} className="rounded-full border border-border bg-surface px-4 py-2 lg:rounded-[var(--radius-card)] lg:p-4">
                  <a href={`#${t.id}`} className="flex items-center gap-2.5 font-semibold hover:text-primary">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-text-primary font-mono text-caption text-white">
                      {ti + 1}
                    </span>
                    {t.nama}
                  </a>
                  <ol className="mt-3 hidden flex-col gap-1.5 border-l border-border pl-3 text-small lg:flex">
                    {t.items.map((item, i) => (
                      <li key={item.judul}>
                        <a href={`#${itemId(t.id, i)}`} className="block leading-[1.45] text-text-secondary hover:text-text-primary">
                          {item.judul}
                        </a>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex min-w-0 flex-col gap-16">
            <section aria-labelledby="lever-title">
              <h2 id="lever-title" className="overline">
                {T.leverTitle}
              </h2>
              <p className="mt-2 max-w-[64ch] text-small text-text-secondary">{T.leverIntro}</p>
              <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {LEVER_ORDER.map((key) => (
                  <li key={key} className="border-t-2 border-primary/60 pt-3">
                    <p className="text-[0.9375rem] font-semibold">{T.levers[key].nama}</p>
                    <p className="mt-1 text-small text-text-secondary">{T.levers[key].tanya}</p>
                  </li>
                ))}
              </ul>
            </section>

            {T.tahap.map((t, ti) => (
              <section key={t.id} id={t.id} aria-labelledby={`${t.id}-title`} className="scroll-mt-28">
                <header className="rounded-[var(--radius-card)] border border-bottleneck-border bg-bottleneck/5 p-5 sm:p-6">
                  <span className="font-mono text-caption text-text-secondary">
                    {String(ti + 1).padStart(2, "0")} / {String(T.tahap.length).padStart(2, "0")}
                  </span>
                  <h2 id={`${t.id}-title`} className="mt-1 text-[length:var(--text-section)]">
                    {t.nama}
                  </h2>
                  <p className="mt-2 max-w-[60ch] text-text-secondary">{t.fokus}</p>
                </header>

                <ol className="mt-5 flex flex-col gap-4">
                  {t.items.map((item, i) => (
                    <Reveal key={item.judul} index={i}>
                      <li id={itemId(t.id, i)} className="card scroll-mt-28 p-5 sm:p-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                          <h3 className="flex items-baseline gap-3 text-[1.0625rem]">
                            <span className="font-mono text-caption text-text-secondary">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {item.judul}
                          </h3>
                          <span className="rounded-[var(--radius-chip)] bg-primary/10 px-2 py-0.5 text-caption font-medium text-primary">
                            <span className="sr-only">{T.leverLabel}: </span>
                            {T.levers[item.lever].nama}
                          </span>
                        </div>
                        <p className="mt-2 max-w-[68ch] text-small text-text-secondary">{item.cara}</p>
                        <p className="mt-3 max-w-[68ch] border-l-2 border-bottleneck-border pl-3 text-small">
                          <span className="font-semibold">{T.contohLabel}: </span>
                          {item.contoh}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </section>
            ))}

            <div className="bezel">
              <div className="bezel-core panel-dark flex flex-col items-start gap-4 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 className="text-[length:var(--text-subhead)] text-white">{T.penutup.title}</h2>
                  <p className="mt-2 max-w-[48ch] text-small">{T.penutup.body}</p>
                </div>
                <Link
                  href={T.penutup.href}
                  className="transition-fluid inline-flex h-12 shrink-0 items-center rounded-full bg-white px-6 font-semibold text-text-primary hover:shadow-[var(--shadow-ambient)] active:scale-[0.98]"
                >
                  {T.penutup.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
