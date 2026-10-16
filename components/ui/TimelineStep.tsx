import { cn } from "@/lib/utils";

type TimelineStepProps = {
  number: string;
  title: string;
  isLast?: boolean;
  className?: string;
  onDark?: boolean;
};

export function TimelineStep({
  number,
  title,
  isLast,
  className,
  onDark = false,
}: TimelineStepProps) {
  return (
    <li className={cn("relative flex lg:flex-col gap-4 lg:gap-5", className)}>
      <div className="flex flex-col items-center lg:flex-row lg:w-full">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-kabuki text-[11px] font-semibold tracking-wide text-white tabular-nums">
          {number}
        </span>
        {!isLast ? (
          <span
            className={cn(
              "mt-1 w-px flex-1 lg:mt-0 lg:ml-0 lg:h-px lg:w-full",
              onDark ? "bg-white/25" : "bg-line",
            )}
            aria-hidden
          />
        ) : null}
      </div>
      <p
        className={cn(
          "pb-8 lg:pb-0 font-display text-[16px] leading-snug",
          onDark ? "text-paper" : "text-navy",
        )}
      >
        {title}
      </p>
    </li>
  );
}
