import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Buttons } from "@/components/ui/Btn";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { FigureImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { CollageSection as Props } from "@/sanity/lib/types";

export function CollageSection({ section }: { section: Props }) {
  const [a, b, tall] = section.images ?? [];
  const center = section.titleAlign === "center";
  return (
    <Section background={section.background} className="py-12 md:py-[65px]">
      <Container width="narrow" className="xl:max-w-[1142px]">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,525px)_1fr] md:gap-[62px]">
          <div className="grid grid-cols-2 gap-[26px]">
            <div className="flex flex-col gap-[29px]">
              {[a, b].map(
                (fig, i) =>
                  fig && (
                    <ImageReveal
                      key={fig._key ?? i}
                      direction="up"
                      delay={i * 0.2}
                      parallax={14}
                      className="relative aspect-[265/284] overflow-hidden rounded-[10px]"
                    >
                      <FigureImg figure={fig} fill sizes="(min-width: 768px) 20vw, 50vw" />
                    </ImageReveal>
                  ),
              )}
            </div>
            {tall && (
              <ImageReveal direction="up" delay={0.35} parallax={30} className="relative overflow-hidden rounded-[10px]">
                <FigureImg figure={tall} fill sizes="(min-width: 768px) 20vw, 50vw" />
              </ImageReveal>
            )}
          </div>
          <div>
            <Heading
              level={section.titleLevel}
              size={section.titleSize}
              color={section.titleColor}
              className={`mb-8 md:mb-10 ${center ? "text-center" : ""}`}
            >
              {section.title}
            </Heading>
            <Reveal delay={0.15}>
              <RichText value={section.body} tone={section.textTone} />
            </Reveal>
            <Reveal delay={0.3}>
              <Buttons buttons={section.buttons} className="mt-6" />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
