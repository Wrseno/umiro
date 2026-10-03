import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { TOTAL_QUESTIONS } from "@/lib/questions";

/**
 * Beranda — halaman pendaratan.
 *
 * Urutannya disengaja: janji, lalu masalahnya, baru cara kerjanya. Pengguna
 * perlu mengenali dirinya dalam uraian masalah sebelum percaya pada solusi,
 * karena produk ini menuntut tiga menit pengisian sebelum memberi apa pun.
 */

const PENYEBAB = [
  {
    no: "01",
    title: "Uang usaha dan uang dapur tercampur",
    body: "Omzet dikira keuntungan. Uang belanja bahan terpakai untuk kebutuhan rumah, sehingga tidak pernah ketahuan apakah ada surplus yang nyata.",
  },
  {
    no: "02",
    title: "Harga ikut tetangga, bukan dihitung",
    body: "Harga ditetapkan tanpa menghitung biaya bahan per porsi. Begitu harga cabai dan minyak naik, keuntungan menipis sendiri tanpa ada yang memberitahu.",
  },
  {
    no: "03",
    title: "Tenaga pemilik sudah habis",
    body: "Semua dikerjakan sendiri. Menambah pembeli hanya menambah jam kerja, padahal jam kerjanya sudah tidak tersisa.",
  },
];

const LANGKAH = [
  {
    no: "01",
    title: "Jawab pertanyaan",
    body: `${TOTAL_QUESTIONS} pertanyaan tentang keuangan, harga, pembeli, tenaga, dan jangkauan. Bahasa sehari-hari, tanpa istilah sulit.`,
    meta: "sekitar 3 menit",
  },
  {
    no: "02",
    title: "Lihat titik mentoknya",
    body: "Kami tunjukkan satu hambatan utama — bukan daftar panjang yang membuat bingung harus mulai dari mana.",
    meta: "langsung muncul",
  },
  {
    no: "03",
    title: "Kerjakan langkahnya",
    body: "Tiga langkah yang sesuai modal dan waktu Anda. Ke mana langkah berikutnya mengarah tergantung titik mentok Anda sendiri.",
    meta: "mulai minggu ini",
  },
];

