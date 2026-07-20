import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High Conviction Service",
  description: "Our highest-conviction research ideas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
