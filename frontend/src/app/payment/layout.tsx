import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Payment",
    template: "%s | Ashwini SD Research",
  },
  description: "Complete your subscription payment securely.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
