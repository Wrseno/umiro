/**
 * Format angka untuk tampilan — fungsi murni, locale `id-ID`.
 *
 * Lapisan: `lib` (tanpa impor).
 */

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const angka = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

/** `592000` → `Rp 592.000`; negatif → `-Rp 1.800.000`. */
export function formatRupiah(n: number): string {
  return rupiah.format(Math.round(n));
}

/** `1800000` → `1.800.000`. */
export function formatAngka(n: number): string {
  return angka.format(n);
}

const tanggal = new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short" });

/** ISO → `5 Oktober 2026 pukul 10.43`; string tak valid → apa adanya. */
export function formatTanggal(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : tanggal.format(d);
}
