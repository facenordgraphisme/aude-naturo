"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { SETTINGS_ID, structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  name: "aude-naturo",
  title: "Aude Naturo",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Le singleton « Réglages du site » ne peut être ni créé ni dupliqué depuis le menu « + »
    templates: (templates) => templates.filter((t) => t.schemaType !== "siteSettings" && t.schemaType !== "contactMessage"),
  },
  document: {
    actions: (actions, { schemaType, documentId }) =>
      schemaType === "siteSettings" || documentId === SETTINGS_ID
        ? actions.filter((a) => a.action && ["publish", "discardChanges", "restore"].includes(a.action))
        : actions,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
