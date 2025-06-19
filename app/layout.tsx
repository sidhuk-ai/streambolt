import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
})

const brand = localFont({
  src: "./fonts/brand.woff2",
  variable: "--font-brand",
});

export const metadata: Metadata = {
  title: "Homepage",
  description: "Streambolt's home page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${outfit.variable} ${brand.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
            <Toaster position="bottom-center" theme="light" />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
