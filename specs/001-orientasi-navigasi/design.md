# Design — 001 Orientasi & Navigasi

> Kontrak solusi unit shell + Landing. Implementasi sudah live dan
> terdokumentasi di sini apa adanya. Traces ke `spec.md` US-01, US-07.

**Lifecycle:** DRAFT
**Health:** REVIEW_REQUIRED
**Traces to:** `spec.md` rev 6 (unit ini) · PRD §6, §8.5 (US-01, US-07)
**Reviewed against:** spec revision 6

## Architecture

App Router Next.js 16 + React 19. Satu `AppShell` (client component)
membungkus semua rute: skip-link a11y, `IslandNav` sticky, `<main
id="konten">`, `SiteFooter`. Copy Landing terpusat di `src/content/` (ADR-001): `landing.ts`
(`LANDING`), `nav.ts` (`NAV_STATIC` tiga entri + `DiagnosisCta` button pojok dinamis), `shared.ts`
(`SHARED`), `site.ts` (`SITE`). Halaman tidak menaruh string literal.
Amandemen button-pojok (disetujui): menu bar HANYA 3 item statis
(Beranda, Kalkulator, Roadmap); Survei/Diagnosis pindah ke button
pojok kanan header + CTA Landing yang dinamis via `DiagnosisCta`
(lihat Components + tasks T008).

Sumber status diagnosis: baca `localStorage` kunci `umiro.survey` / `umiro.diagnosis`
(client-side, setelah mount; SSR render fallback "Mulai Survei" agar
tidak hydration mismatch). Util `hasValidResult()` dipakai bersama
oleh nav, CTA hero, CTA akhir, `IslandCta` — satu fungsi, satu kondisi.

## Components

- `AppShell` (`src/components/AppShell.tsx`): `IslandNav` (nav desktop
  3 item statis + tombol hamburger mobile), `SiteBrand`, `IslandCta`
  (button pojok: label/href dinamis ikut status diagnosis), `SiteFooter`
  (nav bawah: Beranda/Kalkulator/Roadmap saja; kolom Batasan +
  Privasi/Syarat). Menu mobile: overlay `fixed inset-0`, tutup via
  Escape, lock `body.overflow`, tutup otomatis di `md:` via
  `matchMedia`. Menu mobile juga HANYA 3 item statis (tanpa Survei/Diagnosis).
- `DiagnosisCta` (komponen baru, client leaf; dipakai `IslandCta`, hero
  CTA, CTA akhir): baca `hasValidResult()`; tanpa hasil →
  `<Link href="/survey">Mulai Survei</Link>`; ada hasil →
  `<Link href="/diagnosis">Hasil Diagnosis</Link>`. BUKAN item menu —
  button pil pojok kanan header + CTA seksi.
  Status aktif: `pathname === href` eksak (button ikut aturan sama).
- `Reveal` (`src/components/Reveal.tsx`): client leaf,
  `IntersectionObserver` threshold 0.12, tambah `is-visible` sekali lalu
  `unobserve`. Stagger via `--index` → `transition-delay`.
- `ComingSoon`: placeholder netral rute 002–005 (eyebrow + judul + CTA
  Beranda). Bukan bagian kontrak visual unit ini selain eksistensinya.
- `src/app/page.tsx`: Landing — Hero split editorial, panel proof gelap,
  sorotan bento, sinyal (6 hipotesis), penyebab (3), arah (3), CTA akhir.
- `src/app/privasi/page.tsx`, `src/app/syarat/page.tsx`: pendukung di
  luar lima MVP; nyatakan penyimpanan lokal + diagnosis indikatif.

## Domain Model

Dua state client: `open` boolean menu mobile (lokal `IslandNav`) +
`hasResult: boolean | null` (`null` = belum baca `localStorage` → render
fallback "Mulai Survei"). `pathname` dari `usePathname` untuk
`aria-current`.

## Data Model

`localStorage` (dibaca, bukan ditulis unit ini): kunci `umiro.survey.v<V>` dan/atau
`umiro.diagnosis.v<V>`. Ada salah satu valid → button pojok "Hasil Diagnosis".
Util baca: `JSON.parse`, gagal parse/versi asing → anggap tanpa hasil.

## Interfaces

- Kontrak ke unit 002/003: kunci hasil valid (nama + skema versi
  ditetapkan unit 002/003); unit ini HANYA baca status ada/tidak.
- Rute `/survey`, `/diagnosis` tetap ada; dibuka via slot/CTA/tautan
  kontekstual, bukan entri statis.
- Tautan Diagnosis → Calculator/Roadmap: `<Link>` biasa tanpa query/param.
- Footer rujuk `/privasi`, `/syarat` (halaman pendukung, bukan MVP).

## State Transitions

Menu mobile: tutup → buka (klik hamburger) → tutup (klik tautan /
Escape / resize ≥768px). Button pojok: `unknown → tanpa-hasil |
ada-hasil`; berubah saat `localStorage` ditulis/ditimpa — dengar event `storage`
antar-tab + baca ulang tiap mount/navigasi.

## Error Handling

- Rute tak dikenal: `src/app/not-found.tsx`.
- `matchMedia` hanya di `useEffect`; tidak ada akses `window` saat SSR.

## Security

Tanpa form, tanpa fetch, tanpa cookie. `localStorage` yang dibaca
tanpa PII; tidak dikirim ke server mana pun oleh unit ini. Tidak ada
permukaan serangan selain navigasi.

## Integration

`globals.css` token Genesis→UMIRO: emerald `#047857` satu-satunya aksen
interaktif, amber `#B45309` untuk sorotan non-interaktif, kurva
`--ease-fluid`, utilitas `card`, `eyebrow`, `bezel`, `transition-fluid`,
`.reveal`/`.io-reveal`, `.panel-dark`, grain `body::after`. Font:
GeneralSans lokal + DM Sans + JetBrains Mono via `layout.tsx`.

## Migration Strategy

`NAV.links` lima entri → `NAV_STATIC` tiga entri + `DiagnosisCta`.
`IslandCta` statis → dinamis (button pojok). Copy "lima halaman MVP" → "halaman MVP" +
CTA dinamis. Perubahan copy Landing
= edit `src/content/*.ts` + catat TODO (trivial change).

## Alternatives Considered

- Nav server-side: ditolak, butuh `usePathname` untuk status aktif.
- Menu mobile tanpa JS: ditolak, butuh Escape + scroll-lock + stagger.
