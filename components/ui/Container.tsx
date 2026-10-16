import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
};

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn("site-container", className)}>{children}</Tag>;
}
