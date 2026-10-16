import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label={siteConfig.name}>
      <Image
        src="/images/brand/logo.png"
        alt={siteConfig.name}
        width={148}
        height={128}
        priority
        className="h-11 w-auto md:h-12"
      />
    </Link>
  );
}
