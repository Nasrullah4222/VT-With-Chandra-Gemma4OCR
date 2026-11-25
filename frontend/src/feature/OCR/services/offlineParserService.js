export const parseDocumentOffline = async (file, mode = "bangla") => {
  const fileName = file.name;
  const fileType = file.type || "application/octet-stream";
  const ext = fileName.split(".").pop()?.toLowerCase() || "";
  let text = "";
  const detectedType = "Handwritten Image";
  text = `[Handwritten Image: ${fileName}]\nFormat: ${fileType || ext}\nNote: Connect online to process this image with ChandraOCR 2.`;
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
    confidence_score: "Medium (Offline Engine)",
  };
  return {
    id: "doc_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9),
    name: fileName,
    size: file.size,
    type: fileType || `application/${ext}`,
    extractedText: text,
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
