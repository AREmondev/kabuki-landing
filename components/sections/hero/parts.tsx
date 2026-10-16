"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroCopy as defaultCopy } from "@/lib/data/hero";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { CmsHero, CmsSlide } from "@/lib/cms/types";

export function Lattice() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(0deg,#FBF8F2_0_1px,transparent_1px_88px),repeating-linear-gradient(90deg,#FBF8F2_0_1px,transparent_1px_88px)]"
    />
  );
}

export function HeroEyebrow({ kanjiLabel, center }: { kanjiLabel: string; center?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", center && "justify-center")}>
      <span className="h-px w-6 bg-kabuki" aria-hidden />
      <p className="font-display text-[15px] tracking-[0.18em] text-white">{kanjiLabel}</p>
      {center ? <span className="h-px w-6 bg-kabuki" aria-hidden /> : null}
    </div>
  );
}

export function HeroHeading({
  copy,
  center,
  className,
}: {
  copy: CmsHero;
  center?: boolean;
  className?: string;
}) {
  return (
    <h1
      id="hero-heading"
      className={cn(
        "mt-6 max-w-[16ch] font-display text-h1 text-white",
        center && "mx-auto text-center",
        className,
      )}
    >
      {copy.h1Before}
      <span className="text-kabuki">{copy.h1Accent}</span>
      {copy.h1After}
    </h1>
  );
}

export function HeroSubLines({ copy, center }: { copy: CmsHero; center?: boolean }) {
  return (
    <>
      <p
        className={cn(
          "mt-6 max-w-[36ch] text-[18px] leading-relaxed text-white md:text-[20px]",
          center && "mx-auto",
        )}
      >
        {copy.sub}
      </p>
      <p
        className={cn(
          "mt-3 max-w-[40ch] font-bengali text-[16px] text-white/85 md:text-[17px]",
          center && "mx-auto",
        )}
      >
        {copy.bangla}
      </p>
    </>
  );
}

export function HeroCtas({ copy, center }: { copy: CmsHero; center?: boolean }) {
  return (
    <div className={cn("mt-9 flex flex-wrap gap-3", center && "justify-center")}>
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
  );
}

export function HeroTrust({
  items,
  center,
  className,
}: {
  items: string[];
  center?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/15 pt-6 text-[13.5px] tracking-[0.01em] text-white/85",
        center && "justify-center border-t-0 pt-0",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <span className="h-px w-3 bg-kabuki" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function HeroCaption({ copy, className }: { copy: CmsHero; className?: string }) {
  return (
    <p className={cn("mt-5 max-w-[46ch] text-[13px] leading-relaxed text-white/70", className)}>
      {copy.caption}
    </p>
  );
}

export function SlideStack({
  slides,
  index,
  playing,
  onTouchStart,
  onTouchEnd,
  sizes,
  className,
}: {
  slides: CmsSlide[];
  index: number;
  playing: boolean;
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ touchAction: "pan-y" }}
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
            sizes={sizes}
            className={cn("object-cover", playing && i === index && "animate-kenburns")}
          />
        </div>
      ))}
    </div>
  );
}

export function SideArrows({
  onPrev,
  onNext,
  className,
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label={defaultCopy.prevLabel}
        className={cn(
          "absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-button bg-navy-deep/75 text-white transition-colors hover:bg-navy-deep",
          className,
        )}
      >
        <ChevronLeft className="size-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={defaultCopy.nextLabel}
        className={cn(
          "absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-button bg-navy-deep/75 text-white transition-colors hover:bg-navy-deep",
          className,
        )}
      >
        <ChevronRight className="size-5" strokeWidth={1.5} />
      </button>
    </>
  );
}

function Segments({
  slides,
  index,
  playing,
  runId,
  className,
}: {
  slides: CmsSlide[];
  index: number;
  playing: boolean;
  runId: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("flex items-center gap-1.5", className)}>
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
  );
}

export function ProgressBelow({
  slides,
  index,
  playing,
  runId,
}: {
  slides: CmsSlide[];
  index: number;
  playing: boolean;
  runId: number;
}) {
  return <Segments slides={slides} index={index} playing={playing} runId={runId} className="mt-4" />;
}

export function ProgressFull({
  slides,
  index,
  playing,
  runId,
}: {
  slides: CmsSlide[];
  index: number;
  playing: boolean;
  runId: number;
}) {
  return (
    <Segments
      slides={slides}
      index={index}
      playing={playing}
      runId={runId}
      className="absolute inset-x-0 bottom-14 gap-1 lg:bottom-0"
    />
  );
}

export function ThumbStrip({
  slides,
  index,
  onSelect,
  className,
}: {
  slides: CmsSlide[];
  index: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {slides.map((slide, i) => (
        <button
          key={slide.id}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`${defaultCopy.slideLabel} ${i + 1}`}
          aria-current={i === index ? "true" : undefined}
          className={cn(
            "relative h-9 w-10 shrink-0 overflow-hidden rounded-button border transition-opacity duration-500 ease-editorial sm:h-11 sm:w-12 xl:h-12 xl:w-16",
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
  );
}

export function SlideCounter({
  index,
  total,
  className,
}: {
  index: number;
  total: number;
  className?: string;
}) {
  return (
    <p className={cn("tabular-nums text-[13px] tracking-[0.14em] text-white/55", className)}>
      <span className="text-kabuki">{String(index + 1).padStart(2, "0")}</span>
      <span className="text-white/35"> / {String(total).padStart(2, "0")}</span>
    </p>
  );
}

export function PlayPause({
  paused,
  onToggle,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? defaultCopy.playLabel : defaultCopy.pauseLabel}
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-button border border-white/15 text-white transition-colors hover:bg-white/10",
        className,
      )}
    >
      {paused ? (
        <Play className="size-4" strokeWidth={1.5} />
      ) : (
        <Pause className="size-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
