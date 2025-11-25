import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TutrOS - Your Tutor Operating System",
  description: "A comprehensive virtual digital office for tutors to manage their professional profile, invoices, schedules, and communication with administrators.",
  keywords: ["TutrOS", "tutoring", "education", "malaysia", "tutor management", "invoice system", "scheduling"],
  authors: [{ name: "TutrOS Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "TutrOS - Your Tutor Operating System",
    description: "Professional hub for tutors to manage their business",
    url: "https://tutoros.com",
    siteName: "TutrOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TutrOS - Your Tutor Operating System",
    description: "Professional hub for tutors to manage their business",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}