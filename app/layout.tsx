import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { ScrollTracker } from "@/components/scroll-tracker";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Neon",
  description: "Next.js + Better Auth + Drizzle starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased bg-background text-foreground`}
      >
        <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-8">
          <div className="rounded-3xl bg-gradient-to-br from-background/90 via-background/80 to-background/60 backdrop-blur-lg p-6 sm:p-8 shadow-xl shadow-black/5 border border-border/20">
            <Header />
            <main className="mt-8">
              {children}
            </main>
          </div>
        </div>
        <Toaster />
        <ScrollTracker />
      </body>
    </html>
  );
}
