import { ArrowUpRight, MapPin } from "lucide-react";
import type { Branch } from "@/lib/data/branches";
import { branchesCopy } from "@/lib/data/branches";
import type { CmsBranch } from "@/lib/cms/types";
import { Card } from "./Card";

type BranchCardProps = {
  branch: Branch | CmsBranch;
};

export function BranchCard({ branch }: BranchCardProps) {
  return (
    <Card className="p-7 h-full">
      <MapPin className="size-5 text-kabuki" strokeWidth={1.5} aria-hidden />
      <h3 className="mt-5 font-display text-[1.35rem] text-navy">{branch.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{branch.address}</p>
      {branch.mapsUrl ? (
        <a
          href={branch.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-kabuki hover:text-[#b01b26]"
        >
          {branchesCopy.directionsCta}
          <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden />
        </a>
      ) : null}
    </Card>
  );
}
