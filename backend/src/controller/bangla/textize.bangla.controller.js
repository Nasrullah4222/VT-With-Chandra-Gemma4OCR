import { postTextize } from "../textize.controller.js";

export async function postBanglaTextize(req, res) {
  req.body = {
    ...req.body,
    prompt:
      "Bangla OCR mode: extract only Bangla text and retain Bengali numerals, spelling, paragraph structure, and any clearly visible English text.",
  };
  return postTextize(req, res);
}
