/**
 * Generate Open Graph Protocol's article tags meta tags.
 */
export function generateOgpTagMetaTags(tags: Array<string>) {
  return tags
    .map((tag) => `<meta property="article:tag" content="${tag}" />`)
    .join("");
}
