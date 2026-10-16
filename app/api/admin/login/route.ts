import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  passwordsMatch,
  sessionCookieOptions,
} from "@/lib/cms/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";
    if (!passwordsMatch(password)) {
      return NextResponse.json({ error: "পাসওয়ার্ড সঠিক নয়।" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createSessionToken(), sessionCookieOptions());
    return response;
  } catch {
    return NextResponse.json({ error: "লগইন করা যায়নি।" }, { status: 500 });
  }
}
