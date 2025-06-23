import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";
import { AppSidebar } from "./_components/app-sidebar";
import Header from "./_components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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

export default async function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const self = await auth();
  if(!self?.user) {
    redirect('/login');
  }
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
