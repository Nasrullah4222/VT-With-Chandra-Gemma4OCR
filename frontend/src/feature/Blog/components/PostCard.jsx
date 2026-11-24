import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
export function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-[#4F46E5]/50 hover:bg-zinc-900 transition-all"
    >
      <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30">
          {post.category}
        </span>
        <span>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {post.readMinutes} min read
        </span>
      </div>
      <h2
        lang={post.language}
        className="text-lg font-semibold text-white group-hover:text-[#4F46E5] transition-colors"
      >
        {post.title}
      </h2>
      <p
        lang={post.language}
        className="mt-2 text-sm text-zinc-400 leading-relaxed"
      >
        {post.excerpt}
      </p>
      <span className="mt-4 inline-block text-xs font-mono text-[#4F46E5]">
        Read →
      </span>
    </Link>
  );
}
