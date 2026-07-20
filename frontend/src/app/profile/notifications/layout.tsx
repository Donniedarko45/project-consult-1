import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification Settings",
  description: "Choose which updates you receive.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
