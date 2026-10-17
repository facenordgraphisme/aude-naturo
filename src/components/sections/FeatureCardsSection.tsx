import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { FigureImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { FeatureCardsSection as Props } from "@/sanity/lib/types";

export function FeatureCardsSection({ section }: { section: Props }) {
  const green = section.cardStyle !== "white";
  return (
    <Section background={section.background} className={section.title ? "pt-8 pb-12 md:pt-[34px] md:pb-[86px]" : "py-10 md:py-[43px]"}>
      <Container width="wide">
        <Heading level="h2" size="md" color={section.titleColor} className="mb-12 text-center md:mb-[70px]">
          {section.title}
        </Heading>
        <Stagger className="grid gap-[26px] md:grid-cols-3" stagger={0.15}>
          {section.cards?.map((card) => (
            <StaggerItem key={card._key} className="h-full">
              <article
                className={`group flex h-full flex-col rounded-[20px] p-[27px] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgba(44,57,63,0.55)] ${green ? "bg-green text-white" : "bg-white"}`}
              >
              {card.icon?.image && (
                <div className="mb-5 flex justify-center">
                  <FigureImg
                    figure={card.icon}
                    fit="contain"
                    sizes="170px"
                    className="h-[98px] w-auto transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>
              )}
              {card.image?.image && (
                <div className="relative mb-5 aspect-[367/220] overflow-hidden rounded-[8px]">
                  <FigureImg
                    figure={card.image}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              )}
              {card.title && (
                <h3 className={`mb-6 text-[24px] ${green ? "font-bold text-white" : "mb-4 text-purple"}`}>{card.title}</h3>
              )}
              <RichText value={card.body} tone={green ? "light" : "muted"} />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
