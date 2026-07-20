import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equity Swing Service",
  description: "Multi-day equity swing trading research.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
