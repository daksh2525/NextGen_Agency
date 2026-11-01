import type { Metadata } from "next";

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "NextGen Agency";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextgenagency.dev";

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Generates page-level metadata following the site's SEO strategy.
 * Defined in docs/prd.md Section 14.
 */
export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage,
}: GenerateMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Modern Software & AI Agency`;
  const pageDescription =
    description ??
    "NextGen Agency builds premium web applications, SaaS products, and AI-powered solutions for startups and enterprises worldwide.";
  const pageUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImageUrl = ogImage ? `${SITE_URL}${ogImage}` : `${SITE_URL}/images/og/default-og.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
