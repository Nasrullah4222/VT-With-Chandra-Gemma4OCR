import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
} from "lucide-react";
export const DropZone = ({ onFileSelect, isProcessing, isOffline, mode = "bangla" }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const fileInputRef = useRef(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setErrorMsg(null);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      validateAndProcess(files[0]);
    }
  };
  const handleFileChange = (e) => {
    setErrorMsg(null);
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files[0]);
    }
  };
  const validateAndProcess = (file) => {
    const supportedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    const isSupportedImage = file.type
      ? supportedImageTypes.includes(file.type.toLowerCase())
      : /\.(png|jpe?g|webp)$/i.test(file.name);
    if (!isSupportedImage) {
      setErrorMsg("Please upload an image of handwritten text (PNG, JPG, or WEBP).");
      return;
    }
    // 50MB max file size
    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg("File size exceeds 50MB limit.");
      return;
    }
    onFileSelect(file);
  };
  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 backdrop-blur-md ${
          isDragOver
            ? "border-[#4F46E5] bg-[#4F46E5]/10 shadow-[0_0_30px_rgba(79,70,229,0.2)]"
            : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center text-[10px] text-white">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white tracking-wide">
              {mode === "english"
                ? "Upload an English handwritten image"
                : "Upload a Bangla handwritten image"}
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm font-mono">
              Handwritten images only (PNG, JPG, WEBP), up to 50MB
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-indigo-400" /> Handwritten Image
            </span>
            <span>•</span>
            <span className="text-zinc-500">{mode === "english" ? "English OCR" : "Bangla OCR"}</span>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-red-400 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20 font-mono">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
