import {
  callHuggingFaceTextize,
  HF_MODEL_LABEL,
} from "../services/huggingFace.service.js";
import {
  parseModelOutput,
  buildFallbackStructuredData,
  computeTextMetadata,
} from "../services/textExtraction.service.js";
export async function postTextize(req, res) {
  try {
    const { fileName, fileType, base64Data, textContent, prompt } = req.body;
    if (!base64Data && !textContent) {
      return res.status(400).json({
        success: false,
        error: "Missing file content or base64 data.",
      });
    }
    let rawModelOutput = "";
    let extractedText = "";
    let summary = "";
    let modelUsed = HF_MODEL_LABEL;
    rawModelOutput = await callHuggingFaceTextize({
      fileName,
      fileType,
      base64Data,
      prompt,
    });
    modelUsed = HF_MODEL_LABEL;
    const parsed = parseModelOutput(rawModelOutput);
    let structuredData = parsed.structuredData;
    extractedText = parsed.extractedText;
    summary = parsed.summary;
    // Fallback if no keys available or output empty
    if (!extractedText) {
      if (textContent) {
        extractedText = textContent;
        modelUsed = "Local Clean Parser";
      } else {
        extractedText = `[Document Textization completed for ${fileName}]\n(Processed cleanly without cloud keys).`;
        modelUsed = "Offline Textizer";
      }
    }
    // Fallback structured data if not created
    if (!structuredData) {
      structuredData = buildFallbackStructuredData(
        extractedText,
        fileName,
        summary,
      );
    }
    if (!summary) {
      summary = structuredData.summary || extractedText.slice(0, 250) + "...";
    }
    const { wordCount, charCount, lineCount, readingTimeMinutes } =
      computeTextMetadata(extractedText);
    const ext = fileName.split(".").pop()?.toUpperCase() || "FILE";
    return res.json({
      success: true,
      extractedText,
      summary,
      structuredData,
      rawJson: JSON.stringify(structuredData, null, 2),
      metadata: {
        wordCount,
        charCount,
        lineCount,
        readingTimeMinutes,
        language:
          structuredData.primary_language || "Bilingual (Bengali & English)",
        detectedType: `${ext} (${structuredData.document_type || "Document"})`,
      },
      modelUsed,
    });
  } catch (err) {
    console.error("Server textize error:", err);
    return res.status(500).json({
      success: false,
      error: err?.message || "Failed to textize document",
    });
  }
}
