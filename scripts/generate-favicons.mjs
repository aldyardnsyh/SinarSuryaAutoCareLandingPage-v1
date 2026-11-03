// scripts/generate-favicons.mjs — rasterisasi public/favicon.svg menjadi
// set ikon lengkap untuk hasil pencarian Google (favicon.ico + PNG) dan PWA.
//
// Jalankan sekali dari root project:  node scripts/generate-favicons.mjs
// Hasil ditulis ke public/ dan di-commit bersama sumbernya.
//
// Catatan: favicon.ico dibangun manual (header ICO + PNG 16/32/48) memakai
// format PNG-in-ICO, format yang sama yang dihasilkan realfavicongenerator.
// Tidak butuh dependency tambahan, hanya sharp yang sudah ada via Astro.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svg = await readFile(path.join(root, 'public', 'favicon.svg'));
const publicDir = path.join(root, 'public');

// viewBox SVG = 64px, density 72 dianggap basisnya.
async function renderPng(size) {
  const density = Math.round((72 * size) / 64);
  return sharp(svg, { density })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// PNG dengan ukuran ≤ 256 diizinkan di dalam ICO (width/height muat 1 byte).
async function buildIco(sizes) {
  const pngs = await Promise.all(sizes.map((s) => renderPng(s)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = header.length + pngs.length * 16;
  const entries = pngs.map((png, i) => {
    const size = sizes[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palet warna (tidak dipakai)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs]);
}

// ICO dipakai Google/Bing sebagai fallback /favicon.ico.
await writeFile(path.join(publicDir, 'favicon.ico'), await buildIco([16, 32, 48]));

// PNG individual untuk <head> dan webmanifest.
for (const [name, size] of [
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await writeFile(path.join(publicDir, name), await renderPng(size));
}

console.log('Favicon selesai dibuat di public/: favicon.ico, favicon-32x32.png, apple-touch-icon.png, icon-192.png, icon-512.png');
