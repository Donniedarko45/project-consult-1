import { TrustStrip } from "@/components/sections/trust-strip";
import { TelegramPromo } from "@/components/sections/telegram-promo";
import { AboutSection } from "@/components/sections/about-section";
import { CoursesPreview } from "@/components/sections/courses-preview";
import { VideoEducationSection } from "@/components/sections/video-education-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/layout/footer";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { WorkshopsSection } from "@/components/sections/workshops-section";
import { FadeIn } from "@/components/ui/fade-in";
import { Video, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingIcons />
      <HeroSection />
      <TrustStrip />
      <TelegramPromo />
      <AboutSection />
      <CoursesPreview />
      <VideoEducationSection /> 
       <ServicesSection />

       <WorkshopsSection />

      <WhyChooseUs />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
