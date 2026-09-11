import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AtmosphereBackground from "@/components/layout/AtmosphereBackground";
import { site } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  Fonts — self-hosted via Fontsource: Baloo 2 (chunky display),      */
/*  Nunito (friendly body), JetBrains Mono (HUD numbers).              */
/* ------------------------------------------------------------------ */

import "@fontsource/baloo-2/500.css";
import "@fontsource/baloo-2/600.css";
import "@fontsource/baloo-2/700.css";
import "@fontsource/baloo-2/800.css";
import "@fontsource-variable/nunito";
import "@fontsource-variable/jetbrains-mono";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Command Intelligence for Tiles Survive!`,
    template: `%s // ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Tiles Survive",
    "Tiles Survive guide",
    "Tiles Survive tier list",
    "4X strategy",
    "FunPlus",
    "war room",
    "troop ratio optimizer",
    "chief gear reforge",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff9f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body bg-cream text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:border-[3px] focus:border-ink focus:bg-ember focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-white"
        >
          SKIP TO CONTENT
        </a>
        <AtmosphereBackground />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
