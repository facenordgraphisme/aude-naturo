import Link from "next/link";
import { btnClass } from "@/components/ui/btnClass";

export default function NotFound() {
  return (
    <section className="bg-beige px-4 py-32 text-center">
      <h1 className="text-[40px] text-purple md:text-[60px]">Page introuvable</h1>
      <p className="mt-6">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
      <Link href="/" className={`${btnClass("outline")} mt-10`}>
        Retour à l&apos;accueil
      </Link>
    </section>
  );
}
