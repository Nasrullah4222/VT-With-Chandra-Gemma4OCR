import mongoose from "mongoose";
import { PostModel } from "../model/post.model.js";
import { seedPosts } from "../data/posts.seed.js";
const isDbReady = () => mongoose.connection.readyState === 1;
/**
 * Reads from MongoDB when connected; otherwise serves the built-in seed
 * posts so the blog works before MONGO_URI is configured.
 */
export async function listPosts() {
  if (isDbReady()) {
    return PostModel.find().sort({ publishedAt: -1 }).lean().exec();
  }
  return [...seedPosts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}
export async function getPostBySlug(slug) {
  if (isDbReady()) {
    return PostModel.findOne({ slug }).lean().exec();
  }
  return seedPosts.find((p) => p.slug === slug) ?? null;
}
export async function seedPostsIfEmpty() {
  if (!isDbReady()) return;
  if ((await PostModel.countDocuments()) === 0) {
    await PostModel.insertMany(seedPosts);
    console.log(`Seeded ${seedPosts.length} blog posts.`);
  }
}
