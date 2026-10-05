"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { DIAGNOSIS as T, SURVEY_CATALOG, type CategoryKey } from "@/content";
import { CATEGORY_ORDER, type DiagnosisResult } from "@/lib/diagnosis";
import { formatTanggal } from "@/lib/format";
import { loadSurvey, type LoadSurvey } from "@/lib/survey-storage";

const noopSubscribe = () => () => {};

const questionById = new Map(SURVEY_CATALOG.questions.map((q) => [q.id, q]));
const optionLabel = (qid: string, oid: string) =>
  questionById.get(qid)?.options.find((o) => o.id === oid)?.label ?? "";

/**
 * Diagnosis — unit 003 (US-04). Server + hidrasi merender kerangka netral;
 * hasil dibaca dari `localStorage` setelah hidrasi dan DIHITUNG ULANG dari
 * jawaban (ADR-003, ADR-004).
 */
export function Diagnosis() {
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  if (!hydrated) return <Skeleton />;
  return <DiagnosisView loaded={loadSurvey(SURVEY_CATALOG)} />;
}

const CONTAINER = "mx-auto w-full max-w-[1240px] px-4 sm:px-5 md:px-8";

function Skeleton() {
  return (
    <div aria-hidden>
      <div className="panel-dark h-56" />
      <div className={`${CONTAINER} grid grid-cols-1 gap-8 py-10 lg:grid-cols-[320px_1fr]`}>
        <div className="h-80 animate-pulse rounded-[var(--radius-card)] bg-black/5" />
        <div className="h-80 animate-pulse rounded-[var(--radius-card)] bg-black/5" />
      </div>
    </div>
  );
}

function DiagnosisView({ loaded }: { loaded: LoadSurvey }) {
  if (loaded.status !== "ok") {
    return (
      <div className={`${CONTAINER} grid min-h-[62dvh] place-items-center py-16`}>
        <section className="card flex w-full max-w-[460px] flex-col items-center gap-4 p-8 text-center">
          <span aria-hidden className="grid size-14 place-items-center rounded-[var(--radius-card)] bg-bottleneck/10">
            <span className="grid size-7 place-items-center rounded-full border-2 border-bottleneck">
              <span className="size-2.5 rounded-full bg-bottleneck" />
            </span>
          </span>
          {loaded.status === "rusak" ? (
            <p role="status" className="rounded-[var(--radius-panel)] border border-bottleneck-border px-4 py-3 text-small text-bottleneck">
              {T.rusak}
            </p>
          ) : null}
          <h1 className="text-[length:var(--text-subhead)]">{T.kosong.title}</h1>
          <p className="max-w-[44ch] text-small leading-[1.7] text-text-secondary">{T.kosong.body}</p>
          <Link
            href={T.kosong.href}
            className="transition-fluid mt-2 inline-flex h-12 items-center rounded-full bg-text-primary px-7 font-semibold text-white hover:shadow-[var(--shadow-ambient)] active:scale-[0.98]"
          >
            {T.kosong.cta}
          </Link>
        </section>
      </div>
    );
  }

  const { result, savedAt } = loaded;
  const focus: CategoryKey[] =
    result.outcome.kind === "tunggal" ? [result.outcome.category] : result.outcome.areas;

  return (
    <>
      <HeaderBand result={result} savedAt={savedAt} />

      <div className={`${CONTAINER} grid grid-cols-1 gap-10 py-10 md:py-14 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12`}>
        <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <Indicators result={result} focus={focus} />
          </div>
          <Context result={result} />
        </aside>

        <div className="flex min-w-0 flex-col gap-10">
          <Steps focus={focus} />
          <Reasons result={result} focus={focus} />
          <p className="border-t border-black/5 pt-6 text-caption leading-[1.6] text-text-secondary">
            {T.indikatif}
          </p>
        </div>
      </div>
    </>
  );
}

