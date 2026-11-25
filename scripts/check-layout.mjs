// Layout check. Loads every page of a running server at three desktop widths and fails when text falls into a sliver
// (a p, h1, h2 or h3 in a column narrower than 320 px) or when an H1 or H2 wraps to more than three lines.
//
// Playwright is not a dependency of this project. Install it somewhere outside the project and point NODE_PATH at it:
//   NODE_PATH=/path/to/node_modules BASE_URL=http://localhost:3100 node scripts/check-layout.mjs
import { createRequire } from 'node:module';

const base = process.env.BASE_URL;
if (!base) {
  console.error('Set BASE_URL to the address of a running server.');
  process.exit(2);
}

let chromium;
try {
  const require = createRequire(import.meta.url);
  ({ chromium } = require('playwright'));
} catch {
  console.error('Playwright was not found. Install it outside the project and set NODE_PATH to its node_modules folder.');
  process.exit(2);
}

const widths = [1024, 1280, 1440];
const minWidth = 320;
const maxLines = 3;

const sitemap = await fetch(new URL('/sitemap.xml', base)).then((r) => r.text());
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const unique = [...new Set(paths)];

const browser = await chromium.launch();
const failures = [];
let checked = 0;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const path of unique) {
    await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' });
    const issues = await page.evaluate(
      ({ minWidth, maxLines }) => {
        const out = [];
        for (const el of document.querySelectorAll('main p, main h1, main h2, main h3')) {
          if (el.closest('[hidden], .sr-only')) continue;
          const box = el.getBoundingClientRect();
          if (box.width === 0 || box.height === 0) continue;
          const style = getComputedStyle(el);
          if (style.visibility === 'hidden' || style.display === 'none') continue;
          const label = `${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 40)}"`;
          // The column the text sits in: its own width, or its parent's content width when the element is shrink-wrapped.
          const parent = el.parentElement;
          const parentStyle = parent ? getComputedStyle(parent) : null;
          const column = parent && parentStyle
            ? parent.clientWidth - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight)
            : box.width;
          const effective = Math.max(box.width, column);
          if (effective < minWidth && (el.textContent || '').trim().length > 12) {
            out.push(`${label} sits in a ${Math.round(effective)} px column`);
          }
          if (el.tagName === 'H1' || el.tagName === 'H2') {
            const lines = Math.round(box.height / parseFloat(style.lineHeight));
            if (lines > maxLines) out.push(`${label} wraps to ${lines} lines`);
          }
        }
        return out;
      },
      { minWidth, maxLines },
    );
    checked += 1;
    for (const issue of issues) failures.push(`${path} @ ${width}: ${issue}`);
  }
  await page.close();
}

await browser.close();
console.log(`${checked} page and width combinations checked`);
if (failures.length) {
  for (const f of failures) console.error(f);
  console.error(`${failures.length} layout failure(s)`);
  process.exit(1);
}
console.log('layout checks passed');
