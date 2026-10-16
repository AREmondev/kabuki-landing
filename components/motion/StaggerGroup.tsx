"use client";

import { m, useReducedMotion } from "framer-motion";
import { reducedFade, stagger } from "./variants";

type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
};

export function StaggerGroup({
  children,
  className,
  as = "div",
}: StaggerGroupProps) {
  const reduce = useReducedMotion();
  const Component = m[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={reduce ? reducedFade : stagger}
    >
      {children}
    </Component>
  );
}
