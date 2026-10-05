"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DIAGNOSIS, SURVEY as T, SURVEY_CATALOG } from "@/content";
import { unanswered, type Answers } from "@/lib/diagnosis";
import { saveSurvey } from "@/lib/survey-storage";

const QUESTIONS = SURVEY_CATALOG.questions;
const TOTAL = QUESTIONS.length;

/** Survey satu soal per layar — unit 002 (US-02, US-03). */
export function Survey() {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [missing, setMissing] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "menyimpan" | "gagal">("idle");
  const [hint, setHint] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [idx]);

  const q = QUESTIONS[idx];
  const chosen = answers[q.id];
  const isLast = idx === TOTAL - 1;
  const answeredCount = QUESTIONS.filter((x) => answers[x.id]).length;
  const percent = Math.round((answeredCount / TOTAL) * 100);
  const categoryName =
    q.category === "S" || q.category === "G" ? T.kategoriKonteks : DIAGNOSIS.kategori[q.category].nama;

  function choose(optionId: string) {
    setAnswers((a) => ({ ...a, [q.id]: optionId }));
    setHint(false);
    setMissing((m) => m.filter((id) => id !== q.id));
  }

  function goTo(i: number) {
    setHint(false);
    setIdx(i);
  }

  function next() {
    if (!chosen) {
      setHint(true);
      return;
    }
    goTo(idx + 1);
  }

  function submit() {
    if (!chosen) {
      setHint(true);
      return;
    }
    const left = unanswered(answers, QUESTIONS);
    if (left.length > 0) {
      setMissing(left);
      return;
    }
    setStatus("menyimpan");
    if (saveSurvey(answers, SURVEY_CATALOG)) {
      router.replace("/diagnosis");
    } else {
      setStatus("gagal");
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex flex-wrap items-center gap-2 text-caption text-text-secondary">
            <span className="eyebrow">{T.title}</span>
            <span>{T.meta1}</span>
          </p>
          <p className="mt-3 max-w-[56ch] text-small leading-[1.7] text-text-secondary">{T.intro}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-primary/10 px-3 py-1 text-caption font-medium text-primary">
          <span aria-hidden className="size-1.5 rounded-full bg-primary" />
          {T.badge}
        </span>
      </header>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="flex items-center gap-2.5">
            <span className="text-small font-semibold" aria-live="polite">
              {T.progress(idx + 1, TOTAL)}
            </span>
            <span className="rounded-[var(--radius-chip)] bg-bottleneck/10 px-2 py-0.5 text-caption font-medium text-bottleneck">
              {categoryName}
            </span>
          </p>
          <p className="font-mono text-caption text-text-secondary" data-tabular>
            {T.persen(percent)}
          </p>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/5"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TOTAL}
          aria-valuenow={answeredCount}
          aria-label={T.progress(idx + 1, TOTAL)}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-[var(--ease-fluid)]"
            style={{ width: `${(answeredCount / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isLast) submit();
          else next();
        }}
        className="card flex flex-col gap-6 p-5 sm:p-8"
      >
        <fieldset key={q.id} className="flex min-w-0 flex-col gap-5">
          <legend className="contents">
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="text-[length:var(--text-subhead)] leading-[1.3] outline-none"
            >
              {q.text}
            </h2>
          </legend>

          {q.bantuan ? (
            <p className="-mt-1 flex gap-2.5 rounded-[var(--radius-panel)] bg-background px-4 py-3 text-small leading-[1.65] text-text-secondary">
              <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-border font-mono text-[0.6875rem]">
                i
              </span>
              {q.bantuan}
            </p>
          ) : null}

          <div className="flex flex-col gap-2.5">
            {q.options.map((o) => {
              const selected = chosen === o.id;
              return (
                <label
                  key={o.id}
                  className={`transition-fluid flex cursor-pointer items-start gap-3 rounded-[var(--radius-panel)] border px-4 py-3.5 text-small leading-[1.6] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary ${
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-surface hover:border-text-secondary"
                  } ${o.flag ? "text-text-secondary" : ""}`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={o.id}
                    checked={selected}
                    onChange={() => choose(o.id)}
                    className="mt-1 size-4 shrink-0 accent-[var(--color-primary)]"
                  />
                  <span>{o.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {hint ? (
          <p role="alert" className="text-small font-medium text-error">
            {T.pilihDulu}
          </p>
        ) : null}

        {missing.length > 0 ? (
          <div role="alert" className="flex flex-wrap items-center gap-3 rounded-[var(--radius-panel)] border border-bottleneck-border px-4 py-3 text-small">
            <span className="text-bottleneck">{T.belumLengkap(missing.length)}</span>
            <button
              type="button"
              onClick={() => goTo(QUESTIONS.findIndex((x) => x.id === missing[0]))}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {T.keSoal}
            </button>
          </div>
        ) : null}

        {status === "gagal" ? (
          <p role="alert" className="text-small font-medium text-error">
            {T.gagalSimpan}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-5">
          <button
            type="button"
            onClick={() => goTo(idx - 1)}
            disabled={idx === 0}
            className="transition-fluid inline-flex h-12 items-center rounded-[var(--radius-control)] border border-border bg-surface px-5 font-medium hover:bg-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40"
          >
            {T.back}
          </button>
          <button
            type="submit"
            disabled={status === "menyimpan"}
            className="transition-fluid inline-flex h-12 items-center rounded-[var(--radius-control)] bg-text-primary px-7 font-semibold text-white hover:shadow-[var(--shadow-ambient)] active:scale-[0.98] disabled:opacity-60"
          >
            {status === "menyimpan" ? T.submitting : isLast ? T.submit : T.next}
          </button>
        </div>
      </form>

      <p className="text-center text-caption leading-[1.6] text-text-secondary">
        {T.belumTahuNote} {T.privasi}
      </p>
    </div>
  );
}
