import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshop Enquiry",
  description: "Enquire about upcoming trading workshops.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
