import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

const destinations = [
  'dubai',
  'bali',
  'vietnam',
  'singapore',
  'thailand',
  'malaysia',
  'africa',
  'cruise',
  'europe',
  'malaysia-kl',
];

async function optimizeImages() {
  console.log('Optimizing destination images...');

  for (const name of destinations) {
    const origPath = path.join(publicDir, `${name}.jpg`);
    if (!fs.existsSync(origPath)) {
      console.log(`Skipping ${name}: file not found at ${origPath}`);
      continue;
    }

    const img = sharp(origPath);
    const metadata = await img.metadata();
    console.log(`\nProcessing ${name} (original: ${metadata.width}x${metadata.height}, ${fs.statSync(origPath).size} bytes)...`);

    // 1. 800w WebP (for mobile)
    await sharp(origPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(publicDir, `${name}-800.webp`));

    // 2. 800w JPG (for mobile fallback)
    await sharp(origPath)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 75, progressive: true, mozjpeg: true })
      .toFile(path.join(publicDir, `${name}-800.jpg`));

    // 3. 1400w WebP (for desktop)
    await sharp(origPath)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(publicDir, `${name}-1400.webp`));

    // 4. 1400w JPG (for desktop fallback)
    await sharp(origPath)
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 78, progressive: true, mozjpeg: true })
      .toFile(path.join(publicDir, `${name}-1400.jpg`));

    // 5. Optimized standard webp fallback
    await sharp(origPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(publicDir, `${name}.webp`));

    // Print resulting sizes
    const s800w = fs.statSync(path.join(publicDir, `${name}-800.webp`)).size;
    const s800j = fs.statSync(path.join(publicDir, `${name}-800.jpg`)).size;
    const s1400w = fs.statSync(path.join(publicDir, `${name}-1400.webp`)).size;
    const s1400j = fs.statSync(path.join(publicDir, `${name}-1400.jpg`)).size;

    console.log(`  -800.webp: ${(s800w / 1024).toFixed(1)} KB`);
    console.log(`  -800.jpg:  ${(s800j / 1024).toFixed(1)} KB`);
    console.log(`  -1400.webp: ${(s1400w / 1024).toFixed(1)} KB`);
    console.log(`  -1400.jpg:  ${(s1400j / 1024).toFixed(1)} KB`);
  }

  // Optimize logos
  if (fs.existsSync(path.join(publicDir, 'og-image.jpg'))) {
    await sharp(path.join(publicDir, 'og-image.jpg'))
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 75, progressive: true, mozjpeg: true })
      .toFile(path.join(publicDir, 'og-image.jpg.tmp'));
    fs.renameSync(path.join(publicDir, 'og-image.jpg.tmp'), path.join(publicDir, 'og-image.jpg'));
    console.log(`og-image.jpg optimized: ${(fs.statSync(path.join(publicDir, 'og-image.jpg')).size / 1024).toFixed(1)} KB`);
  }

  console.log('\nAll images successfully optimized!');
}

optimizeImages().catch((err) => {
  console.error(err);
  process.exit(1);
});

