import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contactSchema";

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
const maxHits = Number(process.env.RATE_LIMIT_MAX ?? 5);
const hits = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = hits.get(ip);
  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  current.count += 1;
  return current.count > maxHits;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "অনুরোধ অনেক বেশি হয়েছে।" }, { status: 429 });
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "ফর্মের তথ্য সঠিক নয়।", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };

    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "জিজ্ঞাসা পাঠানো যায়নি।" }, { status: 500 });
  }
}
