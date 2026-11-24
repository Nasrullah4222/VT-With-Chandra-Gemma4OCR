import { useMemo, useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "../components/PostCard";
import { CategoryFilter } from "../components/CategoryFilter";
export default function BlogListPage() {
  const { posts, loading, error } = usePosts();
  const [category, setCategory] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts],
  );
  const visible =
    category === "All" ? posts : posts.filter((p) => p.category === category);
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">The Blog</h1>
      <p className="mt-2 text-sm text-zinc-400">
        Practical guides on Bengali OCR, handwriting recognition and document
        digitization — in English and বাংলা.
      </p>

      <div className="mt-6">
        <CategoryFilter
          categories={categories}
          active={category}
          onChange={setCategory}
        />
      </div>

      <div className="mt-8 space-y-4">
        {loading && (
          <p className="text-sm font-mono text-zinc-500">Loading posts...</p>
        )}
        {error && <p className="text-sm font-mono text-red-400">{error}</p>}
        {!loading && !error && visible.length === 0 && (
          <p className="text-sm font-mono text-zinc-500">No posts yet.</p>
        )}
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
