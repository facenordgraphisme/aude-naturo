"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

let instance: Lenis | null = null;

/** Met en pause / relance le défilement fluide (ex. pendant l'ouverture du menu mobile) */
export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop();
  else instance?.start();
}

/** Défilement fluide et amorti sur tout le site (désactivé si l'on préfère réduire les animations) */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    instance = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);
  return null;
}
