// Real Google Search Console API client factory. Only imported/executed when
// scripts/analytics-gsc-fetch.mjs runs without an injected mock client (i.e.
// against the real API). Never imported by tests.
//
// Auth: GOOGLE_APPLICATION_CREDENTIALS must point to a service account JSON
// file stored outside this repository. Scope: webmasters.readonly (read-only).
// No credential content, token, or Authorization header is ever logged.

import { existsSync } from "node:fs";
import { GscApiError } from "./gsc-api-errors.mjs";

export const READONLY_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

export async function createRealClient() {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credPath) {
    throw new GscApiError(
      "GSC_CREDENTIALS_NOT_CONFIGURED",
      "GOOGLE_APPLICATION_CREDENTIALS is not set. Set it to the absolute path of a service account JSON file stored outside this repository."
    );
  }
  if (!existsSync(credPath)) {
    throw new GscApiError(
      "GSC_CREDENTIAL_FILE_NOT_FOUND",
      "The file referenced by GOOGLE_APPLICATION_CREDENTIALS does not exist."
    );
  }

  let google;
  try {
    ({ google } = await import("googleapis"));
  } catch {
    throw new GscApiError(
      "GSC_AUTH_FAILED",
      "googleapis package is not available. Run npm install."
    );
  }

  let authClient;
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: credPath,
      scopes: [READONLY_SCOPE],
    });
    authClient = await auth.getClient();
  } catch {
    throw new GscApiError(
      "GSC_AUTH_FAILED",
      "Failed to authenticate with the configured service account credentials."
    );
  }

  const searchconsole = google.searchconsole({ version: "v1", auth: authClient });

  return {
    searchanalytics: {
      query: async ({ siteUrl, requestBody }) => {
        try {
          const res = await searchconsole.searchanalytics.query({ siteUrl, requestBody });
          return { rows: res.data.rows ?? [] };
        } catch (err) {
          throw mapHttpError(err);
        }
      },
    },
    sitemaps: {
      list: async ({ siteUrl }) => {
        try {
          const res = await searchconsole.sitemaps.list({ siteUrl });
          return { sitemap: res.data.sitemap ?? [] };
        } catch (err) {
          throw mapHttpError(err);
        }
      },
    },
  };
}

// Maps a raw HTTP/API error to a sanitized GscApiError. Never forwards the
// original error object, headers, or message body — only an HTTP status code
// derived classification and a generic, secret-free description.
export function mapHttpError(err) {
  const status = err?.response?.status ?? err?.code;
  const bodyMessage = String(err?.response?.data?.error?.message ?? "").toLowerCase();

  if (status === 401) {
    return new GscApiError("GSC_AUTH_FAILED", "Authentication with the GSC API failed (HTTP 401).");
  }
  if (status === 403) {
    if (bodyMessage.includes("has not been used") || bodyMessage.includes("disabled")) {
      return new GscApiError(
        "GSC_API_DISABLED",
        "The Search Console API is not enabled for this project (HTTP 403)."
      );
    }
    return new GscApiError(
      "GSC_PERMISSION_DENIED",
      "The service account does not have read access to this GSC property (HTTP 403)."
    );
  }
  if (status === 404) {
    return new GscApiError(
      "GSC_PROPERTY_NOT_FOUND",
      "The requested GSC property was not found or is not verified for this account (HTTP 404)."
    );
  }
  if (status === 429) {
    return new GscApiError("GSC_RATE_LIMITED", "The GSC API rate limit was exceeded (HTTP 429).");
  }
  if (
    err?.code === "ENOTFOUND" ||
    err?.code === "ECONNREFUSED" ||
    err?.code === "ETIMEDOUT" ||
    status === undefined
  ) {
    return new GscApiError("GSC_NETWORK_ERROR", "A network error occurred while contacting the GSC API.");
  }
  return new GscApiError("GSC_NETWORK_ERROR", `Unclassified GSC API error (HTTP ${status}).`);
}
