/**
 * Create HTML OGP (Open Graph Protocol) article metadata tags
 */
export function createOgpTagMetaTags(tags: Array<string>) {
  return tags
    .map((tag) => `<meta property="article:tag" content="${tag}" />`)
    .join("");
}
