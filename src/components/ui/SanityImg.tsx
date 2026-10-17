import Image from "next/image";
import { imageDimensions, isSvg, objectPosition, urlFor } from "@/sanity/lib/image";
import type { Figure, SanityImage, Shape } from "@/sanity/lib/types";

export const shapeClass: Record<Shape, string> = {
  rect: "",
  soft: "rounded-[16px]",
  rounded: "rounded-[25%]",
  oval: "rounded-[50%]",
  leafTR: "rounded-[50%_0_50%_50%]",
  halfRight: "rounded-[0_50%_50%_0]",
  leafDiag: "rounded-[50%_0]",
};

type Props = {
  image?: SanityImage;
  alt?: string;
  shape?: Shape;
  /** Remplit son conteneur (position relative requise sur le parent) */
  fill?: boolean;
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  className?: string;
  width?: number;
};

export function SanityImg({ image, alt = "", shape = "rect", fill, fit = "cover", sizes, priority, className = "", width }: Props) {
  if (!image?.asset?._ref) return null;
  const svg = isSvg(image);
  const src = svg ? urlFor(image).url() : urlFor(image).width(width ?? 2000).fit("max").url();
  const cls = `${shapeClass[shape]} ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`;
  const style = { objectPosition: objectPosition(image) };

  if (fill) {
    return (
      <Image src={src} alt={alt} fill sizes={sizes ?? "100vw"} priority={priority} unoptimized={svg} className={cls} style={style} />
    );
  }
  const dims = imageDimensions(image);
  return (
    <Image
      src={src}
      alt={alt}
      width={dims.width}
      height={dims.height}
      sizes={sizes ?? "100vw"}
      priority={priority}
      unoptimized={svg}
      className={cls}
      style={style}
    />
  );
}

export function FigureImg({ figure, ...rest }: { figure?: Figure } & Omit<Props, "image" | "alt" | "shape">) {
  if (!figure?.image) return null;
  return <SanityImg image={figure.image} alt={figure.alt} shape={figure.shape} {...rest} />;
}
