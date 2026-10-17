import type { Section } from "@/sanity/lib/types";
import { CollageSection } from "./CollageSection";
import { ContactSection } from "./ContactSection";
import { FeatureCardsSection } from "./FeatureCardsSection";
import { HeroSection } from "./HeroSection";
import { IconGridSection } from "./IconGridSection";
import { ImageRowSection } from "./ImageRowSection";
import { LocationSection } from "./LocationSection";
import { MapSection } from "./MapSection";
import { MosaicSection } from "./MosaicSection";
import { PartnersSection } from "./PartnersSection";
import { PricingSection } from "./PricingSection";
import { RichTextSection } from "./RichTextSection";
import { TextBandSection } from "./TextBandSection";
import { TextImageSection } from "./TextImageSection";
import { TwoCardsSection } from "./TwoCardsSection";

export function Sections({ sections }: { sections?: Section[] }) {
  return (
    <>
      {sections?.map((section, i) => {
        const isFirst = i === 0;
        switch (section._type) {
          case "heroSection":
            return <HeroSection key={section._key} section={section} isFirst={isFirst} />;
          case "textImageSection":
            return <TextImageSection key={section._key} section={section} isFirst={isFirst} />;
          case "textBandSection":
            return <TextBandSection key={section._key} section={section} />;
          case "featureCardsSection":
            return <FeatureCardsSection key={section._key} section={section} />;
          case "imageRowSection":
            return <ImageRowSection key={section._key} section={section} />;
          case "collageSection":
            return <CollageSection key={section._key} section={section} />;
          case "mosaicSection":
            return <MosaicSection key={section._key} section={section} isFirst={isFirst} />;
          case "iconGridSection":
            return <IconGridSection key={section._key} section={section} />;
          case "partnersSection":
            return <PartnersSection key={section._key} section={section} />;
          case "twoCardsSection":
            return <TwoCardsSection key={section._key} section={section} />;
          case "pricingSection":
            return <PricingSection key={section._key} section={section} />;
          case "contactSection":
            return <ContactSection key={section._key} section={section} />;
          case "locationSection":
            return <LocationSection key={section._key} section={section} />;
          case "mapSection":
            return <MapSection key={section._key} section={section} />;
          case "richTextSection":
            return <RichTextSection key={section._key} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
