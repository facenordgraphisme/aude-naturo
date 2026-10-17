import type { MetadataRoute } from "next";
import { getLinkMap } from "@/sanity/lib/links";
import { getSettings } from "@/sanity/lib/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [map, settings] = await Promise.all([getLinkMap(), getSettings()]);
  const base = (settings?.siteUrl ?? "https://www.aude-naturo.fr").replace(/\/$/, "");
  return Object.values(map).map((path) => ({
    url: encodeURI(`${base}${path === "/" ? "" : path}`),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
