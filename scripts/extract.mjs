// Phase 0 extractor: crawl original site, save rendered HTML + download media.
// Run: node scripts/extract.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";

const BASE = "https://imweb3200977727.imweb.me";
const OUT = path.resolve("extract");

const PAGES = [
  ["/", "home"],
  ["/33", "about-us"],
  ["/34", "history"],
  ["/35", "certifications"],
  ["/36", "contact"],
  ["/31", "mcell"],
  ["/37", "shop"],
  ["/39", "portfolio"],
  ["/40", "catalog"],
  ["/45", "notices"],
  ["/46", "updates"],
  ["/44", "partnership"],
];

const seen = new Set();
const assets = new Map(); // url -> dest rel path

function assetPath(url) {
  if (assets.has(url)) return assets.get(url);
  const u = new URL(url.replace(/^['"]|['"]$/g, ""));
  const name = path.basename(u.pathname);
  const ext = path.extname(name).toLowerCase();
  let kind = "img";
  if (ext === ".pdf" || ext === ".hwp" || ext === ".zip" || ext === ".docx") kind = "pdf";
  if (ext === ".mp4" || ext === ".webm") kind = "video";
  const rel = path.join("assets", kind, name);
  assets.set(url, rel);
  return rel;
}

async function download(url) {
  const clean = url.replace(/^['"]|['"]$/g, "").trim();
  if (!clean.startsWith("http")) return null;
  if (seen.has(clean)) return assets.get(clean);
  seen.add(clean);
  const rel = assetPath(clean);
  const dest = path.join(OUT, "public", rel);
  await mkdir(path.dirname(dest), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
    console.log("ok ", rel);
    return rel;
  } catch (e) {
    console.error("FAIL", url, e.message);
    return null;
  }
}

const IMG_RE = /(?:src|href|data-src|data-bg)="(https:\/\/cdn\.imweb\.me\/[^"]+\.(?:png|jpe?g|gif|webp|svg|pdf))"/gi;
const BG_RE = /url\((['"]?)(https:\/\/cdn\.imweb\.me\/[^)'"]+)\1\)/gi;

for (const [route, name] of PAGES) {
  const res = await fetch(BASE + route, { headers: { "User-Agent": "Mozilla/5.0" } });
  const html = await res.text();
  await mkdir(path.join(OUT, "html"), { recursive: true });
  await writeFile(path.join(OUT, "html", `${name}.html`), html);
  console.log(`page ${route} -> ${name}.html (${html.length}b)`);
  for (const m of html.matchAll(IMG_RE)) await download(m[1]);
  for (const m of html.matchAll(BG_RE)) await download(m[1]);
}

// custom stylesheet (site-specific overrides)
const cm = await fetch(BASE + "/css/custom.cm");
await writeFile(path.join(OUT, "custom.cm.css"), await cm.text());
console.log("custom.cm.css saved");

// summary
const lines = [...assets.entries()].map(([url, rel]) => `${rel}\t${url}`);
await writeFile(path.join(OUT, "assets-map.txt"), lines.sort().join("\n"));
console.log(`\ntotal assets: ${assets.size}`);