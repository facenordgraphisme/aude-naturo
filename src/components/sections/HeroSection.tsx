import { HeroBackground } from "@/components/motion/HeroBackground";
import { Reveal } from "@/components/motion/Reveal";
import { Heading } from "@/components/ui/Heading";
import { FigureImg } from "@/components/ui/SanityImg";
import type { HeroSection as Props } from "@/sanity/lib/types";

const BADGE_TEXT = "Naturopathie · Bien-être · Équilibre · ";

/** Pastille au texte circulaire qui tourne lentement sur elle-même */
function RotatingBadge({ id }: { id: string }) {
  return (
    <div className="pointer-events-none absolute right-6 bottom-6 z-10 hidden h-[128px] w-[128px] md:block lg:right-[53px] lg:bottom-[48px] lg:h-[150px] lg:w-[150px]">
      <svg viewBox="0 0 200 200" aria-hidden="true" className="animate-spin-slow h-full w-full text-white">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-sans text-[13px] font-medium tracking-[0.3em] uppercase">
          <textPath href={`#${id}`}>{BADGE_TEXT}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="absolute inset-0 m-auto h-9 w-9 fill-white/90">
        <path d="M12 0c1 6 5 11 12 12-7 1-11 6-12 12-1-6-5-11-12-12C7 11 11 6 12 0Z" />
      </svg>
    </div>
  );
}

export function HeroSection({ section, isFirst }: { section: Props; isFirst?: boolean }) {
  const lightTitle = (section.titleColor ?? "white") === "white";
  return (
    <section className="px-2 md:px-4">
      <div className="relative flex min-h-[380px] items-center overflow-hidden rounded-[30px] md:min-h-[520px] md:rounded-[40px] lg:min-h-[min(78vh,720px)]">
        <HeroBackground>
          <FigureImg figure={section.image} fill priority={isFirst} sizes="100vw" />
        </HeroBackground>
        {/* Voile dégradé : donne de la profondeur et garde le titre lisible */}
        {lightTitle && (
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/20 to-transparent" />
        )}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/30 to-transparent" />

        <div className="relative z-10 w-full px-8 py-16 md:px-[53px]">
          <Heading
            level="h1"
            size={section.titleSize ?? "xxl"}
            color={section.titleColor ?? "white"}
            className="leading-[1.1] drop-shadow-[0_2px_24px_rgba(0,0,0,0.25)]"
            animate={isFirst ? "immediate" : "inView"}
            delay={0.3}
          >
            {section.title}
          </Heading>
        </div>

        <RotatingBadge id={`badge-${section._key}`} />

        {isFirst && (
          <Reveal preset="fade" delay={1.4} className="absolute bottom-6 left-8 z-10 flex items-center gap-3 md:left-[53px] lg:bottom-[48px]">
            <span className="relative block h-12 w-px overflow-hidden bg-white/30">
              <span className="animate-scroll-cue absolute inset-0 bg-white" />
            </span>
            <span className="text-[12px] font-normal tracking-[0.3em] text-white/85 uppercase">Défiler</span>
          </Reveal>
        )}
      </div>
    </section>
  );
}
