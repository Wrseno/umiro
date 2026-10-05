# UMIRO

Aplikasi web yang mendiagnosis **penyebab sebuah usaha mikro tidak bertumbuh**, lalu menunjukkan satu hambatan utama yang harus dibenahi lebih dahulu beserta peta jalan tindakannya.

Dikembangkan untuk **SIFest Digital Innovation Challenge 2026**, track Digital Economy.

> Masalah yang dijawab: 99,70% UMKM terdaftar di Indonesia masih berstatus mikro dan hanya 3,51% yang memiliki pencatatan keuangan. Panduan digitalisasi yang beredar luas seluruhnya menyerang satu faktor yang sama, yaitu jangkauan — padahal hambatan sebenarnya sering berada pada margin atau kapasitas. Rinciannya pada `design/PRD draf 5.md`

## Cara menjalankan

```bash
pnpm install
pnpm dev
```

Buka http://localhost:3000.

MVP berjalan tanpa kunci API maupun basis data. Kelima halaman MVP sudah berfungsi. Bobot survei dan aturan diagnosis (ADR-004) masih hipotesis yang menunggu review pakar dan uji pengguna.

```bash
pnpm lint       # pemeriksaan lint
pnpm typecheck
pnpm test       # unit test (node --test, tanpa dependensi tambahan)
pnpm build      # build produksi
```

## Arsitektur

```
src/
  app/              Rute Next.js App Router
    page.tsx          / — Beranda
    survey/           /survey — 15 pertanyaan, satu per layar
    diagnosis/        /diagnosis — indikator, hambatan indikatif, langkah awal
    kalkulator/       /kalkulator — kalkulator margin, laba, titik impas
    roadmap/          /roadmap — panduan Survival/Improvement/Growth
    privasi/          /privasi — kebijakan data lokal
    syarat/           /syarat — syarat penggunaan
    opengraph-image.tsx  Gambar pratinjau sosial (dibuat saat build)
  content/          Kamus teks UI, data murni tanpa impor (ADR-001)
  components/
    AppShell.tsx      Kerangka aplikasi, navigasi, footer
    DiagnosisCta.tsx  Tombol pojok + CTA dinamis Survei/Diagnosis
    Reveal.tsx        Animasi reveal saat scroll
  lib/
    diagnosis-status.ts  Baca status hasil di localStorage (ADR-003)
    diagnosis.ts         Scoring + aturan hambatan (ADR-004)
    survey-storage.ts    Simpan/baca jawaban survei (ADR-003)
    calculator.ts        Rumus + validasi kalkulator (PRD Lampiran B)
    calc-storage.ts      Simpan/pulihkan isian kalkulator
    format.ts            Format rupiah dan angka
  fonts/            General Sans, di-host sendiri
```

## Teknologi

| Komponen              | Pilihan                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Kerangka              | Next.js 16 (App Router), TypeScript                                                                                     |
| Tampilan              | Tailwind CSS v4                                                                                                         |
| Huruf                 | General Sans (display), DM Sans (teks), JetBrains Mono (angka)                                                          |
| Penempatan            | Vercel, paket gratis                                                                                                    |

## Dokumen

| Berkas  | Isi                                                                         |
| ------- | --------------------------------------------------------------------------- |
| `design/PRD draf 5.md` | Dokumen persyaratan produk, user story, acceptance criteria, lampiran rumus |
| `TODO.md` | Posisi dan progres implementasi terkini |
| `product/` | Visi, backlog, peta kapabilitas |
| `specs/<unit>/` | Spec, design, tasks per unit (001–006) |
| `decisions/` | ADR dan usulan amandemen PRD |
| `.sdd/` | Constitution, konteks, workflow, roadmap, traceability |

## Lisensi pustaka

| Pustaka                 | Lisensi                                            |
| ----------------------- | -------------------------------------------------- |
| Next.js, React          | MIT                                                |
| Tailwind CSS            | MIT                                                |
| DM Sans, JetBrains Mono | SIL Open Font License 1.1                          |
| General Sans            | Fontshare Free License — lihat `src/fonts/FFL.txt` |

## Penggunaan AI

AI digunakan pada proses pengembangan: riset awal, bantuan kode, debugging, dokumentasi, dan wireframe. MVP tidak memakai AI generatif.
