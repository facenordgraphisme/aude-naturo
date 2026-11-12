import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { getLinkMap, hrefFor, isExternal } from "@/sanity/lib/links";
import type { Button } from "@/sanity/lib/types";
import { btnClass } from "./btnClass";

/** Libellé + flèche qui se glisse à côté du texte au survol */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="ml-0 h-[18px] w-0 shrink-0 -translate-x-2 fill-none stroke-current stroke-[1.8] opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/btn:ml-2 group-hover/btn:w-[18px] group-hover/btn:translate-x-0 group-hover/btn:opacity-100"
      >
        <path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}

export async function Btn({ button, className = "" }: { button: Button; className?: string }) {
  const map = await getLinkMap();
  const href = hrefFor(button.link, map);
  const cls = `${btnClass(button.variant)} ${className}`;
  if (!href) return <span className={cls}>{button.label}</span>;
  const newTab = button.link?.openInNewTab || button.link?.type === "file";
  if (isExternal(href) || newTab) {
    return (
      <Magnetic>
        <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          <Label>{button.label}</Label>
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <Link href={href} className={cls}>
        <Label>{button.label}</Label>
      </Link>
    </Magnetic>
  );
}

export function Buttons({ buttons, className = "" }: { buttons?: Button[]; className?: string }) {
  if (!buttons?.length) return null;
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {buttons.map((b, i) => (
        <Btn key={b._key ?? i} button={b} />
      ))}
    </div>
  );
}
