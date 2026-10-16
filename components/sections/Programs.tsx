import { programs as defaultPrograms, programsCopy } from "@/lib/data/programs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { CmsContent } from "@/lib/cms/types";

export function Programs({ content }: { content?: CmsContent["programs"] }) {
  const copy = content ?? { ...programsCopy, items: defaultPrograms };
  const programs = copy.items;

  return (
    <Section id="programs" labelledBy="programs-heading" className="bg-paper-warm">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="programs-heading"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </RevealOnScroll>
        <div className="mt-12 md:mt-14 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:grid md:grid-cols-6 md:overflow-visible md:pb-0 md:gap-6">
          {programs.map((program) => (
            <RevealOnScroll key={program.id} className="md:col-span-3 lg:col-span-2">
              <ProgramCard program={program} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </Section>
  );
}
