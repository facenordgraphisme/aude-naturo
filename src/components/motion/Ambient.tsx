"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Ambiance de fond du site : halos colorés qui dérivent lentement derrière les sections
 * beiges (transparentes) et barre de progression de lecture en haut de l'écran.
 */
export function Ambient() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-green via-[#8a6fae] to-purple"
        style={{ scaleX }}
      />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="animate-drift-a absolute -top-[20vh] -left-[15vw] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(98,119,80,0.18),transparent_65%)]" />
        <div className="animate-drift-b absolute top-[30vh] -right-[20vw] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,rgba(87,47,124,0.13),transparent_65%)]" />
        <div className="animate-drift-a absolute -bottom-[25vh] left-[25vw] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(160,144,95,0.14),transparent_65%)] [animation-delay:-9s]" />
      </div>
    </>
  );
}
