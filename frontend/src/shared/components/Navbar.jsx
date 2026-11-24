import { NavLink } from "react-router-dom";
const linkClass = ({ isActive }) =>
  `text-xs font-mono uppercase tracking-wider transition-colors ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`;
export function Navbar() {
  return (
    <header className="border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-sm font-semibold text-white"
        >
          <span className="w-2 h-2 rounded-full bg-[#4F46E5] shadow-[0_0_8px_#4F46E5]" />
          Bn&amp;En Vision OCR
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>
            OCR
          </NavLink>
          <NavLink to="/blog" className={linkClass}>
            Blog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
