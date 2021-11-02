export const base64ImagePlaceholder =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export const escapeQuote = (string: string): string =>
  string.replace(/"/g, '\\"');

/**
 * Using rich-markdown-editor and putting a list at the end of the
 *   content will result in 3 new lines with a single backslash in the
 *   middle. We need to remove all 3, plus a new line character to put
 *   the caret back up to the supposed-to-be last row.
 */
export const removeTrailingBackslash = (markdown: string): string => {
  if (markdown.endsWith("\n\\\n")) {
    return markdown.substr(0, markdown.length - 4);
  }
  return markdown;
};
