import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

function svg({ width, height, label, caption, dark = false }) {
  const bg = dark ? "#0B1F33" : "#F7F5F0";
  const line = dark ? "#1c334c" : "#E6E8EA";
  const ink = dark ? "#FCFBF8" : "#0B1F33";
  const muted = dark ? "#b7c0c8" : "#4A5568";
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="${line}" stroke-width="1"/>
  <circle cx="${Math.round(width * 0.18)}" cy="${Math.round(height * 0.22)}" r="6" fill="#C91F2B"/>
  <text x="48" y="${Math.round(height * 0.46)}" fill="${ink}" font-family="Georgia, serif" font-size="${Math.max(28, Math.round(width / 22))}">${label}</text>
  <text x="48" y="${Math.round(height * 0.46) + 36}" fill="${muted}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="16">${caption}</text>
  <text x="48" y="${height - 40}" fill="${muted}" font-family="Inter, Helvetica, Arial, sans-serif" font-size="12">Licensed photography pending · ${width}×${height}</text>
</svg>`;
}

const files = [
  ["hero/fuji.svg", svg({ width: 1600, height: 1000, label: "Mount Fuji", caption: "Hero slide placeholder", dark: true })],
  ["hero/classroom.svg", svg({ width: 1600, height: 1000, label: "Classroom", caption: "Hero slide placeholder" })],
  ["hero/street.svg", svg({ width: 1600, height: 1000, label: "Japan Street", caption: "Hero slide placeholder", dark: true })],
  ["hero/study.svg", svg({ width: 1600, height: 1000, label: "Study Desk", caption: "Hero slide placeholder" })],
  ["programs/language.svg", svg({ width: 1200, height: 900, label: "Language Course", caption: "4:3 programme placeholder" })],
  ["programs/student-visa.svg", svg({ width: 1200, height: 900, label: "Student Visa", caption: "4:3 programme placeholder" })],
  ["programs/ssw.svg", svg({ width: 1200, height: 900, label: "SSW", caption: "4:3 programme placeholder" })],
  ["programs/titp.svg", svg({ width: 1200, height: 900, label: "TITP", caption: "4:3 programme placeholder" })],
  ["programs/masters.svg", svg({ width: 1200, height: 900, label: "Master's Programme", caption: "4:3 programme placeholder" })],
  ["success/student-1.svg", svg({ width: 800, height: 1000, label: "Student", caption: "4:5 portrait placeholder" })],
  ["success/student-2.svg", svg({ width: 800, height: 1000, label: "Student", caption: "4:5 portrait placeholder" })],
  ["success/student-3.svg", svg({ width: 800, height: 1000, label: "Student", caption: "4:5 portrait placeholder" })],
  ["gallery/g1.svg", svg({ width: 1600, height: 1000, label: "Classroom", caption: "16:10 gallery placeholder" })],
  ["gallery/g2.svg", svg({ width: 800, height: 1000, label: "Portrait", caption: "4:5 gallery placeholder" })],
  ["gallery/g3.svg", svg({ width: 800, height: 1000, label: "Branch", caption: "4:5 gallery placeholder" })],
  ["gallery/g4.svg", svg({ width: 1600, height: 1000, label: "Materials", caption: "16:10 gallery placeholder" })],
  ["gallery/g5.svg", svg({ width: 1600, height: 1000, label: "Landscape", caption: "16:10 gallery placeholder", dark: true })],
  ["branches/fuji.svg", svg({ width: 800, height: 1000, label: "Fuji", caption: "Branch panel placeholder", dark: true })],
  ["og.svg", svg({ width: 1200, height: 630, label: "KABUKI", caption: "Japanese Language Academy · Bangladesh", dark: true })],
];

for (const [rel, content] of files) {
  const dest = join(root, rel);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, content);
}

console.log(`Wrote ${files.length} placeholders`);
