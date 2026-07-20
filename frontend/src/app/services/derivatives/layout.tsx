import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Derivatives (F&O) Service",
  description: "Futures and options research and strategies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
