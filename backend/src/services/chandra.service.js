import { env } from "../config/env.js";

export const CHANDRA_MODEL_LABEL = "Chandra OCR 2 + LoRA (Bangla handwriting)";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 15 * 1024 * 1024;

export class OcrServiceError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.status = status;
  }
}

export async function callChandraOcr({ fileName, fileType, base64Data }) {
  if (!env.OCR_URL || !env.OCR_API_KEY) {
    throw new OcrServiceError("Bangla OCR service is not configured.", 500);
  }
  if (!ALLOWED_TYPES.includes(fileType)) {
    throw new OcrServiceError("Bangla OCR supports JPG, PNG or WebP images only.", 400);
  }

  const pureBase64 = base64Data.includes(",") ? base64Data.split(",")[1] : base64Data;
  const buffer = Buffer.from(pureBase64, "base64");
  if (!buffer.length) throw new OcrServiceError("Empty image data.", 400);
  if (buffer.length > MAX_BYTES) throw new OcrServiceError("Image is too large (max 15 MB).", 413);

  const form = new FormData();
  form.append("file", new Blob([buffer], { type: fileType }), fileName || "image");

  let response;
  const url = `${env.OCR_URL.replace(/\/$/, "")}/ocr`;
  console.log("Bangla OCR request:", {
    url,
    fileName,
    fileType,
    bytes: buffer.length,
  });
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "x-api-key": env.OCR_API_KEY },
      body: form,
      signal: AbortSignal.timeout(env.OCR_TIMEOUT_MS),
    });
    console.log("Bangla OCR response:", response.status);
  } catch (err) {
    if (err?.name === "TimeoutError" || err?.name === "AbortError") {
      throw new OcrServiceError("The OCR model took too long to respond. Please try again.", 504);
    }
    throw new OcrServiceError("The Bangla OCR service is unavailable right now.", 503);
  }

  if (response.status === 401) {
    console.error("Chandra OCR: Modal rejected the API key (check OCR_API_KEY).");
    throw new OcrServiceError("Bangla OCR service configuration error.", 502);
  }
  if (response.status === 503) {
    throw new OcrServiceError("The OCR model is still starting. Try again shortly.", 503);
  }
  if (response.status === 404) {
    throw new OcrServiceError("The Bangla Modal deployment or /ocr route was not found.", 502);
  }
  if (!response.ok) {
    throw new OcrServiceError(`Bangla OCR service error (${response.status}).`, 502);
  }
  return response.json();
}