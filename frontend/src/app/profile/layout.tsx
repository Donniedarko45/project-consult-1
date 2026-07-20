import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "My Profile",
    template: "%s | Ashwini SD Research",
  },
  description: "View and update your account profile.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
