import Image from "next/image";
import { branches as defaultBranches, branchesCopy } from "@/lib/data/branches";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BranchCard } from "@/components/ui/BranchCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { CmsContent } from "@/lib/cms/types";

export function Branches({ content }: { content?: CmsContent["branches"] }) {
  const copy = content ?? { ...branchesCopy, items: defaultBranches };
  const branches = copy.items;

  return (
    <Section id="branches" labelledBy="branches-heading">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="branches-heading"
            eyebrow={copy.eyebrow}
            title={copy.title}
          />
        </RevealOnScroll>
        <div className="mt-12 md:mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {branches.map((branch) => (
            <RevealOnScroll key={branch.id}>
              <BranchCard branch={branch} />
            </RevealOnScroll>
          ))}
          <RevealOnScroll>
            <div className="relative min-h-[260px] overflow-hidden rounded-card h-full">
              <Image
                src="/images/branches/fuji.jpg"
                alt="Mount Fuji across still water"
                fill
                className="object-cover"
                sizes="25vw"
              />
              <span className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-kabuki text-[11px] font-medium text-white">
                {branchesCopy.fujiCaption}
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
