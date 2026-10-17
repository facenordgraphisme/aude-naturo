import { defineArrayMember, defineField, defineType } from "sanity";
import {
  backgroundOptions,
  headingColorOptions,
  textToneOptions,
  titleSizeOptions,
} from "../lib/theme";

// ---------- Champs partagés ----------

const background = (initialValue = "beige") =>
  defineField({
    name: "background",
    title: "Couleur de fond",
    type: "string",
    initialValue,
    options: { list: backgroundOptions },
    group: "style",
  });

const textTone = (initialValue = "dark") =>
  defineField({
    name: "textTone",
    title: "Couleur du texte",
    type: "string",
    initialValue,
    options: { list: textToneOptions, layout: "radio", direction: "horizontal" },
    group: "style",
  });

const titleColor = (initialValue = "purple") =>
  defineField({
    name: "titleColor",
    title: "Couleur du titre",
    type: "string",
    initialValue,
    options: { list: headingColorOptions, layout: "radio", direction: "horizontal" },
    group: "style",
  });

const titleSize = (initialValue = "md") =>
  defineField({
    name: "titleSize",
    title: "Taille du titre",
    type: "string",
    initialValue,
    options: { list: titleSizeOptions },
    group: "style",
  });

const titleLevel = (initialValue = "h2") =>
  defineField({
    name: "titleLevel",
    title: "Niveau du titre (SEO)",
    description: "Une seule balise H1 par page.",
    type: "string",
    initialValue,
    options: { list: ["h1", "h2", "h3"], layout: "radio", direction: "horizontal" },
    group: "style",
  });

const title = (name = "title", label = "Titre") =>
  defineField({ name, title: label, type: "text", rows: 2, group: "content" });

const body = defineField({ name: "body", title: "Texte", type: "richText", group: "content" });

const buttons = defineField({
  name: "buttons",
  title: "Boutons",
  type: "array",
  of: [defineArrayMember({ type: "button" })],
  group: "content",
});

const groups = [
  { name: "content", title: "Contenu", default: true },
  { name: "style", title: "Apparence" },
];

const previewTitle = (fallback: string) => ({
  select: { title: "title", media: "image.image" },
  prepare: ({ title, media }: { title?: string; media?: unknown }) => ({
    title: title || fallback,
    subtitle: fallback,
    media: media as never,
  }),
});

// ---------- Sections ----------

export const heroSection = defineType({
  name: "heroSection",
  title: "Bannière (hero)",
  type: "object",
  groups,
  fields: [
    title(),
    defineField({ name: "image", title: "Image de fond", type: "figure", group: "content" }),
    titleColor("white"),
    titleSize("xxl"),
  ],
  preview: previewTitle("Bannière"),
});

export const textImageSection = defineType({
  name: "textImageSection",
  title: "Texte + image",
  type: "object",
  groups,
  fields: [
    defineField({ name: "sectionTitle", title: "Titre de section (centré, au-dessus)", type: "string", group: "content" }),
    title(),
    defineField({ name: "subtitle", title: "Sous-titre", type: "string", group: "content" }),
    body,
    buttons,
    defineField({ name: "image", title: "Image", type: "figure", group: "content" }),
    defineField({
      name: "imagePosition",
      title: "Position de l'image",
      type: "string",
      initialValue: "right",
      options: { list: [{ title: "À droite", value: "right" }, { title: "À gauche", value: "left" }], layout: "radio" },
      group: "style",
    }),
    defineField({
      name: "imageBleed",
      title: "Image collée au bord de l'écran",
      type: "boolean",
      initialValue: false,
      group: "style",
    }),
    defineField({ name: "narrow", title: "Largeur réduite", type: "boolean", initialValue: false, group: "style" }),
    defineField({ name: "justify", title: "Texte justifié", type: "boolean", initialValue: false, group: "style" }),
    defineField({ name: "centerButtons", title: "Centrer les boutons", type: "boolean", initialValue: false, group: "style" }),
    background(),
    textTone(),
    titleColor(),
    titleSize(),
    titleLevel(),
  ],
  preview: previewTitle("Texte + image"),
});

