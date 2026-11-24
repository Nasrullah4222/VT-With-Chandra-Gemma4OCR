import { useState, useEffect, useCallback } from "react";
import {
  getDocumentsFromStorage,
  saveDocumentToStorage,
  removeDocumentFromStorage,
  clearDocumentsStorage,
} from "../services/storageService";
export function useDocumentHistory() {
  const [savedDocs, setSavedDocs] = useState([]);
  useEffect(() => {
    setSavedDocs(getDocumentsFromStorage());
  }, []);
  const saveDocument = useCallback((doc) => {
    saveDocumentToStorage(doc);
    setSavedDocs(getDocumentsFromStorage());
  }, []);
  const removeDocument = useCallback((id) => {
    removeDocumentFromStorage(id);
    setSavedDocs(getDocumentsFromStorage());
  }, []);
  const clearHistory = useCallback(() => {
    clearDocumentsStorage();
    setSavedDocs([]);
  }, []);
  return { savedDocs, saveDocument, removeDocument, clearHistory };
}
