import { Schema, model } from "mongoose";
const SectionSchema = new Schema(
  {
    heading: { type: String, required: true },
    paragraphs: { type: [String], default: [] },
  },
  { _id: false },
);
const PostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String, enum: ["en", "bn"], default: "en" },
    readMinutes: { type: Number, required: true },
    publishedAt: { type: Date, required: true },
    sections: { type: [SectionSchema], default: [] },
  },
  { timestamps: true },
);
export const PostModel = model("Post", PostSchema);
