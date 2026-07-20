import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description: "Structured stock market and trading courses.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
