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

export function SplitTemplate({ content }: { content?: CmsHero }) {
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
      <div className="relative site-container flex min-h-[100dvh] flex-col gap-10 pb-20 pt-24 md:gap-14 md:pt-28 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-8 lg:pb-16 lg:pt-28">
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <HeroEyebrow kanjiLabel={copy.kanjiLabel} />
          <HeroHeading copy={copy} />
          <HeroSubLines copy={copy} />
          <HeroCtas copy={copy} />
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={defaultCopy.carouselLabel}
            onKeyDown={slider.onKeyDown}
          >
            <div className="relative aspect-[4/3] rounded-card border border-white/10 bg-navy/40 sm:aspect-[16/10] lg:aspect-[4/5]">
              <SlideStack
                slides={slides}
                index={slider.index}
                playing={slider.playing}
                onTouchStart={slider.onTouchStart}
                onTouchEnd={slider.onTouchEnd}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <SideArrows onPrev={slider.prev} onNext={slider.next} />
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

        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
          <HeroTrust items={copy.trustItems} />
          <HeroCaption copy={copy} />
        </div>
      </div>
    </section>
  );
}
