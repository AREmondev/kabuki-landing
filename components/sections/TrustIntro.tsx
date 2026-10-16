import { trustCopy, trustBlocks } from "@/lib/data/trust";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function TrustIntro() {
  return (
    <Section labelledBy="trust-heading" className="!pb-0">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20 items-start">
          <RevealOnScroll className="lg:col-span-7">
            <SectionHeading
              id="trust-heading"
              eyebrow={trustCopy.eyebrow}
              title={trustCopy.title}
              description={trustCopy.description}
            />
          </RevealOnScroll>
          <RevealOnScroll className="lg:col-span-5">
            <div className="grid grid-cols-2 border-t border-l border-line">
              {trustBlocks.map((block) => (
                <div
                  key={block.id}
                  className="border-b border-r border-line p-5 md:p-7"
                >
                  <h3 className="font-display text-[1.05rem] leading-snug text-navy">
                    {block.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  );
}
