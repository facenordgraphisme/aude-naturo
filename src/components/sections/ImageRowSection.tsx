import { AutoCarousel } from "@/components/motion/AutoCarousel";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { FigureImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { ImageRowSection as Props } from "@/sanity/lib/types";

export function ImageRowSection({ section }: { section: Props }) {
  const count = section.images?.length ?? 0;
  const square = section.aspect === "square";
  // Illustrations détourées (aquarelles) : simple flottement ; photos : rideau + parallaxe
  const illustrations = section.fit === "contain";
  const sizes = count >= 3 ? "(min-width: 640px) 33vw, 100vw" : "(min-width: 640px) 50vw, 100vw";
  const aspect = square ? "aspect-square" : "aspect-[17/10]";
  // Sur mobile, une rangée d'illustrations devient un carrousel qui défile tout seul
  const carousel = illustrations && count >= 3;
  return (
    <Section background={section.background} className="py-10 md:py-[75px]">
      <Container width={count >= 3 ? "wide" : "default"}>
        {carousel && (
          <Reveal preset="up" duration={1.1} className="sm:hidden">
            <AutoCarousel slideClassName={aspect}>
              {section.images?.map((fig, i) => (
                <div key={fig._key ?? i} className="relative h-full w-full">
                  <FigureImg figure={fig} fill fit="contain" sizes="70vw" />
                </div>
              ))}
            </AutoCarousel>
          </Reveal>
        )}
        <div className={`grid gap-6 ${carousel ? "max-sm:hidden" : ""} ${count >= 3 ? "sm:grid-cols-3 md:gap-[26px]" : "sm:grid-cols-2 md:gap-20"}`}>
          {section.images?.map((fig, i) =>
            illustrations ? (
              <Reveal key={fig._key ?? i} preset="up" delay={i * 0.15} duration={1.1}>
                <div className={`relative ${aspect} transition-transform duration-700 ease-out hover:-translate-y-2 hover:rotate-1`}>
                  <FigureImg figure={fig} fill fit="contain" sizes={sizes} />
                </div>
              </Reveal>
            ) : (
              <ImageReveal
                key={fig._key ?? i}
                direction={i % 2 ? "right" : "left"}
                delay={i * 0.15}
                parallax={24}
                className={`relative overflow-hidden ${aspect}`}
              >
                <FigureImg figure={fig} fill sizes={sizes} />
              </ImageReveal>
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}
