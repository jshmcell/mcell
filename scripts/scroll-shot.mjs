// scroll-shot.mjs — capture viewport screenshots at scroll positions via playwright
import { chromium } from "playwright";

const [url, out, positions] = process.argv.slice(2);
const stops = (positions || "0,1200,2200,3000,3800,4600").split(",").map(Number);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 843 } });
await page.goto(url, { waitUntil: "networkidle" });
for (let i = 0; i < stops.length; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), stops[i]);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `${out}-${i}.png` });
}
await browser.close();
console.log("done");