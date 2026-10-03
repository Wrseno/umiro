"use client";

import { useId } from "react";

/**
 * Isian angka untuk nilai rupiah dan jumlah.
 *
 * Memakai `inputMode="numeric"` agar papan tombol angka yang muncul di
 * telepon genggam, bukan papan huruf — penggunanya mengetik angka
 * sepanjang halaman ini (AC-KAL-06).
 *
 * Nilai ditampilkan dengan pemisah ribuan sambil diketik, tetapi yang
 * disimpan tetap bilangan bulat.
 */
export function NumberField({
  label,
  hint,
  value,
  onChange,
  prefix,
  suffix,
  max,
}: {
  label: string;
  hint?: string;
  value: number | null;
  onChange: (value: number | null) => void;
  /** Mis. "Rp" — ditampilkan di dalam medan, bukan di labelnya. */
  prefix?: string;
  /** Mis. "porsi" atau "%". */
  suffix?: string;
  max?: number;
}) {
  const id = useId();
  const display = value === null ? "" : value.toLocaleString("id-ID");

  function handle(raw: string) {
    const digits = raw.replace(/[^\d]/g, "");
    if (digits === "") return onChange(null);
    const parsed = Number(digits);
    onChange(max !== undefined ? Math.min(parsed, max) : parsed);
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="overline">
        {label}
      </label>
      <div className="flex h-12 items-center rounded-[var(--radius-control)] border border-border bg-surface px-3 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/12">
        {prefix ? (
          <span className="mr-2 shrink-0 text-small text-text-secondary">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={display}
          onChange={(e) => handle(e.target.value)}
          placeholder="0"
          className="h-full w-full min-w-0 bg-transparent font-mono tabular-nums outline-none placeholder:text-neutral"
        />
        {suffix ? (
          <span className="ml-2 shrink-0 text-small text-text-secondary">
            {suffix}
          </span>
        ) : null}
      </div>
      {hint ? <p className="text-caption text-text-secondary">{hint}</p> : null}
    </div>
  );
}
