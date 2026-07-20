import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Direction Service",
  description: "Daily market direction and trend analysis.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
