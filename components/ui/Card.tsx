import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

export function Card({ children, className, as: Tag = "article" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card bg-white border border-line overflow-hidden shadow-navy-sm",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
