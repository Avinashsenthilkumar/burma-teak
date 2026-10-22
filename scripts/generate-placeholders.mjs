/**
 * Placeholder media generator.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Scans src/ for every /media/... image path referenced anywhere in the code,
 * and writes a real file to public/ for each one that does not yet exist.
 *
 * The output is abstract botanical artwork in the brand palette — no text, no
 * "placeholder" watermark — so the site looks composed before a single client
 * photograph has arrived. Each file is a genuine JPEG at a sensible size, so
 * next/image optimises it exactly as it will optimise the real thing.
 *
 * Existing files are never overwritten: drop a real photograph in at the same
 * path and re-running this script will leave it alone.
 *
 * Requires `sharp`:  npm i -D sharp
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');

/** Palette families, chosen by which folder the image lives in. */
const FAMILIES = {
  forest: ['#0B1A12', '#12261A', '#1D3B29', '#2F5A41'],
  canopy: ['#12261A', '#2F5A41', '#4A7C59', '#6E9B74'],
  teak: ['#3A2415', '#7B4F2A', '#A9703F', '#C99B6E'],
  earth: ['#2A1F12', '#5C462C', '#8A6B42', '#B99A68'],
  mist: ['#1D3B29', '#44624E', '#8FA894', '#D8DCD2'],
};

function familyFor(relPath) {
  if (/teak|growth|product|timber/.test(relPath)) return 'teak';
  if (/earth|land|farming|soil/.test(relPath)) return 'earth';
  if (/nursery|lush|sustainab/.test(relPath)) return 'canopy';
  if (/hero|poster|company|team|event/.test(relPath)) return 'mist';
  return 'forest';
}

/** Deterministic pseudo-random stream seeded by the file path. */
function seeded(relPath) {
  const hash = createHash('sha256').update(relPath).digest();
  let i = 0;
  return () => {
    const value = hash[i % hash.length] + (hash[(i + 7) % hash.length] << 8);
    i += 1;
    return (value % 10000) / 10000;
  };
}

/** Dimensions by role — wide for heroes, portrait for plants, etc. */
function sizeFor(relPath) {
  if (/hero|poster|cta|-main|earth|lush/.test(relPath)) return [1920, 1080];
  if (/growth-|teak-leaf|teak-bark|sapling/.test(relPath)) return [1000, 1333];
  if (/gallery/.test(relPath)) return [1200, 1200];
  return [1600, 1067];
}

function buildSvg(relPath, width, height) {
  const rand = seeded(relPath);
  const palette = FAMILIES[familyFor(relPath)];
  const [deepest, deep, mid, light] = palette;

  // Layered ridgelines, back to front, each a smooth closed path.
  const layers = [];
  const layerCount = 4;
  for (let l = 0; l < layerCount; l += 1) {
    const t = l / (layerCount - 1);
    const baseY = height * (0.42 + t * 0.34);
    const amplitude = height * (0.1 - t * 0.016);
    const points = [];
    const steps = 7;
    for (let s = 0; s <= steps; s += 1) {
      const x = (width / steps) * s;
      const y = baseY + Math.sin(s * 1.1 + l * 2.3 + rand() * 2) * amplitude - rand() * amplitude * 0.4;
      points.push([x, y]);
    }
    const d =
      `M ${-10} ${height + 10} L ${points[0][0]} ${points[0][1].toFixed(1)} ` +
      points
        .slice(1)
        .map(([x, y], idx) => {
          const [px, py] = points[idx];
          const cx = (px + x) / 2;
          return `C ${cx.toFixed(1)} ${py.toFixed(1)} ${cx.toFixed(1)} ${y.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(' ') +
      ` L ${width + 10} ${height + 10} Z`;

    // Foreground ridges are the darkest, as real silhouettes are — this also
    // keeps the lower third of every image safe for light text.
    const colour = [light, mid, deep, deepest][l];
    const opacity = (0.3 + l * 0.18).toFixed(2);
    layers.push(`<path d="${d}" fill="${colour}" opacity="${opacity}"/>`);
  }

  // A few upright stems to read as a plantation rather than hills.
  const stems = [];
  const stemCount = 5 + Math.floor(rand() * 4);
  for (let s = 0; s < stemCount; s += 1) {
    const x = width * (0.06 + rand() * 0.88);
    const topY = height * (0.2 + rand() * 0.3);
    const w = Math.max(1.5, width * 0.0022 * (0.6 + rand()));
    stems.push(
      `<rect x="${x.toFixed(1)}" y="${topY.toFixed(1)}" width="${w.toFixed(2)}" height="${(height - topY).toFixed(1)}" fill="${deepest}" opacity="${(0.18 + rand() * 0.2).toFixed(2)}"/>`,
    );
    // canopy blob
    const r = width * (0.022 + rand() * 0.03);
    stems.push(
      `<ellipse cx="${x.toFixed(1)}" cy="${topY.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * 0.72).toFixed(1)}" fill="${mid}" opacity="${(0.2 + rand() * 0.22).toFixed(2)}"/>`,
    );
  }

  const lightX = (20 + rand() * 60).toFixed(0);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0%" stop-color="${deepest}"/>
      <stop offset="55%" stop-color="${deep}"/>
      <stop offset="100%" stop-color="${mid}"/>
    </linearGradient>
    <radialGradient id="sun" cx="${lightX}%" cy="18%" r="62%">
      <stop offset="0%" stop-color="${light}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${light}" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.22"/>
      <stop offset="45%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.34"/>
    </linearGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#sky)"/>
  <rect width="${width}" height="${height}" fill="url(#sun)"/>
  ${stems.join('\n  ')}
  ${layers.join('\n  ')}
  <rect width="${width}" height="${height}" fill="url(#vignette)"/>
  <rect width="${width}" height="${height}" filter="url(#grain)" opacity="0.05"/>
</svg>`;
}

async function collectSourceFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectSourceFiles(full)));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const files = await collectSourceFiles(SRC);
  const referenced = new Set();

  for (const file of files) {
    const text = await readFile(file, 'utf8');
    for (const match of text.matchAll(/['"`](\/media\/[^'"`]+\.(?:jpg|jpeg|png))['"`]/g)) {
      referenced.add(match[1]);
    }
  }

  const paths = [...referenced].sort();
  let written = 0;
  let skipped = 0;

  for (const relPath of paths) {
    const target = path.join(PUBLIC, relPath);
    if (await exists(target)) {
      skipped += 1;
      continue;
    }

    await mkdir(path.dirname(target), { recursive: true });
    const [width, height] = sizeFor(relPath);
    const svg = buildSvg(relPath, width, height);

    const pipeline = sharp(Buffer.from(svg));
    if (target.endsWith('.png')) {
      await pipeline.png({ quality: 90 }).toFile(target);
    } else {
      await pipeline.jpeg({ quality: 78, mozjpeg: true }).toFile(target);
    }
    written += 1;
  }

  console.log(
    `Placeholders: ${written} written, ${skipped} already present (${paths.length} referenced).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
