import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { getDefaultCmsContent } from "@/lib/cms/defaults";
import type { HeroTemplate } from "@/lib/cms/types";

const templateIds: HeroTemplate[] = ["split", "full", "center", "top"];

export const metadata = {
  title: "Hero template preview",
  robots: { index: false, follow: false },
};

export default function PreviewPage({ params }: { params: { template: string } }) {
  const template = params.template as HeroTemplate;
  if (!templateIds.includes(template)) notFound();

  const content = getDefaultCmsContent();

  return (
    <div className="bg-navy-deep">
      <Hero content={{ ...content.hero, template }} />
    </div>
  );
}
