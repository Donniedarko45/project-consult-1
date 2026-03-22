"use client";

import { useState } from "react";
import { Bell, Mail, Smartphone } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    research: true,
    trading: true,
    account: true,
    marketing: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    research: true,
    trading: false,
    account: true,
  });

  const [frequency, setFrequency] = useState("daily");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="mb-8">
              <Link
                href="/profile"
                className="text-sm text-primary hover:underline mb-2 inline-block"
              >
                ← Back to Profile
              </Link>
              <h1 className="text-3xl font-bold text-foreground">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage how you receive updates and alerts
              </p>
            </div>
          </FadeIn>

          {/* Email Notifications */}
          <FadeIn delay={0.1}>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Email Notifications
                  </h2>
                  <p className="text-sm text-gray-500">
                    Choose what updates you want to receive via email
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-medium text-foreground">
                      Research Updates
                    </p>
                    <p className="text-sm text-gray-500">
                      New research reports and market analysis
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications.research}
                      onChange={(e) =>
                        setEmailNotifications({
                          ...emailNotifications,
                          research: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-medium text-foreground">
                      Trading Signals
                    </p>
                    <p className="text-sm text-gray-500">
                      Buy/sell recommendations and alerts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications.trading}
                      onChange={(e) =>
                        setEmailNotifications({
                          ...emailNotifications,
                          trading: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-medium text-foreground">
                      Account Activity
                    </p>
                    <p className="text-sm text-gray-500">
                      Login alerts and security updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications.account}
                      onChange={(e) =>
                        setEmailNotifications({
                          ...emailNotifications,
                          account: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      Marketing & Promotions
                    </p>
                    <p className="text-sm text-gray-500">
                      Special offers and new features
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications.marketing}
                      onChange={(e) =>
                        setEmailNotifications({
                          ...emailNotifications,
                          marketing: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Push Notifications */}
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Push Notifications
                  </h2>
                  <p className="text-sm text-gray-500">
                    Instant alerts on your device
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-medium text-foreground">
                      Research Updates
                    </p>
                    <p className="text-sm text-gray-500">
                      Instant notifications for new reports
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushNotifications.research}
                      onChange={(e) =>
                        setPushNotifications({
                          ...pushNotifications,
                          research: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="font-medium text-foreground">
                      Trading Signals
                    </p>
                    <p className="text-sm text-gray-500">
                      Real-time trading alerts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushNotifications.trading}
                      onChange={(e) =>
                        setPushNotifications({
                          ...pushNotifications,
                          trading: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      Account Activity
                    </p>
                    <p className="text-sm text-gray-500">
                      Security and login alerts
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushNotifications.account}
                      onChange={(e) =>
                        setPushNotifications({
                          ...pushNotifications,
                          account: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Notification Frequency */}
          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Email Digest Frequency
                  </h2>
                  <p className="text-sm text-gray-500">
                    How often should we send you email summaries?
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {["instant", "daily", "weekly", "never"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={option}
                      checked={frequency === option}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <div>
                      <p className="font-medium text-foreground capitalize">
                        {option}
                      </p>
                      <p className="text-sm text-gray-500">
                        {option === "instant" &&
                          "Receive emails as events happen"}
                        {option === "daily" &&
                          "One email per day with all updates"}
                        {option === "weekly" &&
                          "Weekly summary of all activity"}
                        {option === "never" && "No email digests"}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <button className="mt-6 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors">
                Save Preferences
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
