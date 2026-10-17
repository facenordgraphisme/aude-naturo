import { defineArrayMember, defineField, defineType } from "sanity";
import { sectionTypes } from "./sections";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Nom de la page", type: "string", validation: (r) => r.required(), group: "content" }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description: "Ne pas modifier sans prévoir de redirection : l'URL est référencée par Google.",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
      group: "content",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      of: sectionTypes.map((s) => defineArrayMember({ type: s.name })),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug ?? ""}` }),
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "nav", title: "Menus" },
    { name: "footer", title: "Pied de page" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Nom du site", type: "string", group: "general" }),
    defineField({ name: "siteUrl", title: "URL du site", type: "url", group: "general" }),
    defineField({ name: "homePage", title: "Page d'accueil", type: "reference", to: [{ type: "page" }], group: "general" }),
    defineField({ name: "logo", title: "Logo", type: "image", group: "general" }),
    defineField({ name: "logoAlt", title: "Texte alternatif du logo", type: "string", group: "general" }),
    defineField({ name: "phone", title: "Téléphone", type: "string", group: "general" }),
    defineField({ name: "email", title: "E-mail", type: "string", group: "general" }),
    defineField({ name: "facebookUrl", title: "Page Facebook", type: "url", group: "general" }),
    defineField({ name: "defaultOgImage", title: "Image de partage par défaut", type: "image", group: "general" }),
    defineField({
      name: "mainNav",
      title: "Menu principal",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
      group: "nav",
    }),
    defineField({
      name: "legalNav",
      title: "Liens légaux (pied de page)",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
      group: "nav",
    }),
    defineField({ name: "drawerTitle", title: "Menu mobile : titre contact", type: "string", group: "nav" }),
    defineField({ name: "footerBanner", title: "Bandeau illustré au-dessus du pied de page", type: "image", group: "footer" }),
  ],
  preview: { prepare: () => ({ title: "Réglages du site" }) },
});

export const contactMessage = defineType({
  name: "contactMessage",
  title: "Message de contact",
  type: "document",
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Nom", type: "string" }),
    defineField({ name: "phone", title: "Téléphone", type: "string" }),
    defineField({ name: "message", title: "Demande", type: "text" }),
    defineField({ name: "page", title: "Page", type: "string" }),
    defineField({ name: "createdAt", title: "Reçu le", type: "datetime" }),
  ],
  orderings: [{ title: "Plus récents", name: "createdAtDesc", by: [{ field: "createdAt", direction: "desc" }] }],
  preview: {
    select: { title: "name", subtitle: "createdAt", description: "message" },
  },
});
