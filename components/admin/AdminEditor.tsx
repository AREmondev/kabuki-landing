"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImageOff, LoaderCircle, Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { CmsContent, CmsGalleryItem, HeroTemplate } from "@/lib/cms/types";
import { cn } from "@/lib/utils";

const heroTemplates: { id: HeroTemplate; label: string; hint: string }[] = [
  { id: "split", label: "স্প্লিট", hint: "লেখা বামে, স্লাইডার ডানে" },
  { id: "full", label: "ফুল স্ক্রিন", hint: "পুরো পর্দা ছবি, নিচে লেখা" },
  { id: "center", label: "সেন্টার", hint: "ছবির ওপর মাঝারি লেখা" },
  { id: "top", label: "টপ ব্যানার", hint: "মাঝারি শিরোনাম, নিচে চওড়া স্লাইডার" },
];

const tabs = [
  { id: "hero", label: "হিরো" },
  { id: "programs", label: "প্রোগ্রাম" },
  { id: "gallery", label: "গ্যালারি" },
  { id: "faqs", label: "জিজ্ঞাসা" },
  { id: "branches", label: "শাখা" },
  { id: "contact", label: "যোগাযোগ" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function AdminEditor({ initial }: { initial: CmsContent }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("hero");
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const jsonPreview = useMemo(() => JSON.stringify(content, null, 2), [content]);

  async function save() {
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const response = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "সংরক্ষণ ব্যর্থ।");
      setStatus("সংরক্ষণ হয়েছে। সাইটে এখনই দেখা যাবে।");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "সংরক্ষণ ব্যর্থ।");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function upload(file: File) {
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/cms/upload", { method: "POST", body: form });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || "আপলোড ব্যর্থ।");
    return body.url as string;
  }

  return (
    <div className="min-h-dvh bg-paper-warm">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.12em] uppercase text-kabuki">Admin CMS</p>
            <h1 className="font-display text-[1.35rem] text-navy">কন্টেন্ট প্যানেল</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button" variant="secondary" onClick={logout} className="h-10">
              লগআউট
            </Button>
            <Button type="button" onClick={save} loading={saving} className="h-10">
              সংরক্ষণ করুন
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {status ? <p className="mb-4 rounded-button bg-navy/5 px-4 py-3 text-[14px] text-navy">{status}</p> : null}
        {error ? <p className="mb-4 rounded-button bg-kabuki/10 px-4 py-3 text-[14px] text-kabuki">{error}</p> : null}

        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "h-10 rounded-button px-4 text-[13.5px] font-semibold",
                tab === item.id ? "bg-navy text-white" : "bg-white text-navy border border-line",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          {tab === "hero" ? <HeroFields content={content} setContent={setContent} onUpload={upload} /> : null}
          {tab === "programs" ? <ProgramFields content={content} setContent={setContent} onUpload={upload} /> : null}
          {tab === "gallery" ? <GalleryFields content={content} setContent={setContent} onUpload={upload} /> : null}
          {tab === "faqs" ? <FaqFields content={content} setContent={setContent} /> : null}
          {tab === "branches" ? <BranchFields content={content} setContent={setContent} /> : null}
          {tab === "contact" ? <ContactFields content={content} setContent={setContent} /> : null}
        </div>

        <details className="mt-10 rounded-card border border-line bg-white p-5">
          <summary className="cursor-pointer text-[14px] font-semibold text-navy">JSON প্রিভিউ</summary>
          <pre className="mt-4 overflow-auto text-[12px] text-ink-muted">{jsonPreview}</pre>
        </details>
      </div>
    </div>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Card({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-line bg-white p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-[1.15rem] text-navy">{title}</h2>
        {onRemove ? (
          <button type="button" onClick={onRemove} className="text-kabuki" aria-label="মুছে ফেলুন">
            <Trash2 className="size-4" strokeWidth={1.5} />
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const fieldId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setFailed(false);
  }, [value]);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    setBusy(true);
    try {
      onChange(await onUpload(file));
    } finally {
      setBusy(false);
    }
  }

  const hasImage = Boolean(value) && !failed;

  return (
    <div className="space-y-2 md:col-span-2">
      <p className="text-[13px] font-semibold text-navy">{label}</p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-card border border-line bg-paper-warm sm:w-44">
          {hasImage ? (
            <Image
              key={value}
              src={value}
              alt=""
              fill
              sizes="176px"
              unoptimized
              className="object-cover"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-2 text-center text-ink-muted">
              <ImageOff className="size-5" strokeWidth={1.5} />
              <span className="text-[11.5px] leading-tight">
                {failed ? "ছবি লোড হয়নি" : "কোনো ছবি নেই"}
              </span>
            </div>
          )}
          {busy ? (
            <div className="absolute inset-0 flex items-center justify-center bg-navy/60">
              <LoaderCircle className="size-5 animate-spinner text-white" strokeWidth={1.5} />
            </div>
          ) : null}
        </div>

        <div className="min-w-0 flex-1 space-y-3">
          <Input
            id={`${fieldId}-path`}
            label="ছবির পাথ বা URL"
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              loading={busy}
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="size-4" strokeWidth={1.5} /> ছবি আপলোড করুন
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                await handleFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
            <span className="truncate text-[12px] text-ink-muted">
              {fileName || "JPG, PNG বা WebP"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroFields({
  content,
  setContent,
  onUpload,
}: {
  content: CmsContent;
  setContent: React.Dispatch<React.SetStateAction<CmsContent>>;
  onUpload: (file: File) => Promise<string>;
}) {
  const hero = content.hero;
  const [previewMobile, setPreviewMobile] = useState(false);
  function patch(partial: Partial<typeof hero>) {
    setContent((current) => ({ ...current, hero: { ...current.hero, ...partial } }));
  }

  return (
    <>
      <Card title="হিরো টেমপ্লেট">
        <div className="overflow-hidden rounded-button border border-line">
          <div
            className={cn(
              "mx-auto transition-[max-width] duration-300 ease-editorial",
              previewMobile ? "max-w-[390px]" : "max-w-full",
            )}
          >
            <iframe
              key={hero.template}
              src={`/preview/${hero.template}`}
              title="হিরো টেমপ্লেট প্রিভিউ"
              className="block h-[440px] w-full border-0 bg-navy-deep"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
            <p className="text-[13px] text-ink-muted">
              {heroTemplates.find((item) => item.id === hero.template)?.hint}
            </p>
            <div className="flex gap-1 rounded-button border border-line p-1">
              <button
                type="button"
                onClick={() => setPreviewMobile(false)}
                aria-pressed={!previewMobile}
                className={cn(
                  "h-8 rounded-button px-3 text-[12.5px] font-semibold",
                  !previewMobile ? "bg-navy text-white" : "text-navy hover:bg-navy/5",
                )}
              >
                ডেস্কটপ
              </button>
              <button
                type="button"
                onClick={() => setPreviewMobile(true)}
                aria-pressed={previewMobile}
                className={cn(
                  "h-8 rounded-button px-3 text-[12.5px] font-semibold",
                  previewMobile ? "bg-navy text-white" : "text-navy hover:bg-navy/5",
                )}
              >
                মোবাইল
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {heroTemplates.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => patch({ template: item.id })}
              aria-pressed={hero.template === item.id}
              className={cn(
                "rounded-button border p-3 text-left transition-colors",
                hero.template === item.id
                  ? "border-kabuki bg-kabuki/10"
                  : "border-line bg-white hover:border-navy/40",
              )}
            >
              <span
                className={cn(
                  "block text-[13.5px] font-semibold",
                  hero.template === item.id ? "text-kabuki" : "text-navy",
                )}
              >
                {item.label}
              </span>
              <span className="mt-1 block text-[12px] leading-snug text-ink-muted">
                {item.hint}
              </span>
            </button>
          ))}
        </div>
      </Card>
      <Card title="হিরো লেখা">
        <FieldGrid>
          <Input label="কানজি লেবেল" name="kanji" value={hero.kanjiLabel} onChange={(e) => patch({ kanjiLabel: e.target.value })} />
          <Input label="শিরোনাম আগে" name="h1Before" value={hero.h1Before} onChange={(e) => patch({ h1Before: e.target.value })} />
          <Input label="শিরোনাম অ্যাকসেন্ট" name="h1Accent" value={hero.h1Accent} onChange={(e) => patch({ h1Accent: e.target.value })} />
          <Input label="শিরোনাম পরে" name="h1After" value={hero.h1After} onChange={(e) => patch({ h1After: e.target.value })} />
          <Textarea label="সাবহেড" name="sub" className="md:col-span-2" value={hero.sub} onChange={(e) => patch({ sub: e.target.value })} />
          <Textarea label="বাংলা লাইন" name="bangla" value={hero.bangla} onChange={(e) => patch({ bangla: e.target.value })} />
          <Textarea label="ক্যাপশন" name="caption" value={hero.caption} onChange={(e) => patch({ caption: e.target.value })} />
          <Input label="প্রাথমিক CTA" name="primaryCta" value={hero.primaryCta.label} onChange={(e) => patch({ primaryCta: { ...hero.primaryCta, label: e.target.value } })} />
          <Input label="দ্বিতীয় CTA" name="secondaryCta" value={hero.secondaryCta.label} onChange={(e) => patch({ secondaryCta: { ...hero.secondaryCta, label: e.target.value } })} />
        </FieldGrid>
        <Textarea
          label="ট্রাস্ট আইটেম (কমা দিয়ে আলাদা)"
          name="trust"
          value={hero.trustItems.join(", ")}
          onChange={(e) => patch({ trustItems: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })}
        />
      </Card>
      {hero.slides.map((slide, index) => (
        <Card
          key={slide.id}
          title={`স্লাইড ${index + 1}`}
          onRemove={hero.slides.length > 1 ? () => patch({ slides: hero.slides.filter((_, i) => i !== index) }) : undefined}
        >
          <FieldGrid>
            <ImageField
              label="ছবি"
              value={slide.src}
              onChange={(src) =>
                patch({ slides: hero.slides.map((item, i) => (i === index ? { ...item, src } : item)) })
              }
              onUpload={onUpload}
            />
            <Input
              label="Alt টেক্সট"
              name={`${slide.id}-alt`}
              value={slide.alt}
              onChange={(e) =>
                patch({ slides: hero.slides.map((item, i) => (i === index ? { ...item, alt: e.target.value } : item)) })
              }
            />
          </FieldGrid>
        </Card>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          patch({
            slides: [...hero.slides, { id: `slide-${Date.now()}`, src: "/images/hero/fuji.jpg", alt: "জাপানের দৃশ্য" }],
          })
        }
      >
        <Plus className="size-4" strokeWidth={1.5} /> স্লাইড যোগ করুন
      </Button>
    </>
  );
}

function ProgramFields({
  content,
  setContent,
  onUpload,
}: {
  content: CmsContent;
  setContent: React.Dispatch<React.SetStateAction<CmsContent>>;
  onUpload: (file: File) => Promise<string>;
}) {
  const programs = content.programs;
  function patch(partial: Partial<typeof programs>) {
    setContent((current) => ({ ...current, programs: { ...current.programs, ...partial } }));
  }

  return (
    <>
      <Card title="সেকশন">
        <FieldGrid>
          <Input label="আইব্রো" name="p-eyebrow" value={programs.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
          <Input label="শিরোনাম" name="p-title" value={programs.title} onChange={(e) => patch({ title: e.target.value })} />
          <Textarea label="বিবরণ" name="p-desc" value={programs.description} onChange={(e) => patch({ description: e.target.value })} />
        </FieldGrid>
      </Card>
      {programs.items.map((item, index) => (
        <Card
          key={item.id}
          title={item.title || `প্রোগ্রাম ${index + 1}`}
          onRemove={programs.items.length > 1 ? () => patch({ items: programs.items.filter((_, i) => i !== index) }) : undefined}
        >
          <FieldGrid>
            <Input label="লেবেল" name={`${item.id}-label`} value={item.label} onChange={(e) => patch({ items: programs.items.map((row, i) => (i === index ? { ...row, label: e.target.value } : row)) })} />
            <Input label="শিরোনাম" name={`${item.id}-title`} value={item.title} onChange={(e) => patch({ items: programs.items.map((row, i) => (i === index ? { ...row, title: e.target.value } : row)) })} />
            <Textarea label="বিবরণ" name={`${item.id}-desc`} value={item.description} onChange={(e) => patch({ items: programs.items.map((row, i) => (i === index ? { ...row, description: e.target.value } : row)) })} />
            <Input label="CTA" name={`${item.id}-cta`} value={item.cta} onChange={(e) => patch({ items: programs.items.map((row, i) => (i === index ? { ...row, cta: e.target.value } : row)) })} />
            <ImageField
              label="ছবি"
              value={item.image.src}
              onChange={(src) =>
                patch({ items: programs.items.map((row, i) => (i === index ? { ...row, image: { ...row.image, src } } : row)) })
              }
              onUpload={onUpload}
            />
            <Input
              label="ছবির alt"
              name={`${item.id}-alt`}
              value={item.image.alt}
              onChange={(e) =>
                patch({ items: programs.items.map((row, i) => (i === index ? { ...row, image: { ...row.image, alt: e.target.value } } : row)) })
              }
            />
            <Textarea
              label="বুলেট (প্রতি লাইনে একটি)"
              name={`${item.id}-bullets`}
              value={(item.bullets ?? []).join("\n")}
              onChange={(e) =>
                patch({
                  items: programs.items.map((row, i) =>
                    i === index
                      ? { ...row, bullets: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean) }
                      : row,
                  ),
                })
              }
            />
          </FieldGrid>
        </Card>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          patch({
            items: [
              ...programs.items,
              {
                id: `program-${Date.now()}`,
                label: "নতুন",
                title: "নতুন প্রোগ্রাম",
                description: "বিবরণ লিখুন।",
                href: "/#contact",
                cta: "জিজ্ঞাসা করুন",
                image: { src: "/images/programs/language.jpg", alt: "প্রোগ্রাম ছবি", aspect: "4/3" },
              },
            ],
          })
        }
      >
        <Plus className="size-4" strokeWidth={1.5} /> প্রোগ্রাম যোগ করুন
      </Button>
    </>
  );
}

function GalleryFields({
  content,
  setContent,
  onUpload,
}: {
  content: CmsContent;
  setContent: React.Dispatch<React.SetStateAction<CmsContent>>;
  onUpload: (file: File) => Promise<string>;
}) {
  const gallery = content.gallery;
  function patch(partial: Partial<typeof gallery>) {
    setContent((current) => ({ ...current, gallery: { ...current.gallery, ...partial } }));
  }

  return (
    <>
      <Card title="সেকশন">
        <FieldGrid>
          <Input label="আইব্রো" name="g-eyebrow" value={gallery.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
          <Input label="শিরোনাম" name="g-title" value={gallery.title} onChange={(e) => patch({ title: e.target.value })} />
        </FieldGrid>
      </Card>
      {gallery.items.map((item, index) => (
        <Card
          key={item.id}
          title={item.caption || `ছবি ${index + 1}`}
          onRemove={gallery.items.length > 1 ? () => patch({ items: gallery.items.filter((_, i) => i !== index) }) : undefined}
        >
          <FieldGrid>
            <ImageField
              label="ছবি"
              value={item.src}
              onChange={(src) => patch({ items: gallery.items.map((row, i) => (i === index ? { ...row, src } : row)) })}
              onUpload={onUpload}
            />
            <Input label="Alt" name={`${item.id}-alt`} value={item.alt} onChange={(e) => patch({ items: gallery.items.map((row, i) => (i === index ? { ...row, alt: e.target.value } : row)) })} />
            <Input label="ক্যাপশন" name={`${item.id}-cap`} value={item.caption} onChange={(e) => patch({ items: gallery.items.map((row, i) => (i === index ? { ...row, caption: e.target.value } : row)) })} />
            <label className="block space-y-2 text-[13px] font-semibold text-navy">
              স্প্যান
              <select
                className="h-12 w-full rounded-button border border-line bg-white px-4 text-[15px] font-normal"
                value={item.span}
                onChange={(e) =>
                  patch({
                    items: gallery.items.map((row, i) =>
                      i === index ? { ...row, span: e.target.value as CmsGalleryItem["span"] } : row,
                    ),
                  })
                }
              >
                <option value="wide">wide</option>
                <option value="tall">tall</option>
                <option value="half">half</option>
              </select>
            </label>
          </FieldGrid>
        </Card>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          patch({
            items: [
              ...gallery.items,
              {
                id: `g-${Date.now()}`,
                src: "/images/gallery/g2.jpg",
                alt: "গ্যালারি ছবি",
                caption: "নতুন ছবি",
                span: "half",
              },
            ],
          })
        }
      >
        <Plus className="size-4" strokeWidth={1.5} /> ছবি যোগ করুন
      </Button>
    </>
  );
}

function FaqFields({
  content,
  setContent,
}: {
  content: CmsContent;
  setContent: React.Dispatch<React.SetStateAction<CmsContent>>;
}) {
  const faqs = content.faqs;
  function patch(partial: Partial<typeof faqs>) {
    setContent((current) => ({ ...current, faqs: { ...current.faqs, ...partial } }));
  }

  return (
    <>
      <Card title="সেকশন">
        <FieldGrid>
          <Input label="আইব্রো" name="f-eyebrow" value={faqs.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
          <Input label="শিরোনাম" name="f-title" value={faqs.title} onChange={(e) => patch({ title: e.target.value })} />
          <Textarea label="বিবরণ" name="f-desc" value={faqs.description} onChange={(e) => patch({ description: e.target.value })} />
        </FieldGrid>
      </Card>
      {faqs.items.map((item, index) => (
        <Card
          key={item.id}
          title={item.question || `প্রশ্ন ${index + 1}`}
          onRemove={faqs.items.length > 1 ? () => patch({ items: faqs.items.filter((_, i) => i !== index) }) : undefined}
        >
          <Input label="প্রশ্ন" name={`${item.id}-q`} value={item.question} onChange={(e) => patch({ items: faqs.items.map((row, i) => (i === index ? { ...row, question: e.target.value } : row)) })} />
          <Textarea label="উত্তর" name={`${item.id}-a`} value={item.answer} onChange={(e) => patch({ items: faqs.items.map((row, i) => (i === index ? { ...row, answer: e.target.value } : row)) })} />
        </Card>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          patch({
            items: [...faqs.items, { id: `faq-${Date.now()}`, question: "নতুন প্রশ্ন", answer: "উত্তর লিখুন।" }],
          })
        }
      >
        <Plus className="size-4" strokeWidth={1.5} /> প্রশ্ন যোগ করুন
      </Button>
    </>
  );
}

function BranchFields({
  content,
  setContent,
}: {
  content: CmsContent;
  setContent: React.Dispatch<React.SetStateAction<CmsContent>>;
}) {
  const branches = content.branches;
  function patch(partial: Partial<typeof branches>) {
    setContent((current) => ({ ...current, branches: { ...current.branches, ...partial } }));
  }

  return (
    <>
      <Card title="সেকশন">
        <FieldGrid>
          <Input label="আইব্রো" name="b-eyebrow" value={branches.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
          <Input label="শিরোনাম" name="b-title" value={branches.title} onChange={(e) => patch({ title: e.target.value })} />
        </FieldGrid>
      </Card>
      {branches.items.map((item, index) => (
        <Card
          key={item.id}
          title={item.name || `শাখা ${index + 1}`}
          onRemove={branches.items.length > 1 ? () => patch({ items: branches.items.filter((_, i) => i !== index) }) : undefined}
        >
          <FieldGrid>
            <Input label="নাম" name={`${item.id}-name`} value={item.name} onChange={(e) => patch({ items: branches.items.map((row, i) => (i === index ? { ...row, name: e.target.value } : row)) })} />
            <Input label="ঠিকানা" name={`${item.id}-address`} value={item.address} onChange={(e) => patch({ items: branches.items.map((row, i) => (i === index ? { ...row, address: e.target.value } : row)) })} />
            <Input label="ম্যাপ লিংক" name={`${item.id}-map`} value={item.mapsUrl ?? ""} onChange={(e) => patch({ items: branches.items.map((row, i) => (i === index ? { ...row, mapsUrl: e.target.value || undefined } : row)) })} />
          </FieldGrid>
        </Card>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          patch({
            items: [...branches.items, { id: `branch-${Date.now()}`, name: "নতুন শাখা", address: "ঠিকানা লিখুন" }],
          })
        }
      >
        <Plus className="size-4" strokeWidth={1.5} /> শাখা যোগ করুন
      </Button>
    </>
  );
}

function ContactFields({
  content,
  setContent,
}: {
  content: CmsContent;
  setContent: React.Dispatch<React.SetStateAction<CmsContent>>;
}) {
  const contact = content.contact;
  function patch(partial: Partial<typeof contact>) {
    setContent((current) => ({ ...current, contact: { ...current.contact, ...partial } }));
  }

  return (
    <Card title="যোগাযোগ">
      <FieldGrid>
        <Input label="আইব্রো" name="c-eyebrow" value={contact.eyebrow} onChange={(e) => patch({ eyebrow: e.target.value })} />
        <Input label="শিরোনাম" name="c-title" value={contact.title} onChange={(e) => patch({ title: e.target.value })} />
        <Textarea label="বিবরণ" name="c-desc" value={contact.description} onChange={(e) => patch({ description: e.target.value })} />
        <Input label="ইমেইল" name="c-email" value={contact.email} onChange={(e) => patch({ email: e.target.value })} />
        <Input label="WhatsApp" name="c-wa" value={contact.whatsapp} onChange={(e) => patch({ whatsapp: e.target.value })} />
        <Textarea
          label="ফোন (প্রতি লাইনে একটি)"
          name="c-phones"
          value={contact.phones.join("\n")}
          onChange={(e) => patch({ phones: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean) })}
        />
      </FieldGrid>
    </Card>
  );
}