export const textBandSection = defineType({
  name: "textBandSection",
  title: "Bandeau de texte",
  type: "object",
  groups,
  fields: [
    defineField({ name: "eyebrow", title: "Sur-titre", type: "string", group: "content" }),
    title(),
    defineField({ name: "subtitle", title: "Sous-titre", type: "string", group: "content" }),
    body,
    buttons,
    defineField({
      name: "align",
      title: "Alignement du titre",
      type: "string",
      initialValue: "center",
      options: { list: [{ title: "Centré", value: "center" }, { title: "Gauche", value: "left" }], layout: "radio" },
      group: "style",
    }),
    defineField({
      name: "spacing",
      title: "Espacement vertical",
      type: "string",
      initialValue: "normal",
      options: { list: [{ title: "Compact", value: "compact" }, { title: "Normal", value: "normal" }, { title: "Large", value: "large" }] },
      group: "style",
    }),
    background(),
    textTone(),
    titleColor(),
    titleSize(),
    titleLevel(),
  ],
  preview: {
    select: { title: "title", body: "body" },
    prepare: ({ title }) => ({ title: title || "Bandeau de texte", subtitle: "Bandeau de texte" }),
  },
});

export const featureCardsSection = defineType({
  name: "featureCardsSection",
  title: "Cartes",
  type: "object",
  groups,
  fields: [
    title(),
    defineField({
      name: "cards",
      title: "Cartes",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "featureCard",
          title: "Carte",
          fields: [
            defineField({ name: "icon", title: "Icône (au-dessus, centrée)", type: "figure" }),
            defineField({ name: "image", title: "Photo (en haut de la carte)", type: "figure" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "body", title: "Texte", type: "richText" }),
          ],
          preview: { select: { title: "title", media: "image.image" } },
        }),
      ],
    }),
    defineField({
      name: "cardStyle",
      title: "Style des cartes",
      type: "string",
      initialValue: "green",
      options: { list: [{ title: "Vertes, texte blanc", value: "green" }, { title: "Blanches", value: "white" }] },
      group: "style",
    }),
    background(),
    titleColor(),
  ],
  preview: previewTitle("Cartes"),
});

export const imageRowSection = defineType({
  name: "imageRowSection",
  title: "Rangée d'images",
  type: "object",
  groups,
  fields: [
    defineField({ name: "images", title: "Images", type: "array", of: [defineArrayMember({ type: "figure" })], group: "content" }),
    defineField({
      name: "aspect",
      title: "Format",
      type: "string",
      initialValue: "landscape",
      options: { list: [{ title: "Paysage (17:10)", value: "landscape" }, { title: "Carré", value: "square" }] },
      group: "style",
    }),
    defineField({
      name: "fit",
      title: "Affichage",
      type: "string",
      initialValue: "cover",
      options: { list: [{ title: "Recadrer (remplir)", value: "cover" }, { title: "Image entière", value: "contain" }] },
      group: "style",
    }),
    background(),
  ],
  preview: {
    select: { media: "images.0.image", count: "images" },
    prepare: ({ media }) => ({ title: "Rangée d'images", media }),
  },
});

export const collageSection = defineType({
  name: "collageSection",
  title: "Collage photos + texte",
  type: "object",
  groups,
  fields: [
    defineField({
      name: "images",
      title: "Photos (1 et 2 : colonne de gauche, 3 : grande photo)",
      type: "array",
      of: [defineArrayMember({ type: "figure" })],
      validation: (r) => r.max(3),
      group: "content",
    }),
    title(),
    body,
    buttons,
    defineField({
      name: "titleAlign",
      title: "Alignement du titre",
      type: "string",
      initialValue: "left",
      options: { list: [{ title: "Gauche", value: "left" }, { title: "Centré", value: "center" }], layout: "radio" },
      group: "style",
    }),
    background(),
    textTone(),
    titleColor(),
    titleSize(),
    titleLevel(),
  ],
  preview: previewTitle("Collage"),
});

