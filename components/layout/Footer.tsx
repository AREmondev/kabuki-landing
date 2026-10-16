import Link from "next/link";
import { footerCopy, socialLinks } from "@/lib/data/footer";
import { programs as defaultPrograms } from "@/lib/data/programs";
import { navLinks } from "@/lib/data/nav";
import { branches as defaultBranches } from "@/lib/data/branches";
import { contactCopy as defaultContact } from "@/lib/data/contact";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import type { CmsBranch, CmsContent, CmsProgram } from "@/lib/cms/types";

export function Footer({
  programs = defaultPrograms,
  branches = defaultBranches,
  contact = defaultContact,
}: {
  programs?: CmsProgram[] | typeof defaultPrograms;
  branches?: CmsBranch[] | typeof defaultBranches;
  contact?: CmsContent["contact"] | typeof defaultContact;
}) {
  return (
    <footer className="bg-navy-deep text-paper/80">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 font-bengali text-[15px] leading-[1.75] text-paper/70">
              {footerCopy.bangla}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
              {footerCopy.columns.programs}
            </p>
            <ul className="mt-4 space-y-2">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link href={program.href} className="text-[14px] hover:text-white">
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
              {footerCopy.columns.links}
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
                {footerCopy.columns.contact}
              </p>
              <ul className="mt-4 space-y-2 text-[14px]">
                {contact.phones.map((phone) => (
                  <li key={phone}>
                    <a href={`tel:${phone.replace(/-/g, "")}`} className="hover:text-white">
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${contact.email}`} className="hover:text-white">
                    {contact.email}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper">
                {footerCopy.columns.locations}
              </p>
              <ul className="mt-4 space-y-2 text-[14px]">
                {branches.map((branch) => (
                  <li key={branch.id}>
                    {branch.name}: {branch.address}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-paper/60">{footerCopy.copyright}</p>
          <div className="flex flex-wrap items-center gap-5">
            {footerCopy.legal.map((item) => (
              <Link key={item.href} href={item.href} className="text-[13px] hover:text-white">
                {item.label}
              </Link>
            ))}
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-[13px] hover:text-white"
                rel="noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
