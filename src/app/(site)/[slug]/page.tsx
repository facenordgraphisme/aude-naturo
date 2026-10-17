import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import { Sections } from "@/components/sections/Sections";
import { pageMetadata } from "@/lib/metadata";
import { getPageBySlug, getRoutes, getSettings } from "@/sanity/lib/fetch";

// Les slugs peuvent contenir des accents (ex. « mentions-légales »)
function decodeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateStaticParams() {
  const [routes, settings] = await Promise.all([getRoutes(), getSettings()]);
  const params = (routes ?? []).filter((r) => r._id !== settings?.homeId).map((r) => ({ slug: r.slug }));
  // Cache Components exige au moins un paramètre ; les autres slugs sont rendus à la demande
  return params.length ? params : [{ slug: "qui-suis-je" }];
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const slug = decodeSlug((await params).slug);
  return pageMetadata(await getPageBySlug(slug), `/${slug}`);
}

async function PageContent({ params }: Pick<PageProps<"/[slug]">, "params">) {
  const slug = decodeSlug((await params).slug);
  const [page, settings] = await Promise.all([getPageBySlug(slug), getSettings()]);
  if (!page) notFound();
  // La page d'accueil n'est accessible que via « / »
  if (page._id === settings?.homeId) permanentRedirect("/");
  return <Sections sections={page.sections} />;
}

export default function Page(props: PageProps<"/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <PageContent params={props.params} />
    </Suspense>
  );
}
