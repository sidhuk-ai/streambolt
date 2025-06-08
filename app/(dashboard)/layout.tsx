import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Dashboard – Streambolt",
  description:
    "Manage your livestreams, track analytics, and interact with your audience in the Streambolt dashboard.",
  openGraph: {
    title: "Dashboard – Streambolt",
    description: "All your livestream tools in one place.",
    siteName: "Streambolt",
  },
  twitter: {
    title: "Dashboard – Streambolt",
    description: "Control your livestreams and content from the dashboard.",
  },
};

export default function DashboardLayout({
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
