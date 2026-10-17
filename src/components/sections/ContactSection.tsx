import { Reveal } from "@/components/motion/Reveal";
import { Heading } from "@/components/ui/Heading";
import { RichText } from "@/components/ui/RichText";
import { Container, Section } from "@/components/ui/Section";
import type { ContactSection as Props } from "@/sanity/lib/types";
import { ContactForm } from "./ContactForm";

export function ContactSection({ section }: { section: Props }) {
  const tel = section.infoPhone?.replace(/\s/g, "");
  return (
    <Section background={section.background} className="py-12 md:pt-[86px] md:pb-[110px]">
      <Container className="xl:max-w-[1098px]">
        <div className="grid gap-12 md:grid-cols-[447px_1fr] md:gap-[172px]">
          <Reveal preset="up" duration={1}>
            <Heading level="h1" size="xxl" className="mb-6 md:mb-8">
              {section.title}
            </Heading>
            {section.subtitle && <h3 className="text-[24px] leading-[1.25] whitespace-pre-line text-purple">{section.subtitle}</h3>}
            <ContactForm
              nameLabel={section.nameLabel ?? "Nom"}
              phoneLabel={section.phoneLabel ?? "Numéro de téléphone"}
              messageLabel={section.messageLabel ?? "Votre demande"}
              submitLabel={section.submitLabel ?? "Envoyer"}
              successMessage={section.successMessage ?? "Merci de nous avoir contactés."}
              errorMessage={section.errorMessage ?? "Une erreur s'est produite."}
            />
          </Reveal>
          <Reveal as="div" preset="right" duration={1.1} delay={0.15}>
          <aside className="bg-green px-6 py-12 text-white md:px-[44px] md:pt-[98px] md:pb-[134px]">
            <RichText value={section.infoBody} tone="light" />
            {section.infoPhone && (
              <div className="mt-[22px] border-b-2 border-white pb-[42px]">
                <h3 className="mb-2 text-[24px] text-white">{section.infoPhoneTitle}</h3>
                <a href={`tel:${tel}`} className="text-[24px] font-bold text-white underline">
                  {section.infoPhone}
                </a>
              </div>
            )}
            {section.infoEmailText && (
              <div className="mt-[42px] border-b-2 border-white pb-[42px]">
                <h3 className="mb-2 text-[24px] text-white">{section.infoEmailTitle}</h3>
                <a href={`mailto:${section.infoEmailHref || section.infoEmailText}`} className="text-[24px] font-bold break-all text-white underline">
                  {section.infoEmailText}
                </a>
              </div>
            )}
          </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
