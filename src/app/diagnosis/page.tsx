"use client";

import Link from "next/link";

import { AppShell } from "@/components/AppShell";
import type { DiagnosisResponse } from "@/app/api/diagnosis/route";
import { KEY_DIAGNOSIS, parseSession, useSessionRaw } from "@/lib/sessionStore";
import {
  BOTTLENECK_COPY,
  costLabel,
  DIMENSION_SHORT,
  LEVER_LABELS,
  nextStepFor,
  STAGE_NAMES,
  STAGE_SUMMARIES,
  timeLabel,
} from "@/lib/copy";
import {
  DIAGNOSTIC_DIMENSIONS,
  HEALTHY_THRESHOLD,
  type Action,
  type Lever,
} from "@/lib/types";

/** Ubin berwarna per tuas, meniru kartu angka pada templat Genesis. */
const LEVER_TILE: Record<Lever, string> = {
  margin: "bg-[#E0E0FF] text-[#4338CA]",
  retensi: "bg-[#D8F5E3] text-[#047857]",
  jangkauan: "bg-[#FFE6CC] text-[#B45309]",
  kapasitas: "bg-[#FFE0E0] text-[#B91C1C]",
};

/**
 * Halaman Diagnosis — US-02.
 *
 * Susunannya disengaja: satu kotak besar berisi titik mentok, lalu tiga
 * tindakan, baru rincian skor di bawah. Pengguna yang mentok tidak
 * kekurangan saran melainkan kelebihan saran, sehingga halaman ini
 * menyajikan satu jawaban lebih dahulu dan angka pendukung menyusul
 * sebagai bukti (PRD Bagian 3.3).
 *
 * Hasil dibaca dari perhitungan peladen; halaman ini tidak menghitung
 * apa pun sendiri. Ketika basis data tersedia, sumber bacaannya berpindah
 * dari penyimpanan sesi ke kueri basis data tanpa mengubah tampilan.
 */
export default function DiagnosisPage() {
  const data = parseSession<DiagnosisResponse>(useSessionRaw(KEY_DIAGNOSIS));

  // AC-DIA-07 — pengguna yang membuka halaman ini tanpa mengisi survei.
  if (!data) {
    return (
      <AppShell>
        <div className="mx-auto w-full max-w-[1180px] px-5 py-12 md:px-10">
          <h1 className="text-[length:var(--text-section)]">Belum ada hasil</h1>
          <p className="mt-3 max-w-[60ch] text-text-secondary">
            Hasil diagnosis muncul setelah Anda mengisi survei. Pengisiannya
            sekitar tiga menit.
          </p>
          <Link
            href="/survey"
            className="mt-6 inline-flex h-12 items-center rounded-[var(--radius-control)] bg-primary px-7 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Mulai Survei →
          </Link>
        </div>
      </AppShell>
    );
  }

  const { diagnosis, priority } = data;
  const copy = BOTTLENECK_COPY[diagnosis.bottleneck];
  const next = nextStepFor(diagnosis.bottleneck);

  return (
    <AppShell stage={diagnosis.stage}>
      <div className="mx-auto w-full max-w-[1180px] px-5 py-10 md:px-10 md:py-12">
        {/* Pada layar lebar, rincian skor naik ke kolom kanan sebagai bukti
            pendamping; di telepon genggam ia tetap berada di bawah. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-12">
        <div className="min-w-0">
        {/* ── Tahap ────────────────────────────────────────────────── */}
        <p className="text-small text-text-secondary">Usaha Anda ada di</p>
        <h1 className="mt-1 text-[length:var(--text-section)]">
          Kelas {diagnosis.stage} — {STAGE_NAMES[diagnosis.stage]}
        </h1>
        <p className="mt-2 max-w-[60ch] text-small text-text-secondary">
          {STAGE_SUMMARIES[diagnosis.stage]}
        </p>

        {/* ── Titik mentok: satu jawaban, bukan daftar ─────────────── */}
        <section className="mt-7 overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-[#5B5BF0] to-[#4338CA] p-6 text-white shadow-[var(--shadow-lift)] md:p-7">
          <p className="overline text-white/70">Yang menahan usaha Anda</p>
          <h2 className="mt-2 text-[length:var(--text-subhead)] text-white">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-[58ch] text-white/90">{copy.explanation}</p>
          <p className="mt-3 max-w-[58ch] text-small text-white/70">
            {copy.consequence}
          </p>
        </section>

        {/* ── Tiga tindakan ────────────────────────────────────────── */}
        <section className="mt-8">
          <h2 className="text-[0.9375rem]">
            {priority.actions.length} langkah berikutnya
          </h2>
          {priority.beyondCapability ? (
            <p className="mt-2 max-w-[58ch] text-small text-text-secondary">
              Langkah ini sedikit melebihi waktu atau dana yang Anda sebutkan.
              Kami tetap menampilkannya karena inilah yang paling ringan untuk
              membuka hambatan Anda.
            </p>
          ) : null}

          <ol className="mt-4 flex flex-col gap-3">
            {priority.actions.map((action, i) => (
              <ActionCard key={action.id} action={action} number={i + 1} />
            ))}
          </ol>
        </section>

        {/* ── Langkah berikutnya, mengikuti titik mentok ───────────── */}
        <section className="mt-8">
          <p className="max-w-[58ch] text-small text-text-secondary">
            {next.reason}
          </p>
          <Link
            href={next.href}
            className="mt-3 inline-flex h-12 items-center rounded-[var(--radius-control)] bg-primary px-7 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {next.label} →
          </Link>
        </section>

        </div>

        {/* ── Rincian skor: bukti, bukan sambutan ──────────────────── */}
        <section className="mt-10 border-t border-border pt-6 lg:mt-0 lg:sticky lg:top-10 lg:rounded-[var(--radius-card)] lg:border lg:border-border lg:bg-surface lg:p-6 lg:shadow-[var(--shadow-card)]">
          <p className="overline">Rincian skor</p>
          <dl className="mt-4 flex flex-col gap-3" data-tabular>
            {DIAGNOSTIC_DIMENSIONS.map((dimension) => (
              <ScoreBar
                key={dimension}
                label={DIMENSION_SHORT[dimension]}
                score={diagnosis.scores[dimension]}
                isBottleneck={dimension === diagnosis.bottleneck}
              />
            ))}
          </dl>
          <p className="mt-4 max-w-[58ch] text-caption text-text-secondary">
            Nilai di bawah {HEALTHY_THRESHOLD} berarti bagian itu belum sehat.
            Yang ditandai adalah bagian pertama yang perlu dibenahi — bukan
            selalu yang nilainya paling rendah, melainkan yang paling awal
            menahan langkah berikutnya.
          </p>
        </section>
        </div>
      </div>
    </AppShell>
  );
}

