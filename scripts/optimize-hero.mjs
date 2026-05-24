/**
 * Rebuilds hero WebP + AVIF from public/images/brand/hero-first-dose-master.jpg
 * Run: npm run optimize:hero
 *
 * No aggressive crops — keeps the full product lineup visible.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const input = path.join('public/images/brand/hero-first-dose-master.jpg');
const base = path.join('public/images/brand/hero-first-dose');
const MAX_WIDTH = 2048;

if (!fs.existsSync(input)) {
  console.error('Missing hero master:', input);
  process.exit(1);
}

const meta = await sharp(input).metadata();
console.log(`Master: ${meta.width}x${meta.height}`);

function heroPipeline() {
  return sharp(input)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: false, kernel: sharp.kernel.lanczos3 });
}

await heroPipeline()
  .webp({ quality: 92, effort: 6, smartSubsample: true })
  .toFile(`${base}.webp`);

await heroPipeline()
  .avif({ quality: 78, effort: 6 })
  .toFile(`${base}.avif`);

for (const ext of ['webp', 'avif']) {
  const file = `${base}.${ext}`;
  const info = await sharp(file).metadata();
  console.log(`${ext}: ${(fs.statSync(file).size / 1024).toFixed(1)} KB (${info.width}x${info.height})`);
}
