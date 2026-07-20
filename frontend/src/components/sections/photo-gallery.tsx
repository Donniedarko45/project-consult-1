"use client";

import { FadeIn } from "@/components/ui/fade-in";
import Image from "next/image";

export function PhotoGallery() {
  const photos = [
    "/images/photo_gallery_1.png",
    "/images/photo_gallery_2.png",
    "/images/photo_gallery_3.png",
    "/images/photo_gallery_4.png"
  ];

  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-4">
            Our World in <span className="text-primary italic">Focus</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse into our trading desk, market insights, and real action.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {photos.map((src, index) => (
            <FadeIn key={index} delay={index * 0.1} className="relative aspect-square group overflow-hidden rounded-3xl border border-gray-100 dark:border-white/5">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <Image
                src={src}
                alt=""
                aria-hidden="true"
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
