import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Navbar from "@/components/Navbar"
import { SessionProvider } from "next-auth/react";
import {Toaster} from "sonner"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const brand = localFont({
  src: "../fonts/brand.woff2",
  variable: "--font-brand"
})

export const metadata: Metadata = {
  title: "StreamBolt",
  description: "Stream live to the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${brand.variable}`}>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <Toaster position="bottom-center" theme="light" />
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <SidebarInset>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
