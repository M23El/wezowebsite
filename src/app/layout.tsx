import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wezo - Sudan's First E-Commerce Marketplace",
  description:
    "Sudan's first comprehensive e-commerce marketplace connecting buyers and sellers across the country with an Arabic-first experience.",
  keywords: "Sudan, e-commerce, marketplace, Arabic, shopping, online store",
  authors: [{ name: "Wezo Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