function HeaderBand({ result, savedAt }: { result: DiagnosisResult; savedAt: string }) {
  const o = result.outcome;
  return (
    <section aria-labelledby="hasil-utama" className="panel-dark text-white">
      <div className={`${CONTAINER} flex flex-col gap-8 py-10 md:py-14 lg:flex-row lg:items-end lg:justify-between`}>
        <div className="min-w-0">
          <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.12em] uppercase ring-1 ring-white/20">
            {T.eyebrow}
          </p>
          {o.kind === "tunggal" ? (
            <>
              <p className="mt-5 text-small text-white/80">{T.tunggal.label}</p>
              <h1 id="hasil-utama" className="mt-1 text-[length:var(--text-headline)] leading-[1.05] text-white">
                {T.kategori[o.category].nama}
              </h1>
              <p className="mt-4 max-w-[60ch] text-white/90">{T.kategori[o.category].kenapa}</p>
            </>
          ) : (
            <>
              <h1 id="hasil-utama" className="mt-5 text-[length:var(--text-headline)] leading-[1.05] text-white">
                {T.belumJelas.title}
              </h1>
              <p className="mt-4 max-w-[60ch] text-white/90">
                {o.reason === "data" ? T.belumJelas.data : T.belumJelas.selisih}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {o.areas.map((k) => (
                  <li key={k} className="rounded-full bg-white/12 px-4 py-1.5 text-small font-semibold ring-1 ring-white/25">
                    {T.kategori[k].nama}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
          <Link
            href="/survey"
            className="transition-fluid inline-flex h-11 items-center rounded-full bg-white px-5 text-small font-semibold text-text-primary hover:shadow-[var(--shadow-ambient)] active:scale-[0.98]"
          >
            {T.ulang}
          </Link>
          <span className="text-caption text-white/70">{T.ulangNote}</span>
          <span className="text-caption text-white/70">{T.disimpan(formatTanggal(savedAt))}</span>
        </div>
      </div>
    </section>
  );
}

function Indicators({ result, focus }: { result: DiagnosisResult; focus: CategoryKey[] }) {
  return (
    <section aria-labelledby="indikator-title">
      <h2 id="indikator-title" className="overline">
        {T.indikatorTitle}
      </h2>
      <p className="mt-2 text-small text-text-secondary">{T.indikatorNote}</p>
      <ul className="mt-5 flex flex-col gap-5">
        {CATEGORY_ORDER.map((k) => {
          const s = result.scores.find((x) => x.key === k)!;
          const isFocus = focus.includes(k);
          return (
            <li key={k}>
              <div className="flex items-baseline justify-between gap-4">
                <p className={`text-small ${isFocus ? "font-semibold" : "font-medium"}`}>{T.kategori[k].nama}</p>
                <p className="font-mono text-small" data-tabular>
                  {s.insufficient || s.score === null ? T.belumJelas.kurangData : s.score}
                </p>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/5">
                {!s.insufficient && s.score !== null ? (
                  <div
                    className={`h-full rounded-full ${isFocus ? "bg-bottleneck" : "bg-text-secondary/50"}`}
                    style={{ width: `${Math.max(s.score, 2)}%` }}
                  />
                ) : (
                  <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent_0_6px,rgb(16_44_34/0.12)_6px_12px)]" />
                )}
              </div>
              <p className="mt-1.5 text-caption text-text-secondary">{T.kategori[k].arti}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Reasons({ result, focus }: { result: DiagnosisResult; focus: CategoryKey[] }) {
  return (
    <section aria-labelledby="alasan-title">
      <h2 id="alasan-title" className="overline">
        {T.alasanTitle}
      </h2>
      <div className="mt-4 flex flex-col gap-5">
        {focus.map((k) => {
          const drivers = result.drivers[k];
          return (
            <div key={k}>
              {focus.length > 1 ? <p className="text-small font-semibold">{T.kategori[k].nama}</p> : null}
              {drivers.length === 0 ? (
                <p className="mt-1 text-small text-text-secondary">{T.alasanKosong}</p>
              ) : (
                <ul className="mt-2 flex flex-col gap-2.5">
                  {drivers.map((d) => (
                    <li key={d.questionId} className="border-l-2 border-bottleneck-border pl-3 text-small">
                      <p className="text-text-secondary">{questionById.get(d.questionId)?.text}</p>
                      <p className="mt-0.5 font-medium">
                        {d.flag ? T.belumTahu : optionLabel(d.questionId, d.optionId)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Steps({ focus }: { focus: CategoryKey[] }) {
  // Maksimal dua langkah (AC-04-07): dua dari satu area, atau satu per area.
  const steps = focus.length === 1
    ? T.kategori[focus[0]].langkah.map((l) => ({ ...l, k: focus[0] }))
    : focus.map((k) => ({ ...T.kategori[k].langkah[0], k }));

  return (
    <section aria-labelledby="langkah-title">
      <h2 id="langkah-title" className="overline">
        {T.langkahTitle}
      </h2>
      <ol className="mt-4 flex flex-col gap-3">
        {steps.map((s) => (
          <li key={s.judul} className="card p-5">
            <h3 className="text-[1rem]">{s.judul}</h3>
            <p className="mt-1.5 text-small text-text-secondary">{s.cara}</p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-small font-medium">
              <Link href={T.kategori[s.k].roadmap.href} className="text-primary underline-offset-4 hover:underline">
                {T.kategori[s.k].roadmap.label}
              </Link>
              {T.kategori[s.k].kalkulator ? (
                <Link href="/kalkulator" className="text-primary underline-offset-4 hover:underline">
                  {T.kalkulatorCta}
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-caption text-text-secondary">{T.langkahNote}</p>
    </section>
  );
}

function Context({ result }: { result: DiagnosisResult }) {
  if (result.context.length === 0) return null;
  return (
    <section aria-labelledby="konteks-title" className="rounded-[var(--radius-card)] border border-border p-5">
      <h2 id="konteks-title" className="overline">
        {T.konteksTitle}
      </h2>
      <p className="mt-1 text-caption text-text-secondary">{T.konteksNote}</p>
      <dl className="mt-4 flex flex-col gap-4">
        {result.context.map((c) => (
          <div key={c.questionId}>
            <dt className="text-caption text-text-secondary">{questionById.get(c.questionId)?.text}</dt>
            <dd className="mt-0.5 text-small font-medium">{optionLabel(c.questionId, c.optionId)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
