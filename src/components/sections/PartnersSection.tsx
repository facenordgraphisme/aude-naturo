import { Reveal } from "@/components/motion/Reveal";
import { Btn } from "@/components/ui/Btn";
import { Heading } from "@/components/ui/Heading";
import { FigureImg, SanityImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { PartnersSection as Props } from "@/sanity/lib/types";

export function PartnersSection({ section }: { section: Props }) {
  return (
    <>
      <Section background={section.background ?? "cream"} className="pt-12 pb-16 md:pt-[70px] md:pb-[74px]">
        <Container width="full">
          <Heading level="h2" size={section.titleSize ?? "lg"} color={section.titleColor ?? "black"} className="text-center">
            {section.title}
          </Heading>
          {section.logo?.image && (
            <Reveal preset="scale" duration={1.2} className="mt-11 flex justify-center">
              <FigureImg figure={section.logo} fit="contain" sizes="270px" className="h-auto w-[270px]" />
            </Reveal>
          )}
          {section.button && (
            <Reveal delay={0.2} className="mt-11 flex justify-center">
              <Btn button={section.button} className="min-h-[43px] min-w-[280px]" />
            </Reveal>
          )}
        </Container>
      </Section>
      {!!section.partners?.length && (
        <Section background={section.background ?? "cream"} className="mt-5">
          <Container className="flex flex-wrap justify-center gap-8">
            {section.partners.map((p) => (
              <Reveal key={p._key} as="article" preset="up" className="group relative flex aspect-[576/451] w-full max-w-[576px] flex-col justify-end overflow-hidden rounded-[16px] bg-light-grey">
                <SanityImg
                  image={p.logo}
                  alt={p.name ?? ""}
                  fill
                  fit="cover"
                  sizes="576px"
                  className="z-0 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 px-[46px] pb-[48px]">
                  <h3 className="text-[22px] whitespace-pre-line text-ink md:text-[24px]">{p.name}</h3>
                  {p.button && <Btn button={p.button} className="min-w-[184px]" />}
                </div>
              </Reveal>
            ))}
          </Container>
        </Section>
      )}
    </>
  );
}
