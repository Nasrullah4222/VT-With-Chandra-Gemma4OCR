export const parseDocumentOffline = async (file, mode = "bangla") => {
  const fileName = file.name;
  const fileType = file.type || "application/octet-stream";
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  let text = "";
  let detectedType = "Unknown File";
  if (
    fileType.startsWith("text/") ||
    [
      "txt",
      "md",
      "json",
      "csv",
      "py",
      "js",
      "ts",
      "html",
      "css",
      "xml",
    ].includes(ext)
  ) {
    text = await file.text();
    detectedType = `${ext.toUpperCase()} Text File`;
  } else if (
    fileType.startsWith("image/") ||
    ["png", "jpg", "jpeg", "webp", "gif", "bmp"].includes(ext)
  ) {
    text = `[Image Document: ${fileName}]\nFormat: ${fileType || ext}\nNote: Connect online to process image with Gemma 4 31B Vision model.`;
    detectedType = "Image Document";
  } else if (fileType.includes("pdf") || ext === "pdf") {
    text = `[PDF Document: ${fileName}]\nNote: Connect online for full Gemma 4 31B Vision PDF textization.`;
    detectedType = "PDF Document";
  } else {
    text = `[Binary Document: ${fileName}]\nFormat: ${fileType || ext}\nNote: Connect online for deep Gemma 4 31B Vision extraction.`;
    detectedType = "Binary File";
  }
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const lineCount = text ? text.split("\n").length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  const isBengali = mode === "bangla";
  const structuredData = {
    document_type: detectedType,
    primary_language: isBengali ? "Bengali" : "English",
    is_handwritten: true,
    handwritten_passages: [
      {
        passage_id: 1,
        language: isBengali ? "Bengali" : "English",
        extracted_text: text || `[Offline processing for ${fileName}]`,
        english_translation: isBengali
          ? "Bengali handwritten content extracted offline."
          : text,
      },
    ],
    full_extracted_text: text,
    summary:
      text.length > 0
        ? `Offline extracted ${detectedType} (${wordCount} words, ${lineCount} lines).`
        : "No text extracted.",
    confidence_score: "Medium (Offline Engine)",
  };
  return {
    id: "doc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9),
    name: fileName,
    size: file.size,
    type: fileType || `application/${ext}`,
    extractedText: text,
    summary: structuredData.summary,
    structuredData,
    rawJson: JSON.stringify(structuredData, null, 2),
    metadata: {
      wordCount,
      charCount,
      lineCount,
      readingTimeMinutes,
      language: structuredData.primary_language,
      detectedType,
    },
    modelUsed: "Offline Local Engine",
    processedAt: new Date().toISOString(),
    isOffline: true,
  };
};