export default function Home() {
  return (
    <AppShell>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1240px] px-5 pt-14 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-caption text-text-secondary">
              <span
                aria-hidden
                className="size-1.5 rounded-full bg-bottleneck"
              />
              SIFest DIC 2026 · Track Digital Economy
            </span>

            <h1 className="mt-6 text-[length:var(--text-headline)]">
              Bongkar satu hal yang menahan usaha Anda,{" "}
              <span className="relative whitespace-nowrap text-primary">
                bukan tambah beban kerja
              </span>
              .
            </h1>

            <p className="mt-6 max-w-[58ch] text-text-secondary">
              Berdagang bertahun-tahun tapi penghasilan bersih tidak pernah
              meningkat? Naik Kelas mendiagnosis{" "}
              <strong className="font-medium text-text-primary">
                satu hambatan utama
              </strong>{" "}
              yang sedang menahan pertumbuhan usaha Anda, lalu menyusun langkah
              perbaikan yang realistis tanpa biaya mahal.
            </p>

            <dl className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["3 menit", "Survei bahasa sehari-hari"],
                ["1 fokus", "Titik mentok tunggal"],
                ["Rp 0", "Tuas margin tanpa modal"],
              ].map(([angka, label], i) => (
                <div key={angka} className="card p-4">
                  <dt
                    className={`font-display text-[length:var(--text-subhead)] font-bold tracking-[-0.03em] ${
                      i === 1 ? "text-bottleneck" : ""
                    }`}
                  >
                    {angka}
                  </dt>
                  <dd className="mt-1 text-caption text-text-secondary">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/survey"
                className="inline-flex h-12 items-center rounded-[var(--radius-control)] bg-text-primary px-7 font-medium text-white transition-transform hover:-translate-y-px"
              >
                Mulai Survei Diagnosis
                <span aria-hidden className="ml-2">
                  →
                </span>
              </Link>
              <Link
                href="/calculator"
                className="inline-flex h-12 items-center rounded-[var(--radius-control)] border border-border bg-surface px-7 font-medium transition-colors hover:bg-background"
              >
                Kalkulator Untung Sebenarnya
              </Link>
            </div>
            <p className="mt-3 text-caption text-text-secondary">
              Gratis · tanpa daftar · kalkulator bisa dipakai tanpa mengisi survei
            </p>
          </div>

          {/* Angka contoh dari Lampiran C PRD — bukan hiasan, melainkan
              gambaran keluaran yang akan pengguna lihat sendiri. */}
          <div className="mt-12 lg:mt-0">
            <div className="overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-[#5B5BF0] to-[#4338CA] p-6 text-white shadow-[var(--shadow-lift)]">
              <p className="overline text-white/70">Contoh hasil</p>
              <p className="mt-3 font-mono text-[2.5rem] leading-none font-medium">
                Rp 2.300
              </p>
              <p className="mt-3 text-small text-white/85">
                Untung Anda per porsi — bukan Rp 10.000. Dari tiap Rp 100 yang
                masuk, hanya Rp 23 jadi milik Anda.
              </p>
              <div className="mt-5 space-y-2 border-t border-white/20 pt-4 text-small">
                {[
                  ["Balik modal butuh", "31 porsi/hari"],
                  ["Lewat aplikasi, untung tinggal", "Rp 300"],
                  ["Naikkan harga Rp 2.000", "+Rp 2.080.000/bln"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4">
                    <span className="text-white/70">{k}</span>
                    <span className="font-mono">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Masalah ────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
          <span className="inline-block rounded-[var(--radius-chip)] bg-bottleneck-tint px-2.5 py-1 text-overline text-[#8a6d1f]">
            Diagnosa masalah
          </span>
          <h2 className="mt-4 max-w-[22ch] text-[length:var(--text-section)]">
            Lingkaran tertutup: kenapa bertahun-tahun usaha tetap mentok
          </h2>
          <p className="mt-4 max-w-[64ch] text-text-secondary">
            Banyak pelaku usaha menyangka mereka kurang gigih atau kurang
            beriklan. Kenyataannya, mereka terjebak dalam lingkaran yang menahan
            pertumbuhan — dan tidak ada surplus berarti tidak ada yang bisa
            diputar kembali.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PENYEBAB.map(({ no, title, body }) => (
              <div key={no} className="card card-interactive p-6">
                <span className="font-mono text-caption text-text-secondary">
                  {no}
                </span>
                <h3 className="mt-2 text-[0.9375rem]">{title}</h3>
                <p className="mt-2 text-small text-text-secondary">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-[var(--radius-card)] border border-error/25 bg-loss-tint p-5 sm:flex-row sm:items-center">
            <p className="min-w-0 flex-1 text-small">
              <strong className="font-medium">Peringatan ilusi penjualan:</strong>{" "}
              masuk ke aplikasi pesan antar sebelum margin sehat hanya menambah
              porsi yang rugi, karena potongan platform ikut memakan untung.
              Pesanan terlihat ramai, tapi uang yang masuk justru lebih sedikit.
            </p>
            <Link
              href="/calculator"
              className="inline-flex h-10 shrink-0 items-center rounded-[var(--radius-control)] border border-error/30 bg-surface px-4 text-small font-medium transition-colors hover:bg-background"
            >
              Uji di Kalkulator →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Cara kerja ─────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-[1240px] px-5 py-16 md:px-8 md:py-20">
        <span className="inline-block rounded-[var(--radius-chip)] bg-primary/10 px-2.5 py-1 text-overline text-primary">
          Cara kerjanya
        </span>
        <h2 className="mt-4 text-[length:var(--text-section)]">
          Tiga langkah, selesai sore ini
        </h2>

        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {LANGKAH.map(({ no, title, body, meta }) => (
            <li key={no}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-9 place-items-center rounded-[var(--radius-panel)] bg-primary/10 font-mono text-small font-medium text-primary"
                >
                  {no}
                </span>
                <span className="text-caption text-text-secondary">{meta}</span>
              </div>
              <h3 className="mt-3 text-[0.9375rem]">{title}</h3>
              <p className="mt-1.5 text-small text-text-secondary">{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-start gap-4 rounded-[var(--radius-card)] bg-text-primary p-8 text-white sm:flex-row sm:items-center sm:justify-between md:p-10">
          <div>
            <h2 className="text-[length:var(--text-subhead)] text-white">
              Berhenti sekadar bertahan
            </h2>
            <p className="mt-2 max-w-[48ch] text-small text-white/70">
              Tiga menit sekarang, untuk tahu satu hal yang selama ini menahan
              usaha Anda.
            </p>
          </div>
          <Link
            href="/survey"
            className="inline-flex h-12 shrink-0 items-center rounded-[var(--radius-control)] bg-white px-7 font-medium text-text-primary transition-transform hover:-translate-y-px"
          >
            Mulai Diagnosis
            <span aria-hidden className="ml-2">
              →
            </span>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
