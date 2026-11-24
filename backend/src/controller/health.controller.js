import { env } from "../config/env.js";
export function getHealth(req, res) {
  res.json({
    status: "ok",
    model: env.HF_MODEL,
    provider: "Hugging Face",
  });
}
