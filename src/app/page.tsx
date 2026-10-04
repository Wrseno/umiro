import { AppShell } from "@/components/AppShell";
import { DiagnosisLink } from "@/components/DiagnosisCta";
import { Reveal } from "@/components/Reveal";
import { LANDING as T } from "@/content";

/**
 * Landing UMIRO — Landing + Survey scope only.
 * No imports from calculator / roadmap / diagnosis.
 */

function IslandArrow() {
  return (
    <span
      aria-hidden
      className="transition-fluid grid size-8 place-items-center rounded-full bg-black/5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105"
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-3.5">
        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <AppShell>
      {/* Hero: editorial split, stacks on mobile */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_80%_10%,rgb(4_120_87/0.12),transparent_60%),radial-gradient(70%_60%_at_10%_90%,rgb(180_83_9/0.08),transparent_60%)]"
        />
        <div className="relative mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="w-full min-w-0">
              <span className="eyebrow">
                <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-bottleneck" />
                {T.eyebrow}
              </span>

              <h1 className="mt-6 max-w-[20ch] text-[length:var(--text-display)] leading-[1.08] font-bold tracking-[-0.015em]">
                {T.title}
              </h1>

              <p className="mt-6 max-w-[58ch] text-base leading-[1.75] font-normal tracking-[0.005em] text-text-secondary sm:text-body">
                {T.introLead}{" "}
                <strong className="font-semibold text-text-primary">
                  {T.introStrong}
                </strong>
                {T.introTail}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <DiagnosisLink
                  className="group transition-fluid flex items-center justify-center gap-3 rounded-full bg-text-primary py-1.5 pr-1.5 pl-6 font-semibold tracking-[0.01em] text-white hover:shadow-[var(--shadow-ambient)] active:scale-[0.98]"
                  icon={
                    <span
                      aria-hidden
                      className="transition-fluid grid size-8 shrink-0 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105"
                    >
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-3.5">
                        <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  }
                />
              </div>
              <p className="mt-4 max-w-[56ch] text-caption leading-[1.65] font-normal text-text-secondary">
                {T.reassurance}
              </p>
            </div>

            {/* Proof panel: survey example, high contrast */}
            <div className="w-full min-w-0">
              <div className="bezel">
                <div className="bezel-core panel-dark p-6 text-white sm:p-8">
                  <p className="text-[0.75rem] leading-[1.6] font-semibold tracking-[0.12em] text-white uppercase">
                    {T.proofEyebrow}
                  </p>
                  <p className="mt-3 font-mono text-[2.5rem] leading-none font-medium tracking-tight">
                    {T.proofValue}
                  </p>
                  <p className="mt-3 text-small leading-[1.7] font-normal text-white">
                    {T.proofBody}
                  </p>
                  <div className="mt-5 space-y-2 border-t border-white/25 pt-4 text-small">
                    {T.proofRows.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4">
                        <span className="text-white">{k}</span>
                        <span className="font-mono">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights: single column mobile, bento desktop */}
      <section className="border-y border-black/5 bg-surface">
        <dl className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-2 sm:px-5 md:px-8 md:py-24 lg:grid-cols-12">
          {T.sorotan.map(({ angka, label }, i) => (
            <Reveal
              key={angka}
              index={i}
              className={i === 0 ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <div className="border-t-2 border-primary/60 pt-4">
                <dt className="font-display text-[length:var(--text-subhead)] leading-[1.25] font-bold tracking-[-0.01em]">
                  {angka}
                </dt>
                <dd className="mt-1 text-small leading-[1.7] font-normal text-text-secondary">{label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Signals */}
      <section className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="eyebrow">{T.sinyalEyebrow}</p>
          <h2 className="mt-6 max-w-[24ch] text-[length:var(--text-section)] leading-[1.2] font-bold tracking-[-0.015em]">
            {T.sinyalTitle}
          </h2>
          <p className="mt-4 max-w-[64ch] text-base leading-[1.75] font-normal text-text-secondary">
            {T.sinyalBody}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {T.sinyal.map((sinyal, i) => (
            <Reveal
              key={sinyal}
              index={i}
              className={
                i === 0
                  ? "lg:col-span-4"
                  : i === 1
                    ? "lg:col-span-2"
                    : i === 2
                      ? "lg:col-span-2"
                      : i === 3
                        ? "lg:col-span-4"
                        : "lg:col-span-3"
              }
            >
              <li className="card transition-fluid h-full p-5">
                <span className="font-mono text-caption font-medium text-text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-1.5 text-small leading-[1.7] font-normal text-text-secondary">{sinyal}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Causes */}
      <section className="border-y border-black/5 bg-surface">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32">
          <Reveal>
            <p className="eyebrow">{T.fokusEyebrow}</p>
            <h2 className="mt-6 max-w-[22ch] text-[length:var(--text-section)] leading-[1.2] font-bold tracking-[-0.015em]">
              {T.fokusTitle}
            </h2>
            <p className="mt-4 max-w-[64ch] text-base leading-[1.75] font-normal text-text-secondary">
              {T.fokusBody}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:items-start">
            {T.penyebab.map(({ no, title, body }, i) =>
              i === 0 ? (
                <Reveal key={no} index={0}>
                  <div className="bezel">
                    <div className="bezel-core card-interactive p-6 sm:p-8">
                      <span className="font-mono text-caption font-medium text-text-secondary">
                        {no}
                      </span>
                      <h3 className="mt-2 text-[length:var(--text-subhead)] leading-[1.3] font-semibold tracking-[-0.01em]">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-[52ch] text-small leading-[1.7] font-normal text-text-secondary">
                        {body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ) : (
                <Reveal key={no} index={i}>
                  <div className="border-t-2 border-black/10 pt-5">
                    <span className="font-mono text-caption font-medium text-text-secondary">
                      {no}
                    </span>
                    <h3 className="mt-2 text-[0.9375rem] leading-[1.4] font-semibold tracking-[0em]">{title}</h3>
                    <p className="mt-2 text-small leading-[1.7] font-normal text-text-secondary">{body}</p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Directions: split, stacks mobile */}
      <section className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="w-full min-w-0">
              <p className="eyebrow">{T.arahEyebrow}</p>
              <h2 className="mt-6 text-[length:var(--text-section)] leading-[1.2] font-bold tracking-[-0.015em]">
                {T.arahTitle}
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-[1.75] font-normal text-text-secondary">
                {T.arahBody}
              </p>
              <DiagnosisLink
                className="group transition-fluid mt-6 inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-6 text-small font-semibold tracking-[0.01em] ring-1 ring-black/10 hover:bg-black/5 active:scale-[0.98]"
                icon={
                  <IslandArrow />
                }
              />
            </div>
          </Reveal>

          <ul className="flex w-full min-w-0 flex-col divide-y divide-black/5 border-y border-black/5">
            {T.arah.map(({ title, body }, i) => (
              <Reveal key={title} index={i}>
                <li className="flex gap-4 py-5">
                  <span
                    aria-hidden
                    className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      className="size-3.5"
                    >
                      <path
                        d="m3 8.5 3.2 3.2L13 5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[0.9375rem] leading-[1.4] font-semibold tracking-[0em]">{title}</h3>
                    <p className="mt-1 max-w-[56ch] text-small leading-[1.7] font-normal text-text-secondary">
                      {body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-[1240px] px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="bezel">
            <div className="bezel-core panel-dark relative flex flex-col items-start gap-4 overflow-hidden p-6 text-white sm:p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
              <div className="relative min-w-0">
                <h2 className="text-[length:var(--text-subhead)] leading-[1.3] font-semibold tracking-[-0.01em] text-white">
                  {T.ctaTitle}
                </h2>
                <p className="mt-2 max-w-[48ch] text-small leading-[1.7] font-normal text-white">
                  {T.ctaBody}
                </p>
              </div>
              <DiagnosisLink
                className="group transition-fluid relative inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white py-1.5 pr-1.5 pl-6 font-semibold tracking-[0.01em] text-text-primary hover:shadow-[var(--shadow-ambient)] active:scale-[0.98] sm:w-auto"
                icon={
                  <span
                    aria-hidden
                    className="transition-fluid grid size-8 shrink-0 place-items-center rounded-full bg-black/5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-3.5">
                      <path d="M3 13 13 3M5 3h8v8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                }
              />
            </div>
          </div>
        </Reveal>
      </section>
    </AppShell>
  );
}
