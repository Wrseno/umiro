# 001 Orientasi & Navigasi (E-01)

**Lifecycle:** SPECIFIED
**Health:** REVIEW_REQUIRED
**Revision:** 6
**Authority:** Turunan `design/PRD draf 5.md` v5.0 untuk unit ini. PRD §8 authoritative untuk ID/AC; bila konflik, PRD menang hingga spec direvisi.

## 1. Purpose

Membantu pengguna membaca kondisi usaha dalam bahasa sederhana dan memutuskan apakah Survey relevan, lalu berpindah halaman tanpa kebingungan. Landing menjelaskan masalah, batasan hasil, dan CTA dinamis.

## 2. Scope

### In Scope

- Lima halaman nyata MVP: Landing `/`, Survey `/survey`, Diagnosis `/diagnosis`, Financial Calculator `/kalkulator`, dan Roadmap `/roadmap`; layout responsif; persistensi `localStorage` browser-lokal.
- Landing: menjelaskan tujuan UMIRO dan halaman MVP serta CTA dinamis (lihat aturan CTA di bawah).
- Navigasi global + CTA pojok dinamis berbasis status diagnosis:
  - Menu bar (desktop, mobile, footer "Halaman") HANYA memuat 3 item statis: Beranda `/`, Kalkulator `/kalkulator`, Roadmap `/roadmap`. TIDAK ADA entri Survei/Diagnosis di menu dalam kondisi apapun.
  - Akses Survei/Diagnosis dipindah ke button pojok kanan header (`IslandCta`) + CTA Landing (hero, CTA akhir): belum ada hasil valid → label "Mulai Survei", href `/survey`; sudah ada hasil valid → label "Hasil Diagnosis", href `/diagnosis`.
  - Label dan href button pojok + semua CTA diagnosis SELALU sama kondisi pada browser yang sama (satu fungsi status, satu kondisi).
  - Rute `/survey` dan `/diagnosis` tetap ada dan dibuka via button pojok / CTA Landing / tautan kontekstual (termasuk tombol "Isi Survei Baru" di `/diagnosis`), bukan via entri menu.
- Halaman aktif dan label tautan dapat dikenali; berfungsi mobile dan desktop.
- Aturan hubungan halaman:
  1. `Survey → Diagnosis` adalah hubungan langsung. Setelah seluruh jawaban wajib valid dan tersimpan, sistem otomatis mengarahkan pengguna ke `/diagnosis`.
  2. `Diagnosis → Financial Calculator` hanya tautan biasa. Financial Calculator berdiri sendiri, memakai input manual, dan tidak membaca atau mengubah hasil diagnosis.
  3. `Diagnosis → Roadmap` hanya tautan biasa pada MVP. Roadmap selalu menampilkan konten statis penuh dan tidak difilter oleh skor, bottleneck, atau jawaban survey.
  4. Personalisasi topik Roadmap berdasarkan hasil Diagnosis hanya tersedia pada fitur AI pasca-MVP, setelah persetujuan pengguna.
  5. Financial Calculator dan Roadmap dapat dibuka langsung melalui navigasi tanpa menyelesaikan Survey. Diagnosis tanpa hasil valid hanya menampilkan tombol "Isi Survei Baru" ke `/survey`.
  6. Diagnosis ulang HANYA lewat `/diagnosis`: halaman Diagnosis memuat tombol "Isi Survei Baru" menuju `/survey`. Submit survei baru MENIMPA hasil sebelumnya di `localStorage` (hasil lama hilang, tanpa riwayat, tanpa konfirmasi ganda selain tombol eksplisit).
- Alur MVP:
```text
Landing
  ↓ button pojok / CTA (Mulai Survei | Hasil Diagnosis)
Survey (via button/CTA, tanpa entri menu)
  ↓ submit valid; redirect otomatis; timpa hasil lama bila ada
Diagnosis
  ├─ tombol "Isi Survei Baru" → /survey (satu-satunya jalan diagnosis ulang)
  ├─ tautan biasa → Financial Calculator
  └─ tautan biasa → Roadmap
```

### Out of Scope

