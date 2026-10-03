"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { RoadmapMap } from "@/components/RoadmapMap";
import type { DiagnosisResponse } from "@/app/api/diagnosis/route";
import type { RoadmapResponse } from "@/app/api/roadmap/route";
import { BOTTLENECK_COPY } from "@/lib/copy";
import { roadmapContext, type Roadmap } from "@/lib/roadmap";
import {
  KEY_ANSWERS,
  KEY_DIAGNOSIS,
  KEY_ROADMAP,
  parseSession,
  useSessionRaw,
  writeSession,
} from "@/lib/sessionStore";
import type { Answers } from "@/lib/types";

/**
 * Halaman Peta Jalan — US-05.
 *
 * Satu-satunya halaman yang isinya disusun model bahasa. Penyusunannya
 * dijalankan di peladen dari jawaban survei, bukan dari diagnosis yang
 * tersimpan di peramban, sehingga tahap dan titik mentoknya tidak dapat
 * dipaksa dari sisi klien.
 *
 * Hasilnya disimpan pada penyimpanan sesi. Pengguna yang berpindah ke
 * Kalkulator lalu kembali akan melihat peta jalan yang sama, bukan susunan
 * baru — peta jalan yang berubah sendiri setiap kali halaman dibuka akan
 * terasa seperti saran yang tidak bisa dipegang.
 */

/** Bentuk simpanan survei: jawaban beserta posisi pertanyaan terakhir. */
interface SurveyDraft {
  answers: Answers;
}

type Status = "menunggu" | "menyusun" | "siap" | "gagal";

