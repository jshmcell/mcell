// QA helper: measure sections (by text) of a page at PC + mobile widths.
// usage: node scripts/measure-sections.mjs [url]
import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000/";
const targets = [
  { label: "PC 1280x843", w: 1280, h: 843 },
  { label: "Mobile 375x667", w: 375, h: 667 },
];

const browser = await chromium.launch();
for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: t.w, height: t.h } });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const data = await page.evaluate(() => {
    const sections = [
      ...document.querySelectorAll('section, div[id^="s2025"]'),
    ];
    const prod = sections.find((s) => s.textContent.includes("자체 생산 설비"));
    const heat = sections.find((s) =>
      s.textContent.includes("HEAT FLEX 기술을"),
    );
    const out = {};
    for (const [key, s] of [
      ["production", prod],
      ["heatFlex", heat],
    ]) {
      if (!s) {
        out[key] = null;
        continue;
      }
      const layout = (el) => {
        let l = 0,
          tp = 0,
          n = el;
        while (n && n !== document.body) {
          l += n.offsetLeft;
          tp += n.offsetTop;
          n = n.offsetParent;
        }
        return { l: Math.round(l), top: Math.round(tp + scrollY) };
      };
      const h2 = s.querySelector("h2");
      const firstP = s.querySelector("p");
      const cardBox = s.querySelector(
        ".rounded-\\[10px\\], .bg-\\[\\#fafafa\\]",
      );
      const btn = s.querySelector("a");
      out[key] = {
        sectionH: Math.round(s.getBoundingClientRect().height),
        sectionTop: Math.round(s.getBoundingClientRect().top + scrollY),
        h2: h2
          ? {
              ...layout(h2),
              fs: getComputedStyle(h2).fontSize,
              ta: getComputedStyle(h2).textAlign,
            }
          : null,
        firstP: firstP
          ? {
              ...layout(firstP),
              fs: getComputedStyle(firstP).fontSize,
              lh: getComputedStyle(firstP).lineHeight,
            }
          : null,
        cardBox: cardBox
          ? {
              w: Math.round(cardBox.getBoundingClientRect().width),
              h: Math.round(cardBox.getBoundingClientRect().height),
              radius: getComputedStyle(cardBox).borderRadius,
              bg: getComputedStyle(cardBox).backgroundColor,
            }
          : null,
        firstImg: (() => {
          const i = s.querySelector("img");
          return i
            ? {
                w: Math.round(i.getBoundingClientRect().width),
                h: Math.round(i.getBoundingClientRect().height),
              }
            : null;
        })(),
        btn: btn
          ? {
              ...layout(btn),
              w: Math.round(btn.getBoundingClientRect().width),
              h: Math.round(btn.getBoundingClientRect().height),
              ta: getComputedStyle(btn.parentElement).justifyContent,
            }
          : null,
        bgImg: (() => {
          const d = s.querySelector("div");
          return d ? getComputedStyle(d).backgroundImage.slice(0, 60) : null;
        })(),
        overlayBg: (() => {
          const d = s.querySelectorAll(":scope > div")[1];
          return d ? getComputedStyle(d).backgroundColor : null;
        })(),
      };
    }
    return out;
  });
  console.log(`=== ${t.label} ===`);
  console.log(JSON.stringify(data, null, 1));
  await page.close();
}
await browser.close();
