import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Live and online trading workshops.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
