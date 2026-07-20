import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Tools",
  description: "Calculators and tools for traders and investors.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
