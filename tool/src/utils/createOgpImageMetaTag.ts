import { getConfig } from "../config";

/**
 * Create a HTML OGP (Open Graph Protocol) key image metadata tag.
 */
export function createOgpImageMetaTag(
  imageLink: string,
  { width, height }: { width?: number; height?: number },
) {
  if (width === undefined || height === undefined) {
    console.error(createOgpImageMetaTag.name, "width", width);
    console.error(createOgpImageMetaTag.name, "height", height);
    throw new Error(
      `Missing dimension data for generating OGP image meta tags`,
    );
  }

  // @todo generate this?
  // <meta property="og:image:type" content="image/png" />

  return `<meta property="og:image" content="${getConfig().baseUrl}/${imageLink}" /><meta property="og:image:width" content="${width}" /><meta property="og:image:height" content="${height}" />`;
}
