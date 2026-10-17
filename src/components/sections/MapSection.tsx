import { Reveal } from "@/components/motion/Reveal";
import type { MapSection as Props } from "@/sanity/lib/types";

/** Carte OpenStreetMap (sans clé d'API), centrée sur l'adresse avec un marqueur */
export function MapSection({ section }: { section: Props }) {
  const { lat, lng } = section;
  if (lat == null || lng == null) return null;
  const zoom = section.zoom ?? 12;
  // Demi-largeur de la zone affichée en degrés, déduite du niveau de zoom
  const dLng = (360 / 2 ** zoom) * 1.4;
  const dLat = dLng * 0.42;
  const bbox = [lng - dLng, lat - dLat, lng + dLng, lat + dLat].map((n) => n.toFixed(5)).join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <section className="bg-beige pt-10 md:pt-[38px]">
      <Reveal preset="fade" duration={1.4} amount={0.1}>
      <iframe
        title={section.address ? `Carte : ${section.address}` : "Carte"}
        src={src}
        loading="lazy"
        className="block h-[400px] w-full border-0 md:h-[603px]"
      />
      </Reveal>
    </section>
  );
}
