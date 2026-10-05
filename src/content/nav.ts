/**
 * Kamus navigasi + shell — satu-satunya sumber teks nav/footer/CTA.
 *
 * Pola: nested-namespace dictionary (`NAV.links`, `NAV.cta.*`).
 * Aturan: file ini data murni — NOL impor. Ubah teks di sini,
 * jangan di komponen.
 */

export interface NavLink {
  href: string;
  label: string;
}

/** Menu bar: 3 item statis. Survei/Diagnosis via button pojok dinamis. */
export const NAV = {
  brand: "UMIRO",
  brandSub: "Usaha Mikro dan Growth",
  links: [
    { href: "/", label: "Beranda" },
    { href: "/kalkulator", label: "Kalkulator" },
    { href: "/roadmap", label: "Roadmap" },
  ] as NavLink[],
  menuOpen: "Buka menu",
  menuClose: "Tutup menu",
  navMainLabel: "Navigasi utama",
  navMobileLabel: "Menu",
  navFooterLabel: "Navigasi bawah",
  footerPagesHeading: "Halaman",
  footerLimitationsHeading: "Batasan",
  menuNote: "Gratis · Tanpa daftar · Data tersimpan di browser ini saja",
  diagnosisCta: {
    emptyLabel: "Mulai Survei",
    emptyShortLabel: "Survei",
    emptyHref: "/survey",
    readyLabel: "Hasil Diagnosis",
    readyShortLabel: "Diagnosis",
    readyHref: "/diagnosis",
  },
  footerDescription:
    "UMIRO membantu pemilik usaha mikro membaca kondisi usaha dan memilih satu area pemeriksaan awal. Hasil bersifat indikatif, bukan kepastian.",
  footerLimitations: [
    "Hasil bersifat indikatif: bahan memutuskan, bukan vonis.",
    "Data tersimpan di browser ini saja; hilang bila data situs dihapus.",
  ],
  footerGratis: "Gratis · tanpa daftar",
  legal: [
    { href: "/privasi", label: "Privasi" },
    { href: "/syarat", label: "Syarat" },
  ] as NavLink[],
} as const;
