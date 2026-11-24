const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
/**
 * Sends a document to the backend for OCR/textization.
 * Communicates with the Express backend at `${VITE_API_URL}/api/textize`.
 */
export async function textizeDocument(payload, mode = "bangla") {
  const endpoint = mode === "english" ? "textize/english" : "textize/bangla";
  const res = await fetch(`${API_URL}/api/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}
