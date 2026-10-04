# PRD — UMIRO

> Thin pointer. Authoritative source tetap `design/PRD draf 5.md` v5.0 (2026-10-04). File ini bukan salinan; jangan tambah requirement di sini.

- Produk: UMIRO (Usaha Mikro dan Growth), SIFest Digital Innovation Challenge 2026, Track Digital Economy
- Status PRD: Draf 5 — siap ditinjau; diagnosis/ambang perlu validasi lapangan
- MVP: Landing `/`, Survey `/survey`, Diagnosis `/diagnosis`, Financial Calculator `/kalkulator`, Roadmap `/roadmap`
- Alur langsung satu-satunya: Survey → Diagnosis (redirect otomatis setelah submit valid)
- Calculator/Roadmap: mandiri, input manual / konten statis, tanpa baca hasil diagnosis
- Non-MVP: `/recommendation`, `/mindmap`, `/chat` (future, butuh consent/evaluasi)
- Penyimpanan: `localStorage` berversi, browser-lokal, tanpa sinkronisasi
- Lihat detail AC: US-01–US-20 di PRD §8 + Lampiran A–E
