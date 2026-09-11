import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import AtmosphereBackground from "@/components/layout/AtmosphereBackground";
import { site } from "@/data/site";

/* ------------------------------------------------------------------ */
/*  Fonts — self-hosted via Fontsource npm packages. Zero external     */
/*  font CDN at build or runtime: fast, private, Vercel-friendly.      */
/* ------------------------------------------------------------------ */

import "@fontsource/chakra-petch/400.css";
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/chakra-petch/700.css";
import "@fontsource/chakra-petch/500-italic.css";
import "@fontsource/chakra-petch/600-italic.css";
import "@fontsource/chakra-petch/700-italic.css";
import "@fontsource-variable/inter";
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
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#04060c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-body bg-void text-steel-200">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold-500 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-void"
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