export const mosaicSection = defineType({
  name: "mosaicSection",
  title: "Texte + mosaïque de 4 images",
  type: "object",
  groups,
  fields: [
    title(),
    body,
    buttons,
    defineField({
      name: "images",
      title: "Images (4)",
      type: "array",
      of: [defineArrayMember({ type: "figure" })],
      validation: (r) => r.max(4),
      group: "content",
    }),
    background("deepPurple"),
    textTone("light"),
    titleColor("white"),
    titleSize("xl"),
    titleLevel("h1"),
  ],
  preview: previewTitle("Mosaïque"),
});

export const iconGridSection = defineType({
  name: "iconGridSection",
  title: "Grille d'icônes",
  type: "object",
  groups,
  fields: [
    title(),
    defineField({
      name: "items",
      title: "Éléments",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "iconItem",
          fields: [
            defineField({ name: "icon", title: "Icône", type: "image" }),
            defineField({ name: "label", title: "Libellé", type: "string" }),
          ],
          preview: { select: { title: "label", media: "icon" } },
        }),
      ],
    }),
    defineField({
      name: "labelStyle",
      title: "Style des libellés",
      type: "string",
      initialValue: "sans",
      options: { list: [{ title: "Texte gris", value: "sans" }, { title: "Titre (serif)", value: "serif" }] },
      group: "style",
    }),
    defineField({
      name: "iconSize",
      title: "Taille des icônes",
      type: "string",
      initialValue: "small",
      options: { list: [{ title: "Petite (60px)", value: "small" }, { title: "Grande (90px)", value: "large" }] },
      group: "style",
    }),
    background(),
    titleColor(),
  ],
  preview: previewTitle("Grille d'icônes"),
});

export const partnersSection = defineType({
  name: "partnersSection",
  title: "Partenaires",
  type: "object",
  groups,
  fields: [
    title(),
    defineField({ name: "logo", title: "Logo", type: "figure", group: "content" }),
    defineField({ name: "button", title: "Bouton", type: "button", group: "content" }),
    defineField({
      name: "partners",
      title: "Partenaires",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "partner",
          fields: [
            defineField({ name: "logo", title: "Logo", type: "image" }),
            defineField({ name: "name", title: "Nom", type: "text", rows: 2 }),
            defineField({ name: "button", title: "Bouton", type: "button" }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
    }),
    background("cream"),
    titleColor("black"),
    titleSize("lg"),
  ],
  preview: previewTitle("Partenaires"),
});

export const twoCardsSection = defineType({
  name: "twoCardsSection",
  title: "Deux cartes détaillées",
  type: "object",
  groups,
  fields: [
    title(),
    defineField({
      name: "cards",
      title: "Cartes",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "detailCard",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "boldTitle", title: "Titre en gras", type: "boolean", initialValue: true }),
            defineField({
              name: "content",
              title: "Contenu",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "cardText",
                  title: "Texte",
                  fields: [defineField({ name: "body", title: "Texte", type: "richText" })],
                  preview: { prepare: () => ({ title: "Texte" }) },
                }),
                defineArrayMember({ type: "figure" }),
                defineArrayMember({
                  type: "object",
                  name: "iconRow",
                  title: "Ligne avec icône",
                  fields: [
                    defineField({ name: "icon", title: "Icône", type: "image" }),
                    defineField({ name: "text", title: "Texte", type: "string" }),
                  ],
                  preview: { select: { title: "text", media: "icon" } },
                }),
                defineArrayMember({ type: "button" }),
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "cardBackground",
      title: "Fond des cartes",
      type: "string",
      initialValue: "grey",
      options: { list: [{ title: "Gris", value: "grey" }, { title: "Blanc", value: "white" }] },
      group: "style",
    }),
    background(),
    titleColor(),
  ],
  preview: previewTitle("Deux cartes"),
});

