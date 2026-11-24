import { useEffect, useState } from "react";
import { fetchPosts } from "../services/blogService";
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetchPosts()
      .then((data) => !cancelled && setPosts(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);
  return { posts, loading, error };
}
