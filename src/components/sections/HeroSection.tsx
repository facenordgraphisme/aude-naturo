import { HeroBackground } from "@/components/motion/HeroBackground";
import { Heading } from "@/components/ui/Heading";
import { FigureImg } from "@/components/ui/SanityImg";
import type { HeroSection as Props } from "@/sanity/lib/types";

export function HeroSection({ section, isFirst }: { section: Props; isFirst?: boolean }) {
  return (
    <section className="bg-beige">
      <div className="relative flex min-h-[320px] items-center overflow-hidden rounded-[30px] md:min-h-[440px] md:rounded-[40px] lg:min-h-[536px]">
        <HeroBackground>
          <FigureImg figure={section.image} fill priority={isFirst} sizes="100vw" />
        </HeroBackground>
        <div className="relative z-10 w-full px-8 py-16 md:px-[53px]">
          <Heading
            level="h1"
            size={section.titleSize ?? "xxl"}
            color={section.titleColor ?? "white"}
            className="leading-[1.1]"
            animate={isFirst ? "immediate" : "inView"}
            delay={0.3}
          >
            {section.title}
          </Heading>
        </div>
      </div>
    </section>
  );
}
