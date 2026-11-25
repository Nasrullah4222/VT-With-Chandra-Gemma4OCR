import React, { useState } from "react";
import { Languages, ArrowRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function UploadModePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e5e5]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080808]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              <Languages className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-white">Bangla<span className="text-indigo-400">OCR</span></span>
          </Link>
          <nav className={`${menuOpen ? "absolute left-0 right-0 top-16 flex border-b border-white/10 bg-[#080808] p-5" : "hidden"} flex-col gap-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
            <Link to="/bangla-upload" className="text-sm text-zinc-400 hover:text-white">Bangla OCR</Link>
            <Link to="/english-upload" className="text-sm text-zinc-400 hover:text-white">English OCR</Link>
            <Link to="/blog" className="text-sm text-zinc-400 hover:text-white">Blog</Link>
          </nav>
          <button className="text-zinc-400 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-5 py-16">
        <div className="w-full">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">Choose OCR mode</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Which handwritten image language are you uploading?</h1>
            <p className="mt-5 text-sm leading-6 text-zinc-400 sm:text-base">Select a dedicated upload page for accurate language-specific extraction.</p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <Link to="/bangla-upload" className="group rounded-3xl border border-indigo-400/20 bg-indigo-400/[0.06] p-7 transition hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-indigo-400/[0.1]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-xl font-semibold text-white">অ</div>
              <h2 className="mt-6 text-2xl font-semibold text-white">Bangla OCR</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">Upload an image of Bangla handwriting with dedicated Bengali extraction settings.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300">Open Bangla upload <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>

            <Link to="/english-upload" className="group rounded-3xl border border-sky-400/20 bg-sky-400/[0.06] p-7 transition hover:-translate-y-1 hover:border-sky-400/50 hover:bg-sky-400/[0.1]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-lg font-semibold text-white">EN</div>
              <h2 className="mt-6 text-2xl font-semibold text-white">English OCR</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">Upload an image of English handwriting with dedicated English extraction settings.</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">Open English upload <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
