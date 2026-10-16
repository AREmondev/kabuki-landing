import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/auth";
import { getCmsContent } from "@/lib/cms/store";
import { AdminEditor } from "@/components/admin/AdminEditor";

export const metadata = {
  title: "কন্টেন্ট প্যানেল",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminAuthenticated()) redirect("/admin/login");
  const content = await getCmsContent();
  return <AdminEditor initial={content} />;
}
