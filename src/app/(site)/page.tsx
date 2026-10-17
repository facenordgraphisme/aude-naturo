import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/components/sections/Sections";
import { pageMetadata } from "@/lib/metadata";
import { getHomePage } from "@/sanity/lib/fetch";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getHomePage(), "/");
}

export default async function HomePage() {
  const page = await getHomePage();
  if (!page) notFound();
  return <Sections sections={page.sections} />;
}
