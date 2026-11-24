import { Schema, model } from "mongoose";
const HandwrittenPassageSchema = new Schema(
  {
    passage_id: { type: Number, required: true },
    language: { type: String, required: true },
    extracted_text: { type: String, required: true },
    english_translation: { type: String },
  },
  { _id: false },
);
const StructuredExtractionDataSchema = new Schema(
  {
    document_type: { type: String, required: true },
    primary_language: { type: String, required: true },
    is_handwritten: { type: Boolean, required: true },
    handwritten_passages: { type: [HandwrittenPassageSchema], default: [] },
    full_extracted_text: { type: String, required: true },
    summary: { type: String, default: "" },
    confidence_score: { type: String, default: "" },
  },
  { _id: false },
);
const DocumentMetadataSchema = new Schema(
  {
    wordCount: { type: Number, required: true },
    charCount: { type: Number, required: true },
    lineCount: { type: Number, required: true },
    readingTimeMinutes: { type: Number, required: true },
    language: { type: String },
    detectedType: { type: String, required: true },
  },
  { _id: false },
);
const DocumentSchema = new Schema(
  {
    docId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    extractedText: { type: String, required: true },
    summary: { type: String },
    structuredData: { type: StructuredExtractionDataSchema },
    rawJson: { type: String },
    metadata: { type: DocumentMetadataSchema, required: true },
    modelUsed: { type: String, required: true },
    processedAt: { type: Date, required: true, default: Date.now },
    isOffline: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const DocumentModel = model("Document", DocumentSchema);
