"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const data = [
  { name: "Jan", value: 400, sales: 240 },
  { name: "Feb", value: 300, sales: 139 },
  { name: "Mar", value: 200, sales: 980 },
  { name: "Apr", value: 278, sales: 390 },
  { name: "May", value: 189, sales: 480 },
  { name: "Jun", value: 239, sales: 380 },
  { name: "Jul", value: 349, sales: 430 },
];

export default function SimpleLineChart() {
  const [themeColors, setThemeColors] = useState({
    foreground: "#171717",
    background: "#ffffff",
    border: "#e5e5e5",
    mutedForeground: "#737373",
  });

  useEffect(() => {
    const updateThemeColors = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);

      setThemeColors({
        foreground:
          computedStyle.getPropertyValue("--foreground").trim() || "#171717",
        background:
          computedStyle.getPropertyValue("--background").trim() || "#ffffff",
        border: computedStyle.getPropertyValue("--border").trim() || "#e5e5e5",
        mutedForeground:
          computedStyle.getPropertyValue("--muted-foreground").trim() ||
          "#737373",
      });
    };

    // 初始設置
    updateThemeColors();

    // 監聽主題變化
    const observer = new MutationObserver(updateThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-[500px] p-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-foreground">
        Sales Data Chart
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={themeColors.mutedForeground}
            opacity={0.3}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: themeColors.foreground }}
            axisLine={{ stroke: themeColors.border }}
            tickLine={{ stroke: themeColors.border }}
          />
          <YAxis
            tick={{ fill: themeColors.foreground }}
            axisLine={{ stroke: themeColors.border }}
            tickLine={{ stroke: themeColors.border }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: themeColors.background,
              border: `1px solid ${themeColors.border}`,
              borderRadius: "6px",
              color: themeColors.foreground,
            }}
            labelStyle={{ color: themeColors.foreground }}
          />
          <Legend wrapperStyle={{ color: themeColors.foreground }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
            name="Value"
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Sales"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
