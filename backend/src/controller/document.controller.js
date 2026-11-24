import {
  createDocument,
  listDocuments,
  getDocumentById,
  deleteDocumentById,
  clearAllDocuments,
} from "../services/document.service.js";
export async function postDocument(req, res) {
  try {
    const saved = await createDocument(req.body);
    return res.status(201).json({ success: true, document: saved });
  } catch (err) {
    console.error("Create document error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: err?.message || "Failed to save document",
      });
  }
}
export async function getDocuments(req, res) {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 30;
    const docs = await listDocuments(limit);
    return res.json({ success: true, documents: docs });
  } catch (err) {
    console.error("List documents error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: err?.message || "Failed to list documents",
      });
  }
}
export async function getDocument(req, res) {
  try {
    const doc = await getDocumentById(req.params.docId);
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }
    return res.json({ success: true, document: doc });
  } catch (err) {
    console.error("Get document error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: err?.message || "Failed to get document",
      });
  }
}
export async function deleteDocument(req, res) {
  try {
    const doc = await deleteDocumentById(req.params.docId);
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error("Delete document error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: err?.message || "Failed to delete document",
      });
  }
}
export async function deleteAllDocuments(req, res) {
  try {
    await clearAllDocuments();
    return res.json({ success: true });
  } catch (err) {
    console.error("Clear documents error:", err);
    return res
      .status(500)
      .json({
        success: false,
        error: err?.message || "Failed to clear documents",
      });
  }
}
