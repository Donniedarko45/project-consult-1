import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash Intraday Service",
  description: "Intraday research calls in the cash segment.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
