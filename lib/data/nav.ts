export const navLinks = [
  { href: "/", label: "হোম" },
  { href: "/#programs", label: "প্রোগ্রাম" },
  { href: "/#why-kabuki", label: "কেন কাবুকি" },
  { href: "/#success", label: "সাফল্যের গল্প" },
  { href: "/#pathway", label: "জাপান পথ" },
  { href: "/#branches", label: "শাখা" },
  { href: "/#faq", label: "জিজ্ঞাসা" },
] as const;

export const contactCta = {
  href: "/#contact",
  label: "যোগাযোগ করুন",
} as const;

export const skipLink = {
  href: "#main",
  label: "মূল বিষয়ে যান",
} as const;

export const menuCopy = {
  open: "মেনু খুলুন",
  close: "মেনু বন্ধ করুন",
  label: "মেনু",
} as const;
