# Standing Constraints

> Berlaku lintas unit. Unit-spesifik di `specs/<unit>/spec.md`.

## Business constraints

- Diagnosis indikatif saja; bukan audit/konsultan/kredit/pajak/klasifikasi hukum/kepatuhan
- Tanpa janji prediksi keberhasilan/pendapatan
- Copy pakai “contoh/langkah dapat dicoba”, bukan hasil pasti
- AI pasca-MVP wajib consent eksplisit, minimisasi, transparansi konteks, evaluasi, fallback non-AI; tak ganti diagnosis deterministik

## Technical constraints

- Next.js App Router + TypeScript; Tailwind/shadcn bila tersedia; tanpa dependency baru tanpa kebutuhan
- Scoring/kalkulasi lokal deterministik; MVP tanpa Neon/Postgres/Route Handler/AI eksternal
- `localStorage` berversi ukuran terbatas; rusak/tak dikenal → abaikan aman + hapus + minta ulang bila perlu
- Data hanya browser sama; hilang saat data situs dibersihkan/privat ditutup/perangkat diganti; tanpa klaim recovery
- Rupiah finite tak negatif; cegah bagi nol; unit ceil; rupiah bulat terdekat
- Quality gate: lint, typecheck, unit test rumus kalkulator, production build

## Organizational constraints

- SIFest Digital Innovation Challenge 2026, Track Digital Economy
- Validasi awal: wawancara 5–10 pelaku + uji prototipe + review pakar; bukan klaim statistik
- Perubahan bobot/ambang picu ulang kasus uji terkait
