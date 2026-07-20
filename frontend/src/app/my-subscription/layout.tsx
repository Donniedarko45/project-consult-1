import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Subscription",
  description: "View and manage your active subscription.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
