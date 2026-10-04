/**
 * Kamus placeholder rute 002–005 — teks sementara sampai isi unit tiba.
 *
 * Aturan: file ini data murni — NOL impor. Tiap rute punya namespace
 * sendiri; hapus entri saat halaman asli dibangun (lihat design.md
 * unit terkait).
 */

export const PLACEHOLDERS = {
  survey: { eyebrow: "Survei", title: "Halaman survei segera hadir" },
  diagnosis: { eyebrow: "Diagnosis", title: "Halaman diagnosis segera hadir" },
  kalkulator: { eyebrow: "Kalkulator", title: "Halaman kalkulator segera hadir" },
  roadmap: { eyebrow: "Roadmap", title: "Halaman roadmap segera hadir" },
} as const;
