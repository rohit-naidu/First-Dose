/**
 * Rebuilds hero WebP + AVIF from the upscaled banner master.
 * Place the latest master at public/images/brand/hero-first-dose-master.jpg
 * then run: npm run optimize:hero
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const input = path.join('public/images/brand/hero-first-dose-master.jpg');
const base = path.join('public/images/brand/hero-first-dose');

// Trim a thin white strip at the top of the master photo only.
const CROP_TOP_RATIO = 0.06;
const MAX_WIDTH = 3360;

if (!fs.existsSync(input)) {
  console.error('Missing hero master:', input);
  process.exit(1);
}

const meta = await sharp(input).metadata();
const cropTop = Math.round(meta.height * CROP_TOP_RATIO);
const croppedHeight = meta.height - cropTop;

console.log(`Master: ${meta.width}x${meta.height}, cropping ${cropTop}px from top`);

function heroPipeline() {
  return sharp(input)
    .rotate()
    .extract({ left: 0, top: cropTop, width: meta.width, height: croppedHeight })
    .resize(MAX_WIDTH, null, { withoutEnlargement: true, kernel: sharp.kernel.lanczos3 });
}

await heroPipeline()
  .webp({ quality: 93, effort: 6, smartSubsample: true })
  .toFile(`${base}.webp`);

await heroPipeline()
  .avif({ quality: 80, effort: 6 })
  .toFile(`${base}.avif`);

for (const ext of ['webp', 'avif']) {
  const file = `${base}.${ext}`;
  const info = await sharp(file).metadata();
  console.log(`${ext}: ${(fs.statSync(file).size / 1024).toFixed(1)} KB (${info.width}x${info.height})`);
}
