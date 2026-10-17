import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header, type NavLink } from "@/components/layout/Header";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { getLinkMap, hrefFor } from "@/sanity/lib/links";
import type { NavItem } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = settings?.siteUrl ?? "https://www.aude-naturo.fr";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings?.siteName ?? "Aude Naturo", template: `%s | ${settings?.siteName ?? "Aude Naturo"}` },
    openGraph: {
      siteName: settings?.siteName,
      locale: "fr_FR",
      type: "website",
      images: settings?.defaultOgImage?.asset ? [urlFor(settings.defaultOgImage).width(1200).height(630).url()] : undefined,
    },
  };
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [settings, map] = await Promise.all([getSettings(), getLinkMap()]);
  const toLinks = (items?: NavItem[]): NavLink[] =>
    (items ?? []).flatMap((i) => {
      const href = hrefFor(i.link, map);
      return href ? [{ label: i.label, href }] : [];
    });
  const nav = toLinks(settings?.mainNav);

  return (
    <MotionProvider>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-2">
        Aller au contenu
      </a>
      <Header
        nav={nav}
        logoUrl={settings?.logo?.asset ? urlFor(settings.logo).width(240).url() : undefined}
        logoAlt={settings?.logoAlt}
        drawerTitle={settings?.drawerTitle}
        phone={settings?.phone}
        email={settings?.email}
      />
      <main id="contenu">{children}</main>
      {settings && <Footer settings={settings} nav={nav} legalNav={toLinks(settings.legalNav)} />}
    </MotionProvider>
  );
}
