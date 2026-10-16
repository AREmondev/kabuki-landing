"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  question: string;
  answer: string;
};

type AccordionProps = {
  items: readonly Item[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      className="w-full divide-y divide-line border-y border-line"
    >
      {items.map((item) => (
        <RadixAccordion.Item key={item.id} value={item.id} className="w-full">
          <RadixAccordion.Header className="w-full">
            <RadixAccordion.Trigger
              className={cn(
                "group flex w-full items-center justify-between gap-6 min-h-16 py-5 text-left font-display text-[17px] md:text-[18px] text-navy",
              )}
            >
              <span className="flex-1">{item.question}</span>
              <ChevronDown
                className="size-5 shrink-0 text-ink-muted transition-transform duration-300 ease-editorial group-data-[state=open]:rotate-180"
                strokeWidth={1.5}
                aria-hidden
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="overflow-hidden data-[state=open]:animate-none">
            <p className="pb-6 max-w-none text-[15px] md:text-base leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
