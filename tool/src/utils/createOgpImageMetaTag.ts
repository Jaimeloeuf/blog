import { imageSize } from "image-size";
import { getConfig } from "../config";
import { logger } from "../../shared/logger";

/**
 * Create a HTML OGP (Open Graph Protocol) key image metadata tag.
 */
export function createOgpImageMetaTag(
  imageFilePath: string,
  imageUrlPath: string,
) {
  const { width, height } = imageSize(imageFilePath);

  if (width === undefined || height === undefined) {
    logger.error(
      createOgpImageMetaTag.name,
      `Missing image dimension data for generating OGP image meta tags. Found,`,
    );
    logger.error(createOgpImageMetaTag.name, "width", width);
    logger.error(createOgpImageMetaTag.name, "height", height);
    throw new Error();
  }

  // @todo generate this?
  // <meta property="og:image:type" content="image/png" />

  return `<meta property="og:image" content="${getConfig().baseUrl}/${imageUrlPath}" /><meta property="og:image:width" content="${width}" /><meta property="og:image:height" content="${height}" />`;
}
