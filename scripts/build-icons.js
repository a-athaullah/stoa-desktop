const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets');
const svgPath = path.join(assetsDir, 'stoa-icon.svg');

async function buildIcons() {
  // PNG sizes for various uses
  const sizes = [16, 32, 48, 64, 128, 256, 512];
  for (const size of sizes) {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(path.join(assetsDir, `icon-${size}.png`));
  }

  // Main 512x512 PNG used as app icon
  await sharp(svgPath)
    .resize(512, 512)
    .png()
    .toFile(path.join(assetsDir, 'stoa-icon.png'));

  console.log('Icons generated.');
}

buildIcons().catch(console.error);
