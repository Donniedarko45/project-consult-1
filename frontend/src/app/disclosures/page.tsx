import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";

export default function DisclosuresPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Regulatory Disclosures"
        description="Compliance information as per SEBI (Research Analyst) Regulations, 2014."
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl text-sm leading-relaxed space-y-8">
        {[
          {
            title: "1. Research Analyst Registration",
            content:
              "We are registered with the Securities and Exchange Board of India (SEBI) as a Research Analyst with Registration Number INZ000000000.",
          },
          {
            title: "2. Business Activity",
            content:
              "We are engaged in the business of providing Research Services to clients. We are not engaged in any other business activities like Merchant Banking, Investment Banking, or Portfolio Management Services.",
          },
          {
            title: "3. Disciplinary History",
            content:
              "There are no outstanding litigations or no disciplinary action has been taken against us by SEBI or any other regulatory authority.",
          },
          {
            title: "4. Terms and Conditions for Research Report",
            content:
              "The Research Report is for the personal information of the authorized recipient and is not for public distribution. The report is based on publicly available information, internal data, and other sources believed to be reliable. However, we do not represent that it is accurate or complete.",
          },
        ].map((section, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-bold mb-3 text-foreground">
                {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-base">
                {section.content}
              </p>
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0.4}>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-foreground">
              5. Disclosure of Interest
            </h2>
            <ul className="space-y-3">
              {[
                "Whether the Research Analyst has any financial interest in the subject company",
                "Whether the Research Analyst has actual/beneficial ownership of 1% or more securities of the subject company",
                "Whether the Research Analyst has any other material conflict of interest",
                "Whether the Research Analyst has received any compensation from the subject company in the past 12 months",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-base border-b border-gray-50 dark:border-gray-800 pb-2 last:border-0 last:pb-0"
                >
                  <span>{item}</span>
                  <span className="font-bold text-primary dark:text-blue-400 bg-primary/5 dark:bg-blue-900/20 px-3 py-1 rounded-full text-xs">
                    NO
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-xl text-sm mt-8 border border-amber-100 dark:border-amber-900/20 text-amber-900 dark:text-amber-100">
            <p className="font-bold mb-2 uppercase tracking-wide">
              Standard Warning:
            </p>
            <p>
              Investment in securities market are subject to market risks. Read
              all the related documents carefully before investing. Registration
              granted by SEBI and certification from NISM in no way guarantee
              performance of the intermediary or provide any assurance of
              returns to investors.
            </p>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
    
  );
}
