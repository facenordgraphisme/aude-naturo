import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "../env";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImage) => builder.image(source).auto("format");

/** Dimensions encodées dans l'identifiant de l'asset : image-<hash>-<w>x<h>-<ext> */
export function imageDimensions(source?: SanityImage | null) {
  const ref = source?.asset?._ref;
  const match = ref?.match(/-(\d+)x(\d+)-\w+$/);
  if (!match) return { width: 1200, height: 800 };
  return { width: Number(match[1]), height: Number(match[2]) };
}

export function isSvg(source?: SanityImage | null) {
  return !!source?.asset?._ref?.endsWith("-svg");
}

/** Point focal (hotspot) éventuel, pour object-position */
export function objectPosition(source?: SanityImage | null) {
  const h = source?.hotspot;
  return h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : undefined;
}