export default function RoadmapPage() {
  const diagnosisData = parseSession<DiagnosisResponse>(
    useSessionRaw(KEY_DIAGNOSIS),
  );
  const answers = parseSession<SurveyDraft>(useSessionRaw(KEY_ANSWERS))?.answers;
  const cached = parseSession<Roadmap>(useSessionRaw(KEY_ROADMAP));

  const [status, setStatus] = useState<Status>(cached ? "siap" : "menunggu");
  // Menahan permintaan kedua: effect berjalan dua kali pada mode
  // pengembangan, dan menyusun peta jalan adalah panggilan berbayar.
  const requested = useRef(false);

  const compose = useCallback(async (payload: Answers) => {
    requested.current = true;
    setStatus("menyusun");
    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload }),
      });
      if (!response.ok) throw new Error(String(response.status));
      const { roadmap } = (await response.json()) as RoadmapResponse;
      writeSession(KEY_ROADMAP, roadmap);
      setStatus("siap");
    } catch {
      setStatus("gagal");
    }
  }, []);

  useEffect(() => {
    if (cached || requested.current || !answers) return;
    void compose(answers);
  }, [answers, cached, compose]);

  // AC-DIA-07 sejalan: halaman ini dibuka tanpa survei.
  if (!diagnosisData || !answers) {
    return (
      <AppShell>
        <div className="mx-auto w-full max-w-[1180px] px-5 py-12 md:px-10">
          <h1 className="text-[length:var(--text-section)]">Belum ada hasil</h1>
          <p className="mt-3 max-w-[60ch] text-text-secondary">
            Peta jalan disusun dari hasil survei Anda, jadi isinya menunggu
            survei terisi lebih dahulu. Pengisiannya sekitar tiga menit.
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

  const { diagnosis } = diagnosisData;
  const bottleneck = BOTTLENECK_COPY[diagnosis.bottleneck];

  return (
    <AppShell stage={diagnosis.stage}>
      <div className="mx-auto w-full max-w-[1180px] px-5 py-10 md:px-10 md:py-12">
        <p className="overline">Peta Jalan</p>
        <h1 className="mt-2 text-[length:var(--text-section)]">
          Urutan langkah untuk usaha Anda
        </h1>

        {cached ? (
          <>
            <p className="mt-3 max-w-[62ch] text-text-secondary">
              {cached.summary}
            </p>
            <Provenance roadmap={cached} context={roadmapContext(diagnosis)} />
            <RoadmapMap roadmap={cached} />
            <Rebuild
              busy={status === "menyusun"}
              failed={status === "gagal"}
              onRebuild={() => compose(answers)}
            />
          </>
        ) : status === "gagal" ? (
          <div className="mt-6 max-w-[62ch] rounded-[var(--radius-card)] border border-border bg-surface p-6">
            <h2 className="text-[0.9375rem]">Peta jalan belum bisa disusun</h2>
            <p className="mt-2 text-small text-text-secondary">
              Sambungan ke peladen sedang terganggu. Diagnosis Anda tetap
              tersimpan, jadi tidak ada yang perlu diisi ulang.
            </p>
            <button
              type="button"
              onClick={() => compose(answers)}
              className="mt-4 inline-flex h-11 items-center rounded-[var(--radius-control)] bg-primary px-6 text-small font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Coba lagi
            </button>
          </div>
        ) : (
          <Composing
            bottleneckTitle={bottleneck.title}
            context={roadmapContext(diagnosis)}
          />
        )}
      </div>
    </AppShell>
  );
}

/**
 * Keadaan sedang menyusun.
 *
 * Menyebut apa yang sedang dikerjakan dan data apa yang dikirim, bukan
 * hanya memutar pemuat — AC-AI-03. Rangka abu-abunya meniru susunan yang
 * akan muncul supaya halaman tidak melompat ketika isinya datang.
 */
function Composing({
  bottleneckTitle,
  context,
}: {
  bottleneckTitle: string;
  context: string;
}) {
  return (
    <div className="mt-6">
      <div
        role="status"
        className="max-w-[62ch] rounded-[var(--radius-card)] border border-primary/25 bg-primary/8 p-5"
      >
        <p className="text-small font-medium">
          Sedang menyusun peta jalan untuk hambatan {bottleneckTitle}…
        </p>
        <p className="mt-1.5 text-small text-text-secondary">
          Biasanya selesai dalam setengah menit. Tahap dan titik mentok Anda
          sudah ditetapkan dari jawaban survei; yang disusun sekarang hanya
          urutan langkah dan tipsnya.
        </p>
        <DataSent context={context} />
      </div>

      <ol
        aria-hidden
        className="mt-8 flex animate-pulse flex-col gap-7 border-l-2 border-border pl-6 md:pl-8"
      >
        {[0, 1, 2, 3].map((i) => (
          <li key={i}>
            <div className="h-5 w-56 rounded-[var(--radius-chip)] bg-border" />
            <div className="mt-2 h-4 w-full max-w-[42ch] rounded-[var(--radius-chip)] bg-border/70" />
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <div className="h-36 rounded-[var(--radius-card)] bg-border/50" />
              <div className="hidden h-36 rounded-[var(--radius-card)] bg-border/50 lg:block" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Dari mana isi peta jalan berasal — AC-AI-05. */
function Provenance({
  roadmap,
  context,
}: {
  roadmap: Roadmap;
  context: string;
}) {
  if (roadmap.source === "aturan") {
    return (
      <p className="mt-4 max-w-[62ch] rounded-[var(--radius-panel)] border border-border bg-surface px-4 py-3 text-caption text-text-secondary">
        Peta jalan ini disusun dari katalog tindakan baku, bukan disesuaikan
        oleh AI — layanan penyusunnya sedang tidak tersedia. Isinya tetap
        mengikuti tahap dan titik mentok Anda.
      </p>
    );
  }

  return (
    <div className="mt-4 max-w-[62ch] rounded-[var(--radius-panel)] border border-border bg-surface px-4 py-3">
      <p className="text-caption text-text-secondary">
        Isi peta jalan ini disesuaikan AI untuk kondisi usaha Anda. Penetapan
        tahap dan titik mentoknya tidak memakai AI, melainkan aturan baku dari
        jawaban survei Anda — AI hanya menyusun langkah dan tipsnya.
      </p>
      <DataSent context={context} />
    </div>
  );
}

/** Rincian data yang dikirim, tertutup secara bawaan agar tidak berisik. */
function DataSent({ context }: { context: string }) {
  return (
    <details className="group mt-2">
      <summary className="cursor-pointer list-none text-caption font-medium text-primary">
        <span className="group-open:hidden">Lihat data yang dikirim</span>
        <span className="hidden group-open:inline">Tutup</span>
      </summary>
      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-[var(--radius-chip)] bg-background p-3 font-mono text-caption text-text-secondary">
        {context}
      </pre>
      <p className="mt-2 text-caption text-text-secondary">
        Tidak ada nama, nomor telepon, maupun alamat yang dikirim.
      </p>
    </details>
  );
}

function Rebuild({
  busy,
  failed,
  onRebuild,
}: {
  busy: boolean;
  /**
   * Penyusunan ulang yang gagal perlu dinyatakan di sini. Peta jalan
   * sebelumnya masih tampil, jadi tanpa keterangan ini pengguna hanya
   * melihat tombol yang seolah tidak berfungsi.
   */
  failed: boolean;
  onRebuild: () => void;
}) {
  return (
    <div className="mt-10 border-t border-border pt-6">
      <p className="max-w-[62ch] text-small text-text-secondary">
        Kalau susunannya terasa kurang pas untuk usaha Anda, mintalah susunan
        baru. Tahap dan titik mentok Anda tidak berubah.
      </p>
      <button
        type="button"
        onClick={onRebuild}
        disabled={busy}
        className="mt-3 inline-flex h-11 items-center rounded-[var(--radius-control)] border border-border bg-surface px-5 text-small font-medium transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:text-neutral"
      >
        {busy ? "Menyusun ulang…" : "Susun ulang peta jalan"}
      </button>
      {failed ? (
        <p className="mt-2 text-small text-error">
          Susunan baru belum bisa diambil. Peta jalan yang tampil adalah
          susunan sebelumnya.
        </p>
      ) : null}
    </div>
  );
}
