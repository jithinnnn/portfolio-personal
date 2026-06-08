import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jithin George Jose — Frontend Engineer",
  description:
    "Frontend Engineer with 1.6+ years building production-grade Angular and React applications for ERP and AI-powered healthcare platforms.",
  keywords: ["Frontend Engineer", "Angular", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Jithin George Jose" }],
  openGraph: {
    title: "Jithin George Jose — Frontend Engineer",
    description:
      "Frontend Engineer specialising in Angular, React, WebSockets and real-time AI workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} h-full antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
