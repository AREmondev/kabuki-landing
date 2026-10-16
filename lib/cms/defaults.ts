import { branches, branchesCopy } from "@/lib/data/branches";
import { contactCopy } from "@/lib/data/contact";
import { faqCopy, faqs } from "@/lib/data/faq";
import { galleryCopy, galleryItems } from "@/lib/data/gallery";
import { heroCopy, heroSlides, heroTrustItems } from "@/lib/data/hero";
import { programs, programsCopy } from "@/lib/data/programs";
import type { CmsContent } from "./types";

export function getDefaultCmsContent(): CmsContent {
  return {
    hero: {
      kanjiLabel: heroCopy.kanjiLabel,
      h1Before: heroCopy.h1Before,
      h1Accent: heroCopy.h1Accent,
      h1After: heroCopy.h1After,
      sub: heroCopy.sub,
      bangla: heroCopy.bangla,
      caption: heroCopy.caption,
      primaryCta: { ...heroCopy.primaryCta },
      secondaryCta: { ...heroCopy.secondaryCta },
      trustItems: [...heroTrustItems],
      slides: heroSlides.map((slide) => ({ ...slide })),
      template: "split",
    },
    programs: {
      eyebrow: programsCopy.eyebrow,
      title: programsCopy.title,
      description: programsCopy.description,
      items: programs.map((program) => ({
        ...program,
        image: { ...program.image },
        bullets: program.bullets ? [...program.bullets] : undefined,
      })),
    },
    gallery: {
      eyebrow: galleryCopy.eyebrow,
      title: galleryCopy.title,
      items: galleryItems.map((item) => ({ ...item })),
    },
    faqs: {
      eyebrow: faqCopy.eyebrow,
      title: faqCopy.title,
      description: faqCopy.description,
      items: faqs.map((item) => ({ ...item })),
    },
    branches: {
      eyebrow: branchesCopy.eyebrow,
      title: branchesCopy.title,
      items: branches.map((item) => ({ ...item })),
    },
    contact: {
      eyebrow: contactCopy.eyebrow,
      title: contactCopy.title,
      description: contactCopy.description,
      phones: [...contactCopy.phones],
      email: contactCopy.email,
      whatsapp: contactCopy.whatsapp,
    },
  };
}
