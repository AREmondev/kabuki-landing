import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
};

export function Section({ children, className, id, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "section-space scroll-mt-16 md:scroll-mt-[76px]",
        className,
      )}
    >
      {children}
    </section>
  );
}
