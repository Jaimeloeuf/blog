import { basename, extname } from "path";
import { logger } from "../../shared/logger";
import {
  defaultOgpImageFilePath,
  defaultOgpImageMetaTag,
} from "../utils/defaultOgpImageMetaTag";
import { createOgpImageMetaTag } from "../utils/createOgpImageMetaTag";

// https://www.opengraph.xyz/blog/the-ultimate-guide-to-open-graph-images
const allowedImageExtensions = [".jpg", ".png"];

const defaultOgpImageObject = {
  keyImageUrlPath: defaultOgpImageFilePath,
  ogpImageMetaTag: defaultOgpImageMetaTag,
};

/**
 * Get first asset (assume to always be image) to be used as main OG image. This
 * will return undefined if there is no assets copied over.
 */
export function getKeyImageAndOgpMetaTag(
  /**
   * Path of the assets after they have been copied into the output directory.
   */
  assetOutputPaths: string[],

  urlPath: string,
) {
  const keyAssetPath = assetOutputPaths.sort()[0];

  // If there is no assets
  if (keyAssetPath === undefined) {
    return defaultOgpImageObject;
  }

  const keyAssetName = basename(keyAssetPath);
  const assetExtension = extname(keyAssetName);

  // If keyAsset's extension is not valid, treat it as if there is no key image.
  if (!allowedImageExtensions.includes(assetExtension)) {
    logger.info(
      getKeyImageAndOgpMetaTag.name,
      `Your Open Graph image '${keyAssetPath}' is using ${assetExtension} which is not allowed. Only these extensions '${allowedImageExtensions.join("/")}' are allowed. Please change your image or else the default open graph image will be used instead.`,
    );
    return defaultOgpImageObject;
  }

  const keyImageUrlPath = `${urlPath}/${keyAssetName}`;
  const ogpImageMetaTag = createOgpImageMetaTag(keyAssetPath, keyImageUrlPath);

  return { keyImageUrlPath, ogpImageMetaTag };
}
