"use client";

import { heroCopy as defaultCopy } from "@/lib/data/hero";
import type { CmsHero } from "@/lib/cms/types";
import { resolveHero, useHeroSlides } from "./useHeroSlides";
import {
  HeroCaption,
  HeroCtas,
  HeroEyebrow,
  HeroHeading,
  HeroSubLines,
  HeroTrust,
  Lattice,
  PlayPause,
  ProgressBelow,
  SideArrows,
  SlideCounter,
  SlideStack,
  ThumbStrip,
} from "./parts";

export function TopTemplate({ content }: { content?: CmsHero }) {
  const copy = resolveHero(content);
  const slides = copy.slides;
  const slider = useHeroSlides(slides);
  const current = String(slider.index + 1).padStart(2, "0");
  const total = String(slides.length).padStart(2, "0");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-16 min-h-[100dvh] overflow-hidden bg-navy-deep md:-mt-[76px]"
      onMouseEnter={() => slider.setPaused(true)}
      onMouseLeave={() => slider.setPaused(false)}
    >
      <Lattice />
      <div className="relative site-container flex min-h-[100dvh] flex-col justify-center gap-8 py-20 md:py-24 lg:gap-10">
        <div className="mx-auto w-full max-w-3xl text-center">
          <HeroEyebrow kanjiLabel={copy.kanjiLabel} center />
          <HeroHeading copy={copy} center className="mx-auto max-w-[20ch]" />
          <HeroSubLines copy={copy} center />
          <HeroCtas copy={copy} center />
          <HeroTrust items={copy.trustItems} center className="mt-8 max-w-2xl border-t border-white/15 pt-6" />
          <HeroCaption copy={copy} className="mx-auto mt-3 max-w-prose text-center" />
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={defaultCopy.carouselLabel}
          onKeyDown={slider.onKeyDown}
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-white/10 bg-navy/40 lg:aspect-[21/9]">
            <SlideStack
              slides={slides}
              index={slider.index}
              playing={slider.playing}
              onTouchStart={slider.onTouchStart}
              onTouchEnd={slider.onTouchEnd}
              sizes="100vw"
            />
            <SideArrows onPrev={slider.prev} onNext={slider.next} />
            <div className="absolute right-4 top-4 z-10 rounded-button bg-navy-deep/80 px-3 py-1.5 tabular-nums text-[13px] tracking-[0.14em] text-white/85">
              <span className="text-kabuki">{current}</span>
              <span className="text-white/40"> / {total}</span>
            </div>
          </div>
          <ProgressBelow
            slides={slides}
            index={slider.index}
            playing={slider.playing}
            runId={slider.runId}
          />
          <div className="mt-5 flex items-center justify-between gap-3">
            <ThumbStrip slides={slides} index={slider.index} onSelect={slider.setIndex} />
            <div className="flex items-center gap-3">
              <SlideCounter index={slider.index} total={slides.length} className="hidden sm:block" />
              <PlayPause paused={slider.paused} onToggle={() => slider.setPaused((v) => !v)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
