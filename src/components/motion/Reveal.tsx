"use client";

import { motion, type Variants } from "motion/react";

// Courbe douce, proche d'un « ease-out-expo », utilisée partout sur le site
export const EASE = [0.22, 1, 0.36, 1] as const;

const presets: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  blur: { hidden: { opacity: 0, y: 20, filter: "blur(8px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } },
};

export type RevealPreset = keyof typeof presets;

type Props = {
  children: React.ReactNode;
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  className?: string;
  /** Portion de l'élément visible avant de déclencher l'animation */
  amount?: number;
  as?: "div" | "li" | "article" | "span";
};

/** Fait apparaître son contenu lorsqu'il entre dans l'écran (une seule fois) */
export function Reveal({ children, preset = "up", delay = 0, duration = 0.9, className, amount = 0.2, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={presets[preset]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Conteneur qui déclenche ses <StaggerItem> les uns après les autres */
export function Stagger({
  children,
  className,
  stagger = 0.12,
  delay = 0,
  amount = 0.15,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  preset = "up",
  duration = 0.8,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  preset?: RevealPreset;
  duration?: number;
  as?: "div" | "li" | "article";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={presets[preset]} transition={{ duration, ease: EASE }}>
      {children}
    </Tag>
  );
}
