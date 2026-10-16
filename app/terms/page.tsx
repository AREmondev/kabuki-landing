import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "শর্তাবলি",
  description: "কাবুকি জাপানিজ ল্যাঙ্গুয়েজ অ্যাকাডেমির ব্যবহারের শর্তাবলি।",
};

export default function TermsPage() {
  return (
    <main id="main" className="section-space">
      <Container className="max-w-prose">
        <h1 className="font-display text-h2 text-navy">শর্তাবলি</h1>
        <p className="mt-6 text-ink-muted font-bengali">
          এই পাতাটি একটি স্থানধারক। এই ওয়েবসাইটের তথ্য ভাষা প্রশিক্ষণ ও জাপান নির্দেশনা
          বর্ণনা করে। এটি ভিসার নিশ্চয়তা নয়। বর্তমান শর্তাবলির জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>
      </Container>
    </main>
  );
}
