import { Phone } from "lucide-react";
import { contactCopy as defaultContact, mobileBar } from "@/lib/data/contact";
import type { CmsContent } from "@/lib/cms/types";

export function MobileContactBar({
  contact = defaultContact,
}: {
  contact?: CmsContent["contact"] | typeof defaultContact;
}) {
  const phone = contact.phones[0]?.replace(/-/g, "") ?? "";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden bg-paper/95 backdrop-blur-md border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="grid h-14 grid-cols-3">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2 text-[13px] font-semibold text-navy"
        >
          <Phone className="size-4" strokeWidth={1.5} aria-hidden />
          {mobileBar.call}
        </a>
        <a
            href={`https://wa.me/${contact.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center text-[13px] font-semibold text-navy border-x border-line"
        >
          {mobileBar.whatsapp}
        </a>
        <a
          href="/#contact"
          className="flex items-center justify-center bg-kabuki text-[13px] font-semibold text-white"
        >
          {mobileBar.apply}
        </a>
      </div>
    </div>
  );
}
