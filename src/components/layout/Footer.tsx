import Image from "next/image";
import Link from "next/link";
import { GrowingBanner } from "@/components/motion/GrowingBanner";
import { Reveal } from "@/components/motion/Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";
import { FooterLinks } from "./FooterNav";
import type { NavLink } from "./Header";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 font-serif text-[22px] text-purple">{children}</h2>;
}

export function Footer({ settings, nav, legalNav }: { settings: SiteSettings; nav: NavLink[]; legalNav: NavLink[] }) {
  const phone = settings.phone;
  return (
    <footer className="bg-beige">
      {settings.footerBanner?.asset && (
        <GrowingBanner className="relative h-[180px] w-full md:h-[300px] lg:h-[435px]">
          <Image
            src={urlFor(settings.footerBanner).width(2400).url()}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-left-bottom"
          />
        </GrowingBanner>
      )}

      <div className="mx-auto max-w-[1110px] px-6 pt-14 pb-10 md:px-8 md:pt-[72px] md:pb-14 xl:px-0">
        <div className="grid gap-12 text-center md:grid-cols-[1.2fr_1fr_1fr] md:gap-10 md:text-left">
          {/* Identité */}
          <Reveal preset="up" className="flex flex-col items-center md:items-start">
            <Link href="/" aria-label="Accueil" className="mb-5">
              {settings.logo?.asset && (
                <Image
                  src={urlFor(settings.logo).width(240).url()}
                  alt={settings.logoAlt ?? ""}
                  width={110}
                  height={106}
                  className="h-[96px] w-auto md:h-[106px]"
                />
              )}
            </Link>
            {settings.siteName && <p className="font-serif text-[20px] text-purple">{settings.siteName}</p>}
            {settings.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-purple/30 text-purple transition-colors duration-300 hover:border-purple hover:bg-purple hover:text-white"
              >
                <svg viewBox="0 0 320 512" className="h-[18px] w-auto fill-current" aria-hidden="true">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
              </a>
            )}
          </Reveal>

          {/* Navigation */}
          <Reveal preset="up" delay={0.1}>
            <ColumnTitle>Navigation</ColumnTitle>
            <FooterLinks
              items={nav}
              label="Pied de page"
              className="flex flex-col gap-3"
              linkClassName="text-[17px] font-normal tracking-[0.03em] text-ink/80 transition-colors hover:text-purple"
            />
          </Reveal>

          {/* Contact */}
          <Reveal preset="up" delay={0.2}>
            <ColumnTitle>{settings.drawerTitle ?? "Contact"}</ColumnTitle>
            <ul className="flex flex-col items-center gap-3 md:items-start">
              {phone && (
                <li>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-3 text-[17px] font-normal tracking-[0.04em] text-purple"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.6]" aria-hidden="true">
                      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                    </svg>
                    {phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="inline-flex items-center gap-3 text-[17px] font-normal break-all text-purple"
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-none stroke-current stroke-[1.6]" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-purple/15 pt-6 text-[14px] text-ink/60 md:mt-14 md:flex-row md:justify-between">
          <p>© {settings.siteName ?? "Aude Naturo"}</p>
          <FooterLinks
            items={legalNav}
            label="Informations légales"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            linkClassName="transition-colors hover:text-purple"
          />
        </div>
      </div>
    </footer>
  );
}
