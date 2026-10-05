# ADR-002

**Title:** Layered-lite: content / components / app + lib murni
**Status:** Accepted
**Date:** 2026-10-04

## Context

Proyek MVP kecil (5 rute, tanpa backend) tidak butuh hexagonal penuh
(ports/adapters/services/actions). Tapi butuh batas agar copy, UI, dan
logika murni tidak tercampur — pola `lib/landingSurveyContent.ts` campur
nav+landing sudah menunjukkan drift.

## Decision

Tiga lapis longgar (bukan hexagonal ketat):

1. `src/content/` — data teks murni (`as const`, NOL impor). Boleh diimpor
   siapa pun; tidak boleh mengimpor apa pun.
2. `src/components/` + `src/app/` — presentasi. Boleh impor `content/` dan
   `lib/`; tidak boleh menaruh string literal UI (kecuali atribut teknis
   seperti `id`, `aria-*` non-teks tidak dihitung).
3. `src/lib/` (mis. `calculator.ts`, `diagnosis.ts`, `surveyStore.ts`) —
   fungsi murni + I/O `localStorage`. Tidak boleh impor komponen/app;
   tidak boleh menaruh copy UI (pesan error/validasi BOLEH, karena itu
   kontrak perilaku — tapi teksnya tetap dari `content/` bila dipakai
   ulang ≥2 tempat).

Batas yang ditegakkan: `content/` NOL impor (cek:
`grep -r "^import" src/content/`). `lib/` tidak impor `components/`/`app/`.
Komponen tidak impor antar-rute (`app/survey` tidak impor `app/diagnosis`).
Util lintas-rute naik ke `components/` bila dipakai ≥2 rute; komponen
khusus satu rute boleh berdampingan dengan `page.tsx` rute itu.

## Alternatives Considered

- Hexagonal penuh (ports/adapters/services) — ditolak: tanpa backend,
  lapisan tambahan hanya menambah file tanpa batas yang berarti.
- Tanpa lapisan (semua di `app/`) — ditolak: drift copy+logika sudah
  terjadi di `lib/landingSurveyContent.ts`.

## Consequences

File bertambah (~9 kamus), tapi tiap ubah copy/logika tahu persis ke mana.
Naik ke hexagonal penuh hanya bila backend/AI tiba (US-14+).
