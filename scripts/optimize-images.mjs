/**
 * Compresses all public marketing images to WebP for fast Vercel delivery.
 * Run: npm run optimize:images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const brandDir = path.join('public/images/brand');

const targets = [
  { file: 'hero-first-dose-master.jpg', maxWidth: 3360, quality: 93, outputs: ['hero-first-dose'] },
  { file: 'glp-product-mockup.png', maxWidth: 900, quality: 88 },
  { file: 'biomarker-mockup.png', maxWidth: 900, quality: 88 },
  { file: 'gene-plan-mockup.png', maxWidth: 900, quality: 88 },
  { file: 'supplement-mockup.png', maxWidth: 900, quality: 88 },
  { file: 'gene-test-mockup.png', maxWidth: 900, quality: 88 },
  { file: 'products-mockup.png', maxWidth: 1200, quality: 88 },
  { file: 'first-dose-logo.png', maxWidth: 980, quality: 90 },
];

async function optimize({ file, maxWidth, quality, outputs }) {
  const input = path.join(brandDir, file);
  if (!fs.existsSync(input)) {
    console.log(`skip (missing): ${file}`);
    return;
  }

  const baseName = outputs?.[0] ?? path.parse(file).name;
  const webpOut = path.join(brandDir, `${baseName}.webp`);

  const info = await sharp(input)
    .rotate()
    .resize(maxWidth, null, { withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(webpOut);

  const kb = (fs.statSync(webpOut).size / 1024).toFixed(1);
  console.log(`${baseName}.webp: ${kb} KB (${info.width}x${info.height})`);
}

for (const target of targets) {
  await optimize(target);
}

// Hero AVIF (best size on modern browsers).
const heroMaster = path.join(brandDir, 'hero-first-dose-master.jpg');
if (fs.existsSync(heroMaster)) {
  await sharp(heroMaster)
    .rotate()
    .resize(3360, null, { withoutEnlargement: true, kernel: sharp.kernel.lanczos3 })
    .avif({ quality: 80, effort: 6 })
    .toFile(path.join(brandDir, 'hero-first-dose.avif'));
  console.log(
    `hero-first-dose.avif: ${(fs.statSync(path.join(brandDir, 'hero-first-dose.avif')).size / 1024).toFixed(1)} KB`,
  );
}
