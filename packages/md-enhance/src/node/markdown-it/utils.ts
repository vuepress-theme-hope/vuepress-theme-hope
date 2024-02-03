/**
 * @see https://spec.commonmark.org/0.29/#line-ending
 */
export const NEWLINES_RE = /\r\n?|\n/g;

// Single quote will break @vue/compiler-sfc
export const stringifyProp = (data: unknown): string =>
  JSON.stringify(data).replace(/'/g, "&#39");

export const escapeHtml = (unsafeHTML: string): string =>
  unsafeHTML
    .replace(/&/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
    .replace(/"/gu, "&quot;")
    .replace(/'/gu, "&#039;");
