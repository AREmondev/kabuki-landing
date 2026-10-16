import { head, put } from "@vercel/blob";

export function blobEnabled() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function readBlobJson<T>(pathname: string): Promise<T | null> {
  try {
    const info = await head(pathname);
    const response = await fetch(`${info.url}?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function writeBlobJson(pathname: string, value: unknown) {
  await put(pathname, JSON.stringify(value, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function putBlobFile(pathname: string, file: File) {
  const result = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: file.type,
  });
  return result.url;
}
