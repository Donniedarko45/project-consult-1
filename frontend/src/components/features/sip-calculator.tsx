"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/components/ui/fade-in";
import { Calculator, IndianRupee, PieChart, TrendingUp } from "lucide-react";

export function SipCalculator() {
  const [investment, setInvestment] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [results, setResults] = useState({
    invested: 0,
    returns: 0,
    total: 0,
  });

  useEffect(() => {
    // SIP Calculation Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i)
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const investedAmount = investment * months;

    let totalValue = 0;
    if (rate === 0) {
      totalValue = investedAmount;
    } else {
      totalValue =
        investment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    setResults({
      invested: Math.round(investedAmount),
      returns: Math.round(totalValue - investedAmount),
      total: Math.round(totalValue),
    });
  }, [investment, rate, years]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">SIP Calculator</h3>
        </div>
        <p className="text-gray-500 text-sm">
          Calculate the future value of your monthly investments.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Controls Section */}
        <div className="p-8 lg:w-1/2 space-y-8">
          {/* Monthly Investment */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-gray-700 dark:text-gray-300">
                Monthly Investment
              </label>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">
                ₹ {investment.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>₹500</span>
              <span>₹1L</span>
            </div>
          </div>

          {/* Expected Return Rate */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-gray-700 dark:text-gray-300">
                Expected Return Rate (p.a)
              </label>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">
                {rate} %
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          {/* Time Period */}
          <div>
            <div className="flex justify-between mb-4">
              <label className="font-bold text-gray-700 dark:text-gray-300">
                Time Period
              </label>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg font-bold">
                {years} Years
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>1 Yr</span>
              <span>40 Yrs</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-8 lg:w-1/2 bg-gray-50 dark:bg-gray-800/50 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Invested Amount
                </span>
              </div>
              <span className="font-bold text-lg">
                {formatCurrency(results.invested)}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Est. Returns
                </span>
              </div>
              <span className="font-bold text-lg text-green-600">
                {formatCurrency(results.returns)}
              </span>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <span className="block text-sm font-semibold text-gray-500 uppercase tracking-widest mb-2">
                Total Value
              </span>
              <span className="block text-4xl lg:text-5xl font-black text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
                {formatCurrency(results.total)}
              </span>
            </div>

            <button className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-primary/25">
              Start SIP Investment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
