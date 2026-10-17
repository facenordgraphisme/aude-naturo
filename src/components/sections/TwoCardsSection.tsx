import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Btn } from "@/components/ui/Btn";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { FigureImg, SanityImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { CardContent, TwoCardsSection as Props } from "@/sanity/lib/types";

function CardBlock({ block }: { block: CardContent }) {
  switch (block._type) {
    case "cardText":
      return <RichText value={block.body} className="max-w-[479px]" />;
    case "figure":
      return <FigureImg figure={block} sizes="260px" className="h-auto w-[260px] max-w-full" />;
    case "iconRow":
      return (
        <div className="grid grid-cols-[32px_1fr] items-center gap-x-[53px]">
          <SanityImg image={block.icon} alt="" fit="contain" sizes="32px" className="h-[32px] w-[32px]" />
          <p className="text-ink">{block.text}</p>
        </div>
      );
    case "button":
      return (
        <div className="mt-auto pt-6">
          <Btn button={block} className="min-h-[41px] min-w-[171px] text-[17px]" />
        </div>
      );
    default:
      return null;
  }
}

export function TwoCardsSection({ section }: { section: Props }) {
  return (
    <Section background={section.background} className={section.title ? "py-12 md:pt-[59px] md:pb-[73px]" : "pb-12 md:pb-[73px]"}>
      <Container width="wide">
        <Heading level="h2" size="md" color={section.titleColor} className="mb-12 text-center md:mb-[90px]">
          {section.title}
        </Heading>
        <div className="grid gap-8 md:grid-cols-2 md:gap-[53px]">
          {section.cards?.map((card, i) => (
            <Reveal
              key={card._key}
              as="article"
              preset={i % 2 ? "right" : "left"}
              duration={1.1}
              className={`flex flex-col rounded-[20px] px-6 py-10 md:px-[53px] md:pt-[56px] md:pb-[53px] ${section.cardBackground === "white" ? "bg-white" : "bg-grey"}`}
            >
              {card.title && (
                <h3 className={`mb-6 text-[24px] text-purple ${card.boldTitle !== false ? "font-bold" : ""}`}>{card.title}</h3>
              )}
              {/* Les lignes (icônes, texte, bouton) apparaissent l'une après l'autre */}
              <Stagger className="flex flex-1 flex-col gap-3" stagger={0.09} delay={0.3}>
                {card.content?.map((block) => (
                  <StaggerItem key={block._key} preset={block._type === "iconRow" ? "left" : "up"} className={block._type === "button" ? "mt-auto" : ""}>
                    <CardBlock block={block} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
