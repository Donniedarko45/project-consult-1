import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Ashwini SD Research account.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
