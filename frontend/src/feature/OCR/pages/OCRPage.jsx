import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Languages,
  Menu,
  ShieldCheck,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DropZone } from "../components/DropZone";
import { ProcessingOverlay } from "../components/ProcessingOverlay";
import { DocumentViewer } from "../components/DocumentViewer";
import { RecentDocsModal } from "../components/RecentDocsModal";
import { ThemeToggle } from "../components/ThemeToggle";
import { useTheme } from "../hooks/useTheme";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useDocumentHistory } from "../hooks/useDocumentHistory";
import { useDocumentProcessor } from "../hooks/useDocumentProcessor";

const faqs = [
  {
    question: "Can it read Bangla handwriting from an image?",
    answer:
      "Yes. Upload an image of handwritten Bangla or English text. Unclear results are surfaced for quick human review instead of being silently guessed.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "Upload a handwritten image in JPG, PNG, or WEBP format up to 50 MB. Phone photos work too, although bright, flat images usually produce the best results.",
  },
  {
    question: "Are my images private?",
    answer:
      "Image history is stored in your browser. When the server is unavailable, the app uses its offline parser and keeps the session usable without sending the image anywhere.",
  },
  {
    question: "Does it preserve Bangla numerals?",
    answer:
      "Yes. Bangla digits such as ০১২৩৪৫৬৭৮৯ remain in Bangla in the extracted text, along with the original language mix where available.",
  },
];

