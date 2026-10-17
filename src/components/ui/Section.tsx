import type { ColorName } from "@/sanity/lib/theme";

export const bgClass: Record<ColorName, string> = {
  beige: "bg-beige",
  cream: "bg-cream",
  white: "bg-white",
  grey: "bg-grey",
  lightGrey: "bg-light-grey",
  green: "bg-green",
  darkGreen: "bg-dark-green",
  purple: "bg-purple",
  deepPurple: "bg-deep-purple",
};

export function Section({
  background = "beige",
  className = "",
  children,
  id,
}: {
  background?: ColorName;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`${bgClass[background]} ${className}`}>
      {children}
    </section>
  );
}

/** Largeurs de contenu reprises du site d'origine (1440px de large) */
const widths = {
  narrow: "max-w-[1110px]", // header, bandeaux de texte
  default: "max-w-[1168px]", // colonnes texte + image
  wide: "max-w-[1324px]", // rangées de cartes
  full: "max-w-[1293px]",
};

export function Container({
  children,
  width = "default",
  className = "",
}: {
  children: React.ReactNode;
  width?: keyof typeof widths;
  className?: string;
}) {
  return <div className={`mx-auto w-full px-4 md:px-8 xl:px-0 ${widths[width]} ${className}`}>{children}</div>;
}
