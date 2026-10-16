import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali, Newsreader } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileContactBar } from "@/components/layout/MobileContactBar";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { getCmsContent } from "@/lib/cms/store";
import { jsonLd, siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cms = await getCmsContent();

  return (
    <html lang="bn" className={`${inter.variable} ${display.variable} ${bengali.variable}`}>
      <body className="font-bengali bg-paper text-ink pb-14 lg:pb-0 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <SiteChrome
            navbar={<Navbar />}
            footer={
              <Footer
                programs={cms.programs.items}
                branches={cms.branches.items}
                contact={cms.contact}
              />
            }
            contactBar={<MobileContactBar contact={cms.contact} />}
          >
            {children}
          </SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