function Header({ isOffline, darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080808]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
            <Languages className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            Bangla<span className="text-indigo-400">OCR</span>
            <span className="ml-2 hidden text-[10px] font-normal uppercase tracking-[0.18em] text-zinc-500 sm:inline">
              বাংলা textizer
            </span>
          </span>
        </Link>
        <nav className={`${menuOpen ? "absolute left-0 right-0 top-16 flex border-b border-white/10 bg-[#080808] p-5" : "hidden"} flex-col gap-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
          <a href="#features" className="text-sm text-zinc-400 transition hover:text-white">Features</a>
          <a href="#how-it-works" className="text-sm text-zinc-400 transition hover:text-white">How it works</a>
          <Link to="/bangla-upload" className="text-sm text-zinc-400 transition hover:text-white">Bangla OCR</Link>
          <Link to="/english-upload" className="text-sm text-zinc-400 transition hover:text-white">English OCR</Link>
          <div className="flex items-center gap-3 border-t border-white/10 pt-4 md:border-0 md:pt-0">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-500">
              <span className={`h-1.5 w-1.5 rounded-full ${isOffline ? "bg-amber-400" : "bg-emerald-400"}`} />
              {isOffline ? "Offline" : "Ready"}
            </span>
            <ThemeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
          </div>
        </nav>
        <button className="text-zinc-400 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}

function FeatureCard({ icon: Icon, title, children, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-indigo-400/40">
      <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{children}</p>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.025]">
          <button className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-medium text-white" onClick={() => setOpen(open === index ? -1 : index)}>
            {faq.question}
            <ChevronDown className={`h-4 w-4 shrink-0 text-indigo-400 transition ${open === index ? "rotate-180" : ""}`} />
          </button>
          {open === index && <p className="px-5 pb-5 text-sm leading-6 text-zinc-400">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}

export default function OCRPage({ handwritingOnly = false, mode = "bangla" }) {
  const isEnglish = mode === "english";
  const { darkMode, toggleDarkMode } = useTheme();
  const { isOffline } = useOnlineStatus();
  const { savedDocs, saveDocument, removeDocument, clearHistory } = useDocumentHistory();
  const [activeDocument, setActiveDocument] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { isProcessing, currentFile, processFile } = useDocumentProcessor({
    isOffline,
    mode,
    onDocumentReady: (doc) => {
      saveDocument(doc);
      setActiveDocument(doc);
    },
  });
  const handleClearHistory = () => {
    clearHistory();
    setShowHistoryModal(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e5e5] selection:bg-indigo-500 selection:text-white">
      <Header isOffline={isOffline} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
            <div>
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
                {isEnglish ? "Turn English handwriting into " : "Turn Bangla handwriting into "}<span className="text-indigo-400">text you can use.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
                {isEnglish
                  ? "Extract English text from handwritten images. Fast, private, and ready to edit, copy, and share."
                  : "Extract Bangla text from handwritten images. Fast, private, and ready to edit, copy, and share."}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> No signup required</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> {isEnglish ? "English mode" : "Bangla mode"}</span>
                <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Images up to 50 MB</span>
              </div>
            </div>
            <div id="upload" className="rounded-3xl border border-indigo-400/20 bg-white/[0.04] p-2 shadow-2xl shadow-indigo-950/30">
              <div className="rounded-2xl border border-white/10 bg-[#101010] p-5 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{isEnglish ? "Upload English handwritten image" : "Upload Bangla handwritten image"}</p>
                    <p className="mt-1 text-xs text-zinc-500">Drop an image or browse from your device</p>
                  </div>
                  <Upload className="h-5 w-5 text-indigo-400" />
                </div>
                <AnimatePresence mode="wait">
                  {isProcessing && currentFile ? (
                    <ProcessingOverlay key="processing" fileName={currentFile.name} fileSize={currentFile.size} />
                  ) : (
                    <DropZone key="dropzone" onFileSelect={processFile} isProcessing={isProcessing} isOffline={isOffline} mode={mode} />
                  )}
                </AnimatePresence>
                {savedDocs.length > 0 && !activeDocument && !isProcessing && (
                  <button onClick={() => setShowHistoryModal(true)} className="mx-auto mt-4 flex items-center gap-2 text-xs text-zinc-500 transition hover:text-white">
                    <Clock className="h-3.5 w-3.5 text-indigo-400" /> View recent handwritten images ({savedDocs.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl grid-cols-2 gap-px border-x border-white/10 bg-white/10 sm:grid-cols-4">
          {[["PNG", "Supported image"], ["JPG", "Supported image"], ["WEBP", "Supported image"], ["50 MB", "Maximum image size"]].map(([value, label]) => (
            <div key={label} className="bg-[#080808] px-4 py-7 text-center"><p className="text-2xl font-semibold text-white">{value}</p><p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">{label}</p></div>
          ))}
        </section>

        <section id="features" className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Built for handwritten images</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Turn handwriting into useful text.</h2><p className="mt-4 text-zinc-400">Read handwritten notes and forms from an image, with clear output that is easy to review.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={Languages} title="Bangla-first OCR" color="bg-indigo-400/10 text-indigo-400">Recognize Bangla script, English, and both together in one handwritten image.</FeatureCard>
            <FeatureCard icon={Zap} title="Smart extraction" color="bg-amber-400/10 text-amber-400">Turn forms and notes into structured, editable text for your next step.</FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Private by design" color="bg-emerald-400/10 text-emerald-400">Browser history and an offline fallback keep your images in your control.</FeatureCard>
            <FeatureCard icon={FileText} title="Useful output" color="bg-sky-400/10 text-sky-400">Review extracted text, metadata, and structured data in one view.</FeatureCard>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
            <div className="text-center"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Simple workflow</p><h2 className="mt-4 text-3xl font-semibold text-white">From image to editable text</h2></div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[["01", "Upload", "Add a clear image of handwritten text."], ["02", "Recognize", "The OCR engine reads and organizes the handwriting."], ["03", "Review & use", "Check the output, copy what you need, and keep a local history." ]].map(([number, title, text]) => <div key={number} className="relative text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-400/10 text-sm font-semibold text-indigo-300">{number}</div><h3 className="mt-5 font-semibold text-white">{title}</h3><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-400">{text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:py-28 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Common questions</p><h2 className="mt-4 text-3xl font-semibold text-white">Everything you need to get started.</h2><p className="mt-4 text-sm leading-6 text-zinc-400">Have a handwritten image ready? Try the uploader above. Want to learn more? Explore our handwriting guide and blog.</p><Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-white">Read the blog <ArrowRight className="h-4 w-4" /></Link></div>
          <FAQ />
        </section>

        <section className="border-t border-white/10 px-5 py-16 text-center"><h2 className="text-3xl font-semibold text-white">Ready to digitize your handwriting?</h2><p className="mt-3 text-sm text-zinc-400">Start with an image. See the result in seconds.</p><a href="#upload" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400">Try BanglaOCR <ArrowRight className="h-4 w-4" /></a></section>
      </main>

      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between"><div><span className="font-semibold text-zinc-300">BanglaOCR</span><span className="ml-3">Bangla & English handwriting recognition</span></div><div className="flex gap-5"><Link to="/blog" className="hover:text-white">Blog</Link><Link to="/bangla-handwriting-ocr" className="hover:text-white">Handwriting OCR</Link><span>Private by design</span></div></div></footer>

      <AnimatePresence>{activeDocument && <DocumentViewer doc={activeDocument} onClose={() => setActiveDocument(null)} />}</AnimatePresence>
      <AnimatePresence>{showHistoryModal && <RecentDocsModal docs={savedDocs} onSelectDoc={(doc) => { setActiveDocument(doc); setShowHistoryModal(false); }} onRemoveDoc={removeDocument} onClearAll={handleClearHistory} onClose={() => setShowHistoryModal(false)} />}</AnimatePresence>
    </div>
  );
}
