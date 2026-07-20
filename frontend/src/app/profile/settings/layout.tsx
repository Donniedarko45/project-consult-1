import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Manage your account preferences and security.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
