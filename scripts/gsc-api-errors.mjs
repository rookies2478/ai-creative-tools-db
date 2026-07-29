// Shared error codes for the GSC Search Analytics API fetcher
// (scripts/analytics-gsc-fetch.mjs). Kept dependency-free so it can be
// imported by pure-logic modules and tests without pulling in googleapis.

export const GSC_ERROR_CODES = [
  "GSC_CREDENTIALS_NOT_CONFIGURED",
  "GSC_CREDENTIAL_FILE_NOT_FOUND",
  "GSC_AUTH_FAILED",
  "GSC_PERMISSION_DENIED",
  "GSC_PROPERTY_NOT_FOUND",
  "GSC_API_DISABLED",
  "GSC_RATE_LIMITED",
  "GSC_INVALID_DATE_RANGE",
  "GSC_PARTIAL_DATA",
  "GSC_DATASET_TRUNCATED",
  "GSC_NETWORK_ERROR",
  "GSC_WRITE_FAILED",
];

// GscApiError carries only a code + a safe, human-readable message. Callers
// must never attach raw HTTP error objects, headers, or credential content —
// see mapHttpError() in gsc-api-client.mjs for the sanitization boundary.
export class GscApiError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "GscApiError";
    if (!GSC_ERROR_CODES.includes(code)) {
      throw new Error(`Unknown GSC error code: ${code}`);
    }
    this.code = code;
  }
}
