"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { EASE } from "./Reveal";

type Direction = "up" | "left" | "right" | "center";

const clips: Record<Direction, string> = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  center: "inset(50% 50% 50% 50%)",
};

/**
 * Dévoile une image avec un rideau (clip-path) et un léger dézoom,
 * puis lui donne un effet de parallaxe discret au défilement.
 *
 * La détection d'entrée dans l'écran se fait sur le conteneur extérieur, sans clip-path :
 * Chrome exclut la zone masquée du calcul d'IntersectionObserver, l'animation ne partirait jamais.
 */
export function ImageReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  parallax = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  /** Amplitude de la parallaxe en px (0 = aucune) */
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  return (
    <motion.div ref={ref} className={className} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <motion.div
        className="h-full w-full"
        variants={{ hidden: { clipPath: clips[direction] }, show: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        <motion.div
          className="relative h-full w-full"
          style={parallax ? { y } : undefined}
          // Avec parallaxe, l'image reste légèrement agrandie pour ne jamais laisser de bord vide
          variants={{ hidden: { scale: parallax ? 1.25 : 1.15 }, show: { scale: parallax ? 1.1 : 1 } }}
          transition={{ duration: 1.6, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
