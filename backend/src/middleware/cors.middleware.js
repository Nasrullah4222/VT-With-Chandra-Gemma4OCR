import cors from "cors";
import { env } from "../config/env.js";

const allowedOrigins = env.FRONTEND_URL.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/**
 * Allows requests only from the configured frontend origins. Multiple origins
 * can be supplied as a comma-separated FRONTEND_URL value.
 */
export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
});
