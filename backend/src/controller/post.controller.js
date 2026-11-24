import { listPosts, getPostBySlug } from "../services/post.service.js";
export async function getPosts(req, res) {
  try {
    const posts = await listPosts();
    return res.json({ success: true, posts });
  } catch (err) {
    console.error("List posts error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to load posts" });
  }
}
export async function getPost(req, res) {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    return res.json({ success: true, post });
  } catch (err) {
    console.error("Get post error:", err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to load post" });
  }
}
