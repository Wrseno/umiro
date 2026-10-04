# 004 Financial Calculator (E-04 + Could/Should terkait)

**Lifecycle:** SPECIFIED
**Health:** REVIEW_REQUIRED
**Revision:** 6
**Authority:** Turunan `design/PRD draf 5.md` v5.0 untuk unit ini. PRD §8 authoritative untuk ID/AC; bila konflik, PRD menang hingga spec direvisi.

## 1. Purpose

Membantu pengguna menghitung margin, titik impas, dan kebutuhan penjualan berdasarkan angka yang mereka masukkan. Mengubah target penghasilan menjadi angka yang bisa dihitung. Mengetahui apakah penjualan yang ramai menghasilkan margin yang cukup.

## 2. Scope

### In Scope

- Financial Calculator di `/kalkulator`: Menghitung margin kontribusi, estimasi laba bersih, titik impas, dan target penjualan berdasarkan input pengguna.
- Input mencakup harga/unit, biaya variabel/unit atau biaya batch dan unit batch, volume/hari, hari operasi/bulan, biaya tetap/bulan, target laba opsional (AC-05-01).
- Nilai negatif, non-finite, format invalid, harga nol, hari operasi nol, dan unit batch nol ditolak dengan pesan jelas (AC-05-02).
- Hasil valid menampilkan margin kontribusi/unit dan estimasi laba bersih bulanan (AC-05-03).
- Jika `M>0` dan `D>0`, titik impas memakai `ceil(F/(M×D))`; jika `F=0`, hasil nol (AC-05-04).
- Jika target tercapai, tambahan unit nol, bukan negatif (AC-05-05).
- Jika `M≤0`, impas/target volume tidak ditampilkan sebagai hasil valid (AC-05-06).
- Kalkulator hanya memakai input manual; tidak membaca/menulis/menafsirkan Diagnosis (AC-05-07).
- Perubahan input memperbarui hasil tanpa reload (AC-05-08).
- Hasil disimpan di `localStorage` dan boleh DITUMPUK: tiap hitungan valid tersimpan sebagai entri riwayat `{ id, input, result, savedAt }` di bawah kunci `umiro.calc.v1`; pengguna boleh menambah banyak entri dan MENGHAPUS per entri langsung di halaman `/kalkulator` (AC-05-09).
- Batas pajak, penyusutan, dan tenaga kerja pemilik dinyatakan bila tidak diinput (AC-05-10).
- US-09 direct vs platform (MVP bila waktu · Should): potongan opsional muncul bila pengguna memilih penjualan platform (AC-09-01); perbandingan memakai input identik selain potongan (AC-09-02); margin platform nol/negatif menghasilkan penjelasan, bukan titik impas menyesatkan (AC-09-03).
- Rumus Financial Calculator (Lampiran B salinan): Dengan `H` harga jual/unit, `V` biaya variabel/unit, `Q` unit terjual/hari, `D` hari operasi/bulan, `F` biaya tetap/bulan, dan `T` target laba bersih/bulan:
  - Margin kontribusi/unit: `M = H - V`.
  - Estimasi laba bersih/bulan: `M × Q × D - F`.
  - Titik impas unit/hari: `ceil(F / (M × D))` jika `M > 0` dan `D > 0`. Jika `F = 0`, hasilnya `0`.
  - Unit/hari untuk target: `ceil((T + F) / (M × D))` jika `M > 0`, `D > 0`, dan `T + F > 0`.
  - Jika `T` ≤ laba bersih saat ini, tampilkan "target sudah tercapai"; selisih unit tambahan adalah nol, bukan nilai negatif.
  - Jika `M ≤ 0`, `H ≤ 0`, `D = 0`, atau penyebut tidak positif, jangan tampilkan titik impas/target berbasis volume seolah valid; jelaskan input atau kondisi yang perlu diperiksa.
  - Semua kuantitas unit dibulatkan ke atas; masukan rupiah harus finite dan tidak negatif. Angka hasil rupiah dibulatkan ke rupiah terdekat.
  - Rumus adalah estimasi berdasarkan input, bukan laporan keuangan. Pajak, tenaga kerja pemilik, penyusutan, dan biaya lain harus diberi label di luar cakupan bila tidak dihitung.
- US-12 skenario harga/biaya (MVP bila waktu · Could): skenario hanya menggunakan input manual Calculator dan tidak membaca Diagnosis (AC-12-01); setiap skenario menampilkan asumsi dan hasil dengan rumus yang sama seperti Calculator utama (AC-12-02); skenario tidak mengubah hasil tersimpan utama tanpa tindakan eksplisit pengguna (AC-12-03).
- US-13 ekspor/print lokal (MVP bila waktu · Could): ekspor/print hanya menggunakan data yang tersedia lokal dan tidak mengirimnya ke server (AC-13-01); output menyertakan disclaimer bahwa diagnosis indikatif dan kalkulator bukan laporan keuangan (AC-13-02); fitur tidak aktif sebelum review privasi dan pengujian penghapusan data lokal (AC-13-03).
- US-10 bantuan istilah (MVP bila waktu · Should, bagian Calculator): istilah HPP, margin kontribusi, dan titik impas memiliki penjelasan singkat saat pertama digunakan (AC-10-01); contoh pengisian tidak dianggap sebagai jawaban pengguna dan dapat ditutup (AC-10-02); bantuan tidak mengubah scoring atau hasil kalkulator (AC-10-03).

