import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";
import { 
  Eye, 
  Target, 
  Layers, 
  Scale, 
  ClipboardCheck, 
  AlertTriangle, 
  Search, 
  PhoneCall,
  CheckCircle,
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart,
  ListFilter
} from "lucide-react";

export default function InvestmentCharterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Investment Charter"
        description="Empowering investors with transparency, disciplined research, and informed decision-making."
      />

      <div className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full hover:border-primary/30 transition-colors">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Eye className="text-primary h-8 w-8" />
                Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                To empower investors and traders with research-driven insights, transparency, and disciplined market understanding, enabling them to make informed financial decisions.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full hover:border-primary/30 transition-colors">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Target className="text-primary h-8 w-8" />
                Mission
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed space-y-3 list-disc list-inside">
                <li>To provide unbiased and well-researched market analysis</li>
                <li>To maintain integrity, transparency, and ethical practices</li>
                <li>To help clients understand risk before returns</li>
                <li>To promote financial literacy and informed participation in markets</li>
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Our Services */}
        <FadeIn delay={0.2}>
          <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:border-primary/30 transition-colors">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
              <Layers className="text-primary h-8 w-8" />
              Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              We offer research-based insights in the following segments:
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: BarChart3, title: "Equity (Cash Market) Research Setups" },
                { icon: TrendingUp, title: "Intraday & Swing Trade Setups (Research-Based)" },
                { icon: PieChart, title: "Derivatives (F&O) Analysis" },
                { icon: LineChart, title: "Market Outlook & Trend Analysis" },
                { icon: ListFilter, title: "Watchlists & Key Levels Identification" }
              ].map((service, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                   <service.icon className="h-6 w-6 text-primary shrink-0 mt-1" />
                   <span className="font-semibold text-gray-800 dark:text-gray-200">{service.title}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-xl">
               <p className="text-yellow-800 dark:text-yellow-200 font-medium italic">
                 All services are provided strictly for educational and research purposes only.
               </p>
            </div>
          </div>
        </FadeIn>

        {/* Rights and Responsibilities */}
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full hover:border-primary/30 transition-colors">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                <Scale className="text-primary h-8 w-8" />
                Investor Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">As a client, you have the right to:</p>
              <ul className="text-gray-600 dark:text-gray-400 text-lg space-y-4">
                {[
                  "Receive fair, transparent, and unbiased research",
                  "Be informed about all material risks associated with markets",
                  "Access clear disclosures regarding conflicts of interest",
                  "Receive timely communication and updates",
                  "Raise queries and receive appropriate support"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full hover:border-primary/30 transition-colors">
              <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                <ClipboardCheck className="text-primary h-8 w-8" />
                Investor Responsibilities
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">As a client, you are expected to:</p>
              <ul className="text-gray-600 dark:text-gray-400 text-lg space-y-4">
                {[
                  "Carefully read all disclosures, disclaimers, and terms",
                  "Understand that markets are subject to risk and volatility",
                  "Take decisions based on your own judgment and risk appetite",
                  "Avoid relying solely on research content for execution decisions",
                  "Maintain discipline and avoid emotional trading"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle className="h-6 w-6 text-blue-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <FadeIn delay={0.5}>
             <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 h-full">
                <AlertTriangle className="text-red-500 h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Risk Disclosure</h3>
                <ul className="text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                  <li>Investments are subject to market risks</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>No assurance of profit or protection from losses</li>
                  <li>Markets change rapidly due to global factors</li>
                </ul>
             </div>
          </FadeIn>

          <FadeIn delay={0.6}>
             <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 h-full">
                <Search className="text-blue-500 h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Transparency</h3>
                <ul className="text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                  <li>Complete transparency in our research approach</li>
                  <li>Potential conflicts of interest will be disclosed</li>
                  <li>We do not provide assured returns or guarantees</li>
                </ul>
             </div>
          </FadeIn>

          <FadeIn delay={0.7}>
             <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 h-full">
                <PhoneCall className="text-primary h-8 w-8 mb-4" />
                <h3 className="text-xl font-bold mb-3 text-foreground">Grievance Redressal</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  If you have complaints or concerns, reach us at:
                </p>
                <div className="space-y-2 font-medium">
                  <p className="text-foreground">📧 ashwini@ashwinisdresearch.com</p>
                  <p className="text-foreground">📞 +91 98459 61990</p>
                </div>
             </div>
          </FadeIn>
        </div>

        {/* Declaration */}
        <FadeIn delay={0.8}>
          <div className="p-8 md:p-12 bg-white dark:bg-gray-900 rounded-3xl border-2 border-primary/20 text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-tr-full pointer-events-none" />
            
            <h3 className="text-xl font-bold mb-4 text-primary uppercase tracking-wider relative z-10">Declaration</h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl font-medium mb-8 max-w-3xl mx-auto relative z-10">
              This Investment Charter is designed to ensure fair practices, transparency, and investor awareness in line with regulatory expectations.
            </p>
            <div className="inline-block px-8 py-4 bg-gray-50 dark:bg-gray-800 rounded-xl italic font-serif text-xl border-l-4 border-primary shadow-sm relative z-10 text-gray-800 dark:text-gray-200 w-full max-w-2xl">
              "Informed decisions create sustainable success in the market."
            </div>
          </div>
        </FadeIn>

      </div>
      <Footer />
    </main>
  );
}
