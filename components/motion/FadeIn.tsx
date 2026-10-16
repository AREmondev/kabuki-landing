"use client";

import { m, useReducedMotion } from "framer-motion";
import { fadeIn, fadeUp, reducedFade } from "./variants";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "in";
  delay?: number;
};

export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const variant = reduce ? reducedFade : direction === "in" ? fadeIn : fadeUp;

  return (
    <m.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variant}
      transition={{ delay }}
    >
      {children}
    </m.div>
  );
}
