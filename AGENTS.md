<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# UMIRO — Aturan Agen

Skill utama: `.agents/.skills/sdd-repo-governance/` (SDD repo governance:
rantai PRD → spec → design → tasks → implementasi → verifikasi; satu
sumber kebenaran per informasi; Lifecycle vs Health; deteksi STALE via
`Revision`/`Reviewed against`). Baca `TODO.md` dulu tiap sesi; catat
kemajuan bermakna di `TODO.md` + `tasks.md` unit terkait.

Arsitektur: layered-lite (ADR-002) — `src/content/` data teks murni
(`as const`, NOL impor), `src/components/` + `src/app/` presentasi,
`src/lib/` fungsi murni + I/O `localStorage`. Batas: `content/` tidak
mengimpor apa pun; `lib/` tidak impor komponen/app; tidak ada impor
antar-rute; util ≥2 rute naik ke `components/`.

Copy UI: dictionary-based (ADR-001) — semua teks di `src/content/`,
impor dari `@/content`. Jangan taruh string literal UI di komponen atau
halaman. Ubah copy = edit kamus. Kualitas: `npm run lint`, `npx tsc
--noEmit`, `npm run build` hijau sebelum klaim selesai.
