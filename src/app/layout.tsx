import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CommandPalette } from "@/components/command-palette";
import { MiniTerminal } from "@/components/mini-terminal";
import { siteData } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://k5hitij.com"),
  title: {
    default: `${siteData.owner.handle}`,
    template: `%s | ${siteData.owner.name}`,
  },
  description: siteData.owner.headline,
  keywords: [
    "Kshitij Awaghad",
    "k5hitij",
    "Full-Stack Developer",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: siteData.owner.name, url: siteData.socials.github }],
  creator: siteData.owner.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://k5hitij.com",
    title: `${siteData.owner.name} | ${siteData.owner.role}`,
    description: siteData.owner.headline,
    siteName: `${siteData.owner.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteData.owner.name} | ${siteData.owner.role}`,
    description: siteData.owner.headline,
    creator: "@k5hitij_5",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col relative selection:bg-accent/25 selection:text-foreground">
        {/* Background Grid Pattern */}
        <div
          className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-60 z-0"
          aria-hidden="true"
        />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Skip to Content for Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:font-mono focus:text-xs focus:rounded-md focus:shadow-lg"
          >
            Skip to main content
          </a>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CommandPalette />
            <MiniTerminal />
          </div>

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: siteData.owner.name,
                alternateName: siteData.owner.handle,
                jobTitle: siteData.owner.role,
                url: "https://k5hitij.com",
                sameAs: [
                  siteData.socials.github,
                  siteData.socials.linkedin,
                  siteData.socials.x,
                ],
                knowsAbout: [
                  "Full-Stack Development",
                  "TypeScript",
                  "Next.js",
                  "React",
                  "Node.js",
                  "PostgreSQL",
                  "System Architecture",
                ],
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
