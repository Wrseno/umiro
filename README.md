# Naik Kelas

Aplikasi web yang mendiagnosis **penyebab sebuah usaha mikro tidak bertumbuh**, lalu menunjukkan satu hambatan utama yang harus dibenahi lebih dahulu beserta peta jalan tindakannya.

Dikembangkan untuk **SIFest Digital Innovation Challenge 2026**, track Digital Economy.

> Masalah yang dijawab: 99,70% UMKM terdaftar di Indonesia masih berstatus mikro dan hanya 3,51% yang memiliki pencatatan keuangan. Panduan digitalisasi yang beredar luas seluruhnya menyerang satu faktor yang sama, yaitu jangkauan — padahal hambatan sebenarnya sering berada pada margin atau kapasitas. Rinciannya pada `PRD.md` dan `PROPOSAL-RINGKAS.md`.

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

MVP berjalan tanpa kunci API maupun basis data. Halaman Peta Jalan akan memakai susunan baku dari katalog tindakan.

Untuk mengaktifkan penyusunan Peta Jalan oleh AI, salin `.env.example` menjadi `.env.local` dan isi `OPENROUTER_API_KEY` dengan kunci gratis dari [openrouter.ai/keys](https://openrouter.ai/keys). Rute hanya memanggil model berjenjang gratis, jadi tidak perlu mengisi saldo. Tanpa kunci itu halaman tetap terisi; yang hilang hanya penyesuaian kalimatnya.

```bash
npm test        # uji unit modul keuangan dan mesin diagnosis
npm run lint    # pemeriksaan lint
npm run typecheck
npm run build   # build produksi
```

## Arsitektur

```
src/
  app/              Rute Next.js App Router
    page.tsx          / — Beranda
    survey/           /survey — survei, tanpa kerangka aplikasi
    diagnosis/        /diagnosis — tahap, titik mentok, tindakan prioritas
    calculator/       /calculator — Kalkulator Untung Sebenarnya, di luar alur
    roadmap/          /roadmap — peta jalan bercabang, isinya disusun AI
    api/diagnosis/    Perhitungan diagnosis di sisi peladen
    api/roadmap/      Penyusunan peta jalan, dengan jalur cadangan berbasis aturan
  components/
    AppShell.tsx      Bilah navigasi dan tab langkah
    RoadmapMap.tsx    Peta bercabang: fase → langkah → tips
  lib/
    types.ts          Tipe inti dan tetapan ambang
    questions.ts      Bank soal 15 pertanyaan, 7 dimensi
    diagnosis.ts      Skor dimensi, aturan gerbang, penetapan titik mentok
    actions.ts        Katalog tindakan, penyaringan, pengurutan
    roadmap.ts        Tipe peta jalan, skema keluaran AI, normalisasi, jalur cadangan
    finance.ts        Rumus Kalkulator Untung Sebenarnya
  fonts/            General Sans, di-host sendiri
```

### Keputusan rancangan yang perlu diketahui

**Tahap ditetapkan dengan aturan gerbang, bukan rata-rata.** Rata-rata dapat menyembunyikan kelemahan mendasar: pelaku usaha dengan jangkauan luas namun tanpa kejelasan keuangan memperoleh rata-rata 56 — terdengar sehat — padahal kondisinya Kelas 0. Gerbang menuntut prasyarat terpenuhi berurutan (`diagnosis.ts`, `determineStage`).

**Titik mentok mengikuti urutan prasyarat D1 → D2 → D3 → D4 → D5.** Yang terpilih adalah dimensi *pertama* yang berada di bawah ambang, bukan yang skornya terendah. Urutan ini mengodekan argumen ekonomi: memperbaiki margin tidak memerlukan biaya, sedangkan menambah jangkauan memerlukan biaya. Karena itu jangkauan tidak akan pernah disarankan selama keuangan atau harga masih bermasalah (`diagnosis.ts`, `determineBottleneck`).

**Seluruh perhitungan deterministik; AI hanya menyusun isi Peta Jalan.** Skor dimensi, penetapan tahap, titik mentok, dan seluruh angka kalkulator dihitung aturan — masukan yang sama selalu menghasilkan keluaran yang sama, sehingga dapat diperiksa, diulang, dan dijelaskan alasannya pada sesi Product Defense.

Halaman Peta Jalan adalah satu-satunya tempat AI bekerja, dan wewenangnya dibatasi di dua lapis. Pertama, tahap dan titik mentok dihitung ulang di peladen dari jawaban survei lalu dikirim ke model sebagai fakta, bukan sebagai pertanyaan; model tidak dapat memindahkan pengguna ke kelas lain. Kedua, keluaran model dibatasi skema JSON dan dilewatkan `normalizeRoadmap()`, yang menetapkan sendiri status fase dan penanda titik mentok, serta mengisi fase yang tidak terbaca dari katalog tindakan.

Penyusunnya memakai model berjenjang gratis di OpenRouter, dengan rantai cadangan antar-model karena jenjang gratis sering penuh atau berubah katalognya. Tanpa kunci API — atau ketika seluruh rantai gagal — halaman disusun sepenuhnya dari aturan dan menyatakan hal itu secara terbuka kepada pengguna. Inilah yang menjawab kekhawatiran PRD Lampiran G.1 bahwa AI menjadi titik gagal tunggal pada demonstrasi langsung: halaman tidak pernah kosong.

**Nilai uang disimpan sebagai bilangan bulat rupiah.** Ini kalkulator keuangan; bilangan pecahan akan memunculkan selisih pembulatan yang terlihat pengguna (`finance.ts`).

**Seluruh pertanyaan wajib dijawab.** Tidak ada tombol Lewati. Ketidaktahuan ditampung sebagai pilihan jawaban yang sah dengan bobot tersendiri — pada dimensi keuangan dan harga, "belum pernah menghitung" memang merupakan temuan diagnosis, bukan data yang hilang.

**Ambang sehat 50 adalah keputusan rancangan, bukan angka empiris.** Ditulis sebagai satu tetapan pada `types.ts` (`HEALTHY_THRESHOLD`) agar penyesuaian setelah validasi lapangan hanya mengubah satu nilai.

## Teknologi

| Komponen | Pilihan |
|---|---|
| Kerangka | Next.js 16 (App Router), TypeScript |
| Tampilan | Tailwind CSS v4, token dari `genesis-DESIGN.md` |
| Huruf | General Sans (display), DM Sans (teks), JetBrains Mono (angka) |
| Penyusunan Peta Jalan | Model berjenjang gratis di OpenRouter, dipanggil lewat `fetch` dengan structured output dan rantai cadangan antar-model |
| Uji | Vitest |
| Penempatan | Vercel, paket gratis |

Basis data Neon Postgres direncanakan untuk penyimpanan riwayat dan pemulihan lintas perangkat (PRD Bagian 13.2); MVP saat ini belum menyentuhnya.

## Dokumen

| Berkas | Isi |
|---|---|
| `PRD.md` | Dokumen persyaratan produk, user story, acceptance criteria, lampiran rumus |
| `PROPOSAL-RINGKAS.md` | Proposal untuk Online Round |
| `genesis-DESIGN.md` | Sistem desain |
| `design/wireframe-naik-kelas.excalidraw` | Wireframe seluruh layar |

## Lisensi pustaka

| Pustaka | Lisensi |
|---|---|
| Next.js, React | MIT |
| Tailwind CSS | MIT |
| Vitest | MIT |
| DM Sans, JetBrains Mono | SIL Open Font License 1.1 |
| General Sans | Fontshare Free License — lihat `src/fonts/FFL.txt` |

## Penggunaan AI

AI digunakan pada proses pengembangan: riset awal, bantuan kode, debugging, dokumentasi, dan wireframe. Rinciannya pada Bagian 10 proposal.

Di dalam produk, AI dipakai pada **satu** tempat: menyusun isi halaman Peta Jalan. Yang **tidak** memakai AI adalah penilaian dan perhitungan — skor dimensi, penetapan tahap, titik mentok, pemilihan tiga tindakan prioritas, dan seluruh angka Kalkulator Untung Sebenarnya seluruhnya berbasis aturan dan teruji unit. Halaman Peta Jalan menyatakan sumber isinya kepada pengguna, beserta data yang dikirim untuk dianalisis.
