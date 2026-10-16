"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCopy, galleryItems as defaultItems } from "@/lib/data/gallery";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LayoutGrid, type LayoutGridCard } from "@/components/ui/layout-grid";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import type { CmsContent } from "@/lib/cms/types";

const spanClass = {
  wide: "md:col-span-2",
  tall: "col-span-1",
  half: "col-span-1",
} as const;

export function Gallery({ content }: { content?: CmsContent["gallery"] }) {
  const galleryItems = content?.items ?? defaultItems;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const cards = useMemo<LayoutGridCard[]>(
    () =>
      galleryItems.map((item, index) => ({
        id: index + 1,
        thumbnail: item.src,
        alt: item.alt,
        className: spanClass[item.span],
        content: null,
      })),
    [galleryItems],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(() => {
    setOpenIndex((current) =>
      current === null ? current : (current + galleryItems.length - 1) % galleryItems.length,
    );
  }, [galleryItems.length]);
  const showNext = useCallback(() => {
    setOpenIndex((current) =>
      current === null ? current : (current + 1) % galleryItems.length,
    );
  }, [galleryItems.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [openIndex, close, showPrev, showNext]);

  const active = openIndex === null ? null : galleryItems[openIndex];

  return (
    <Section id="gallery" labelledBy="gallery-heading">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            id="gallery-heading"
            eyebrow={content?.eyebrow ?? galleryCopy.eyebrow}
            title={content?.title ?? galleryCopy.title}
          />
        </RevealOnScroll>
        <div className="mt-12 md:mt-14">
          <LayoutGrid cards={cards} onCardClick={setOpenIndex} />
        </div>
      </Container>

      {active && openIndex !== null ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
        >
          <button
            type="button"
            onClick={close}
            className="absolute inset-0 cursor-zoom-out bg-black/70 backdrop-blur-md"
            aria-hidden
            tabIndex={-1}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="absolute top-4 right-4 z-10 flex size-11 items-center justify-center rounded-button text-white hover:bg-white/10 md:top-6 md:right-6"
            aria-label={galleryCopy.close}
          >
            <X className="size-6" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={showPrev}
            className="absolute left-3 z-10 flex size-11 items-center justify-center rounded-button text-white hover:bg-white/10 md:left-6"
            aria-label={galleryCopy.prev}
          >
            <ChevronLeft className="size-7" strokeWidth={1.5} />
          </button>
          <div className="relative z-10 pointer-events-none max-h-[86dvh] w-full max-w-6xl">
            <div className="relative mx-auto aspect-[16/10] max-h-[82dvh] w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-3 z-10 flex size-11 items-center justify-center rounded-button text-white hover:bg-white/10 md:right-6"
            aria-label={galleryCopy.next}
          >
            <ChevronRight className="size-7" strokeWidth={1.5} />
          </button>
        </div>
      ) : null}
    </Section>
  );
}
