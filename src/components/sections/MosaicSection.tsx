import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Buttons } from "@/components/ui/Btn";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { FigureImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { MosaicSection as Props } from "@/sanity/lib/types";

export function MosaicSection({ section, isFirst }: { section: Props; isFirst?: boolean }) {
  return (
    <Section background={section.background ?? "deepPurple"} className="overflow-hidden py-16 md:py-[144px]">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-[118px]">
          <div>
            <Heading
              level={section.titleLevel ?? "h1"}
              size={section.titleSize ?? "xl"}
              color={section.titleColor ?? "white"}
              animate={isFirst ? "immediate" : "inView"}
              className="mb-8"
            >
              {section.title}
            </Heading>
            <Reveal delay={0.25} preset="blur">
              <RichText value={section.body} tone={section.textTone ?? "light"} />
            </Reveal>
            <Reveal delay={0.45}>
              <Buttons buttons={section.buttons} className="mt-8" />
            </Reveal>
          </div>
          <Stagger className="grid grid-cols-2 gap-x-[27px] gap-y-[110px]" stagger={0.18} delay={0.2}>
            {section.images?.map((fig, i) => (
              <StaggerItem key={fig._key ?? i} preset="scale" duration={1.1}>
                <div className="relative aspect-square transition-transform duration-700 ease-out hover:scale-[1.04] hover:rotate-2">
                  <FigureImg figure={fig} fill priority={isFirst} sizes="(min-width: 768px) 270px, 50vw" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
