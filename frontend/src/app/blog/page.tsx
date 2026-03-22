"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/fade-in";

import { useState, useEffect } from "react";
import { BlogApi } from "@/app/Api/Api";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data: any = await BlogApi.getAllBlogs();
        setPosts(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title="Market Insights"
        description="Deep dives into market trends, technical analysis case studies, and trading psychology."
      />

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-20">
              Loading insights...
            </div>
          ) : (
            posts.map((post, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <article className="flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow h-full cursor-pointer">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 w-full relative">
                    {/* Placeholder image logic if needed */}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                      <span className="text-primary">
                        {post.tag || "General"}
                      </span>
                      <span className="text-gray-400">
                        {post.date || new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 mb-6 flex-1 text-sm leading-relaxed">
                      {post.desc ||
                        post.description ||
                        post.content?.substring(0, 100) + "..."}
                    </p>
                    <button className="text-sm font-bold text-foreground hover:underline self-start">
                      Read Article →
                    </button>
                  </div>
                </article>
              </FadeIn>
            ))
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
