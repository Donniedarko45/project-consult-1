import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTST Trading Service",
  description: "Buy Today Sell Tomorrow research calls.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
