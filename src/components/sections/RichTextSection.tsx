import { Reveal } from "@/components/motion/Reveal";
import { RichText } from "@/components/ui/RichText";
import { Container, Section } from "@/components/ui/Section";
import type { RichTextSection as Props } from "@/sanity/lib/types";

export function RichTextSection({ section }: { section: Props }) {
  return (
    <Section background={section.background} className="pt-12 pb-16 md:pt-[73px] md:pb-[90px]">
      <Container width="narrow">
        <Reveal preset="up" amount={0.02} duration={1}>
        <RichText
          value={section.body}
          tone={section.textTone ?? "muted"}
          className="[&_a]:text-purple [&_h1]:mb-2 [&_h2]:mt-0 [&_h3]:mt-0 [&_strong]:font-bold"
        />
        </Reveal>
      </Container>
    </Section>
  );
}
