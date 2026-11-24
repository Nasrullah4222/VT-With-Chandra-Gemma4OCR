import { useState } from "react";
import { textizeDocument } from "../services/textizeService";
import { parseDocumentOffline } from "../services/offlineParserService";
export function useDocumentProcessor({ isOffline, onDocumentReady, mode = "bangla" }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const processFile = async (file) => {
    setIsProcessing(true);
    setCurrentFile({ name: file.name, size: file.size });
    try {
      if (isOffline) {
        // Offline processing fallback
        const doc = await parseDocumentOffline(file, mode);
        onDocumentReady(doc);
      } else {
        // Try server API textization (HuggingFace Gemma 4 31B / Gemini Engine)
        let base64Data;
        let textContent;
        // Check if file is small text/code or binary
        if (
          file.type.startsWith("text/") ||
          [
            "txt",
            "md",
            "json",
            "csv",
            "py",
            "js",
            "ts",
            "html",
            "xml",
            "css",
          ].some((ext) => file.name.endsWith("." + ext))
        ) {
          textContent = await file.text();
        } else {
          // Read base64 for images / PDFs / DOCX
          base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const res = reader.result;
              resolve(res.split(",")[1] || res);
            };
            reader.readAsDataURL(file);
          });
        }
        const { ok, data } = await textizeDocument({
          fileName: file.name,
          fileType:
            file.type ||
            (file.name.match(/\.(png|jpg|jpeg|webp|gif)$/i)
              ? "image/jpeg"
              : "application/octet-stream"),
          fileSize: file.size,
          base64Data,
          textContent,
          prompt:
            mode === "english"
              ? "Extract all English text from this document. Preserve wording and paragraph structure."
              : "Extract all Bangla text from this document. Preserve Bengali spelling and paragraph structure.",
        }, mode);
        if (ok && data.success) {
          const doc = {
            id:
              "doc_" +
              Date.now() +
              "_" +
              Math.random().toString(36).substring(2, 8),
            name: file.name,
            size: file.size,
            type: file.type || "application/octet-stream",
            extractedText: data.extractedText,
            summary: data.summary,
            structuredData: data.structuredData,
            rawJson: data.rawJson,
            metadata: data.metadata,
            modelUsed: data.modelUsed || "Gemma 4 31B Vision Engine",
            processedAt: new Date().toISOString(),
            isOffline: false,
          };
          onDocumentReady(doc);
        } else if (ok) {
          throw new Error(data.error || "Textization failed");
        } else {
          // Server error fallback to offline local parser
          console.warn("Server error, running offline parser fallback");
          const doc = await parseDocumentOffline(file, mode);
          onDocumentReady(doc);
        }
      }
    } catch (err) {
      console.warn("Textization error:", err);
      // Fallback
      const doc = await parseDocumentOffline(file, mode);
      onDocumentReady(doc);
    } finally {
      setIsProcessing(false);
      setCurrentFile(null);
    }
  };
  return { isProcessing, currentFile, processFile };
}
