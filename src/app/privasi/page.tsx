import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function PrivasiPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
        <p className="overline">Privasi</p>
        <h1 className="mt-3 max-w-[22ch] text-[length:var(--text-section)]">
          Data Anda tidak meninggalkan browser ini
        </h1>
        <p className="mt-4 max-w-[62ch] text-text-secondary">
          UMIRO tidak memakai akun dan tidak memakai server penyimpanan.
          Data tersimpan di penyimpanan lokal browser Anda saja, dan hilang
          bila data situs dihapus.
        </p>
        <ul className="mt-6 flex max-w-[62ch] flex-col gap-3 text-small text-text-secondary">
          <li>Tidak ada nama, nomor telepon, maupun alamat yang diminta.</li>
          <li>Tidak ada pelacakan lintas situs.</li>
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
