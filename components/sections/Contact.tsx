"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Mail, Phone } from "lucide-react";
import {
  contactSchema,
  educationLevelOptions,
  interestedInOptions,
  preferredBranchOptions,
  type ContactFormValues,
} from "@/lib/validation/contactSchema";
import { contactCopy, contactFields } from "@/lib/data/contact";
import { socialLinks } from "@/lib/data/footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { SakuraMark } from "@/components/ui/SakuraMark";
import type { CmsContent } from "@/lib/cms/types";

export function Contact({ content }: { content?: CmsContent["contact"] }) {
  const copy = content
    ? { ...contactCopy, ...content }
    : contactCopy;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      message: "",
      website: "",
      interestedIn: "" as never,
      educationLevel: "" as never,
      preferredBranch: "" as never,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-space scroll-mt-16 md:scroll-mt-[76px] bg-paper-warm"
    >
      <Container>
        <div className="grid lg:grid-cols-12 overflow-hidden rounded-card border border-line">
          <div className="relative lg:col-span-5 bg-navy text-paper p-8 md:p-12 overflow-hidden">
            <SakuraMark className="absolute -right-6 -bottom-4 w-40 text-white/[0.15]" />
            <Eyebrow className="text-kabuki-soft">{copy.eyebrow}</Eyebrow>
            <h2 id="contact-heading" className="mt-4 font-display text-h2 text-paper">
              {copy.title}
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-paper/75 max-w-prose">
              {copy.description}
            </p>
            <ul className="mt-10 space-y-4 relative">
              {copy.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/-/g, "")}`}
                    className="inline-flex items-center gap-3 text-[15px] hover:text-white"
                  >
                    <Phone className="size-4" strokeWidth={1.5} aria-hidden />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${copy.email}`}
                  className="inline-flex items-center gap-3 text-[15px] hover:text-white"
                >
                  <Mail className="size-4" strokeWidth={1.5} aria-hidden />
                  {copy.email}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex gap-4 relative">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-label={item.label}
                  className="flex size-10 items-center justify-center border border-white/20 rounded-button hover:border-white/50"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook className="size-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 bg-white p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
                {...register("website")}
              />
              <Input
                label={contactFields.fullName.label}
                required
                placeholder={contactFields.fullName.placeholder}
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label={contactFields.phone.label}
                  required
                  placeholder={contactFields.phone.placeholder}
                  error={errors.phone?.message}
                  {...register("phone")}
                />
                <Input
                  label={contactFields.email.label}
                  type="email"
                  placeholder={contactFields.email.placeholder}
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>
              <Select
                label={contactFields.interestedIn.label}
                required
                options={interestedInOptions}
                error={errors.interestedIn?.message}
                {...register("interestedIn")}
              />
              <div className="grid gap-5 md:grid-cols-2">
                <Select
                  label={contactFields.educationLevel.label}
                  required
                  options={educationLevelOptions}
                  error={errors.educationLevel?.message}
                  {...register("educationLevel")}
                />
                <Select
                  label={contactFields.preferredBranch.label}
                  required
                  options={preferredBranchOptions}
                  error={errors.preferredBranch?.message}
                  {...register("preferredBranch")}
                />
              </div>
              <Textarea
                label={contactFields.message.label}
                placeholder={contactFields.message.placeholder}
                error={errors.message?.message}
                {...register("message")}
              />
              <Button type="submit" showArrow loading={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? contactCopy.submitting : contactCopy.submit}
              </Button>
              {status === "success" ? (
                <p role="status" className="text-[15px] text-navy">
                  {contactCopy.success}
                </p>
              ) : null}
              {status === "error" ? (
                <p role="alert" className="text-[15px] text-kabuki">
                  {contactCopy.error}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
