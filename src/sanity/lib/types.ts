import type { PortableTextBlock } from "next-sanity";
import type { ColorName } from "./theme";

export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type?: "reference" };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type Shape = "rect" | "soft" | "rounded" | "oval" | "leafTR" | "halfRight" | "leafDiag";

export type Figure = {
  _key?: string;
  _type?: "figure";
  image?: SanityImage;
  alt?: string;
  shape?: Shape;
};

export type Link = {
  type?: "internal" | "external" | "file";
  internal?: { _ref: string };
  href?: string;
  file?: { asset?: { _ref: string } };
  openInNewTab?: boolean;
};

export type Button = {
  _key?: string;
  _type?: "button";
  label: string;
  link?: Link;
  variant?: "outline" | "solid" | "white";
};

export type NavItem = { _key: string; label: string; link?: Link };

export type RichText = PortableTextBlock[];

export type TextTone = "dark" | "muted" | "light";
export type HeadingColor = "purple" | "black" | "white";
export type TitleSize = "xxl" | "xl" | "lg" | "md" | "sm";
export type TitleLevel = "h1" | "h2" | "h3";

type Base = {
  _key: string;
  background?: ColorName;
  textTone?: TextTone;
  titleColor?: HeadingColor;
  titleSize?: TitleSize;
  titleLevel?: TitleLevel;
};

export type HeroSection = Base & { _type: "heroSection"; title?: string; image?: Figure };

export type TextImageSection = Base & {
  _type: "textImageSection";
  sectionTitle?: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  buttons?: Button[];
  image?: Figure;
  imagePosition?: "left" | "right";
  imageBleed?: boolean;
  narrow?: boolean;
  justify?: boolean;
  centerButtons?: boolean;
};

export type TextBandSection = Base & {
  _type: "textBandSection";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: RichText;
  buttons?: Button[];
  align?: "center" | "left";
  spacing?: "compact" | "normal" | "large";
};

export type FeatureCardsSection = Base & {
  _type: "featureCardsSection";
  title?: string;
  cards?: { _key: string; icon?: Figure; image?: Figure; title?: string; body?: RichText }[];
  cardStyle?: "green" | "white";
};

export type ImageRowSection = Base & {
  _type: "imageRowSection";
  images?: Figure[];
  aspect?: "landscape" | "square";
  fit?: "cover" | "contain";
};

export type CollageSection = Base & {
  _type: "collageSection";
  images?: Figure[];
  title?: string;
  body?: RichText;
  buttons?: Button[];
  titleAlign?: "left" | "center";
};

export type MosaicSection = Base & {
  _type: "mosaicSection";
  title?: string;
  body?: RichText;
  buttons?: Button[];
  images?: Figure[];
};

export type IconGridSection = Base & {
  _type: "iconGridSection";
  title?: string;
  items?: { _key: string; icon?: SanityImage; label?: string }[];
  labelStyle?: "sans" | "serif";
  iconSize?: "small" | "large";
};

export type PartnersSection = Base & {
  _type: "partnersSection";
  title?: string;
  logo?: Figure;
  button?: Button;
  partners?: { _key: string; logo?: SanityImage; name?: string; button?: Button }[];
};

export type CardContent =
  | { _key: string; _type: "cardText"; body?: RichText }
  | (Figure & { _key: string; _type: "figure" })
  | { _key: string; _type: "iconRow"; icon?: SanityImage; text?: string }
  | (Button & { _key: string; _type: "button" });

export type TwoCardsSection = Base & {
  _type: "twoCardsSection";
  title?: string;
  cards?: { _key: string; title?: string; boldTitle?: boolean; content?: CardContent[] }[];
  cardBackground?: "grey" | "white";
};

export type PricingSection = Base & {
  _type: "pricingSection";
  plans?: {
    _key: string;
    badge?: string;
    name?: string;
    price?: string;
    features?: string[];
    button?: Button;
    highlighted?: boolean;
  }[];
};

export type ContactSection = Base & {
  _type: "contactSection";
  title?: string;
  subtitle?: string;
  nameLabel?: string;
  phoneLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  infoBody?: RichText;
  infoPhoneTitle?: string;
  infoPhone?: string;
  infoEmailTitle?: string;
  infoEmailText?: string;
  infoEmailHref?: string;
};

export type LocationSection = Base & {
  _type: "locationSection";
  title?: string;
  subtitle?: string;
  items?: { _key: string; icon?: SanityImage; title?: string; text?: string }[];
  image?: Figure;
};

export type MapSection = Base & { _type: "mapSection"; address?: string; lat?: number; lng?: number; zoom?: number };

export type RichTextSection = Base & { _type: "richTextSection"; body?: RichText };

export type Section =
  | HeroSection
  | TextImageSection
  | TextBandSection
  | FeatureCardsSection
  | ImageRowSection
  | CollageSection
  | MosaicSection
  | IconGridSection
  | PartnersSection
  | TwoCardsSection
  | PricingSection
  | ContactSection
  | LocationSection
  | MapSection
  | RichTextSection;

export type Seo = { metaTitle?: string; metaDescription?: string; ogImage?: SanityImage; noIndex?: boolean };

export type PageDoc = {
  _id: string;
  title: string;
  slug: { current: string };
  sections?: Section[];
  seo?: Seo;
};

export type Route = { _id: string; slug: string };

export type SiteSettings = {
  siteName?: string;
  siteUrl?: string;
  homeId?: string;
  logo?: SanityImage;
  logoAlt?: string;
  phone?: string;
  email?: string;
  facebookUrl?: string;
  defaultOgImage?: SanityImage;
  mainNav?: NavItem[];
  legalNav?: NavItem[];
  drawerTitle?: string;
  footerBanner?: SanityImage;
};
