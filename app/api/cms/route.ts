import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { cmsContentSchema } from "@/lib/cms/schema";
import { getCmsContent, saveCmsContent } from "@/lib/cms/store";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "অননুমোদিত।" }, { status: 401 });
  }
  const content = await getCmsContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "অননুমোদিত।" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = cmsContentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "তথ্য সঠিক নয়।", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    await saveCmsContent(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("CMS save failed:", error);
    return NextResponse.json(
      {
        error: "সংরক্ষণ করা যায়নি।",
        detail: error instanceof Error ? error.message : "unknown error",
      },
      { status: 500 },
    );
  }
}
