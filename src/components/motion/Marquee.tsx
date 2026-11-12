"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useVelocity } from "motion/react";
import { Fragment, useRef } from "react";

/**
 * Bandeau de mots qui défile en continu. Il accélère quand on fait défiler la page
 * et change de sens quand on remonte.
 */
export function Marquee({ items, speed = 50, className = "" }: { items: string[]; speed?: number; className?: string }) {
  const x = useMotionValue(0);
  const copy = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });

  useAnimationFrame((_, delta) => {
    const w = copy.current?.offsetWidth;
    if (reduce || !w) return;
    const v = velocity.get();
    if (v < -5) direction.current = -1;
    else if (v > 5) direction.current = 1;
    const move = direction.current * speed * (delta / 1000) * (1 + Math.min(Math.abs(v) / 250, 6));
    // Reste dans [-w, 0[ : la seconde copie prend le relais sans saut visible
    x.set((((x.get() - move) % w) + w) % w - w);
  });

  if (!items.length) return null;
  // Assez de répétitions pour couvrir les écrans larges
  const row = Array.from({ length: Math.max(2, Math.ceil(8 / items.length)) }, () => items).flat();

  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1].map((c) => (
          <div key={c} ref={c === 0 ? copy : undefined} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <Fragment key={i}>
                <span className={`px-6 whitespace-nowrap md:px-10 ${i % 2 ? "italic text-green" : ""}`}>{item}</span>
                <svg viewBox="0 0 24 24" className="h-[0.45em] w-[0.45em] shrink-0 fill-current text-green/60">
                  <path d="M12 0c1 6 5 11 12 12-7 1-11 6-12 12-1-6-5-11-12-12C7 11 11 6 12 0Z" />
                </svg>
              </Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