function ActionCard({ action, number }: { action: Action; number: number }) {
  return (
    <li className="card card-interactive p-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={`grid size-9 shrink-0 place-items-center rounded-[var(--radius-panel)] font-mono text-small font-medium ${LEVER_TILE[action.lever]}`}
        >
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[0.9375rem]">{action.title}</h3>
            <span className="shrink-0 rounded-[var(--radius-chip)] bg-background px-2 py-1 text-overline text-text-secondary">
              {LEVER_LABELS[action.lever]}
            </span>
          </div>
          <p className="mt-1.5 max-w-[58ch] text-small text-text-secondary">
            {action.why}
          </p>
        </div>
      </div>

      <p className="mt-3 text-caption text-text-secondary">
        {costLabel(action.cost)} · {timeLabel(action.minutesPerDay)} ·{" "}
        {action.effort}
        {action.requiresNib ? " · perlu NIB" : ""}
      </p>

      <ol className="mt-3 flex list-decimal flex-col gap-1 pl-5 text-small">
        {action.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </li>
  );
}

function ScoreBar({
  label,
  score,
  isBottleneck,
}: {
  label: string;
  score: number;
  isBottleneck: boolean;
}) {
  // Penanda diletakkan pada barisnya sendiri, bukan di samping bar, agar
  // bar tidak menyempit ketika kolom skor berada di rail kanan yang sempit.
  return (
    <div>
      <div className="flex items-center gap-3">
        <dt className="w-[5.5rem] shrink-0 text-small">{label}</dt>
        <dd className="flex min-w-0 flex-1 items-center gap-3">
          <div className="h-2.5 min-w-16 flex-1 overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full ${
                isBottleneck ? "bg-bottleneck" : "bg-neutral"
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="w-8 shrink-0 text-right text-small">{score}</span>
        </dd>
      </div>
      {isBottleneck ? (
        <p className="mt-1 pl-[5.5rem] text-caption text-bottleneck">
          ← dibenahi lebih dahulu
        </p>
      ) : null}
    </div>
  );
}
