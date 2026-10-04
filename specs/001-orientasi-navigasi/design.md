# Design — 001 Orientasi & Navigasi

> Kontrak solusi unit shell + Landing. Implementasi sudah live dan
> terdokumentasi di sini apa adanya. Traces ke `spec.md` US-01, US-07.

**Lifecycle:** DESIGNED
**Health:** VALID
**Traces to:** `spec.md` (unit ini) · PRD §6, §8.5 (US-01, US-07)
**Reviewed against:** spec revision 4

## Architecture

App Router Next.js 16 + React 19. Satu `AppShell` (client component)
membungkus semua rute: skip-link a11y, `IslandNav` sticky, `<main
id="konten">`, `SiteFooter`. Copy Landing terpusat di
`src/lib/landingSurveyContent.ts` (`LANDING_CONTENT`, `NAV_CONTENT`,
`NAV_LINKS`) — halaman tidak menaruh string literal.

## Components

- `AppShell` (`src/components/AppShell.tsx`): `IslandNav` (nav desktop +
  CTA + tombol hamburger mobile), `SiteBrand`, `IslandCta` (selalu ke
  `/survey`), `SiteFooter` (nav bawah + kolom Batasan + Privasi/Syarat).
  Menu mobile: overlay `fixed inset-0`, tutup via Escape, lock
  `body.overflow`, tutup otomatis di `md:` via `matchMedia`.
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

Tidak ada entitas domain. Satu-satunya state: `open` boolean menu mobile
(lokal `IslandNav`) + `pathname` dari `usePathname` untuk `aria-current`.

## Data Model

Tanpa persistensi. `NAV_LINKS` lima entri: `/`, `/survey`, `/diagnosis`,
`/kalkulator`, `/roadmap`. Status aktif: `pathname === href` eksak.

## Interfaces

- Kontrak ke unit 002: kondisi "jawaban valid tersimpan" memicu redirect
  ke `/diagnosis` (implementasi di unit 002, bukan di sini).
- Tautan Diagnosis → Calculator/Roadmap: `<Link>` biasa tanpa query/param.
- Footer rujuk `/privasi`, `/syarat` (halaman pendukung, bukan MVP).

## State Transitions

Menu mobile: tutup → buka (klik hamburger) → tutup (klik tautan /
Escape / resize ≥768px). Tidak ada state global.

## Error Handling

- Rute tak dikenal: `src/app/not-found.tsx`.
- `matchMedia` hanya di `useEffect`; tidak ada akses `window` saat SSR.

## Security

Tanpa form, tanpa fetch, tanpa cookie. Tidak ada permukaan serangan
selain navigasi statis.

## Integration

`globals.css` token Genesis→UMIRO: emerald `#047857` satu-satunya aksen
interaktif, amber `#B45309` untuk sorotan non-interaktif, kurva
`--ease-fluid`, utilitas `card`, `eyebrow`, `bezel`, `transition-fluid`,
`.reveal`/`.io-reveal`, `.panel-dark`, grain `body::after`. Font:
GeneralSans lokal + DM Sans + JetBrains Mono via `layout.tsx`.

## Migration Strategy

Tidak ada migrasi. Perubahan copy Landing = edit
`landingSurveyContent.ts` + catat TODO (trivial change).

## Alternatives Considered

- Nav server-side: ditolak, butuh `usePathname` untuk status aktif.
- Menu mobile tanpa JS: ditolak, butuh Escape + scroll-lock + stagger.
