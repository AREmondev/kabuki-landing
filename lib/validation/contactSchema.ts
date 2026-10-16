import { z } from "zod";

const bdPhone = /^(?:\+8801|8801|01)[3-9]\d{8}$/;

export const interestedInOptions = [
  "জাপানি ভাষা কোর্স",
  "স্টুডেন্ট ভিসা",
  "মাস্টার্স প্রোগ্রাম",
  "SSW",
  "TITP",
  "অন্যান্য",
] as const;

export const educationLevelOptions = [
  "এসএসসি",
  "এইচএসসি",
  "ডিপ্লোমা",
  "স্নাতক",
  "মাস্টার্স",
  "অন্যান্য",
] as const;

export const preferredBranchOptions = [
  "চাঁপাইনবাবগঞ্জ",
  "নাচোল",
  "ঢাকা",
  "অনলাইন",
] as const;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "আপনার পূর্ণ নাম লিখুন।")
    .max(80, "নাম অনেক বড়।"),
  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/[\s-]/g, ""))
    .refine((value) => bdPhone.test(value), {
      message: "সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন।",
    }),
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "সঠিক ইমেইল ঠিকানা লিখুন।",
    }),
  interestedIn: z.enum(interestedInOptions, {
    required_error: "আপনি কী নিয়ে আগ্রহী, তা নির্বাচন করুন।",
  }),
  educationLevel: z.enum(educationLevelOptions, {
    required_error: "আপনার শিক্ষাগত যোগ্যতা নির্বাচন করুন।",
  }),
  preferredBranch: z.enum(preferredBranchOptions, {
    required_error: "পছন্দের শাখা নির্বাচন করুন।",
  }),
  message: z.string().trim().max(1000, "বার্তা অনেক বড়।").optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
