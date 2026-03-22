"use client";

import { ShieldCheck, TrendingUp, Lock, Scale } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "SEBI Registered",
    description: "Fully compliant research analyst",
  },
  {
    icon: TrendingUp,
    title: "F&O Focused",
    description: "Specialized in Derivatives",
  },
  {
    icon: Lock,
    title: "Risk Managed",
    description: "Capital protection first approach",
  },
  {
    icon: Scale,
    title: "Ethical Research",
    description: "Transparent and unbiased",
  },
];

export function TrustStrip() {
  return (
    <section className="py-12 bg-background border-y border-gray-100 dark:border-gray-800">
      <FadeIn>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-3 group cursor-default"
              >
                <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <point.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
