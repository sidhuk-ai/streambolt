import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login to Streambolt",
  description:
    "Access your Streambolt dashboard to start livestreaming and managing your content.",
  openGraph: {
    title: "Login to Streambolt",
    description: "Securely access your Streambolt account.",
    siteName: "Streambolt",
  },
  twitter: {
    title: "Login to Streambolt",
    description: "Enter your account and start streaming with Streambolt.",
  },
};

export default function AuthenticationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
