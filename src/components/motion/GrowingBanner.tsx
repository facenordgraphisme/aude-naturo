"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Bandeau fleuri du pied de page : les fleurs « poussent » à mesure qu'on approche du bas */
export function GrowingBanner({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["35%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="relative h-full w-full" style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}
