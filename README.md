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

MVP berjalan tanpa kunci API maupun basis data. Halaman Survei, Kalkulator, dan Roadmap saat ini placeholder "segera hadir".

```bash
pnpm lint       # pemeriksaan lint
pnpm typecheck
pnpm build      # build produksi
```

## Arsitektur

```
src/
  app/              Rute Next.js App Router
    page.tsx          / — Beranda
    survey/           /survey — placeholder "segera hadir"
    diagnosis/        /diagnosis — placeholder "segera hadir"
    kalkulator/       /kalkulator — placeholder "segera hadir"
    roadmap/          /roadmap — placeholder "segera hadir"
    privasi/          /privasi — kebijakan data lokal
    syarat/           /syarat — syarat penggunaan
  components/
    AppShell.tsx      Kerangka aplikasi, navigasi, footer
    ComingSoon.tsx    Placeholder "segera hadir" untuk halaman kosong
    Reveal.tsx        Animasi reveal saat scroll
  lib/
    landingSurveyContent.ts  Teks landing dan label navigasi
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

## Lisensi pustaka

| Pustaka                 | Lisensi                                            |
| ----------------------- | -------------------------------------------------- |
| Next.js, React          | MIT                                                |
| Tailwind CSS            | MIT                                                |
| DM Sans, JetBrains Mono | SIL Open Font License 1.1                          |
| General Sans            | Fontshare Free License — lihat `src/fonts/FFL.txt` |

## Penggunaan AI

AI digunakan pada proses pengembangan: riset awal, bantuan kode, debugging, dokumentasi, dan wireframe. MVP tidak memakai AI generatif.
