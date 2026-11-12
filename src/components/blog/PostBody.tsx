import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { imageDimensions, urlFor } from "@/sanity/lib/image";
import type { RichText, SanityImage } from "@/sanity/lib/types";

/** Identifiant d'ancre stable à partir d'un titre (sommaire) */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const blockText = (value: { children?: unknown[] }) =>
  (value.children ?? []).map((c) => (c as { text?: string }).text ?? "").join("");

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => <h2 id={slugify(blockText(value))}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={slugify(blockText(value))}>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
      const blank = value?.openInNewTab;
      return (
        <a href={href} {...(blank ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string; caption?: string } }) => {
      if (!value?.asset?._ref) return null;
      const { width, height } = imageDimensions(value);
      return (
        <figure>
          <Image
            src={urlFor(value).width(1400).fit("max").url()}
            alt={value.alt ?? ""}
            width={width}
            height={height}
            sizes="(min-width: 768px) 720px, 100vw"
            className="h-auto w-full rounded-[16px]"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

export function PostBody({ value }: { value?: RichText }) {
  if (!value?.length) return null;
  return (
    <div className="prose-article">
      <PortableText value={value} components={components} />
    </div>
  );
}

/** Titres H2 de l'article, pour le sommaire */
export function headingsOf(value?: RichText) {
  return (value ?? [])
    .filter((b) => b._type === "block" && b.style === "h2")
    .map((b) => {
      const text = blockText(b);
      return { id: slugify(text), text };
    });
}
