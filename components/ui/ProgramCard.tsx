import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/lib/data/programs";
import type { CmsProgram } from "@/lib/cms/types";
import { Card } from "./Card";

type ProgramCardProps = {
  program: Program | CmsProgram;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="flex h-full flex-col snap-start min-w-[280px] md:min-w-0 group">
      <div className="relative aspect-[4/3] bg-paper-warm overflow-hidden">
        <Image
          src={program.image.src}
          alt={program.image.alt}
          fill
          sizes="(max-width: 768px) 80vw, 33vw"
          className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 py-6 md:px-7 md:py-7">
        <p className="text-eyebrow uppercase text-kabuki">{program.label}</p>
        <h3 className="mt-3 font-display text-[1.35rem] leading-snug text-navy">
          {program.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          {program.description}
        </p>
        {program.bullets ? (
          <ul className="mt-4 space-y-1.5 text-[14px] text-ink-muted">
            {program.bullets.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[9px] size-1 shrink-0 rounded-full bg-kabuki" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href={program.href}
          className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-kabuki hover:text-[#b01b26]"
        >
          {program.cta}
          <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
        </Link>
      </div>
    </Card>
  );
}
