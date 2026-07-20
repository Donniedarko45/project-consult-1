import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Placements",
  description: "Placement support and career outcomes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
