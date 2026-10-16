import { cn } from "@/lib/utils";

type TimelineStepProps = {
  number: string;
  title: string;
  isLast?: boolean;
  className?: string;
};

export function TimelineStep({
  number,
  title,
  isLast,
  className,
}: TimelineStepProps) {
  return (
    <li className={cn("relative flex lg:flex-col gap-4 lg:gap-5", className)}>
      <div className="flex flex-col items-center lg:flex-row lg:w-full">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-kabuki text-[11px] font-semibold tracking-wide text-white tabular-nums">
          {number}
        </span>
        {!isLast ? (
          <span
            className="mt-1 w-px flex-1 bg-line lg:mt-0 lg:ml-0 lg:h-px lg:w-full"
            aria-hidden
          />
        ) : null}
      </div>
      <p className="pb-8 lg:pb-0 font-display text-[16px] text-navy leading-snug">
        {title}
      </p>
    </li>
  );
}
