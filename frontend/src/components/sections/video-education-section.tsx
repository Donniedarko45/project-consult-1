"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { PlayCircle } from "lucide-react";
import Image from "next/image";

export function VideoEducationSection() {
  const videos = [
    {
      title: "Basics of Stock Market",
      thumbnail: "/images/dashboard.png", // Reusing existing assets for demo
      duration: "10:05",
      type: "Beginner",
    },
    {
      title: "How to Trade Options Safely",
      thumbnail: "/images/bull-market.png", // Reusing existing assets for demo
      duration: "15:30",
      type: "Intermediate",
    },
    {
      title: "Risk Management 101",
      thumbnail: "/images/dashboard.png",
      duration: "08:45",
      type: "Essential",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Free Market Education
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We believe in empowering traders. Watch our latest educational
            videos to sharpen your skills.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 cursor-pointer">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-20">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <span className="text-xs font-semibold text-primary dark:text-blue-400 mb-2 block uppercase tracking-wider">
                    {video.type}
                  </span>
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full border border-primary text-primary dark:text-blue-400 font-semibold hover:bg-primary/5 dark:hover:bg-blue-400/10 transition-colors">
            View All Videos
          </button>
        </div>
      </div>
    </section>
  );
}
