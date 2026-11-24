import mongoose from "mongoose";
import { env } from "./env.js";
/**
 * Connects to MongoDB using process.env.MONGO_URI (via env config).
 *
 * MONGO_URI is not required at startup. If it is not yet set, the server
 * still starts (document history simply won't be persisted to MongoDB
 * until a connection string is provided).
 */
export async function connectDB() {
  if (!env.MONGO_URI) {
    console.warn(
      "MONGO_URI is not set. Skipping MongoDB connection (document persistence disabled).",
    );
    return;
  }
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
