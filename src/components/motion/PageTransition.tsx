"use client";

import { motion } from "motion/react";
import { EASE } from "./Reveal";

/** Fondu d'entrée du contenu à chaque changement de page */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
      {children}
    </motion.div>
  );
}
