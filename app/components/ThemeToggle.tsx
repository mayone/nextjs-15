"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      // 移除手動主題設置，讓系統偏好生效
      root.removeAttribute("data-theme");
    } else {
      // 設置手動主題
      root.setAttribute("data-theme", theme);
    }

    // 保存到 localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return "☀️";
      case "dark":
        return "🌙";
      case "system":
        return "💻";
      default:
        return "💻";
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "淺色";
      case "dark":
        return "深色";
      case "system":
        return "系統";
      default:
        return "系統";
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors hover:bg-gray-300 dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm cursor-pointer"
      title={`當前主題: ${getThemeLabel()}`}
    >
      <span className="text-lg">{getThemeIcon()}</span>
      <span>{getThemeLabel()}</span>
    </button>
  );
}
