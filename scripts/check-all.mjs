// Final check: all home sections (ours) at PC + mobile
import { chromium } from "playwright";

const browser = await chromium.launch();
for (const t of [
  { label: "PC", w: 1280, h: 843 },
  { label: "Mobile", w: 375, h: 667 },
]) {
  const page = await browser.newPage({ viewport: { width: t.w, height: t.h } });
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(400);
  const d = await page.evaluate(() => {
    const secs = [...document.querySelectorAll("main section, section")].filter(
      (s) => s.getBoundingClientRect().height > 5,
    );
    return {
      pageH: Math.round(document.body.scrollHeight),
      sections: secs.map((s) => ({
        h: Math.round(s.getBoundingClientRect().height),
        top: Math.round(s.getBoundingClientRect().top + scrollY),
        label: s.textContent.trim().slice(0, 16),
      })),
    };
  });
  console.log(`=== ${t.label} === page ${d.pageH}px`);
  d.sections.forEach((s, i) =>
    console.log(`${i + 1}. top=${s.top} h=${s.h} | ${s.label}`),
  );
  await page.close();
}
await browser.close();
