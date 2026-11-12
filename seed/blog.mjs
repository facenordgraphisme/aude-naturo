// Import des articles de blog rédigés en Markdown (seed/blog/<slug>/<slug>.md) dans Sanity.
// Usage :  npm run seed:blog                 (import + ajout de « Blog » au menu s'il manque)
//          npm run seed:blog -- --dry        (aperçu JSON, sans envoi)
import { createReadStream, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import { key } from "./lib/html-to-pt.mjs";

const dry = process.argv.includes("--dry");
const root = fileURLToPath(new URL("./blog/", import.meta.url));
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "fd543lpy";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const SITE = "https://www.aude-naturo.fr";

// ---------- Markdown → Portable Text (sous-ensemble utilisé par les articles) ----------

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error("Frontmatter manquant");
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    const raw = kv[2].trim();
    data[kv[1]] = raw.startsWith("[") ? JSON.parse(raw) : raw.replace(/^"(.*)"$/, "$1");
  }
  return { data, body: m[2] };
}

/** Texte inline : **gras**, *italique*, [lien](url) */
function inline(text) {
  const children = [];
  const markDefs = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)|([^*[]+|[*[])/g;
  let m;
  const push = (t, marks = []) => {
    const prev = children[children.length - 1];
    if (prev && prev.marks.join() === marks.join()) prev.text += t;
    else children.push({ _type: "span", _key: key(), text: t, marks });
  };
  while ((m = re.exec(text))) {
    if (m[1]) push(m[1], ["strong"]);
    else if (m[2]) push(m[2], ["em"]);
    else if (m[3]) {
      // Les liens absolus vers le site deviennent relatifs (navigation interne)
      const href = m[4].startsWith(SITE) ? m[4].slice(SITE.length) || "/" : m[4];
      const k = key();
      markDefs.push({ _key: k, _type: "link", href, ...(/^https?:/.test(href) ? { openInNewTab: true } : {}) });
      push(m[3], [k]);
    } else push(m[5]);
  }
  return { children, markDefs };
}

const block = (style, text, extra = {}) => ({ _type: "block", _key: key(), style, ...inline(text), ...extra });

function mdToPt(md) {
  const blocks = [];
  let takeaways = [];
  const paras = md.split(/\r?\n\s*\r?\n/);
  for (const raw of paras) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim());
    if (!lines.length) continue;
    const first = lines[0];
    if (/^#{2,3} /.test(first)) {
      blocks.push(block(first.startsWith("### ") ? "h3" : "h2", first.replace(/^#+ /, "")));
    } else if (first.startsWith(">")) {
      const content = lines.map((l) => l.replace(/^>\s?/, ""));
      if (/^\*\*(L'essentiel|Key Takeaways)/i.test(content[0])) {
        // L'encadré « L'essentiel à retenir » devient un champ dédié
        takeaways = content.filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim());
      } else {
        blocks.push(block("blockquote", content.join(" ")));
      }
    } else if (/^- /.test(first)) {
      for (const l of lines) blocks.push(block("normal", l.replace(/^- /, ""), { listItem: "bullet", level: 1 }));
    } else if (/^\d+\. /.test(first)) {
      for (const l of lines) blocks.push(block("normal", l.replace(/^\d+\. /, ""), { listItem: "number", level: 1 }));
    } else {
      // Paragraphe éventuellement suivi d'une liste sans ligne vide
      const listStart = lines.findIndex((l) => /^(- |\d+\. )/.test(l));
      const text = (listStart < 0 ? lines : lines.slice(0, listStart)).join(" ");
      blocks.push(block("normal", text));
      if (listStart >= 0) {
        for (const l of lines.slice(listStart)) {
          const bullet = l.startsWith("- ");
          blocks.push(block("normal", l.replace(/^(- |\d+\. )/, ""), { listItem: bullet ? "bullet" : "number", level: 1 }));
        }
      }
    }
  }
  return { blocks, takeaways };
}

// ---------- Import ----------

const slugs = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, d.name, `${d.name}.md`)))
  .map((d) => d.name);

const client = dry ? null : createClient({ projectId, dataset, token, apiVersion: "2025-10-01", useCdn: false });
if (!dry && !token) {
  console.error("SANITY_API_WRITE_TOKEN manquant (jeton « Editor » créé sur sanity.io/manage > API > Tokens).");
  process.exit(1);
}

const docs = [];
for (const slug of slugs) {
  const dir = join(root, slug);
  const { data, body } = parseFrontmatter(readFileSync(join(dir, `${slug}.md`), "utf8"));
  const { blocks, takeaways } = mdToPt(body);
  const heroName = readdirSync(dir).find((f) => /^hero\.(jpe?g|png|webp)$/.test(f));
  let cover;
  if (heroName) {
    const ref = dry
      ? `image-DRY-${slug}`
      : (await client.assets.upload("image", createReadStream(join(dir, heroName)), { filename: `${slug}-${heroName}` }))._id;
    cover = { _type: "image", asset: { _type: "reference", _ref: ref }, alt: data.og_image_alt };
  }
  docs.push({
    _id: `post-${slug}`,
    _type: "post",
    title: data.title,
    slug: { _type: "slug", current: slug },
    publishedAt: data.date,
    ...(data.lastUpdated ? { updatedAt: data.lastUpdated } : {}),
    author: data.author,
    excerpt: data.excerpt,
    tags: data.tags,
    takeaways,
    cover,
    body: blocks,
    seo: { _type: "seo", metaTitle: data.meta_title || `${data.title} | Aude Naturo`, metaDescription: data.description },
  });
  console.log(`  ${slug} : ${blocks.length} blocs, ${takeaways.length} points clés`);
}

if (dry) {
  const out = fileURLToPath(new URL("./blog-preview.json", import.meta.url));
  writeFileSync(out, JSON.stringify(docs, null, 2));
  console.log(`Aperçu écrit dans ${out}`);
  process.exit(0);
}

const tx = client.transaction();
for (const d of docs) tx.createOrReplace(d);
await tx.commit({ visibility: "async" });

// Ajoute « Blog » au menu principal (avant « Tarifs ») s'il n'y est pas encore
const nav = await client.fetch(`*[_id == "siteSettings"][0].mainNav`);
if (nav && !nav.some((i) => i.link?.href === "/blog")) {
  const item = { _type: "navItem", _key: key(), label: "Blog", link: { _type: "link", type: "external", href: "/blog", openInNewTab: false } };
  const tarifs = nav.findIndex((i) => i.label === "Tarifs");
  const patch = client.patch("siteSettings");
  await (tarifs >= 0 ? patch.insert("before", `mainNav[${tarifs}]`, [item]) : patch.append("mainNav", [item])).commit();
  console.log("  « Blog » ajouté au menu principal");
}
console.log(`✔ ${docs.length} article(s) importé(s) dans ${projectId}/${dataset}`);