export const pricingSection = defineType({
  name: "pricingSection",
  title: "Tableau de prix",
  type: "object",
  groups,
  fields: [
    defineField({
      name: "plans",
      title: "Offres",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "plan",
          fields: [
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "name", title: "Nom", type: "string" }),
            defineField({ name: "price", title: "Prix", description: "Ex : « 65 € » ou « prix sur mesure »", type: "string" }),
            defineField({ name: "features", title: "Détails", type: "array", of: [defineArrayMember({ type: "string" })] }),
            defineField({ name: "button", title: "Bouton", type: "button" }),
            defineField({ name: "highlighted", title: "Mise en avant (fond violet)", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        }),
      ],
    }),
    background(),
  ],
  preview: { prepare: () => ({ title: "Tableau de prix" }) },
});

export const contactSection = defineType({
  name: "contactSection",
  title: "Formulaire de contact",
  type: "object",
  groups,
  fields: [
    title(),
    defineField({ name: "subtitle", title: "Sous-titre", type: "text", rows: 2, group: "content" }),
    defineField({ name: "nameLabel", title: "Libellé « Nom »", type: "string", initialValue: "Nom", group: "content" }),
    defineField({ name: "phoneLabel", title: "Libellé « Téléphone »", type: "string", initialValue: "Numéro de téléphone", group: "content" }),
    defineField({ name: "messageLabel", title: "Libellé « Message »", type: "string", initialValue: "Votre demande", group: "content" }),
    defineField({ name: "submitLabel", title: "Bouton d'envoi", type: "string", initialValue: "Envoyer", group: "content" }),
    defineField({ name: "successMessage", title: "Message de confirmation", type: "text", rows: 2, group: "content" }),
    defineField({ name: "errorMessage", title: "Message d'erreur", type: "text", rows: 2, group: "content" }),
    defineField({ name: "infoBody", title: "Encadré : texte", type: "richText", group: "content" }),
    defineField({ name: "infoPhoneTitle", title: "Encadré : titre téléphone", type: "string", group: "content" }),
    defineField({ name: "infoPhone", title: "Encadré : téléphone", type: "string", group: "content" }),
    defineField({ name: "infoEmailTitle", title: "Encadré : titre e-mail", type: "string", group: "content" }),
    defineField({ name: "infoEmailText", title: "Encadré : e-mail affiché", type: "string", group: "content" }),
    defineField({ name: "infoEmailHref", title: "Encadré : e-mail du lien", type: "string", group: "content" }),
    background(),
  ],
  preview: previewTitle("Formulaire de contact"),
});

export const locationSection = defineType({
  name: "locationSection",
  title: "Adresse / infos pratiques",
  type: "object",
  groups,
  fields: [
    title(),
    defineField({ name: "subtitle", title: "Sous-titre", type: "string", group: "content" }),
    defineField({
      name: "items",
      title: "Infos",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "infoItem",
          fields: [
            defineField({ name: "icon", title: "Icône", type: "image" }),
            defineField({ name: "title", title: "Titre", type: "text", rows: 3 }),
            defineField({ name: "text", title: "Texte", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "text", media: "icon" } },
        }),
      ],
    }),
    defineField({ name: "image", title: "Image", type: "figure", group: "content" }),
    background(),
  ],
  preview: previewTitle("Adresse"),
});

export const mapSection = defineType({
  name: "mapSection",
  title: "Carte",
  type: "object",
  fields: [
    defineField({ name: "address", title: "Adresse", type: "string" }),
    defineField({ name: "lat", title: "Latitude", type: "number" }),
    defineField({ name: "lng", title: "Longitude", type: "number" }),
    defineField({ name: "zoom", title: "Zoom", type: "number", initialValue: 12 }),
  ],
  preview: { select: { title: "address" }, prepare: ({ title }) => ({ title: title || "Carte", subtitle: "Carte" }) },
});

export const richTextSection = defineType({
  name: "richTextSection",
  title: "Texte long (mentions, politique…)",
  type: "object",
  groups,
  fields: [body, background(), textTone("muted")],
  preview: { prepare: () => ({ title: "Texte long" }) },
});

export const sectionTypes = [
  heroSection,
  textImageSection,
  textBandSection,
  featureCardsSection,
  imageRowSection,
  collageSection,
  mosaicSection,
  iconGridSection,
  partnersSection,
  twoCardsSection,
  pricingSection,
  contactSection,
  locationSection,
  mapSection,
  richTextSection,
];
