/**
 * Creates a URL safe tag name that will be used to link things together while
 * still using the original tag string for display purposes.
 */
export function createSafeTagName(tag: string) {
  // Remove all punctuations and collapse whitespaces into a single dash
  // https://stackoverflow.com/a/4328546
  // Then make it all lowercase.
  return tag
    .replace(/[^\w\s\']|_/g, "")
    .replace(/\s+/g, "-")
    .split("")
    .map((c) => c.toLowerCase())
    .join("");
}
