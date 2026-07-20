import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intraday Trading Service",
  description: "Same-day intraday research calls.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
