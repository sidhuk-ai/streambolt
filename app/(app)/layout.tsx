import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar-02";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Streambolt – Go Live with Power",
  description:
    "Streambolt is the next-gen livestreaming platform for creators and audiences. Go live, engage, and grow your community with powerful tools.",
  keywords: [
    "Streambolt",
    "live streaming",
    "creator platform",
    "stream",
    "broadcast",
    "audience engagement",
    "live video",
  ],
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
        <Navbar />
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    </>
  );
}
