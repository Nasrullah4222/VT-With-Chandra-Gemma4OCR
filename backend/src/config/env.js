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
  HF_TOKEN: required("HF_TOKEN"),
  HF_MODEL: required("HF_MODEL"),
  // Not required at startup: MongoDB URI will be provided later.
  MONGO_URI: process.env.MONGO_URI || "",
};
