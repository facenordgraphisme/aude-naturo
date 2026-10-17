import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Buttons } from "@/components/ui/Btn";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { FigureImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { TextImageSection as Props } from "@/sanity/lib/types";

export function TextImageSection({ section, isFirst }: { section: Props; isFirst?: boolean }) {
  const imageLeft = section.imagePosition === "left";
  const text = (
    <div className="flex flex-col">
      <Heading
        level={section.titleLevel}
        size={section.titleSize}
        color={section.titleColor}
        animate={isFirst ? "immediate" : "inView"}
        className={section.subtitle ? "mb-10 md:mb-12" : "mb-10 md:mb-[72px]"}
      >
        {section.title}
      </Heading>
      {section.subtitle && (
        <Heading level="h2" size="sm" color={section.titleColor} animate={isFirst ? "immediate" : "inView"} delay={0.25} className="mb-8 md:mb-10">
          {section.subtitle}
        </Heading>
      )}
      <Reveal delay={0.15}>
        <RichText value={section.body} tone={section.textTone} className={section.justify ? "text-justify" : ""} />
      </Reveal>
      <Reveal delay={0.3}>
        <Buttons buttons={section.buttons} className={`mt-10 md:mt-12 ${section.centerButtons ? "justify-center" : ""}`} />
      </Reveal>
    </div>
  );

  // Image pleine hauteur collée au bord de l'écran (page « Qui suis-je ? »)
  if (section.imageBleed) {
    return (
      <Section background={section.background}>
        <div className={`grid items-start gap-10 md:grid-cols-[44%_1fr] md:gap-[72px] ${imageLeft ? "" : "md:[direction:rtl]"}`}>
          <ImageReveal direction={imageLeft ? "left" : "right"} className="relative aspect-[2/3] w-full md:[direction:ltr]">
            <FigureImg figure={section.image} fill priority={isFirst} sizes="(min-width: 768px) 44vw, 100vw" />
          </ImageReveal>
          <div className="px-4 pb-16 md:max-w-[662px] md:px-0 md:pt-10 md:pr-8 md:[direction:ltr]">{text}</div>
        </div>
      </Section>
    );
  }

  return (
    <Section background={section.background} className="py-12 md:py-[50px]">
      <Container className={section.narrow ? "xl:max-w-[986px]" : ""}>
        {section.sectionTitle && (
          <Heading level="h2" size="md" color={section.titleColor} className="mb-12 text-center md:mb-[88px]">
            {section.sectionTitle}
          </Heading>
        )}
        <div className={`grid items-center gap-10 md:grid-cols-2 ${section.narrow ? "md:gap-[123px]" : "md:gap-20"}`}>
          <div className={imageLeft ? "md:order-2" : ""}>{text}</div>
          <div className={`flex justify-center ${imageLeft ? "md:order-1" : ""}`}>
            <Reveal preset="scale" duration={1.2} className={`w-full ${section.narrow ? "max-w-[410px]" : "max-w-[544px]"}`}>
              <ImageReveal direction="center">
                <FigureImg figure={section.image} priority={isFirst} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" />
              </ImageReveal>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
