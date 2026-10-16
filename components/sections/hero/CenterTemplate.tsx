"use client";

import { heroCopy as defaultCopy } from "@/lib/data/hero";
import type { CmsHero } from "@/lib/cms/types";
import { resolveHero, useHeroSlides } from "./useHeroSlides";
import {
  HeroCtas,
  HeroEyebrow,
  HeroHeading,
  HeroSubLines,
  HeroTrust,
  Lattice,
  PlayPause,
  ProgressFull,
  SideArrows,
  SlideCounter,
  SlideStack,
  ThumbStrip,
} from "./parts";

export function CenterTemplate({ content }: { content?: CmsHero }) {
  const copy = resolveHero(content);
  const slides = copy.slides;
  const slider = useHeroSlides(slides);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-16 min-h-[100dvh] overflow-hidden bg-navy-deep md:-mt-[76px]"
      onMouseEnter={() => slider.setPaused(true)}
      onMouseLeave={() => slider.setPaused(false)}
    >
      <Lattice />
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={defaultCopy.carouselLabel}
        onKeyDown={slider.onKeyDown}
        className="absolute inset-0"
      >
        <SlideStack
          slides={slides}
          index={slider.index}
          playing={slider.playing}
          onTouchStart={slider.onTouchStart}
          onTouchEnd={slider.onTouchEnd}
          sizes="100vw"
        />
        <SideArrows onPrev={slider.prev} onNext={slider.next} />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-navy-deep/15"
      />

      <div className="relative site-container flex min-h-[100dvh] flex-col items-center justify-end pb-24 pt-32 text-center md:pb-28">
        <div className="w-full max-w-2xl">
          <HeroEyebrow kanjiLabel={copy.kanjiLabel} center />
          <HeroHeading copy={copy} center />
          <HeroSubLines copy={copy} center />
          <HeroCtas copy={copy} center />
        </div>
        <HeroTrust items={copy.trustItems} center className="mt-10" />
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ThumbStrip slides={slides} index={slider.index} onSelect={slider.setIndex} />
          <div className="flex items-center gap-3">
            <SlideCounter index={slider.index} total={slides.length} className="hidden sm:block" />
            <PlayPause paused={slider.paused} onToggle={() => slider.setPaused((v) => !v)} />
          </div>
        </div>
      </div>
      <ProgressFull
        slides={slides}
        index={slider.index}
        playing={slider.playing}
        runId={slider.runId}
      />
    </section>
  );
}
