"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlowTabs } from "@/components/FlowTabs";
import { IconKalkulator } from "@/components/icons";
import { KEY_DIAGNOSIS, parseSession, useSessionRaw } from "@/lib/sessionStore";
import type { Stage } from "@/lib/types";

/**
 * Kerangka aplikasi — US-07.
 *
 * Navigasi disusun dua tingkat.
 *
 * Tingkat pertama, bilah atas, hanya memuat dua tautan: Kalkulator sebagai
 * alat yang berdiri sendiri, dan satu ajakan masuk ke alur diagnosis.
 * Menaruh seluruh halaman di sini akan menampilkan tautan yang belum dapat
 * dipakai kepada pengguna yang baru datang.
 *
 * Tingkat kedua, tab langkah, hanya muncul di dalam alur diagnosis —
 * Survei, Diagnosis, Peta Jalan — karena hanya di situ gagasan "langkah
 * keberapa" punya arti. Beranda dan Kalkulator tidak menampilkannya.
 */

const FLOW_PATHS = ["/survey", "/diagnosis", "/roadmap"];

const STAGE_NAMES: Record<Stage, string> = {
  0: "Bertahan",
  1: "Sehat",
  2: "Bertumbuh",
  3: "Berkembang",
};

export interface AppShellProps {
  children: React.ReactNode;
  stage?: Stage;
}

export function AppShell({ children, stage: stageProp }: AppShellProps) {
  const pathname = usePathname();
  const stored = useSessionRaw(KEY_DIAGNOSIS);

  const stage =
    stageProp ??
    parseSession<{ diagnosis?: { stage?: Stage } }>(stored)?.diagnosis?.stage;

  const hasDiagnosis = stage !== undefined;
  const inFlow = FLOW_PATHS.includes(pathname);

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center gap-4 border-b border-border px-5 md:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-[var(--radius-panel)] bg-primary text-white"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path d="M3 15.5a1 1 0 0 1 .3-.7l4.4-4.4a1 1 0 0 1 1.4 0l2.1 2.1 4.1-4.1h-1.8a1 1 0 1 1 0-2h4.2a1 1 0 0 1 1 1v4.2a1 1 0 1 1-2 0V9.8l-4.8 4.8a1 1 0 0 1-1.4 0L8.4 12.5l-3.7 3.7A1 1 0 0 1 3 15.5Z" />
              </svg>
            </span>
            <span className="font-display text-[1.0625rem] font-bold tracking-[-0.03em]">
              Naik Kelas
            </span>
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3">
            {hasDiagnosis ? (
              <span className="hidden items-center gap-2 rounded-[var(--radius-control)] border border-bottleneck-border bg-bottleneck-tint px-3 py-1.5 lg:flex">
                <span className="text-overline text-[#8a6d1f]">Kelas {stage}</span>
                <span className="text-small font-medium">{STAGE_NAMES[stage]}</span>
              </span>
            ) : null}

            <Link
              href="/calculator"
              aria-current={pathname === "/calculator" ? "page" : undefined}
              className={`flex h-10 items-center gap-2 rounded-[var(--radius-control)] border px-3 text-small transition-colors ${
                pathname === "/calculator"
                  ? "border-primary/40 bg-primary/8 font-medium text-text-primary"
                  : "border-border bg-surface text-text-secondary hover:text-text-primary"
              }`}
            >
              <IconKalkulator className="size-4 shrink-0" />
              Kalkulator
            </Link>

            <Link
              href={hasDiagnosis ? "/diagnosis" : "/survey"}
              className="flex h-10 items-center rounded-[var(--radius-control)] bg-primary px-4 text-small font-medium text-white shadow-[var(--shadow-primary-glow)] transition-transform hover:-translate-y-px hover:bg-primary-hover"
            >
              {hasDiagnosis ? "Lihat Diagnosis" : "Mulai Diagnosis"}
              <span aria-hidden className="ml-1.5">
                →
              </span>
            </Link>
          </div>
        </div>

        {inFlow ? <FlowTabs /> : null}
      </header>

      <main className="pb-6 md:pb-0">{children}</main>
    </div>
  );
}
