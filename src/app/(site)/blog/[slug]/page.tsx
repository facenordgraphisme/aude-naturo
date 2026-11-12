import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { headingsOf, PostBody } from "@/components/blog/PostBody";
import { formatDate, PostCard, readingLabel } from "@/components/blog/PostCard";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { btnClass } from "@/components/ui/btnClass";
import { Container } from "@/components/ui/Section";
import { getPostBySlug, getPosts, getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const posts = (await getPosts()) ?? [];
  // Cache Components exige au moins un paramètre ; les autres articles sont rendus à la demande
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "qu-est-ce-que-la-naturopathie" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const seo = post.seo ?? {};
  const image = seo.ogImage?.asset ?? post.cover?.asset ? urlFor(seo.ogImage?.asset ? seo.ogImage : post.cover!).width(1200).height(630).url() : undefined;
  const path = `/blog/${post.slug}`;
  const description = seo.metaDescription || post.excerpt;
  return {
    title: seo.metaTitle ? { absolute: seo.metaTitle } : post.title,
    description,
    alternates: { canonical: path },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: path,
      title: seo.metaTitle || post.title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: post.cover?.alt }] } : {}),
    },
    twitter: { card: "summary_large_image" },
  };
}

async function Article({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSettings()]);
  if (!post) notFound();

  const base = (settings?.siteUrl ?? "https://www.aude-naturo.fr").replace(/\/$/, "");
  const url = `${base}/blog/${post.slug}`;
  const toc = headingsOf(post.body);
  const author = post.author ?? "Aude Escoffier";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo?.metaDescription || post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        inLanguage: "fr-FR",
        mainEntityOfPage: url,
        keywords: post.tags?.join(", "),
        image: post.cover?.asset ? urlFor(post.cover).width(1200).height(630).url() : undefined,
        author: { "@type": "Person", name: author, jobTitle: "Naturopathe", url: `${base}/qui-suis-je` },
        publisher: { "@type": "Organization", name: settings?.siteName ?? "Aude Naturo", url: base },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: base },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      {/* En-tête */}
      <header className="pt-8 pb-10 md:pt-14 md:pb-14">
        <Container width="default" className="xl:max-w-[980px]">
          <Reveal preset="fade">
            <nav aria-label="Fil d'Ariane" className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
              <Link href="/" className="transition-colors hover:text-purple">
                Accueil
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/blog" className="transition-colors hover:text-purple">
                Blog
              </Link>
            </nav>
          </Reveal>
          {!!post.tags?.length && (
            <Reveal preset="fade" delay={0.1} className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border border-green/30 px-3 py-1 text-[12px] font-normal tracking-[0.12em] text-green uppercase">
                  {t}
                </span>
              ))}
            </Reveal>
          )}
          <AnimatedTitle
            as="h1"
            immediate
            delay={0.15}
            text={post.title}
            className="mt-5 font-serif text-[38px] leading-[1.1] text-purple md:text-[56px] lg:text-[64px]"
          />
          {post.excerpt && (
            <Reveal delay={0.45} className="mt-6 max-w-[760px]">
              <p className="text-[20px] leading-[1.55] text-ink/80 md:text-[22px]">{post.excerpt}</p>
            </Reveal>
          )}
          <Reveal delay={0.6} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-ink/70">
            <span>
              Par{" "}
              <Link href="/qui-suis-je" className="font-normal text-purple underline-offset-4 hover:underline">
                {author}
              </Link>
              , naturopathe à Embrun
            </span>
            <span className="h-1 w-1 rounded-full bg-green/60" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <>
                <span className="h-1 w-1 rounded-full bg-green/60" aria-hidden="true" />
                <span>
                  Mis à jour le <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                </span>
              </>
            )}
            <span className="h-1 w-1 rounded-full bg-green/60" aria-hidden="true" />
            <span>{readingLabel(post.readingTime)}</span>
          </Reveal>
        </Container>
      </header>

      {/* Couverture */}
      {post.cover?.asset && (
        <div className="px-2 md:px-4">
          {/* Visible dès le rendu serveur (image LCP) : simple parallaxe + zoom lent, sans rideau qui attendrait le JS */}
          <div className="relative mx-auto aspect-[16/9] max-w-[1400px] overflow-hidden rounded-[28px] md:aspect-[21/9] md:rounded-[40px]">
            <Parallax offset={30} className="absolute -inset-y-10 inset-x-0">
              <div className="animate-kenburns relative h-full w-full">
                <Image src={urlFor(post.cover).width(2200).url()} alt={post.cover.alt ?? ""} fill priority sizes="100vw" className="object-cover" />
              </div>
            </Parallax>
          </div>
        </div>
      )}

      {/* Corps + sommaire */}
      <Container width="wide" className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,720px)] lg:justify-center lg:gap-20">
          {toc.length > 1 && (
            <aside className="hidden lg:block">
              <nav aria-label="Sommaire" className="sticky top-[130px]">
                <p className="mb-4 text-[12px] font-normal tracking-[0.3em] text-green uppercase">Sommaire</p>
                <ol className="space-y-3 border-l border-purple/15 text-[15px] leading-[1.35]">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent pl-4 text-ink/70 transition-colors hover:border-purple hover:text-purple">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          <div className={toc.length > 1 ? "" : "lg:col-span-2 lg:mx-auto lg:w-full lg:max-w-[720px]"}>
            {!!post.takeaways?.length && (
              <Reveal className="mb-12 rounded-[24px] bg-green p-7 text-white shadow-[0_30px_60px_-40px_rgba(76,91,64,0.9)] md:p-9">
                <p className="mb-4 font-serif text-[24px]">L&apos;essentiel à retenir</p>
                <ul className="space-y-3 text-[17px] leading-[1.55]">
                  {post.takeaways.map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-[5px] h-4 w-4 shrink-0 fill-white/80">
                        <path d="M12 0c1 6 5 11 12 12-7 1-11 6-12 12-1-6-5-11-12-12C7 11 11 6 12 0Z" />
                      </svg>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <PostBody value={post.body} />

            {/* Encart auteur */}
            <Reveal className="mt-16 flex flex-col gap-5 rounded-[24px] border border-purple/10 bg-white/60 p-7 backdrop-blur-sm sm:flex-row sm:items-center md:p-9">
              {settings?.logo?.asset && (
                <Image src={urlFor(settings.logo).width(200).url()} alt="" width={80} height={78} className="h-[78px] w-auto shrink-0" />
              )}
              <div>
                <p className="font-serif text-[22px] text-purple">{author}</p>
                <p className="mt-2 text-[16px] leading-[1.55] text-ink/75">
                  Naturopathe à Embrun (Hautes-Alpes), formée à l&apos;école Euronature, après dix ans comme préparatrice en
                  pharmacie hospitalière. Elle reçoit en consultation au cabinet Tera Naam et anime des ateliers.{" "}
                  <Link href="/qui-suis-je" className="text-purple underline underline-offset-4">
                    En savoir plus
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Appel à l'action */}
      <section className="relative overflow-hidden bg-dark-green py-16 text-center text-white md:py-24">
        <div aria-hidden="true" className="animate-drift-b absolute -top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_65%)]" />
        <Container width="narrow" className="relative">
          <AnimatedTitle text={"Envie d'être accompagné(e) ?"} className="font-serif text-[32px] leading-[1.15] md:text-[46px]" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-[560px] text-[18px] leading-[1.6] text-white/85">
              Première consultation de 1 h 30 au cabinet à Embrun : un temps d&apos;écoute, un bilan et un programme d&apos;hygiène de
              vie construit ensemble.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mt-8 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link href="/contact" className={btnClass("white")}>
                Prendre rendez-vous
              </Link>
            </Magnetic>
          </Reveal>
        </Container>
      </section>

      {/* Autres articles */}
      {!!post.related?.length && (
        <section className="py-16 md:py-24">
          <Container width="wide">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <AnimatedTitle text="À lire aussi" className="font-serif text-[32px] text-purple md:text-[40px]" />
              <Link href="/blog" className="text-[16px] text-green underline-offset-4 hover:underline">
                Tous les articles
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {post.related.map((p) => (
                <Reveal key={p._id} className="h-full">
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}

export default function PostPage(props: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[80vh]" />}>
      <Article params={props.params} />
    </Suspense>
  );
}
