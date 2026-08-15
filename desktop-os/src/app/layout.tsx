import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/os/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://kushagra486.github.io";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kushagra OS — Desktop Portfolio",
  description:
    "Kushagra Gupta's interactive desktop-OS-style portfolio — 15+ live AI/ML projects, an AI assistant, and a working desktop environment in the browser.",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Kushagra Gupta — AI Engineer & Full-Stack Developer",
    description: "An interactive desktop-OS-style portfolio with 15+ live AI/ML projects, an AI assistant, and more.",
    url: SITE_URL,
    siteName: "Kushagra OS",
    type: "website",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Kushagra Gupta — Kushagra OS portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushagra Gupta — AI Engineer & Full-Stack Developer",
    description: "An interactive desktop-OS-style portfolio with 15+ live AI/ML projects, an AI assistant, and more.",
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1a2e",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kushagra Gupta",
  url: SITE_URL,
  jobTitle: "AI Engineer / Data Scientist / Full-Stack Developer",
  description:
    "AI/ML developer, data scientist, and full-stack engineer building and shipping production AI-powered applications.",
  address: { "@type": "PostalAddress", addressLocality: "Prayagraj", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Babu Banarasi Das Institute of Technology and Management",
  },
  sameAs: [
    "https://www.linkedin.com/in/kushagra-gupta-18b4151ba/",
    "https://github.com/kushagra486",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
