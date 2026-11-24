export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-colors ${
            active === c
              ? "bg-[#4F46E5] border-[#4F46E5] text-white"
              : "border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
