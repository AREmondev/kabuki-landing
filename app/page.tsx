import { Hero } from "@/components/sections/Hero";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { Programs } from "@/components/sections/Programs";
import { JapanPathway } from "@/components/sections/JapanPathway";
import { WhyKabuki } from "@/components/sections/WhyKabuki";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { RecentResults } from "@/components/sections/RecentResults";
import { Gallery } from "@/components/sections/Gallery";
import { Branches } from "@/components/sections/Branches";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { getCmsContent } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cms = await getCmsContent();

  return (
    <main id="main">
      <Hero content={cms.hero} />
      <TrustIntro />
      <Programs content={cms.programs} />
      <JapanPathway />
      <WhyKabuki />
      <SuccessStories />
      <RecentResults />
      <Gallery content={cms.gallery} />
      <Branches content={cms.branches} />
      <Contact content={cms.contact} />
      <FAQ content={cms.faqs} />
    </main>
  );
}
