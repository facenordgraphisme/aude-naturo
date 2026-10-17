import type { StructureResolver } from "sanity/structure";

export const SETTINGS_ID = "siteSettings";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Réglages du site")
        .id(SETTINGS_ID)
        .child(S.document().schemaType("siteSettings").documentId(SETTINGS_ID).title("Réglages du site")),
      S.divider(),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      S.documentTypeListItem("contactMessage").title("Messages reçus"),
    ]);
