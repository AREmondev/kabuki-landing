import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  onDark?: boolean;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
  align = "left",
  onDark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-prose",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "mt-4 font-display text-h2",
          onDark ? "text-paper" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-[16.5px] md:text-[18px] leading-[1.7]",
            onDark ? "text-paper/70" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
