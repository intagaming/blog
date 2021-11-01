export const base64ImagePlaceholder =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const escapeQuote = (string: string): string =>
  string.replace(/"/g, '\\"');
