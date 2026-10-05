# Tasks — 005 Roadmap Statis

> Pelaksanaan panduan baca-saja. Status: `/roadmap` live; copy 15 butir
> perlu tinjauan tim (bahasa bukan janji) + uji pengguna T005.

**Lifecycle:** IMPLEMENTING
**Health:** VALID
**Traces to:** `design.md`, `spec.md` (unit ini)
**Reviewed against:** spec revision 4, design DRAFT

- [x] T001 Rute `/roadmap` terpasang (placeholder `ComingSoon`)
- [x] T002 Kamus `src/content/roadmap.ts`: 15 butir → judul + cara + contoh kuliner + lever + tahap (AC-06-02)
- [x] T003 `src/app/roadmap/page.tsx` (server, statis): TOC anchor `#survival/#improvement/#growth`, tiga seksi, strip 4 levers, catatan opsi-kontekstual (AC-06)
- [x] T004 Lint copy janji: `src/lib/roadmap-copy.test.ts` larang "pasti/dijamin/jaminan/naik X%" (AC-06-04)
- [ ] T005 Uji temu-bagian + satu tindakan sesuai konteks ≥80% dari 5 pengguna
