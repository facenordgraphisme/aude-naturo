import { PortableText, type PortableTextComponents } from "next-sanity";
import type { RichText as RichTextValue, TextTone } from "@/sanity/lib/types";

const tones: Record<TextTone, string> = {
  dark: "text-ink",
  muted: "text-muted",
  light: "text-white",
};

const components: PortableTextComponents = {
  block: {
    // Les paragraphes vides servent d'espacement, comme sur le site d'origine
    normal: ({ children, value }) => {
      const empty = value.children?.every((c) => "text" in c && !String(c.text).trim());
      return <p className={empty ? "is-empty" : undefined}>{children}</p>;
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const blank = value?.openInNewTab;
      return (
        <a href={href} {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
    underline: ({ children }) => <span className="underline">{children}</span>,
    green: ({ children }) => <span className="text-green">{children}</span>,
  },
};

export function RichText({
  value,
  tone = "dark",
  className = "",
}: {
  value?: RichTextValue;
  tone?: TextTone;
  className?: string;
}) {
  if (!value?.length) return null;
  return (
    <div className={`prose-naturo text-[18px] leading-[1.22] font-light ${tones[tone]} ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
