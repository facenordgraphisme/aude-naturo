import { defineArrayMember, defineField, defineType } from "sanity";
import { shapeOptions } from "../lib/theme";

export const link = defineType({
  name: "link",
  title: "Lien",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type de lien",
      type: "string",
      initialValue: "internal",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Page du site", value: "internal" },
          { title: "URL / tél / e-mail", value: "external" },
          { title: "Fichier (PDF…)", value: "file" },
        ],
      },
    }),
    defineField({
      name: "internal",
      title: "Page",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.type !== "internal",
    }),
    defineField({
      name: "href",
      title: "URL",
      description: "https://…, tel:0600000000 ou mailto:adresse@exemple.fr",
      type: "url",
      validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "tel", "mailto"] }),
      hidden: ({ parent }) => parent?.type !== "external",
    }),
    defineField({
      name: "file",
      title: "Fichier",
      type: "file",
      hidden: ({ parent }) => parent?.type !== "file",
    }),
    defineField({ name: "openInNewTab", title: "Ouvrir dans un nouvel onglet", type: "boolean", initialValue: false }),
  ],
});

export const button = defineType({
  name: "button",
  title: "Bouton",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Texte", type: "string", validation: (r) => r.required() }),
    defineField({ name: "link", title: "Lien", type: "link" }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      initialValue: "outline",
      options: {
        list: [
          { title: "Blanc bordé de vert", value: "outline" },
          { title: "Violet plein", value: "solid" },
          { title: "Blanc (sur fond violet)", value: "white" },
        ],
      },
    }),
  ],
  preview: { select: { title: "label", subtitle: "variant" } },
});

export const figure = defineType({
  name: "figure",
  title: "Image",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Texte alternatif", type: "string" }),
    defineField({
      name: "shape",
      title: "Forme",
      type: "string",
      initialValue: "rect",
      options: { list: shapeOptions },
    }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});

export const richText = defineType({
  name: "richText",
  title: "Texte riche",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraphe", value: "normal" },
        { title: "Titre 1", value: "h1" },
        { title: "Titre 2", value: "h2" },
        { title: "Titre 3", value: "h3" },
        { title: "Titre 4", value: "h4" },
      ],
      lists: [
        { title: "Puces", value: "bullet" },
        { title: "Numérotée", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
          { title: "Souligné", value: "underline" },
          { title: "Vert", value: "green", icon: () => "V" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Lien",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "tel", "mailto"] }),
              }),
              defineField({ name: "openInNewTab", title: "Nouvel onglet", type: "boolean" }),
            ],
          }),
        ],
      },
    }),
  ],
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Titre (balise title)", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 3 }),
    defineField({ name: "ogImage", title: "Image de partage", type: "image" }),
    defineField({ name: "noIndex", title: "Masquer des moteurs de recherche", type: "boolean", initialValue: false }),
  ],
});

export const navItem = defineType({
  name: "navItem",
  title: "Lien de menu",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Libellé", type: "string", validation: (r) => r.required() }),
    defineField({ name: "link", title: "Lien", type: "link" }),
  ],
  preview: { select: { title: "label" } },
});

export const objectTypes = [link, button, figure, richText, seo, navItem];
