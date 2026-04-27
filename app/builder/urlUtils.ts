const PROTOCOL_PREFIX_REGEX = /^[a-z][a-z\d+.-]*:\/\//i;
const LEADING_WWW_REGEX = /^www\./i;

export function getUrlHref(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";

  return PROTOCOL_PREFIX_REGEX.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getUrlDisplayText(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";

  return trimmed
    .replace(PROTOCOL_PREFIX_REGEX, "")
    .replace(LEADING_WWW_REGEX, "");
}
