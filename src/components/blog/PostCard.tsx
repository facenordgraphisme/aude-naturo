import Image from "next/image";
import Link from "next/link";
import { TiltCard } from "@/components/motion/TiltCard";
import { urlFor } from "@/sanity/lib/image";
import type { PostCard as Post } from "@/sanity/lib/types";

export function formatDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(date));
}

export const readingLabel = (minutes?: number) => `${Math.max(1, minutes ?? 1)} min de lecture`;

/** Carte d'article : image qui zoome au survol, inclinaison 3D et flèche qui glisse */
export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <TiltCard className="h-full rounded-[24px]" max={4} glow="rgba(98,119,80,0.10)">
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex h-full flex-col overflow-hidden rounded-[24px] bg-white/70 shadow-[0_20px_50px_-35px_rgba(44,57,63,0.5)] ring-1 ring-ink/5 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(87,47,124,0.45)] ${featured ? "md:grid md:grid-cols-[1.15fr_1fr]" : ""}`}
      >
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] md:aspect-auto md:min-h-[420px]" : "aspect-[16/10]"}`}>
          {post.cover?.asset && (
            <Image
              src={urlFor(post.cover).width(1400).url()}
              alt={post.cover.alt ?? ""}
              fill
              sizes={featured ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
            />
          )}
          {post.tags?.[0] && (
            <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1 text-[12px] font-normal tracking-[0.12em] text-green uppercase backdrop-blur">
              {post.tags[0]}
            </span>
          )}
        </div>
        <div className={`flex flex-1 flex-col p-6 md:p-8 ${featured ? "md:justify-center md:p-12" : ""}`}>
          <p className="text-[13px] font-normal tracking-[0.08em] text-muted uppercase">
            {formatDate(post.publishedAt)} · {readingLabel(post.readingTime)}
          </p>
          <h2
            className={`mt-3 font-serif text-purple transition-colors duration-300 group-hover:text-dark-green ${featured ? "text-[30px] leading-[1.15] md:text-[42px]" : "text-[24px] leading-[1.2]"}`}
          >
            {post.title}
          </h2>
          {post.excerpt && (
            <p className={`mt-4 text-ink/75 ${featured ? "text-[18px] leading-[1.55]" : "line-clamp-3 text-[16px] leading-[1.5]"}`}>
              {post.excerpt}
            </p>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[16px] font-normal text-green">
            Lire l&apos;article
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-none stroke-current stroke-[1.8] transition-transform duration-500 group-hover:translate-x-1.5">
              <path d="M4 12h15m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
