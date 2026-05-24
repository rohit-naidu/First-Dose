/**
 * Rebuilds the hero banner as true-color WebP + AVIF from the PNG master.
 * Run after replacing public/images/brand/hero-first-dose.png:
 *   node scripts/optimize-hero.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const input = path.join('public/images/brand/hero-first-dose.png');
const base = path.join('public/images/brand/hero-first-dose');

if (!fs.existsSync(input)) {
  console.error('Missing hero master:', input);
  process.exit(1);
}

await sharp(input)
  .rotate()
  .webp({ quality: 92, effort: 6, smartSubsample: true })
  .toFile(`${base}.webp`);

await sharp(input)
  .rotate()
  .avif({ quality: 78, effort: 6 })
  .toFile(`${base}.avif`);

for (const ext of ['webp', 'avif', 'png']) {
  const file = `${base}.${ext}`;
  if (fs.existsSync(file)) {
    console.log(`${ext}: ${(fs.statSync(file).size / 1024).toFixed(1)} KB`);
  }
}
