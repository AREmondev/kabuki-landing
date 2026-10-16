import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "গোপনীয়তা",
  description: "কাবুকি জাপানিজ ল্যাঙ্গুয়েজ অ্যাকাডেমির গোপনীয়তা নীতি।",
};

export default function PrivacyPage() {
  return (
    <main id="main" className="section-space">
      <Container className="max-w-prose">
        <h1 className="font-display text-h2 text-navy">গোপনীয়তা</h1>
        <p className="mt-6 text-ink-muted font-bengali">
          এই পাতাটি একটি স্থানধারক। কাবুকি জাপানিজ ল্যাঙ্গুয়েজ অ্যাকাডেমি যোগাযোগ ফর্মের
          মাধ্যমে আপনার দেওয়া তথ্য সংগ্রহ করে, যাতে একজন কাউন্সেলর উত্তর দিতে পারেন।
          বর্তমান গোপনীয়তা নীতির জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>
      </Container>
    </main>
  );
}
