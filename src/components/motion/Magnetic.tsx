"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";

/** Attire légèrement son contenu vers la souris (boutons) */
export function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 220, damping: 15, mass: 0.4 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
