"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Building, Upload, Award } from "lucide-react";

export default function PlacementsPage() {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Career Placements"
        description="Connecting certified talent with top financial institutions. Your gateway to a career in Capital Markets."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-20">
          <FadeIn>
            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Building className="w-6 h-6 text-primary" />
                For Job Seekers
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Exclusive access to proprietary desk openings",
                  "Resume review by industry veterans",
                  "Mock interview preparation",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" /> Upload Resume
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="w-6 h-6 text-orange-500" />
                Hiring Partners
              </h2>
              <p className="text-gray-500 mb-8">
                We place candidates in top brokerage houses, proprietary trading
                desks, and research firms.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "HDFC Securities",
                  "Motilal Oswal",
                  "Zerodha",
                  "Various Prop Desks",
                ].map((partner, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl text-center font-bold text-gray-400 text-sm border border-gray-100 dark:border-gray-700"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </main>

  );
}
