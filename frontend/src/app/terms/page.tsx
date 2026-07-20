import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of our services.",
};

export default function TermsPage() {
  return (
    <>
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Terms & Conditions"
        description="Please read these Terms & Conditions carefully before subscribing to any of our services."
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        {[
          {
            title: "📌 Introduction",
            content: "Please read these Terms & Conditions carefully before subscribing to any of our services. By accessing or using our services, you agree to be bound by the terms outlined below.",
          },
          {
            title: "📊 Nature of Services",
            content: "We provide research-based insights and market analysis through platforms such as Telegram, WhatsApp, and other digital channels. All services are offered strictly for educational and research purposes only and should not be considered as investment advice.",
          },
          {
            title: "💰 Subscription & Payment Policy",
            content: "• All subscription fees are non-refundable under any circumstances\n• Once a service is subscribed, it cannot be canceled or transferred\n• Access to services will be provided only after successful payment confirmation",
          },
          {
            title: "⚠️ Risk Disclosure",
            content: "• Investments in the securities market are subject to market risks\n• We do not guarantee any returns or profits\n• All research-based setups are subject to market volatility\n• Client outcomes may vary based on individual execution and market conditions",
          },
          {
            title: "🔁 No Refund Policy",
            content: "Due to the nature of our services:\n• No refunds will be provided regardless of performance\n• Market conditions and outcomes are beyond our control\n• Subscription fees once paid are final and binding",
          },
          {
            title: "🚫 Limitation of Liability",
            content: "We shall not be held liable for:\n• Any financial losses incurred based on our research content\n• Delays, interruptions, or failures in communication channels\n• Technical issues beyond our control (internet, platforms, etc.)",
          },
          {
            title: "🔄 Modification of Services",
            content: "We reserve the right to:\n• Modify or discontinue any service without prior notice\n• Update or change Terms & Conditions at any time\n• Restrict or cancel access to any user at our sole discretion",
          },
          {
            title: "👤 User Responsibilities",
            content: "By using our services, you agree to:\n• Provide accurate and complete personal information\n• Use the services only for lawful purposes\n• Not misuse, copy, or redistribute our research content",
          },
          {
            title: "📡 Communication & Technology",
            content: "Due to the nature of online services:\n• Communication may be subject to delays or interruptions\n• We are not responsible for issues caused by external platforms\n• Delivery of messages may depend on third-party services",
          },
          {
            title: "🚷 Service Restrictions",
            content: "We reserve the right to:\n• Refuse or cancel any subscription\n• Restrict access if misuse or suspicious activity is detected\n• Limit services to individuals, and not allow resale or redistribution",
          },
          {
            title: "📧 Account Information",
            content: "You agree to:\n• Provide current, complete, and accurate account details\n• Update your contact information as required\n• Ensure accessibility for communication regarding your subscription",
          },
          {
            title: "⚖️ Governing Policy",
            content: "All services are provided in compliance with applicable regulations. Users are advised to make independent decisions after evaluating all risks.",
          },
          {
            title: "📢 Acceptance of Terms",
            content: "By subscribing to our services, you confirm that:\n• You have read and understood all Terms & Conditions\n• You agree to abide by all policies stated on this website",
          },
        ].map((section, index) => (
          <FadeIn key={index} delay={index * 0.05}>
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

        <FadeIn delay={0.7}>
          <div className="p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 text-center">
            <h2 className="text-primary font-bold text-xl">
              💡 Final Note
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg italic">
              "Discipline, risk management, and informed decision-making are key to market success."
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
    <Footer />
    </>
  );
}
