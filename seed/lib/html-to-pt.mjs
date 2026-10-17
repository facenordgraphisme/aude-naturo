// Convertit le HTML simple exporté de l'ancien site (Duda) en Portable Text.
// Gère : p, h1-h4, ul/ol > li, strong/b, em/i, u, a[href], br, et la couleur verte (<g>…</g>).

let keyCounter = 0;
export const key = () => `k${(++keyCounter).toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };
const decode = (s) => s.replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? (e.startsWith("#") ? String.fromCodePoint(Number(e.slice(1))) : m));

const MARK = { strong: "strong", b: "strong", em: "em", i: "em", u: "underline", g: "green" };

function inline(html) {
  const children = [];
  const markDefs = [];
  const stack = [];
  const re = /<(\/?)(strong|b|em|i|u|g|a)\b([^>]*)>|<br\s*\/?>|([^<]+)|<[^>]+>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].toLowerCase().startsWith("<br")) {
      children.push({ text: "\n", marks: [...stack] });
    } else if (m[4] !== undefined) {
      children.push({ text: decode(m[4]).replace(/\s+/g, " "), marks: [...stack] });
    } else if (m[2]) {
      const tag = m[2].toLowerCase();
      if (m[1]) {
        // fermeture : on retire la dernière marque correspondante
        const target = tag === "a" ? stack.findLast((s) => s.startsWith("lnk")) : MARK[tag];
        const idx = stack.lastIndexOf(target);
        if (idx >= 0) stack.splice(idx, 1);
      } else if (tag === "a") {
        const href = (m[3].match(/href="([^"]*)"/) || [])[1] || "";
        const blank = /target="_blank"/.test(m[3]);
        const k = `lnk${key()}`;
        markDefs.push({ _key: k, _type: "link", href: decode(href).replace(/\s/g, ""), ...(blank ? { openInNewTab: true } : {}) });
        stack.push(k);
      } else {
        stack.push(MARK[tag]);
      }
    }
  }
  // Fusion des segments consécutifs ayant les mêmes marques
  const merged = [];
  for (const c of children) {
    const prev = merged[merged.length - 1];
    if (prev && prev.marks.join() === c.marks.join()) prev.text += c.text;
    else merged.push({ ...c });
  }
  // Nettoyage des espaces autour des retours à la ligne et en bord de bloc
  for (const c of merged) c.text = c.text.replace(/ *\n */g, "\n");
  if (merged.length) {
    merged[0].text = merged[0].text.replace(/^\s+/, "");
    merged[merged.length - 1].text = merged[merged.length - 1].text.replace(/\s+$/, "");
  }
  const text = merged.map((c) => c.text).join("");
  const spans = merged
    .filter((c) => c.text.length)
    .map((c) => ({ _type: "span", _key: key(), text: c.text, marks: c.marks.filter(Boolean) }));
  const usedDefs = markDefs.filter((d) => spans.some((s) => s.marks.includes(d._key)));
  return { spans: spans.length ? spans : [{ _type: "span", _key: key(), text: "", marks: [] }], markDefs: usedDefs, empty: !text.trim() };
}

const block = (style, html, extra = {}) => {
  const { spans, markDefs } = inline(html);
  return { _type: "block", _key: key(), style, markDefs, children: spans, ...extra };
};

export function htmlToPt(html) {
  const blocks = [];
  const re = /<(p|h1|h2|h3|h4|ul|ol|div)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(html))) {
    const tag = m[1].toLowerCase();
    if (tag === "ul" || tag === "ol") {
      const items = [...m[2].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)];
      for (const li of items) blocks.push(block("normal", li[1], { listItem: tag === "ul" ? "bullet" : "number", level: 1 }));
    } else {
      blocks.push(block(tag === "div" ? "normal" : tag === "p" ? "normal" : tag, m[2]));
    }
  }
  // Supprime les paragraphes vides en fin de texte
  while (blocks.length && isEmpty(blocks[blocks.length - 1])) blocks.pop();
  return blocks;
}

export const isEmpty = (b) => b.style === "normal" && !b.listItem && b.children.every((c) => !c.text.trim());

/** Texte brut d'un fragment HTML (titres) — les <br> deviennent des retours à la ligne */
export function htmlToText(html) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(h\d|p)>\s*<(h\d|p)[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .trim();
}
