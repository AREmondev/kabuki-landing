import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "অননুমোদিত।" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: "ফাইল পাওয়া যায়নি।" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type) || file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "শুধু ছোট ছবি আপলোড করা যাবে।" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch {
    return NextResponse.json({ error: "আপলোড হয়নি।" }, { status: 500 });
  }
}
