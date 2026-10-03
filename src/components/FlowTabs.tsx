"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KEY_DIAGNOSIS, useSessionRaw } from "@/lib/sessionStore";

/**
 * Tab langkah di dalam alur diagnosis — US-07.
 *
 * Hanya dipakai pada tiga halaman yang membentuk alur: Survei, Diagnosis,
 * dan Peta Jalan. Beranda dan Kalkulator berada di luar alur, sehingga
 * tidak menampilkannya.
 *
 * Langkah yang belum tercapai ditandai nomor redup beserta keterangan
 * syaratnya, bukan gembok (AC-NAV-03). Setelah survei terisi, seluruh tab
 * terbuka sehingga pengguna yang kembali tidak dipaksa mengulang urutan
 * dari awal (AC-NAV-05).
 */

const TABS = [
  { href: "/survey", label: "Survei" },
  { href: "/diagnosis", label: "Diagnosis" },
  { href: "/roadmap", label: "Peta Jalan" },
] as const;

export function FlowTabs() {
  const pathname = usePathname();
  const hasDiagnosis = useSessionRaw(KEY_DIAGNOSIS) !== null;

  return (
    <div className="border-b border-border bg-surface">
      <nav
        aria-label="Langkah diagnosis"
        className="mx-auto w-full max-w-[1240px] px-5 md:px-8"
      >
        <ol className="flex gap-1 overflow-x-auto py-2.5">
          {TABS.map(({ href, label }, i) => {
            const active = pathname === href;
            const locked = i > 0 && !hasDiagnosis;
            const done = i === 0 && hasDiagnosis;

            const marker = (
              <span
                aria-hidden
                className={`grid size-5 shrink-0 place-items-center rounded-full font-mono text-[0.625rem] font-medium ${
                  active
                    ? "bg-primary text-white"
                    : locked
                      ? "bg-border text-neutral"
                      : "bg-primary/12 text-primary"
                }`}
              >
                {done && !active ? "✓" : i + 1}
              </span>
            );

            const shared =
              "flex h-10 shrink-0 items-center gap-2 rounded-[var(--radius-control)] px-3 text-small transition-colors";

            if (locked) {
              return (
                <li key={href}>
                  <span
                    aria-disabled="true"
                    title="Terbuka setelah Anda mengisi survei"
                    className={`${shared} cursor-not-allowed text-neutral`}
                  >
                    {marker}
                    {label}
                    <span className="hidden text-caption text-neutral sm:inline">
                      · setelah survei
                    </span>
                  </span>
                </li>
              );
            }

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`${shared} ${
                    active
                      ? "bg-primary/8 font-medium text-text-primary"
                      : "text-text-secondary hover:bg-background hover:text-text-primary"
                  }`}
                >
                  {marker}
                  {label}
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
