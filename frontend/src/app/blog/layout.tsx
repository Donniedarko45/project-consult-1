import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Market insights, trading education and research commentary.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
