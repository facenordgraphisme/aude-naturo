import { cacheLife, cacheTag } from "next/cache";
import { client } from "./client";
import { PAGE_BY_ID_QUERY, PAGE_BY_SLUG_QUERY, ROUTES_QUERY, SETTINGS_QUERY } from "./queries";
import type { PageDoc, Route, SiteSettings } from "./types";

// Toutes les lectures Sanity sont mises en cache et invalidées par le webhook /api/revalidate
async function sanityFetch<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  "use cache";
  cacheTag("sanity");
  cacheLife("hours");
  return client.fetch<T>(query, params);
}

export const getSettings = () => sanityFetch<SiteSettings | null>(SETTINGS_QUERY);

export const getRoutes = () => sanityFetch<Route[]>(ROUTES_QUERY);

export const getPageBySlug = (slug: string) => sanityFetch<PageDoc | null>(PAGE_BY_SLUG_QUERY, { slug });

export async function getHomePage() {
  const settings = await getSettings();
  if (!settings?.homeId) return null;
  return sanityFetch<PageDoc | null>(PAGE_BY_ID_QUERY, { id: settings.homeId });
}
