import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "kabuki_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "kabuki-admin-secret";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "kabuki-admin";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createSessionToken() {
  const payload = `ok.${Date.now() + MAX_AGE * 1000}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string) {
  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return false;
  const payload = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);
  const [ok, exp] = payload.split(".");
  if (ok !== "ok" || !exp || Number(exp) < Date.now()) return false;
  const expected = sign(payload);
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function passwordsMatch(input: string) {
  const expected = adminPassword();
  const left = Buffer.from(input);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return token ? verifySessionToken(token) : false;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  };
}
