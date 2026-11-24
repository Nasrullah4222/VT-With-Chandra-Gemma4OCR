import { env } from "../config/env.js";

export const ENGLISH_MODEL_LABEL = "English handwritten OCR (Modal)";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024;

export class EnglishOcrError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.status = status;
  }
}

export async function callEnglishOcr({ fileName, fileType, base64Data }) {
  if (!env.OCR_ENGLISH_URL || !env.OCR_ENGLISH_KEY) {
    throw new EnglishOcrError("English OCR service is not configured.", 500);
  }
  if (!ALLOWED_TYPES.includes(fileType)) {
    throw new EnglishOcrError("English OCR supports JPG, PNG or WebP images only.", 400);
  }

  const pureBase64 = base64Data.includes(",") ? base64Data.split(",")[1] : base64Data;
  const buffer = Buffer.from(pureBase64, "base64");
  if (!buffer.length) throw new EnglishOcrError("Empty image data.", 400);
  if (buffer.length > MAX_BYTES) throw new EnglishOcrError("Image is too large (max 15 MB).", 413);

  const form = new FormData();
  form.append("file", new Blob([buffer], { type: fileType }), fileName || "image");

  let response;
  const url = `${env.OCR_ENGLISH_URL.replace(/\/$/, "")}/ocr`;
  console.log("English OCR request:", {
    url,
    fileName,
    fileType,
    bytes: buffer.length,
  });
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "x-api-key": env.OCR_ENGLISH_KEY },
      body: form,
      signal: AbortSignal.timeout(env.OCR_TIMEOUT_MS),
    });
    console.log("English OCR response:", response.status);
  } catch (err) {
    if (err?.name === "TimeoutError" || err?.name === "AbortError") {
      throw new EnglishOcrError("The OCR model took too long to respond. Please try again.", 504);
    }
    throw new EnglishOcrError("The English OCR service is unavailable right now.", 503);
  }

  if (response.status === 401) {
    console.error("English OCR: Modal rejected the API key (check OCR_ENGLISH_KEY).");
    throw new EnglishOcrError("English OCR service configuration error.", 502);
  }
  if (response.status === 503) {
    throw new EnglishOcrError("The OCR model is still starting. Try again shortly.", 503);
  }
  if (response.status === 404) {
    throw new EnglishOcrError("The English Modal deployment or /ocr route was not found.", 502);
  }
  if (!response.ok) {
    throw new EnglishOcrError(`English OCR service error (${response.status}).`, 502);
  }
  return response.json();
}