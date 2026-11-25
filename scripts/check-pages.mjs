const base = process.env.BASE_URL ?? 'http://localhost:3000';

const get = async (path) => {
  const response = await fetch(new URL(path, base));
  return { status: response.status, type: response.headers.get('content-type') ?? '', text: await response.text() };
};

const sitemap = await get('/sitemap.xml');
const paths = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const failures = [];
const titles = new Map();
const descriptions = new Map();

for (const path of paths) {
  const { status, text } = await get(path);
  const h1 = (text.match(/<h1[\s>]/g) ?? []).length;
  const title = text.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
  const description = text.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
  const canonical = text.match(/<link rel="canonical" href="(.*?)"/)?.[1] ?? '';
  const ld = (text.match(/application\/ld\+json/g) ?? []).length;
  const og = /property="og:image"/.test(text);
  const row = `${path.padEnd(42)} ${status} h1=${h1} ld=${ld} og=${og ? 'yes' : 'no'}`;
  console.log(row);
  if (status !== 200) failures.push(`${path}: status ${status}`);
  if (h1 !== 1) failures.push(`${path}: ${h1} h1 elements`);
  if (!title) failures.push(`${path}: missing title`);
  if (!description) failures.push(`${path}: missing description`);
  if (!canonical || new URL(canonical).pathname !== path) failures.push(`${path}: canonical "${canonical}"`);
  if (ld < 2) failures.push(`${path}: expected organisation and page JSON-LD`);
  if (!og) failures.push(`${path}: missing og:image`);
  if (titles.has(title)) failures.push(`${path}: title duplicates ${titles.get(title)}`);
  if (descriptions.has(description)) failures.push(`${path}: description duplicates ${descriptions.get(description)}`);
  titles.set(title, path);
  descriptions.set(description, path);
}

const design = await get('/design-system');
if (paths.includes('/design-system')) failures.push('design-system is in the sitemap');
if (!/name="robots" content="noindex/.test(design.text)) failures.push('design-system is not noindex');
const robots = await get('/robots.txt');
if (!/Sitemap:/.test(robots.text)) failures.push('robots.txt has no sitemap line');
const og = await get('/opengraph-image');
if (!og.type.startsWith('image/png')) failures.push('default og image is not a png');
const notFound = await get('/no-such-page');
if (notFound.status !== 404) failures.push(`unknown path returned ${notFound.status}`);

console.log(`\n${paths.length} pages checked`);
if (failures.length) {
  console.log(failures.join('\n'));
  process.exit(1);
}
console.log('page checks passed');
