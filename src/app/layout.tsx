import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// General Sans tidak tersedia di next/font/google — berkasnya di-host
// sendiri agar aplikasi tidak memanggil domain luar saat demonstrasi.
const generalSans = localFont({
  src: "../fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  weight: "200 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UMIRO — Diagnosis Indikatif Usaha Mikro",
  description:
    "Jawab beberapa pertanyaan singkat, lalu ketahui satu area pemeriksaan yang paling menahan pertumbuhan usaha Anda.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "UMIRO — Diagnosis Indikatif Usaha Mikro",
    description:
      "Jawab beberapa pertanyaan singkat, lalu ketahui satu area pemeriksaan yang paling menahan pertumbuhan usaha Anda.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://picsum.photos/seed/umiro-warung/1200/630",
        width: 1200,
        height: 630,
        alt: "Pemilik usaha mikro memeriksa catatan keuangan di warung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMIRO — Diagnosis Indikatif Usaha Mikro",
    description:
      "Jawab beberapa pertanyaan singkat, lalu ketahui satu area pemeriksaan yang paling menahan pertumbuhan usaha Anda.",
    images: ["https://picsum.photos/seed/umiro-warung/1200/630"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${generalSans.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
