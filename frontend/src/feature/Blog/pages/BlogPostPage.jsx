import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePost } from "../hooks/usePost";
export default function BlogPostPage() {
  const { slug } = useParams();
  const { post, loading, error } = usePost(slug);
  return (
    <article className="max-w-2xl mx-auto px-4 py-12">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> All posts
      </Link>

      {loading && (
        <p className="mt-8 text-sm font-mono text-zinc-500">Loading...</p>
      )}
      {error && <p className="mt-8 text-sm font-mono text-red-400">{error}</p>}
      {!loading && !error && !post && (
        <p className="mt-8 text-sm font-mono text-zinc-400">Post not found.</p>
      )}

      {post && (
        <div lang={post.language} className="mt-6">
          <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30">
              {post.category}
            </span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>{post.readMinutes} min read</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-white leading-snug">
            {post.title}
          </h1>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-white">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((text, i) => (
                    <p key={i} className="text-zinc-300 leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <Link
            to="/"
            className="mt-12 inline-block px-4 py-2 rounded-lg bg-[#4F46E5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors"
          >
            Try the OCR tool
          </Link>
        </div>
      )}
    </article>
  );
}
