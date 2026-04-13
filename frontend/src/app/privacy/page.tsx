import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Privacy Policy"
        description="We are committed to protecting your personal information and ensuring transparency in how your data is used."
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        {[
          {
            title: "📌 Introduction",
            content: "We are committed to protecting your personal information and ensuring transparency in how your data is used.",
          },
          {
            title: "📊 Information We Collect",
            content: "We may collect the following details:\n• Name\n• Phone Number\n• Email Address\n• Payment details (processed via secure third-party gateways)",
          },
          {
            title: "🎯 Use of Information",
            content: "Your information is used for:\n• Providing access to our services\n• Communication and support\n• Sending updates related to subscriptions\n• Improving our services",
          },
          {
            title: "🔒 Data Protection",
            content: "We implement appropriate security measures to protect your data. However, no online transmission is 100% secure.",
          },
          {
            title: "🔁 Sharing of Information",
            content: "We do not sell or share your personal information with third parties, except:\n• When required by law\n• For payment processing through secure platforms",
          },
          {
            title: "📧 Communication",
            content: "By subscribing, you agree to receive communication via WhatsApp, Telegram, Email, or Calls.",
          },
          {
            title: "🔄 Updates to Policy",
            content: "We reserve the right to update this policy at any time. Continued use of services implies acceptance of changes.",
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
      </div>
      <Footer />
    </main>
  );
}
