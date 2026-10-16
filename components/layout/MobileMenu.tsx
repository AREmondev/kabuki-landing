"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { navLinks, contactCta, menuCopy } from "@/lib/data/nav";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-paper lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={menuCopy.label}
      ref={panelRef}
    >
      <div className="flex h-16 items-center justify-between px-5">
        <Logo />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="flex size-11 items-center justify-center"
          aria-label={menuCopy.close}
        >
          <X className="size-6 text-navy" strokeWidth={1.5} />
        </button>
      </div>
      <nav className="flex flex-col gap-2 px-5 pt-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="py-3 text-xl font-semibold text-navy"
          >
            {link.label}
          </Link>
        ))}
        <Button href={contactCta.href} showArrow className="mt-6 w-full" onClick={onClose}>
          {contactCta.label}
        </Button>
      </nav>
    </div>
  );
}
