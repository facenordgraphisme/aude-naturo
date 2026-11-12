"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * Carte qui s'incline légèrement vers la souris, avec un halo lumineux qui suit le pointeur.
 * Rien ne bouge au toucher ni si l'on préfère réduire les animations.
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
  glow = "rgba(255,255,255,0.22)",
}: {
  children: React.ReactNode;
  className?: string;
  /** Inclinaison maximale en degrés */
  max?: number;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (reduce) return;
    rotateY.set((x / r.width - 0.5) * max * 2);
    rotateX.set(-(y / r.height - 0.5) * max * 2);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group/tilt relative ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${glow}, transparent 60%)` }}
      />
    </motion.div>
  );
}