- Isi Survey/Diagnosis/Kalkulator/Roadmap (unit 002–005).
- Layanan AI, rekomendasi generatif, mindmap interaktif, akun, server database untuk hasil pengguna, pemulihan lintas perangkat, tracking progres roadmap dan evaluasi longitudinal.
- Personalisasi Calculator/Roadmap pada MVP.
- Akun, backend persistence, sinkronisasi lintas perangkat; pencatatan transaksi harian; integrasi marketplace/pembayaran; dashboard multi-UMKM.

## 3. Actors

- Primer: pemilik usaha mikro yang telah berjalan dan memiliki waktu, modal, serta literasi digital terbatas; prioritas awal dapat berupa usaha kuliner rumahan, tetapi kerangka tidak boleh diklaim berlaku untuk semua sektor sebelum validasi.
- Sekunder: pendamping atau komunitas UMKM yang membutuhkan bahan percakapan, bukan dashboard pemantauan.

## 4. User/System Scenarios

- Pengguna baru buka `/`, baca masalah/batasan/CTA "Mulai Survei", lalu pilih button pojok ke `/survey`.
- Pengguna selesaikan Survey valid tersimpan, sistem arahkan otomatis hanya ke `/diagnosis`; button pojok + CTA berubah jadi "Hasil Diagnosis" ke `/diagnosis`.
- Pengguna di Diagnosis klik "Isi Survei Baru", buka `/survey`; submit baru menimpa hasil lama di `localStorage`.
- Pengguna di Diagnosis klik tautan Calculator/Roadmap, dibuka sebagai tautan biasa tanpa parameter; keduanya juga dapat dibuka langsung tanpa Survey.
- Pengguna buka Diagnosis tanpa hasil valid, tampil tombol "Isi Survei Baru" ke `/survey`; button pojok tetap "Mulai Survei".

## 5. Functional Requirements

- FR-001: Landing jelaskan tujuan UMIRO, halaman MVP, button pojok + CTA dinamis ikut status diagnosis.
- FR-002: Landing nyatakan diagnosis indikatif dan batasan non-tujuan.
- FR-003: Landing jelaskan risiko hilang data lokal (data situs dihapus).
- FR-004: Landing tidak klaim personalisasi Calculator/Roadmap.
- FR-005: Menu bar sediakan 3 item statis (Beranda, Kalkulator, Roadmap); tanpa entri Survei/Diagnosis; status aktif dikenali di mobile/desktop (termasuk footer).
- FR-006: Submit Survey valid hanya redirect ke `/diagnosis`.
- FR-007: Button pojok + semua CTA diagnosis selalu sama kondisi (ada/tidak hasil valid di `localStorage` browser yang sama).
- FR-008: Diagnosis memuat tombol "Isi Survei Baru" ke `/survey`; submit baru menimpa hasil lama.

## 6. Business Rules

- `Survey → Diagnosis` satu-satunya hubungan langsung.
- Diagnosis ulang satu-satunya jalan: tombol "Isi Survei Baru" di `/diagnosis` → `/survey`.
- Submit survei baru selalu menimpa hasil sebelumnya di `localStorage`; tidak ada riwayat ganda.
- Menu bar (desktop, mobile, footer) tidak memuat entri Survei/Diagnosis dalam kondisi apapun; aksesnya via button pojok / CTA / tautan kontekstual.
- `Diagnosis → Financial Calculator` dan `Diagnosis → Roadmap` hanya tautan biasa, tanpa parameter filter, skor, atau bottleneck.
- Roadmap adalah halaman MVP nyata, bukan bagian tersamar pada Landing atau Diagnosis. Kontennya luas dan statis.
- Diagnosis bukan audit keuangan, konsultan, atau keputusan kredit. Survey tidak membuktikan sebab-akibat dan tidak menetapkan kelayakan bisnis. Produk tidak menentukan klasifikasi hukum UMKM, kelayakan kredit, kewajiban pajak, atau kepatuhan regulasi.

## 7. Non-Functional Requirements

- Navigasi berfungsi pada mobile dan desktop.
- Target uji: pengguna dapat menemukan bagian dan bernavigasi tanpa bantuan (acuan §7: penyelesaian ≥80% dari 5 pengguna; roadmap temu bagian ≥80%).

