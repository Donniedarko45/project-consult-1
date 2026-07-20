import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smallcase Portfolios",
  description: "Curated smallcase model portfolios.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
