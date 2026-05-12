import { BarChart2, Package, Percent, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dailyStats, orderHistory, weeklyStats } from "../data/fakeData";
import type { Order } from "../types";

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  index: number;
}

function StatCard({
  label,
  value,
  prefix = "",
  icon,
  colorClass,
  bgClass,
  index,
}: StatCardProps) {
  const count = useCountUp(value);
  return (
    <motion.div
      data-ocid={`daily.stat_card.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-2"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgClass}`}
      >
        <span className={colorClass}>{icon}</span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-snug">
        {label}
      </p>
      <p className={`text-2xl font-bold ${colorClass}`}>
        {prefix}
        {count.toLocaleString()}
      </p>
    </motion.div>
  );
}

function statusBadge(status: Order["status"]) {
  if (status === "সম্পন্ন")
    return "text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400";
  if (status === "প্রক্রিয়াধীন")
    return "text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
  return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400";
}

const STATS = [
  {
    label: "আজকের ইনকাম",
    value: dailyStats.todayIncome,
    prefix: "৳",
    icon: <TrendingUp size={20} />,
    colorClass: "text-green-600",
    bgClass: "bg-green-100 dark:bg-green-900/30",
  },
  {
    label: "আজকের অর্ডার",
    value: dailyStats.todayOrders,
    prefix: "",
    icon: <Package size={20} />,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    label: "আজকের কমিশন",
    value: dailyStats.todayCommission,
    prefix: "৳",
    icon: <Percent size={20} />,
    colorClass: "text-purple-600",
    bgClass: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    label: "নতুন ইউজার",
    value: dailyStats.newUsers,
    prefix: "",
    icon: <Users size={20} />,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-100 dark:bg-orange-900/30",
  },
];

export default function DailyPage() {
  return (
    <motion.div
      data-ocid="daily.page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="pb-24"
    >
      {/* Page title */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <BarChart2 size={22} className="text-green-600" />
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          প্রতিদিনের রিপোর্ট
        </h1>
      </div>

      {/* 2×2 stat cards */}
      <section data-ocid="daily.stats_section" className="px-4 mt-2">
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* Weekly bar chart */}
      <motion.section
        data-ocid="daily.chart_section"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="px-4 mt-5"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-4">
            সাপ্তাহিক বিক্রয়
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={weeklyStats}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 11,
                  fill: "#6b7280",
                  fontFamily: "Hind Siliguri",
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
                }
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  fontSize: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontFamily: "Hind Siliguri",
                }}
                formatter={(val: number) => [
                  `৳${val.toLocaleString()}`,
                  "বিক্রয়",
                ]}
              />
              <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                {weeklyStats.map((stat, idx) => (
                  <Cell
                    key={stat.day}
                    fill={
                      idx === weeklyStats.length - 1 ? "#16a34a" : "#86efac"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* Sales report table */}
      <motion.section
        data-ocid="daily.table_section"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="px-4 mt-5"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200">
              বিক্রির রিপোর্ট
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <th className="py-2.5 px-3 text-left font-semibold">তারিখ</th>
                  <th className="py-2.5 px-3 text-center font-semibold">
                    অর্ডার
                  </th>
                  <th className="py-2.5 px-3 text-right font-semibold">
                    ইনকাম (৳)
                  </th>
                  <th className="py-2.5 px-3 text-right font-semibold">
                    কমিশন (৳)
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order, idx) => (
                  <tr
                    key={order.id}
                    data-ocid={`daily.table_row.${idx + 1}`}
                    className={
                      idx % 2 === 0
                        ? "bg-white dark:bg-gray-800"
                        : "bg-gray-50 dark:bg-gray-700/40"
                    }
                  >
                    <td className="py-2.5 px-3 text-gray-600 dark:text-gray-300">
                      {order.date}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusBadge(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-gray-800 dark:text-gray-100">
                      {order.amount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right text-green-600 dark:text-green-400 font-medium">
                      {Math.round(order.amount * 0.1).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
