import { defineArrayMember, defineField, defineType } from "sanity";

/** Corps d'article : titres, listes, citations, liens et images */
const postBody = defineField({
  name: "body",
  title: "Contenu",
  type: "array",
  group: "content",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraphe", value: "normal" },
        { title: "Titre 2", value: "h2" },
        { title: "Titre 3", value: "h3" },
        { title: "Citation / encadré", value: "blockquote" },
      ],
      lists: [
        { title: "Puces", value: "bullet" },
        { title: "Numérotée", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Lien",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Adresse",
                description: "Lien interne : /contact ; externe : https://…",
                type: "url",
                validation: (r) => r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({ name: "openInNewTab", title: "Ouvrir dans un nouvel onglet", type: "boolean" }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texte alternatif", type: "string" }),
        defineField({ name: "caption", title: "Légende", type: "string" }),
      ],
    }),
  ],
});

export const post = defineType({
  name: "post",
  title: "Article de blog",
  type: "document",
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required(), group: "content" }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description: "L'article sera visible sur /blog/<slug>. Ne pas modifier une fois publié.",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (r) => r.required(),
      group: "content",
    }),
    defineField({ name: "updatedAt", title: "Mis à jour le", type: "date", group: "content" }),
    defineField({ name: "author", title: "Auteur", type: "string", initialValue: "Aude Escoffier", group: "content" }),
    defineField({
      name: "excerpt",
      title: "Chapô",
      description: "Résumé de 1 à 3 phrases, affiché en tête d'article et sur la page Blog.",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "cover",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texte alternatif", type: "string" })],
      group: "content",
    }),
    defineField({ name: "tags", title: "Thèmes", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, group: "content" }),
    defineField({
      name: "takeaways",
      title: "L'essentiel à retenir",
      description: "3 à 5 points clés affichés dans un encadré en début d'article.",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    postBody,
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [{ title: "Plus récents", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", date: "publishedAt", media: "cover" },
    prepare: ({ title, date, media }) => ({ title, subtitle: date, media }),
  },
});
