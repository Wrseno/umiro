/**
 * Kamus Landing `/` — satu-satunya sumber teks halaman utama.
 *
 * Aturan: file ini data murni — NOL impor. Ubah teks di sini,
 * jangan di `src/app/page.tsx`.
 */

export const LANDING = {
  eyebrow: "UMIRO · Baca dulu, baru gerak",
  title: "Usaha jalan terus, tapi ke mana?",
  introLead:
    "UMIRO memeriksa lima sinyal warung Anda — uang, harga, pelanggan, jangkauan, kapasitas — lalu menunjuk",
  introStrong: "satu fokus pemeriksaan indikatif",
  introTail: " plus langkah murah seminggu dan panduan yang langsung bisa dibaca.",
  primaryCta: "Mulai Survei",
  primaryHref: "/survey",
  reassurance:
    "Gratis · tanpa daftar · jawaban hanya di browser ini, hilang bila data situs dihapus",
  sorotan: [
    { angka: "3 mnt", label: "Cukup jawab jujur, satu layar satu soal" },
    { angka: "5 sinyal", label: "Uang, harga, pelanggan, jangkauan, kapasitas" },
    { angka: "1 fokus", label: "Satu area dulu, jangan semua sekaligus" },
    { angka: "Rp0", label: "Gratis tanpa akun, tanpa kirim data" },
  ] as Array<{ angka: string; label: string }>,
  langkahEyebrow: "Alur",
  langkahTitle: "Cerita — terima peta — gerak",
  langkahBody:
    "Tidak perlu siap. Tidak perlu rapi. Mulai dari kondisi apa adanya.",
  langkah: [
    {
      no: "01",
      title: "Cerita 3 menit",
      body: "Jawab kondisi kios atau warung apa adanya. Otomatis tersimpan di HP ini.",
    },
    {
      no: "02",
      title: "Terima peta",
      body: "Dapat satu area risiko paling kuat. Petunjuk awal, bukan vonis mati.",
    },
    {
      no: "03",
      title: "Gerak seminggu",
      body: "Kerjakan satu perbaikan murah. Cek ulang pakai Kalkulator, catat arah di Roadmap.",
    },
  ],
  sinyalEyebrow: "Cek sendiri",
  sinyalTitle: "Mana yang bunyi di usaha Anda?",
  sinyalBody:
    "Enam pola paling sering bikin usaha mikro mentok. Dugaan awal — survei yang buktikan.",
  sinyal: [
    "Laci campur: omzet masuk, belanja dapur ikut ambil, sisa tidak jelas.",
    "Harga kira-kira: ikut sebelah, bahan naik langsung kerja bakti.",
    "Semua sendiri: buka, masak, kasir, belanja, antar — tambah laku tambah lelah.",
    "Langganan hilang: yang balik tidak dicatat, yang pergi tidak sadar.",
    "Lompat pagar: mau online dan cabang, padahal catat dan harga belum beres.",
    "Tanpa jejak: tidak ada catat harian, bandingkan minggu lalu cuma kira-kira.",
  ],
  fokusEyebrow: "Akar mentok",
  fokusTitle: "Putaran capek yang sama",
  fokusBody:
    "Bukan soal malas atau kurang modal. Tiga hal ini saling kunci hingga tidak ada sisa buat maju.",
  penyebab: [
    {
      no: "01",
      title: "Uang tidak pisah",
      body: "Satu dompet untuk kulakan dan dapur. Akhir bulan bingung: laku ramai kok kantong kosong.",
    },
    {
      no: "02",
      title: "Modal per porsi gelap",
      body: "Tidak tahu satu porsi habis berapa. Naikkan harga takut, bertahan malah rugi.",
    },
    {
      no: "03",
      title: "Badan jadi sistem",
      body: "Semua menempel di pemilik. Sakit sehari, warung goyang. Mau tambah laku, takut tambah capek.",
    },
  ],
  arahEyebrow: "Jalan keluar",
  arahTitle: "Tiga kebiasaan pemutus putaran",
  arahBody: "Pilih sesuai area risiko Anda. Satu minggu, satu kebiasaan, lihat catatannya.",
  arah: [
    {
      title: "Dua wadah 7 hari",
      body: "Satu toples usaha, satu dompet rumah. Catat tiap keluar masuk. Bocor langsung kelihatan.",
    },
    {
      title: "Coret modal di kertas",
      body: "Jumlah semua bahan, bagi jumlah porsi. Tempel di dinding dapur sebagai patokan harga.",
    },
    {
      title: "Satu target kecil",
      body: "Contoh: catat tiap hari 7 hari berturut. Berhasil baru tambah target lain.",
    },
  ],
  lanjutEyebrow: "Alat mandiri",
  lanjutTitle: "Hitung dan petakan sendiri",
  lanjutBody:
    "Dua halaman MVP yang berdiri sendiri. Buka kapan saja tanpa survei. Isinya sama untuk semua orang pada MVP.",
  lanjut: [
    {
      title: "Kalkulator keuangan",
      body: "Simulasi modal per porsi dan coba harga. Ketik manual, tidak narik data survei.",
      href: "/kalkulator",
      label: "Buka Kalkulator",
    },
    {
      title: "Roadmap 4 minggu",
      body: "Urutan langkah statis minggu 1–4. Bukan rencana personal hasil diagnosis.",
      href: "/roadmap",
      label: "Buka Roadmap",
    },
  ] as Array<{ title: string; body: string; href: string; label: string }>,
  batasEyebrow: "Jujur dulu",
  batasTitle: "Tiga hal yang bukan kerja UMIRO",
  batasBody: "Supaya tidak salah harap sebelum tekan tombol survei.",
  batas: [
    {
      title: "Bukan audit",
      body: "Tidak memeriksa laporan, tidak memberi label sehat atau gagal.",
    },
    {
      title: "Bukan urusan bank dan pajak",
      body: "Tidak menentukan kredit, kelas UMKM, pajak, atau izin.",
    },
    {
      title: "Bisa hilang",
      body: "Data hanya di browser ini. Ganti HP atau bersih-bersih data sama dengan ulang dari nol.",
    },
  ],
  proofEyebrow: "Bukti 3 menit",
  proofValue: "1 fokus",
  proofBody:
    "Contoh: setelah jawab semua, sistem menandai satu area paling berisiko untuk diperiksa dulu.",
  proofRows: [
    ["Waktu", "±3 menit"],
    ["Cara", "satu soal selayar"],
    ["Sifat", "indikatif saja"],
  ] as Array<[string, string]>,
  ctaTitle: "Berani cek 3 menit?",
  ctaBody:
    "Gratis tanpa daftar. Jawaban di HP ini saja. Hasilnya peta awal, bukan vonis.",
  ctaButton: "Mulai Survei",
} as const;
