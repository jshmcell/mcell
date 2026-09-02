// audit-header.mjs — measure computed header styles on original + local, multiple widths
import { chromium } from "playwright";

const targets = [
  { name: "orig", url: "https://imweb3200977727.imweb.me/" },
  { name: "new", url: "http://localhost:3000/" },
];
const widths = [1440, 1280, 992, 768, 375];

const browser = await chromium.launch();

const probe = async (page) =>
  page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const pick = (el, props) => {
      if (!el) return null;
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const o = { rect: { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) } };
      for (const p of props) o[p] = s.getPropertyValue(p);
      return o;
    };
    const header = q("#doz_header_wrap") || q("header");
    const logo = q("#doz_header_wrap img") || q("header img");
    const navA = [...document.querySelectorAll("#doz_header .viewport-nav > li > a, header nav a")].find((a) => a.offsetParent);
    const dropA = q("#doz_header .dropdown-menu a");
    const searchBtn = q("#doz_header .search_btn a, header button[aria-label*='search']");
    const menuBtn = q(".icon_type_menu a, header button[aria-label='MENU']");
    return {
      headerBg: cs(header)?.backgroundColor,
      headerH: header?.getBoundingClientRect().height,
      headerPos: cs(header)?.position,
      headerZ: cs(header)?.zIndex,
      logo: pick(logo, ["width", "height"]),
      navLink: pick(navA, ["font-size", "color", "padding", "font-weight", "height"]),
      dropLink: pick(dropA, ["font-size", "color", "padding", "background-color"]),
      search: pick(searchBtn, ["font-size", "color", "background-color", "padding", "width", "height"]),
      menuBtn: pick(menuBtn, ["color", "font-size", "width", "height", "display"]),
      scrollY: window.scrollY,
    };
  });

const results = {};
for (const t of targets) {
  results[t.name] = {};
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    try {
      await page.goto(t.url, { waitUntil: "networkidle", timeout: 45000 });
      await page.waitForTimeout(1200);
      const top = await probe(page);
      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(1400);
      const scrolled = await probe(page);
      results[t.name][w] = { top, scrolled };
    } catch (e) {
      results[t.name][w] = { error: String(e).slice(0, 120) };
    }
    await page.close();
  }
}
await browser.close();
console.log(JSON.stringify(results, null, 1));