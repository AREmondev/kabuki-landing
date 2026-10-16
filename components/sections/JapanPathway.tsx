import { pathwayCopy, pathwaySteps } from "@/lib/data/pathway";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function JapanPathway() {
  return (
    <Section id="pathway" labelledBy="pathway-heading" className="bg-paper-warm">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="pathway-heading"
            eyebrow={pathwayCopy.eyebrow}
            title={pathwayCopy.title}
            description={pathwayCopy.description}
          />
        </RevealOnScroll>
        <ol className="mt-12 md:mt-14 grid lg:grid-cols-8 gap-0">
          {pathwaySteps.map((step, index) => (
            <TimelineStep
              key={step.number}
              number={step.number}
              title={step.title}
              isLast={index === pathwaySteps.length - 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  );
}
