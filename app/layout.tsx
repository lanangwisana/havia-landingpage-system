import "./globals.css";
import { Work_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import ScreenshotProtection from "./components/ScreenshotProtection";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Havia Studio | Architecture, Interior & Masterplan Design Studio",
  description:
    "Havia Studio adalah studio desain arsitektur dan interior yang berbasis di Bandung, Jawa Barat. Kami berkomitmen menghadirkan solusi desain yang fungsional, estetis, dan berkelanjutan melalui kolaborasi bersama klien untuk mewujudkan ruang yang sesuai kebutuhan dan harapan.",

  keywords: [
    "Havia Studio",
    "architecture studio",
    "architecture studio Bandung",
    "architecture studio Indonesia",
    "architect Bandung",
    "interior design studio Bandung",
    "arsitek bandung",
    "jasa desain arsitektur bandung",
    "desain interior bandung",
    "architecture and interior design studio",
    "masterplan design studio",
  ],

  authors: [{ name: "Havia Studio" }],

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Havia Studio | Architecture, Interior & Masterplan Design Studio",
    description:
      "Studio arsitektur dan desain interior berbasis di Bandung yang menghadirkan solusi desain fungsional, estetis, dan berkelanjutan.",
    url: "https://web.havia.id/",
    siteName: "Havia Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Havia Studio Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScreenshotProtection>
          {children}
        </ScreenshotProtection>
      </body>
    </html>
  );
}
