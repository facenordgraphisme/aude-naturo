"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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

const noop = () => () => {};
/** Vrai uniquement côté navigateur (le portail du menu n'existe pas au rendu serveur) */
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export function Header({ nav, logoUrl, logoAlt = "", drawerTitle, phone, email }: Props) {
  const pathname = usePathname();
  // Le menu mobile se referme de lui-même au changement de page
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  // Point d'origine du cercle qui dévoile le menu : le centre du bouton burger
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0, r: 0 });
  const toggle = () => {
    if (!open && burgerRef.current) {
      const b = burgerRef.current.getBoundingClientRect();
      const x = b.left + b.width / 2;
      const y = b.top + b.height / 2;
      setOrigin({ x, y, r: Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) });
    }
    setOpen(!open);
  };

  // L'en-tête se compacte dès qu'on fait défiler, se cache quand on descend
  // et revient dès qu'on remonte
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? 0);
    setScrolled(y > 40);
    if (y < 140) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isClient = useIsClient();

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
          open ? "bg-transparent" : "bg-beige/95 backdrop-blur-sm"
        } ${scrolled && !open ? "shadow-[0_8px_30px_-18px_rgba(44,57,63,0.35)]" : ""}`}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div
          className={`mx-auto flex max-w-[1110px] items-center justify-between px-4 transition-[height] duration-500 ease-out md:px-8 xl:px-0 ${scrolled ? "h-[70px] md:h-[84px]" : "h-[84px] md:h-[117px]"}`}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: open ? 0 : 1, x: 0 }}
            transition={{ duration: open ? 0.3 : 0.8, ease: EASE }}
          >
            <Link href="/" aria-label="Accueil" className="block shrink-0" tabIndex={open ? -1 : undefined}>
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
            ref={burgerRef}
            type="button"
            onClick={toggle}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            {[
              { rotate: 45, y: 8 },
              { opacity: 0, x: 12 },
              { rotate: -45, y: -8 },
            ].map((to, i) => (
              <motion.span
                key={i}
                className={`h-[2px] w-7 rounded-full transition-colors duration-500 ${open ? "bg-white" : "bg-purple"}`}
                animate={open ? to : { rotate: 0, y: 0, x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Menu mobile plein écran, rendu dans <body> : un parent avec backdrop-filter ou
          transform (comme l'en-tête) piégerait sinon cet élément « fixed » dans sa propre boîte */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <MobileMenu
                nav={nav}
                pathname={pathname}
                origin={origin}
                drawerTitle={drawerTitle}
                phone={phone}
                email={email}
                onNavigate={() => setOpen(false)}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

const panel: Variants = {
  closed: ({ x, y }) => ({
    clipPath: `circle(0px at ${x}px ${y}px)`,
    transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1], delay: 0.15 },
  }),
  open: ({ x, y, r }) => ({
    clipPath: `circle(${r + 20}px at ${x}px ${y}px)`,
    transition: { duration: 0.85, ease: [0.65, 0, 0.35, 1], when: "beforeChildren", staggerChildren: 0.07 },
  }),
};

const list: Variants = {
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const linkIn: Variants = {
  closed: { y: "110%", rotate: 4, transition: { duration: 0.3, ease: [0.55, 0, 1, 0.45] } },
  open: { y: "0%", rotate: 0, transition: { duration: 0.8, ease: EASE } },
};

const fadeUp: Variants = {
  closed: { opacity: 0, y: 16, transition: { duration: 0.2 } },
  open: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.35 } },
};

function MobileMenu({
  nav,
  pathname,
  origin,
  drawerTitle,
  phone,
  email,
  onNavigate,
}: {
  nav: NavLink[];
  pathname: string;
  origin: { x: number; y: number; r: number };
  drawerTitle?: string;
  phone?: string;
  email?: string;
  onNavigate: () => void;
}) {
  return (
    <motion.div
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[45] overflow-hidden bg-green text-white lg:hidden"
      custom={origin}
      variants={panel}
      initial="closed"
      animate="open"
      exit="closed"
    >
      {/* Halos qui dérivent lentement en arrière-plan */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-[320px] w-[320px] rounded-full bg-dark-green/70 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 bottom-10 h-[360px] w-[360px] rounded-full bg-purple/25 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex h-full flex-col overflow-y-auto px-8 pt-[110px] pb-10 sm:px-14">
        <motion.p variants={fadeUp} className="mb-6 text-[12px] font-normal tracking-[0.3em] text-white/60 uppercase">
          Menu
        </motion.p>

        <motion.ul variants={list} className="flex flex-col gap-1">
          {nav.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="overflow-hidden pb-1">
                <motion.div variants={linkIn} className="origin-left">
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-4 py-1"
                  >
                    <span className="w-6 font-sans text-[12px] font-normal tracking-[0.1em] text-white/50 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`relative font-serif text-[clamp(30px,8.5vw,46px)] leading-[1.15] transition-transform duration-500 ease-out group-hover:translate-x-2 group-active:translate-x-2 ${active ? "italic" : ""}`}
                    >
                      {item.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-white transition-[width] duration-500 ease-out ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                      />
                    </span>
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </motion.ul>

        <div className="mt-auto pt-12">
          <motion.span
            aria-hidden="true"
            className="block h-px origin-left bg-white/30"
            variants={{
              closed: { scaleX: 0, transition: { duration: 0.2 } },
              open: { scaleX: 1, transition: { duration: 1, ease: EASE, delay: 0.3 } },
            }}
          />
          <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-2">
            {drawerTitle && (
              <p className="mb-1 text-[12px] font-normal tracking-[0.3em] text-white/60 uppercase">{drawerTitle}</p>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-[20px] font-normal tracking-[0.04em]">
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="text-[16px] break-all text-white/85 underline-offset-4 hover:underline">
                {email}
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
