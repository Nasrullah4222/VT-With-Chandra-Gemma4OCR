import { DocumentModel } from "../model/document.model.js";
/**
 * Persists a processed document to MongoDB.
 * Requires MONGO_URI to be configured; callers should treat failures as
 * non-fatal since document history also lives in the client (localStorage).
 */
export async function createDocument(input) {
  const doc = new DocumentModel({
    ...input,
    processedAt: input.processedAt || new Date(),
  });
  return doc.save();
}
export async function listDocuments(limit = 30) {
  return DocumentModel.find().sort({ processedAt: -1 }).limit(limit).exec();
}
export async function getDocumentById(docId) {
  return DocumentModel.findOne({ docId }).exec();
}
export async function deleteDocumentById(docId) {
  return DocumentModel.findOneAndDelete({ docId }).exec();
}
export async function clearAllDocuments() {
  await DocumentModel.deleteMany({}).exec();
}
