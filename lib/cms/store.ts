import { promises as fs } from "fs";
import path from "path";
import { blobEnabled, readBlobJson, writeBlobJson } from "./blob";
import { getDefaultCmsContent } from "./defaults";
import type { CmsContent } from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "cms.json");
const BLOB_PATH = "cms/content.json";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeContent(raw: unknown): CmsContent {
  const defaults = getDefaultCmsContent();
  if (!isRecord(raw) || !isRecord(raw.hero)) return defaults;
  return {
    hero: { ...defaults.hero, ...raw.hero },
    programs: isRecord(raw.programs)
      ? { ...defaults.programs, ...raw.programs }
      : defaults.programs,
    gallery: isRecord(raw.gallery)
      ? { ...defaults.gallery, ...raw.gallery }
      : defaults.gallery,
    faqs: isRecord(raw.faqs) ? { ...defaults.faqs, ...raw.faqs } : defaults.faqs,
    branches: isRecord(raw.branches)
      ? { ...defaults.branches, ...raw.branches }
      : defaults.branches,
    contact: isRecord(raw.contact)
      ? { ...defaults.contact, ...raw.contact }
      : defaults.contact,
  } as CmsContent;
}

export async function getCmsContent(): Promise<CmsContent> {
  if (blobEnabled()) {
    const fromBlob = await readBlobJson<unknown>(BLOB_PATH);
    if (fromBlob) return mergeContent(fromBlob);
  }

  try {
    const raw = await fs.readFile(DATA_PATH, "utf8");
    return mergeContent(JSON.parse(raw));
  } catch {
    return getDefaultCmsContent();
  }
}

export async function saveCmsContent(content: CmsContent) {
  if (blobEnabled()) {
    await writeBlobJson(BLOB_PATH, content);
    return;
  }

  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}
