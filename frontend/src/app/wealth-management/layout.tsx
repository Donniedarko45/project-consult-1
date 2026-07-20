import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wealth Management",
  description: "Long-term wealth management and portfolio advisory.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
