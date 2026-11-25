import React, { useState } from "react";
import { motion } from "motion/react";
import {
  X,
  Copy,
  Check,
  Download,
  FileText,
  Search,
  Sparkles,
  Clock,
  Code,
  RefreshCw,
  Languages,
  PenTool,
} from "lucide-react";
export const DocumentViewer = ({ doc, onClose, onReTextize }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("passages");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLineNumbers] = useState(true);
  const handleCopy = (textToCopy) => {
    const content =
      textToCopy ||
      (activeTab === "json"
        ? doc.rawJson || JSON.stringify(doc.structuredData, null, 2)
        : doc.extractedText);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleDownload = (format) => {
    let content = doc.extractedText;
    let mime = "text/plain";
    let ext = format;
    if (format === "json") {
      content =
        doc.rawJson || JSON.stringify(doc.structuredData || doc, null, 2);
      mime = "application/json";
    } else if (format === "md") {
      content = `# ${doc.name}\n\nModel: ${doc.modelUsed}\nLanguage: ${doc.metadata.language || "Bilingual"}\nProcessed: ${doc.processedAt}\n\n${doc.extractedText}`;
      mime = "text/markdown";
    }
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.name.replace(/\.[^/.]+$/, "")}_extracted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const textLines = doc.extractedText.split("\n");
  const filteredLines = searchQuery
    ? textLines.filter((line) =>
        line.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : textLines;
  const jsonDisplay =
    doc.rawJson ||
    (doc.structuredData ? JSON.stringify(doc.structuredData, null, 2) : "");
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex flex-col bg-[#050505] text-zinc-100 overflow-hidden font-sans"
      id="document-viewer-modal"
    >
      {/* Top Bar Navigation */}
      <header className="h-16 border-b border-white/10 px-4 sm:px-8 flex items-center justify-between bg-zinc-950/80 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-3 truncate max-w-md">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Close viewer"
            id="close-viewer-btn"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="truncate">
            <h1 className="text-sm font-semibold truncate text-white">
              {doc.name}
            </h1>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="text-[#4F46E5] font-medium">
                {doc.metadata.language || "Bilingual (Bengali & English)"}
              </span>
              <span>•</span>
              <span className="text-zinc-500">{doc.modelUsed}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 font-mono">
          {/* Copy Button */}
          <button
            onClick={() => handleCopy()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-zinc-200 hover:bg-white/20 transition-colors"
            id="copy-text-btn"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  Copy {activeTab === "json" ? "JSON" : "Text"}
                </span>
              </>
            )}
          </button>

          {/* Download JSON Button */}
          <button
            onClick={() => handleDownload("json")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4F46E5] text-white hover:bg-[#4338ca] transition-colors shadow-lg shadow-[#4F46E5]/20"
            id="download-json-btn"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download JSON</span>
          </button>

          {onReTextize && (
            <button
              onClick={onReTextize}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Re-run ChandraOCR 2"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Toolbar / Stats Ribbon */}
      <div className="border-b border-white/5 px-4 sm:px-8 py-2.5 bg-white/[0.02] flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 font-mono">
        {/* View Tabs */}
        <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("passages")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "passages"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Handwritten Passages</span>
          </button>

          <button
            onClick={() => setActiveTab("json")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "json"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Strict JSON Output</span>
          </button>

          <button
            onClick={() => setActiveTab("formatted")}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "formatted"
                ? "bg-[#4F46E5] text-white shadow-xs"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Full Text
          </button>

        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-4 text-zinc-400 text-xs">
          <div className="flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{doc.metadata.language || "Bengali/English"}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>{doc.metadata.wordCount.toLocaleString()} words</span>
          </div>
          <div className="flex items-center gap-1 hidden sm:flex">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Confidence: {doc.structuredData?.confidence_score || "High"}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1 bg-white/[0.05] border border-white/10 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#4F46E5] w-36 sm:w-48 text-zinc-200 placeholder-zinc-500"
          />
        </div>
      </div>

      {/* Main Document Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          {/* Tab 1: Handwritten Passages */}
          {activeTab === "passages" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                  <span>ChandraOCR 2 Bilingual Extraction</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                  Handwritten OCR Active
                </span>
              </div>

              {doc.structuredData?.handwritten_passages?.length ? (
                doc.structuredData.handwritten_passages.map((passage, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 shadow-lg space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#4F46E5] font-semibold">
                        Passage #{passage.passage_id || idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300">
                        {passage.language || "Bengali/English"}
                      </span>
                    </div>

                    <div className="text-base font-sans text-zinc-100 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5 select-text">
                      {passage.extracted_text}
                    </div>

                    {passage.english_translation &&
                      passage.language === "Bengali" && (
                        <div className="text-xs font-sans text-zinc-400 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-indigo-400 block mb-1">
                            English Translation:
                          </span>
                          {passage.english_translation}
                        </div>
                      )}
                  </div>
                ))
              ) : (
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 font-mono text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed select-text">
                  {doc.extractedText}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Strict JSON Output */}
          {activeTab === "json" && (
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 font-mono text-xs overflow-x-auto shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-zinc-400 text-[11px]">
                <span className="text-emerald-400">
                  ChandraOCR 2 Strict JSON Payload
                </span>
                <button
                  onClick={() => handleCopy(jsonDisplay)}
                  className="hover:text-white flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </button>
              </div>
              <pre className="text-emerald-300/90 leading-relaxed select-text font-mono">
                {jsonDisplay}
              </pre>
            </div>
          )}

          {/* Tab 3: Full Clean Text */}
          {activeTab === "formatted" && (
            <div className="bg-zinc-900/60 rounded-2xl border border-white/10 p-6 sm:p-8 font-mono text-sm leading-relaxed overflow-x-auto shadow-sm">
              {filteredLines.map((line, idx) => {
                const isMatchingSearch =
                  searchQuery &&
                  line.toLowerCase().includes(searchQuery.toLowerCase());
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-4 py-0.5 group ${isMatchingSearch ? "bg-amber-500/20 font-semibold" : ""}`}
                  >
                    {showLineNumbers && (
                      <span className="select-none text-zinc-600 text-xs w-10 text-right shrink-0 font-mono pt-0.5">
                        {idx + 1}
                      </span>
                    )}
                    <div className="flex-1 whitespace-pre-wrap break-words text-zinc-200 select-text">
                      {line || "\u00A0"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
    </motion.div>
  );
};
