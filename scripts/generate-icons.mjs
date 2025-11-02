import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_IMAGE = path.join(__dirname, '../public/images/logo_apk.png');
const OUTPUT_DIR = path.join(__dirname, '../public/icons');
const SIZES = [192, 256, 384, 512];

async function generateIcons() {
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`[v0] Created directory: ${OUTPUT_DIR}`);
    }

    if (!fs.existsSync(SOURCE_IMAGE)) {
      throw new Error(`Source image not found: ${SOURCE_IMAGE}`);
    }

    console.log('[v0] Starting icon generation...');
    console.log(`[v0] Source image: ${SOURCE_IMAGE}`);

    for (const size of SIZES) {
      const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);
      
      await sharp(SOURCE_IMAGE)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toFile(outputPath);

      console.log(`[v0] ✓ Generated: icon-${size}x${size}.png`);
    }

    console.log('[v0] ✅ Icon generation completed successfully!');
    console.log(`[v0] Icons are now available in: /public/icons/`);
  } catch (error) {
    console.error('[v0] ❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
