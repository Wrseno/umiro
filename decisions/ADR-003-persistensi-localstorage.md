# ADR-003

**Title:** Persistensi lokal berversi di `localStorage`
**Status:** Proposed
**Date:** 2026-10-05

> Merangkum keputusan yang sudah tersebar di PRD §8 (US-03, US-05),
> `.sdd/context/constraints.md`, dan design 002–004 menjadi satu kontrak
> lintas-unit. Diwajibkan `sdd-workflow.md` ("scoring/persistensi/AI wajib
> ADR"). Berlaku setelah PO mengesahkan.

## Context

MVP berjalan tanpa akun, backend, maupun basis data (PRD §9, US-17 Won't).
Tiga unit menulis atau membaca data pengguna: Survey (002), Diagnosis (003),
Calculator (004); unit 001 membaca status untuk CTA dinamis. Tanpa kontrak
tunggal, tiap unit berisiko memakai kunci, format, dan perlakuan payload
rusak yang berbeda, dan perubahan katalog soal dapat membuat hasil lama
salah dibaca.

## Decision

1. **Media:** `localStorage` browser, satu-satunya penyimpanan. Tidak ada
   cookie, IndexedDB, server, atau sinkronisasi.
2. **Kunci berversi, prefix `umiro.`:**
   - `umiro.survey.v<V>` — jawaban + `catalogVersion` (penulis: 002)
   - `umiro.diagnosis.v<V>` — ringkasan diagnosis (penulis: 003)
   - `umiro.calc.v1` — riwayat kalkulator `CalcEntry[]` (penulis: 004;
     bentuk array bergantung pada amandemen D yang belum disahkan)

   `<V>` dinaikkan setiap katalog soal atau skema payload berubah.
3. **Nilai:** JSON, payload kecil, tanpa data identitas (nama, telepon,
   alamat).
4. **Payload rusak atau versi tak dikenal:** abaikan dengan aman, hapus
   kuncinya, jangan tampilkan sebagai hasil terkini (AC-05-09), minta
   pengguna mengulang bila perlu.
5. **Akses:** baca/tulis hanya lewat modul `src/lib/` (ADR-002), dibaca di
   klien setelah hidrasi (SSR selalu merender keadaan "tanpa hasil").
   Penulis memanggil `notifyDiagnosisStatusChange()` setelah menulis atau
   menghapus hasil survey/diagnosis agar CTA di tab yang sama ikut berubah.
6. **Gagal simpan** (penuh, mode privat, diblokir): tampilkan pesan jelas,
   jangan klaim sukses.

## Alternatives Considered

- **Cookie:** pernah diusulkan di draf amandemen, dibatalkan — ikut terkirim
  ke server di setiap request dan kapasitasnya kecil.
- **IndexedDB:** kapasitas besar tetapi API asinkron menambah kompleksitas
  untuk payload yang hanya beberapa KB.
- **Backend + akun:** di luar MVP (US-17), menambah beban privasi dan biaya.
- **Kunci tanpa versi:** lebih sederhana, tetapi hasil lama terbaca dengan
  katalog baru dan menghasilkan diagnosis keliru.

## Consequences

- Privasi kuat dan tanpa biaya server; dapat dijalankan sepenuhnya statis.
- Data hilang bila data situs dihapus, di mode privat, atau di perangkat
  lain — harus dinyatakan jelas di UI (footer, `/privasi`, `/syarat`).
- Setiap perubahan katalog wajib menaikkan versi; hasil lama otomatis
  dibuang, bukan dimigrasi.
- Pengujian logika storage dapat dilakukan dengan `Storage` tiruan
  (lihat `src/lib/diagnosis-status.test.ts`).
