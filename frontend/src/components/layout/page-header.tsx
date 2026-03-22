"use client";

import { FadeIn } from "@/components/ui/fade-in";

interface PageHeaderProps {
  title: React.ReactNode | string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative bg-primary py-12 md:py-20 z-10 overflow-hidden">
      {/* Background Gradients/Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-900 opacity-90" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

      <div className="container mx-auto px-4 text-center relative z-20">
        <FadeIn>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
            {description}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
