import {
  BookOpen,
  Compass,
  MapPin,
  MessagesSquare,
  Plane,
  Users,
  type LucideIcon,
} from "lucide-react";
import { benefits, whyKabukiCopy } from "@/lib/data/benefits";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const icons: Record<string, LucideIcon> = {
  BookOpen,
  Compass,
  MessagesSquare,
  Users,
  MapPin,
  Plane,
};

export function WhyKabuki() {
  return (
    <Section id="why-kabuki" labelledBy="why-heading">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="why-heading"
            eyebrow={whyKabukiCopy.eyebrow}
            title={whyKabukiCopy.title}
            description={whyKabukiCopy.description}
          />
        </RevealOnScroll>
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.id}>
                <RevealOnScroll>
                  {Icon ? (
                    <Icon className="size-5 text-kabuki" strokeWidth={1.5} aria-hidden />
                  ) : null}
                  <h3 className="mt-4 font-display text-[1.25rem] leading-snug text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{item.body}</p>
                </RevealOnScroll>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
