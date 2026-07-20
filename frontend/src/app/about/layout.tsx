import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Ashwini SD Research, our team and our SEBI-registered research practice.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
