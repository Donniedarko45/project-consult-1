import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Disclaimer & Disclosure"
        description="Regulatory information and risk disclosures as per SEBI guidelines."
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        {[
          {
            title: "📌 Disclaimer",
            content: "We are a SEBI Registered Research Analyst (Reg. No: INH000024453). All information provided through our services is strictly for educational and research purposes only.",
          },
          {
            title: "⚠️ No Investment Advice",
            content: "• We do not provide personalized investment advice\n• We do not guarantee any returns or profits\n• Users are advised to take decisions at their own discretion",
          },
          {
            title: "📉 Market Risk",
            content: "Investments in the securities market are subject to market risks. Past performance does not guarantee future results.",
          },
          {
            title: "📊 Research Nature",
            content: "All calls, setups, and insights shared are:\n• Based on analysis and market study\n• Subject to change based on market conditions\n• Not binding recommendations",
          },
          {
            title: "🔍 Disclosure",
            content: "• We may or may not hold positions in the stocks discussed\n• Any conflict of interest will be disclosed wherever applicable",
          },
          {
            title: "📢 User Responsibility",
            content: "Users are responsible for their own trading and investment decisions.",
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

        <FadeIn delay={0.7}>
          <div className="p-8 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20 text-center">
            <p className="text-amber-700 dark:text-amber-400 font-bold text-xl uppercase tracking-wide">
              💡 Final Statement
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg italic">
              "Trade responsibly. Understand the risks before participating in the market."
            </p>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
