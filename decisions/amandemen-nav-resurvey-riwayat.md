# Usulan Amandemen PRD draf 5 — Button pojok dinamis + diagnosis ulang + riwayat kalkulator

> Status: DRAF usulan, BELUM disahkan. PRD `design/PRD draf 5.md` tetap
> upstream tidak berubah. RALAT: persistensi TETAP `localStorage`
> (usulan cookie BATAL — tidak ada perubahan storage). Spec
> 001/002/003/004 ditulis mengikuti arah ini dengan marka
> *(usulan amandemen PRD)*. Berlaku setelah PO mengesahkan — lalu teks
> PRD direvisi dan marka dihapus.

## A. Button pojok dinamis + menu 3 statis (PRD §6, §8 US-01/US-07)

1. Menu bar (desktop, mobile, footer "Halaman") HANYA 3 item statis:
   Beranda `/`, Kalkulator `/kalkulator`, Roadmap `/roadmap`.
2. Survei/Diagnosis PINDAH ke button pojok kanan header (`IslandCta`) +
   CTA Landing: tanpa hasil valid → "Mulai Survei" (`/survey`); ada
   hasil valid → "Hasil Diagnosis" (`/diagnosis`). Label+href button
   pojok selalu sama dengan kondisi semua CTA diagnosis.
3. Entri Survei/Diagnosis dilarang di menu dalam kondisi apapun.
   Rute `/survey`, `/diagnosis` tetap ada (via button/CTA/tautan).
4. AC baru: AC-07-06 (konsistensi button↔CTA), AC-07-07 (tombol Isi
   Survei Baru + timpa). AC-07-01/02/05, AC-01-01 direvisi ikut aturan
   button pojok. AC-01-03 tetap wording PRD (`localStorage`).

## B. Persistensi: TETAP `localStorage` (tidak ada amandemen storage)

Usulan cookie BATAL. Seluruh referensi storage di spec/design/task
kembali ke `localStorage` sesuai PRD. Tidak ada baris PRD storage yang
perlu direvisi.

## C. Diagnosis ulang via /diagnosis (PRD §6, §8 US-03/US-04)

1. `/diagnosis` SELALU memuat tombol "Isi Survei Baru" → `/survey`
   (dengan maupun tanpa hasil). Ini SATU-SATUNYA jalan diagnosis ulang.
2. Submit survei baru MENIMPA hasil sebelumnya di `localStorage`
   (tanpa riwayat). Aturan baru: FR-009 (unit 002), FR-010 + AC-04-10
   (unit 003).
3. AC-04-08 direvisi: tanpa hasil → tombol "Isi Survei Baru" (pengganti
   CTA Survey lama).

## D. Riwayat kalkulator: tumpuk + hapus di page (PRD §8 US-05)

1. `/kalkulator` menyimpan TIAP hitungan valid sebagai entri riwayat
   (`umiro.calc.v1`: array `{ id, input, result, savedAt }`) — APPEND,
   bukan timpa.
2. Daftar riwayat tampil di halaman (terbaru dulu); tiap entri dapat
   DIHAPUS langsung di halaman, tanpa konfirmasi ganda.
3. Aturan baru: FR-010 + AC-05-09 (riwayat tumpuk-hapus), AC-05-11
   (payload rusak; nomor AC-05-10 tetap batas pajak).

## E. Daftar baris PRD yang direvisi saat pengesahan

§6 tabel Landing + aturan 5 + alur teks (button pojok, tombol Isi Survei
Baru); §8 AC-01-01, AC-07-01/02/05 (+baru AC-07-06/07); §8 US-03 (+FR-009
timpa); §8 US-04 (+AC-04-10, revisi AC-04-08); §8 US-05 (+FR-010,
AC-05-09, AC-05-11); §8 ringkasan US-07 ("Menavigasi tiga item menu +
button pojok dinamis"). TIDAK termasuk: baris storage manapun (tetap `localStorage`).
