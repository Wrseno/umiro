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
  title: "Naik Kelas — Diagnosis Titik Mentok Usaha",
  description:
    "Jawab beberapa pertanyaan singkat, lalu ketahui satu hal yang paling menahan pertumbuhan usaha Anda.",
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
