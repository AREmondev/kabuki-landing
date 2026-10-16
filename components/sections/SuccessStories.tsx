"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { successCopy, testimonials } from "@/lib/data/testimonials";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

export function SuccessStories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!emblaApi) return;
      if (event.key === "ArrowLeft") emblaApi.scrollPrev();
      if (event.key === "ArrowRight") emblaApi.scrollNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi]);

  return (
    <Section id="success" labelledBy="success-heading" className="bg-paper-warm">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <RevealOnScroll>
            <SectionHeading
              id="success-heading"
              eyebrow={successCopy.eyebrow}
              title={successCopy.title}
              description={successCopy.description}
            />
          </RevealOnScroll>
          <div className="hidden md:flex gap-2 mb-1">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="আগের গল্প"
              className="flex size-10 items-center justify-center border border-line rounded-button text-navy disabled:opacity-30"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="পরের গল্প"
              className="flex size-10 items-center justify-center border border-line rounded-button text-navy disabled:opacity-30"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div
          className="mt-12 md:mt-14 overflow-hidden"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={successCopy.title}
        >
          <div className="flex gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
