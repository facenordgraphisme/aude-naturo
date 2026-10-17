import Image from "next/image";
import Link from "next/link";
import { GrowingBanner } from "@/components/motion/GrowingBanner";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/lib/types";
import { FooterNav } from "./FooterNav";
import type { NavLink } from "./Header";

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
      <div className="flex flex-col items-center gap-6 px-4 py-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 lg:px-[29px] lg:py-[6px]">
        <Link href="/" aria-label="Accueil" className="lg:justify-self-start">
          {settings.logo?.asset && (
            <Image src={urlFor(settings.logo).width(200).url()} alt={settings.logoAlt ?? ""} width={80} height={77} className="h-[77px] w-auto" />
          )}
        </Link>
        <FooterNav nav={nav} legalNav={legalNav} />
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-around lg:pl-10">
        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="inline-flex h-[50px] items-center justify-center px-6 font-sans text-[16px] font-normal tracking-[0.06em] text-purple"
          >
            {phone}
          </a>
        )}
        {settings.facebookUrl && (
          <a
            href={settings.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-[35px] w-[30px] items-center justify-center text-purple"
          >
            <svg viewBox="0 0 320 512" className="h-[22px] w-auto fill-current" aria-hidden="true">
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
            </svg>
          </a>
        )}
        </div>
      </div>
    </footer>
  );
}
