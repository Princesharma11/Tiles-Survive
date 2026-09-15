import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { guides } from "@/data/guides";

const routes = ["", "/guides", "/tier-list", "/gear-reforge", "/hero-meta-calc", "/war-room"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : route === "/guides" ? 0.9 : 0.7,
  }));
  const articles: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${site.url}/guides/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  return [...pages, ...articles];
}