### Out of Scope

- Menerima nilai otomatis dari Survey atau Diagnosis.
- Laporan keuangan resmi, keputusan kredit, kewajiban pajak, kepatuhan regulasi.
- Akun, sinkronisasi, pencatatan transaksi harian, integrasi marketplace/pembayaran.

## 3. Actors

- Primer: pemilik usaha mikro dengan waktu/modal/literasi digital terbatas; prioritas awal kuliner rumahan (tidak diklaim berlaku semua sektor sebelum validasi).
- Pemilik usaha yang memakai platform (US-09).

## 4. User/System Scenarios

- Given pengguna masukkan H/V/Q/D/F/T valid, when input berubah, then margin/laba/impas/target update tanpa reload dan tersimpan lokal.
- Given `M≤0`, when hitung, then penjelasan margin nol/negatif tampil; impas/target volume tidak tampil sebagai hasil valid.
- Given `F=0`, `M>0`, `D>0`, when hitung, then titik impas `0` unit/hari.
- Given `D=0` atau `H=0` atau input negatif/NaN/tak hingga, when submit, then input ditolak pesan jelas; hasil sebelumnya tidak diganti angka invalid.
- Given `T` ≤ laba berjalan, when hitung target, then "target sudah tercapai"; tambahan unit `0`.
- Given pengguna pilih platform, when bandingkan, then input identik selain potongan; margin platform nol/negatif beri penjelasan bukan impas sesat.
- Given skenario (bila waktu), when bandingkan harga/biaya, then tiap skenario tampilkan asumsi + hasil rumus sama; hasil utama tak berubah tanpa aksi eksplisit.
- Given ekspor/print (bila waktu, setelah review privasi), when cetak, then hanya data lokal + disclaimer.

## 5. Functional Requirements

- FR-001–FR-010 mengikuti AC-05-01 s/d 11 (FR-010 = riwayat tumpuk-hapus, AC-05-09; payload rusak AC-05-11 ikut FR-009), AC-09-01 s/d 03, AC-10-01 s/d 03, AC-12-01 s/d 03, AC-13-01 s/d 03 seperti di §9.
- FR-010: Riwayat kalkulator di `localStorage` boleh ditumpuk (banyak entri) dan dihapus per entri langsung di `/kalkulator` tanpa konfirmasi ganda. *(usulan amandemen PRD)*

## 6. Business Rules

- Kalkulator mandiri: hanya input manual; tidak membaca/menulis/menafsirkan Diagnosis.
- Platform compare memakai input identik selain potongan.
- Rumus estimasi input, bukan laporan keuangan; label luar cakupan bila pajak/tenaga pemilik/susut tidak dihitung.
- Nilai uang bilangan rupiah; validasi cegah input negatif tak bermakna dan pembagian nol.

## 7. Non-Functional Requirements

- Keuangan: Pengguna dapat menyebut margin/titik impas setelah kalkulator — ≥80% dari 5 pengguna.
- Perubahan input memperbarui hasil tanpa reload.
- Hasil tersimpan lokal; tersedia kembali di browser sama.

## 8. Constraints

- `localStorage` payload berversi ukuran terbatas; rusak/tidak dikenal → abaikan aman + hapus.
- Tanpa Neon/Postgres, Route Handler, API key, AI untuk MVP. Kalkulasi lokal/deterministik.
- Build quality gate: lint, typecheck, unit test rumus kalkulator, production build.
- Risiko: Pengguna salah memasukkan biaya → hasil menyesatkan; mitigasi: contoh input, validasi, penjelasan batasan.

## 9. Acceptance Criteria

AC §9 mengikuti PRD §8; format Given-When-Then authoritative di PRD.

#### US-05 — Menghitung hasil dengan input manual (MVP · Must)

Sebagai pemilik usaha, saya ingin memasukkan angka sendiri untuk melihat margin, estimasi laba, titik impas, dan target.

