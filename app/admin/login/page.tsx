import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/layout/Logo";

export const metadata = {
  title: "অ্যাডমিন লগইন",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (isAdminAuthenticated()) redirect("/admin");

  return (
    <main className="min-h-dvh bg-paper-warm flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-card border border-line bg-paper p-8 shadow-navy">
        <Logo />
        <h1 className="mt-6 font-display text-[1.6rem] text-navy">কন্টেন্ট প্যানেল</h1>
        <p className="mt-2 text-[14px] text-ink-muted">সাইটের লেখা ও ছবি সম্পাদনা করতে লগইন করুন।</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
