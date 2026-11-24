import React from "react";
import { WifiOff, Wifi } from "lucide-react";
export const OfflineIndicator = ({ isOffline }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-all ${
        isOffline
          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      }`}
    >
      {isOffline ? (
        <>
          <WifiOff className="w-3 h-3 text-amber-400" />
          <span>Offline Mode</span>
        </>
      ) : (
        <>
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span>ChandraOCR 2 Online</span>
        </>
      )}
    </div>
  );
};
