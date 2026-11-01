export const CANONICAL_PRODUCTION_HOSTNAME = 'aicreative-db.com';

export function shouldInitializeMeasurement(hostname, isProductionBuild) {
  return Boolean(isProductionBuild) && hostname === CANONICAL_PRODUCTION_HOSTNAME;
}

export function minimizeDestinationUrl(rawHref, baseHref = 'https://aicreative-db.com/') {
  try {
    const url = new URL(rawHref, baseHref);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
    return url.origin + url.pathname;
  } catch {
    return '';
  }
}
