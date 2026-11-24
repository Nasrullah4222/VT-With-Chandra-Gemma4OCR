import React from "react";
import { Sun, Moon } from "lucide-react";
export const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      id="theme-toggle-btn"
    >
      {darkMode ? (
        <Sun className="w-3.5 h-3.5" />
      ) : (
        <Moon className="w-3.5 h-3.5" />
      )}
    </button>
  );
};
