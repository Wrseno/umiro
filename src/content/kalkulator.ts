/**
 * Kamus Kalkulator `/kalkulator` — satu-satunya sumber teks halaman ini.
 *
 * Aturan: file ini data murni — NOL impor. Kunci `errors` dan `fields`
 * mengikuti kode di `src/lib/calculator.ts`.
 */

export const KALKULATOR = {
  meta: {
    title: "Kalkulator Usaha | UMIRO",
    description:
      "Hitung margin per unit, estimasi laba bulanan, titik impas, dan target penjualan dari angka usaha Anda sendiri.",
  },
  eyebrow: "Kalkulator",
  title: "Hitung margin, laba, dan titik impas usaha Anda",
  intro:
    "Masukkan angka usaha Anda sendiri. Hasil berubah langsung saat angka diubah. Kalkulator ini tidak membaca hasil survei atau diagnosis.",

  contoh: {
    title: "Contoh pengisian",
    body: "Warung nasi menjual 40 porsi sehari seharga Rp10.000. Bahan per porsi Rp7.700, buka 26 hari sebulan, biaya tetap (sewa, listrik, gas) Rp1.800.000 sebulan.",
    note: "Ini hanya contoh, bukan jawaban Anda. Angka contoh tidak dimasukkan ke kolom.",
    close: "Tutup contoh",
    open: "Lihat contoh pengisian",
  },

  sections: {
    jual: "Penjualan",
    biaya: "Biaya",
    target: "Target (opsional)",
    kanal: "Cara menjual",
  },

  fields: {
    harga: { label: "Harga jual per unit", hint: "Rupiah, mis. 10.000", suffix: "Rp" },
    biayaUnit: {
      label: "Biaya bahan per unit (HPP)",
      hint: "Biaya yang ikut naik setiap unit terjual",
      suffix: "Rp",
    },
    biayaBatch: { label: "Biaya satu kali produksi", hint: "Mis. belanja bahan untuk satu panci", suffix: "Rp" },
    unitBatch: { label: "Jumlah unit dari satu produksi", hint: "Mis. 1 panci = 25 porsi", suffix: "unit" },
    volume: { label: "Unit terjual per hari", hint: "Rata-rata hari biasa", suffix: "unit" },
    hari: { label: "Hari buka per bulan", hint: "1–31 hari", suffix: "hari" },
    biayaTetap: {
      label: "Biaya tetap per bulan",
      hint: "Sewa, listrik, gas, gaji: biaya yang tetap dibayar walau tidak ada penjualan",
      suffix: "Rp",
    },
    target: { label: "Target laba bersih per bulan", hint: "Kosongkan bila tidak perlu", suffix: "Rp" },
    potongan: {
      label: "Potongan platform",
      hint: "Persen dari harga jual, mis. 20. Kosongkan bila belum tahu.",
      suffix: "%",
    },
  },

  modeBiaya: {
    legend: "Cara menghitung biaya bahan",
    unit: "Per unit",
    batch: "Per sekali produksi",
  },

  kanal: {
    legend: "Cara menjual",
    langsung: "Langsung ke pembeli",
    platform: "Lewat platform (ojol, marketplace)",
  },

  errors: {
    wajib: "Wajib diisi.",
    format: "Gunakan angka bulat tanpa koma, mis. 10000 atau 10.000.",
    negatif: "Tidak boleh negatif.",
    "harga-nol": "Harga jual harus lebih dari 0.",
    "hari-nol": "Hari buka harus lebih dari 0.",
    "hari-maks": "Maksimal 31 hari dalam sebulan.",
    "unit-batch-nol": "Jumlah unit harus lebih dari 0.",
    "persen-rentang": "Potongan harus di bawah 100%.",
  } as Record<string, string>,

  hasil: {
    title: "Hasil",
    kosong: "Isi semua kolom wajib untuk melihat hasil.",
    usang:
      "Ada isian yang belum benar. Hasil di bawah masih memakai angka benar terakhir.",
    margin: "Margin kontribusi per unit",
    perUnit: "/ unit",
    marginPersen: (p: number) => `${p}% dari harga`,
    marginSub: (harga: string, margin: string) =>
      `Dari harga ${harga}, yang tersisa setelah biaya bahan adalah ${margin} per unit.`,
    impasNote: "Penjualan minimum agar tidak rugi",
    labaNote: "Setelah dikurangi biaya bahan dan biaya tetap",
    laba: "Estimasi laba bersih per bulan",
    impas: "Titik impas",
    target: "Penjualan untuk target",
    unitPerHari: "unit/hari",
    targetTercapai: "Target sudah tercapai dengan penjualan sekarang.",
    targetTambahan: (n: number) => `Perlu tambahan ${n} unit/hari dari penjualan sekarang.`,
    tidakDihitung: "Tidak dihitung",
    targetTidakValid: "Tidak dapat dihitung selama margin per unit tidak positif.",
    marginNonPositif:
      "Margin per unit nol atau negatif: setiap unit terjual tidak menutup biaya bahannya. Menambah penjualan justru memperbesar rugi, sehingga titik impas dan target berbasis jumlah unit tidak ditampilkan. Periksa harga jual atau biaya bahan.",
    labaNegatif: "Dengan angka sekarang, usaha diperkirakan rugi setiap bulan.",
  },

  banding: {
    title: "Langsung vs lewat platform",
    intro: "Semua angka sama, kecuali harga yang diterima dipotong platform.",
    langsung: "Langsung",
    platform: "Platform",
    hargaDiterima: "Harga diterima per unit",
    isiPotongan: "Isi potongan platform untuk melihat perbandingan.",
    slider: "Atau geser untuk mencoba potongan lain",
    marginPlatformNonPositif:
      "Setelah potongan, margin per unit lewat platform nol atau negatif. Setiap penjualan lewat platform tidak menutup biaya bahan; titik impas platform tidak ditampilkan.",
  },

  istilah: {
    title: "Arti istilah",
    items: [
      {
        term: "HPP",
        body: "Harga Pokok Penjualan: biaya bahan dan kemasan untuk membuat satu unit produk.",
      },
      {
        term: "Margin kontribusi",
        body: "Harga jual dikurangi biaya bahan per unit. Inilah sisa uang dari setiap unit untuk menutup biaya tetap dan menjadi laba.",
      },
      {
        term: "Titik impas",
        body: "Jumlah unit yang harus terjual per hari agar usaha tidak rugi dan tidak untung. Di atas angka ini, usaha mulai mendapat laba.",
      },
    ],
  },

  batasan: {
    title: "Batasan perhitungan",
    items: [
      "Ini estimasi dari angka yang Anda isi, bukan laporan keuangan.",
      "Pajak, penyusutan alat, dan upah untuk tenaga Anda sendiri belum dihitung kecuali Anda masukkan ke biaya tetap.",
      "Angka tersimpan di browser ini saja dan hilang bila data situs dihapus.",
    ],
  },

  simpan: {
    tersimpan: "Isian benar terakhir tersimpan di browser ini.",
    gagal: "Browser tidak mengizinkan penyimpanan. Hasil tetap tampil, tetapi tidak tersimpan.",
    rusak: "Data kalkulator yang tersimpan sebelumnya rusak dan sudah dibersihkan.",
    reset: "Kosongkan semua",
  },
} as const;
