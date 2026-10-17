"use client";

import { motion } from "motion/react";
import { EASE } from "./Reveal";

/**
 * Titre dont chaque mot monte depuis un masque, mot après mot.
 * Les retours à la ligne saisis dans Sanity sont conservés.
 */
export function AnimatedTitle({
  text,
  className = "",
  as = "h2",
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  /** Anime au chargement plutôt qu'à l'entrée dans l'écran (titres en haut de page) */
  immediate?: boolean;
}) {
  const Tag = motion[as];
  const lines = text.split("\n");
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } };
  let index = 0;

  return (
    <Tag
      className={className}
      aria-label={text.replace(/\n/g, " ")}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word, wi, words) => {
            index++;
            return (
              <span key={`${wi}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: "0%", rotate: 0 } }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  {word}
                  {wi < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
