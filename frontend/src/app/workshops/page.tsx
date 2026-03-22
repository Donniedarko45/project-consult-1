"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";
import { Calendar, Clock, PlayCircle, CheckCircle } from "lucide-react";

import { useState, useEffect } from "react";
import { WorkshopsApi } from "@/app/Api/Api";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data: any = await WorkshopsApi.getAllWorkshops();
        setWorkshops(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch workshops", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Workshops & Webinars"
        description="Learn directly from market experts through our interactive live workshops. Master the strategies that drive institutional success."
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Featured Live Workshop */}
        <section className="mb-24">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
              Upcoming Live Sessions
            </h2>
          </FadeIn>

          <FadeIn>
            <div className="bg-primary text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                <div className="lg:w-2/3">
                  <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
                    THIS WEEKEND SPECIAL
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold mb-6">
                    The Option Seller's Playbook
                  </h3>
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                    Stop gambling with buying. Learn how to generate consistent
                    weekly income by selling options with defined risk. We cover
                    adjustments, hedging, and margin management.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-200">Date</p>
                        <p className="font-bold">Saturday, Oct 28</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-200">Time</p>
                        <p className="font-bold">10:00 AM - 01:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                    Register for ₹10
                  </button>
                </div>

                <div className="lg:w-1/3 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                  <h4 className="font-bold text-xl mb-4 text-blue-200">
                    What You'll Learn:
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Directional vs Non-Directional Selling",
                      "The 'Iron Condor' Adjustment Technique",
                      "Managing Gap Ups/Downs",
                      "Live Simulation on Simulator",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Recorded Library */}
        <section>
          <FadeIn>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                Recorded Library
              </h2>
              <button className="text-primary font-bold hover:underline">
                View All Recordings
              </button>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div>Loading...</div>
            ) : (
              workshops.map((vid, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
                    <div className="h-48 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-gray-700 transition-colors">
                      <PlayCircle className="w-16 h-16 text-primary opacity-80 group-hover:scale-110 transition-transform" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {vid.duration || "1h 30m"}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold text-primary mb-2 uppercase">
                        {vid.level || "General"}
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {vid.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {vid.description ||
                          "Full HD recording with Q&A session pdf included."}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
