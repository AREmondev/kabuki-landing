import { results, resultsCopy } from "@/lib/data/results";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function RecentResults() {
  const verified = results.filter((item) => item.verified);
  if (!verified.length) return null;

  return (
    <Section labelledBy="results-heading">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="results-heading"
            eyebrow={resultsCopy.eyebrow}
            title={resultsCopy.title}
            description={resultsCopy.description}
          />
        </RevealOnScroll>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {verified.map((item) => (
            <StatCard key={item.id} value={item.value} label={item.label} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
