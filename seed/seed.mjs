// Import du contenu de l'ancien site dans Sanity.
// Usage :  SANITY_API_WRITE_TOKEN=xxx node seed/seed.mjs          (import)
//          node seed/seed.mjs --dry                               (aperçu NDJSON, sans envoi)
import { createReadStream, existsSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { buildDocuments } from "./content.mjs";

const dry = process.argv.includes("--dry");
const root = fileURLToPath(new URL("./assets/", import.meta.url));
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fd543lpy";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

function locate(name) {
  for (const dir of ["img", "svg", "."]) {
    const p = join(root, dir, name);
    if (existsSync(p)) return p;
  }
  throw new Error(`Fichier introuvable : ${name}`);
}

// 1re passe : liste des fichiers utilisés
const needed = { image: new Set(), file: new Set() };
buildDocuments({
  img: (n) => (needed.image.add(n), {}),
  file: (n) => (needed.file.add(n), {}),
});
console.log(`${needed.image.size} images et ${needed.file.size} fichier(s) référencés`);

const ids = {};
if (dry) {
  for (const n of needed.image) ids[`image:${n}`] = `image-DRY-${basename(n)}`;
  for (const n of needed.file) ids[`file:${n}`] = `file-DRY-${basename(n)}`;
} else {
  if (!token) {
    console.error("SANITY_API_WRITE_TOKEN manquant (jeton « Editor » créé sur sanity.io/manage > API > Tokens).");
    process.exit(1);
  }
  const client = createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false });

  // 2e passe : envoi des fichiers (Sanity déduplique automatiquement les fichiers identiques)
  const jobs = [
    ...[...needed.image].map((n) => ["image", n]),
    ...[...needed.file].map((n) => ["file", n]),
  ];
  let done = 0;
  const queue = [...jobs];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const [type, name] = queue.shift();
        const asset = await client.assets.upload(type, createReadStream(locate(name)), { filename: name });
        ids[`${type}:${name}`] = asset._id;
        console.log(`  [${++done}/${jobs.length}] ${name}`);
      }
    }),
  );

  const docs = buildDocuments({
    img: (n) => ({ _type: "image", asset: { _type: "reference", _ref: ids[`image:${n}`] } }),
    file: (n) => ({ _type: "file", asset: { _type: "reference", _ref: ids[`file:${n}`] } }),
  });
  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit({ visibility: "async" });
  console.log(`✔ ${docs.length} documents importés dans ${projectId}/${dataset}`);
  process.exit(0);
}

const docs = buildDocuments({
  img: (n) => ({ _type: "image", asset: { _type: "reference", _ref: ids[`image:${n}`] } }),
  file: (n) => ({ _type: "file", asset: { _type: "reference", _ref: ids[`file:${n}`] } }),
});
const out = fileURLToPath(new URL("./preview.ndjson", import.meta.url));
writeFileSync(out, docs.map((d) => JSON.stringify(d)).join("\n"));
console.log(`Aperçu écrit dans ${out}`);
