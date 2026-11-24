/**
 * Catches any error passed via next(err) or thrown synchronously in
 * middleware, and returns a consistent JSON error response.
 */
export function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err);
  res.status(err?.status || 500).json({
    success: false,
    error: err?.message || "Internal server error",
  });
}
