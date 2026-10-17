import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Heading } from "@/components/ui/Heading";
import { FigureImg, SanityImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { LocationSection as Props } from "@/sanity/lib/types";

export function LocationSection({ section }: { section: Props }) {
  return (
    <Section background={section.background} className="pb-12 md:pb-[90px]">
      <Container width="full">
        <Heading level="h2" size="md">{section.title}</Heading>
        {section.subtitle && (
          <Reveal delay={0.2}>
            <p className="mt-6 text-muted">{section.subtitle}</p>
          </Reveal>
        )}
        <div className="mt-12 grid items-center gap-12 md:mt-[80px] md:grid-cols-[365px_1fr] md:gap-[15px]">
          <Stagger as="ul" className="space-y-[46px]" stagger={0.15}>
            {section.items?.map((item) => (
              <StaggerItem as="li" key={item._key} preset="left">
                <SanityImg image={item.icon} alt="" fit="contain" sizes="36px" className="h-[36px] w-[36px]" />
                <h4 className="mt-[11px] text-[18px] leading-[1.22] whitespace-pre-line text-ink">{item.title}</h4>
                <p className="mt-3 font-normal whitespace-pre-line text-muted">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          {section.image?.image && (
            <Reveal preset="scale" duration={1.2} className="flex justify-center">
              <FigureImg figure={section.image} fit="contain" sizes="476px" className="h-auto w-full max-w-[476px]" />
            </Reveal>
          )}
        </div>
      </Container>
    </Section>
  );
}
