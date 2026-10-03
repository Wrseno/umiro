"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/questions";
import {
  KEY_ANSWERS,
  KEY_DIAGNOSIS,
  parseSession,
  useSessionRaw,
  writeSession,
} from "@/lib/sessionStore";
import type { Answers } from "@/lib/types";

/**
 * Halaman Survei — US-01.
 *
 * Tanpa tombol Lewati; tombol Lanjut tidak aktif sampai ada jawaban
 * (AC-SVY-04). Ketidaktahuan ditampung sebagai pilihan jawaban yang sah,
 * bukan sebagai jawaban kosong (AC-SVY-05).
 *
 * Jawaban dan posisi pertanyaan disimpan pada penyimpanan sesi setiap kali
 * berubah. Ini penting karena tab langkah di bagian atas memungkinkan
 * pengguna berpindah halaman di tengah pengisian; tanpa penyimpanan,
 * jawabannya akan hilang begitu dia menengok ke Kalkulator.
 */

interface Draft {
  answers: Answers;
  index: number;
}

export default function SurveyPage() {
  const router = useRouter();
  const raw = useSessionRaw(KEY_ANSWERS);
  const draft = useMemo<Draft>(
    () => parseSession<Draft>(raw) ?? { answers: {}, index: 0 },
    [raw],
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const liveRegion = useRef<HTMLParagraphElement>(null);

  const index = Math.min(draft.index, TOTAL_QUESTIONS - 1);
  const question = QUESTIONS[index];
  const selected = draft.answers[question.id];
  const isLast = index === TOTAL_QUESTIONS - 1;
  const answeredCount = Object.keys(draft.answers).length;
  const progress = ((index + 1) / TOTAL_QUESTIONS) * 100;

  const goTo = useCallback(
    (next: number) => writeSession(KEY_ANSWERS, { ...draft, index: next }),
    [draft],
  );

  const handleNext = useCallback(async () => {
    if (!selected) return;
    if (!isLast) {
      goTo(index + 1);
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      // Skor, tahap, dan titik mentok dihitung di peladen — bukan di sini —
      // agar hasilnya tidak dapat diubah dari peramban.
      const response = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: draft.answers }),
      });
      if (!response.ok) throw new Error(String(response.status));
      writeSession(KEY_DIAGNOSIS, JSON.parse(await response.text()));
      router.push("/diagnosis");
    } catch {
      setSubmitting(false);
      setError(
        "Hasilnya belum bisa dihitung. Periksa sambungan internet Anda, lalu coba lagi.",
      );
    }
  }, [draft.answers, goTo, index, isLast, router, selected]);

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-xl flex-col px-5 py-8">
        {/* ── Progres ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={TOTAL_QUESTIONS}
            aria-label="Kemajuan pengisian survei"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-small tabular-nums text-text-secondary">
            {index + 1} / {TOTAL_QUESTIONS}
          </span>
        </div>

        {/* ── Pertanyaan ───────────────────────────────────────────── */}
        <div className="mt-9">
          <p className="overline">{question.eyebrow}</p>
          <h1 className="mt-3 text-[length:var(--text-subhead)]">
            {question.text}
          </h1>
          <p className="mt-3 rounded-[var(--radius-panel)] border border-border bg-surface px-4 py-3 text-small text-text-secondary">
            {question.helper}
          </p>

          <fieldset className="mt-6 flex flex-col gap-3">
            <legend className="sr-only">{question.text}</legend>
            {question.options.map((option) => {
              const checked = selected === option.id;
              return (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-card)] border bg-surface px-4 py-4 transition-colors ${
                    checked
                      ? "border-primary ring-3 ring-primary/12"
                      : "border-border hover:border-neutral"
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.id}
                    checked={checked}
                    onChange={() => {
                      writeSession(KEY_ANSWERS, {
                        ...draft,
                        answers: { ...draft.answers, [question.id]: option.id },
                      });
                      if (liveRegion.current) {
                        liveRegion.current.textContent = `${option.label} dipilih`;
                      }
                    }}
                    className="size-5 shrink-0 accent-primary"
                  />
                  <span className="text-body">{option.label}</span>
                </label>
              );
            })}
          </fieldset>
          <p ref={liveRegion} aria-live="polite" className="sr-only" />
        </div>

        {/* ── Kendali ──────────────────────────────────────────────── */}
        <div className="mt-8 flex gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={() => goTo(Math.max(0, index - 1))}
            disabled={index === 0}
            className="h-11 flex-1 rounded-[var(--radius-control)] border border-border bg-surface px-5 text-small font-medium transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface"
          >
            ‹ Kembali
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!selected || submitting}
            className="h-11 flex-1 rounded-[var(--radius-control)] bg-primary px-5 text-small font-medium text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-neutral"
          >
            {submitting ? "Menghitung…" : isLast ? "Lihat Hasil" : "Lanjut ›"}
          </button>
        </div>

        {error ? (
          <p
            role="alert"
            className="mt-3 rounded-[var(--radius-panel)] bg-loss-tint px-4 py-3 text-center text-caption text-error"
          >
            {error}
          </p>
        ) : (
          <p className="mt-3 text-center text-caption text-text-secondary">
            {answeredCount > 0
              ? "Jawaban Anda tersimpan — boleh ditinggal dan dilanjutkan nanti."
              : "Semua pertanyaan perlu dijawab agar hasilnya tepat."}
          </p>
        )}
      </div>
    </AppShell>
  );
}
