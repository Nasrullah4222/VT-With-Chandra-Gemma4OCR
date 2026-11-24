import { postTextize } from "../textize.controller.js";

export async function postEnglishTextize(req, res) {
  req.body = {
    ...req.body,
    prompt:
      "English OCR mode: extract only English text and preserve original wording, spelling, capitalization, and paragraph structure.",
  };
  return postTextize(req, res);
}
