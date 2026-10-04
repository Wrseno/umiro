# 006 Pasca-MVP & Batas Scope (E-06 + E-08 + Lampiran D/E)

**Lifecycle:** DRAFT
**Health:** BLOCKED
**Revision:** 4
**Authority:** Turunan `design/PRD draf 5.md` v5.0 untuk unit ini. Bukan otorisasi bangun. PRD §8 authoritative untuk ID/AC; aktivasi butuh spec terpisah + persetujuan.

## 1. Purpose

Mencatat transparan kapabilitas yang tidak dibangun pada MVP (Won't for MVP) dan eksplorasi pasca-MVP yang belum disetujui (Future). Mencegah scope bocor ke MVP. Halaman AI Recommendation dan UMKM Mindmap berada di luar MVP. Conversational AI yang memahami topik roadmap serta jawaban survey/indikator diagnosis adalah kemampuan masa depan yang dipertimbangkan, bukan fitur MVP dan bukan Won't Have.

## 2. Scope

### In Scope (dicatat saja, tidak dibangun)

- Halaman tambahan non-MVP (salinan §6):
  - `/recommendation`: AI Recommendation, memberi saran personal setelah keamanan, privasi, dan kualitas rekomendasi divalidasi.
  - `/mindmap`: UMKM Mindmap, memvisualisasikan hubungan area usaha dan tindakan.
  - `/chat`: Conversational AI, percakapan yang terhubung pada topik roadmap, jawaban survey, dan indikator diagnosis. Ini future scope/Should consider, bukan MVP dan bukan Won't Have.
- Stories E-06 memerlukan consent eksplisit, minimisasi data, transparansi konteks, evaluasi, fallback non-AI, dan larangan mengganti diagnosis deterministik atau memberi keputusan finansial.
- Lampiran D — Backlog Pasca-MVP (salinan):
  1. **Conversational AI (`/chat`)**: percakapan tentang topik roadmap dengan konteks jawaban survey dan indikator diagnosis setelah persetujuan pengguna, minimisasi data, evaluasi kualitas, dan fallback non-AI tersedia.
  2. **AI Recommendation (`/recommendation`)**: rekomendasi personal yang dapat ditelusuri ke indikator, dengan guardrail dan evaluasi.
  3. **UMKM Mindmap (`/mindmap`)**: visualisasi hubungan lever, indikator, dan opsi tindakan.
  4. Evaluasi longitudinal dan perbandingan hasil, hanya setelah persistence yang disetujui.
  5. Ekspor, akun, sinkronisasi, dan fitur pendamping berdasarkan validasi kebutuhan.
  - Tidak ada item backlog yang boleh dipresentasikan sebagai fitur MVP atau bukti dampak sebelum dibangun dan diuji.
- Lampiran E — Deklarasi AI (salinan): AI dapat dipakai dalam proses pengembangan, riset, dokumentasi, dan prototyping. MVP yang direncanakan tidak memakai AI untuk menetapkan diagnosis atau menghasilkan rekomendasi generatif. Conversational AI dan AI Recommendation adalah pengembangan masa depan yang harus mengungkap data yang dikirim, meminta persetujuan, dan menjelaskan bahwa output AI bukan keputusan finansial.
- Epic E-08: Stories di Epic ini wajib tercatat agar batas rilis transparan. Semua berstatus Won't for MVP; artinya tidak dibangun pada rilis ini, bukan larangan permanen. Jika Product Owner kelak mengaktifkan story, scope dan acceptance criteria implementasinya harus dirinci sebelum masuk ke rilis.
  - US-17: Akun, backend persistence, kode pemulihan, dan sinkronisasi lintas perangkat tidak dibangun pada MVP.
  - US-18: Pencatatan transaksi harian tidak dibangun pada MVP; produk tetap berupa diagnosis berkala dan kalkulator manual.
  - US-19: Integrasi marketplace atau layanan pembayaran tidak dibangun pada MVP.
  - US-20: Dashboard multi-UMKM dan fitur komunitas tidak dibangun pada MVP.
- Keputusan produk terkait (salinan §12): Recommendation dan Mindmap adalah tambahan non-MVP. Conversational AI adalah future scope/Should consider, bukan MVP dan bukan Won't Have.

### Out of Scope

- Implementasi/design/tasks apapun di unit ini sekarang. Tidak termasuk MVP: layanan AI, rekomendasi generatif, mindmap interaktif, akun, server database untuk hasil pengguna, pemulihan lintas perangkat, tracking progres roadmap dan evaluasi longitudinal.

## 3. Actors

- Product Owner + engineering architect sebagai pemberi persetujuan kelak.

## 4. User/System Scenarios

- Given PO mengaktifkan future, when masuk rilis, then tulis scope + AC rinci + guardrail/evaluasi + ADR sebelum bangun.
- Given MVP berjalan, when pengguna meminta akun/sinkron/kas harian/integrasi/dashboard/AI, then tolak lingkup dengan merujuk unit ini + PRD §9.

## 5. Functional Requirements

- FR-001: Tidak ada kode/rute `/recommendation`, `/mindmap`, `/chat`, akun, kas harian, integrasi, dashboard di MVP.
- FR-002: Aktivasi future wajib scope + AC rinci + consent/minimisasi/evaluasi/fallback.

## 6. Business Rules

- `Must` = MVP wajib; `Should` = MVP penting, pangkas bila kendala; `Could` = MVP opsional; `Won't for MVP` = tidak dikerjakan di MVP, bukan larangan permanen; `Future` = pasca-MVP, belum disetujui untuk implementasi.
- Prioritas MoSCoW berlaku bagi seluruh US termasuk Future dan Won't. Setiap US memiliki scope dan prioritas MoSCoW sendiri; prioritas tidak diwariskan dari Epic.
- Risiko AI: mengekspos data survey → risiko privasi; mitigasi: persetujuan eksplisit, minimisasi data, kebijakan retensi, fallback lokal.

## 7. Non-Functional Requirements

- — (unit pencatat batas; tanpa perilaku runtime).

## 8. Constraints

- AI future: ungkap data yang dikirim, minta persetujuan, jelaskan output bukan keputusan finansial; jangan ganti diagnosis deterministik.
- Arsitektur server/database hanya dipertimbangkan jika kebutuhan sinkronisasi disetujui kemudian.

## 9. Acceptance Criteria

AC §9 mengikuti PRD §8; format Given-When-Then authoritative di PRD.

#### US-14 — Mendapat rekomendasi AI (Future · Future)

Sebagai pemilik usaha yang menyetujui AI, saya ingin rekomendasi menghubungkan Survey, indikator, dan topik Roadmap.

- AC-14-01: Persetujuan dan data yang dikirim dijelaskan sebelum proses.
- AC-14-02: Rekomendasi merujuk sinyal Survey dan topik Roadmap; tidak mengubah diagnosis deterministik.
- AC-14-03: Output menjelaskan batasan dan fallback saat layanan gagal.

#### US-15 — Berdiskusi tentang Roadmap (Future · Future)

Sebagai pengguna yang menyetujui AI, saya ingin berdiskusi tentang topik Roadmap dengan konteks yang saya setujui.

- AC-15-01: Pengguna memilih topik, meninjau konteks Survey, lalu menyetujui pemrosesan.
- AC-15-02: Chat memakai konteks disetujui saja dan tidak mengubah Survey/Diagnosis.
- AC-15-03: Tanpa konteks cukup, jawab umum dengan label atau minta data.
- AC-15-04: Gangguan AI tidak menghalangi Roadmap statis.

#### US-16 — Melihat Mindmap UMKM (Future · Future)

Sebagai pemilik usaha, saya ingin melihat hubungan area usaha secara visual.

- AC-16-01: Mindmap adalah visualisasi konseptual, bukan skor tervalidasi atau diagnosis.
- AC-16-02: Personalisasi memerlukan consent dan menunjukkan sumber konteks.

#### US-17 — Akun dan sinkronisasi lintas perangkat (Won't for MVP)

Akun, backend persistence, kode pemulihan, dan sinkronisasi lintas perangkat tidak dibangun pada MVP.

#### US-18 — Pencatatan transaksi harian (Won't for MVP)

Pencatatan transaksi harian tidak dibangun pada MVP; produk tetap berupa diagnosis berkala dan kalkulator manual.

#### US-19 — Integrasi marketplace dan pembayaran (Won't for MVP)

Integrasi marketplace atau layanan pembayaran tidak dibangun pada MVP.

#### US-20 — Dashboard pendamping dan komunitas (Won't for MVP)

Dashboard multi-UMKM dan fitur komunitas tidak dibangun pada MVP.

## 10. Dependencies

- Keputusan PO pasca validasi MVP; evaluasi privasi/kualitas AI.

## 11. Open Questions

- Apakah conversational AI memberi nilai nyata setelah pengguna mencoba diagnosis non-AI (PRD §12 #6).
- Kebutuhan ekspor, akun, sinkronisasi, fitur pendamping berdasarkan validasi.
- Perlu divalidasi: tujuh kategori dipahami; jumlah/bobot soal 3 menit; bottleneck membantu; ambang tie; format roadmap; nilai AI.
