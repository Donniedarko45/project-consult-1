import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mutual Funds",
  description: "Mutual fund research and advisory services.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
