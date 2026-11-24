import {
  callEnglishOcr,
  ENGLISH_MODEL_LABEL,
  EnglishOcrError,
} from "../../services/englishOcr.service.js";
import { computeTextMetadata } from "../../services/textExtraction.service.js";

export async function postEnglishTextize(req, res) {
  try {
    const { fileName = "image", fileType, base64Data } = req.body;
    if (!base64Data) {
      return res.status(400).json({ success: false, error: "Missing file content or base64 data." });
    }

    const r = await callEnglishOcr({ fileName, fileType, base64Data });

    const extractedText = (r.text || "").trim();
    const paragraphs = extractedText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    const meanConf = r.confidence?.mean;

    const structuredData = {
      document_type: "Handwritten Image Document",
      primary_language: "English",
      is_handwritten: true,
      handwritten_passages: paragraphs.map((p, i) => ({
        passage_id: i + 1,
        language: "English",
        extracted_text: p,
        english_translation: p,
      })),
      full_extracted_text: extractedText,
      summary: "",
      confidence_score: typeof meanConf === "number" ? `${Math.round(meanConf * 100)}%` : "",
    };

    const { wordCount, charCount, lineCount, readingTimeMinutes } = computeTextMetadata(extractedText);
    const ext = fileName.split(".").pop()?.toUpperCase() || "FILE";

    return res.json({
      success: true,
      extractedText,
      summary: extractedText.slice(0, 250) + (extractedText.length > 250 ? "..." : ""),
      structuredData,
      rawJson: JSON.stringify(structuredData, null, 2),
      metadata: {
        wordCount,
        charCount,
        lineCount,
        readingTimeMinutes,
        language: "English",
        detectedType: `${ext} (Handwritten Image Document)`,
      },
      modelUsed: ENGLISH_MODEL_LABEL,
      ocr: {
        confidence: r.confidence ?? null,
        words: r.words ?? [],
        lowConfWords: r.low_conf_words ?? [],
        lowResolution: !!r.low_resolution,
        possibleLoop: !!r.possible_loop,
        megapixels: r.megapixels ?? null,
      },
    });
  } catch (err) {
    const status = err instanceof EnglishOcrError ? err.status : 500;
    console.error("English textize error:", err.message);
    return res.status(status).json({
      success: false,
      error: err?.message || "Failed to textize document",
    });
  }
}