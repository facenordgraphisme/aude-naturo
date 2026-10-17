"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { Children, useEffect, useRef, useState } from "react";
import { EASE } from "./Reveal";

const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * Carrousel infini qui avance tout seul : la diapositive centrale est mise en avant,
 * ses voisines dépassent sur les côtés. Chaque diapositive est repérée par un index
 * absolu (qui ne fait que croître) pour boucler sans retour en arrière visible.
 */
export function AutoCarousel({
  children,
  interval = 1500,
  className = "",
  slideClassName = "",
}: {
  children: React.ReactNode;
  interval?: number;
  className?: string;
  /** Classe de la diapositive fantôme qui donne sa hauteur au carrousel (ex. un ratio) */
  slideClassName?: string;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce || n < 2) return;
    const id = setInterval(() => setIndex((i) => i + 1), interval);
    return () => clearInterval(id);
  }, [inView, reduce, n, interval]);

  if (n === 0) return null;

  // On garde à l'écran la diapositive courante et deux voisines de chaque côté
  const visible = [-2, -1, 0, 1, 2].map((offset) => index + offset);
  const current = mod(index, n);

  return (
    <div ref={ref} className={className} aria-roledescription="carrousel">
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className={`invisible mx-auto w-[66%] ${slideClassName}`} />
        {visible.map((k) => {
          const offset = k - index;
          const target = {
            x: `${offset * 100}%`,
            scale: offset === 0 ? 1 : 0.72,
            opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.45 : 0,
          };
          return (
            <motion.div
              key={k}
              className="absolute inset-y-0 left-[17%] w-[66%]"
              initial={target}
              animate={target}
              transition={{ duration: 0.9, ease: EASE }}
              aria-hidden={offset !== 0}
            >
              {slides[mod(k, n)]}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Image ${i + 1}`}
            aria-current={i === current}
            onClick={() => setIndex((idx) => idx + (i - current))}
            className="p-1"
          >
            <span
              className={`block h-[6px] rounded-full transition-all duration-500 ease-out ${i === current ? "w-6 bg-green" : "w-[6px] bg-green/30"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
