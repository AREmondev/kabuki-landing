import { faqCopy, faqs as defaultFaqs } from "@/lib/data/faq";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { CmsContent } from "@/lib/cms/types";

export function FAQ({ content }: { content?: CmsContent["faqs"] }) {
  const copy = content ?? { ...faqCopy, items: defaultFaqs };
  return (
    <Section id="faq" labelledBy="faq-heading">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="faq-heading"
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
          />
        </RevealOnScroll>
        <RevealOnScroll className="mt-10 md:mt-12 w-full">
          <Accordion items={copy.items} />
        </RevealOnScroll>
      </Container>
    </Section>
  );
}
