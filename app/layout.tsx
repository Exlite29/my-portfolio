import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "Ariel Agdon — Front End Developer";
const SITE_DESCRIPTION =
  "Portfolio of Ariel Agdon, a front end developer crafting interactive, accessible web experiences with React, Next.js, TypeScript and Three.js.";

export const metadata: Metadata = {
  // Favicon lives at app/icon.png (App Router file convention — served
  // automatically; no metadata.icons entry needed).
  metadataBase: siteUrl,
  title: {
    default: SITE_NAME,
    template: "%s | Ariel Agdon",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Ariel Agdon",
    "front end developer",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "web developer",
  ],
  authors: [{ name: "Ariel Agdon", url: siteUrl.toString() }],
  creator: "Ariel Agdon",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ariel Agdon Portfolio",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Ariel Agdon logo" }],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#11161d" },
  ],
};

/** Static profile data for search engines (schema.org Person). */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ariel Agdon",
  jobTitle: "Front End Developer",
  url: siteUrl.toString(),
  sameAs: [
    "https://github.com/Exlite29",
    "https://linkedin.com/in/ariel-agdon-916846160/",
  ],
  knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="min-h-screen dark:bg-[#222831]">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="portfolio-theme"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
