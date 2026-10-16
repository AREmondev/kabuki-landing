"use client";

import { m, useReducedMotion } from "framer-motion";
import { fadeUp, reducedFade, viewportOnce } from "./variants";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li" | "section";
};

export function RevealOnScroll({
  children,
  className,
  as = "div",
}: RevealOnScrollProps) {
  const reduce = useReducedMotion();
  const Component = m[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={reduce ? reducedFade : fadeUp}
    >
      {children}
    </Component>
  );
}
