import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { heroCopy, heroSlides, heroTrustItems } from "@/lib/data/hero";
import type { CmsHero, CmsSlide } from "@/lib/cms/types";

const INTERVAL = 7000;
const SWIPE_THRESHOLD = 48;

export function resolveHero(content?: CmsHero): CmsHero {
  return content ?? {
    ...heroCopy,
    trustItems: [...heroTrustItems],
    slides: heroSlides.map((slide) => ({ ...slide })),
  };
}

export function useHeroSlides(slides: CmsSlide[]) {
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

  return {
    index,
    playing,
    next,
    prev,
    setIndex,
    paused,
    setPaused,
    runId,
    onTouchStart,
    onTouchEnd,
    onKeyDown,
  };
}

export type HeroSlider = ReturnType<typeof useHeroSlides>;
