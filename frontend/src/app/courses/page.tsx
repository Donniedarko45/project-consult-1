"use client";

import { Footer } from "@/components/layout/footer";
import { Calendar, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { FloatingIcons } from "@/components/ui/floating-icons";
import { PageHeader } from "@/components/layout/page-header";

import { useState, useEffect } from "react";
import { CoursesApi } from "@/app/Api/Api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data: any = await CoursesApi.getAllCourses();
        setCourses(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingIcons />
      <PageHeader
        title="Trading Courses"
        description="Upgrade your skills with our structured educational programs."
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 text-center py-20">
              Loading courses...
            </div>
          ) : (
            courses.map((course, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col hover:shadow-xl transition-shadow h-full">
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-xs font-bold px-2 py-1 rounded">
                        {course.level}
                      </span>
                      <span className="text-xl font-bold text-foreground">
                        {course.price}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      {course.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" /> {course.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" /> {course.sessions}
                      </div>
                    </div>

                    <hr className="border-gray-100 dark:border-gray-800 mb-6" />

                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {(course.features || []).map(
                        (feature: any, idx: number) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-cta rounded-full mr-2" />
                            {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={async () => {
                        try {
                          await CoursesApi.enroll(course._id || course.id); // Assuming ID field
                          alert("Enrollment request sent!");
                        } catch (e) {
                          alert("Enrollment failed. Please try again.");
                        }
                      }}
                      className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-colors"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))
          )}
        </div>
      </div>
      <Footer />
    </main>
  
  );
}
