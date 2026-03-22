"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  BarChart2,
  PieChart,
  Activity,
  Briefcase,
} from "lucide-react";

export function FloatingIcons() {
  const icons = [
    { Icon: TrendingUp, delay: 0, x: "10%", y: "20%" },
    { Icon: DollarSign, delay: 2, x: "80%", y: "15%" },
    { Icon: BarChart2, delay: 4, x: "20%", y: "70%" },
    { Icon: PieChart, delay: 1, x: "70%", y: "60%" },
    { Icon: Activity, delay: 3, x: "40%", y: "30%" },
    { Icon: Briefcase, delay: 5, x: "85%", y: "80%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/5 dark:text-primary/10"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut",
          }}
          style={{ left: x, top: y }}
        >
          <Icon size={64} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
}
