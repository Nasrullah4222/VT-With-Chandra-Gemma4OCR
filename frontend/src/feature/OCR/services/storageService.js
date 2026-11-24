const STORAGE_KEY = "gemma_extracted_documents";
export const getDocumentsFromStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Failed to load documents from localStorage:", err);
    return [];
  }
};
export const saveDocumentToStorage = (doc) => {
  if (typeof window === "undefined") return [];
  try {
    const docs = getDocumentsFromStorage();
    const filtered = docs.filter((d) => d.id !== doc.id);
    const updated = [doc, ...filtered].slice(0, 30); // Keep max 30 recent docs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn("Failed to save document to localStorage:", err);
    return getDocumentsFromStorage();
  }
};
export const removeDocumentFromStorage = (id) => {
  if (typeof window === "undefined") return [];
  try {
    const docs = getDocumentsFromStorage();
    const updated = docs.filter((d) => d.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn("Failed to remove document from localStorage:", err);
    return getDocumentsFromStorage();
  }
};
export const clearDocumentsStorage = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear documents storage:", err);
  }
};
