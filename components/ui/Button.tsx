import Link from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type Shared = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  showArrow?: boolean;
  loading?: boolean;
};

type ButtonAsButton = Shared &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Shared & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  >;

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-kabuki text-white hover:bg-[#b01b26] border border-transparent",
  secondary:
    "bg-white text-navy border border-navy/30 hover:border-navy hover:bg-paper",
  ghost: "bg-transparent text-navy hover:text-kabuki",
};

export function Button({
  children,
  className,
  variant = "primary",
  showArrow = false,
  loading = false,
  href,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 h-12 px-5 rounded-button text-[15px] font-semibold tracking-[0.01em] transition-colors duration-300 ease-editorial min-h-[44px]",
    styles[variant],
    loading && "pointer-events-none opacity-80",
    className,
  );

  const content = (
    <>
      {loading ? (
        <LoaderCircle
          className="size-4 animate-spinner"
          strokeWidth={1.5}
          aria-hidden
        />
      ) : null}
      <span>{children}</span>
      {showArrow && !loading ? (
        <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
      ) : null}
    </>
  );

  if (href) {
    const linkProps = props as Omit<ButtonAsLink, "href" | "children" | "className" | "variant" | "showArrow" | "loading">;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={loading} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
