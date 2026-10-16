export const contactCopy = {
  eyebrow: "যোগাযোগ",
  title: "আপনার জাপান যাত্রা শুরু করুন",
  description:
    "আপনি কী নিয়ে আগ্রহী, তা জানান। আমাদের কাউন্সেলর আপনার সাথে যোগাযোগ করবেন।",
  submit: "পরামর্শের জন্য অনুরোধ করুন",
  submitting: "পাঠানো হচ্ছে…",
  success:
    "ধন্যবাদ! আপনার জিজ্ঞাসা গ্রহণ করা হয়েছে। কাবুকির একজন কাউন্সেলর শিগগিরই যোগাযোগ করবেন।",
  error: "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা ফোন করুন।",
  phones: ["01882-080318", "01744-662212"],
  email: "kabuki303@gmail.com",
  whatsapp: "8801882080318",
} as const;

export const contactFields = {
  fullName: { label: "পূর্ণ নাম", required: true, placeholder: "আপনার পূর্ণ নাম" },
  phone: {
    label: "ফোন",
    required: true,
    placeholder: "01XXXXXXXXX",
  },
  email: { label: "ইমেইল", required: false, placeholder: "name@example.com" },
  interestedIn: { label: "আগ্রহের বিষয়", required: true },
  educationLevel: { label: "শিক্ষাগত যোগ্যতা", required: true },
  preferredBranch: { label: "পছন্দের শাখা", required: true },
  message: {
    label: "বার্তা",
    required: false,
    placeholder: "আপনার পরিকল্পনা সম্পর্কে কিছু লিখুন (ঐচ্ছিক)",
  },
} as const;

export const mobileBar = {
  call: "কল",
  whatsapp: "হোয়াটসঅ্যাপ",
  apply: "আবেদন করুন",
} as const;
