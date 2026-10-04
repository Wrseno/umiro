# 001 Orientasi & Navigasi (E-01)

**Lifecycle:** SPECIFIED
**Health:** VALID
**Revision:** 4
**Authority:** Turunan `design/PRD draf 5.md` v5.0 untuk unit ini. PRD §8 authoritative untuk ID/AC; bila konflik, PRD menang hingga spec direvisi.

## 1. Purpose

Membantu pengguna membaca kondisi usaha dalam bahasa sederhana dan memutuskan apakah Survey relevan, lalu berpindah lima halaman tanpa kebingungan. Landing menjelaskan masalah, batasan hasil, dan CTA ke Survey.

## 2. Scope

### In Scope

- Lima halaman nyata MVP: Landing `/`, Survey `/survey`, Diagnosis `/diagnosis`, Financial Calculator `/kalkulator`, dan Roadmap `/roadmap`; layout responsif; browser-local persistence.
- Landing: menjelaskan tujuan UMIRO dan lima halaman MVP serta CTA ke `/survey`.
- Navigasi global: Landing, Survey, Diagnosis, Financial Calculator, Roadmap; halaman aktif dan label tautan dapat dikenali; berfungsi mobile dan desktop.
- Aturan hubungan halaman:
  1. `Survey → Diagnosis` adalah hubungan langsung. Setelah seluruh jawaban wajib valid dan tersimpan, sistem otomatis mengarahkan pengguna ke `/diagnosis`.
  2. `Diagnosis → Financial Calculator` hanya tautan biasa. Financial Calculator berdiri sendiri, memakai input manual, dan tidak membaca atau mengubah hasil diagnosis.
  3. `Diagnosis → Roadmap` hanya tautan biasa pada MVP. Roadmap selalu menampilkan konten statis penuh dan tidak difilter oleh skor, bottleneck, atau jawaban survey.
  4. Personalisasi topik Roadmap berdasarkan hasil Diagnosis hanya tersedia pada fitur AI pasca-MVP, setelah persetujuan pengguna.
  5. Financial Calculator dan Roadmap dapat dibuka langsung melalui navigasi tanpa menyelesaikan Survey. Diagnosis tanpa hasil lokal valid hanya menampilkan CTA kembali ke Survey.
- Alur MVP:
```text
Landing
  ↓ CTA ke /survey
Survey
  ↓ submit valid; redirect otomatis
Diagnosis
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

- Pengguna baru buka `/`, baca masalah/batasan/CTA, lalu pilih ke `/survey`.
- Pengguna selesaikan Survey valid tersimpan, sistem arahkan otomatis hanya ke `/diagnosis`.
- Pengguna di Diagnosis klik tautan Calculator/Roadmap, dibuka sebagai tautan biasa tanpa parameter; keduanya juga dapat dibuka langsung tanpa Survey.
- Pengguna buka Diagnosis tanpa payload valid, tampil CTA kembali ke Survey.

## 5. Functional Requirements

- FR-001: Landing jelaskan tujuan UMIRO, lima halaman MVP, CTA `/survey`.
- FR-002: Landing nyatakan diagnosis indikatif dan batasan non-tujuan.
- FR-003: Landing jelaskan risiko hilang data lokal.
- FR-004: Landing tidak klaim personalisasi Calculator/Roadmap.
- FR-005: Navigasi sediakan lima halaman dengan status aktif dikenali di mobile/desktop.
- FR-006: Submit Survey valid hanya redirect ke `/diagnosis`.

## 6. Business Rules

- `Survey → Diagnosis` satu-satunya hubungan langsung.
- `Diagnosis → Financial Calculator` dan `Diagnosis → Roadmap` hanya tautan biasa, tanpa parameter filter, skor, atau bottleneck.
- Roadmap adalah halaman MVP nyata, bukan bagian tersamar pada Landing atau Diagnosis. Kontennya luas dan statis.
- Diagnosis bukan audit keuangan, konsultan, atau keputusan kredit. Survey tidak membuktikan sebab-akibat dan tidak menetapkan kelayakan bisnis. Produk tidak menentukan klasifikasi hukum UMKM, kelayakan kredit, kewajiban pajak, atau kepatuhan regulasi.

## 7. Non-Functional Requirements

- Navigasi berfungsi pada mobile dan desktop.
- Target uji: pengguna dapat menemukan bagian dan bernavigasi tanpa bantuan (acuan §7: penyelesaian ≥80% dari 5 pengguna; roadmap temu bagian ≥80%).

## 8. Constraints

- Hasil disimpan pada `localStorage` atau browser storage lokal, bukan cookie, dan tidak menyediakan sinkronisasi lintas browser/perangkat atau pemulihan setelah data lokal dihapus.
- Data hanya tersedia pada browser yang sama dan dapat hilang saat data situs dibersihkan atau mode privat ditutup. Jangan klaim recovery.
- Next.js App Router dan TypeScript. Tailwind CSS dan shadcn/ui bila sudah tersedia; tidak menambah dependency tanpa kebutuhan.
- Build quality gate: lint, typecheck, unit test rumus kalkulator, dan production build.

## 9. Acceptance Criteria

AC §9 mengikuti PRD §8; format Given-When-Then authoritative di PRD.

#### US-01 — Memahami produk di Landing (MVP · Must)

Sebagai pemilik usaha, saya ingin memahami manfaat dan batasan UMIRO agar dapat memutuskan apakah Survey relevan.

- AC-01-01: Landing menjelaskan tujuan UMIRO dan lima halaman MVP serta CTA ke `/survey`.
- AC-01-02: Landing menyatakan diagnosis indikatif, bukan audit/konsultasi, keputusan kredit, klasifikasi hukum UMKM, penentu pajak, atau kepatuhan.
- AC-01-03: Landing menjelaskan data lokal dapat hilang jika data situs dihapus atau browser/perangkat diganti.
- AC-01-04: Landing tidak mengklaim Calculator/Roadmap dipersonalisasi pada MVP.

#### US-07 — Menavigasi halaman (MVP · Must)

Sebagai pengguna, saya ingin mencapai tiap halaman tanpa kebingungan.

- AC-07-01: Navigasi menyediakan Landing, Survey, Diagnosis, Financial Calculator, Roadmap.
- AC-07-02: Halaman aktif dan label tautan dapat dikenali.
- AC-07-03: Survey valid tersimpan mengarahkan otomatis hanya ke `/diagnosis`.
- AC-07-04: Diagnosis → Calculator dan Diagnosis → Roadmap hanya tautan biasa; kedua halaman juga dapat dibuka tanpa Survey.
- AC-07-05: Navigasi berfungsi pada mobile dan desktop.

## 10. Dependencies

- Unit 002 sediakan kondisi "jawaban valid tersimpan" untuk redirect.
- Unit 004/005 sediakan rute `/kalkulator`, `/roadmap` sebagai target tautan biasa.

## 11. Open Questions

- Copy final Landing perlu uji 5 pengguna (pemahaman indikasi vs kepastian, relevansi langkah).
- Keputusan produk: page set MVP terdiri dari Landing, Survey, Diagnosis, Financial Calculator, dan Roadmap (PRD §12).
