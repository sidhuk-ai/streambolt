import { Metadata } from "next";
import { ReactNode } from "react";

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
    return(
        <>
        </>
    )
}
