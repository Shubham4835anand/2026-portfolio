import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Shubham Anand — Creative Portfolio Showcase 2026",
  description:
    "Interactive 3D Portfolio Showcase 2026 for Shubham Anand — Oracle APEX & Full Stack Developer building AI enterprise applications, RAG pipelines, and high-performance web systems.",
  keywords: [
    "Shubham Anand",
    "Portfolio Showcase 2026",
    "3D Portfolio",
    "Full Stack Developer",
    "Oracle APEX",
    "RAG",
    "Azure OpenAI",
    "Next.js 14",
    "Three.js",
  ],
  authors: [{ name: "Shubham Anand" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
      </body>
    </html>
  );
}