- AC-05-01: Input mencakup harga/unit, biaya variabel/unit atau biaya batch dan unit batch, volume/hari, hari operasi/bulan, biaya tetap/bulan, target laba opsional.
- AC-05-02: Nilai negatif, non-finite, format invalid, harga nol, hari operasi nol, dan unit batch nol ditolak dengan pesan jelas.
- AC-05-03: Hasil valid menampilkan margin kontribusi/unit dan estimasi laba bersih bulanan.
- AC-05-04: Jika `M>0` dan `D>0`, titik impas memakai `ceil(F/(M×D))`; jika `F=0`, hasil nol.
- AC-05-05: Jika target tercapai, tambahan unit nol, bukan negatif.
- AC-05-06: Jika `M≤0`, impas/target volume tidak ditampilkan sebagai hasil valid.
- AC-05-07: Kalkulator hanya memakai input manual; tidak membaca/menulis/menafsirkan Diagnosis.
- AC-05-08: Perubahan input memperbarui hasil tanpa reload.
- AC-05-09: Tiap hitungan valid tersimpan sebagai entri riwayat di `localStorage`; daftar riwayat tampil di `/kalkulator` dan tiap entri dapat dihapus langsung di halaman. *(usulan amandemen PRD)*
- AC-05-11: Payload rusak tidak ditampilkan sebagai hasil terkini.
- AC-05-10: Batas pajak, penyusutan, dan tenaga kerja pemilik dinyatakan bila tidak diinput.

#### US-09 — Membandingkan direct sales dan platform (MVP bila waktu · Should)

Sebagai pemilik usaha yang memakai platform, saya ingin melihat dampak potongan pada margin.

- AC-09-01: Potongan opsional muncul bila pengguna memilih penjualan platform.
- AC-09-02: Perbandingan memakai input identik selain potongan.
- AC-09-03: Margin platform nol/negatif menghasilkan penjelasan, bukan titik impas menyesatkan.

#### US-12 — Membandingkan skenario harga/biaya (MVP bila waktu · Could)

Sebagai pengguna Calculator, saya ingin membandingkan beberapa skenario harga/biaya agar dapat melihat perbedaan hasil tanpa kehilangan input utama.

- AC-12-01: Skenario hanya menggunakan input manual Calculator dan tidak membaca Diagnosis.
- AC-12-02: Setiap skenario menampilkan asumsi dan hasil dengan rumus yang sama seperti Calculator utama.
- AC-12-03: Skenario tidak mengubah hasil tersimpan utama tanpa tindakan eksplisit pengguna.

#### US-13 — Mengekspor atau mencetak hasil lokal (MVP bila waktu · Could)

Sebagai pengguna, saya ingin mencetak atau menyalin hasil lokal agar dapat membawanya ke diskusi offline.

- AC-13-01: Ekspor/print hanya menggunakan data yang tersedia lokal dan tidak mengirimnya ke server.
- AC-13-02: Output menyertakan disclaimer bahwa diagnosis indikatif dan kalkulator bukan laporan keuangan.
- AC-13-03: Fitur tidak aktif sebelum review privasi dan pengujian penghapusan data lokal.

#### US-10 — Memahami istilah dan contoh pengisian (MVP bila waktu · Should, owner unit ini; permukaan Survey dirujuk unit 002)

Sebagai pengguna dengan literasi bisnis terbatas, saya ingin mendapat bantuan istilah dan contoh agar dapat menjawab Survey serta membaca Calculator dengan benar.

- AC-10-01: Istilah HPP, margin kontribusi, dan titik impas memiliki penjelasan singkat saat pertama digunakan.
- AC-10-02: Contoh pengisian tidak dianggap sebagai jawaban pengguna dan dapat ditutup.
- AC-10-03: Bantuan tidak mengubah scoring atau hasil kalkulator.

Kasus verifikasi kalkulator (Lampiran B salinan):

| Input/kondisi                                        | Expected behavior                                                            |
| ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| `H=10.000`, `V=7.700`, `Q=40`, `D=26`, `F=1.800.000` | `M=2.300`; estimasi laba bersih `592.000`; titik impas `31` unit/hari.       |
| `M=0` atau `M<0`                                     | Penjelasan margin nol/negatif; tidak ada hasil impas/target berbasis volume. |
| `F=0`, `M>0`, `D>0`                                  | Titik impas `0` unit/hari.                                                   |
| `D=0` atau `H=0`                                     | Validasi input; tidak ada pembagian nol atau angka target palsu.             |
| `T` ≤ laba bersih berjalan                           | Target dinyatakan tercapai; tambahan unit `0`.                               |
| Biaya atau volume negatif, `NaN`, atau tak hingga    | Input ditolak dan hasil sebelumnya tidak diganti oleh angka invalid.         |

## 10. Dependencies

- Unit 001: navigasi/rute `/kalkulator`; tautan biasa dari Diagnosis.
- Unit 002/003: tanpa kontrak data (mandiri penuh).
- Unit test rumus kalkulator wajib di quality gate.

## 11. Open Questions

- Urutan Should/Could (US-09/US-10/US-12/US-13) ikut kapasitas; belum diputus.
- Risiko biaya salah input; mitigasi contoh + validasi + batasan (PRD §10).
