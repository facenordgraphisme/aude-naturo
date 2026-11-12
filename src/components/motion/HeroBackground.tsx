"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE } from "./Reveal";

/**
 * Fond du hero : dézoom à l'arrivée, puis zoom lent et continu (« Ken Burns »),
 * parallaxe au défilement et léger déplacement qui suit la souris.
 */
export function HeroBackground({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const spring = { stiffness: 60, damping: 20 };
  const mx = useSpring(0, spring);
  const my = useSpring(0, spring);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set((e.clientX / window.innerWidth - 0.5) * -24);
      my.set((e.clientY / window.innerHeight - 0.5) * -16);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        <motion.div
          className="absolute -inset-6"
          style={{ x: mx, y: my }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <div className="animate-kenburns absolute inset-0">{children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
}
