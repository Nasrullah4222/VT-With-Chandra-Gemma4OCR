import { useEffect, useState } from "react";
import { fetchPostBySlug } from "../services/blogService";
export function usePost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    fetchPostBySlug(slug)
      .then((data) => !cancelled && setPost(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);
  return { post, loading, error };
}
