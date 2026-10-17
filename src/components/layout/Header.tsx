"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/Reveal";

export type NavLink = { label: string; href: string };

type Props = {
  nav: NavLink[];
  logoUrl?: string;
  logoAlt?: string;
  drawerTitle?: string;
  phone?: string;
  email?: string;
};

function isActive(pathname: string, href: string) {
  const current = decodeURIComponent(pathname).replace(/\/$/, "") || "/";
  return current === href;
}

export function Header({ nav, logoUrl, logoAlt = "", drawerTitle, phone, email }: Props) {
  const pathname = usePathname();
  // Le menu mobile se referme de lui-même au changement de page
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  // L'en-tête se compacte et prend une ombre légère dès qu'on fait défiler
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-beige/95 backdrop-blur-sm transition-shadow duration-500 ${scrolled ? "shadow-[0_8px_30px_-18px_rgba(44,57,63,0.35)]" : ""}`}
    >
      <div
        className={`mx-auto flex max-w-[1110px] items-center justify-between px-4 transition-[height] duration-500 ease-out md:px-8 xl:px-0 ${scrolled ? "h-[70px] md:h-[84px]" : "h-[84px] md:h-[117px]"}`}
      >
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <Link href="/" aria-label="Accueil" className="block shrink-0">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={88}
                height={85}
                priority
                className={`w-auto transition-[height] duration-500 ease-out ${scrolled ? "h-[54px] md:h-[64px]" : "h-[64px] md:h-[85px]"}`}
              />
            )}
          </Link>
        </motion.div>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <motion.ul
            className="flex items-center gap-[41px]"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
          >
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="group relative block py-2 font-serif text-[16px] font-bold tracking-[0.04em] text-purple"
                  >
                    {item.label}
                    {/* Soulignement de survol */}
                    {!active && (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-purple/50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    )}
                    {/* Soulignement de la page active : glisse d'un lien à l'autre */}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-purple"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <motion.span className="h-[2px] w-7 bg-purple" animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} />
          <motion.span className="h-[2px] w-7 bg-purple" animate={open ? { opacity: 0, x: 12 } : { opacity: 1, x: 0 }} />
          <motion.span className="h-[2px] w-7 bg-purple" animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} />
        </button>
      </div>

      {/* Menu mobile (tiroir latéral) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed top-0 right-0 z-50 flex h-full w-[86vw] max-w-[400px] flex-col overflow-y-auto bg-white px-8 pt-20 pb-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              >
                {nav.map((item) => (
                  <motion.li key={item.href} variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}>
                    <Link
                      href={item.href}
                      className={`block py-[10px] font-serif text-[16px] ${isActive(pathname, item.href) ? "text-purple" : "text-black"}`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                className="mt-[90px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              >
                {drawerTitle && <h4 className="mb-3 text-[18px] font-bold text-purple">{drawerTitle}</h4>}
                {phone && (
                  <p>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-bold text-purple">
                      {phone}
                    </a>
                  </p>
                )}
                {email && (
                  <p>
                    <a href={`mailto:${email}`} className="font-bold text-purple">
                      {email}
                    </a>
                  </p>
                )}
                {logoUrl && <Image src={logoUrl} alt={logoAlt} width={400} height={386} className="mt-6 h-auto w-full max-w-[320px]" />}
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
