const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
/**
 * Sends a document to the backend for OCR/textization.
 * Communicates with the Express backend at `${VITE_API_URL}/api/textize`.
 */
export async function textizeDocument(payload, mode = "bangla") {
  const endpoint = mode === "english" ? "textize/english" : "textize/bangla";
  const url = `${API_URL}/api/${endpoint}`;
  console.log("OCR API request:", {
    url,
    mode,
    fileName: payload.fileName,
    fileType: payload.fileType,
    fileSize: payload.fileSize,
  });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = { success: false, error: `Backend returned HTTP ${res.status} with a non-JSON response.` };
  }
  console.log("OCR API response:", res.status, data);
  return { ok: res.ok, data };
}
