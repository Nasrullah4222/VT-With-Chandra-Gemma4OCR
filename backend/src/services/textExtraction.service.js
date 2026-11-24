/**
 * Attempts to parse the raw model output as JSON (stripping markdown
 * codeblocks if present). Returns null if parsing fails.
 */
export function parseModelOutput(rawModelOutput) {
  let structuredData = null;
  let extractedText = "";
  let summary = "";
  if (!rawModelOutput) {
    return { structuredData, extractedText, summary };
  }
  try {
    let cleanJsonStr = rawModelOutput.trim();
    if (cleanJsonStr.startsWith("```")) {
      cleanJsonStr = cleanJsonStr
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
    }
    structuredData = JSON.parse(cleanJsonStr);
    extractedText = structuredData?.full_extracted_text || rawModelOutput;
    summary = structuredData?.summary || "";
  } catch (parseErr) {
    console.warn(
      "Failed to parse model JSON output strictly, fallback to raw string:",
      parseErr,
    );
    extractedText = rawModelOutput;
  }
  return { structuredData, extractedText, summary };
}
/**
 * Builds a fallback structuredData object when the model output could not
 * be parsed into the expected schema.
 */
export function buildFallbackStructuredData(extractedText, fileName, summary) {
  const isBengali = /[\u0980-\u09FF]/.test(extractedText);
  return {
    document_type: fileName.match(/\.(png|jpg|jpeg|webp)$/i)
      ? "Handwritten Image Document"
      : "Text Document",
    primary_language: isBengali ? "Bengali" : "English",
    is_handwritten: true,
    handwritten_passages: [
      {
        passage_id: 1,
        language: isBengali ? "Bengali" : "English",
        extracted_text: extractedText,
        english_translation: isBengali
          ? "Bengali handwritten content extracted."
          : extractedText,
      },
    ],
    full_extracted_text: extractedText,
    summary: summary || extractedText.slice(0, 200) + "...",
    confidence_score: "High",
  };
}
/**
 * Computes word/char/line/reading-time metadata for a block of extracted text.
 */
export function computeTextMetadata(extractedText) {
  const wordCount = extractedText.trim()
    ? extractedText.trim().split(/\s+/).length
    : 0;
  const charCount = extractedText.length;
  const lineCount = extractedText ? extractedText.split("\n").length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  return { wordCount, charCount, lineCount, readingTimeMinutes };
}
