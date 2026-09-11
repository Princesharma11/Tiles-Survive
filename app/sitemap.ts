import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const routes = ["", "/war-room", "/hero-meta-calc", "/tier-list", "/guides", "/gear-reforge"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
