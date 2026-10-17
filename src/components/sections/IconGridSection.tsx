import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Heading } from "@/components/ui/Heading";
import { SanityImg } from "@/components/ui/SanityImg";
import { Container, Section } from "@/components/ui/Section";
import type { IconGridSection as Props } from "@/sanity/lib/types";

export function IconGridSection({ section }: { section: Props }) {
  const serif = section.labelStyle === "serif";
  const large = section.iconSize === "large";
  return (
    <Section background={section.background} className="py-12 md:py-[60px]">
      <Container width="wide" className="xl:max-w-[1200px]">
        <Heading level="h2" size="md" color={section.titleColor} className="mb-12 text-center md:mb-[52px]">
          {section.title}
        </Heading>
        <Stagger className="grid grid-cols-2 gap-x-9 gap-y-12 md:grid-cols-4 md:gap-y-[50px]" stagger={0.08}>
          {section.items?.map((item) => (
            <StaggerItem key={item._key} preset="up">
              <div className="group flex flex-col items-center text-center">
                <div className={`flex items-center justify-center ${large ? "h-[96px]" : "h-[60px]"}`}>
                  <SanityImg
                    image={item.icon}
                    alt=""
                    fit="contain"
                    sizes="96px"
                    className={`transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-1 group-hover:scale-115 ${large ? "h-[96px] w-[96px]" : "h-[60px] w-[60px]"}`}
                  />
                </div>
                {serif ? (
                  <h3 className={`text-[21px] text-black ${large ? "mt-[24px]" : "mt-6"}`}>{item.label}</h3>
                ) : (
                  <p className="mt-6 text-muted transition-colors duration-300 group-hover:text-purple">{item.label}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
