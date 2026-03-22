"use client";

import { CreditCard, Download, Check } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";

export default function BillingPage() {
  const billingHistory = [
    {
      id: "INV-2024-001",
      date: "Dec 1, 2024",
      amount: "₹4,999",
      status: "Paid",
      plan: "Pro Stock Futures",
    },
    {
      id: "INV-2024-002",
      date: "Nov 1, 2024",
      amount: "₹4,999",
      status: "Paid",
      plan: "Pro Stock Futures",
    },
    {
      id: "INV-2024-003",
      date: "Oct 1, 2024",
      amount: "₹4,999",
      status: "Paid",
      plan: "Pro Stock Futures",
    },
  ];

  const plans = [
    {
      name: "Basic",
      price: "₹5",
      period: "month",
      features: ["Daily market analysis", "Email support", "Basic tools"],
      current: false,
    },
    {
      name: "Pro",
      price: "₹6",
      period: "month",
      features: [
        "All Basic features",
        "Advanced research",
        "Priority support",
        "Premium tools",
      ],
      current: true,
    },
    {
      name: "Enterprise",
      price: "₹9",
      period: "month",
      features: [
        "All Pro features",
        "Dedicated analyst",
        "Custom strategies",
        "API access",
      ],
      current: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="mb-8">
              <Link
                href="/profile"
                className="text-sm text-primary hover:underline mb-2 inline-block"
              >
                ← Back to Profile
              </Link>
              <h1 className="text-3xl font-bold text-foreground">
                Subscription & Billing
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage your subscription plan and billing information
              </p>
            </div>
          </FadeIn>

          {/* Current Plan */}
          <FadeIn delay={0.1}>
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white shadow-lg mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">
                    Current Plan
                  </p>
                  <h3 className="text-3xl font-bold mb-4">Pro Stock Futures</h3>
                  <p className="text-blue-100 text-sm opacity-80">
                    ₹4,999/month • Renews on Jan 1, 2025
                  </p>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                  Active
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Available Plans */}
          <FadeIn delay={0.2}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Available Plans
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                  <div
                    key={plan.name}
                    className={`bg-white dark:bg-gray-900 rounded-xl border-2 p-6 ${plan.current
                        ? "border-primary"
                        : "border-gray-200 dark:border-gray-800"
                      }`}
                  >
                    {plan.current && (
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                        Current Plan
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-foreground mt-4">
                      {plan.name}
                    </h3>
                    <div className="mt-4 mb-6">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-gray-500">/{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 rounded-xl font-bold transition-all ${plan.current
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                          : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : "Upgrade"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Payment Method */}
          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Payment Method
              </h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      •••• •••• •••• 4242
                    </p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <button className="text-primary hover:underline text-sm font-medium">
                  Update
                </button>
              </div>
            </div>
          </FadeIn>

          {/* Billing History */}
          <FadeIn delay={0.4}>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Billing History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Invoice
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Plan
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-gray-100 dark:border-gray-800"
                      >
                        <td className="py-4 px-4 text-sm font-medium text-foreground">
                          {invoice.id}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {invoice.date}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {invoice.plan}
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-foreground">
                          {invoice.amount}
                        </td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="text-primary hover:underline text-sm font-medium flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
