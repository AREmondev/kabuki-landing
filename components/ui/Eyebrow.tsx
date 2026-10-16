import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span";
};

export function Eyebrow({ children, className, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "text-eyebrow uppercase text-kabuki tracking-[0.16em] font-semibold",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
