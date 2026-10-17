import Link from "next/link";
import { getLinkMap, hrefFor, isExternal } from "@/sanity/lib/links";
import type { Button } from "@/sanity/lib/types";
import { btnClass } from "./btnClass";

export async function Btn({ button, className = "" }: { button: Button; className?: string }) {
  const map = await getLinkMap();
  const href = hrefFor(button.link, map);
  const cls = `${btnClass(button.variant)} ${className}`;
  if (!href) return <span className={cls}>{button.label}</span>;
  const newTab = button.link?.openInNewTab || button.link?.type === "file";
  if (isExternal(href) || newTab) {
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {button.label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {button.label}
    </Link>
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
