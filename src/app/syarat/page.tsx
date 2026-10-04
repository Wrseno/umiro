import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function SyaratPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
        <p className="overline">Syarat penggunaan</p>
        <h1 className="mt-3 max-w-[22ch] text-[length:var(--text-section)]">
          Bahan memutuskan, bukan vonis atas usaha Anda
        </h1>
        <p className="mt-4 max-w-[62ch] text-text-secondary">
          UMIRO gratis dan tanpa daftar. Hasil diagnosis bersifat indikatif —
          bahan memutuskan area mana yang diperiksa lebih dahulu.
        </p>
        <ul className="mt-6 flex max-w-[62ch] flex-col gap-3 text-small text-text-secondary">
          <li>Bukan audit keuangan, konsultan, keputusan kredit, klasifikasi hukum UMKM, penentu pajak, atau kepatuhan.</li>
          <li>Halaman Survei, Kalkulator, dan Roadmap segera hadir; isinya belum tersedia pada versi ini.</li>
        </ul>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-[var(--radius-control)] border border-border bg-surface px-5 text-small font-medium transition-fluid hover:bg-background active:scale-[0.98]"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </AppShell>
  );
}
