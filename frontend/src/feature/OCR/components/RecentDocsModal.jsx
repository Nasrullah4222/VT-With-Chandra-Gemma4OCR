import React from "react";
import { motion } from "motion/react";
import { X, Clock, FileText, Trash2, ArrowRight } from "lucide-react";
export const RecentDocsModal = ({
  docs,
  onSelectDoc,
  onRemoveDoc,
  onClearAll,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] font-sans"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2 text-white">
            <Clock className="w-5 h-5 text-[#4F46E5]" />
            <h2 className="text-base font-semibold">Extraction History</h2>
            <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
              {docs.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {docs.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-400 hover:text-red-300 font-mono transition-colors"
              >
                Clear History
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content / List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {docs.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 font-mono text-xs">
              No recent documents saved in history.
            </div>
          ) : (
            docs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all flex items-center justify-between group cursor-pointer"
                onClick={() => onSelectDoc(doc)}
              >
                <div className="flex items-center gap-3 truncate pr-4">
                  <div className="p-2.5 rounded-lg bg-[#4F46E5]/10 text-[#4F46E5] shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate space-y-0.5">
                    <h4 className="text-sm font-medium text-white truncate group-hover:text-[#4F46E5] transition-colors">
                      {doc.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                      <span>{doc.metadata.language || "Bengali/English"}</span>
                      <span>•</span>
                      <span>{doc.metadata.wordCount} words</span>
                      <span>•</span>
                      <span>
                        {new Date(doc.processedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveDoc(doc.id);
                    }}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};
