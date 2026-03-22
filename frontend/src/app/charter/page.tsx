import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";
import { ShieldCheck, Eye, BookOpen, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function CharterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Investor Charter"
        description="Our commitment to transparency and investor protection as prescribed by SEBI."
      />

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Intro Split Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-16">
          <div className="lg:w-1/2">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Dedicated to Your Safety
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We believe that trust is the currency of the financial markets.
                Our operations are strictly governed by SEBI regulations to
                ensure your interests are always protected.
              </p>
              <div className="p-4 bg-primary/5 dark:bg-blue-900/10 border-l-4 border-primary rounded-r-lg">
                <p className="text-sm font-medium italic text-gray-700 dark:text-gray-300">
                  "Transparency isn't just a requirement; it's our philosophy."
                </p>
              </div>
            </FadeIn>
          </div>
          <div className="lg:w-1/2">
            <FadeIn direction="left">
              <div className="relative rounded-full overflow-hidden shadow-2xl bg-gradient-to-tr from-blue-100 to-white dark:from-gray-800 dark:to-gray-900 aspect-square max-w-md mx-auto flex items-center justify-center p-8 border-8 border-white dark:border-gray-800">
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse rounded-full" />
                <Image
                  src="/images/investor-shield.png"
                  alt="Investor Protection Shield"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-700"
                />
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm h-full hover:border-primary/50 transition-colors">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary dark:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-4">
                <Eye className="w-6 h-6" />
                A. Vision and Mission Statements
              </h2>
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground">Vision</h3>
                  <p className="leading-relaxed">
                    Invest with knowledge & safety.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground">Mission</h3>
                  <p className="leading-relaxed">
                    Every investor should be able to invest in right investment
                    products based on their needs, manage and monitor them to
                    meet their goals, access reports and enjoy financial
                    wellness.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm h-full hover:border-primary/50 transition-colors">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary dark:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-4">
                <ShieldCheck className="w-6 h-6" />
                B. Business Activities
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {[
                  "To publish research report based on the research activities of the RA.",
                  "To provide an independent objective and unbiased analysis of securities.",
                  "To offer recommendations based on analysis of publicly available information.",
                  "To distribute research reports to clients without discrimination.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cta mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm h-full hover:border-primary/50 transition-colors">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary dark:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-4">
                <BookOpen className="w-6 h-6" />
                C. Services Provided
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {[
                  "Onboarding of Clients.",
                  "Disclosure to Clients.",
                  "To distribute research reports to the clients.",
                  "To maintain confidentiality with respect to publication of the research report.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cta mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm h-full hover:border-primary/50 transition-colors">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-primary dark:text-blue-400 border-b border-gray-100 dark:border-gray-800 pb-4">
                <AlertTriangle className="w-6 h-6" />
                D. Investor Responsibilities
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {[
                  "Do's and Don'ts for Investors.",
                  "Maintenance of digital hygiene.",
                  "Always deal with SEBI registered Research Analyst.",
                  "Ensure that the Research Analyst uses an official approved communication channel.",
                  "Don't fall prey to the claims of guaranteed returns.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-cta mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </main>
 
  );
}
