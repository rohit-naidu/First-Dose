/**
 * Compresses all public marketing images to WebP for fast Vercel delivery.
 * Run: npm run optimize:images
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const brandDir = path.join('public/images/brand');
const HERO_CROP_TOP_RATIO = 0.06;
const HERO_MAX_WIDTH = 3360;

const targets = [
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

async function optimizeHero() {
  const input = path.join(brandDir, 'hero-first-dose-master.jpg');
  const base = path.join(brandDir, 'hero-first-dose');

  if (!fs.existsSync(input)) {
    console.log('skip (missing): hero-first-dose-master.jpg');
    return;
  }

  const meta = await sharp(input).metadata();
  const cropTop = Math.round(meta.height * HERO_CROP_TOP_RATIO);
  const croppedHeight = meta.height - cropTop;

  function heroPipeline() {
    return sharp(input)
      .rotate()
      .extract({ left: 0, top: cropTop, width: meta.width, height: croppedHeight })
      .resize(HERO_MAX_WIDTH, null, { withoutEnlargement: true, kernel: sharp.kernel.lanczos3 });
  }

  const webpInfo = await heroPipeline()
    .webp({ quality: 93, effort: 6, smartSubsample: true })
    .toFile(`${base}.webp`);

  await heroPipeline()
    .avif({ quality: 80, effort: 6 })
    .toFile(`${base}.avif`);

  console.log(
    `hero-first-dose.webp: ${(fs.statSync(`${base}.webp`).size / 1024).toFixed(1)} KB (${webpInfo.width}x${webpInfo.height})`,
  );
  console.log(`hero-first-dose.avif: ${(fs.statSync(`${base}.avif`).size / 1024).toFixed(1)} KB`);
}

await optimizeHero();
