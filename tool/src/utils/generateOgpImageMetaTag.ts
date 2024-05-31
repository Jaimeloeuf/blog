import { getConfig } from "../config";

export function generateOgpImageMetaTag(
  imageLink: string,
  { width, height }: { width?: number; height?: number },
) {
  if (width === undefined || height === undefined) {
    console.error(generateOgpImageMetaTag.name, "width", width);
    console.error(generateOgpImageMetaTag.name, "height", height);
    throw new Error(
      `Missing dimension data for generating OGP image meta tags`,
    );
  }

  return `<meta property="og:image" content="${getConfig().baseUrl}/${imageLink}" /><meta property="og:image:width" content="${width}" /><meta property="og:image:height" content="${height}" />`;
}
