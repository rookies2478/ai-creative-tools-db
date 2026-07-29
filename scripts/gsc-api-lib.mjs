// Pure logic for the GSC Search Analytics API fetcher: argument/date
// validation, paginated row collection, dataset normalization, CSV/JSON
// serialization, and totals/daily consistency checks.
//
// No network access and no googleapis import here — the injectable client
// (real or mock) is provided by the caller. This module is safe to import
// from tests without any credentials or dependencies being present.

import { GscApiError } from "./gsc-api-errors.mjs";

export const DEFAULT_ROW_LIMIT = 25000; // GSC Search Analytics API max rowLimit
export const DEFAULT_MAX_PAGES = 10;
export const DEFAULT_MAX_ROWS = 100000; // safety upper bound across all pages
export const QUERY_PAGES_MAX_ROWS = 50000; // query x page grows fastest; own cap

export const SINGLE_DIMENSION_DATASETS = {
  daily: { apiDimension: "date", label: "date" },
  queries: { apiDimension: "query", label: "query" },
  pages: { apiDimension: "page", label: "page" },
  devices: { apiDimension: "device", label: "device" },
  countries: { apiDimension: "country", label: "country" },
  "search-appearance": { apiDimension: "searchAppearance", label: "search_appearance" },
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function toUtcDate(dateStr) {
  return new Date(`${dateStr}T00:00:00.000Z`);
}

function addDays(dateStr, n) {
  const d = toUtcDate(dateStr);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function todayUtc(now) {
  return now.toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Date range resolution and validation
// ---------------------------------------------------------------------------

export function resolveDateRange({ start, end, days, defaultDays, dataLagDays, now }) {
  if ((start || end) && days != null) {
    throw new GscApiError(
      "GSC_INVALID_DATE_RANGE",
      "--start/--end and --days cannot both be specified"
    );
  }
  if ((start && !end) || (end && !start)) {
    throw new GscApiError("GSC_INVALID_DATE_RANGE", "--start and --end must be specified together");
  }

  let startDate, endDate;

  if (start && end) {
    if (!DATE_RE.test(start) || !DATE_RE.test(end)) {
      throw new GscApiError("GSC_INVALID_DATE_RANGE", "start/end must be in YYYY-MM-DD format");
    }
    if (Number.isNaN(toUtcDate(start).getTime()) || Number.isNaN(toUtcDate(end).getTime())) {
      throw new GscApiError("GSC_INVALID_DATE_RANGE", "start/end is not a valid calendar date");
    }
    startDate = start;
    endDate = end;
  } else {
    const requestedDays = days != null ? days : defaultDays;
    if (!Number.isInteger(requestedDays) || requestedDays <= 0) {
      throw new GscApiError("GSC_INVALID_DATE_RANGE", "days must be a positive integer");
    }
    endDate = addDays(todayUtc(now), -dataLagDays);
    startDate = addDays(endDate, -(requestedDays - 1));
  }

  if (toUtcDate(startDate) > toUtcDate(endDate)) {
    throw new GscApiError("GSC_INVALID_DATE_RANGE", "startDate must not be after endDate");
  }
  const today = todayUtc(now);
  if (toUtcDate(endDate) > toUtcDate(today)) {
    throw new GscApiError("GSC_INVALID_DATE_RANGE", "endDate must not be in the future");
  }

  return { startDate, endDate };
}

export function expectedDateList(startDate, endDate) {
  const dates = [];
  let cur = startDate;
  while (toUtcDate(cur) <= toUtcDate(endDate)) {
    dates.push(cur);
    cur = addDays(cur, 1);
  }
  return dates;
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

// queryFn(requestBody) => Promise<{ rows: [...] }>. Errors thrown by queryFn
// (already mapped to GscApiError by the caller's client wrapper) propagate.
export async function fetchAllRows(
  queryFn,
  baseRequestBody,
  { rowLimit = DEFAULT_ROW_LIMIT, maxPages = DEFAULT_MAX_PAGES, maxRows = DEFAULT_MAX_ROWS } = {}
) {
  let startRow = 0;
  let pageCount = 0;
  const rows = [];
  let truncated = false;

  for (;;) {
    const page = await queryFn({ ...baseRequestBody, rowLimit, startRow });
    const pageRows = Array.isArray(page.rows) ? page.rows : [];
    pageCount++;
    rows.push(...pageRows);

    const gotFullPage = pageRows.length === rowLimit;
    if (!gotFullPage) break;

    if (pageCount >= maxPages || rows.length >= maxRows) {
      truncated = true;
      break;
    }
    startRow += rowLimit;
  }

  const seen = new Set();
  let duplicateCount = 0;
  for (const r of rows) {
    const key = JSON.stringify(r.keys ?? []);
    if (seen.has(key)) duplicateCount++;
    else seen.add(key);
  }

  return { rows, pageCount, truncated, duplicateCount };
}

// ---------------------------------------------------------------------------
// Normalization + CSV/JSON serialization
// ---------------------------------------------------------------------------

function csvEscape(v) {
  const s = String(v ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export function normalizeSingleDimensionRows(rows) {
  return rows.map((r) => ({
    label: r.keys?.[0] ?? "",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? null,
  }));
}

export function normalizedRowsToCsv(labelHeader, rows) {
  const header = [labelHeader, "clicks", "impressions", "ctr", "position"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        csvEscape(r.label),
        r.clicks,
        r.impressions,
        r.ctr,
        r.position === null || r.position === undefined ? "" : r.position,
      ].join(",")
    );
  }
  return lines.join("\n") + "\n";
}

export function normalizeQueryPageRows(rows) {
  return rows.map((r) => ({
    query: r.keys?.[0] ?? "",
    page: r.keys?.[1] ?? "",
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? null,
  }));
}

export function queryPageRowsToCsv(rows) {
  const header = ["query", "page", "clicks", "impressions", "ctr", "position"];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        csvEscape(r.query),
        csvEscape(r.page),
        r.clicks,
        r.impressions,
        r.ctr,
        r.position === null || r.position === undefined ? "" : r.position,
      ].join(",")
    );
  }
  return lines.join("\n") + "\n";
}

export function totalsFromApiRow(row) {
  if (!row) return { clicks: 0, impressions: 0, ctr: 0, position: null };
  return {
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? null,
  };
}

// ---------------------------------------------------------------------------
// totals vs daily consistency check (section 10)
// ---------------------------------------------------------------------------

const TOLERANCE = {
  clicks: 0, // exact integer sums expected from the same source
  impressions: 0,
  ctr: 0.0005,
  position: 0.05,
};

export function checkTotalsAgainstDaily(totals, dailyRows) {
  let clicksSum = 0;
  let impressionsSum = 0;
  let weightedPositionSum = 0;

  for (const r of dailyRows) {
    clicksSum += r.clicks || 0;
    impressionsSum += r.impressions || 0;
    if (r.position !== null && r.position !== undefined && r.impressions) {
      weightedPositionSum += r.position * r.impressions;
    }
  }
  const dailyCtr = impressionsSum > 0 ? clicksSum / impressionsSum : 0;
  const dailyPosition = impressionsSum > 0 ? weightedPositionSum / impressionsSum : null;

  const clicksDifference = Math.abs((totals.clicks ?? 0) - clicksSum);
  const impressionsDifference = Math.abs((totals.impressions ?? 0) - impressionsSum);
  const ctrDifference = Math.abs((totals.ctr ?? 0) - dailyCtr);
  const positionDifference =
    totals.position === null || dailyPosition === null
      ? null
      : Math.abs(totals.position - dailyPosition);

  const withinTolerance =
    clicksDifference <= TOLERANCE.clicks &&
    impressionsDifference <= TOLERANCE.impressions &&
    ctrDifference <= TOLERANCE.ctr &&
    (positionDifference === null || positionDifference <= TOLERANCE.position);

  return {
    clicksDifference,
    impressionsDifference,
    ctrDifference,
    positionDifference,
    status: withinTolerance ? "match" : "mismatch",
  };
}

// ---------------------------------------------------------------------------
// daily coverage check
// ---------------------------------------------------------------------------

export function checkDailyCoverage(startDate, endDate, dailyRows) {
  const expected = new Set(expectedDateList(startDate, endDate));
  const returned = new Set(dailyRows.map((r) => r.label));
  const missingDates = [...expected].filter((d) => !returned.has(d));
  const outOfRangeDates = [...returned].filter((d) => !expected.has(d));
  return { missingDates, outOfRangeDates };
}
