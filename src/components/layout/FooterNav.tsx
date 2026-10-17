"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "./Header";

/** Liste de liens du pied de page, avec la page courante soulignée */
export function FooterLinks({
  items,
  label,
  className = "",
  linkClassName = "",
}: {
  items: NavLink[];
  label: string;
  className?: string;
  linkClassName?: string;
}) {
  const pathname = usePathname();
  const current = decodeURIComponent(pathname).replace(/\/$/, "") || "/";
  return (
    <nav aria-label={label}>
      <ul className={className}>
        {items.map((item) => {
          const active = current === item.href;
          const external = /^https?:/.test(item.href);
          const cls = `group relative inline-block pb-[2px] ${linkClassName}`;
          const line = (
            <span
              className={`absolute bottom-0 left-0 h-px bg-current transition-[width] duration-500 ease-out ${active ? "w-full" : "w-0 group-hover:w-full"}`}
            />
          );
          return (
            <li key={item.href}>
              {external ? (
                <a href={item.href} className={cls}>
                  {item.label}
                  {line}
                </a>
              ) : (
                <Link href={item.href} className={cls} aria-current={active ? "page" : undefined}>
                  {item.label}
                  {line}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