## 8. Constraints

- Hasil disimpan pada `localStorage` browser-lokal, tanpa sinkronisasi lintas browser/perangkat atau pemulihan setelah data lokal dihapus.
- Data hanya tersedia pada browser yang sama dan dapat hilang saat data situs dibersihkan atau mode privat ditutup. Jangan klaim recovery.
- Next.js App Router dan TypeScript. Tailwind CSS dan shadcn/ui bila sudah tersedia; tidak menambah dependency tanpa kebutuhan.
- Build quality gate: lint, typecheck, unit test rumus kalkulator, dan production build.

## 9. Acceptance Criteria

AC §9 mengikuti PRD §8; format Given-When-Then authoritative di PRD.

#### US-01 — Memahami produk di Landing (MVP · Must)

Sebagai pemilik usaha, saya ingin memahami manfaat dan batasan UMIRO agar dapat memutuskan apakah Survey relevan.

- AC-01-01: Landing menjelaskan tujuan UMIRO dan halaman MVP serta button pojok + CTA dinamis ikut status diagnosis. *(usulan amandemen PRD)*
- AC-01-02: Landing menyatakan diagnosis indikatif, bukan audit/konsultasi, keputusan kredit, klasifikasi hukum UMKM, penentu pajak, atau kepatuhan.
- AC-01-03: Landing menjelaskan data lokal dapat hilang jika data situs dihapus atau browser/perangkat diganti.
- AC-01-04: Landing tidak mengklaim Calculator/Roadmap dipersonalisasi pada MVP.

#### US-07 — Menavigasi halaman (MVP · Must)

Sebagai pengguna, saya ingin mencapai tiap halaman tanpa kebingungan.

- AC-07-01: Menu bar menyediakan 3 item statis (Beranda, Kalkulator, Roadmap); tanpa entri Survei/Diagnosis. *(usulan amandemen PRD)*
- AC-07-02: Halaman aktif dan label tautan dapat dikenali. Tanpa hasil valid button pojok berlabel "Mulai Survei" ke `/survey`; dengan hasil valid berlabel "Hasil Diagnosis" ke `/diagnosis`. *(usulan amandemen PRD)*
- AC-07-03: Survey valid tersimpan mengarahkan otomatis hanya ke `/diagnosis`.
- AC-07-04: Diagnosis → Calculator dan Diagnosis → Roadmap hanya tautan biasa; kedua halaman juga dapat dibuka tanpa Survey.
- AC-07-05: Navigasi berfungsi pada mobile dan desktop; aturan 3-item + button pojok berlaku di nav desktop, menu mobile, dan footer.
- AC-07-06: Button pojok dan semua CTA diagnosis selalu sama kondisi pada browser yang sama. *(usulan amandemen PRD)*
- AC-07-07: Diagnosis memuat tombol "Isi Survei Baru" ke `/survey`; submit baru menimpa hasil lama. *(usulan amandemen PRD)*

## 10. Dependencies

- Unit 002 sediakan kondisi "jawaban valid tersimpan" untuk redirect + status button pojok (baca `localStorage` yang sama).
- Unit 003 sediakan kondisi "hasil valid tersedia" untuk label button pojok + tombol "Isi Survei Baru".
- Unit 004/005 sediakan rute `/kalkulator`, `/roadmap` sebagai target tautan biasa.

## 11. Open Questions

- Copy final Landing perlu uji 5 pengguna (pemahaman indikasi vs kepastian, relevansi langkah).
- Keputusan produk: page set MVP terdiri dari Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap (PRD §12).
- AMANDEMEN PRD DIPERLUKAN (button pojok dinamis + diagnosis-ulang, menunggu pengesahan teks PRD): (a) AC-07-06/07 + AC-01-01 button-pojok di PRD §8; (b) menu 3 statis tanpa entri Survei/Diagnosis + tombol "Isi Survei Baru" di PRD §6. Persistensi tetap `localStorage` sesuai PRD (tidak berubah). Sampai PRD direvisi, AC baru bertanda *(usulan)* dan PRD tetap upstream.
