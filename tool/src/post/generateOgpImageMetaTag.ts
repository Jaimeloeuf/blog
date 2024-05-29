import { getConfig } from "../config";

export function generateOgpImageMetaTag(
  imageLink?: string,
  width?: number,
  height?: number,
) {
  if (imageLink === undefined || width === undefined || height === undefined) {
    console.error(generateOgpImageMetaTag.name, "imageLink", imageLink);
    console.error(generateOgpImageMetaTag.name, "width", width);
    console.error(generateOgpImageMetaTag.name, "height", height);
    throw new Error(`Missing data for generating OGP image meta tags`);
  }

  return `<meta property="og:image" content="${getConfig().baseUrl}/${imageLink}" /><meta property="og:image:width" content="${width}" /><meta property="og:image:height" content="${height}" />`;
}
