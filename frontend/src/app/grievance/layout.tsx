import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grievance Redressal",
  description: "Raise a complaint or grievance with our compliance team.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
