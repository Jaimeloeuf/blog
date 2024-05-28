import { getConfig } from "../config";

/**
 * Generate Open Graph Protocol's social preview image meta tag
 */
export function generateOgpImageMetaTag(folderName: string, keyImage?: string) {
  const relativeImageLink =
    keyImage !== undefined
      ? `${folderName}/${keyImage}`
      : `defaultOpenGraphImage.jpg`;

  return `<meta property="og:image" content="${getConfig().baseUrl}/${relativeImageLink}" />`;
}
