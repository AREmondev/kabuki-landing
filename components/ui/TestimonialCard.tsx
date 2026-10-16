import Image from "next/image";
import type { Testimonial } from "@/lib/data/testimonials";
import { Card } from "./Card";

type TestimonialCardProps = {
  item: Testimonial;
};

export function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <div className="relative aspect-[4/5] bg-paper-warm">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="px-6 py-6 md:px-7">
        <p className="font-display text-[1.2rem] text-navy">{item.name}</p>
        <p className="mt-2 text-eyebrow uppercase text-kabuki">{item.pathway}</p>
        <p className="mt-1.5 text-[14px] text-ink-muted">{item.destination}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
          {item.quote}
        </p>
      </div>
    </Card>
  );
}
