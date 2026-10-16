"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export type LayoutGridCard = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
  alt?: string;
};

export function LayoutGrid({
  cards,
  onCardClick,
}: {
  cards: LayoutGridCard[];
  onCardClick?: (index: number) => void;
}) {
  return (
    <div className="relative mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <button
          key={card.id}
          type="button"
          onClick={() => onCardClick?.(index)}
          className={cn(
            "group relative min-h-[240px] overflow-hidden rounded-xl bg-paper-warm text-left md:min-h-[320px]",
            card.className,
          )}
          aria-label={card.alt}
        >
          <Image
            src={card.thumbnail}
            alt={card.alt ?? ""}
            fill
            className="object-cover object-top transition duration-500 ease-editorial group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </button>
      ))}
    </div>
  );
}
