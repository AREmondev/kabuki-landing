import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const photos = [
  {
    dest: "programs/language.jpg",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1400&h=1050&q=80",
  },
  {
    dest: "programs/student-visa.jpg",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&h=1050&q=80",
  },
  {
    dest: "programs/ssw.jpg",
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1400&h=1050&q=80",
  },
  {
    dest: "programs/titp.jpg",
    url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1400&h=1050&q=80",
  },
  {
    dest: "programs/masters.jpg",
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&h=1050&q=80",
  },
  {
    dest: "success/student-1.jpg",
    url: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&h=1125&q=80",
  },
  {
    dest: "success/student-2.jpg",
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=900&h=1125&q=80",
  },
  {
    dest: "success/student-3.jpg",
    url: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=900&h=1125&q=80",
  },
  {
    dest: "gallery/g1.jpg",
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&h=1000&q=80",
  },
  {
    dest: "gallery/g2.jpg",
    url: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=900&h=1125&q=80",
  },
  {
    dest: "gallery/g3.jpg",
    url: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=900&h=1125&q=80",
  },
  {
    dest: "gallery/g4.jpg",
    url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&h=1000&q=80",
  },
  {
    dest: "gallery/g5.jpg",
    url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1600&h=1000&q=80",
  },
  {
    dest: "branches/fuji.jpg",
    url: "https://images.unsplash.com/photo-1570457947342-9d1c0a1b3c3c?auto=format&fit=crop&w=900&h=1125&q=80",
  },
  {
    dest: "og.jpg",
    url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=1200&h=630&q=80",
  },
];

async function download(item) {
  const dest = join(root, item.dest);
  mkdirSync(dirname(dest), { recursive: true });
  const response = await fetch(item.url, {
    headers: { "User-Agent": "KabukiAcademySite/1.0" },
  });
  if (!response.ok) {
    throw new Error(`${item.dest}: ${response.status} ${item.url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(dest, buffer);
  console.log(`ok ${item.dest} (${buffer.length} bytes)`);
}

for (const photo of photos) {
  try {
    await download(photo);
  } catch (error) {
    console.error(String(error));
  }
}
