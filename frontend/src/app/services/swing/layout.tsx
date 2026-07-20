import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swing Trading Service",
  description: "Positional swing trading research.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
