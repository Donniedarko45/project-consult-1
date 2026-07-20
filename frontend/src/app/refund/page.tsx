import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our policy on subscription fees and refunds.",
};

export default function RefundPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Refund Policy"
        description="All subscription fees paid for our services are non-refundable under any circumstances."
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        {[
          {
            title: "📌 Policy Overview",
            content: "All subscription fees paid for our services are non-refundable under any circumstances.",
          },
          {
            title: "⚠️ Important Points",
            content: "• No refunds will be provided once payment is made\n• Services cannot be canceled or transferred after subscription\n• Market performance does not qualify for refund claims",
          },
          {
            title: "📊 Nature of Services",
            content: "Our services are research-based and informational, and outcomes depend on market conditions and individual decisions.",
          },
          {
            title: "🚫 No Guarantee",
            content: "We do not guarantee profits or returns. Therefore, no refund requests will be entertained based on performance.",
          },
        ].map((section, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                {section.title}
              </h2>
              <div className="text-gray-600 dark:text-gray-400 text-lg whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0.5}>
          <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20 text-center">
            <h2 className="text-red-600 dark:text-red-400 font-bold text-xl uppercase tracking-wide">
              📢 Final Note
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg">
              By subscribing, you acknowledge and agree to this refund policy.
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
    <Footer />
    </>
  );
}
