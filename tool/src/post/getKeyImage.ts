import { basename, extname } from "path";
import { logger } from "../../shared/logger";

// https://www.opengraph.xyz/blog/the-ultimate-guide-to-open-graph-images
const allowedImageExtensions = [".jpg", ".png"];

/**
 * Get first asset (assume to always be image) to be used as main OG image. This
 * will return undefined if there is no assets copied over.
 */
export function getKeyImage(
  /**
   * Path of the assets after they have been copied into the output directory.
   */
  assetOutputPaths: string[],
) {
  const keyImagePath = assetOutputPaths.sort()[0];

  // If there is no assets / images
  if (keyImagePath === undefined) {
    return;
  }

  const keyImage = basename(keyImagePath);
  const imageExtension = extname(keyImage);

  // If keyImage's extension is not valid, treat it as if there is no key image.
  if (!allowedImageExtensions.includes(imageExtension)) {
    logger.info(
      getKeyImage.name,
      `Your Open Graph image '${keyImagePath}' is using ${imageExtension} which is not allowed. Only these extensions '${allowedImageExtensions.join("/")}' are allowed. Please change your image or else the default open graph image will be used instead.`,
    );
    return;
  }

  return keyImage;
}
