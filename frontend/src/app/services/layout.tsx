import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Our Services",
    template: "%s | Ashwini SD Research",
  },
  description: "Explore our research and advisory services across equity and derivatives.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
