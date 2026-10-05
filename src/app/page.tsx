import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { DiagnosisLink } from "@/components/DiagnosisCta";
import { Reveal } from "@/components/Reveal";
import { LANDING as T } from "@/content";

/**
 * Landing UMIRO — iterasi 2, susunan bebas.
 * Landing + Survey scope only. No imports from calculator / roadmap / diagnosis.
 */

function IslandArrow({ light = false }: { light?: boolean }) {
  return (
    <span
      aria-hidden
      className={`transition-fluid grid size-8 shrink-0 place-items-center rounded-full transition-transform group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105 ${
        light ? "bg-black/10" : "bg-white/15"
      }`}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-3.5">
        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="size-3.5"
    >
      <path d="m3 8.5 3.2 3.2L13 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <AppShell>
      {/* Hero: centered, proof as horizontal strip */}
      <section className="panel-dark relative overflow-hidden text-white">
        <div className="relative mx-auto w-full max-w-[900px] px-4 pt-16 pb-10 text-center sm:px-5 sm:pt-24 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-gold-soft">
              <span aria-hidden className="h-0.5 w-7 shrink-0 bg-gold" />
              {T.eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-[18ch] text-[length:var(--text-display)] leading-[1.06] font-bold tracking-[-0.035em] text-white">
              {T.title}
            </h1>
            <p className="mx-auto mt-6 max-w-[60ch] text-base leading-[1.75] font-normal text-[#dcebf7] sm:text-lg">
              {T.introLead}{" "}
              <strong className="font-semibold text-gold-soft">{T.introStrong}</strong>
              {T.introTail}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DiagnosisLink
                className="group transition-fluid inline-flex items-center justify-center gap-3 rounded-[10px] bg-gold py-1.5 pr-1.5 pl-6 font-extrabold tracking-[0.01em] text-gold-ink hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgb(226_180_75/0.28)] active:scale-[0.98]"
                icon={<IslandArrow light />}
              />
            </div>
            <p className="mx-auto mt-4 max-w-[60ch] text-caption leading-[1.65] text-[#b7cfdf]">
              {T.reassurance}
            </p>
          </Reveal>
        </div>

        {/* Proof strip: horizontal, attached to hero bottom */}
        <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-14 sm:px-5 md:px-8">
          <Reveal index={1}>
            <div className="grid grid-cols-1 gap-6 rounded-[20px] border border-white/20 bg-white p-6 text-left text-ink sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[0.75rem] font-extrabold tracking-[0.13em] text-ocean uppercase">
                  {T.proofEyebrow}
                </p>
                <p className="mt-2 font-display text-[2.75rem] leading-none font-bold text-navy">
                  {T.proofValue}
                </p>
                <p className="mt-2 max-w-[44ch] text-small leading-[1.7] text-slate">
                  {T.proofBody}
                </p>
              </div>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {T.proofRows.map(([k, v]) => (
                  <div key={k} className="rounded-[12px] bg-paper p-4">
                    <dt className="text-caption leading-[1.6] text-slate">{k}</dt>
                    <dd className="mt-1 font-mono text-small font-bold text-navy">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats: minimal dividers, gold top rule */}
      <section className="mx-auto w-full max-w-[1240px] px-4 py-12 sm:px-5 md:px-8">
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {T.sorotan.map(({ angka, label }, i) => (
            <Reveal key={angka} index={i}>
              <div className="border-t-[3px] border-gold pt-4">
                <dt className="font-display text-[1.75rem] leading-none font-bold text-navy">
                  {angka}
                </dt>
                <dd className="mt-2 text-small leading-[1.65] text-slate">{label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Steps: vertical timeline */}
      <section className="mx-auto w-full max-w-[900px] px-4 py-14 sm:px-5 md:px-8">
        <Reveal>
          <p className="kicker text-center">{T.langkahEyebrow}</p>
          <h2 className="mt-2 text-center text-[length:var(--text-section)] leading-[1.15] font-bold tracking-[-0.025em] text-navy">
            {T.langkahTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-[56ch] text-center text-base leading-[1.75] text-slate">
            {T.langkahBody}
          </p>
        </Reveal>
        <ol className="relative mt-10 space-y-0 border-l-2 border-line pl-0">
          {T.langkah.map(({ no, title, body }, i) => (
            <Reveal key={no} index={i}>
              <li className="relative flex gap-5 pb-8 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className="absolute top-0 -left-[21px] grid size-10 place-items-center rounded-full bg-navy font-mono text-small font-bold text-gold-soft ring-4 ring-background"
                >
                  {no}
                </span>
                <div className="card flex-1 p-6">
                  <h3 className="text-[1.2rem] leading-[1.3] font-bold text-navy">{title}</h3>
                  <p className="mt-2 max-w-[60ch] text-small leading-[1.7] text-slate">{body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Signals: ghost numbers, editorial list */}
      <section className="border-y border-line bg-paper">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="kicker">{T.sinyalEyebrow}</p>
            <h2 className="mt-2 max-w-[20ch] text-[length:var(--text-section)] leading-[1.15] font-bold tracking-[-0.025em] text-navy">
              {T.sinyalTitle}
            </h2>
            <p className="mt-3 max-w-[60ch] text-base leading-[1.75] text-slate">
              {T.sinyalBody}
            </p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
            {T.sinyal.map((sinyal, i) => (
              <Reveal key={sinyal} index={i}>
                <li className="relative flex gap-5 overflow-hidden border-b border-line py-6">
                  <span
                    aria-hidden
                    className="font-display text-[2.5rem] leading-none font-bold text-navy/10 select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[52ch] self-center text-small leading-[1.7] text-ink">
                    {sinyal}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Causes: dark full-bleed, glass cards */}
      <section className="panel-dark text-white">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="text-[0.75rem] font-black tracking-[0.12em] text-gold-soft uppercase">
              {T.fokusEyebrow}
            </p>
            <h2 className="mt-2 max-w-[22ch] text-[length:var(--text-section)] leading-[1.15] font-bold tracking-[-0.025em] text-white">
              {T.fokusTitle}
            </h2>
            <p className="mt-3 max-w-[60ch] text-base leading-[1.75] text-[#d9e9f5]">
              {T.fokusBody}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {T.penyebab.map(({ no, title, body }, i) => (
              <Reveal key={no} index={i}>
                <div className="h-full rounded-[18px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur-sm">
                  <span className="font-mono text-caption font-bold text-gold-soft">{no}</span>
                  <h3 className="mt-2 text-[1.25rem] leading-[1.3] font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-small leading-[1.7] text-[#c6d9e8]">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Directions: bento — first card wide with CTA */}
      <section className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-24 md:px-8">
        <Reveal>
          <p className="kicker">{T.arahEyebrow}</p>
          <h2 className="mt-2 text-[length:var(--text-section)] leading-[1.15] font-bold tracking-[-0.025em] text-navy">
            {T.arahTitle}
          </h2>
          <p className="mt-3 max-w-[60ch] text-base leading-[1.75] text-slate">
            {T.arahBody}
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {T.arah.map(({ title, body }, i) => (
            <Reveal key={title} index={i} className={i === 0 ? "lg:col-span-2" : ""}>
              <div
                className={`card flex h-full gap-4 p-6 sm:p-7 ${
                  i === 0 ? "border-t-4 border-t-gold" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-black text-white"
                >
                  <CheckIcon />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.15rem] leading-[1.35] font-bold text-navy">{title}</h3>
                  <p className="mt-1.5 max-w-[56ch] text-small leading-[1.7] text-slate">
                    {body}
                  </p>
                  {i === 0 ? (
                    <DiagnosisLink
                      className="group transition-fluid mt-5 inline-flex items-center gap-3 rounded-[10px] bg-navy py-1.5 pr-1.5 pl-5 text-small font-extrabold text-white hover:-translate-y-0.5 active:scale-[0.98]"
                      icon={<IslandArrow />}
                    />
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tools: split with accent bars */}
      <section className="border-t border-line bg-alt">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-20 md:px-8">
          <Reveal>
            <p className="kicker">{T.lanjutEyebrow}</p>
            <h2 className="mt-2 text-[length:var(--text-section)] leading-[1.15] font-bold tracking-[-0.025em] text-navy">
              {T.lanjutTitle}
            </h2>
            <p className="mt-3 max-w-[62ch] text-base leading-[1.75] text-slate">
              {T.lanjutBody}
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {T.lanjut.map(({ title, body, href, label }, i) => (
              <Reveal key={title} index={i}>
                <div
                  className={`card flex h-full flex-col overflow-hidden p-0 ${
                    i === 0 ? "" : ""
                  }`}
                >
                  <div aria-hidden className={`h-1.5 w-full ${i === 0 ? "bg-gold" : "bg-navy"}`} />
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-[1.3rem] leading-[1.3] font-bold text-navy">{title}</h3>
                    <p className="mt-2 flex-1 text-small leading-[1.7] text-slate">{body}</p>
                    <Link
                      href={href}
                      className={`group transition-fluid mt-6 inline-flex w-fit items-center gap-3 rounded-[10px] py-1.5 pr-1.5 pl-5 text-small font-extrabold hover:-translate-y-0.5 active:scale-[0.98] ${
                        i === 0
                          ? "bg-gold text-gold-ink hover:shadow-[0_12px_25px_rgb(226_180_75/0.28)]"
                          : "bg-navy text-white"
                      }`}
                    >
                      {label}
                      <IslandArrow light={i === 0} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Limits: compact inline */}
      <section className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-20 md:px-8">
        <Reveal>
          <div className="max-w-[640px]">
            <p className="kicker">{T.batasEyebrow}</p>
            <h2 className="mt-2 text-[length:var(--text-section)] leading-[1.15] font-bold tracking-[-0.025em] text-navy">
              {T.batasTitle}
            </h2>
            <p className="mt-3 text-base leading-[1.75] text-slate">{T.batasBody}</p>
          </div>
        </Reveal>
        <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {T.batas.map(({ title, body }, i) => (
            <Reveal key={title} index={i}>
              <li className="flex h-full gap-3 rounded-[14px] border border-line bg-white p-5">
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-error/10 text-[0.8rem] font-black text-error"
                >
                  ✕
                </span>
                <div>
                  <h3 className="text-small leading-[1.5] font-bold text-navy">{title}</h3>
                  <p className="mt-1 text-small leading-[1.65] text-slate">{body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA: centered narrow */}
      <section className="mx-auto w-full max-w-[1240px] px-4 pb-16 sm:px-5 sm:pb-24 md:px-8">
        <Reveal>
          <div className="panel-dark mx-auto max-w-[760px] rounded-[24px] p-8 text-center text-white shadow-[var(--shadow-institutional)] sm:p-12">
            <h2 className="mx-auto max-w-[18ch] text-[1.9rem] leading-[1.2] font-bold tracking-[-0.01em] text-white">
              {T.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-[48ch] text-small leading-[1.7] text-[#d9e9f5]">
              {T.ctaBody}
            </p>
            <div className="mt-7 flex justify-center">
              <DiagnosisLink
                className="group transition-fluid inline-flex items-center justify-center gap-3 rounded-[10px] bg-gold py-1.5 pr-1.5 pl-6 font-extrabold tracking-[0.01em] text-gold-ink hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgb(226_180_75/0.28)] active:scale-[0.98]"
                icon={<IslandArrow light />}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </AppShell>
  );
}
