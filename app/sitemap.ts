import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/privacy"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
