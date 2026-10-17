"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "./Header";

function Row({ items, pathname }: { items: NavLink[]; pathname: string }) {
  const current = decodeURIComponent(pathname).replace(/\/$/, "") || "/";
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1">
      {items.map((item) => {
        const active = current === item.href;
        const external = /^https?:/.test(item.href);
        const cls = `inline-block border-b pb-[2px] font-sans text-[16px] font-normal tracking-[0.04em] text-purple ${active ? "border-purple" : "border-transparent hover:border-purple"}`;
        return (
          <li key={item.href}>
            {external ? (
              <a href={item.href} className={cls}>
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function FooterNav({ nav, legalNav }: { nav: NavLink[]; legalNav: NavLink[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Pied de page" className="flex flex-col items-center gap-1">
      <Row items={nav} pathname={pathname} />
      <Row items={legalNav} pathname={pathname} />
    </nav>
  );
}
