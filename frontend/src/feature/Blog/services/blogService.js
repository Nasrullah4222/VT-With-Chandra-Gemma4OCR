const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://vt-with-chandra-gemma4ocr.onrender.com");
export async function fetchPosts() {
  const res = await fetch(`${API_URL}/api/posts`);
  if (!res.ok) throw new Error("Failed to load posts");
  const data = await res.json();
  return data.posts;
}
export async function fetchPostBySlug(slug) {
  const res = await fetch(`${API_URL}/api/posts/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load post");
  const data = await res.json();
  return data.post;
}
