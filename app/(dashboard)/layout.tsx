import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Account – Streambolt",
  description:
    "Manage your livestreams, track analytics, and interact with your audience in the Streambolt dashboard.",
  openGraph: {
    title: "Account – Streambolt",
    description: "All your livestream tools in one place.",
    siteName: "Streambolt",
  },
  twitter: {
    title: "Account – Streambolt",
    description: "Control your livestreams and content from the dashboard.",
  },
};

export default async function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
