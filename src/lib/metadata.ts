import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";
import type { PageDoc } from "@/sanity/lib/types";

export function pageMetadata(page: PageDoc | null, path: string): Metadata {
  if (!page) return {};
  const seo = page.seo ?? {};
  const title = seo.metaTitle || page.title;
  const og = seo.ogImage?.asset ? urlFor(seo.ogImage).width(1200).height(630).url() : undefined;
  return {
    // Les titres saisis dans Sanity sont déjà complets (« … | Aude Naturo | Embrun »)
    title: seo.metaTitle ? { absolute: seo.metaTitle } : page.title,
    description: seo.metaDescription,
    alternates: { canonical: path },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description: seo.metaDescription,
      url: path,
      ...(og ? { images: [og] } : {}),
    },
  };
}
