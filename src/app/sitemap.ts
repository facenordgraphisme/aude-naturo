import type { MetadataRoute } from "next";
import { getPosts, getSettings } from "@/sanity/lib/fetch";
import { getLinkMap } from "@/sanity/lib/links";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [map, settings, posts] = await Promise.all([getLinkMap(), getSettings(), getPosts()]);
  const base = (settings?.siteUrl ?? "https://www.aude-naturo.fr").replace(/\/$/, "");
  const pages: MetadataRoute.Sitemap = Object.values(map).map((path) => ({
    url: encodeURI(`${base}${path === "/" ? "" : path}`),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
  const blog: MetadataRoute.Sitemap = [
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...(posts ?? []).map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
  return [...pages, ...blog];
}
