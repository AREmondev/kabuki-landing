"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navLinks, contactCta, skipLink, menuCopy } from "@/lib/data/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href={skipLink.href} className="skip-link">
        {skipLink.label}
      </a>
      <header
        className={cn(
          "sticky top-0 z-50 h-16 md:h-[76px] transition-colors duration-300",
          scrolled
            ? "bg-paper/80 backdrop-blur-md border-b border-line/80"
            : "bg-transparent",
        )}
      >
        <div className="site-container h-full flex items-center justify-between gap-8">
          <Logo className={cn(!scrolled && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]")} />
          <nav className="hidden lg:flex items-center gap-8" aria-label="প্রধান মেনু">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13.5px] font-medium tracking-[0.01em] transition-colors",
                  scrolled
                    ? "text-navy/80 hover:text-kabuki"
                    : "text-paper/90 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:block">
            <Button href={contactCta.href} showArrow className="h-[44px] px-4 text-[13.5px]">
              {contactCta.label}
            </Button>
          </div>
          <button
            type="button"
            className="lg:hidden flex size-11 items-center justify-center"
            aria-label={menuCopy.open}
            onClick={() => setOpen(true)}
          >
            <Menu
              className={cn("size-6", scrolled ? "text-navy" : "text-paper")}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
