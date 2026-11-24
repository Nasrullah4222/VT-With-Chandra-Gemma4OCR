import React from "react";
import { motion } from "motion/react";
import { Loader2, Sparkles, Languages } from "lucide-react";
export const ProcessingOverlay = ({ fileName, fileSize }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-md mx-auto"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/30 flex items-center justify-center text-[#4F46E5] shadow-[0_0_40px_rgba(79,70,229,0.25)]">
          <Loader2 className="w-10 h-10 animate-spin text-[#4F46E5]" />
        </div>
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-lg">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#4F46E5] uppercase tracking-wider">
          <Languages className="w-4 h-4" />
          <span>Gemma 4 31B Vision OCR</span>
        </div>
        <h3 className="text-lg font-semibold text-white tracking-wide">
          Extracting Handwritten Passages...
        </h3>
        {fileName && (
          <p className="text-xs font-mono text-zinc-400 truncate max-w-xs mx-auto bg-white/5 px-3 py-1 rounded-full border border-white/10">
            {fileName} {fileSize ? `(${(fileSize / 1024).toFixed(1)} KB)` : ""}
          </p>
        )}
      </div>

      <p className="text-xs text-zinc-400 max-w-xs font-mono leading-relaxed">
        Parsing Bengali & English handwriting, maintaining structural alignment,
        and constructing strict JSON payload...
      </p>
    </motion.div>
  );
};
