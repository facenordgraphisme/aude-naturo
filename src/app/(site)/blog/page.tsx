import type { Metadata } from "next";
import { PostCard } from "@/components/blog/PostCard";
import { AnimatedTitle } from "@/components/motion/AnimatedTitle";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Section";
import { getPosts } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: { absolute: "Blog naturopathie | Aude Naturo | Embrun" },
  description:
    "Conseils de naturopathie, alimentation, gestion du stress et hygiène de vie : les articles d'Aude Escoffier, naturopathe à Embrun (Hautes-Alpes).",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: "Blog naturopathie | Aude Naturo" },
};

export default async function BlogPage() {
  const posts = (await getPosts()) ?? [];
  const [first, ...rest] = posts;

  return (
    <>
      <section className="pt-10 pb-12 md:pt-16 md:pb-20">
        <Container width="wide">
          <Reveal preset="fade" className="mb-4 flex items-center gap-3 text-[13px] font-normal tracking-[0.3em] text-green uppercase">
            <span className="h-px w-10 bg-green/60" />
            Le blog
          </Reveal>
          <AnimatedTitle
            as="h1"
            immediate
            delay={0.1}
            text={"Conseils & inspirations\npour prendre soin de vous"}
            className="max-w-[900px] font-serif text-[40px] leading-[1.08] text-purple md:text-[60px] lg:text-[72px]"
          />
          <Reveal delay={0.5} className="mt-6 max-w-[620px]">
            <p className="text-[19px] leading-[1.6] text-ink/80">
              Alimentation, stress, sommeil, plantes… Des repères simples et sourcés pour mieux comprendre la naturopathie et
              l&apos;intégrer à votre quotidien.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container width="wide">
          {!first && (
            <Reveal className="rounded-[24px] bg-white/60 p-10 text-center text-ink/70">Les premiers articles arrivent très bientôt.</Reveal>
          )}
          {first && (
            <Reveal preset="up" duration={1.1}>
              <PostCard post={first} featured />
            </Reveal>
          )}
          {rest.length > 0 && (
            <Stagger className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
              {rest.map((post) => (
                <StaggerItem key={post._id} className="h-full">
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>
    </>
  );
}
