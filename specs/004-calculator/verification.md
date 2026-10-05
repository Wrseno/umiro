# Verification — 004 Financial Calculator

> Bukti per acceptance criterion. Belum boleh VERIFIED: spec belum
> disetujui PO dan uji pengguna (T007, target PRD §7) belum dijalankan.

**Traces to:** `spec.md` rev 6, `design.md`, `tasks.md` (unit ini)

**Verification Status:** IN PROGRESS

Bukti otomatis: `npm test` → `src/lib/calculator.test.ts`,
`src/lib/calc-storage.ts` (diuji manual). Bukti manual: build produksi
`next start`, Chrome desktop, 2026-10-05; lebar 390px diukur via iframe
(tanpa overflow horizontal).

## Acceptance Criteria Results

| Acceptance Criterion | Test(s) | Evidence | Result |
|---|---|---|---|
| AC-05-01 input H, V/batch, Q, D, F, T opsional | manual | Form `/kalkulator` memuat semua kolom; mode "Per sekali produksi" memunculkan biaya + unit batch | PASS |
| AC-05-02 negatif/non-finite/format/H=0/D=0/batch=0 ditolak | `B4`, `B6`, `validateForm › mode batch` | Unit test + pesan per kolom dari `KALKULATOR.errors` | PASS |
| AC-05-03 margin + laba bulanan tampil | `B1` | Manual: kasus Lampiran B menampilkan Rp 2.300 dan Rp 592.000 | PASS |
| AC-05-04 impas `ceil(F/(M×D))`, F=0 → 0 | `B1`, `B3` | Manual: 31 unit/hari | PASS |
| AC-05-05 target tercapai → tambahan 0 | `B5`, `target di atas laba` | Unit test | PASS |
| AC-05-06 M≤0 → tanpa impas/target valid | `B2` | Panel hasil menampilkan penjelasan margin nol/negatif | PASS |
| AC-05-07 hanya input manual, tidak menyentuh Diagnosis | review kode | `src/app/kalkulator/*`, `src/lib/calculator.ts`, `src/lib/calc-storage.ts` tidak mengimpor/membaca kunci survey/diagnosis | PASS |
| AC-05-08 hasil berubah tanpa reload | manual | Hasil diperbarui setiap ketikan | PASS |
| AC-05-09 payload rusak tidak tampil sebagai hasil | manual | `umiro.calc.v1` = `{rusak` → reload: kolom kosong, kunci dihapus, pesan "Data kalkulator … rusak dan sudah dibersihkan" | PASS |
| AC-05-10 batas pajak/penyusutan/tenaga pemilik dinyatakan | manual | Panel "Batasan perhitungan" selalu tampil | PASS |
| AC-05-11 riwayat tumpuk-hapus *(usulan)* | — | Tidak dibangun: menunggu pengesahan amandemen. Versi PRD (simpan isian valid terakhir) dibangun | N/A |
| AC-09-01 potongan opsional saat pilih platform | manual | Kolom "Potongan platform" muncul hanya pada kanal platform | PASS |
| AC-09-02 input identik selain potongan | `US-09 direct vs platform` | Manual 20%: harga diterima Rp 8.000, margin Rp 300, laba -Rp 1.488.000, impas 231 unit/hari | PASS |
| AC-09-03 margin platform ≤0 → penjelasan, tanpa impas | `US-09 direct vs platform` | Pesan `banding.marginPlatformNonPositif`, sel impas "—" | PASS |
| AC-10-01 penjelasan HPP, margin kontribusi, titik impas | manual | Bagian "Arti istilah" (`<details>`), label "(HPP)" pada kolom biaya bahan | PASS |
| AC-10-02 contoh bukan jawaban, dapat ditutup | manual | Panel contoh tidak mengisi kolom; tombol "Tutup contoh" | PASS |
| AC-10-03 bantuan tidak mengubah hasil | review kode | Istilah/contoh tidak terhubung ke state form | PASS |
| AC-12-01–03 skenario *(Could)* | — | Belum dibangun; urutan Should/Could menunggu keputusan tim | N/A |
| AC-13-01–03 ekspor/print *(Could)* | — | Terkunci review privasi (AC-13-03) | N/A |

## Known Deviations

- Data model `design.md` menulis array riwayat (amandemen). Yang dibangun
  versi PRD: satu objek `{ form, savedAt }` di `umiro.calc.v1`. Bila
  amandemen disahkan, kunci dinaikkan ke `v2` agar payload lama tidak salah
  baca (ADR-003).
- Potongan platform dalam persen (bukan nominal), sesuai default design.

## Residual Risks

- Uji pengguna (≥80% dapat menyebut margin/titik impas, T007) belum
  dijalankan.
- Parsing hanya bilangan bulat rupiah; harga berdesimal ditolak dengan pesan.
