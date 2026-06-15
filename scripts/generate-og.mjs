// Generates public/og-image.jpg (1200×630) — the social-share preview card.
// Run with: node scripts/generate-og.mjs
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../public/og-image.jpg");

const BG = "#0f1418";
const CARD = "#141a1f";
const PRIMARY = "#20b2a6";
const FG = "#f0f2f5";
const MUTED = "#7a8491";
const BORDER = "#242b32";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG}"/>
      <stop offset="100%" stop-color="${CARD}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 L0 0 0 48" fill="none" stroke="${BORDER}" stroke-width="1" opacity="0.5"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- corner glow -->
  <circle cx="1080" cy="120" r="260" fill="${PRIMARY}" opacity="0.08"/>

  <!-- MJ badge -->
  <rect x="80" y="96" width="120" height="120" rx="28" fill="none" stroke="${PRIMARY}" stroke-width="3"/>
  <text x="140" y="176" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="${PRIMARY}" text-anchor="middle">MJ</text>

  <!-- name -->
  <text x="80" y="320" font-family="Arial, sans-serif" font-size="84" font-weight="700" fill="${FG}">Mohammad Jumran</text>

  <!-- title -->
  <text x="82" y="386" font-family="Arial, sans-serif" font-size="40" font-weight="600" fill="${PRIMARY}">System Administrator &amp; Data Security Specialist</text>

  <!-- subtitle -->
  <text x="82" y="446" font-family="Arial, sans-serif" font-size="28" font-weight="400" fill="${MUTED}">9 years  ·  Windows Server  ·  Linux  ·  Networking  ·  Cybersecurity</text>

  <!-- accent bar -->
  <rect x="82" y="496" width="220" height="6" rx="3" fill="${PRIMARY}"/>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(out);
console.log("Wrote", out);
