import { z } from "zod";

const cta = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

const slide = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
});

const program = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  cta: z.string().min(1),
  image: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
    aspect: z.literal("4/3"),
  }),
  bullets: z.array(z.string()).optional(),
});

const galleryItem = z.object({
  id: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().min(1),
  span: z.enum(["wide", "tall", "half"]),
});

const faq = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
});

const branch = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  mapsUrl: z.string().optional(),
  todo: z.literal(true).optional(),
});

export const cmsContentSchema = z.object({
  hero: z.object({
    kanjiLabel: z.string().min(1),
    h1Before: z.string(),
    h1Accent: z.string().min(1),
    h1After: z.string(),
    sub: z.string().min(1),
    bangla: z.string().min(1),
    caption: z.string().min(1),
    primaryCta: cta,
    secondaryCta: cta,
    trustItems: z.array(z.string().min(1)).min(1),
    slides: z.array(slide).min(1),
    template: z.enum(["split", "full", "center", "top"]),
  }),
  programs: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(program).min(1),
  }),
  gallery: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    items: z.array(galleryItem).min(1),
  }),
  faqs: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    items: z.array(faq).min(1),
  }),
  branches: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    items: z.array(branch).min(1),
  }),
  contact: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    phones: z.array(z.string().min(1)).min(1),
    email: z.string().email(),
    whatsapp: z.string().min(1),
  }),
});
