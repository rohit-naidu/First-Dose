/**
 * Rebuilds hero WebP + AVIF from the high-res JPG master.
 * Place the latest master at public/images/brand/hero-first-dose-master.jpg
 * then run: npm run optimize:hero
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const input = path.join('public/images/brand/hero-first-dose-master.jpg');
const base = path.join('public/images/brand/hero-first-dose');

// 3360px = sharp on 2x retina for a ~1180px-wide hero, without shipping the full 5600px file.
const MAX_WIDTH = 3360;

if (!fs.existsSync(input)) {
  console.error('Missing hero master:', input);
  process.exit(1);
}

const meta = await sharp(input).metadata();
console.log(`Master: ${meta.width}x${meta.height}`);

await sharp(input)
  .rotate()
  .resize(MAX_WIDTH, null, { withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
  .webp({ quality: 93, effort: 6, smartSubsample: true })
  .toFile(`${base}.webp`);

await sharp(input)
  .rotate()
  .resize(MAX_WIDTH, null, { withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
  .avif({ quality: 82, effort: 6 })
  .toFile(`${base}.avif`);

for (const ext of ['webp', 'avif']) {
  const file = `${base}.${ext}`;
  const info = await sharp(file).metadata();
  console.log(`${ext}: ${(fs.statSync(file).size / 1024).toFixed(1)} KB (${info.width}x${info.height})`);
}
