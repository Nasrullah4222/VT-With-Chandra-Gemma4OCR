import { HfInference } from "@huggingface/inference";
import { env } from "../config/env.js";
const hf = new HfInference(env.HF_TOKEN);
const SYSTEM_INSTRUCTION = `
You are a STRICT OCR engine for Bengali and English handwritten and printed documents.

Your ONLY responsibility is to extract the document exactly as requested.

You MUST follow every instruction below exactly.

========================
RULES
========================

1. Read EVERY visible Bengali and English word.
2. Preserve the original wording exactly.
3. Preserve the original paragraph structure.
4. Merge wrapped lines into their original paragraph.
5. NEVER split one paragraph into multiple passages.
6. Create a new passage ONLY when an actual paragraph break exists.
7. Do NOT rewrite.
8. Do NOT correct spelling.
9. Do NOT improve grammar.
10. Do NOT summarize unless requested in the JSON field.
11. Do NOT explain anything.
12. Do NOT add comments.
13. Do NOT hallucinate missing text.
14. Do NOT invent words.
15. Do NOT return Markdown.
16. Do NOT return code blocks.
17. Do NOT return any text outside the JSON.
18. Your response MUST be valid JSON only.
19. Follow the JSON schema EXACTLY.
20. Never change field names.
21. Never omit required fields.
22. Never add extra fields.
23. If a field is unknown, return an empty string "".
24. If no handwritten text exists, return an empty handwritten_passages array.
25. Never return one line as one passage.

========================
handwritten_passages RULE
========================

Each item inside handwritten_passages represents ONE COMPLETE PARAGRAPH.

If one paragraph spans multiple lines,
merge every line into a single extracted_text.

Incorrect:

[
"line 1",
"line 2",
"line 3"
]

Correct:

[
{
  "passage_id":1,
  "language":"Bengali",
  "extracted_text":"Complete paragraph here...",
  "english_translation":""
}
]

========================
JSON SCHEMA
========================

{
  "document_type": "",
  "primary_language": "",
  "is_handwritten": true,
  "handwritten_passages": [
    {
      "passage_id": 1,
      "language": "",
      "extracted_text": "",
      "english_translation": ""
    }
  ],
  "full_extracted_text": "",
  "summary": "",
  "confidence_score": ""
}

Return ONLY valid JSON.
Stricly follow the rules and don't do anything extra.
`;
/**
 * Builds the multimodal prompt content and calls the Hugging Face chat
 * completion endpoint. Returns the raw text output from the model.
 */
export async function callHuggingFaceTextize(input) {
  const { fileName, fileType, base64Data, prompt } = input;
  const promptText = `
    ${SYSTEM_INSTRUCTION}

    File Name: ${fileName}
    File Type: ${fileType}

    Additional User Instruction:
    ${prompt || "Extract all text from the image."}
   `;
  const pureBase64 = base64Data
    ? base64Data.includes(",")
      ? base64Data.split(",")[1]
      : base64Data
    : undefined;
  const content = [
    {
      type: "text",
      text: promptText,
    },
  ];
  if (pureBase64) {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:${fileType};base64,${pureBase64}`,
      },
    });
  }
  const response = await hf.chatCompletion({
    model: env.HF_MODEL,
    messages: [
      {
        role: "user",
        content,
      },
    ],
  });
  if (!response.choices?.length) {
    throw new Error("No response returned from Hugging Face.");
  }
  if (!response.choices[0]?.message?.content) {
    throw new Error("Model returned an empty response.");
  }
  return response.choices[0].message.content?.toString() || "";
}
export const HF_MODEL_LABEL = `Hugging Face (${env.HF_MODEL})`;
