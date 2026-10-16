"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  heroCopy as defaultCopy,
  heroSlides as defaultSlides,
  heroTrustItems as defaultTrust,
} from "@/lib/data/hero";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CmsHero } from "@/lib/cms/types";

const INTERVAL = 7000;
const SWIPE_THRESHOLD = 48;

export function Hero({ content }: { content?: CmsHero }) {
  const copy = content ?? {
    ...defaultCopy,
    trustItems: [...defaultTrust],
    slides: defaultSlides.map((slide) => ({ ...slide })),
  };
  const slides = copy.slides;
  const trustItems = copy.trustItems;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [runId, setRunId] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const playing = !reduce && !paused && !hidden;

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    function onVisibility() {
      setHidden(document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [index, slides.length]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(next, INTERVAL);
    return () => window.clearInterval(id);
  }, [playing, next]);

  useEffect(() => {
    if (playing) setRunId((value) => value + 1);
  }, [playing]);

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function onTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) next();
    else prev();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative -mt-16 min-h-[100dvh] overflow-hidden bg-navy-deep md:-mt-[76px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(0deg,#FBF8F2_0_1px,transparent_1px_88px),repeating-linear-gradient(90deg,#FBF8F2_0_1px,transparent_1px_88px)]"
      />

      <div className="relative site-container flex min-h-[100dvh] flex-col gap-10 pb-20 pt-24 md:gap-14 md:pt-28 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-8 lg:pb-16 lg:pt-28">
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-kabuki" aria-hidden />
            <p className="font-display text-[15px] tracking-[0.18em] text-white">{copy.kanjiLabel}</p>
          </div>
          <h1 id="hero-heading" className="mt-6 max-w-[16ch] font-display text-h1 text-white">
            {copy.h1Before}
            <span className="text-kabuki">{copy.h1Accent}</span>
            {copy.h1After}
          </h1>
          <p className="mt-6 max-w-[36ch] text-[18px] leading-relaxed text-white md:text-[20px]">
            {copy.sub}
          </p>
          <p className="mt-3 max-w-[40ch] font-bengali text-[16px] text-white/85 md:text-[17px]">
            {copy.bangla}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={copy.primaryCta.href} showArrow>
              {copy.primaryCta.label}
            </Button>
            <Button
              href={copy.secondaryCta.href}
              variant="secondary"
              className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10"
            >
              {copy.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2">
          <div
            role="group"
            aria-roledescription="carousel"
            aria-label={defaultCopy.carouselLabel}
            onKeyDown={onKeyDown}
          >
            <div
              className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-card border border-white/10 bg-navy/40 sm:aspect-[16/10] lg:aspect-[4/5]"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {slides.map((slide, i) => (
                <div
                  key={slide.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-[1200ms] ease-editorial",
                    i === index ? "opacity-100" : "opacity-0",
                  )}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className={cn("object-cover", playing && i === index && "animate-kenburns")}
                  />
                </div>
              ))}

              <button
                type="button"
                onClick={prev}
                aria-label={defaultCopy.prevLabel}
                className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-button bg-navy-deep/75 text-white transition-colors hover:bg-navy-deep"
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={defaultCopy.nextLabel}
                className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-button bg-navy-deep/75 text-white transition-colors hover:bg-navy-deep"
              >
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </button>
            </div>

            <div aria-hidden className="mt-4 flex items-center gap-1.5">
              {slides.map((slide, i) => (
                <span
                  key={slide.id}
                  className="relative block h-[3px] flex-1 overflow-hidden bg-white/25"
                >
                  {i === index ? (
                    <span
                      key={runId}
                      className="absolute inset-y-0 left-0 animate-slide-progress bg-kabuki"
                      style={{ animationPlayState: playing ? "running" : "paused" }}
                    />
                  ) : null}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${defaultCopy.slideLabel} ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className={cn(
                      "relative h-9 w-10 overflow-hidden rounded-button border transition-opacity duration-500 ease-editorial sm:h-11 sm:w-12 xl:h-12 xl:w-16",
                      i === index
                        ? "border-kabuki opacity-100"
                        : "border-white/10 opacity-55 hover:opacity-90",
                    )}
                  >
                    <Image
                      src={slide.src}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 64px, (min-width: 640px) 48px, 40px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <p className="hidden tabular-nums text-[13px] tracking-[0.14em] text-white/55 sm:block">
                  <span className="text-kabuki">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-white/35"> / {String(slides.length).padStart(2, "0")}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setPaused((value) => !value)}
                  aria-label={paused ? defaultCopy.playLabel : defaultCopy.pauseLabel}
                  className="flex size-11 items-center justify-center rounded-button border border-white/15 text-white transition-colors hover:bg-white/10"
                >
                  {paused ? (
                    <Play className="size-4" strokeWidth={1.5} />
                  ) : (
                    <Pause className="size-4" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
          <ul className="flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/15 pt-6 text-[13.5px] tracking-[0.01em] text-white/85">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-px w-3 bg-kabuki" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-[46ch] text-[13px] leading-relaxed text-white/70">{copy.caption}</p>
        </div>
      </div>
    </section>
  );
}
