import dotenv from "dotenv";
dotenv.config();
function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is missing from .env`);
  }
  return value;
}
export const env = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  OCR_URL: process.env.OCR_URL || "",
  OCR_API_KEY: process.env.OCR_API_KEY || "",
  OCR_ENGLISH_URL: process.env.OCR_ENGLISH_URL || "",      // add
  OCR_ENGLISH_KEY: process.env.OCR_ENGLISH_KEY || "",      // add
  OCR_TIMEOUT_MS: Number(process.env.OCR_TIMEOUT_MS) || 5 * 60 * 1000,
  // Not required at startup: MongoDB URI will be provided later.
  MONGO_URI: process.env.MONGO_URI || "",
};
