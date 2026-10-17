import { Reveal } from "@/components/motion/Reveal";
import { Buttons } from "@/components/ui/Btn";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { Container, Section } from "@/components/ui/Section";
import type { TextBandSection as Props } from "@/sanity/lib/types";

const spacing = {
  compact: "py-8 md:py-[34px]",
  normal: "py-12 md:py-[60px]",
  large: "py-16 md:py-[86px]",
};

const tones = { dark: "text-ink", muted: "text-muted", light: "text-white" };

export function TextBandSection({ section, isFirst }: { section: Props; isFirst?: boolean }) {
  const center = section.align !== "left";
  return (
    <Section background={section.background} className={spacing[section.spacing ?? "normal"]}>
      <Container width="narrow">
        {section.eyebrow && (
          <Reveal preset="fade" className={`mb-2 text-[15px] uppercase ${center ? "text-center" : ""} ${tones[section.textTone ?? "dark"]}`}>
            {section.eyebrow}
          </Reveal>
        )}
        <Heading
          level={section.titleLevel}
          size={section.titleSize}
          color={section.titleColor}
          animate={isFirst ? "immediate" : "inView"}
          className={`${center ? "text-center" : ""} ${section.body?.length || section.subtitle ? "mb-5" : ""}`}
        >
          {section.title}
        </Heading>
        {section.subtitle && (
          <Reveal delay={0.3}>
            <p className={`${center ? "text-center" : ""} ${tones[section.textTone ?? "dark"]}`}>{section.subtitle}</p>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <RichText value={section.body} tone={section.textTone} />
        </Reveal>
        <Reveal delay={0.3} preset="scale">
          <Buttons buttons={section.buttons} className={`mt-6 ${center ? "justify-center" : ""}`} />
        </Reveal>
      </Container>
    </Section>
  );
}
