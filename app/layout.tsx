import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumière — Premium Modern Store",
  description: "Discover curated products crafted for modern living. Quality, style, and value in every piece.",
  keywords: ["e-commerce", "premium", "modern", "lifestyle", "shop"],
  openGraph: {
    title: "Lumière — Premium Modern Store",
    description: "Discover curated products crafted for modern living.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#FAFAF8] text-slate-900 font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}