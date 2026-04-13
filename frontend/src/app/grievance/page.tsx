import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { FadeIn } from "@/components/ui/fade-in";
import { Mail, Phone, Clock, ShieldCheck } from "lucide-react";

export default function GrievancePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHeader
        title="Grievance Redressal"
        description="We are committed to providing transparent, ethical, and professional services."
      />

      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-8">
        <FadeIn>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
              <ShieldCheck className="text-primary h-8 w-8" />
              📌 Our Commitment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              We are committed to providing transparent, ethical, and professional services. If you have any concerns or complaints, we encourage you to reach out to us.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              📧 How to Raise a Complaint
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              You can contact us through:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <Mail className="text-primary h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="font-bold text-foreground">ashwini@ashwinisdresearch.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <Phone className="text-primary h-6 w-6" />
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">Phone</p>
                  <p className="font-bold text-foreground">+91 98459 61990</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-bold text-foreground">Please include:</p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 text-lg">
                <li>Your Name</li>
                <li>Contact Details</li>
                <li>Description of the issue</li>
                <li>Supporting documents (if any)</li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full">
              <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Clock className="text-primary h-6 w-6" />
                ⏱️ Resolution Timeline
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 text-lg space-y-4">
                <li>• We aim to acknowledge complaints within 24–48 hours</li>
                <li>• Resolution will be provided within a reasonable timeframe</li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm h-full">
              <h2 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                ⚖️ Escalation
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                If the issue is not resolved satisfactorily, you may escalate it through appropriate regulatory channels.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <div className="p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 text-center">
            <p className="text-primary font-bold text-xl uppercase tracking-wide">
              🤝 Our Assurance
            </p>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-lg italic">
              "We strive to handle all concerns in a fair, transparent, and timely manner, ensuring the best possible resolution."
            </p>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
