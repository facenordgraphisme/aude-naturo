import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import type { HeadingColor, TitleLevel, TitleSize } from "@/sanity/lib/types";

const sizes: Record<TitleSize, string> = {
  xxl: "text-[40px] md:text-[56px] lg:text-[70px]",
  xl: "text-[36px] md:text-[48px] lg:text-[60px]",
  lg: "text-[32px] md:text-[42px] lg:text-[50px]",
  md: "text-[30px] md:text-[35px] lg:text-[40px]",
  sm: "text-[28px] md:text-[32px] lg:text-[36px]",
};

const colors: Record<HeadingColor, string> = {
  purple: "text-purple",
  black: "text-black",
  white: "text-white",
};

export function Heading({
  children,
  level = "h2",
  size = "md",
  color = "purple",
  className = "",
  animate = "inView",
  delay = 0,
}: {
  children?: string | null;
  level?: TitleLevel;
  size?: TitleSize;
  color?: HeadingColor;
  className?: string;
  /** « inView » : à l'entrée dans l'écran, « immediate » : au chargement, false : statique */
  animate?: "inView" | "immediate" | false;
  delay?: number;
}) {
  if (!children) return null;
  const cls = `${sizes[size]} ${colors[color]} ${className}`;
  if (animate) {
    return <AnimatedTitle text={children} as={level} className={cls} immediate={animate === "immediate"} delay={delay} />;
  }
  const Tag = level;
  // Les retours à la ligne saisis dans Sanity sont conservés
  return <Tag className={`whitespace-pre-line ${cls}`}>{children}</Tag>;
}
