import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { resolveSiteUrl } from "@/lib/site-url";

import "./globals.css";

const manrope = localFont({
  src: "../assets/fonts/manrope-latin-variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 800",
  fallback: ["Arial", "sans-serif"],
});

const newsreader = localFont({
  src: [
    {
      path: "../assets/fonts/newsreader-latin-regular.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/newsreader-latin-italic.woff2",
      style: "italic",
      weight: "400",
    },
  ],
  variable: "--font-newsreader",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const title = "SAUCARA — Gâteaux sur mesure à Casablanca";
const description =
  "Prototype de site pour SAUCARA, studio pâtissier fictif à Casablanca : gâteaux personnalisés et douceurs de réception.";

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title,
  description,
  applicationName: "SAUCARA",
  keywords: [
    "gâteau sur mesure Casablanca",
    "pâtisserie événementielle",
    "gâteau mariage Casablanca",
    "SAUCARA",
  ],
  authors: [{ name: "SAUCARA — projet de démonstration" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_MA",
    title,
    description,
    siteName: "SAUCARA",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#123C32",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${newsreader.variable}`}>
      <body>
        <a className="skip-link" href="#contenu-principal">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
