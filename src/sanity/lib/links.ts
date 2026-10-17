import { dataset, projectId } from "../env";
import { getRoutes, getSettings } from "./fetch";
import type { Link } from "./types";

export type LinkMap = Record<string, string>;

/** Associe l'_id de chaque page à son chemin public ("/" pour l'accueil) */
export async function getLinkMap(): Promise<LinkMap> {
  const [routes, settings] = await Promise.all([getRoutes(), getSettings()]);
  const map: LinkMap = {};
  for (const r of routes ?? []) map[r._id] = r._id === settings?.homeId ? "/" : `/${r.slug}`;
  return map;
}

export function fileUrl(ref?: string) {
  // file-<id>-<ext>
  const m = ref?.match(/^file-([a-zA-Z0-9]+)-(\w+)$/);
  return m ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${m[1]}.${m[2]}` : undefined;
}

export function hrefFor(link: Link | undefined, map: LinkMap): string | undefined {
  if (!link) return undefined;
  switch (link.type) {
    case "internal":
      return link.internal?._ref ? map[link.internal._ref] : undefined;
    case "file":
      return fileUrl(link.file?.asset?._ref);
    default:
      return link.href;
  }
}

export function isExternal(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href) || href.startsWith("https://cdn.sanity.io");
}
