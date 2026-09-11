import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/* PWA manifest — installable app meta for titantilessurvive.com. */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Tiles Survive! Command Intelligence`,
    short_name: "TitanTiles",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff9f0",
    theme_color: "#f07d2e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
